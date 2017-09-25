[![Issue Count](https://codeclimate.com/github/grigori-gru/project-lvl2-s90/badges/issue_count.svg)](https://codeclimate.com/github/grigori-gru/project-lvl2-s90)
[![Build Status](https://travis-ci.org/grigori-gru/project-lvl2-s90.svg?branch=master)](https://travis-ci.org/grigori-gru/project-lvl2-s90)

## Config comparation

Compare and reports the difference of 2 config files in json, yaml or ini formats.

### Install

npm install -g project-lvl2-s90

### Usage

gendiff [options] first_config second_config

### Options

1. Default

   > gendiff first_config second_config

   result will be like

        {
          host: hexlet.io
          + timeout: 20
          - timeout: 50
          - proxy: 123.234.53.22
          + verbose: true
        }

2. Plain format

    > gendiff -f plain first_config second_config

    result will be like

        Property 'common.setting2' was removed     
        Property 'common.setting6' was removed     
        Property 'common.setting4' was added with value: blah blah     
        Property 'common.setting5' was added with complex value     
        Property 'group1.baz' was updated. From 'bas' to 'bars'  
        Property 'group2' was removed  
        Property 'group3' was added with complex value

3. json format

    > gendiff -f json first_config second_config

        [
          {
            "status": "unchanged",
            "key": "host",
            "newValue": null,
            "oldValue": "hexlet.io",
            "children": []
          },
          {
            "status": "updated",
            "key": "timeout",
            "newValue": "20",
            "oldValue": "50",
            "children": []
          },
          {
            "status": "removed",
            "key": "proxy",
            "newValue": null,
            "oldValue": "123.234.53.22",
            "children": []
          },
          {
            "status": "added",
            "key": "verbose",
            "newValue": true,
            "oldValue": null,
            "children": []
          }
        ]
