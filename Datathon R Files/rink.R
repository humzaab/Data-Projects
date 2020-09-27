#Dathon
setwd("~/Documents/MMA Datathon/Datathon R Files")
install.packages("tidyverse")
yesinstall.packages("devtools")

library(tidyverse)
library(devtools)
library(glue)
shot_data=read.csv("Rotman MMA Summer Datathon (men_women olympic).csv")
shot_data <- data.frame(shot_data)
shot_data$goal <- ifelse(shot_data$event_successful == 't' & shot_data$event_type=="Shot", 1, 0)
shot_data$goal =factor(shot_data$goal, levels = c(0, 1))
copy=shot_data
shot_data_2 <- shot_data[shot_data$team_name == 'Olympic (Women) - Canada', ]
shot_data_2 <- shot_data_2 %>%
  mutate(event_successful= ifelse(event_successful == "t", 1, 0))

player= shot_data[shot_data$player_name == 'Rebecca Johnston' & shot_data$event_type == 'Shot' & shot_data$team_venue == 'home', ]
#goals_small <- shot_data %>%
  #select(player_name=='Emily ')

shot_data_2$total_distance= ((shot_data_2$receiver_x - shot_data_2$x_event)^2 +
                               (shot_data_2$receiver_y - shot_data_2$y_event)^2)^.5




average_pass= mean(shot_data_2$total_distance, na.rm = TRUE)

shot_data_2$shortpass= ifelse(shot_data_2$total_distance > average_pass,0,1)
shot_data_2$longpass= ifelse(shot_data_2$total_distance < average_pass,0,1)


library(caTools)
set.seed(123)
split = sample.split(shot_data$goal, SplitRatio = 0.75)
training_set = subset(shot_data, split == TRUE)
test_set = subset(shot_data, split == FALSE)



#STEP 2# For Aggregating Percentages


women <- shot_data_2 %>%
  group_by(player_name,event_type,situation_type) %>%
  summarize(total_pass = sum(event_successful))%>%
  filter(event_type=="Play" )


a=shot_data_2 %>% 
  group_by(player_name,event_type,situation_type) %>% 
  filter(event_type=="Play")%>%
  tally() 

women$total=a$n
women$pass_pct= women$total_pass/women$total

penalty <- women %>%
  group_by(player_name,event_type,situation_type) %>%
  filter(situation_type=="4 on 5" || situation_type=="5 on 6")



women_2 <- shot_data_2 %>%
  group_by(player_name,event_type) %>%
  summarize(total_goals = sum(event_successful))%>%
  filter(event_type=="Shot" )

b=shot_data_2 %>% 
  group_by(player_name,event_type) %>% 
  filter(event_type=="Shot")%>%
  tally() 


women_3= merge(women_2,b,by=c("player_name","event_type"))
women_3$shot_pct= women_3$total_goals/women_3$n


women_4=merge(women_3,women,by=c("player_name"))

women_5 =women_4 %>% relocate(total_goals, .after = last_col())

women_6= shot_data_2 %>%
  group_by(player_name,event_type,receiver_name) %>%
  summarize(total_pass_success = sum(event_successful))%>%
  filter(event_type=="Play" )

l=shot_data_2 %>%
  group_by(player_name,event_type,receiver_name) %>%
  filter(event_type=="Play")%>%
  tally() 

women_6$total_pass= l$n
women_6$pass_pct2= women_6$total_pass_success / l$n



pass=shot_data_2 %>%
  group_by(player_name,event_type,receiver_name) %>%
  summarize(total_short = sum(shortpass))%>%
  filter(event_type=="Play" )


long=shot_data_2 %>%
  group_by(player_name,event_type,receiver_name) %>%
  summarize(total_long = sum(longpass))%>%
  filter(event_type=="Play" )

women_6$short_pass= pass$total_short
women_6$long_pass= long$total_long

# Model

library(e1071)
classifier = naiveBayes(x = training_set[-18],
                        y = training_set$goal)

# Predicting the Test set results
y_pred = predict(classifier, newdata = test_set[-18])

cm = table(test_set[, 18], y_pred)




#look into later
library(e1071)
classifier2 = naiveBayes(x = women_5[-9],
                        y = women_5$total_goals)

# Predicting the Test set results
y_pred = predict(classifier2, newdata = women_5[-9])
y_pred2=predict(shot_model, shot_data,type = "response")



cm = table(test_set[, 9], y_pred)



















#Visualization Section
#install.packages("glmmTMB")
library(ggpubr)
library(gridExtra)
library(glmmTMB)
library(ggeasy)


#remotes::install_github("jonocarroll/ggeasy")

img = png::readPNG("full-rink.png")

p1 = ggplot(
  data = copy %>% filter(player_name == "Erin Ambrose" &
                           event_type == "Shot"),
  aes(x = y_event, y = x_event)
) +
  annotation_raster(
    img,
    xmin = 0,
    xmax = 85,
    ymin = 100,
    ymax = 200
  ) +
  scale_x_continuous(limits = c(0, 85), expand = c(0, 0)) +
  scale_y_continuous(limits = c(100, 200), expand = c(0, 0)) +
  
  geom_point() +
  labs(title = "Erin Ambrose") +
  
  stat_density2d(
    geom = "polygon",
    aes(alpha = stat(level)),
    fill = "steelblue4",
    alpha = 0.2,
    col = "white",
    bins = 8
  ) +
  theme(
    axis.title.x = element_blank(),
    axis.text.x = element_blank(),
    axis.ticks.x = element_blank(),
    axis.title.y = element_blank(),
    axis.text.y = element_blank(),
    axis.ticks.y = element_blank(),
    plot.title = element_text(hjust = 0.5, size = 17),
    legend.position = "none"
  ) +
  coord_fixed(xlim = c(0, 85), ylim = c(100, 200)) +
  
  
  geom_rect(
    aes(
      xmin = 10,
      xmax = 75,
      ymin = 103,
      ymax = 110
    ),
    color = "black",
    size = 1,
    fill = "lightblue"
  ) +
  annotate(
    "text",
    label = "Expexted Shooting 6.67%" ,
    x = 42.5,
    y = 107,
    size = 5
  ) +
  
  geom_segment(
    data = data.frame(
      x = c(38.25, 38.25, 20.75, 20.75, 64.25, 64.25),
      y = c(188, 188, 168.5, 153.5, 153.5, 168.5),
      xend = c(46.75, 20.75, 20.75, 64.25, 64.25, 46.75),
      yend = c(188, 168.5, 153.5, 153.5, 168.5, 188)
    ),
    aes(
      x = x,
      y = y,
      xend = xend,
      yend = yend
    ),
    size = 1,
    col = "midnightblue",
    linetype = 2
  )






p2 = ggplot(
  data = copy %>% filter(player_name == "Ann-Sophie Bettez" &
                           event_type == "Shot"),
  aes(x = y_event, y = x_event)
) +
  annotation_raster(
    img,
    xmin = 0,
    xmax = 85,
    ymin = 100,
    ymax = 200
  ) +
  scale_x_continuous(limits = c(0, 85), expand = c(0, 0)) +
  scale_y_continuous(limits = c(100, 200), expand = c(0, 0)) +
  
  geom_point() +
  labs(title = "Ann-Sophie Bettez") +
  
  stat_density2d(
    geom = "polygon",
    aes(alpha = stat(level)),
    fill = "red",
    alpha = 0.2,
    col = "white",
    bins = 8
  ) +
  theme(
    axis.title.x = element_blank(),
    axis.text.x = element_blank(),
    axis.ticks.x = element_blank(),
    axis.title.y = element_blank(),
    axis.text.y = element_blank(),
    axis.ticks.y = element_blank(),
    plot.title = element_text(hjust = 0.5, size = 17),
    legend.position = "none"
  ) +
  coord_fixed(xlim = c(0, 85), ylim = c(100, 200)) +
  
  
  geom_rect(
    aes(
      xmin = 10,
      xmax = 75,
      ymin = 103,
      ymax = 110
    ),
    color = "black",
    size = 1,
    fill = "lightblue"
  ) +
  annotate(
    "text",
    label = "Expexted Shooting 0%",
    x = 42.5,
    y = 107,
    size = 5
  ) +
  
  
  
  
  geom_segment(
    data = data.frame(
      x = c(38.25, 38.25, 20.75, 20.75, 64.25, 64.25),
      y = c(188, 188, 168.5, 153.5, 153.5, 168.5),
      xend = c(46.75, 20.75, 20.75, 64.25, 64.25, 46.75),
      yend = c(188, 168.5, 153.5, 153.5, 168.5, 188)
    ),
    aes(
      x = x,
      y = y,
      xend = xend,
      yend = yend
    ),
    size = 1,
    col = "midnightblue",
    linetype = 2
  )



grid = grid.arrange(p1, p2, ncol = 2)







#Automating Process

a = list(p1, p2)

for (i in 1:29) {
  name = women_3$player_name[i]
  avg= format(round(women_3$shot_pct[i] * 100,2), nsmall=2)
  
  
  
  a[[i]] = ggplot(
    data = copy %>% filter(player_name == name & event_type == "Shot"),
    aes(x = y_event, y = x_event)
  ) +
    annotation_raster(
      img,
      xmin = 0,
      xmax = 85,
      ymin = 100,
      ymax = 200
    ) +
    scale_x_continuous(limits = c(0, 85), expand = c(0, 0)) +
    scale_y_continuous(limits = c(100, 200), expand = c(0, 0)) +
    
    #geom_point() +
    labs(title = name) +
    
    stat_density2d(
      geom = "polygon",
      aes(alpha = stat(level)),
      fill = ifelse(avg<0.01,"red","steelblue4"),
      alpha = 0.2,
      col = "white",
      bins = 8
    ) +
    theme(
      axis.title.x = element_blank(),
      axis.text.x = element_blank(),
      axis.ticks.x = element_blank(),
      axis.title.y = element_blank(),
      axis.text.y = element_blank(),
      axis.ticks.y = element_blank(),
      plot.title = element_text(hjust = 0.5, size = 17),
      legend.position = "none"
    ) +
    coord_fixed(xlim = c(0, 85), ylim = c(100, 200)) +
    
    
    geom_rect(
      aes(
        xmin = 10,
        xmax = 75,
        ymin = 103,
        ymax = 110
      ),
      color = "black",
      size = 1,
      fill = "lightblue"
    ) +
    annotate(
      "text",
      label = glue("Expexted Shooting {avg}%") ,
      x = 42.5,
      y = 107,
      size = 5
    ) +
    
    geom_segment(
      data = data.frame(
        x = c(38.25, 38.25, 20.75, 20.75, 64.25, 64.25),
        y = c(188, 188, 168.5, 153.5, 153.5, 168.5),
        xend = c(46.75, 20.75, 20.75, 64.25, 64.25, 46.75),
        yend = c(188, 168.5, 153.5, 153.5, 168.5, 188)
      ),
      aes(
        x = x,
        y = y,
        xend = xend,
        yend = yend
      ),
      size = 1,
      col = "midnightblue",
      linetype = 2
    )
  
  
  
  
  
  
}
a[1]



grid = marrangeGrob(a, ncol = 2, nrow = 1)
grid



#Full rink

img2= png::readPNG("full-rink2.png")




b = list()

for (i in 1:3) {
  name = women$player_name[i]
  # avg= format(round(women_6$pass_pct2[i] * 100,2), nsmall=2)
  # receiver= women_6$receiver_name[i]
  # pass= women_6$total_pass[i]
  # short=women_6$short_pass[i]
  # long=women_6$long_pass[i]

  
  
  
  b[[i]] = ggplot(
    data = copy %>% filter(player_name == name 
                           & situation_type=="4 on 3" &
                             situation_type=="5 on 6"),
    aes(x = y_event, y = x_event, xend=receiver_y, yend=receiver_x)
  ) +
    annotation_raster(
      img2,
      xmin = -5,
      xmax = 90,
      ymin = -5,
      ymax = 208
    ) +
    scale_x_continuous(limits = c(0, 170), expand = c(0, 0)) +
    scale_y_continuous(limits = c(0, 200), expand = c(0, 0)) +
    
    geom_point() +
    
    
   
    
    geom_point(data=copy %>% filter(player_name == name & receiver_name==receiver),
               aes(x = receiver_y, y = receiver_x),
               color="purple") +
    
    geom_segment(data= copy %>% filter(player_name == name & receiver_name==receiver & event_successful=="t"),
                 aes(x=y_event, xend=receiver_y, y=x_event, yend=receiver_x),
                 arrow = arrow(length=unit(0.30,"cm"), ends="last", type = "closed"),
                 color="darkgreen"
    ) +
  
    geom_segment(data= copy %>% filter(player_name == name & receiver_name==receiver & event_successful=="f"),
                 aes(x=y_event, xend=receiver_y, y=x_event, yend=receiver_x),
                 arrow = arrow(length=unit(0.30,"cm"), ends="last", type = "closed"),
                 color="red",
                 linetype=3
    ) +
  
    
    
 
  
    labs(title = glue("{name} to {receiver}")) +

    theme(
      axis.title.x = element_blank(),
      axis.text.x = element_blank(),
      axis.ticks.x = element_blank(),
      axis.title.y = element_blank(),
      axis.text.y = element_blank(),
      axis.ticks.y = element_blank(),
      panel.background =  element_blank(),
      plot.title = element_text(hjust = 0.5, size = 17),
      legend.position = "none"
    ) +
    coord_fixed(xlim = c(-5, 90), ylim = c(0, 200)) +

# 
#     geom_rect(
#       aes(
#         xmin = 90,
#         xmax = 170,
#         ymin = 35,
#         ymax = 105
#       ),
#       color = "black",
#       size = 1,
#       fill = "lightblue"
#     ) +
#     
# 
#     
#     annotate(
#       "text",
#       label = glue("Total Passes: {pass}"),
#       x = 130,
#       y = 80,
#       size = 5
#     ) +
#     
#     annotate(
#       "text",
#       label = glue("Total Short Passes: {short}"),
#       x = 130,
#       y = 60,
#       size = 5
#     ) +
#     
#     annotate(
#       "text",
#       label = glue("Total Long Passes: {long}"),
#       x = 130,
#       y = 40,
#       size = 5
#     ) +
#     
#     annotate(
#       "text",
#       label = glue("Expected Passing: {avg}% ") ,
#       x = 130,
#       y = 100,
#       size = 5
#     ) +
#     
#     annotate(
#       "text",
#       label = glue("Stats ") ,
#       x = 130,
#       y = 110,
#       size = 7
#     ) +
    
    geom_segment(
      data = data.frame(
        x = c(38.25, 38.25, 20.75, 20.75, 64.25, 64.25),
        y = c(192, 192, 172.5, 157.5, 157.5, 172.5),
        xend = c(46.75, 20.75, 20.75, 64.25, 64.25, 46.75),
        yend = c(192, 172.5, 157.5, 157.5, 172.5, 192)
      ),
      aes(
        x = x,
        y = y,
        xend = xend,
        yend = yend
      ),
      size = 1,
      col = "midnightblue",
      linetype = 2
    )
  
  
  
  
  
  
}
b[2]

write.csv(women_6,"File Name.csv", row.names = FALSE)


grid = marrangeGrob(a, ncol = 2, nrow = 1)
grid
