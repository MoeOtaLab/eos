export const defaultData = {
  nodes: [
    {
      id: '$flow_f1d88368-6e1b-4279-be51-9535450b931d',
      position: {
        x: 437,
        y: 204,
      },
      type: 'StateNode',
      data: {
        operatorType: 'StateOperator',
        sourcePorts: [
          {
            id: '05fcbe6c-63a3-4203-84cc-1b947037ad25',
            type: 'State',
            label: 'data',
          },
        ],
        targetPorts: [
          {
            id: '96761be7-1a90-4a80-8710-6268ee350b28',
            type: 'UpdateHanlder',
            label: 'update',
          },
        ],
        operatorName: 'StateOperator',
        value: 'default',
        valueType: 'string',
      },
      dragging: false,
      width: 125,
      height: 122,
      selected: true,
      positionAbsolute: {
        x: 437,
        y: 204,
      },
    },
    {
      id: '$flow_b433e7b1-d64c-4eb2-8928-4b0183d3a464',
      position: {
        x: 428,
        y: 45,
      },
      type: 'StateNode',
      data: {
        operatorType: 'StateOperator',
        sourcePorts: [
          {
            id: '213121f3-8fbd-4cad-b889-be836e6c57c0',
            type: 'State',
            label: 'data',
          },
        ],
        targetPorts: [
          {
            id: '297f6361-97af-457e-a20d-3edf6ed6e522',
            type: 'UpdateHanlder',
            label: 'update',
          },
        ],
        operatorName: 'StateOperator',
        value: 1,
        valueType: 'number',
      },
      dragging: false,
      width: 125,
      height: 122,
      selected: false,
      positionAbsolute: {
        x: 428,
        y: 45,
      },
    },
    {
      unique: true,
      id: '$flow_e19a1273-e3fa-4050-a231-5651cd16994d',
      position: {
        x: 126,
        y: 80,
      },
      type: 'InputNode',
      data: {
        operatorType: 'InputOperator',
        sourcePorts: [
          {
            id: '51d75f6a-c975-463b-948f-387c8fea64b4',
            type: 'State',
            label: 'state',
          },
          {
            id: 'cdcd71a3-b4cd-482b-89fc-0f3c5d599585',
            type: 'Event',
            label: 'event',
          },
          {
            id: 'abb37438-8335-4958-a0a4-f8d36aeeee98',
            type: 'LifeCycle',
            label: 'beforeMount',
          },
          {
            id: '6162087c-33af-472a-bc8e-c14194334724',
            type: 'LifeCycle',
            label: 'mount',
          },
          {
            id: 'a2a44458-78c7-4f34-929d-f1b73ec85217',
            type: 'LifeCycle',
            label: 'beforeUnmount',
          },
          {
            id: '803e3db3-689e-43cc-b3cb-6fde415019b0',
            type: 'LifeCycle',
            label: 'unmount',
          },
          {
            id: '265ba96b-c66b-4ca5-8803-d2a599d9c3ad',
            type: 'Event',
            label: 'Event-1',
          },
        ],
        targetPorts: [],
        operatorName: 'InputOperator',
      },
      dragging: false,
      width: 118,
      height: 249,
      selected: false,
      positionAbsolute: {
        x: 126,
        y: 80,
      },
    },
    {
      unique: true,
      id: '$flow_ad81f8af-a554-4eeb-8e14-eeca63ebb40c',
      position: {
        x: 739,
        y: 86,
      },
      type: 'OutputNode',
      data: {
        operatorType: 'OutputOperator',
        sourcePorts: [],
        targetPorts: [
          {
            id: 'b770be31-a360-4944-aa5d-b8e66afd3fae',
            type: 'State',
            label: 'state',
          },
          {
            id: 'edf3df43-70b5-436d-8b8c-087208514319',
            type: 'Event',
            label: 'event',
          },
          {
            id: '820215c9-7c22-424f-9310-138cf6147fab',
            type: 'State',
            label: 'State-1',
          },
        ],
        operatorName: 'OutputOperator',
      },
      width: 118,
      height: 163,
      dragging: false,
      selected: false,
      positionAbsolute: {
        x: 739,
        y: 86,
      },
    },
  ],
  edges: [
    {
      animated: true,
      source: '$flow_e19a1273-e3fa-4050-a231-5651cd16994d',
      sourceHandle: 'cdcd71a3-b4cd-482b-89fc-0f3c5d599585',
      target: '$flow_b433e7b1-d64c-4eb2-8928-4b0183d3a464',
      targetHandle: '297f6361-97af-457e-a20d-3edf6ed6e522',
      id: 'reactflow__edge-$flow_e19a1273-e3fa-4050-a231-5651cd16994dcdcd71a3-b4cd-482b-89fc-0f3c5d599585-$flow_b433e7b1-d64c-4eb2-8928-4b0183d3a464297f6361-97af-457e-a20d-3edf6ed6e522',
    },
    {
      animated: true,
      source: '$flow_e19a1273-e3fa-4050-a231-5651cd16994d',
      sourceHandle: '265ba96b-c66b-4ca5-8803-d2a599d9c3ad',
      target: '$flow_f1d88368-6e1b-4279-be51-9535450b931d',
      targetHandle: '96761be7-1a90-4a80-8710-6268ee350b28',
      id: 'reactflow__edge-$flow_e19a1273-e3fa-4050-a231-5651cd16994d265ba96b-c66b-4ca5-8803-d2a599d9c3ad-$flow_f1d88368-6e1b-4279-be51-9535450b931d96761be7-1a90-4a80-8710-6268ee350b28',
    },
    {
      animated: true,
      source: '$flow_b433e7b1-d64c-4eb2-8928-4b0183d3a464',
      sourceHandle: '213121f3-8fbd-4cad-b889-be836e6c57c0',
      target: '$flow_ad81f8af-a554-4eeb-8e14-eeca63ebb40c',
      targetHandle: 'b770be31-a360-4944-aa5d-b8e66afd3fae',
      id: 'reactflow__edge-$flow_b433e7b1-d64c-4eb2-8928-4b0183d3a464213121f3-8fbd-4cad-b889-be836e6c57c0-$flow_ad81f8af-a554-4eeb-8e14-eeca63ebb40cb770be31-a360-4944-aa5d-b8e66afd3fae',
    },
    {
      animated: true,
      source: '$flow_f1d88368-6e1b-4279-be51-9535450b931d',
      sourceHandle: '05fcbe6c-63a3-4203-84cc-1b947037ad25',
      target: '$flow_ad81f8af-a554-4eeb-8e14-eeca63ebb40c',
      targetHandle: '820215c9-7c22-424f-9310-138cf6147fab',
      id: 'reactflow__edge-$flow_f1d88368-6e1b-4279-be51-9535450b931d05fcbe6c-63a3-4203-84cc-1b947037ad25-$flow_ad81f8af-a554-4eeb-8e14-eeca63ebb40c820215c9-7c22-424f-9310-138cf6147fab',
    },
  ],
};

export const defaultDataWithOperator = {
  nodes: [
    {
      id: '$flow_b433e7b1-d64c-4eb2-8928-4b0183d3a464',
      position: {
        x: 343,
        y: 40,
      },
      type: 'StateNode',
      data: {
        operatorType: 'StateOperator',
        sourcePorts: [
          {
            id: '213121f3-8fbd-4cad-b889-be836e6c57c0',
            type: 'State',
            label: 'data',
          },
        ],
        targetPorts: [
          {
            id: '297f6361-97af-457e-a20d-3edf6ed6e522',
            type: 'UpdateHanlder',
            label: 'update',
          },
        ],
        operatorName: 'StateOperator',
        value: 1,
        valueType: 'number',
      },
      dragging: false,
      width: 125,
      height: 122,
      selected: false,
      positionAbsolute: {
        x: 343,
        y: 40,
      },
    },
    {
      unique: true,
      id: '$flow_e19a1273-e3fa-4050-a231-5651cd16994d',
      position: {
        x: 126,
        y: 80,
      },
      type: 'InputNode',
      data: {
        operatorType: 'InputOperator',
        sourcePorts: [
          {
            id: '51d75f6a-c975-463b-948f-387c8fea64b4',
            type: 'State',
            label: 'state',
          },
          {
            id: 'cdcd71a3-b4cd-482b-89fc-0f3c5d599585',
            type: 'Event',
            label: 'event',
          },
          {
            id: 'abb37438-8335-4958-a0a4-f8d36aeeee98',
            type: 'LifeCycle',
            label: 'beforeMount',
          },
          {
            id: '6162087c-33af-472a-bc8e-c14194334724',
            type: 'LifeCycle',
            label: 'mount',
          },
          {
            id: 'a2a44458-78c7-4f34-929d-f1b73ec85217',
            type: 'LifeCycle',
            label: 'beforeUnmount',
          },
          {
            id: '803e3db3-689e-43cc-b3cb-6fde415019b0',
            type: 'LifeCycle',
            label: 'unmount',
          },
          {
            id: '265ba96b-c66b-4ca5-8803-d2a599d9c3ad',
            type: 'Event',
            label: 'Event-1',
          },
        ],
        targetPorts: [],
        operatorName: 'InputOperator',
      },
      dragging: false,
      width: 118,
      height: 249,
      selected: false,
      positionAbsolute: {
        x: 126,
        y: 80,
      },
    },
    {
      unique: true,
      id: '$flow_ad81f8af-a554-4eeb-8e14-eeca63ebb40c',
      position: {
        x: 833,
        y: 123,
      },
      type: 'OutputNode',
      data: {
        operatorType: 'OutputOperator',
        sourcePorts: [],
        targetPorts: [
          {
            id: 'b770be31-a360-4944-aa5d-b8e66afd3fae',
            type: 'State',
            label: 'state',
          },
          {
            id: 'edf3df43-70b5-436d-8b8c-087208514319',
            type: 'Event',
            label: 'event',
          },
          {
            id: '820215c9-7c22-424f-9310-138cf6147fab',
            type: 'State',
            label: 'State-1',
          },
        ],
        operatorName: 'OutputOperator',
      },
      width: 118,
      height: 163,
      dragging: false,
      selected: false,
      positionAbsolute: {
        x: 833,
        y: 123,
      },
    },
    {
      unique: true,
      id: '$flow_440e52ff-f4e9-4a6b-b0c9-ffd78045f7aa',
      position: {
        x: 568,
        y: 106,
      },
      type: 'StreamOperatorNode',
      data: {
        operatorType: 'SumOperator',
        sourcePorts: [
          {
            id: '9e686774-85f0-4037-baca-79a3af140e52',
            type: 'unknown port type',
            label: 'output',
          },
        ],
        targetPorts: [
          {
            id: '01a13e59-0cd6-43d5-9430-801fd5e9395a',
            type: 'unknown port type',
            label: 'input-1',
          },
          {
            id: 'c563e5a1-7e49-49a4-b7aa-0803f57f6098',
            type: 'unknown port type',
            label: 'input-2',
          },
        ],
        operatorName: 'SumOperator',
        allowAddTargetPort: true,
      },
      dragging: false,
      width: 125,
      height: 149,
      selected: false,
      positionAbsolute: {
        x: 568,
        y: 106,
      },
    },
    {
      id: '$flow_d94aeb6b-17ee-4835-97f5-3de6826c030b',
      position: {
        x: 347,
        y: 195,
      },
      type: 'StateNode',
      data: {
        operatorType: 'StateOperator',
        sourcePorts: [
          {
            id: 'dd3b5248-2a93-4972-b43a-1a7f5fda1410',
            type: 'State',
            label: 'data',
          },
        ],
        targetPorts: [
          {
            id: 'ec6f12f1-0b30-4354-8ba3-1e6b7b55715c',
            type: 'UpdateHanlder',
            label: 'update',
          },
        ],
        operatorName: 'StateOperator',
        value: 0,
        valueType: 'number',
      },
      dragging: false,
      width: 125,
      height: 122,
      selected: false,
      positionAbsolute: {
        x: 347,
        y: 195,
      },
    },
  ],
  edges: [
    {
      animated: true,
      source: '$flow_e19a1273-e3fa-4050-a231-5651cd16994d',
      sourceHandle: 'cdcd71a3-b4cd-482b-89fc-0f3c5d599585',
      target: '$flow_b433e7b1-d64c-4eb2-8928-4b0183d3a464',
      targetHandle: '297f6361-97af-457e-a20d-3edf6ed6e522',
      id: 'reactflow__edge-$flow_e19a1273-e3fa-4050-a231-5651cd16994dcdcd71a3-b4cd-482b-89fc-0f3c5d599585-$flow_b433e7b1-d64c-4eb2-8928-4b0183d3a464297f6361-97af-457e-a20d-3edf6ed6e522',
    },
    {
      animated: true,
      source: '$flow_e19a1273-e3fa-4050-a231-5651cd16994d',
      sourceHandle: '265ba96b-c66b-4ca5-8803-d2a599d9c3ad',
      target: '$flow_d94aeb6b-17ee-4835-97f5-3de6826c030b',
      targetHandle: 'ec6f12f1-0b30-4354-8ba3-1e6b7b55715c',
      id: 'reactflow__edge-$flow_e19a1273-e3fa-4050-a231-5651cd16994d265ba96b-c66b-4ca5-8803-d2a599d9c3ad-$flow_d94aeb6b-17ee-4835-97f5-3de6826c030bec6f12f1-0b30-4354-8ba3-1e6b7b55715c',
    },
    {
      animated: true,
      source: '$flow_b433e7b1-d64c-4eb2-8928-4b0183d3a464',
      sourceHandle: '213121f3-8fbd-4cad-b889-be836e6c57c0',
      target: '$flow_440e52ff-f4e9-4a6b-b0c9-ffd78045f7aa',
      targetHandle: '01a13e59-0cd6-43d5-9430-801fd5e9395a',
      id: 'reactflow__edge-$flow_b433e7b1-d64c-4eb2-8928-4b0183d3a464213121f3-8fbd-4cad-b889-be836e6c57c0-$flow_440e52ff-f4e9-4a6b-b0c9-ffd78045f7aa01a13e59-0cd6-43d5-9430-801fd5e9395a',
    },
    {
      animated: true,
      source: '$flow_d94aeb6b-17ee-4835-97f5-3de6826c030b',
      sourceHandle: 'dd3b5248-2a93-4972-b43a-1a7f5fda1410',
      target: '$flow_440e52ff-f4e9-4a6b-b0c9-ffd78045f7aa',
      targetHandle: 'c563e5a1-7e49-49a4-b7aa-0803f57f6098',
      id: 'reactflow__edge-$flow_d94aeb6b-17ee-4835-97f5-3de6826c030bdd3b5248-2a93-4972-b43a-1a7f5fda1410-$flow_440e52ff-f4e9-4a6b-b0c9-ffd78045f7aac563e5a1-7e49-49a4-b7aa-0803f57f6098',
    },
    {
      animated: true,
      source: '$flow_440e52ff-f4e9-4a6b-b0c9-ffd78045f7aa',
      sourceHandle: '9e686774-85f0-4037-baca-79a3af140e52',
      target: '$flow_ad81f8af-a554-4eeb-8e14-eeca63ebb40c',
      targetHandle: 'b770be31-a360-4944-aa5d-b8e66afd3fae',
      id: 'reactflow__edge-$flow_440e52ff-f4e9-4a6b-b0c9-ffd78045f7aa9e686774-85f0-4037-baca-79a3af140e52-$flow_ad81f8af-a554-4eeb-8e14-eeca63ebb40cb770be31-a360-4944-aa5d-b8e66afd3fae',
    },
  ],
};

export const defaultLayerData = {
  id: '4e76460d-5953-435a-8d79-c7a34c3a1d48',
  name: 'App',
  children: [
    {
      id: '4471b41b-9bde-46f1-aa6a-6d136c69388b',
      name: 'CustomOperator',
      children: [],
      nodes: [
        {
          unique: true,
          id: '$flow_a92b2370-16b0-4e59-bd3a-21642d061495',
          position: {
            x: 175,
            y: 70,
          },
          type: 'InputNode',
          data: {
            operatorType: 'InputOperator',
            sourcePorts: [
              {
                id: 'd801c9c4-365a-4044-97d7-62edb2aa4da9',
                type: 'State',
                label: 'state',
              },
              {
                id: '189661b5-3a3c-4e33-8525-39eaecb6b2ea',
                type: 'Event',
                label: 'input-event',
              },
              {
                id: '9db4ee6d-74f9-4ac4-84c2-247753b6f6fe',
                type: 'LifeCycle',
                label: 'beforeMount',
              },
              {
                id: '76981d76-0e2b-4301-89f5-d5c4d59c21ab',
                type: 'LifeCycle',
                label: 'mount',
              },
              {
                id: 'c23f4fad-efd6-4160-bc86-6973b5257752',
                type: 'LifeCycle',
                label: 'beforeUnmount',
              },
              {
                id: '5e1d18b6-5de7-4baf-b58b-ac521e3c507d',
                type: 'LifeCycle',
                label: 'unmount',
              },
              {
                id: '67768107-2cab-4971-b6d6-edc11239bc32',
                type: 'State',
                label: 'State-1',
              },
              {
                id: 'e2ca352d-8086-4185-8afe-548041fa68b5',
                type: 'State',
                label: 'State-2',
              },
            ],
            targetPorts: [],
            operatorName: 'InputOperator',
          },
          width: 118,
          height: 263,
          dragging: false,
          selected: false,
        },
        {
          id: '$flow_c71daed1-712a-499c-9391-bd84c1948ada',
          position: {
            x: 383,
            y: 156,
          },
          type: 'StreamOperatorNode',
          data: {
            operatorType: 'SumOperator',
            sourcePorts: [
              {
                id: 'faf68b7b-9313-4325-b812-7fe17b29cd1a',
                type: 'unknown port type',
                label: 'output',
              },
            ],
            targetPorts: [
              {
                id: '8b634a70-2024-4411-bcc1-e1beb77153d5',
                type: 'unknown port type',
                label: 'input-1',
              },
              {
                id: 'b1869048-e9a4-4d03-9227-7feb754de2a8',
                type: 'unknown port type',
                label: 'input-2',
              },
            ],
            operatorName: 'SumOperator',
            allowAddTargetPort: true,
          },
          width: 125,
          height: 149,
          dragging: false,
        },
        {
          unique: true,
          id: '$flow_c342d455-0dbf-4ad9-b9dc-fe938f3b6653',
          position: {
            x: 581,
            y: 136,
          },
          type: 'OutputNode',
          data: {
            operatorType: 'OutputOperator',
            sourcePorts: [],
            targetPorts: [
              {
                id: '134320a7-4817-4317-9e0f-95053aa0bb10',
                type: 'State',
                label: 'state',
              },
              {
                id: '4a9a346b-91e2-4d71-9df0-80a9e037b011',
                type: 'Event',
                label: 'output-event',
              },
            ],
            operatorName: 'OutputOperator',
          },
          width: 118,
          height: 149,
          dragging: false,
          selected: false,
          positionAbsolute: {
            x: 581,
            y: 136,
          },
        },
      ],
      edges: [
        {
          animated: true,
          source: '$flow_a92b2370-16b0-4e59-bd3a-21642d061495',
          sourceHandle: '67768107-2cab-4971-b6d6-edc11239bc32',
          target: '$flow_c71daed1-712a-499c-9391-bd84c1948ada',
          targetHandle: '8b634a70-2024-4411-bcc1-e1beb77153d5',
          id: 'reactflow__edge-$flow_a92b2370-16b0-4e59-bd3a-21642d06149567768107-2cab-4971-b6d6-edc11239bc32-$flow_c71daed1-712a-499c-9391-bd84c1948ada8b634a70-2024-4411-bcc1-e1beb77153d5',
        },
        {
          animated: true,
          source: '$flow_a92b2370-16b0-4e59-bd3a-21642d061495',
          sourceHandle: 'e2ca352d-8086-4185-8afe-548041fa68b5',
          target: '$flow_c71daed1-712a-499c-9391-bd84c1948ada',
          targetHandle: 'b1869048-e9a4-4d03-9227-7feb754de2a8',
          id: 'reactflow__edge-$flow_a92b2370-16b0-4e59-bd3a-21642d061495e2ca352d-8086-4185-8afe-548041fa68b5-$flow_c71daed1-712a-499c-9391-bd84c1948adab1869048-e9a4-4d03-9227-7feb754de2a8',
        },
        {
          animated: true,
          source: '$flow_c71daed1-712a-499c-9391-bd84c1948ada',
          sourceHandle: 'faf68b7b-9313-4325-b812-7fe17b29cd1a',
          target: '$flow_c342d455-0dbf-4ad9-b9dc-fe938f3b6653',
          targetHandle: '134320a7-4817-4317-9e0f-95053aa0bb10',
          id: 'reactflow__edge-$flow_c71daed1-712a-499c-9391-bd84c1948adafaf68b7b-9313-4325-b812-7fe17b29cd1a-$flow_c342d455-0dbf-4ad9-b9dc-fe938f3b6653134320a7-4817-4317-9e0f-95053aa0bb10',
        },
      ],
      parentLayerId: '4e76460d-5953-435a-8d79-c7a34c3a1d48',
      relativeNodeId: '$flow_cfdba689-cc3b-4775-83c3-902fbd1a791a',
    },
  ],
  nodes: [
    {
      id: '$flow_c46dcd8c-0eaa-4389-a29b-1620e014a8c7',
      position: {
        x: 256,
        y: 203,
      },
      type: 'StateNode',
      data: {
        operatorType: 'StateOperator',
        sourcePorts: [
          {
            id: 'c54dea2e-fae8-4934-8788-ec68bcd7d373',
            type: 'State',
            label: 'data',
          },
        ],
        targetPorts: [
          {
            id: 'dcaaf65c-7eae-437f-a785-2cea1b2ca7e0',
            type: 'UpdateHanlder',
            label: 'update',
          },
        ],
        operatorName: 'StateOperator',
        value: 0,
        valueType: 'number',
      },
      dragging: false,
      width: 125,
      height: 122,
      selected: false,
      positionAbsolute: {
        x: 256,
        y: 203,
      },
    },
    {
      unique: true,
      id: '$flow_7b90c984-8e5f-4416-bb2a-b6f7c8b7a5e3',
      position: {
        x: 80,
        y: 66,
      },
      type: 'InputNode',
      data: {
        operatorType: 'InputOperator',
        sourcePorts: [
          {
            id: '05f38e1e-7783-4e9b-a333-86dbb567934c',
            type: 'State',
            label: 'state',
          },
          {
            id: '4a9f067f-3b86-4f54-b580-04cf07ba0519',
            type: 'Event',
            label: 'input-event',
          },
          {
            id: '2ccf5681-dd5f-4405-b3a7-ccac47f16e26',
            type: 'LifeCycle',
            label: 'beforeMount',
          },
          {
            id: 'd20f5407-90c0-44d5-ad83-42ebe58285fb',
            type: 'LifeCycle',
            label: 'mount',
          },
          {
            id: 'ec742cd6-10c5-4518-b79e-25241464f6e3',
            type: 'LifeCycle',
            label: 'beforeUnmount',
          },
          {
            id: 'c88a9b97-0a34-4685-96d1-c9fa80379246',
            type: 'LifeCycle',
            label: 'unmount',
          },
          {
            id: 'cf9950e5-c38a-45dc-880d-29b2e920e389',
            type: 'Event',
            label: 'Event-1',
          },
        ],
        targetPorts: [],
        operatorName: 'InputOperator',
      },
      width: 118,
      height: 249,
      dragging: false,
      selected: false,
      positionAbsolute: {
        x: 80,
        y: 66,
      },
    },
    {
      id: '$flow_5d5ce5d5-73b2-4dce-ac51-10cb2e9809ef',
      position: {
        x: 260,
        y: 90,
      },
      type: 'StateNode',
      data: {
        operatorType: 'ConstStateOperator',
        sourcePorts: [
          {
            id: '4a27c999-3795-4a99-91e2-5ee661de81ca',
            type: 'State',
            label: 'data',
          },
        ],
        targetPorts: [],
        operatorName: 'ConstStateOperator',
        value: 0,
        valueType: 'number',
      },
      dragging: false,
      width: 125,
      height: 92,
      selected: false,
    },
    {
      id: '$flow_cfdba689-cc3b-4775-83c3-902fbd1a791a',
      position: {
        x: 458,
        y: 71,
      },
      type: 'CustomNode',
      data: {
        operatorType: 'CustomOperator',
        sourcePorts: [
          {
            id: '134320a7-4817-4317-9e0f-95053aa0bb10',
            type: 'State',
            label: 'state',
          },
          {
            id: '4a9a346b-91e2-4d71-9df0-80a9e037b011',
            type: 'Event',
            label: 'output-event',
          },
        ],
        targetPorts: [
          {
            id: 'd801c9c4-365a-4044-97d7-62edb2aa4da9',
            type: 'State',
            label: 'state',
          },
          {
            id: '189661b5-3a3c-4e33-8525-39eaecb6b2ea',
            type: 'Event',
            label: 'input-event',
          },
          {
            id: '67768107-2cab-4971-b6d6-edc11239bc32',
            type: 'State',
            label: 'State-1',
          },
          {
            id: 'e2ca352d-8086-4185-8afe-548041fa68b5',
            type: 'State',
            label: 'State-2',
          },
        ],
        operatorName: 'CustomOperator',
        description: '双击进入编辑',
        layerId: '4471b41b-9bde-46f1-aa6a-6d136c69388b',
      },
      width: 125,
      height: 205,
      dragging: false,
      selected: false,
      positionAbsolute: {
        x: 458,
        y: 71,
      },
    },
    {
      unique: true,
      id: '$flow_d1596e8b-b389-4bcb-b993-c91201e264d9',
      position: {
        x: 710,
        y: 91,
      },
      type: 'OutputNode',
      data: {
        operatorType: 'OutputOperator',
        sourcePorts: [],
        targetPorts: [
          {
            id: 'db80a9cb-69e4-4eca-a528-3c8bdb4c57a6',
            type: 'State',
            label: 'state',
          },
          {
            id: '301e6f66-9e9a-4d4e-af43-ef3dbd01999f',
            type: 'Event',
            label: 'output-event',
          },
        ],
        operatorName: 'OutputOperator',
      },
      width: 118,
      height: 149,
      dragging: false,
      selected: false,
      positionAbsolute: {
        x: 710,
        y: 91,
      },
    },
  ],
  edges: [
    {
      animated: true,
      source: '$flow_cfdba689-cc3b-4775-83c3-902fbd1a791a',
      sourceHandle: '134320a7-4817-4317-9e0f-95053aa0bb10',
      target: '$flow_d1596e8b-b389-4bcb-b993-c91201e264d9',
      targetHandle: 'db80a9cb-69e4-4eca-a528-3c8bdb4c57a6',
      id: 'reactflow__edge-$flow_cfdba689-cc3b-4775-83c3-902fbd1a791a134320a7-4817-4317-9e0f-95053aa0bb10-$flow_d1596e8b-b389-4bcb-b993-c91201e264d9db80a9cb-69e4-4eca-a528-3c8bdb4c57a6',
    },
    {
      animated: true,
      source: '$flow_7b90c984-8e5f-4416-bb2a-b6f7c8b7a5e3',
      sourceHandle: 'cf9950e5-c38a-45dc-880d-29b2e920e389',
      target: '$flow_c46dcd8c-0eaa-4389-a29b-1620e014a8c7',
      targetHandle: 'dcaaf65c-7eae-437f-a785-2cea1b2ca7e0',
      id: 'reactflow__edge-$flow_7b90c984-8e5f-4416-bb2a-b6f7c8b7a5e3cf9950e5-c38a-45dc-880d-29b2e920e389-$flow_c46dcd8c-0eaa-4389-a29b-1620e014a8c7dcaaf65c-7eae-437f-a785-2cea1b2ca7e0',
    },
    {
      animated: true,
      source: '$flow_c46dcd8c-0eaa-4389-a29b-1620e014a8c7',
      sourceHandle: 'c54dea2e-fae8-4934-8788-ec68bcd7d373',
      target: '$flow_cfdba689-cc3b-4775-83c3-902fbd1a791a',
      targetHandle: '67768107-2cab-4971-b6d6-edc11239bc32',
      id: 'reactflow__edge-$flow_c46dcd8c-0eaa-4389-a29b-1620e014a8c7c54dea2e-fae8-4934-8788-ec68bcd7d373-$flow_cfdba689-cc3b-4775-83c3-902fbd1a791a67768107-2cab-4971-b6d6-edc11239bc32',
    },
    {
      animated: true,
      source: '$flow_5d5ce5d5-73b2-4dce-ac51-10cb2e9809ef',
      sourceHandle: '4a27c999-3795-4a99-91e2-5ee661de81ca',
      target: '$flow_cfdba689-cc3b-4775-83c3-902fbd1a791a',
      targetHandle: 'e2ca352d-8086-4185-8afe-548041fa68b5',
      id: 'reactflow__edge-$flow_5d5ce5d5-73b2-4dce-ac51-10cb2e9809ef4a27c999-3795-4a99-91e2-5ee661de81ca-$flow_cfdba689-cc3b-4775-83c3-902fbd1a791ae2ca352d-8086-4185-8afe-548041fa68b5',
    },
  ],
};
