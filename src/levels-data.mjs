export let levels = 
[
  {
    "dirName": "01-names",
    "timestamp": "2024-10-01T09:18:54.877Z",
    "title": "Onboarding",
    "filename": "hello.py",
    "blocks": [
      {
        "actionType": "text",
        "code": "# Hello, Junior!\n# According to our team process, you are not yet allowed to write code.\n# So, you can only review a code of your colleagues\n# and fix some small and not significant details.\n\n# Let's train you a little. Look at this terrible variable name.\n# Click to fix it!\n\ndef main():\n    BaD_VAriABLE_NAME = \"Hello!\"\n    print(BaD_VAriABLE_NAME)\n"
      },
      {
        "actionType": "replace-inline",
        "eventId": "$",
        "code": "BaD_VAriABLE_NAME",
        "replacementCode": "greeting"
      }
    ]
  },
  {
    "dirName": "01-names",
    "timestamp": "2024-10-01T09:18:54.878Z",
    "title": "Understandable",
    "filename": "fmt_temp.py",
    "blocks": [
      {
        "actionType": "text",
        "code": "# Okay, you are ready to some real work.\n# Check if this code is easy to understand.\n\ndef fmt_temp(idx, tt):\n    dnms = [\"Monday\", \"Tuesday\", \"Wednesday\", \"Thursday\", \"Friday\", \"Saturday\", \"Sunday\"]\n    return \"Temperature for \" + dnms[idx] + \" is \" + tt + \"̈° C\"\n"
      },
      {
        "actionType": "replace-inline",
        "eventId": "$idx",
        "code": "idx",
        "replacementCode": "day_of_week"
      },
      {
        "actionType": "replace-inline",
        "eventId": "$tt",
        "code": "tt",
        "replacementCode": "temperature"
      },
      {
        "actionType": "replace-inline",
        "eventId": "$dnms",
        "code": "dnms",
        "replacementCode": "day_names"
      },
      {
        "actionType": "replace-inline",
        "eventId": "$fmt_temp",
        "code": "fmt_temp",
        "replacementCode": "format_temperature"
      }
    ]
  },
  {
    "dirName": "01-names",
    "timestamp": "2024-10-01T09:18:54.878Z",
    "title": "Meaningful",
    "filename": "cells.py",
    "blocks": [
      {
        "actionType": "text",
        "code": "# Nice work! After your fixes code becomes much more readable.\n# And this piece of code is realy short and simple.\n# Not sure if it needs any changes.\n\ndef get(lst):\n    lst1 = []\n    for c in lst:\n        if c.IsEmpty:\n            lst1.Add(c.position)\n    return lst1\n\nlst = readfile(\"data.txt\")\nprint(get(lst))\n\n"
      },
      {
        "actionType": "replace-inline",
        "eventId": "$get",
        "code": "get",
        "replacementCode": "get_empty_positions"
      },
      {
        "actionType": "replace-inline",
        "eventId": "$lst",
        "code": "lst",
        "replacementCode": "cells"
      },
      {
        "actionType": "replace-inline",
        "eventId": "$lst1",
        "code": "lst1",
        "replacementCode": "empty_positions"
      },
      {
        "actionType": "replace-inline",
        "eventId": "$c",
        "code": "c",
        "replacementCode": "cell"
      },
      {
        "actionType": "text",
        "code": "\n"
      }
    ]
  },
  {
    "dirName": "01-names",
    "timestamp": "2024-10-01T09:18:54.879Z",
    "title": "Magic numbers",
    "filename": "date.py",
    "blocks": [
      {
        "actionType": "text",
        "code": "# Do not change any constants here! They are magically calculated.\n# Nobody knows how, but everything works perfectly.\n\ndef get_views_per_second(views, date):\n"
      },
      {
        "actionType": "add-on",
        "eventId": "$magic1",
        "code": "",
        "replacementCode": "    n = 24 * 60 * 60\n"
      },
      {
        "actionType": "text",
        "code": "    daily_views = sum(1 for v in views if v.date == date)\n    return daily_views / 86400\n\n"
      },
      {
        "actionType": "replace-inline",
        "eventId": "$magic",
        "code": "86400",
        "replacementCode": "24*60*60"
      },
      {
        "actionType": "replace-inline",
        "eventId": "$magic1",
        "code": "24*60*60",
        "replacementCode": "n"
      },
      {
        "actionType": "replace-inline",
        "eventId": "$n",
        "code": "n",
        "replacementCode": "seconds_in_24h"
      },
      {
        "actionType": "text",
        "code": "\n"
      }
    ]
  },
  {
    "dirName": "01-names",
    "timestamp": "2024-10-01T09:18:54.882Z",
    "title": "Confusing",
    "filename": "search.py",
    "blocks": [
      {
        "actionType": "text",
        "code": "# Uhh.. Can't find a bug here... Can you help me a little?\n\ndef contains(text, pattern):\n    l = len(pattern)\n    for i in range(len(text)):\n        if text[i:i+1] == pattern:\n            return True\n    return False\n"
      },
      {
        "actionType": "add-on",
        "eventId": "$1",
        "code": "",
        "replacementCode": "\n# Hint for the future: never use lowercase 'l' as a variable name!\n"
      },
      {
        "actionType": "replace-inline",
        "eventId": "$l",
        "code": "l",
        "replacementCode": "pattern_len"
      },
      {
        "actionType": "replace-inline",
        "eventId": "$1",
        "code": "i+1",
        "replacementCode": "i+l"
      },
      {
        "actionType": "text",
        "code": "\n"
      }
    ]
  },
  {
    "dirName": "01-names",
    "timestamp": "2024-10-01T09:18:54.899Z",
    "title": "Flag",
    "filename": "unescape.py",
    "blocks": [
      {
        "actionType": "text",
        "code": "# If a variable stores string, it is 's'.\n# If it stores a boolean, it is 'flag'.\n# However, sometimes one also need 's1', 's2', etc.\n# But I personally prefer 'ss', 'sss', etc.\n# Briliant, isn't it?\n\ndef unescape(s):\n    ss = \"\"\n    flag = False\n    for c in s:\n        if flag and c == 'n':\n            ss += '\\n'\n        elif flag and c == 't':\n            ss += '\\t'\n        elif flag and c == '\\\\':\n            ss += '\\\\'\n        elif c == '\\\\':\n            flag = True\n        else:\n            ss += c\n    return ss\n"
      },
      {
        "actionType": "add-on",
        "eventId": "$flag",
        "code": "",
        "replacementCode": "\n# Hint for the future: do not use 'flag' as a variable name!\n# (unless it denoted real flags i.e. symbol of the country)\n"
      },
      {
        "actionType": "replace-inline",
        "eventId": "$flag",
        "code": "flag",
        "replacementCode": "after_slash"
      },
      {
        "actionType": "replace-inline",
        "eventId": "$ss",
        "code": "ss",
        "replacementCode": "unescaped"
      },
      {
        "actionType": "replace-inline",
        "eventId": "$s",
        "code": "s",
        "replacementCode": "escaped"
      },
      {
        "actionType": "text",
        "code": "\n"
      }
    ]
  },
  {
    "dirName": "01-names",
    "timestamp": "2024-10-01T09:18:54.899Z",
    "title": "Flags",
    "filename": "discounts.py",
    "blocks": [
      {
        "actionType": "text",
        "code": "# If we have already 'flag' and we need the second one, how should we name it?\n# flag1 or flag2? What is your opinion?\n\ndef is_discount_hunter(customer):\n    flag = True\n    for order in customer.orders:\n        flag2 = False\n        for item in order.items:\n            if item.product.discount > 0:\n                flag2 = True\n        flag = flag and flag2\n    return flag\n\n"
      },
      {
        "actionType": "replace-inline",
        "eventId": "$flag",
        "code": "flag",
        "replacementCode": "every_order_has_discounted_item"
      },
      {
        "actionType": "replace-inline",
        "eventId": "$flag2",
        "code": "flag2",
        "replacementCode": "has_discount"
      },
      {
        "actionType": "text",
        "code": "\n\n"
      }
    ]
  },
  {
    "dirName": "01-names",
    "timestamp": "2024-10-01T09:18:54.900Z",
    "title": "Naming styles",
    "filename": "bigrams.py",
    "blocks": [
      {
        "actionType": "text",
        "code": "# Anders and Nicolaus wrote this code.\n# Their naming style is a little bit non typical for python...\n\ndef GetBigramsFrequency(ws):\n    bigramsCount = len(ws) - 1\n    bigramsfrequency = {}\n    for I in range(bigramsCount):\n        bg = ws[I] + ' ' + ws[I + 1]\n        if bg in bigramsfrequency:\n            bigramsfrequency[bg] += 1\n        else:\n            bigramsfrequency[bg] = 1\n    return bigramsfrequency\n"
      },
      {
        "actionType": "replace-inline",
        "eventId": "$GetBigramsFrequency",
        "code": "GetBigramsFrequency",
        "replacementCode": "get_bigrams_frequency"
      },
      {
        "actionType": "replace-inline",
        "eventId": "$bigramsCount",
        "code": "bigramsCount",
        "replacementCode": "bigrams_count"
      },
      {
        "actionType": "replace-inline",
        "eventId": "$I",
        "code": "I",
        "replacementCode": "i"
      },
      {
        "actionType": "replace-inline",
        "eventId": "$ws",
        "code": "ws",
        "replacementCode": "words"
      },
      {
        "actionType": "replace-inline",
        "eventId": "$bg",
        "code": "bg",
        "replacementCode": "bigram"
      },
      {
        "actionType": "replace-inline",
        "eventId": "$bigramsfrequency",
        "code": "bigramsfrequency",
        "replacementCode": "bigrams_frequency"
      }
    ]
  },
  {
    "dirName": "01-names",
    "timestamp": "2024-10-01T09:18:54.902Z",
    "title": "Docstring",
    "filename": "copy.py",
    "blocks": [
      {
        "actionType": "text",
        "code": "# Huh, somebody wrote documentation for their code?! Weakling!\n# Real coders don't read or write docs.\n# They read and write CODE!\n\ndef copy(xs, ys, j, k, n):\n"
      },
      {
        "actionType": "remove",
        "eventId": "$doc",
        "code": "    \"\"\"Copy elements from ys to xs\n\n    Args:\n        xs - destination\n        ys - source\n        j - start index in xs\n        k - start index in ys\n        n - number of elements to copy\n    \"\"\"\n",
        "replacementCode": ""
      },
      {
        "actionType": "text",
        "code": "    for i in range(n):\n        xs[j+i] = ys[k+i]\n"
      },
      {
        "actionType": "replace-inline",
        "eventId": "$xs",
        "code": "xs",
        "replacementCode": "destination"
      },
      {
        "actionType": "replace-inline",
        "eventId": "$ys",
        "code": "ys",
        "replacementCode": "source"
      },
      {
        "actionType": "replace-inline",
        "eventId": "$j",
        "code": "j",
        "replacementCode": "dest_start"
      },
      {
        "actionType": "replace-inline",
        "eventId": "$k",
        "code": "k",
        "replacementCode": "src_start"
      },
      {
        "actionType": "replace-inline",
        "eventId": "$n",
        "code": "n",
        "replacementCode": "count"
      },
      {
        "actionType": "text",
        "code": "\n\n"
      }
    ]
  },
  {
    "dirName": "01-names",
    "timestamp": "2024-10-01T09:18:54.903Z",
    "title": "Verbs",
    "filename": "chess.py",
    "blocks": [
      {
        "actionType": "text",
        "code": "# It is simple:\n# 'initialization' consists of 'creating a board' and filling it with the 'board_reader'!\n\ndef initialization(board_json):\n    n = board_json['size']\n    board = creating_board(n, n)\n    board_reader(json, board)\n"
      },
      {
        "actionType": "add-on",
        "eventId": "$initialization",
        "code": "",
        "replacementCode": "# Hint for the future: functions = verbs, variables = nouns.\n"
      },
      {
        "actionType": "replace-inline",
        "eventId": "$n",
        "code": "n",
        "replacementCode": "board_size"
      },
      {
        "actionType": "replace-inline",
        "eventId": "$initialization",
        "code": "initialization",
        "replacementCode": "initialize_board"
      },
      {
        "actionType": "replace-inline",
        "eventId": "$creating_board",
        "code": "creating_board",
        "replacementCode": "create_board"
      },
      {
        "actionType": "replace-inline",
        "eventId": "$board_reader",
        "code": "board_reader",
        "replacementCode": "read_board"
      },
      {
        "actionType": "text",
        "code": "\n\n"
      }
    ]
  },
  {
    "dirName": "01-names",
    "timestamp": "2024-10-01T09:18:54.903Z",
    "title": "Practice",
    "filename": "parser.py",
    "blocks": [
      {
        "actionType": "text",
        "code": "# Finally I finished a wonderful piece of the excelent code.\n# However, according to our team process, somebody should review it.\n# As it is already perfect, don't lose your time, just approve it!\n\ndef InstructionParser(i):\n    Instructions = []\n    F = False\n    for l in i.split(\"\\n\"):\n        if l.startswith(\"BEGIN\"):\n            F = True\n        if not F:\n            continue\n        if l.startswith(\"END\"):\n            F = False\n        elif l.startswith(\"replace \"):\n            rest = l[8:]\n            old, new = rest.split(\" with \")\n            Instructions.append((\"replace\", old, new))\n        elif l.startswith(\"add \"):\n            rest = l[4:]\n            Instructions.append((\"add\", rest))\n        else:\n            raise Exception(\"Unknown instruction in line: \" + l)\n    return Instructions\n\n"
      },
      {
        "actionType": "replace-inline",
        "eventId": "$InstructionParser",
        "code": "InstructionParser",
        "replacementCode": "instruction_parser"
      },
      {
        "actionType": "replace-inline",
        "eventId": "$instruction_parser",
        "code": "instruction_parser",
        "replacementCode": "parse_instructions"
      },
      {
        "actionType": "replace-inline",
        "eventId": "$Instructions",
        "code": "Instructions",
        "replacementCode": "instructions"
      },
      {
        "actionType": "replace-inline",
        "eventId": "$F",
        "code": "F",
        "replacementCode": "flag"
      },
      {
        "actionType": "replace-inline",
        "eventId": "$flag",
        "code": "flag",
        "replacementCode": "inside_begin_end"
      },
      {
        "actionType": "replace-inline",
        "eventId": "$l",
        "code": "l",
        "replacementCode": "line"
      },
      {
        "actionType": "replace-inline",
        "eventId": "$i",
        "code": "i",
        "replacementCode": "instructions_text"
      },
      {
        "actionType": "replace-inline",
        "eventId": "$4",
        "code": "4:",
        "replacementCode": "len(\"add \"):"
      },
      {
        "actionType": "replace-inline",
        "eventId": "$8",
        "code": "8:",
        "replacementCode": "len(\"replace \"):"
      },
      {
        "actionType": "text",
        "code": "\n"
      }
    ]
  }
]