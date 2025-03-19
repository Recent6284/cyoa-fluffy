# Twine/SugarCube Stat Check Reference

## Table of Contents
- [Basic Setup](#basic-setup)
- [Roll Generation](#roll-generation)
- [Check Types](#check-types)
- [Complete Examples](#complete-examples)

## Basic Setup

### Initialize Stats in StoryInit
```twee3-sugarcube-2
<<set $playerStrength to 10>>
<<set $playerDexterity to 12>>
<<set $playerWisdom to 8>>
<<set $playerCharisma to 15>>
```

## Roll Generation

### Basic Roll
```twee3-sugarcube-2
<<set _roll to random(1,20)>>
<<print "You rolled a " + _roll>>
```

## Check Types

### Even/Odd Check
```twee3-sugarcube-2
<<if _roll % 2 === 0>>
    This is an even roll!
<<else>>
    This is an odd roll!
<</if>>
```

### Single Stat Check
```twee3-sugarcube-2
<<if _roll <= $playerStrength>>
    Success! Roll of _roll beats Strength of $playerStrength
<<else>>
    Failure! Roll of _roll doesn't beat Strength of $playerStrength
<</if>>
```

### Multiple Stat Check
```twee3-sugarcube-2
<<if _roll <= $playerStrength && _roll <= $playerDexterity>>
    Complete success!
<<elseif _roll <= $playerStrength>>
    Strength success only
<<elseif _roll <= $playerDexterity>>
    Dexterity success only
<<else>>
    Complete failure
<</if>>
```

### Range Check
```twee3-sugarcube-2
<<switch true>>
    <<case _roll >= 18>>
        Critical success!
    <<case _roll >= 10>>
        Normal success
    <<case _roll >= 5>>
        Partial success
    <<default>>
        Critical failure!
<</switch>>
```

## Complete Examples

### Strength Challenge
```twee3-sugarcube-2
:: Strength Test [event]
<<nobr>>
<<set _roll to random(1,20)>>
<<switch true>>
    <<case _roll >= $playerStrength + 5>>
        You perform the task with exceptional skill!
    <<case _roll >= $playerStrength>>
        You complete the task successfully.
    <<case _roll >= $playerStrength - 5>>
        You barely manage to complete the task.
    <<default>>
        You fail to complete the task.
<</switch>>
<</nobr>>
```

### Multiple Stat Challenge
```twee3-sugarcube-2
:: Complex Task [event]
<<nobr>>
<<set _strengthRoll to random(1,20)>>
<<set _dexterityRoll to random(1,20)>>

<<if _strengthRoll <= $playerStrength && _dexterityRoll <= $playerDexterity>>
    You gracefully complete the complex task!
<<elseif _strengthRoll <= $playerStrength>>
    You're strong enough, but not quite coordinated enough.
<<elseif _dexterityRoll <= $playerDexterity>>
    You're coordinated enough, but lack the strength.
<<else>>
    The task proves too difficult.
<</if>>
<</nobr>>
```

## Tips
- Temporary variables start with `_` (like `_roll`)
- Story variables start with `$` (like `$playerStrength`)
- Use `<<nobr>>` to prevent unwanted line breaks
- Consider using ranges for more nuanced results
- Combine multiple checks for complex challenges