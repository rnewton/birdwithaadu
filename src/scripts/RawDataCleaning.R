## Script to download and summarize checklist data by buffered location (S. Amburgey, 4.12.2025)

#Load libraries and dependencies.----
library(tidyverse); library(sf); library(maps); library(mapdata)

#Read data and make spatial.----
data <- read.csv("src/data/ebird_1744234881389/MyEBirdData.csv") %>%
  st_as_sf(coords = c("Longitude", "Latitude"),
           crs = 4326) %>%   #WGS84
  mutate(Country = sapply(strsplit(data$State.Province, "-"), `[`, 1),
         State = sapply(strsplit(data$State.Province, "-"), `[`, 2))

#Plot the world data to check.----
map('world',col="grey", fill=TRUE, bg="white", lwd=0.05, mar=rep(0,4),border=0, ylim=c(-80,80) )
points(data, pch=19, cex=0.5)

#Plot a country's data to check.----
map("state", boundary=FALSE, col="gray", add=TRUE)
points(data, pch=19, cex=0.5)

#Plot a specific state to check.----
washington <- subset(map_data("state"), region=="washington")
washington_county <- subset(map_data("county"), region=="washington")

ggplot() + 
  geom_polygon(data=washington, aes(x=long, y=lat, group=group), fill="grey", color = "white") + 
  guides(fill=FALSE) + 
  coord_fixed(1.3) +
  geom_sf(data=subset(data, State == "WA"), aes())
