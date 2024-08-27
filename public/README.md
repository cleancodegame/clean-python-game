```py

just some code outside the instructions

{
    blockType: "text",
    code: "",
}



## replace-inline <EVENT_ID> <SUBSTRING>
## with <REPLACEMENT>

{
    blockType: "replace-inline",
    eventId: "",
    substring: null,
    code: "",
    replacementCode: "",
}

## replace <EVENT_ID> <SUBSTRING>
...
it is allowed to click only inside this <SUBSTRING>!!!
...
## with
...
## end
{
    blockType: "replace",
    eventId: "",
    substring: "",
    code: "",
    replacementCode: "",
}

## replace <EVENT_ID>
# it is allowed to click anywhere here
# in any line
## with
...
## end
{
    blockType: "replace",
    eventId: "",
    substring: null,
    code: "",
    replacementCode: "",
}


## replace-on <EVENT_ID>
...
## with
...
## end
{
    blockType: "replace-on",
    eventId: "",
    code: "",
    replacementCode: "",
}

## remove <EVENT_ID> <SUBSTRING>
...
## end
{
    blockType: "remove",
    eventId: "",
    code: "",
    replacementCode: "",
}
## remove <EVENT_ID>
...
## end

## remove-on <EVENT_ID>
...
## end

## add-on <EVENT_ID>
...
## end

## explain <EVENT_ID> <EXPLANATION_TEXT>
```


```py

let tasks = [
{
    title: levelTitle,
    fileName: levelFilename,
    blocks: [
        {
            blockType: "text"
            code: "sdfasdf"
        },
        ...

    ],
  },
  ...
]

```
