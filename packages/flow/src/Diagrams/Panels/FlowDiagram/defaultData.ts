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
      id: 'e1b0fa24-13bf-4504-bc42-4dc5c51630df',
      name: 'CustomOperator',
      children: [],
      nodes: [
        {
          unique: true,
          id: '$flow_ae4c37c3-fe42-46bb-a1b4-cb6895a041aa',
          position: {
            x: 215,
            y: 142,
          },
          type: 'InputNode',
          data: {
            operatorType: 'InputOperator',
            sourcePorts: [
              {
                id: '94015e4b-893f-408c-a4bf-908eb0c633f7',
                type: 'State',
                label: 'state',
              },
              {
                id: '05ca9559-e153-41fe-932c-2c00fef7d55c',
                type: 'Event',
                label: 'input-event',
              },
              {
                id: '4177af19-8fe6-4380-b984-9d096f355632',
                type: 'LifeCycle',
                label: 'beforeMount',
              },
              {
                id: '1619c0b1-8ed8-4583-8a38-bf8f39108d23',
                type: 'LifeCycle',
                label: 'mount',
              },
              {
                id: 'c2c00127-f42d-4244-b103-8fd80d123a16',
                type: 'LifeCycle',
                label: 'beforeUnmount',
              },
              {
                id: 'dea58365-102c-40be-93fc-58c454d2cde1',
                type: 'LifeCycle',
                label: 'unmount',
              },
            ],
            targetPorts: [],
            operatorName: 'InputOperator',
          },
          width: 118,
          height: 235,
          dragging: false,
        },
        {
          unique: true,
          id: '$flow_656f2d33-6fc2-47a6-907f-0ee009ada5b5',
          position: {
            x: 561,
            y: 202,
          },
          type: 'OutputNode',
          data: {
            operatorType: 'OutputOperator',
            sourcePorts: [],
            targetPorts: [
              {
                id: 'f1738e4b-165d-4c62-9576-042e32828faa',
                type: 'State',
                label: 'state',
              },
              {
                id: '5d3f8d6e-ab19-4c40-96ea-76a34a82051c',
                type: 'Event',
                label: 'output-event',
              },
            ],
            operatorName: 'OutputOperator',
          },
          width: 118,
          height: 149,
          dragging: false,
          selected: true,
          positionAbsolute: {
            x: 561,
            y: 202,
          },
        },
      ],
      edges: [
        {
          animated: true,
          source: '$flow_ae4c37c3-fe42-46bb-a1b4-cb6895a041aa',
          sourceHandle: '94015e4b-893f-408c-a4bf-908eb0c633f7',
          target: '$flow_656f2d33-6fc2-47a6-907f-0ee009ada5b5',
          targetHandle: '5d3f8d6e-ab19-4c40-96ea-76a34a82051c',
          id: 'reactflow__edge-$flow_ae4c37c3-fe42-46bb-a1b4-cb6895a041aa94015e4b-893f-408c-a4bf-908eb0c633f7-$flow_656f2d33-6fc2-47a6-907f-0ee009ada5b55d3f8d6e-ab19-4c40-96ea-76a34a82051c',
        },
      ],
      parentLayerId: '4e76460d-5953-435a-8d79-c7a34c3a1d48',
      relativeNodeId: '$flow_30d886e2-0684-48ee-bf8a-50aba763cef1',
    },
  ],
  nodes: [
    {
      unique: true,
      id: '$flow_82e8272c-f0a8-4967-9d1d-e4d0d259dc18',
      position: {
        x: 975,
        y: 183,
      },
      type: 'OutputNode',
      data: {
        operatorType: 'OutputOperator',
        sourcePorts: [],
        targetPorts: [
          {
            id: 'fea2c610-9214-4b5b-b88f-2f03e18d18a2',
            type: 'State',
            label: 'state',
          },
          {
            id: '740faf9a-6de3-40d4-8058-73d5b6f528cf',
            type: 'Event',
            label: 'output-event',
          },
        ],
        operatorName: 'OutputOperator',
      },
      width: 118,
      height: 149,
      dragging: false,
      selected: true,
      positionAbsolute: {
        x: 975,
        y: 183,
      },
    },
    {
      id: '$flow_04d8424f-1cde-4834-993f-2caad0b1a496',
      position: {
        x: 442,
        y: 75,
      },
      type: 'StateNode',
      data: {
        operatorType: 'StateOperator',
        sourcePorts: [
          {
            id: '4719c38a-aea4-4be1-9b2e-e2a7340d8747',
            type: 'State',
            label: 'data',
          },
        ],
        targetPorts: [
          {
            id: '48830357-c715-482f-b598-fe8e8618ebd5',
            type: 'UpdateHanlder',
            label: 'update',
          },
        ],
        operatorName: 'StateOperator',
        value: 5,
        valueType: 'number',
      },
      width: 125,
      height: 122,
      dragging: false,
      selected: false,
      positionAbsolute: {
        x: 442,
        y: 75,
      },
    },
    {
      id: '$flow_ce39653c-a2dd-4c50-a2fa-a12707da0cf7',
      position: {
        x: 442,
        y: 241,
      },
      type: 'StateNode',
      data: {
        operatorType: 'StateOperator',
        sourcePorts: [
          {
            id: '05752d45-bcf3-41de-8889-edc6d08eb53a',
            type: 'State',
            label: 'data',
          },
        ],
        targetPorts: [
          {
            id: '28bfebfe-40d1-42eb-ab30-fa691a987af1',
            type: 'UpdateHanlder',
            label: 'update',
          },
        ],
        operatorName: 'StateOperator',
        value: 1,
        valueType: 'number',
      },
      width: 125,
      height: 122,
      dragging: false,
      selected: false,
      positionAbsolute: {
        x: 442,
        y: 241,
      },
    },
    {
      unique: true,
      id: '$flow_fe8634eb-d5b5-4f51-a0ef-9761116c8f5e',
      position: {
        x: 109,
        y: 79,
      },
      type: 'InputNode',
      data: {
        operatorType: 'InputOperator',
        sourcePorts: [
          {
            id: '85ee7449-592c-485e-9c9f-911f01093f13',
            type: 'State',
            label: 'state',
          },
          {
            id: '744fc5d9-082f-4712-92aa-f6d77113a48d',
            type: 'Event',
            label: 'input-event',
          },
          {
            id: '5f7d106b-b901-4302-8da9-ed1fb9a7af24',
            type: 'LifeCycle',
            label: 'beforeMount',
          },
          {
            id: '69f45023-ade8-4967-bf36-5f1aa65cade6',
            type: 'LifeCycle',
            label: 'mount',
          },
          {
            id: 'ff5a8811-0771-4657-a521-5825d6f8dd88',
            type: 'LifeCycle',
            label: 'beforeUnmount',
          },
          {
            id: '3b5a9959-6715-4e85-9497-d6080f696f76',
            type: 'LifeCycle',
            label: 'unmount',
          },
          {
            id: 'd2c6f1cf-4614-40c3-bc11-9e0d0e565f9b',
            type: 'Event',
            label: 'Event-1',
          },
          {
            id: '28ece8db-3641-4919-b9c9-4dbfdd9274e4',
            type: 'Event',
            label: 'Event-2',
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
      id: '$flow_c54a0bea-b93a-4bb9-8bf0-0401ec944d41',
      position: {
        x: 445,
        y: -67.80000000000001,
      },
      type: 'StateNode',
      data: {
        operatorType: 'ConstStateOperator',
        sourcePorts: [
          {
            id: '7fb85066-0c09-4276-9b8d-254bfff52d47',
            type: 'State',
            label: 'data',
          },
        ],
        targetPorts: [],
        operatorName: 'ConstStateOperator',
        value: 10,
        valueType: 'number',
      },
      width: 125,
      height: 92,
      dragging: false,
      selected: false,
      positionAbsolute: {
        x: 445,
        y: -67.80000000000001,
      },
    },
    {
      id: '$flow_0dfaeb4e-c00d-41b8-9e8b-1f4fb5c9d1a6',
      position: {
        x: 687,
        y: 113,
      },
      type: 'StreamOperatorNode',
      data: {
        operatorType: 'SumOperator',
        sourcePorts: [
          {
            id: '1eae67ba-0872-46cf-ae0d-e5c8475a0219',
            type: 'unknown port type',
            label: 'output',
          },
        ],
        targetPorts: [
          {
            id: '2db0ab9c-9244-4024-9f88-7be7ebb24b59',
            type: 'unknown port type',
            label: 'input-1',
          },
          {
            id: 'd4450ebc-564f-49ce-938a-de4fd635964c',
            type: 'unknown port type',
            label: 'input-2',
          },
          {
            id: 'bf0b64c5-33ed-490c-80fb-670d2e0c2dee',
            type: 'unknown port type',
            label: 'input-3',
          },
        ],
        operatorName: 'SumOperator',
        allowAddTargetPort: true,
      },
      width: 125,
      height: 171,
      dragging: false,
      selected: false,
      positionAbsolute: {
        x: 687,
        y: 113,
      },
    },
    {
      id: '$flow_30d886e2-0684-48ee-bf8a-50aba763cef1',
      position: {
        x: 700,
        y: 327.99999999999994,
      },
      type: 'CustomNode',
      data: {
        operatorType: 'CustomOperator',
        sourcePorts: [
          {
            id: 'f1738e4b-165d-4c62-9576-042e32828faa',
            type: 'State',
            label: 'state',
          },
          {
            id: '5d3f8d6e-ab19-4c40-96ea-76a34a82051c',
            type: 'Event',
            label: 'output-event',
          },
        ],
        targetPorts: [
          {
            id: '94015e4b-893f-408c-a4bf-908eb0c633f7',
            type: 'State',
            label: 'state',
          },
          {
            id: '05ca9559-e153-41fe-932c-2c00fef7d55c',
            type: 'Event',
            label: 'input-event',
          },
        ],
        operatorName: 'CustomOperator',
        description: '双击进入编辑',
        layerId: 'e1b0fa24-13bf-4504-bc42-4dc5c51630df',
      },
      dragging: false,
      width: 125,
      height: 161,
      selected: false,
      positionAbsolute: {
        x: 700,
        y: 327.99999999999994,
      },
    },
  ],
  edges: [
    {
      animated: true,
      source: '$flow_04d8424f-1cde-4834-993f-2caad0b1a496',
      sourceHandle: '4719c38a-aea4-4be1-9b2e-e2a7340d8747',
      target: '$flow_0dfaeb4e-c00d-41b8-9e8b-1f4fb5c9d1a6',
      targetHandle: '2db0ab9c-9244-4024-9f88-7be7ebb24b59',
      id: 'reactflow__edge-$flow_04d8424f-1cde-4834-993f-2caad0b1a4964719c38a-aea4-4be1-9b2e-e2a7340d8747-$flow_0dfaeb4e-c00d-41b8-9e8b-1f4fb5c9d1a62db0ab9c-9244-4024-9f88-7be7ebb24b59',
    },
    {
      animated: true,
      source: '$flow_ce39653c-a2dd-4c50-a2fa-a12707da0cf7',
      sourceHandle: '05752d45-bcf3-41de-8889-edc6d08eb53a',
      target: '$flow_0dfaeb4e-c00d-41b8-9e8b-1f4fb5c9d1a6',
      targetHandle: 'd4450ebc-564f-49ce-938a-de4fd635964c',
      id: 'reactflow__edge-$flow_ce39653c-a2dd-4c50-a2fa-a12707da0cf705752d45-bcf3-41de-8889-edc6d08eb53a-$flow_0dfaeb4e-c00d-41b8-9e8b-1f4fb5c9d1a6d4450ebc-564f-49ce-938a-de4fd635964c',
    },
    {
      animated: true,
      source: '$flow_0dfaeb4e-c00d-41b8-9e8b-1f4fb5c9d1a6',
      sourceHandle: '1eae67ba-0872-46cf-ae0d-e5c8475a0219',
      target: '$flow_82e8272c-f0a8-4967-9d1d-e4d0d259dc18',
      targetHandle: 'fea2c610-9214-4b5b-b88f-2f03e18d18a2',
      id: 'reactflow__edge-$flow_0dfaeb4e-c00d-41b8-9e8b-1f4fb5c9d1a61eae67ba-0872-46cf-ae0d-e5c8475a0219-$flow_82e8272c-f0a8-4967-9d1d-e4d0d259dc18fea2c610-9214-4b5b-b88f-2f03e18d18a2',
    },
    {
      animated: true,
      source: '$flow_fe8634eb-d5b5-4f51-a0ef-9761116c8f5e',
      sourceHandle: 'd2c6f1cf-4614-40c3-bc11-9e0d0e565f9b',
      target: '$flow_04d8424f-1cde-4834-993f-2caad0b1a496',
      targetHandle: '48830357-c715-482f-b598-fe8e8618ebd5',
      id: 'reactflow__edge-$flow_fe8634eb-d5b5-4f51-a0ef-9761116c8f5ed2c6f1cf-4614-40c3-bc11-9e0d0e565f9b-$flow_04d8424f-1cde-4834-993f-2caad0b1a49648830357-c715-482f-b598-fe8e8618ebd5',
    },
    {
      animated: true,
      source: '$flow_fe8634eb-d5b5-4f51-a0ef-9761116c8f5e',
      sourceHandle: '28ece8db-3641-4919-b9c9-4dbfdd9274e4',
      target: '$flow_ce39653c-a2dd-4c50-a2fa-a12707da0cf7',
      targetHandle: '28bfebfe-40d1-42eb-ab30-fa691a987af1',
      id: 'reactflow__edge-$flow_fe8634eb-d5b5-4f51-a0ef-9761116c8f5e28ece8db-3641-4919-b9c9-4dbfdd9274e4-$flow_ce39653c-a2dd-4c50-a2fa-a12707da0cf728bfebfe-40d1-42eb-ab30-fa691a987af1',
    },
    {
      animated: true,
      source: '$flow_c54a0bea-b93a-4bb9-8bf0-0401ec944d41',
      sourceHandle: '7fb85066-0c09-4276-9b8d-254bfff52d47',
      target: '$flow_0dfaeb4e-c00d-41b8-9e8b-1f4fb5c9d1a6',
      targetHandle: 'bf0b64c5-33ed-490c-80fb-670d2e0c2dee',
      id: 'reactflow__edge-$flow_c54a0bea-b93a-4bb9-8bf0-0401ec944d417fb85066-0c09-4276-9b8d-254bfff52d47-$flow_0dfaeb4e-c00d-41b8-9e8b-1f4fb5c9d1a6bf0b64c5-33ed-490c-80fb-670d2e0c2dee',
    },
    {
      animated: true,
      source: '$flow_ce39653c-a2dd-4c50-a2fa-a12707da0cf7',
      sourceHandle: '05752d45-bcf3-41de-8889-edc6d08eb53a',
      target: '$flow_30d886e2-0684-48ee-bf8a-50aba763cef1',
      targetHandle: '94015e4b-893f-408c-a4bf-908eb0c633f7',
      id: 'reactflow__edge-$flow_ce39653c-a2dd-4c50-a2fa-a12707da0cf705752d45-bcf3-41de-8889-edc6d08eb53a-$flow_30d886e2-0684-48ee-bf8a-50aba763cef194015e4b-893f-408c-a4bf-908eb0c633f7',
    },
    {
      animated: true,
      source: '$flow_30d886e2-0684-48ee-bf8a-50aba763cef1',
      sourceHandle: '5d3f8d6e-ab19-4c40-96ea-76a34a82051c',
      target: '$flow_82e8272c-f0a8-4967-9d1d-e4d0d259dc18',
      targetHandle: '740faf9a-6de3-40d4-8058-73d5b6f528cf',
      id: 'reactflow__edge-$flow_30d886e2-0684-48ee-bf8a-50aba763cef15d3f8d6e-ab19-4c40-96ea-76a34a82051c-$flow_82e8272c-f0a8-4967-9d1d-e4d0d259dc18740faf9a-6de3-40d4-8058-73d5b6f528cf',
    },
  ],
};
