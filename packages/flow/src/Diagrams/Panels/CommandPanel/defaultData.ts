export const loopDemoData = {
  id: '52c9a455-3b00-4240-acdc-501de8dd190d',
  name: 'App',
  children: [],
  nodes: [
    {
      position: {
        x: 511,
        y: 292
      },
      id: '$flow_f0c2a254-0434-4e3c-8658-c6571c0d9d0f',
      type: 'Node',
      data: {
        operatorName: 'State',
        operatorType: 'StateOperator',
        nodeType: 'Node',
        endPointOptions: {
          endPointList: [
            {
              id: '3ffde193-f535-411e-8283-4616d3e29921',
              type: 'source',
              variableName: 'data_dkmt4',
              label: 'data',
              hint: 'data'
            },
            {
              id: '1e005bc7-6141-458a-a28a-14e2009ee1e7',
              type: 'target',
              variableName: 'update_w1acx',
              label: 'update',
              hint: 'update'
            }
          ]
        },
        value: 0,
        valueType: 'number'
      },
      width: 118,
      height: 136,
      dragging: false,
      selected: false,
      positionAbsolute: {
        x: 511,
        y: 292
      }
    },
    {
      position: {
        x: 725,
        y: 290
      },
      id: '$flow_b821e643-ec8e-4422-89a4-dbd1703a1966',
      type: 'Node',
      data: {
        operatorName: 'Output',
        operatorType: 'OutputOperator',
        nodeType: 'Node',
        endPointOptions: {
          endPointList: [
            {
              id: '9104b74e-7f0e-49db-828d-425ccac211ed',
              type: 'group',
              variableName: 'state_nsrsc',
              label: 'State',
              hint: 'state',
              children: [
                {
                  id: 'b85cf0aa-c815-46e5-9c82-2991ee90bde5',
                  type: 'target',
                  variableName: 'state_ntaik',
                  hint: 'state'
                }
              ],
              allowAddAndRemoveChildren: true,
              defaultChildData: {
                type: 'target',
                hint: 'state'
              }
            },
            {
              id: '99dcb167-03be-4d95-a794-d2fb2b96598a',
              type: 'group',
              variableName: 'event_u7nsf',
              label: 'Event',
              hint: 'event',
              children: [],
              allowAddAndRemoveChildren: true,
              defaultChildData: {
                type: 'target',
                hint: 'event'
              }
            }
          ]
        }
      },
      width: 118,
      height: 148,
      dragging: false,
      selected: false,
      positionAbsolute: {
        x: 725,
        y: 290
      }
    },
    {
      position: {
        x: 345,
        y: 266
      },
      id: '$flow_f14e69ec-b1ba-4e39-9748-5d89b7ca582f',
      type: 'Node',
      data: {
        operatorName: 'Merge',
        operatorType: 'MergeOperator',
        nodeType: 'Node',
        endPointOptions: {
          endPointList: [
            {
              id: '3b25197b-83b3-47f6-ba2f-7d5478412086',
              type: 'group',
              variableName: 'output_zdn7f',
              hint: 'output',
              children: [
                {
                  id: '73b965fd-7fd6-4c4c-ac31-916ab3130ab3',
                  type: 'source',
                  variableName: 'output_awo8m',
                  label: 'output',
                  hint: 'output',
                  variableType: 'array'
                }
              ]
            },
            {
              id: 'ae846f6e-9501-4e0a-a7db-1a6a8f2bb81e',
              type: 'group',
              variableName: 'input_4oq90',
              label: 'Stream',
              hint: 'input',
              children: [
                {
                  id: 'b63e542a-214b-4918-9388-778413d921e3',
                  type: 'target',
                  variableName: 'input_6yw48',
                  hint: 'input'
                },
                {
                  id: '8dd0dad0-0135-487d-9417-a05d5130e188',
                  type: 'target',
                  variableName: 'input_blxty',
                  hint: 'input'
                },
                {
                  id: 'c29b921d-acd8-4d73-9b7e-c0dbd19318c8',
                  type: 'target',
                  variableName: 'input_wdsfj',
                  hint: 'input'
                }
              ],
              allowAddAndRemoveChildren: true,
              defaultChildData: {
                hint: 'input',
                type: 'target'
              }
            }
          ]
        }
      },
      width: 118,
      height: 163,
      dragging: false,
      selected: false,
      positionAbsolute: {
        x: 345,
        y: 266
      }
    },
    {
      position: {
        x: 108,
        y: 315
      },
      id: '$flow_17f541a4-f480-45c5-a6bd-ab654945e512',
      type: 'Node',
      data: {
        operatorName: 'Input',
        operatorType: 'InputOperator',
        nodeType: 'Node',
        endPointOptions: {
          endPointList: [
            {
              id: '5a102ff6-a37a-45b9-a4b4-a38fd7369e7a',
              type: 'group',
              variableName: 'state_buhhs',
              label: 'State',
              hint: 'state',
              children: [
                {
                  id: '5bebcd05-9d98-42e9-9679-fa5cc14bc24f',
                  type: 'source',
                  variableName: 'state_fsap1',
                  hint: 'state'
                },
                {
                  id: '8327475f-80bc-41e4-84d5-595861bb03ad',
                  type: 'source',
                  variableName: 'state_nbpuh',
                  hint: 'state'
                }
              ],
              allowAddAndRemoveChildren: true,
              defaultChildData: {
                type: 'source',
                hint: 'state'
              }
            },
            {
              id: '8735a717-072b-43b2-b6bc-91929f24bc88',
              type: 'group',
              variableName: 'event_ahxxk',
              label: 'Event',
              hint: 'event',
              children: [],
              allowAddAndRemoveChildren: true,
              defaultChildData: {
                type: 'source',
                hint: 'event'
              }
            },
            {
              id: 'a971b98d-5918-43ad-a586-4d0e357be2ab',
              type: 'group',
              variableName: 'lifecycle_6pwm1',
              label: 'Lifecycle',
              hint: 'lifecycle',
              children: [
                {
                  id: 'c4638ffc-aae2-41ab-b9f5-63cb314e84bc',
                  type: 'source',
                  variableName: 'beforeMount'
                },
                {
                  id: 'bf5bf823-cc10-4760-9857-fe0d123831ab',
                  type: 'source',
                  variableName: 'mount'
                },
                {
                  id: '0cad4c93-a41a-4b0b-b884-04f6728b7196',
                  type: 'source',
                  variableName: 'beforeUnmount'
                },
                {
                  id: 'efd54e65-8abe-4b26-b745-6b80779c5c18',
                  type: 'source',
                  variableName: 'unmount'
                }
              ],
              allowAddAndRemoveChildren: false
            }
          ]
        }
      },
      width: 118,
      height: 248,
      dragging: false,
      selected: false,
      positionAbsolute: {
        x: 108,
        y: 315
      }
    },
    {
      position: {
        x: 365,
        y: 571
      },
      id: '$flow_a36d1f33-2e2f-4fb5-a496-1a13db60f192',
      type: 'Node',
      data: {
        operatorName: 'Transform',
        operatorType: 'TransformOperator',
        nodeType: 'Node',
        endPointOptions: {
          endPointList: [
            {
              id: 'ce9317fd-de38-44d0-8082-87428483a6ff',
              type: 'source',
              variableName: 'output_i5pnm',
              label: 'output',
              hint: 'output'
            },
            {
              id: '05b3e305-15eb-4c9f-a092-f6d8e4181236',
              type: 'target',
              variableName: 'input_mferc',
              label: 'input',
              hint: 'input'
            }
          ]
        },
        customCode:
          'module.exports = async function transform(input) {\n\tawait new Promise(resolve => setTimeout(resolve, 5000))\n}',
        nodeLabel: 'Sleep'
      },
      dragging: false,
      width: 118,
      height: 136,
      selected: false,
      positionAbsolute: {
        x: 365,
        y: 571
      }
    },
    {
      position: {
        x: 572,
        y: 522.6000000000001
      },
      id: '$flow_d02c1212-d525-4f78-8ab9-ce348eee56e6',
      type: 'Node',
      data: {
        operatorName: 'Combine',
        operatorType: 'CombineOperator',
        nodeType: 'Node',
        endPointOptions: {
          endPointList: [
            {
              id: 'f22d87eb-a28b-4508-b24d-79e742dc7813',
              type: 'group',
              variableName: 'output_3huje',
              hint: 'output',
              children: [
                {
                  id: '2ce6eb2b-657e-4da2-b157-618523490b8b',
                  type: 'source',
                  variableName: 'output_isiqc',
                  label: 'output',
                  hint: 'output',
                  variableType: 'array'
                }
              ]
            },
            {
              id: '2c727e8a-7add-45be-99c2-2b1a474aff30',
              type: 'group',
              variableName: 'mainInput_9xcls',
              label: 'Main Stream',
              hint: 'mainInput',
              children: [
                {
                  id: 'ee0cc676-e56b-4e1f-b075-2684dc50a33d',
                  type: 'target',
                  variableName: 'mainSource_fexm5',
                  hint: 'mainSource'
                }
              ],
              allowAddAndRemoveChildren: true,
              defaultChildData: {
                hint: 'mainSource',
                type: 'target'
              }
            },
            {
              id: 'd23c4d13-9992-4198-90b6-33279f08fcb3',
              type: 'group',
              variableName: 'appendInput_nfxld',
              label: 'Append Stream',
              hint: 'appendInput',
              children: [
                {
                  id: 'a273cc22-9082-4ab4-a592-7df312deb4f7',
                  type: 'target',
                  variableName: 'appendSource_70qn2',
                  hint: 'appendSource'
                }
              ],
              allowAddAndRemoveChildren: true,
              defaultChildData: {
                hint: 'appendSource',
                type: 'target'
              }
            }
          ]
        }
      },
      dragging: false,
      width: 141,
      height: 194,
      selected: false,
      positionAbsolute: {
        x: 572,
        y: 522.6000000000001
      }
    },
    {
      position: {
        x: 784,
        y: 532
      },
      id: '$flow_7c4ec381-82eb-418e-b299-feb1cd7c107d',
      type: 'Node',
      data: {
        operatorName: 'Transform',
        operatorType: 'TransformOperator',
        nodeType: 'Node',
        endPointOptions: {
          endPointList: [
            {
              id: '5e602cc8-1454-474f-8c75-0747f7a8c19b',
              type: 'source',
              variableName: 'output_akian',
              label: 'output',
              hint: 'output'
            },
            {
              id: 'fb957bad-04d7-485b-bc97-b31dbf1c191b',
              type: 'target',
              variableName: 'input_nhkro',
              label: 'input',
              hint: 'input'
            }
          ]
        },
        customCode: 'module.exports = function transform(input) {\n\treturn input[1] + 1;\n}',
        nodeLabel: 'Plus 1'
      },
      dragging: false,
      width: 118,
      height: 136,
      selected: true,
      positionAbsolute: {
        x: 784,
        y: 532
      }
    }
  ],
  edges: [
    {
      animated: true,
      source: '$flow_f0c2a254-0434-4e3c-8658-c6571c0d9d0f',
      sourceHandle: '3ffde193-f535-411e-8283-4616d3e29921',
      target: '$flow_b821e643-ec8e-4422-89a4-dbd1703a1966',
      targetHandle: 'b85cf0aa-c815-46e5-9c82-2991ee90bde5',
      id: 'reactflow__edge-$flow_f0c2a254-0434-4e3c-8658-c6571c0d9d0f3ffde193-f535-411e-8283-4616d3e29921-$flow_b821e643-ec8e-4422-89a4-dbd1703a1966b85cf0aa-c815-46e5-9c82-2991ee90bde5'
    },
    {
      animated: true,
      source: '$flow_f14e69ec-b1ba-4e39-9748-5d89b7ca582f',
      sourceHandle: '73b965fd-7fd6-4c4c-ac31-916ab3130ab3',
      target: '$flow_f0c2a254-0434-4e3c-8658-c6571c0d9d0f',
      targetHandle: '1e005bc7-6141-458a-a28a-14e2009ee1e7',
      id: 'reactflow__edge-$flow_f14e69ec-b1ba-4e39-9748-5d89b7ca582f73b965fd-7fd6-4c4c-ac31-916ab3130ab3-$flow_f0c2a254-0434-4e3c-8658-c6571c0d9d0f1e005bc7-6141-458a-a28a-14e2009ee1e7'
    },
    {
      animated: true,
      source: '$flow_17f541a4-f480-45c5-a6bd-ab654945e512',
      sourceHandle: '5bebcd05-9d98-42e9-9679-fa5cc14bc24f',
      target: '$flow_f14e69ec-b1ba-4e39-9748-5d89b7ca582f',
      targetHandle: 'b63e542a-214b-4918-9388-778413d921e3',
      id: 'reactflow__edge-$flow_17f541a4-f480-45c5-a6bd-ab654945e5125bebcd05-9d98-42e9-9679-fa5cc14bc24f-$flow_f14e69ec-b1ba-4e39-9748-5d89b7ca582fb63e542a-214b-4918-9388-778413d921e3'
    },
    {
      animated: true,
      source: '$flow_17f541a4-f480-45c5-a6bd-ab654945e512',
      sourceHandle: '8327475f-80bc-41e4-84d5-595861bb03ad',
      target: '$flow_f14e69ec-b1ba-4e39-9748-5d89b7ca582f',
      targetHandle: '8dd0dad0-0135-487d-9417-a05d5130e188',
      id: 'reactflow__edge-$flow_17f541a4-f480-45c5-a6bd-ab654945e5128327475f-80bc-41e4-84d5-595861bb03ad-$flow_f14e69ec-b1ba-4e39-9748-5d89b7ca582f8dd0dad0-0135-487d-9417-a05d5130e188'
    },
    {
      animated: true,
      source: '$flow_f0c2a254-0434-4e3c-8658-c6571c0d9d0f',
      sourceHandle: '3ffde193-f535-411e-8283-4616d3e29921',
      target: '$flow_a36d1f33-2e2f-4fb5-a496-1a13db60f192',
      targetHandle: '05b3e305-15eb-4c9f-a092-f6d8e4181236',
      id: 'reactflow__edge-$flow_f0c2a254-0434-4e3c-8658-c6571c0d9d0f3ffde193-f535-411e-8283-4616d3e29921-$flow_a36d1f33-2e2f-4fb5-a496-1a13db60f19205b3e305-15eb-4c9f-a092-f6d8e4181236'
    },
    {
      animated: true,
      source: '$flow_7c4ec381-82eb-418e-b299-feb1cd7c107d',
      sourceHandle: '5e602cc8-1454-474f-8c75-0747f7a8c19b',
      target: '$flow_f14e69ec-b1ba-4e39-9748-5d89b7ca582f',
      targetHandle: 'c29b921d-acd8-4d73-9b7e-c0dbd19318c8',
      id: 'reactflow__edge-$flow_7c4ec381-82eb-418e-b299-feb1cd7c107d5e602cc8-1454-474f-8c75-0747f7a8c19b-$flow_f14e69ec-b1ba-4e39-9748-5d89b7ca582fc29b921d-acd8-4d73-9b7e-c0dbd19318c8'
    },
    {
      animated: true,
      source: '$flow_a36d1f33-2e2f-4fb5-a496-1a13db60f192',
      sourceHandle: 'ce9317fd-de38-44d0-8082-87428483a6ff',
      target: '$flow_d02c1212-d525-4f78-8ab9-ce348eee56e6',
      targetHandle: 'ee0cc676-e56b-4e1f-b075-2684dc50a33d',
      id: 'reactflow__edge-$flow_a36d1f33-2e2f-4fb5-a496-1a13db60f192ce9317fd-de38-44d0-8082-87428483a6ff-$flow_d02c1212-d525-4f78-8ab9-ce348eee56e6ee0cc676-e56b-4e1f-b075-2684dc50a33d'
    },
    {
      animated: true,
      source: '$flow_f0c2a254-0434-4e3c-8658-c6571c0d9d0f',
      sourceHandle: '3ffde193-f535-411e-8283-4616d3e29921',
      target: '$flow_d02c1212-d525-4f78-8ab9-ce348eee56e6',
      targetHandle: 'a273cc22-9082-4ab4-a592-7df312deb4f7',
      id: 'reactflow__edge-$flow_f0c2a254-0434-4e3c-8658-c6571c0d9d0f3ffde193-f535-411e-8283-4616d3e29921-$flow_d02c1212-d525-4f78-8ab9-ce348eee56e6a273cc22-9082-4ab4-a592-7df312deb4f7'
    },
    {
      animated: true,
      source: '$flow_d02c1212-d525-4f78-8ab9-ce348eee56e6',
      sourceHandle: '2ce6eb2b-657e-4da2-b157-618523490b8b',
      target: '$flow_7c4ec381-82eb-418e-b299-feb1cd7c107d',
      targetHandle: 'fb957bad-04d7-485b-bc97-b31dbf1c191b',
      id: 'reactflow__edge-$flow_d02c1212-d525-4f78-8ab9-ce348eee56e62ce6eb2b-657e-4da2-b157-618523490b8b-$flow_7c4ec381-82eb-418e-b299-feb1cd7c107dfb957bad-04d7-485b-bc97-b31dbf1c191b'
    }
  ]
};

export const sumDemoData = {
  id: 'ffcec994-0f74-4f54-aeb7-438885dbcc72',
  name: 'App',
  children: [],
  nodes: [
    {
      position: {
        x: 644,
        y: 102
      },
      id: '$flow_d59e81da-225c-40d2-9103-ee3e129514fa',
      type: 'Node',
      data: {
        operatorName: 'Output',
        operatorType: 'OutputOperator',
        nodeType: 'Node',
        endPointOptions: {
          endPointList: [
            {
              id: '20d9f812-f682-4b09-a201-7711882af890',
              type: 'group',
              variableName: 'state_rpxcg',
              label: 'State',
              hint: 'state',
              children: [
                {
                  id: '4dc98fc8-57b9-4c30-8425-d33e602810cd',
                  type: 'target',
                  variableName: 'state_k9vor',
                  hint: 'state'
                }
              ],
              allowAddAndRemoveChildren: true,
              defaultChildData: {
                type: 'target',
                hint: 'state'
              }
            },
            {
              id: 'abbf9ce7-b6a2-4d08-8a5c-90a76d044964',
              type: 'group',
              variableName: 'event_u8t6g',
              label: 'Event',
              hint: 'event',
              children: [],
              allowAddAndRemoveChildren: true,
              defaultChildData: {
                type: 'target',
                hint: 'event'
              }
            }
          ]
        }
      },
      width: 118,
      height: 148,
      dragging: false
    },
    {
      position: {
        x: 413,
        y: 81
      },
      id: '$flow_ba963a6d-a83c-4609-830f-48ef8d517402',
      type: 'Node',
      data: {
        operatorName: 'Sum',
        operatorType: 'SumOperator',
        nodeType: 'Node',
        endPointOptions: {
          endPointList: [
            {
              id: '5d36decd-40e9-4f0f-b919-4af7a33bb481',
              type: 'source',
              variableName: 'output_7c53x',
              label: 'output',
              hint: 'output'
            },
            {
              id: '98aa0131-1975-4cb0-9c35-46280f69a014',
              type: 'group',
              variableName: 'input_3wldr',
              hint: 'input',
              children: [
                {
                  id: '90c2a56d-c4df-4430-a4e2-cfcdb6cac3b3',
                  type: 'target',
                  variableName: 'input_zkw5x',
                  label: 'input',
                  hint: 'input'
                },
                {
                  id: 'f85709d5-0f20-4ab8-a719-03e4130d8ec3',
                  type: 'target',
                  variableName: 'input_tntx3',
                  label: 'input',
                  hint: 'input'
                }
              ],
              allowAddAndRemoveChildren: true,
              defaultChildData: {
                type: 'target',
                label: 'input',
                hint: 'input'
              }
            }
          ]
        }
      },
      width: 118,
      height: 136,
      dragging: false,
      selected: false,
      positionAbsolute: {
        x: 413,
        y: 81
      }
    },
    {
      position: {
        x: 130,
        y: 65
      },
      id: '$flow_cd5a79e3-ebae-4c72-833f-32a6a6d83bed',
      type: 'Node',
      data: {
        operatorName: 'Input',
        operatorType: 'InputOperator',
        nodeType: 'Node',
        endPointOptions: {
          endPointList: [
            {
              id: '4b6c72b1-30a9-42c8-b5df-3e37d3acc958',
              type: 'group',
              variableName: 'state_pq4d3',
              label: 'State',
              hint: 'state',
              children: [
                {
                  id: '1ba05470-5941-4e80-9c49-11c4bc2542fd',
                  type: 'source',
                  variableName: 'state_1naae',
                  hint: 'state'
                },
                {
                  id: '371ff3fd-e734-48d6-a05e-371ab850313a',
                  type: 'source',
                  variableName: 'state_4lmjx',
                  hint: 'state'
                }
              ],
              allowAddAndRemoveChildren: true,
              defaultChildData: {
                type: 'source',
                hint: 'state'
              }
            },
            {
              id: '8827904c-48b0-4409-9489-1a73fcb99a64',
              type: 'group',
              variableName: 'event_dlev2',
              label: 'Event',
              hint: 'event',
              children: [],
              allowAddAndRemoveChildren: true,
              defaultChildData: {
                type: 'source',
                hint: 'event'
              }
            },
            {
              id: 'e0c20603-88e0-4130-a583-f7cde637dff8',
              type: 'group',
              variableName: 'lifecycle_l5z4n',
              label: 'Lifecycle',
              hint: 'lifecycle',
              children: [
                {
                  id: 'bdb74a8d-d29a-4a62-8d20-ad3a1dad8450',
                  type: 'source',
                  variableName: 'beforeMount'
                },
                {
                  id: '82a9bb07-5619-4717-8618-a8c8cc03959a',
                  type: 'source',
                  variableName: 'mount'
                },
                {
                  id: 'd8525b49-242b-4572-8bd7-399bec64b338',
                  type: 'source',
                  variableName: 'beforeUnmount'
                },
                {
                  id: 'b6d06207-e8ea-47f8-af2c-fe2c60a328de',
                  type: 'source',
                  variableName: 'unmount'
                }
              ],
              allowAddAndRemoveChildren: false
            }
          ]
        }
      },
      width: 118,
      height: 248,
      dragging: false,
      selected: false,
      positionAbsolute: {
        x: 130,
        y: 65
      }
    }
  ],
  edges: [
    {
      animated: true,
      source: '$flow_cd5a79e3-ebae-4c72-833f-32a6a6d83bed',
      sourceHandle: '1ba05470-5941-4e80-9c49-11c4bc2542fd',
      target: '$flow_ba963a6d-a83c-4609-830f-48ef8d517402',
      targetHandle: '90c2a56d-c4df-4430-a4e2-cfcdb6cac3b3',
      id: 'reactflow__edge-$flow_cd5a79e3-ebae-4c72-833f-32a6a6d83bed1ba05470-5941-4e80-9c49-11c4bc2542fd-$flow_ba963a6d-a83c-4609-830f-48ef8d51740290c2a56d-c4df-4430-a4e2-cfcdb6cac3b3'
    },
    {
      animated: true,
      source: '$flow_cd5a79e3-ebae-4c72-833f-32a6a6d83bed',
      sourceHandle: '371ff3fd-e734-48d6-a05e-371ab850313a',
      target: '$flow_ba963a6d-a83c-4609-830f-48ef8d517402',
      targetHandle: 'f85709d5-0f20-4ab8-a719-03e4130d8ec3',
      id: 'reactflow__edge-$flow_cd5a79e3-ebae-4c72-833f-32a6a6d83bed371ff3fd-e734-48d6-a05e-371ab850313a-$flow_ba963a6d-a83c-4609-830f-48ef8d517402f85709d5-0f20-4ab8-a719-03e4130d8ec3'
    },
    {
      animated: true,
      source: '$flow_ba963a6d-a83c-4609-830f-48ef8d517402',
      sourceHandle: '5d36decd-40e9-4f0f-b919-4af7a33bb481',
      target: '$flow_d59e81da-225c-40d2-9103-ee3e129514fa',
      targetHandle: '4dc98fc8-57b9-4c30-8425-d33e602810cd',
      id: 'reactflow__edge-$flow_ba963a6d-a83c-4609-830f-48ef8d5174025d36decd-40e9-4f0f-b919-4af7a33bb481-$flow_d59e81da-225c-40d2-9103-ee3e129514fa4dc98fc8-57b9-4c30-8425-d33e602810cd'
    }
  ]
};
