# tennisCG
Open-source proof-of-concept library for a tennis broadcast, leveraging NodeCG as the dashboard and graphics server.

## Installation

1. Install [Node.js Version 18](https://nodejs.org)

2. Install [NodeCG](https://nodecg.dev) 

3. Drop this bundle (tennisCG) into `nodecg/bundles`.

ALT: If you installed NodeCG through [nodecg-cli](https://www.npmjs.com/package/nodecg-cli), you can use 'nodecg' terminal commands.

```
nodecg install BlurryChase/tennisCG
```

---

## Replicant Schema

Per NodeCG documentation:

[Replicants](https://www.nodecg.dev/docs/classes/replicant) are objects which monitor changes to a variable's value. The changes are replicated across all extensions, graphics, and dashboard panels. When a Replicant changes in one of those places it is quickly updated in the rest, and a change event is emitted allowing bundles to react to the changes in the data.

There are two Replicants leveraged in this bundle: **Match**, and **Time**.

### Match

The Match Replicant houses the majority of the data used. This includes Match Information & Player Information.

### Objects in Match Replicant

| Name | Type | Description |
| ----------- | ----------- | -------------- |
| matchInfo | object | Houses information regarding the match |
| playerA | object | Houses information regarding Player A (Top Player) |
| playerB | object | Houses information regarding Player B (Bottom Player) |

Properties of matchInfo

Access Point: `matchReplicant.value.matchInfo.PROPERTIES`

ALT: For on('change'), this will be called as `newValue.matchInfo.PROPERTIES`


| Name | Type | Description |
| ----------- | ----------- | -------------- |
| court | string | What court this match is being played at |
| format | string | Format of the match (Men's Singles, Women's Doubles, etc.) |
| round | string | What round the match is in this tournament (Round X, Semi-Final, Final, etc.) |
| tiebreaker | boolean | Determines if this Set is in a Tiebreaker. Modifies point changes in the Graphic `match.html` |
| currentSet | string | Value dictates what Set it currently is. Is a paramater that modifies where Game Scores will be sent for updates |

Properties of playerA & playerB

Access Point: `matchReplicant.value.playerA.PROPERTIES` or `matchReplicant.value.playerB.PROPERTIES` 

ALT: For on('change'), this will be called as `newValue.playerA.PROPERTIES` or `newValue.playerB.PROPERTIES`

| Name | Type | Description |
| ----------- | ----------- | -------------- |
| personalInfo | object | Player's Personal Information |
| currentSet | object | Information regarding current Set. Information in this Object is sent to Graphic `match.html` |
| completedSets | object | Information regarding Completed Sets. Leverages MATCHINFO.currentSet to update info in a particular Set. Object Info sent to `changeover.html` |

personalInfo

| Name | Type | Description |
| ----------- | ----------- | -------------- |
| firstName | string | Player's First Name |
| lastName | string | Player's Last Name |
| nation | string | Player's Nationality |
| seed | integer | Player's Seed |
| serveIndicator | boolean | If Player is currently serving |

currentSet

| Name | Type | Description |
| ----------- | ----------- | -------------- |
| gamesWon | integer | Number of Games Player has won in the Current Set |
| pointsWon | integer | Number of Points Player has won in the Current Set |

completedSets

currentSet

| Name | Type | Description |
| ----------- | ----------- | -------------- |
| gamesPerSet | object | Object for Player Game Count for each Set |
| gamesPerSet.set{number} | integer | Game Count for each Set |
| setWon | object | Object for if Player won that Set |
| setWon.set{number} | boolean | T/F if Player Won the Set |


### Time Replicant

The Time Replicant has information for timekeeping. Uses [momentJS](https://momentjs.com/) to track time.

| Name | Type | Description |
| ----------- | ----------- | -------------- |
| matchTime | integer | Total Match Time |
| setTimes | object | Object for Set timestamps |
| setTimes.set{number} | boolean | Timestamp for that specific Set. Used in Changeover Graphic |


### Dependancies

Because you have to do some trickery to get npm modules to work properly in NodeCG, I've included them for sake of convenience.

[momentJS](https://momentjs.com/) is used to track the Time for the Time Replicant.

[GSAP](https://gsap.com/) is used to animate in/out the Scoreboard & Changeover Graphics.

[PapaParse](https://www.papaparse.com/) is used to parse the country information into a useable JSON object for our Player Information Replicants.

### Interested in Using this?

Go right ahead! Play around with it, maybe integrate some feature I haven't, or use it for a broadcast of your own! <--- If you do, please, let me know so I can watch it! I'd love to see it in action!

### Special Thanks

* To my roommates, for helping me think through my object structure for this application
* To my friends on Discord, for listening to me bitch gripe & moan about this project in vc
* To cglitcher, who has given me advice and helped me work though problems & issues
* To you, who might find some value in this project


