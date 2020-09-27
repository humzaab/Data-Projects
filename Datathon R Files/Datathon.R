#Datathon
setwd("~/Documents/Datathon")
library(tidyverse)
library(devtools)
install_github("jamesmartherus/shotplot",force=TRUE)

shot_data=read.csv("Rotman MMA Summer Datathon (men&women olympic).csv")
shot_data <- data.frame(shot_data)
copy=shot_data
shot_data_2 <- shot_data[shot_data$team_name == 'Olympic (Women) - Canada', ]
shot_data_2 <- shot_data_2 %>%
  mutate(event_successful= ifelse(event_successful == "t", 1, 0))

player= shot_data[shot_data$player_name == 'Rebecca Johnston' & shot_data$event_type == 'Shot' & shot_data$team_venue == 'home', ]
goals_small <- shot_data %>%
  select(player_name=='Emily ')

#STEP 2#


women <- shot_data_2 %>%
  group_by(player_name,event_type) %>%
  summarize(total_pass = sum(event_successful))%>%
  filter(event_type=="Play" )


a=shot_data_2 %>% 
  group_by(player_name,event_type) %>% 
  filter(event_type=="Play")%>%
  tally() 

women$total=a$n
women$pass_pct= women$total_pass/women$total


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




shot_model <- glm(shot_data$goal ~ shot_data$x_event + shot_data$y_event + shot_data$shot_type 
                  , data = shot_data, family = "binomial")
summary(shot_model)

















#STEP 3#
#creating a variable for if a goal was scored or not#
shot_data$goal <- ifelse(shot_data$event_successful == 't', 1, 0)


#STEP 4#
#build the predictive model using logistic regression from the GLM package
shot_model <- glm(shot_data$goal ~ shot_data$x_event + shot_data$y_event + shot_data$shot_type 
                  , data = shot_data, family = "binomial")
summary(shot_model)



#STEP 5#
#make predictions and output csv#
shot_data$goal_predictions <- predict(shot_model, shot_data,type = "response")
write.csv(shot_data,file='shot_model_output.csv')



goals_small <- goals %>%
  select(player_name)
