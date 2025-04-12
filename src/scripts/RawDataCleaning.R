## Script to download and summarize checklist data by buffered location (S. Amburgey, 4.12.2025)

#Clear out existing environment
rm(list = ls())

#Load libraries and dependencies.----
library(tidyverse); library(sf); library(maps); library(mapdata)

#Read data and make spatial.----
data <- read.csv("src/data/ebird_1744234881389/MyEBirdData.csv") %>%
  st_as_sf(coords = c("Longitude", "Latitude"),
           crs = 4326) %>%   #WGS84
  mutate(Country = sapply(strsplit(State.Province, "-"), `[`, 1),
         State = sapply(strsplit(State.Province, "-"), `[`, 2))

#Plot the world data to check.----
map('world',col = "grey", fill = TRUE, bg = "white", lwd = 0.05, border = 0)
points(data, pch = 19, cex = 0.5)
dev.off()

#Plot a country's data to check.----
map("state", boundary = TRUE, col = "gray")
points(data, pch = 19, cex = 0.5)
dev.off()

#Plot a specific state to check.----
washington <- subset(map_data("state"), region == "washington")
washington_county <- subset(map_data("county"), region == "washington")

ggplot() + 
  geom_polygon(data=washington, aes(x = long, y = lat, group = group), fill = "grey", color = "white") + 
  guides(fill = FALSE) + 
  coord_fixed(1.3) +
  geom_sf(data = subset(data, State == "WA"), aes())

#Create buffers around points and merge into single polygon when overlap.----
databuff <- data %>%
  filter(State == "WA") %>%
  st_transform(., 26910) %>%        #transform to UTMs
  st_buffer(., dist = 1609.34) %>%  #1 mile in m
  st_union %>%                      #join all buffers that touch
  st_cast('POLYGON') %>%            #make into polygon
  st_sf %>%
  mutate(
    unit = row_number()
  )

#Create centroids of polygons.----
test <- st_centroid(databuff)

#check how these look around Phinney neighborhood
ggplot() + 
  geom_polygon(data=washington_county, aes(x = long, y = lat, group = group), fill = "grey", color = "white") +
  geom_sf(data=subset(data, State == "WA"), aes(), pch = 21, cex = 0.4) +
  geom_sf(data=databuff, aes(), alpha = 0.2) +
  geom_sf(data=test, aes(), pch=23, fill="purple") +
  geom_point(aes(x = -122.365, y = 47.681), pch = 21, fill = "red") +
  xlim(-122.5,-122.1) + ylim(47.4,47.9)  #phinney area

#Sum observations to centroids.----

#first seen, total counts, notes, link to pictures (41 pics from eBird, Flickr)


