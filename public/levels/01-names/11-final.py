## Practice
## parser.py
# Finally I finished a wonderful piece of the excelent code.
# However, according to our team process, somebody should review it.
# As it is already perfect, don't lose your time, just approve it!

def InstructionParser(i):
    Instructions = []
    F = False
    for l in i.split("\n"):
        if l.startswith("BEGIN"):
            F = True
        if not F:
            continue
        if l.startswith("END"):
            F = False
        elif l.startswith("replace "):
            rest = l[8:]
            old, new = rest.split(" with ")
            Instructions.append(("replace", old, new))
        elif l.startswith("add "):
            rest = l[4:]
            Instructions.append(("add", rest))    
        else:
            raise Exception("Unknown instruction in line: " + l)
    return Instructions

## replace-inline $InstructionParser InstructionParser
## with instruction_parser
## replace-inline $instruction_parser instruction_parser
## with parse_instructions
## replace-inline $Instructions Instructions
## with instructions
## replace-inline $F F
## with flag
## replace-inline $flag flag
## with inside_begin_end
## replace-inline $l l
## with line
## replace-inline $i i
## with instructions_text
## replace-inline $4 4:
## with len("add "):
## replace-inline $8 8:
## with len("replace "):
