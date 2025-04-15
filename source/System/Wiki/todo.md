# Features

|Feature|Priority|Status|Notes|
|---|---|---|---|
|Event Pool|high|Not started|Need to be able to generate multiple passages, tag them as `event` or `event-race` and then have a widget to call random functions based on that.|
|Separated arrays|high|Started|Need to be able to remove options from an array based on conditionals, or change the array referenced by a widget based on conditionals. Usage is "if player is currently on \[passage\], roll a Fluffy/event using *this* instead of default."|
|Finalize day structure|high|Needs refining|Need to figure out how "time block" structure works. Current thoughts are either day-based, or week-based|
|Finalize win condition for Human path|high|Needs refining|Not sure what the point of a human's campaign is, or how the player "wins." Currently no goal besides seeing as many events as possible, and becomes difficult in order to have perpetual play without Fluffy age/dying/etc.|
|Add female art assets|Medium|Done!|Cosmetic, but will keep Fluffies from looking too samey.|

# Todo Resource Dump

## Separated Arrays

> → Returns [{ name : "Apricots" }]; $fruits [{ name : "Apples" }, { name : "Oranges" }]<br />
> $fruits.deleteWith(function (val) {<br />
> 	return val.name === "Apricots";<br />
> })<br />

# Bug Fixes

|Bug|Affects|Reproducible?|Status|
|---|---|---|---|
||||

# Story Structure Checklist

## Human Branch

Part 1: Getting Your Fluffy

This part is to explain how you get your Fluffy, and how you'll set it up for its life with you.

This chart is current up to 15/04/2025, and mostly so Recent knows what he still has to work on.

```mermaid
flowchart TD

A[Character Creation]

B[Fluffmart]
B1[Adults]
B2[Foals]
B3[Rejects]
B4[Items]
B5[Cashier]

C[The Shelter]

D[The Forest]
D1[Candy Bar Choice]
D11[Three Chances]
D12[Two Chances]
D2[Creek Bait]
D3[Meet Fluffy]
D4[Fluffy Acquired]

E[The City]
E1[Industrial Park]
E2[Fence]
E3[Union Hall]
E4[Security Guard]
E5[Warehouse]

Items[Visit FluffMart for Items]
Home[Arrive Home]

A --- B & C & D & E 

B --> B1 & B2 & B3
B1 & B3 --> B4
B4 --> B5
B2 --> B1 & B3
B5 --> D4

D --> D1
D1 --> D11 & D12
D11 & D12 --> D2
D2 --> D3
D3 --> D4

E --> E1
E1 --> E2 & E3 & E4
E2 & E3 & E4 --> E5
E5 --> D4

D4 --> Items
Items --> Home
```

Part 2: Living With Your Fluffy