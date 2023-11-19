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
