
Previous link is for development preview.
Pls try this one: https://bus-holding-control-simulator.vercel.app 
It’s the production link.


###### **12/15, bus-simulator-1215-git, build pass**
1. bus已改小(bus.glb)
2. stations2.tsx （add station id）
3. 地图已压缩，可以和bus stops同步显示
4. 站牌可以单独渲染显示

###### **12.16 submit commits:**
1. Resized the bus model (bus.glb) to align with the map's scale.  
2. Updated stations.tsx to include unique station IDs for better reference.  
3. Compressed the map file (CITY_1216.glb) to improve loading performance and enable synchronized display with bus stops.  
4. Implemented standalone rendering of bus stops with proper coordinate-based positioning.  

###### **12.17 add:**
1. The bus stops for 1 second at every stations

###### **12.18 add:**
1. add the passenger numbers to the top of the bus
2. add the waiting passengers

###### TO DO:
1. bus后期增加点击效果，左侧栏显示载客量
2. 展示59辆bus
3. 站牌增加点击弹窗效果
4. 显示乘客


*Bonny: self.capacity = 120, so you can multiply by this*

*Dr. Hui Ma: add the values of metrics about the performance, e.g., total number of passengers, and add more buses.*

*Bonny: plot multiple buses this week and show passengers if we still have time*


###### 12.19 added 59 buses:
 bus running time: 23:56:00-23:58:05


visfc compress
visnc.json

###### 12.20 Bonny send:
[https://github.com/bonny2016/marl-bus-control](https://github.com/bonny2016/marl-bus-control) 
My repo now contains 3 sets of log details in "vis" folder we can compare, where 
visnc: no control (worst case, many bunching);
visfc: forward headway control (simple control, ~100 bunching);
visTD3_Distill: our marl control method (best case, ~10 bunching)

###### 12.20 meeting:
add:
1. ~~**add waiting passenger numbers on stops**~~
2. ~~**change bus stops color more prominent**~~
3. add a click box to show where the bus stops on the left side bar
4. ~~add speed-up / slow-down button on the left side bar~~
5. add reset / pause button on the left side bar
6. ~~==change the map drive direction (drive on the left)==~~
7. optimise the performance (100% CPU)



###### 01.10 meeting:
1. ~~change to "start simulation" button~~
2. ~~put the default as already uploaded file~~
3. double check the correctness
4. ~~2 versions of data: normal and better one ( 2 scenario: default 1 and default 2 )~~
5. ==make the map more configurable==
6. ~~==report writing (go through the draft and next week give some feedback)==~~
7. ~~highlight the bus zero 总站 different color~~
8. ~~change the positions of bus stop (big station)~~


###### Assignment 3:
1. the simulator should show key metrics: 
		average passenger waiting time (we can show some statics on the left), bus operation costs
1. When does each policy file stop after it starts simulation?
		-- after 59 buses completed.

###### TO DO:
1. out of memory issue (30 buses)
2. allow users to change the policy in the mid-term

~~on-time performance - bus timetable~~

draw io
**excalidraw.com**

###### 01.17 meeting:
1. make the bus zero bigger, all the bus stops red.
2. drag to specific time
3. show the metric
4. allow users uploaded their own policies
5. replace TD3_Distill.json is not the newest, need to change it to Bonny's today
6. fix the dispatched buses issue
7. fix the start time 07:00
8. bus operation information on each bus stop: station_id, passenger capacity icon display, line chart, 


###### need to confirm (next week on 01.24):
Different policy documents of users (customise)

###### report:
route, bus, model optimise, performance, 
experimental result: correctness, 
