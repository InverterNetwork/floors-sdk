export default {
    "scalars": [
        3,
        9,
        12,
        17,
        27,
        40,
        50,
        67,
        84,
        101,
        114,
        120,
        127,
        132,
        135,
        145,
        161,
        175,
        181,
        190,
        203,
        209,
        215,
        225,
        242,
        255,
        266,
        283,
        299,
        316,
        333,
        346,
        356,
        366,
        372,
        382,
        395,
        405,
        418,
        421,
        426,
        429,
        430,
        432,
        435,
        437,
        439,
        441,
        442,
        447,
        450,
        452,
        454,
        456,
        458
    ],
    "types": {
        "Account": {
            "id": [
                366
            ],
            "loans": [
                137,
                {
                    "distinct_on": [
                        161,
                        "[Loan_select_column!]"
                    ],
                    "limit": [
                        135
                    ],
                    "offset": [
                        135
                    ],
                    "order_by": [
                        160,
                        "[Loan_order_by!]"
                    ],
                    "where": [
                        157
                    ]
                }
            ],
            "marketsCreated": [
                171,
                {
                    "distinct_on": [
                        190,
                        "[Market_select_column!]"
                    ],
                    "limit": [
                        135
                    ],
                    "offset": [
                        135
                    ],
                    "order_by": [
                        189,
                        "[Market_order_by!]"
                    ],
                    "where": [
                        186
                    ]
                }
            ],
            "presaleParticipations": [
                235,
                {
                    "distinct_on": [
                        242,
                        "[PresaleParticipation_select_column!]"
                    ],
                    "limit": [
                        135
                    ],
                    "offset": [
                        135
                    ],
                    "order_by": [
                        241,
                        "[PresaleParticipation_order_by!]"
                    ],
                    "where": [
                        238
                    ]
                }
            ],
            "stakingPositions": [
                309,
                {
                    "distinct_on": [
                        316,
                        "[StakePosition_select_column!]"
                    ],
                    "limit": [
                        135
                    ],
                    "offset": [
                        135
                    ],
                    "order_by": [
                        315,
                        "[StakePosition_order_by!]"
                    ],
                    "where": [
                        312
                    ]
                }
            ],
            "trades": [
                375,
                {
                    "distinct_on": [
                        382,
                        "[Trade_select_column!]"
                    ],
                    "limit": [
                        135
                    ],
                    "offset": [
                        135
                    ],
                    "order_by": [
                        381,
                        "[Trade_order_by!]"
                    ],
                    "where": [
                        378
                    ]
                }
            ],
            "userMarketPositions": [
                398,
                {
                    "distinct_on": [
                        405,
                        "[UserMarketPosition_select_column!]"
                    ],
                    "limit": [
                        135
                    ],
                    "offset": [
                        135
                    ],
                    "order_by": [
                        404,
                        "[UserMarketPosition_order_by!]"
                    ],
                    "where": [
                        401
                    ]
                }
            ],
            "__typename": [
                366
            ]
        },
        "Account_bool_exp": {
            "_and": [
                1
            ],
            "_not": [
                1
            ],
            "_or": [
                1
            ],
            "id": [
                368
            ],
            "loans": [
                157
            ],
            "marketsCreated": [
                186
            ],
            "presaleParticipations": [
                238
            ],
            "stakingPositions": [
                312
            ],
            "trades": [
                378
            ],
            "userMarketPositions": [
                401
            ],
            "__typename": [
                366
            ]
        },
        "Account_order_by": {
            "id": [
                441
            ],
            "loans_aggregate": [
                155
            ],
            "marketsCreated_aggregate": [
                184
            ],
            "presaleParticipations_aggregate": [
                236
            ],
            "stakingPositions_aggregate": [
                310
            ],
            "trades_aggregate": [
                376
            ],
            "userMarketPositions_aggregate": [
                399
            ],
            "__typename": [
                366
            ]
        },
        "Account_select_column": {},
        "Account_stream_cursor_input": {
            "initial_value": [
                5
            ],
            "ordering": [
                429
            ],
            "__typename": [
                366
            ]
        },
        "Account_stream_cursor_value_input": {
            "id": [
                366
            ],
            "__typename": [
                366
            ]
        },
        "AuthorizerContract": {
            "createdAt": [
                439
            ],
            "floor": [
                366
            ],
            "id": [
                366
            ],
            "lastAssignedRoleId": [
                439
            ],
            "lastUpdatedAt": [
                439
            ],
            "roles": [
                258,
                {
                    "distinct_on": [
                        299,
                        "[Role_select_column!]"
                    ],
                    "limit": [
                        135
                    ],
                    "offset": [
                        135
                    ],
                    "order_by": [
                        298,
                        "[Role_order_by!]"
                    ],
                    "where": [
                        295
                    ]
                }
            ],
            "__typename": [
                366
            ]
        },
        "AuthorizerContract_bool_exp": {
            "_and": [
                7
            ],
            "_not": [
                7
            ],
            "_or": [
                7
            ],
            "createdAt": [
                440
            ],
            "floor": [
                368
            ],
            "id": [
                368
            ],
            "lastAssignedRoleId": [
                440
            ],
            "lastUpdatedAt": [
                440
            ],
            "roles": [
                295
            ],
            "__typename": [
                366
            ]
        },
        "AuthorizerContract_order_by": {
            "createdAt": [
                441
            ],
            "floor": [
                441
            ],
            "id": [
                441
            ],
            "lastAssignedRoleId": [
                441
            ],
            "lastUpdatedAt": [
                441
            ],
            "roles_aggregate": [
                293
            ],
            "__typename": [
                366
            ]
        },
        "AuthorizerContract_select_column": {},
        "AuthorizerContract_stream_cursor_input": {
            "initial_value": [
                11
            ],
            "ordering": [
                429
            ],
            "__typename": [
                366
            ]
        },
        "AuthorizerContract_stream_cursor_value_input": {
            "createdAt": [
                439
            ],
            "floor": [
                366
            ],
            "id": [
                366
            ],
            "lastAssignedRoleId": [
                439
            ],
            "lastUpdatedAt": [
                439
            ],
            "__typename": [
                366
            ]
        },
        "Boolean": {},
        "Boolean_comparison_exp": {
            "_eq": [
                12
            ],
            "_gt": [
                12
            ],
            "_gte": [
                12
            ],
            "_in": [
                12
            ],
            "_is_null": [
                12
            ],
            "_lt": [
                12
            ],
            "_lte": [
                12
            ],
            "_neq": [
                12
            ],
            "_nin": [
                12
            ],
            "__typename": [
                366
            ]
        },
        "CreditFacilityContract": {
            "borrowToken_id": [
                366
            ],
            "borrowingFeeRate": [
                439
            ],
            "collateralToken_id": [
                366
            ],
            "createdAt": [
                439
            ],
            "id": [
                366
            ],
            "lastUpdatedAt": [
                439
            ],
            "loanToValueRatio": [
                439
            ],
            "loans": [
                137,
                {
                    "distinct_on": [
                        161,
                        "[Loan_select_column!]"
                    ],
                    "limit": [
                        135
                    ],
                    "offset": [
                        135
                    ],
                    "order_by": [
                        160,
                        "[Loan_order_by!]"
                    ],
                    "where": [
                        157
                    ]
                }
            ],
            "market_id": [
                366
            ],
            "maxLeverage": [
                439
            ],
            "totalDebtFormatted": [
                366
            ],
            "totalDebtRaw": [
                439
            ],
            "totalLoans": [
                439
            ],
            "totalLockedCollateralFormatted": [
                366
            ],
            "totalLockedCollateralRaw": [
                439
            ],
            "totalVolumeFormatted": [
                366
            ],
            "totalVolumeRaw": [
                439
            ],
            "__typename": [
                366
            ]
        },
        "CreditFacilityContract_bool_exp": {
            "_and": [
                15
            ],
            "_not": [
                15
            ],
            "_or": [
                15
            ],
            "borrowToken_id": [
                368
            ],
            "borrowingFeeRate": [
                440
            ],
            "collateralToken_id": [
                368
            ],
            "createdAt": [
                440
            ],
            "id": [
                368
            ],
            "lastUpdatedAt": [
                440
            ],
            "loanToValueRatio": [
                440
            ],
            "loans": [
                157
            ],
            "market_id": [
                368
            ],
            "maxLeverage": [
                440
            ],
            "totalDebtFormatted": [
                368
            ],
            "totalDebtRaw": [
                440
            ],
            "totalLoans": [
                440
            ],
            "totalLockedCollateralFormatted": [
                368
            ],
            "totalLockedCollateralRaw": [
                440
            ],
            "totalVolumeFormatted": [
                368
            ],
            "totalVolumeRaw": [
                440
            ],
            "__typename": [
                366
            ]
        },
        "CreditFacilityContract_order_by": {
            "borrowToken_id": [
                441
            ],
            "borrowingFeeRate": [
                441
            ],
            "collateralToken_id": [
                441
            ],
            "createdAt": [
                441
            ],
            "id": [
                441
            ],
            "lastUpdatedAt": [
                441
            ],
            "loanToValueRatio": [
                441
            ],
            "loans_aggregate": [
                155
            ],
            "market_id": [
                441
            ],
            "maxLeverage": [
                441
            ],
            "totalDebtFormatted": [
                441
            ],
            "totalDebtRaw": [
                441
            ],
            "totalLoans": [
                441
            ],
            "totalLockedCollateralFormatted": [
                441
            ],
            "totalLockedCollateralRaw": [
                441
            ],
            "totalVolumeFormatted": [
                441
            ],
            "totalVolumeRaw": [
                441
            ],
            "__typename": [
                366
            ]
        },
        "CreditFacilityContract_select_column": {},
        "CreditFacilityContract_stream_cursor_input": {
            "initial_value": [
                19
            ],
            "ordering": [
                429
            ],
            "__typename": [
                366
            ]
        },
        "CreditFacilityContract_stream_cursor_value_input": {
            "borrowToken_id": [
                366
            ],
            "borrowingFeeRate": [
                439
            ],
            "collateralToken_id": [
                366
            ],
            "createdAt": [
                439
            ],
            "id": [
                366
            ],
            "lastUpdatedAt": [
                439
            ],
            "loanToValueRatio": [
                439
            ],
            "market_id": [
                366
            ],
            "maxLeverage": [
                439
            ],
            "totalDebtFormatted": [
                366
            ],
            "totalDebtRaw": [
                439
            ],
            "totalLoans": [
                439
            ],
            "totalLockedCollateralFormatted": [
                366
            ],
            "totalLockedCollateralRaw": [
                439
            ],
            "totalVolumeFormatted": [
                366
            ],
            "totalVolumeRaw": [
                439
            ],
            "__typename": [
                366
            ]
        },
        "FactoryDeployerPermission": {
            "allowed": [
                12
            ],
            "deployer": [
                366
            ],
            "factory_id": [
                366
            ],
            "id": [
                366
            ],
            "transactionHash": [
                366
            ],
            "updatedAt": [
                439
            ],
            "__typename": [
                366
            ]
        },
        "FactoryDeployerPermission_aggregate_order_by": {
            "avg": [
                22
            ],
            "count": [
                441
            ],
            "max": [
                24
            ],
            "min": [
                25
            ],
            "stddev": [
                28
            ],
            "stddev_pop": [
                29
            ],
            "stddev_samp": [
                30
            ],
            "sum": [
                33
            ],
            "var_pop": [
                34
            ],
            "var_samp": [
                35
            ],
            "variance": [
                36
            ],
            "__typename": [
                366
            ]
        },
        "FactoryDeployerPermission_avg_order_by": {
            "updatedAt": [
                441
            ],
            "__typename": [
                366
            ]
        },
        "FactoryDeployerPermission_bool_exp": {
            "_and": [
                23
            ],
            "_not": [
                23
            ],
            "_or": [
                23
            ],
            "allowed": [
                13
            ],
            "deployer": [
                368
            ],
            "factory_id": [
                368
            ],
            "id": [
                368
            ],
            "transactionHash": [
                368
            ],
            "updatedAt": [
                440
            ],
            "__typename": [
                366
            ]
        },
        "FactoryDeployerPermission_max_order_by": {
            "deployer": [
                441
            ],
            "factory_id": [
                441
            ],
            "id": [
                441
            ],
            "transactionHash": [
                441
            ],
            "updatedAt": [
                441
            ],
            "__typename": [
                366
            ]
        },
        "FactoryDeployerPermission_min_order_by": {
            "deployer": [
                441
            ],
            "factory_id": [
                441
            ],
            "id": [
                441
            ],
            "transactionHash": [
                441
            ],
            "updatedAt": [
                441
            ],
            "__typename": [
                366
            ]
        },
        "FactoryDeployerPermission_order_by": {
            "allowed": [
                441
            ],
            "deployer": [
                441
            ],
            "factory_id": [
                441
            ],
            "id": [
                441
            ],
            "transactionHash": [
                441
            ],
            "updatedAt": [
                441
            ],
            "__typename": [
                366
            ]
        },
        "FactoryDeployerPermission_select_column": {},
        "FactoryDeployerPermission_stddev_order_by": {
            "updatedAt": [
                441
            ],
            "__typename": [
                366
            ]
        },
        "FactoryDeployerPermission_stddev_pop_order_by": {
            "updatedAt": [
                441
            ],
            "__typename": [
                366
            ]
        },
        "FactoryDeployerPermission_stddev_samp_order_by": {
            "updatedAt": [
                441
            ],
            "__typename": [
                366
            ]
        },
        "FactoryDeployerPermission_stream_cursor_input": {
            "initial_value": [
                32
            ],
            "ordering": [
                429
            ],
            "__typename": [
                366
            ]
        },
        "FactoryDeployerPermission_stream_cursor_value_input": {
            "allowed": [
                12
            ],
            "deployer": [
                366
            ],
            "factory_id": [
                366
            ],
            "id": [
                366
            ],
            "transactionHash": [
                366
            ],
            "updatedAt": [
                439
            ],
            "__typename": [
                366
            ]
        },
        "FactoryDeployerPermission_sum_order_by": {
            "updatedAt": [
                441
            ],
            "__typename": [
                366
            ]
        },
        "FactoryDeployerPermission_var_pop_order_by": {
            "updatedAt": [
                441
            ],
            "__typename": [
                366
            ]
        },
        "FactoryDeployerPermission_var_samp_order_by": {
            "updatedAt": [
                441
            ],
            "__typename": [
                366
            ]
        },
        "FactoryDeployerPermission_variance_order_by": {
            "updatedAt": [
                441
            ],
            "__typename": [
                366
            ]
        },
        "FactoryDeploymentConfig": {
            "deployers": [
                20,
                {
                    "distinct_on": [
                        27,
                        "[FactoryDeployerPermission_select_column!]"
                    ],
                    "limit": [
                        135
                    ],
                    "offset": [
                        135
                    ],
                    "order_by": [
                        26,
                        "[FactoryDeployerPermission_order_by!]"
                    ],
                    "where": [
                        23
                    ]
                }
            ],
            "id": [
                366
            ],
            "kind": [
                430
            ],
            "lastUpdatedAt": [
                439
            ],
            "openDeployment": [
                12
            ],
            "__typename": [
                366
            ]
        },
        "FactoryDeploymentConfig_bool_exp": {
            "_and": [
                38
            ],
            "_not": [
                38
            ],
            "_or": [
                38
            ],
            "deployers": [
                23
            ],
            "id": [
                368
            ],
            "kind": [
                431
            ],
            "lastUpdatedAt": [
                440
            ],
            "openDeployment": [
                13
            ],
            "__typename": [
                366
            ]
        },
        "FactoryDeploymentConfig_order_by": {
            "deployers_aggregate": [
                21
            ],
            "id": [
                441
            ],
            "kind": [
                441
            ],
            "lastUpdatedAt": [
                441
            ],
            "openDeployment": [
                441
            ],
            "__typename": [
                366
            ]
        },
        "FactoryDeploymentConfig_select_column": {},
        "FactoryDeploymentConfig_stream_cursor_input": {
            "initial_value": [
                42
            ],
            "ordering": [
                429
            ],
            "__typename": [
                366
            ]
        },
        "FactoryDeploymentConfig_stream_cursor_value_input": {
            "id": [
                366
            ],
            "kind": [
                430
            ],
            "lastUpdatedAt": [
                439
            ],
            "openDeployment": [
                12
            ],
            "__typename": [
                366
            ]
        },
        "FeeSplitterPayment": {
            "amountFormatted": [
                366
            ],
            "amountRaw": [
                439
            ],
            "id": [
                366
            ],
            "isFloorFee": [
                12
            ],
            "market_id": [
                366
            ],
            "recipient": [
                366
            ],
            "timestamp": [
                439
            ],
            "token_id": [
                366
            ],
            "transactionHash": [
                366
            ],
            "treasury_id": [
                366
            ],
            "__typename": [
                366
            ]
        },
        "FeeSplitterPayment_aggregate_order_by": {
            "avg": [
                45
            ],
            "count": [
                441
            ],
            "max": [
                47
            ],
            "min": [
                48
            ],
            "stddev": [
                51
            ],
            "stddev_pop": [
                52
            ],
            "stddev_samp": [
                53
            ],
            "sum": [
                56
            ],
            "var_pop": [
                57
            ],
            "var_samp": [
                58
            ],
            "variance": [
                59
            ],
            "__typename": [
                366
            ]
        },
        "FeeSplitterPayment_avg_order_by": {
            "amountRaw": [
                441
            ],
            "timestamp": [
                441
            ],
            "__typename": [
                366
            ]
        },
        "FeeSplitterPayment_bool_exp": {
            "_and": [
                46
            ],
            "_not": [
                46
            ],
            "_or": [
                46
            ],
            "amountFormatted": [
                368
            ],
            "amountRaw": [
                440
            ],
            "id": [
                368
            ],
            "isFloorFee": [
                13
            ],
            "market_id": [
                368
            ],
            "recipient": [
                368
            ],
            "timestamp": [
                440
            ],
            "token_id": [
                368
            ],
            "transactionHash": [
                368
            ],
            "treasury_id": [
                368
            ],
            "__typename": [
                366
            ]
        },
        "FeeSplitterPayment_max_order_by": {
            "amountFormatted": [
                441
            ],
            "amountRaw": [
                441
            ],
            "id": [
                441
            ],
            "market_id": [
                441
            ],
            "recipient": [
                441
            ],
            "timestamp": [
                441
            ],
            "token_id": [
                441
            ],
            "transactionHash": [
                441
            ],
            "treasury_id": [
                441
            ],
            "__typename": [
                366
            ]
        },
        "FeeSplitterPayment_min_order_by": {
            "amountFormatted": [
                441
            ],
            "amountRaw": [
                441
            ],
            "id": [
                441
            ],
            "market_id": [
                441
            ],
            "recipient": [
                441
            ],
            "timestamp": [
                441
            ],
            "token_id": [
                441
            ],
            "transactionHash": [
                441
            ],
            "treasury_id": [
                441
            ],
            "__typename": [
                366
            ]
        },
        "FeeSplitterPayment_order_by": {
            "amountFormatted": [
                441
            ],
            "amountRaw": [
                441
            ],
            "id": [
                441
            ],
            "isFloorFee": [
                441
            ],
            "market_id": [
                441
            ],
            "recipient": [
                441
            ],
            "timestamp": [
                441
            ],
            "token_id": [
                441
            ],
            "transactionHash": [
                441
            ],
            "treasury_id": [
                441
            ],
            "__typename": [
                366
            ]
        },
        "FeeSplitterPayment_select_column": {},
        "FeeSplitterPayment_stddev_order_by": {
            "amountRaw": [
                441
            ],
            "timestamp": [
                441
            ],
            "__typename": [
                366
            ]
        },
        "FeeSplitterPayment_stddev_pop_order_by": {
            "amountRaw": [
                441
            ],
            "timestamp": [
                441
            ],
            "__typename": [
                366
            ]
        },
        "FeeSplitterPayment_stddev_samp_order_by": {
            "amountRaw": [
                441
            ],
            "timestamp": [
                441
            ],
            "__typename": [
                366
            ]
        },
        "FeeSplitterPayment_stream_cursor_input": {
            "initial_value": [
                55
            ],
            "ordering": [
                429
            ],
            "__typename": [
                366
            ]
        },
        "FeeSplitterPayment_stream_cursor_value_input": {
            "amountFormatted": [
                366
            ],
            "amountRaw": [
                439
            ],
            "id": [
                366
            ],
            "isFloorFee": [
                12
            ],
            "market_id": [
                366
            ],
            "recipient": [
                366
            ],
            "timestamp": [
                439
            ],
            "token_id": [
                366
            ],
            "transactionHash": [
                366
            ],
            "treasury_id": [
                366
            ],
            "__typename": [
                366
            ]
        },
        "FeeSplitterPayment_sum_order_by": {
            "amountRaw": [
                441
            ],
            "timestamp": [
                441
            ],
            "__typename": [
                366
            ]
        },
        "FeeSplitterPayment_var_pop_order_by": {
            "amountRaw": [
                441
            ],
            "timestamp": [
                441
            ],
            "__typename": [
                366
            ]
        },
        "FeeSplitterPayment_var_samp_order_by": {
            "amountRaw": [
                441
            ],
            "timestamp": [
                441
            ],
            "__typename": [
                366
            ]
        },
        "FeeSplitterPayment_variance_order_by": {
            "amountRaw": [
                441
            ],
            "timestamp": [
                441
            ],
            "__typename": [
                366
            ]
        },
        "FeeSplitterReceipt": {
            "amountFormatted": [
                366
            ],
            "amountRaw": [
                439
            ],
            "id": [
                366
            ],
            "market_id": [
                366
            ],
            "sender": [
                366
            ],
            "timestamp": [
                439
            ],
            "token_id": [
                366
            ],
            "transactionHash": [
                366
            ],
            "treasury_id": [
                366
            ],
            "__typename": [
                366
            ]
        },
        "FeeSplitterReceipt_aggregate_order_by": {
            "avg": [
                62
            ],
            "count": [
                441
            ],
            "max": [
                64
            ],
            "min": [
                65
            ],
            "stddev": [
                68
            ],
            "stddev_pop": [
                69
            ],
            "stddev_samp": [
                70
            ],
            "sum": [
                73
            ],
            "var_pop": [
                74
            ],
            "var_samp": [
                75
            ],
            "variance": [
                76
            ],
            "__typename": [
                366
            ]
        },
        "FeeSplitterReceipt_avg_order_by": {
            "amountRaw": [
                441
            ],
            "timestamp": [
                441
            ],
            "__typename": [
                366
            ]
        },
        "FeeSplitterReceipt_bool_exp": {
            "_and": [
                63
            ],
            "_not": [
                63
            ],
            "_or": [
                63
            ],
            "amountFormatted": [
                368
            ],
            "amountRaw": [
                440
            ],
            "id": [
                368
            ],
            "market_id": [
                368
            ],
            "sender": [
                368
            ],
            "timestamp": [
                440
            ],
            "token_id": [
                368
            ],
            "transactionHash": [
                368
            ],
            "treasury_id": [
                368
            ],
            "__typename": [
                366
            ]
        },
        "FeeSplitterReceipt_max_order_by": {
            "amountFormatted": [
                441
            ],
            "amountRaw": [
                441
            ],
            "id": [
                441
            ],
            "market_id": [
                441
            ],
            "sender": [
                441
            ],
            "timestamp": [
                441
            ],
            "token_id": [
                441
            ],
            "transactionHash": [
                441
            ],
            "treasury_id": [
                441
            ],
            "__typename": [
                366
            ]
        },
        "FeeSplitterReceipt_min_order_by": {
            "amountFormatted": [
                441
            ],
            "amountRaw": [
                441
            ],
            "id": [
                441
            ],
            "market_id": [
                441
            ],
            "sender": [
                441
            ],
            "timestamp": [
                441
            ],
            "token_id": [
                441
            ],
            "transactionHash": [
                441
            ],
            "treasury_id": [
                441
            ],
            "__typename": [
                366
            ]
        },
        "FeeSplitterReceipt_order_by": {
            "amountFormatted": [
                441
            ],
            "amountRaw": [
                441
            ],
            "id": [
                441
            ],
            "market_id": [
                441
            ],
            "sender": [
                441
            ],
            "timestamp": [
                441
            ],
            "token_id": [
                441
            ],
            "transactionHash": [
                441
            ],
            "treasury_id": [
                441
            ],
            "__typename": [
                366
            ]
        },
        "FeeSplitterReceipt_select_column": {},
        "FeeSplitterReceipt_stddev_order_by": {
            "amountRaw": [
                441
            ],
            "timestamp": [
                441
            ],
            "__typename": [
                366
            ]
        },
        "FeeSplitterReceipt_stddev_pop_order_by": {
            "amountRaw": [
                441
            ],
            "timestamp": [
                441
            ],
            "__typename": [
                366
            ]
        },
        "FeeSplitterReceipt_stddev_samp_order_by": {
            "amountRaw": [
                441
            ],
            "timestamp": [
                441
            ],
            "__typename": [
                366
            ]
        },
        "FeeSplitterReceipt_stream_cursor_input": {
            "initial_value": [
                72
            ],
            "ordering": [
                429
            ],
            "__typename": [
                366
            ]
        },
        "FeeSplitterReceipt_stream_cursor_value_input": {
            "amountFormatted": [
                366
            ],
            "amountRaw": [
                439
            ],
            "id": [
                366
            ],
            "market_id": [
                366
            ],
            "sender": [
                366
            ],
            "timestamp": [
                439
            ],
            "token_id": [
                366
            ],
            "transactionHash": [
                366
            ],
            "treasury_id": [
                366
            ],
            "__typename": [
                366
            ]
        },
        "FeeSplitterReceipt_sum_order_by": {
            "amountRaw": [
                441
            ],
            "timestamp": [
                441
            ],
            "__typename": [
                366
            ]
        },
        "FeeSplitterReceipt_var_pop_order_by": {
            "amountRaw": [
                441
            ],
            "timestamp": [
                441
            ],
            "__typename": [
                366
            ]
        },
        "FeeSplitterReceipt_var_samp_order_by": {
            "amountRaw": [
                441
            ],
            "timestamp": [
                441
            ],
            "__typename": [
                366
            ]
        },
        "FeeSplitterReceipt_variance_order_by": {
            "amountRaw": [
                441
            ],
            "timestamp": [
                441
            ],
            "__typename": [
                366
            ]
        },
        "FloorElevation": {
            "deployedAmountFormatted": [
                366
            ],
            "deployedAmountRaw": [
                439
            ],
            "id": [
                366
            ],
            "market_id": [
                366
            ],
            "newFloorPriceFormatted": [
                366
            ],
            "newFloorPriceRaw": [
                439
            ],
            "oldFloorPriceFormatted": [
                366
            ],
            "oldFloorPriceRaw": [
                439
            ],
            "timestamp": [
                439
            ],
            "transactionHash": [
                366
            ],
            "__typename": [
                366
            ]
        },
        "FloorElevation_aggregate_order_by": {
            "avg": [
                79
            ],
            "count": [
                441
            ],
            "max": [
                81
            ],
            "min": [
                82
            ],
            "stddev": [
                85
            ],
            "stddev_pop": [
                86
            ],
            "stddev_samp": [
                87
            ],
            "sum": [
                90
            ],
            "var_pop": [
                91
            ],
            "var_samp": [
                92
            ],
            "variance": [
                93
            ],
            "__typename": [
                366
            ]
        },
        "FloorElevation_avg_order_by": {
            "deployedAmountRaw": [
                441
            ],
            "newFloorPriceRaw": [
                441
            ],
            "oldFloorPriceRaw": [
                441
            ],
            "timestamp": [
                441
            ],
            "__typename": [
                366
            ]
        },
        "FloorElevation_bool_exp": {
            "_and": [
                80
            ],
            "_not": [
                80
            ],
            "_or": [
                80
            ],
            "deployedAmountFormatted": [
                368
            ],
            "deployedAmountRaw": [
                440
            ],
            "id": [
                368
            ],
            "market_id": [
                368
            ],
            "newFloorPriceFormatted": [
                368
            ],
            "newFloorPriceRaw": [
                440
            ],
            "oldFloorPriceFormatted": [
                368
            ],
            "oldFloorPriceRaw": [
                440
            ],
            "timestamp": [
                440
            ],
            "transactionHash": [
                368
            ],
            "__typename": [
                366
            ]
        },
        "FloorElevation_max_order_by": {
            "deployedAmountFormatted": [
                441
            ],
            "deployedAmountRaw": [
                441
            ],
            "id": [
                441
            ],
            "market_id": [
                441
            ],
            "newFloorPriceFormatted": [
                441
            ],
            "newFloorPriceRaw": [
                441
            ],
            "oldFloorPriceFormatted": [
                441
            ],
            "oldFloorPriceRaw": [
                441
            ],
            "timestamp": [
                441
            ],
            "transactionHash": [
                441
            ],
            "__typename": [
                366
            ]
        },
        "FloorElevation_min_order_by": {
            "deployedAmountFormatted": [
                441
            ],
            "deployedAmountRaw": [
                441
            ],
            "id": [
                441
            ],
            "market_id": [
                441
            ],
            "newFloorPriceFormatted": [
                441
            ],
            "newFloorPriceRaw": [
                441
            ],
            "oldFloorPriceFormatted": [
                441
            ],
            "oldFloorPriceRaw": [
                441
            ],
            "timestamp": [
                441
            ],
            "transactionHash": [
                441
            ],
            "__typename": [
                366
            ]
        },
        "FloorElevation_order_by": {
            "deployedAmountFormatted": [
                441
            ],
            "deployedAmountRaw": [
                441
            ],
            "id": [
                441
            ],
            "market_id": [
                441
            ],
            "newFloorPriceFormatted": [
                441
            ],
            "newFloorPriceRaw": [
                441
            ],
            "oldFloorPriceFormatted": [
                441
            ],
            "oldFloorPriceRaw": [
                441
            ],
            "timestamp": [
                441
            ],
            "transactionHash": [
                441
            ],
            "__typename": [
                366
            ]
        },
        "FloorElevation_select_column": {},
        "FloorElevation_stddev_order_by": {
            "deployedAmountRaw": [
                441
            ],
            "newFloorPriceRaw": [
                441
            ],
            "oldFloorPriceRaw": [
                441
            ],
            "timestamp": [
                441
            ],
            "__typename": [
                366
            ]
        },
        "FloorElevation_stddev_pop_order_by": {
            "deployedAmountRaw": [
                441
            ],
            "newFloorPriceRaw": [
                441
            ],
            "oldFloorPriceRaw": [
                441
            ],
            "timestamp": [
                441
            ],
            "__typename": [
                366
            ]
        },
        "FloorElevation_stddev_samp_order_by": {
            "deployedAmountRaw": [
                441
            ],
            "newFloorPriceRaw": [
                441
            ],
            "oldFloorPriceRaw": [
                441
            ],
            "timestamp": [
                441
            ],
            "__typename": [
                366
            ]
        },
        "FloorElevation_stream_cursor_input": {
            "initial_value": [
                89
            ],
            "ordering": [
                429
            ],
            "__typename": [
                366
            ]
        },
        "FloorElevation_stream_cursor_value_input": {
            "deployedAmountFormatted": [
                366
            ],
            "deployedAmountRaw": [
                439
            ],
            "id": [
                366
            ],
            "market_id": [
                366
            ],
            "newFloorPriceFormatted": [
                366
            ],
            "newFloorPriceRaw": [
                439
            ],
            "oldFloorPriceFormatted": [
                366
            ],
            "oldFloorPriceRaw": [
                439
            ],
            "timestamp": [
                439
            ],
            "transactionHash": [
                366
            ],
            "__typename": [
                366
            ]
        },
        "FloorElevation_sum_order_by": {
            "deployedAmountRaw": [
                441
            ],
            "newFloorPriceRaw": [
                441
            ],
            "oldFloorPriceRaw": [
                441
            ],
            "timestamp": [
                441
            ],
            "__typename": [
                366
            ]
        },
        "FloorElevation_var_pop_order_by": {
            "deployedAmountRaw": [
                441
            ],
            "newFloorPriceRaw": [
                441
            ],
            "oldFloorPriceRaw": [
                441
            ],
            "timestamp": [
                441
            ],
            "__typename": [
                366
            ]
        },
        "FloorElevation_var_samp_order_by": {
            "deployedAmountRaw": [
                441
            ],
            "newFloorPriceRaw": [
                441
            ],
            "oldFloorPriceRaw": [
                441
            ],
            "timestamp": [
                441
            ],
            "__typename": [
                366
            ]
        },
        "FloorElevation_variance_order_by": {
            "deployedAmountRaw": [
                441
            ],
            "newFloorPriceRaw": [
                441
            ],
            "oldFloorPriceRaw": [
                441
            ],
            "timestamp": [
                441
            ],
            "__typename": [
                366
            ]
        },
        "FloorRaiseAttempt": {
            "amountFormatted": [
                366
            ],
            "amountRaw": [
                439
            ],
            "id": [
                366
            ],
            "market_id": [
                366
            ],
            "success": [
                12
            ],
            "timestamp": [
                439
            ],
            "transactionHash": [
                366
            ],
            "treasury_id": [
                366
            ],
            "__typename": [
                366
            ]
        },
        "FloorRaiseAttempt_aggregate_order_by": {
            "avg": [
                96
            ],
            "count": [
                441
            ],
            "max": [
                98
            ],
            "min": [
                99
            ],
            "stddev": [
                102
            ],
            "stddev_pop": [
                103
            ],
            "stddev_samp": [
                104
            ],
            "sum": [
                107
            ],
            "var_pop": [
                108
            ],
            "var_samp": [
                109
            ],
            "variance": [
                110
            ],
            "__typename": [
                366
            ]
        },
        "FloorRaiseAttempt_avg_order_by": {
            "amountRaw": [
                441
            ],
            "timestamp": [
                441
            ],
            "__typename": [
                366
            ]
        },
        "FloorRaiseAttempt_bool_exp": {
            "_and": [
                97
            ],
            "_not": [
                97
            ],
            "_or": [
                97
            ],
            "amountFormatted": [
                368
            ],
            "amountRaw": [
                440
            ],
            "id": [
                368
            ],
            "market_id": [
                368
            ],
            "success": [
                13
            ],
            "timestamp": [
                440
            ],
            "transactionHash": [
                368
            ],
            "treasury_id": [
                368
            ],
            "__typename": [
                366
            ]
        },
        "FloorRaiseAttempt_max_order_by": {
            "amountFormatted": [
                441
            ],
            "amountRaw": [
                441
            ],
            "id": [
                441
            ],
            "market_id": [
                441
            ],
            "timestamp": [
                441
            ],
            "transactionHash": [
                441
            ],
            "treasury_id": [
                441
            ],
            "__typename": [
                366
            ]
        },
        "FloorRaiseAttempt_min_order_by": {
            "amountFormatted": [
                441
            ],
            "amountRaw": [
                441
            ],
            "id": [
                441
            ],
            "market_id": [
                441
            ],
            "timestamp": [
                441
            ],
            "transactionHash": [
                441
            ],
            "treasury_id": [
                441
            ],
            "__typename": [
                366
            ]
        },
        "FloorRaiseAttempt_order_by": {
            "amountFormatted": [
                441
            ],
            "amountRaw": [
                441
            ],
            "id": [
                441
            ],
            "market_id": [
                441
            ],
            "success": [
                441
            ],
            "timestamp": [
                441
            ],
            "transactionHash": [
                441
            ],
            "treasury_id": [
                441
            ],
            "__typename": [
                366
            ]
        },
        "FloorRaiseAttempt_select_column": {},
        "FloorRaiseAttempt_stddev_order_by": {
            "amountRaw": [
                441
            ],
            "timestamp": [
                441
            ],
            "__typename": [
                366
            ]
        },
        "FloorRaiseAttempt_stddev_pop_order_by": {
            "amountRaw": [
                441
            ],
            "timestamp": [
                441
            ],
            "__typename": [
                366
            ]
        },
        "FloorRaiseAttempt_stddev_samp_order_by": {
            "amountRaw": [
                441
            ],
            "timestamp": [
                441
            ],
            "__typename": [
                366
            ]
        },
        "FloorRaiseAttempt_stream_cursor_input": {
            "initial_value": [
                106
            ],
            "ordering": [
                429
            ],
            "__typename": [
                366
            ]
        },
        "FloorRaiseAttempt_stream_cursor_value_input": {
            "amountFormatted": [
                366
            ],
            "amountRaw": [
                439
            ],
            "id": [
                366
            ],
            "market_id": [
                366
            ],
            "success": [
                12
            ],
            "timestamp": [
                439
            ],
            "transactionHash": [
                366
            ],
            "treasury_id": [
                366
            ],
            "__typename": [
                366
            ]
        },
        "FloorRaiseAttempt_sum_order_by": {
            "amountRaw": [
                441
            ],
            "timestamp": [
                441
            ],
            "__typename": [
                366
            ]
        },
        "FloorRaiseAttempt_var_pop_order_by": {
            "amountRaw": [
                441
            ],
            "timestamp": [
                441
            ],
            "__typename": [
                366
            ]
        },
        "FloorRaiseAttempt_var_samp_order_by": {
            "amountRaw": [
                441
            ],
            "timestamp": [
                441
            ],
            "__typename": [
                366
            ]
        },
        "FloorRaiseAttempt_variance_order_by": {
            "amountRaw": [
                441
            ],
            "timestamp": [
                441
            ],
            "__typename": [
                366
            ]
        },
        "FloorRaiseTreasury": {
            "accumulatedFormatted": [
                366
            ],
            "accumulatedRaw": [
                439
            ],
            "address": [
                366
            ],
            "createdAt": [
                439
            ],
            "floor": [
                366
            ],
            "id": [
                366
            ],
            "lastRaiseAttemptAt": [
                439
            ],
            "lastRaiseAttemptSuccess": [
                12
            ],
            "lastUpdatedAt": [
                439
            ],
            "market_id": [
                366
            ],
            "raiseAttempts": [
                94,
                {
                    "distinct_on": [
                        101,
                        "[FloorRaiseAttempt_select_column!]"
                    ],
                    "limit": [
                        135
                    ],
                    "offset": [
                        135
                    ],
                    "order_by": [
                        100,
                        "[FloorRaiseAttempt_order_by!]"
                    ],
                    "where": [
                        97
                    ]
                }
            ],
            "thresholdFormatted": [
                366
            ],
            "thresholdRaw": [
                439
            ],
            "totalRaisedCount": [
                439
            ],
            "__typename": [
                366
            ]
        },
        "FloorRaiseTreasury_bool_exp": {
            "_and": [
                112
            ],
            "_not": [
                112
            ],
            "_or": [
                112
            ],
            "accumulatedFormatted": [
                368
            ],
            "accumulatedRaw": [
                440
            ],
            "address": [
                368
            ],
            "createdAt": [
                440
            ],
            "floor": [
                368
            ],
            "id": [
                368
            ],
            "lastRaiseAttemptAt": [
                440
            ],
            "lastRaiseAttemptSuccess": [
                13
            ],
            "lastUpdatedAt": [
                440
            ],
            "market_id": [
                368
            ],
            "raiseAttempts": [
                97
            ],
            "thresholdFormatted": [
                368
            ],
            "thresholdRaw": [
                440
            ],
            "totalRaisedCount": [
                440
            ],
            "__typename": [
                366
            ]
        },
        "FloorRaiseTreasury_order_by": {
            "accumulatedFormatted": [
                441
            ],
            "accumulatedRaw": [
                441
            ],
            "address": [
                441
            ],
            "createdAt": [
                441
            ],
            "floor": [
                441
            ],
            "id": [
                441
            ],
            "lastRaiseAttemptAt": [
                441
            ],
            "lastRaiseAttemptSuccess": [
                441
            ],
            "lastUpdatedAt": [
                441
            ],
            "market_id": [
                441
            ],
            "raiseAttempts_aggregate": [
                95
            ],
            "thresholdFormatted": [
                441
            ],
            "thresholdRaw": [
                441
            ],
            "totalRaisedCount": [
                441
            ],
            "__typename": [
                366
            ]
        },
        "FloorRaiseTreasury_select_column": {},
        "FloorRaiseTreasury_stream_cursor_input": {
            "initial_value": [
                116
            ],
            "ordering": [
                429
            ],
            "__typename": [
                366
            ]
        },
        "FloorRaiseTreasury_stream_cursor_value_input": {
            "accumulatedFormatted": [
                366
            ],
            "accumulatedRaw": [
                439
            ],
            "address": [
                366
            ],
            "createdAt": [
                439
            ],
            "floor": [
                366
            ],
            "id": [
                366
            ],
            "lastRaiseAttemptAt": [
                439
            ],
            "lastRaiseAttemptSuccess": [
                12
            ],
            "lastUpdatedAt": [
                439
            ],
            "market_id": [
                366
            ],
            "thresholdFormatted": [
                366
            ],
            "thresholdRaw": [
                439
            ],
            "totalRaisedCount": [
                439
            ],
            "__typename": [
                366
            ]
        },
        "GlobalRegistry": {
            "createdAt": [
                439
            ],
            "floorFactoryAddress": [
                366
            ],
            "governorAddress": [
                366
            ],
            "id": [
                366
            ],
            "lastUpdatedAt": [
                439
            ],
            "moduleFactoryAddress": [
                366
            ],
            "registeredStrategies": [
                366
            ],
            "trustedForwarderAddress": [
                366
            ],
            "__typename": [
                366
            ]
        },
        "GlobalRegistry_bool_exp": {
            "_and": [
                118
            ],
            "_not": [
                118
            ],
            "_or": [
                118
            ],
            "createdAt": [
                440
            ],
            "floorFactoryAddress": [
                368
            ],
            "governorAddress": [
                368
            ],
            "id": [
                368
            ],
            "lastUpdatedAt": [
                440
            ],
            "moduleFactoryAddress": [
                368
            ],
            "registeredStrategies": [
                367
            ],
            "trustedForwarderAddress": [
                368
            ],
            "__typename": [
                366
            ]
        },
        "GlobalRegistry_order_by": {
            "createdAt": [
                441
            ],
            "floorFactoryAddress": [
                441
            ],
            "governorAddress": [
                441
            ],
            "id": [
                441
            ],
            "lastUpdatedAt": [
                441
            ],
            "moduleFactoryAddress": [
                441
            ],
            "registeredStrategies": [
                441
            ],
            "trustedForwarderAddress": [
                441
            ],
            "__typename": [
                366
            ]
        },
        "GlobalRegistry_select_column": {},
        "GlobalRegistry_stream_cursor_input": {
            "initial_value": [
                122
            ],
            "ordering": [
                429
            ],
            "__typename": [
                366
            ]
        },
        "GlobalRegistry_stream_cursor_value_input": {
            "createdAt": [
                439
            ],
            "floorFactoryAddress": [
                366
            ],
            "governorAddress": [
                366
            ],
            "id": [
                366
            ],
            "lastUpdatedAt": [
                439
            ],
            "moduleFactoryAddress": [
                366
            ],
            "registeredStrategies": [
                366
            ],
            "trustedForwarderAddress": [
                366
            ],
            "__typename": [
                366
            ]
        },
        "GlobalStats": {
            "activeMarkets": [
                439
            ],
            "id": [
                366
            ],
            "lastUpdatedAt": [
                439
            ],
            "totalLockedCollateralFormatted": [
                366
            ],
            "totalLockedCollateralRaw": [
                439
            ],
            "totalMarkets": [
                439
            ],
            "totalOutstandingDebtFormatted": [
                366
            ],
            "totalOutstandingDebtRaw": [
                439
            ],
            "totalVolumeFormatted": [
                366
            ],
            "totalVolumeRaw": [
                439
            ],
            "__typename": [
                366
            ]
        },
        "GlobalStatsSnapshot": {
            "activeMarkets": [
                439
            ],
            "id": [
                366
            ],
            "period": [
                450
            ],
            "periodVolumeFormatted": [
                366
            ],
            "periodVolumeRaw": [
                439
            ],
            "timestamp": [
                439
            ],
            "totalMarketCapFormatted": [
                366
            ],
            "totalMarketCapRaw": [
                439
            ],
            "totalMarkets": [
                439
            ],
            "totalValueLockedFormatted": [
                366
            ],
            "totalValueLockedRaw": [
                439
            ],
            "__typename": [
                366
            ]
        },
        "GlobalStatsSnapshot_bool_exp": {
            "_and": [
                125
            ],
            "_not": [
                125
            ],
            "_or": [
                125
            ],
            "activeMarkets": [
                440
            ],
            "id": [
                368
            ],
            "period": [
                451
            ],
            "periodVolumeFormatted": [
                368
            ],
            "periodVolumeRaw": [
                440
            ],
            "timestamp": [
                440
            ],
            "totalMarketCapFormatted": [
                368
            ],
            "totalMarketCapRaw": [
                440
            ],
            "totalMarkets": [
                440
            ],
            "totalValueLockedFormatted": [
                368
            ],
            "totalValueLockedRaw": [
                440
            ],
            "__typename": [
                366
            ]
        },
        "GlobalStatsSnapshot_order_by": {
            "activeMarkets": [
                441
            ],
            "id": [
                441
            ],
            "period": [
                441
            ],
            "periodVolumeFormatted": [
                441
            ],
            "periodVolumeRaw": [
                441
            ],
            "timestamp": [
                441
            ],
            "totalMarketCapFormatted": [
                441
            ],
            "totalMarketCapRaw": [
                441
            ],
            "totalMarkets": [
                441
            ],
            "totalValueLockedFormatted": [
                441
            ],
            "totalValueLockedRaw": [
                441
            ],
            "__typename": [
                366
            ]
        },
        "GlobalStatsSnapshot_select_column": {},
        "GlobalStatsSnapshot_stream_cursor_input": {
            "initial_value": [
                129
            ],
            "ordering": [
                429
            ],
            "__typename": [
                366
            ]
        },
        "GlobalStatsSnapshot_stream_cursor_value_input": {
            "activeMarkets": [
                439
            ],
            "id": [
                366
            ],
            "period": [
                450
            ],
            "periodVolumeFormatted": [
                366
            ],
            "periodVolumeRaw": [
                439
            ],
            "timestamp": [
                439
            ],
            "totalMarketCapFormatted": [
                366
            ],
            "totalMarketCapRaw": [
                439
            ],
            "totalMarkets": [
                439
            ],
            "totalValueLockedFormatted": [
                366
            ],
            "totalValueLockedRaw": [
                439
            ],
            "__typename": [
                366
            ]
        },
        "GlobalStats_bool_exp": {
            "_and": [
                130
            ],
            "_not": [
                130
            ],
            "_or": [
                130
            ],
            "activeMarkets": [
                440
            ],
            "id": [
                368
            ],
            "lastUpdatedAt": [
                440
            ],
            "totalLockedCollateralFormatted": [
                368
            ],
            "totalLockedCollateralRaw": [
                440
            ],
            "totalMarkets": [
                440
            ],
            "totalOutstandingDebtFormatted": [
                368
            ],
            "totalOutstandingDebtRaw": [
                440
            ],
            "totalVolumeFormatted": [
                368
            ],
            "totalVolumeRaw": [
                440
            ],
            "__typename": [
                366
            ]
        },
        "GlobalStats_order_by": {
            "activeMarkets": [
                441
            ],
            "id": [
                441
            ],
            "lastUpdatedAt": [
                441
            ],
            "totalLockedCollateralFormatted": [
                441
            ],
            "totalLockedCollateralRaw": [
                441
            ],
            "totalMarkets": [
                441
            ],
            "totalOutstandingDebtFormatted": [
                441
            ],
            "totalOutstandingDebtRaw": [
                441
            ],
            "totalVolumeFormatted": [
                441
            ],
            "totalVolumeRaw": [
                441
            ],
            "__typename": [
                366
            ]
        },
        "GlobalStats_select_column": {},
        "GlobalStats_stream_cursor_input": {
            "initial_value": [
                134
            ],
            "ordering": [
                429
            ],
            "__typename": [
                366
            ]
        },
        "GlobalStats_stream_cursor_value_input": {
            "activeMarkets": [
                439
            ],
            "id": [
                366
            ],
            "lastUpdatedAt": [
                439
            ],
            "totalLockedCollateralFormatted": [
                366
            ],
            "totalLockedCollateralRaw": [
                439
            ],
            "totalMarkets": [
                439
            ],
            "totalOutstandingDebtFormatted": [
                366
            ],
            "totalOutstandingDebtRaw": [
                439
            ],
            "totalVolumeFormatted": [
                366
            ],
            "totalVolumeRaw": [
                439
            ],
            "__typename": [
                366
            ]
        },
        "Int": {},
        "Int_comparison_exp": {
            "_eq": [
                135
            ],
            "_gt": [
                135
            ],
            "_gte": [
                135
            ],
            "_in": [
                135
            ],
            "_is_null": [
                12
            ],
            "_lt": [
                135
            ],
            "_lte": [
                135
            ],
            "_neq": [
                135
            ],
            "_nin": [
                135
            ],
            "__typename": [
                366
            ]
        },
        "Loan": {
            "borrowAmountFormatted": [
                366
            ],
            "borrowAmountRaw": [
                439
            ],
            "borrower_id": [
                366
            ],
            "closedAt": [
                439
            ],
            "facility_id": [
                366
            ],
            "floorPriceAtBorrowFormatted": [
                366
            ],
            "floorPriceAtBorrowRaw": [
                439
            ],
            "id": [
                366
            ],
            "lastUpdatedAt": [
                439
            ],
            "lockedCollateralFormatted": [
                366
            ],
            "lockedCollateralRaw": [
                439
            ],
            "market_id": [
                366
            ],
            "openedAt": [
                439
            ],
            "originationFeeFormatted": [
                366
            ],
            "originationFeeRaw": [
                439
            ],
            "remainingDebtFormatted": [
                366
            ],
            "remainingDebtRaw": [
                439
            ],
            "status": [
                435
            ],
            "statusHistory": [
                138,
                {
                    "distinct_on": [
                        145,
                        "[LoanStatusHistory_select_column!]"
                    ],
                    "limit": [
                        135
                    ],
                    "offset": [
                        135
                    ],
                    "order_by": [
                        144,
                        "[LoanStatusHistory_order_by!]"
                    ],
                    "where": [
                        141
                    ]
                }
            ],
            "transactionHash": [
                366
            ],
            "__typename": [
                366
            ]
        },
        "LoanStatusHistory": {
            "id": [
                366
            ],
            "loan_id": [
                366
            ],
            "lockedCollateralFormatted": [
                366
            ],
            "lockedCollateralRaw": [
                439
            ],
            "remainingDebtFormatted": [
                366
            ],
            "remainingDebtRaw": [
                439
            ],
            "status": [
                435
            ],
            "timestamp": [
                439
            ],
            "transactionHash": [
                366
            ],
            "__typename": [
                366
            ]
        },
        "LoanStatusHistory_aggregate_order_by": {
            "avg": [
                140
            ],
            "count": [
                441
            ],
            "max": [
                142
            ],
            "min": [
                143
            ],
            "stddev": [
                146
            ],
            "stddev_pop": [
                147
            ],
            "stddev_samp": [
                148
            ],
            "sum": [
                151
            ],
            "var_pop": [
                152
            ],
            "var_samp": [
                153
            ],
            "variance": [
                154
            ],
            "__typename": [
                366
            ]
        },
        "LoanStatusHistory_avg_order_by": {
            "lockedCollateralRaw": [
                441
            ],
            "remainingDebtRaw": [
                441
            ],
            "timestamp": [
                441
            ],
            "__typename": [
                366
            ]
        },
        "LoanStatusHistory_bool_exp": {
            "_and": [
                141
            ],
            "_not": [
                141
            ],
            "_or": [
                141
            ],
            "id": [
                368
            ],
            "loan_id": [
                368
            ],
            "lockedCollateralFormatted": [
                368
            ],
            "lockedCollateralRaw": [
                440
            ],
            "remainingDebtFormatted": [
                368
            ],
            "remainingDebtRaw": [
                440
            ],
            "status": [
                436
            ],
            "timestamp": [
                440
            ],
            "transactionHash": [
                368
            ],
            "__typename": [
                366
            ]
        },
        "LoanStatusHistory_max_order_by": {
            "id": [
                441
            ],
            "loan_id": [
                441
            ],
            "lockedCollateralFormatted": [
                441
            ],
            "lockedCollateralRaw": [
                441
            ],
            "remainingDebtFormatted": [
                441
            ],
            "remainingDebtRaw": [
                441
            ],
            "status": [
                441
            ],
            "timestamp": [
                441
            ],
            "transactionHash": [
                441
            ],
            "__typename": [
                366
            ]
        },
        "LoanStatusHistory_min_order_by": {
            "id": [
                441
            ],
            "loan_id": [
                441
            ],
            "lockedCollateralFormatted": [
                441
            ],
            "lockedCollateralRaw": [
                441
            ],
            "remainingDebtFormatted": [
                441
            ],
            "remainingDebtRaw": [
                441
            ],
            "status": [
                441
            ],
            "timestamp": [
                441
            ],
            "transactionHash": [
                441
            ],
            "__typename": [
                366
            ]
        },
        "LoanStatusHistory_order_by": {
            "id": [
                441
            ],
            "loan_id": [
                441
            ],
            "lockedCollateralFormatted": [
                441
            ],
            "lockedCollateralRaw": [
                441
            ],
            "remainingDebtFormatted": [
                441
            ],
            "remainingDebtRaw": [
                441
            ],
            "status": [
                441
            ],
            "timestamp": [
                441
            ],
            "transactionHash": [
                441
            ],
            "__typename": [
                366
            ]
        },
        "LoanStatusHistory_select_column": {},
        "LoanStatusHistory_stddev_order_by": {
            "lockedCollateralRaw": [
                441
            ],
            "remainingDebtRaw": [
                441
            ],
            "timestamp": [
                441
            ],
            "__typename": [
                366
            ]
        },
        "LoanStatusHistory_stddev_pop_order_by": {
            "lockedCollateralRaw": [
                441
            ],
            "remainingDebtRaw": [
                441
            ],
            "timestamp": [
                441
            ],
            "__typename": [
                366
            ]
        },
        "LoanStatusHistory_stddev_samp_order_by": {
            "lockedCollateralRaw": [
                441
            ],
            "remainingDebtRaw": [
                441
            ],
            "timestamp": [
                441
            ],
            "__typename": [
                366
            ]
        },
        "LoanStatusHistory_stream_cursor_input": {
            "initial_value": [
                150
            ],
            "ordering": [
                429
            ],
            "__typename": [
                366
            ]
        },
        "LoanStatusHistory_stream_cursor_value_input": {
            "id": [
                366
            ],
            "loan_id": [
                366
            ],
            "lockedCollateralFormatted": [
                366
            ],
            "lockedCollateralRaw": [
                439
            ],
            "remainingDebtFormatted": [
                366
            ],
            "remainingDebtRaw": [
                439
            ],
            "status": [
                435
            ],
            "timestamp": [
                439
            ],
            "transactionHash": [
                366
            ],
            "__typename": [
                366
            ]
        },
        "LoanStatusHistory_sum_order_by": {
            "lockedCollateralRaw": [
                441
            ],
            "remainingDebtRaw": [
                441
            ],
            "timestamp": [
                441
            ],
            "__typename": [
                366
            ]
        },
        "LoanStatusHistory_var_pop_order_by": {
            "lockedCollateralRaw": [
                441
            ],
            "remainingDebtRaw": [
                441
            ],
            "timestamp": [
                441
            ],
            "__typename": [
                366
            ]
        },
        "LoanStatusHistory_var_samp_order_by": {
            "lockedCollateralRaw": [
                441
            ],
            "remainingDebtRaw": [
                441
            ],
            "timestamp": [
                441
            ],
            "__typename": [
                366
            ]
        },
        "LoanStatusHistory_variance_order_by": {
            "lockedCollateralRaw": [
                441
            ],
            "remainingDebtRaw": [
                441
            ],
            "timestamp": [
                441
            ],
            "__typename": [
                366
            ]
        },
        "Loan_aggregate_order_by": {
            "avg": [
                156
            ],
            "count": [
                441
            ],
            "max": [
                158
            ],
            "min": [
                159
            ],
            "stddev": [
                162
            ],
            "stddev_pop": [
                163
            ],
            "stddev_samp": [
                164
            ],
            "sum": [
                167
            ],
            "var_pop": [
                168
            ],
            "var_samp": [
                169
            ],
            "variance": [
                170
            ],
            "__typename": [
                366
            ]
        },
        "Loan_avg_order_by": {
            "borrowAmountRaw": [
                441
            ],
            "closedAt": [
                441
            ],
            "floorPriceAtBorrowRaw": [
                441
            ],
            "lastUpdatedAt": [
                441
            ],
            "lockedCollateralRaw": [
                441
            ],
            "openedAt": [
                441
            ],
            "originationFeeRaw": [
                441
            ],
            "remainingDebtRaw": [
                441
            ],
            "__typename": [
                366
            ]
        },
        "Loan_bool_exp": {
            "_and": [
                157
            ],
            "_not": [
                157
            ],
            "_or": [
                157
            ],
            "borrowAmountFormatted": [
                368
            ],
            "borrowAmountRaw": [
                440
            ],
            "borrower_id": [
                368
            ],
            "closedAt": [
                440
            ],
            "facility_id": [
                368
            ],
            "floorPriceAtBorrowFormatted": [
                368
            ],
            "floorPriceAtBorrowRaw": [
                440
            ],
            "id": [
                368
            ],
            "lastUpdatedAt": [
                440
            ],
            "lockedCollateralFormatted": [
                368
            ],
            "lockedCollateralRaw": [
                440
            ],
            "market_id": [
                368
            ],
            "openedAt": [
                440
            ],
            "originationFeeFormatted": [
                368
            ],
            "originationFeeRaw": [
                440
            ],
            "remainingDebtFormatted": [
                368
            ],
            "remainingDebtRaw": [
                440
            ],
            "status": [
                436
            ],
            "statusHistory": [
                141
            ],
            "transactionHash": [
                368
            ],
            "__typename": [
                366
            ]
        },
        "Loan_max_order_by": {
            "borrowAmountFormatted": [
                441
            ],
            "borrowAmountRaw": [
                441
            ],
            "borrower_id": [
                441
            ],
            "closedAt": [
                441
            ],
            "facility_id": [
                441
            ],
            "floorPriceAtBorrowFormatted": [
                441
            ],
            "floorPriceAtBorrowRaw": [
                441
            ],
            "id": [
                441
            ],
            "lastUpdatedAt": [
                441
            ],
            "lockedCollateralFormatted": [
                441
            ],
            "lockedCollateralRaw": [
                441
            ],
            "market_id": [
                441
            ],
            "openedAt": [
                441
            ],
            "originationFeeFormatted": [
                441
            ],
            "originationFeeRaw": [
                441
            ],
            "remainingDebtFormatted": [
                441
            ],
            "remainingDebtRaw": [
                441
            ],
            "status": [
                441
            ],
            "transactionHash": [
                441
            ],
            "__typename": [
                366
            ]
        },
        "Loan_min_order_by": {
            "borrowAmountFormatted": [
                441
            ],
            "borrowAmountRaw": [
                441
            ],
            "borrower_id": [
                441
            ],
            "closedAt": [
                441
            ],
            "facility_id": [
                441
            ],
            "floorPriceAtBorrowFormatted": [
                441
            ],
            "floorPriceAtBorrowRaw": [
                441
            ],
            "id": [
                441
            ],
            "lastUpdatedAt": [
                441
            ],
            "lockedCollateralFormatted": [
                441
            ],
            "lockedCollateralRaw": [
                441
            ],
            "market_id": [
                441
            ],
            "openedAt": [
                441
            ],
            "originationFeeFormatted": [
                441
            ],
            "originationFeeRaw": [
                441
            ],
            "remainingDebtFormatted": [
                441
            ],
            "remainingDebtRaw": [
                441
            ],
            "status": [
                441
            ],
            "transactionHash": [
                441
            ],
            "__typename": [
                366
            ]
        },
        "Loan_order_by": {
            "borrowAmountFormatted": [
                441
            ],
            "borrowAmountRaw": [
                441
            ],
            "borrower_id": [
                441
            ],
            "closedAt": [
                441
            ],
            "facility_id": [
                441
            ],
            "floorPriceAtBorrowFormatted": [
                441
            ],
            "floorPriceAtBorrowRaw": [
                441
            ],
            "id": [
                441
            ],
            "lastUpdatedAt": [
                441
            ],
            "lockedCollateralFormatted": [
                441
            ],
            "lockedCollateralRaw": [
                441
            ],
            "market_id": [
                441
            ],
            "openedAt": [
                441
            ],
            "originationFeeFormatted": [
                441
            ],
            "originationFeeRaw": [
                441
            ],
            "remainingDebtFormatted": [
                441
            ],
            "remainingDebtRaw": [
                441
            ],
            "status": [
                441
            ],
            "statusHistory_aggregate": [
                139
            ],
            "transactionHash": [
                441
            ],
            "__typename": [
                366
            ]
        },
        "Loan_select_column": {},
        "Loan_stddev_order_by": {
            "borrowAmountRaw": [
                441
            ],
            "closedAt": [
                441
            ],
            "floorPriceAtBorrowRaw": [
                441
            ],
            "lastUpdatedAt": [
                441
            ],
            "lockedCollateralRaw": [
                441
            ],
            "openedAt": [
                441
            ],
            "originationFeeRaw": [
                441
            ],
            "remainingDebtRaw": [
                441
            ],
            "__typename": [
                366
            ]
        },
        "Loan_stddev_pop_order_by": {
            "borrowAmountRaw": [
                441
            ],
            "closedAt": [
                441
            ],
            "floorPriceAtBorrowRaw": [
                441
            ],
            "lastUpdatedAt": [
                441
            ],
            "lockedCollateralRaw": [
                441
            ],
            "openedAt": [
                441
            ],
            "originationFeeRaw": [
                441
            ],
            "remainingDebtRaw": [
                441
            ],
            "__typename": [
                366
            ]
        },
        "Loan_stddev_samp_order_by": {
            "borrowAmountRaw": [
                441
            ],
            "closedAt": [
                441
            ],
            "floorPriceAtBorrowRaw": [
                441
            ],
            "lastUpdatedAt": [
                441
            ],
            "lockedCollateralRaw": [
                441
            ],
            "openedAt": [
                441
            ],
            "originationFeeRaw": [
                441
            ],
            "remainingDebtRaw": [
                441
            ],
            "__typename": [
                366
            ]
        },
        "Loan_stream_cursor_input": {
            "initial_value": [
                166
            ],
            "ordering": [
                429
            ],
            "__typename": [
                366
            ]
        },
        "Loan_stream_cursor_value_input": {
            "borrowAmountFormatted": [
                366
            ],
            "borrowAmountRaw": [
                439
            ],
            "borrower_id": [
                366
            ],
            "closedAt": [
                439
            ],
            "facility_id": [
                366
            ],
            "floorPriceAtBorrowFormatted": [
                366
            ],
            "floorPriceAtBorrowRaw": [
                439
            ],
            "id": [
                366
            ],
            "lastUpdatedAt": [
                439
            ],
            "lockedCollateralFormatted": [
                366
            ],
            "lockedCollateralRaw": [
                439
            ],
            "market_id": [
                366
            ],
            "openedAt": [
                439
            ],
            "originationFeeFormatted": [
                366
            ],
            "originationFeeRaw": [
                439
            ],
            "remainingDebtFormatted": [
                366
            ],
            "remainingDebtRaw": [
                439
            ],
            "status": [
                435
            ],
            "transactionHash": [
                366
            ],
            "__typename": [
                366
            ]
        },
        "Loan_sum_order_by": {
            "borrowAmountRaw": [
                441
            ],
            "closedAt": [
                441
            ],
            "floorPriceAtBorrowRaw": [
                441
            ],
            "lastUpdatedAt": [
                441
            ],
            "lockedCollateralRaw": [
                441
            ],
            "openedAt": [
                441
            ],
            "originationFeeRaw": [
                441
            ],
            "remainingDebtRaw": [
                441
            ],
            "__typename": [
                366
            ]
        },
        "Loan_var_pop_order_by": {
            "borrowAmountRaw": [
                441
            ],
            "closedAt": [
                441
            ],
            "floorPriceAtBorrowRaw": [
                441
            ],
            "lastUpdatedAt": [
                441
            ],
            "lockedCollateralRaw": [
                441
            ],
            "openedAt": [
                441
            ],
            "originationFeeRaw": [
                441
            ],
            "remainingDebtRaw": [
                441
            ],
            "__typename": [
                366
            ]
        },
        "Loan_var_samp_order_by": {
            "borrowAmountRaw": [
                441
            ],
            "closedAt": [
                441
            ],
            "floorPriceAtBorrowRaw": [
                441
            ],
            "lastUpdatedAt": [
                441
            ],
            "lockedCollateralRaw": [
                441
            ],
            "openedAt": [
                441
            ],
            "originationFeeRaw": [
                441
            ],
            "remainingDebtRaw": [
                441
            ],
            "__typename": [
                366
            ]
        },
        "Loan_variance_order_by": {
            "borrowAmountRaw": [
                441
            ],
            "closedAt": [
                441
            ],
            "floorPriceAtBorrowRaw": [
                441
            ],
            "lastUpdatedAt": [
                441
            ],
            "lockedCollateralRaw": [
                441
            ],
            "openedAt": [
                441
            ],
            "originationFeeRaw": [
                441
            ],
            "remainingDebtRaw": [
                441
            ],
            "__typename": [
                366
            ]
        },
        "Market": {
            "buyFeeBps": [
                439
            ],
            "createdAt": [
                439
            ],
            "creator_id": [
                366
            ],
            "currentPriceFormatted": [
                366
            ],
            "currentPriceRaw": [
                439
            ],
            "factory_id": [
                366
            ],
            "floorElevations": [
                77,
                {
                    "distinct_on": [
                        84,
                        "[FloorElevation_select_column!]"
                    ],
                    "limit": [
                        135
                    ],
                    "offset": [
                        135
                    ],
                    "order_by": [
                        83,
                        "[FloorElevation_order_by!]"
                    ],
                    "where": [
                        80
                    ]
                }
            ],
            "floorPriceFormatted": [
                366
            ],
            "floorPriceRaw": [
                439
            ],
            "floorSegmentSupplyFormatted": [
                366
            ],
            "floorSegmentSupplyRaw": [
                439
            ],
            "floorSupplyFormatted": [
                366
            ],
            "floorSupplyRaw": [
                439
            ],
            "id": [
                366
            ],
            "initialFloorPriceFormatted": [
                366
            ],
            "initialFloorPriceRaw": [
                439
            ],
            "isBuyOpen": [
                12
            ],
            "isSellOpen": [
                12
            ],
            "issuanceToken": [
                369
            ],
            "issuanceToken_id": [
                366
            ],
            "lastElevationTimestamp": [
                439
            ],
            "lastTradeTimestamp": [
                439
            ],
            "lastUpdatedAt": [
                439
            ],
            "marketSupplyFormatted": [
                366
            ],
            "marketSupplyRaw": [
                439
            ],
            "maxLTV": [
                439
            ],
            "reserveBalanceFormatted": [
                366
            ],
            "reserveBalanceRaw": [
                439
            ],
            "reserveToken": [
                369
            ],
            "reserveToken_id": [
                366
            ],
            "sellFeeBps": [
                439
            ],
            "status": [
                437
            ],
            "totalSupplyFormatted": [
                366
            ],
            "totalSupplyRaw": [
                439
            ],
            "trades": [
                375,
                {
                    "distinct_on": [
                        382,
                        "[Trade_select_column!]"
                    ],
                    "limit": [
                        135
                    ],
                    "offset": [
                        135
                    ],
                    "order_by": [
                        381,
                        "[Trade_order_by!]"
                    ],
                    "where": [
                        378
                    ]
                }
            ],
            "tradingFeeBps": [
                439
            ],
            "__typename": [
                366
            ]
        },
        "MarketRollingStats": {
            "averagePriceFormatted": [
                366
            ],
            "averagePriceRaw": [
                439
            ],
            "id": [
                366
            ],
            "lastUpdatedAt": [
                439
            ],
            "market_id": [
                366
            ],
            "tradeCount": [
                439
            ],
            "volumeFormatted": [
                366
            ],
            "volumeRaw": [
                439
            ],
            "windowSeconds": [
                135
            ],
            "__typename": [
                366
            ]
        },
        "MarketRollingStats_bool_exp": {
            "_and": [
                173
            ],
            "_not": [
                173
            ],
            "_or": [
                173
            ],
            "averagePriceFormatted": [
                368
            ],
            "averagePriceRaw": [
                440
            ],
            "id": [
                368
            ],
            "lastUpdatedAt": [
                440
            ],
            "market_id": [
                368
            ],
            "tradeCount": [
                440
            ],
            "volumeFormatted": [
                368
            ],
            "volumeRaw": [
                440
            ],
            "windowSeconds": [
                136
            ],
            "__typename": [
                366
            ]
        },
        "MarketRollingStats_order_by": {
            "averagePriceFormatted": [
                441
            ],
            "averagePriceRaw": [
                441
            ],
            "id": [
                441
            ],
            "lastUpdatedAt": [
                441
            ],
            "market_id": [
                441
            ],
            "tradeCount": [
                441
            ],
            "volumeFormatted": [
                441
            ],
            "volumeRaw": [
                441
            ],
            "windowSeconds": [
                441
            ],
            "__typename": [
                366
            ]
        },
        "MarketRollingStats_select_column": {},
        "MarketRollingStats_stream_cursor_input": {
            "initial_value": [
                177
            ],
            "ordering": [
                429
            ],
            "__typename": [
                366
            ]
        },
        "MarketRollingStats_stream_cursor_value_input": {
            "averagePriceFormatted": [
                366
            ],
            "averagePriceRaw": [
                439
            ],
            "id": [
                366
            ],
            "lastUpdatedAt": [
                439
            ],
            "market_id": [
                366
            ],
            "tradeCount": [
                439
            ],
            "volumeFormatted": [
                366
            ],
            "volumeRaw": [
                439
            ],
            "windowSeconds": [
                135
            ],
            "__typename": [
                366
            ]
        },
        "MarketSnapshot": {
            "floorPriceFormatted": [
                366
            ],
            "floorPriceRaw": [
                439
            ],
            "id": [
                366
            ],
            "marketSupplyFormatted": [
                366
            ],
            "marketSupplyRaw": [
                439
            ],
            "market_id": [
                366
            ],
            "priceFormatted": [
                366
            ],
            "priceRaw": [
                439
            ],
            "timestamp": [
                439
            ],
            "totalSupplyFormatted": [
                366
            ],
            "totalSupplyRaw": [
                439
            ],
            "trades24h": [
                439
            ],
            "volume24hFormatted": [
                366
            ],
            "volume24hRaw": [
                439
            ],
            "__typename": [
                366
            ]
        },
        "MarketSnapshot_bool_exp": {
            "_and": [
                179
            ],
            "_not": [
                179
            ],
            "_or": [
                179
            ],
            "floorPriceFormatted": [
                368
            ],
            "floorPriceRaw": [
                440
            ],
            "id": [
                368
            ],
            "marketSupplyFormatted": [
                368
            ],
            "marketSupplyRaw": [
                440
            ],
            "market_id": [
                368
            ],
            "priceFormatted": [
                368
            ],
            "priceRaw": [
                440
            ],
            "timestamp": [
                440
            ],
            "totalSupplyFormatted": [
                368
            ],
            "totalSupplyRaw": [
                440
            ],
            "trades24h": [
                440
            ],
            "volume24hFormatted": [
                368
            ],
            "volume24hRaw": [
                440
            ],
            "__typename": [
                366
            ]
        },
        "MarketSnapshot_order_by": {
            "floorPriceFormatted": [
                441
            ],
            "floorPriceRaw": [
                441
            ],
            "id": [
                441
            ],
            "marketSupplyFormatted": [
                441
            ],
            "marketSupplyRaw": [
                441
            ],
            "market_id": [
                441
            ],
            "priceFormatted": [
                441
            ],
            "priceRaw": [
                441
            ],
            "timestamp": [
                441
            ],
            "totalSupplyFormatted": [
                441
            ],
            "totalSupplyRaw": [
                441
            ],
            "trades24h": [
                441
            ],
            "volume24hFormatted": [
                441
            ],
            "volume24hRaw": [
                441
            ],
            "__typename": [
                366
            ]
        },
        "MarketSnapshot_select_column": {},
        "MarketSnapshot_stream_cursor_input": {
            "initial_value": [
                183
            ],
            "ordering": [
                429
            ],
            "__typename": [
                366
            ]
        },
        "MarketSnapshot_stream_cursor_value_input": {
            "floorPriceFormatted": [
                366
            ],
            "floorPriceRaw": [
                439
            ],
            "id": [
                366
            ],
            "marketSupplyFormatted": [
                366
            ],
            "marketSupplyRaw": [
                439
            ],
            "market_id": [
                366
            ],
            "priceFormatted": [
                366
            ],
            "priceRaw": [
                439
            ],
            "timestamp": [
                439
            ],
            "totalSupplyFormatted": [
                366
            ],
            "totalSupplyRaw": [
                439
            ],
            "trades24h": [
                439
            ],
            "volume24hFormatted": [
                366
            ],
            "volume24hRaw": [
                439
            ],
            "__typename": [
                366
            ]
        },
        "Market_aggregate_order_by": {
            "avg": [
                185
            ],
            "count": [
                441
            ],
            "max": [
                187
            ],
            "min": [
                188
            ],
            "stddev": [
                191
            ],
            "stddev_pop": [
                192
            ],
            "stddev_samp": [
                193
            ],
            "sum": [
                196
            ],
            "var_pop": [
                197
            ],
            "var_samp": [
                198
            ],
            "variance": [
                199
            ],
            "__typename": [
                366
            ]
        },
        "Market_avg_order_by": {
            "buyFeeBps": [
                441
            ],
            "createdAt": [
                441
            ],
            "currentPriceRaw": [
                441
            ],
            "floorPriceRaw": [
                441
            ],
            "floorSegmentSupplyRaw": [
                441
            ],
            "floorSupplyRaw": [
                441
            ],
            "initialFloorPriceRaw": [
                441
            ],
            "lastElevationTimestamp": [
                441
            ],
            "lastTradeTimestamp": [
                441
            ],
            "lastUpdatedAt": [
                441
            ],
            "marketSupplyRaw": [
                441
            ],
            "maxLTV": [
                441
            ],
            "reserveBalanceRaw": [
                441
            ],
            "sellFeeBps": [
                441
            ],
            "totalSupplyRaw": [
                441
            ],
            "tradingFeeBps": [
                441
            ],
            "__typename": [
                366
            ]
        },
        "Market_bool_exp": {
            "_and": [
                186
            ],
            "_not": [
                186
            ],
            "_or": [
                186
            ],
            "buyFeeBps": [
                440
            ],
            "createdAt": [
                440
            ],
            "creator_id": [
                368
            ],
            "currentPriceFormatted": [
                368
            ],
            "currentPriceRaw": [
                440
            ],
            "factory_id": [
                368
            ],
            "floorElevations": [
                80
            ],
            "floorPriceFormatted": [
                368
            ],
            "floorPriceRaw": [
                440
            ],
            "floorSegmentSupplyFormatted": [
                368
            ],
            "floorSegmentSupplyRaw": [
                440
            ],
            "floorSupplyFormatted": [
                368
            ],
            "floorSupplyRaw": [
                440
            ],
            "id": [
                368
            ],
            "initialFloorPriceFormatted": [
                368
            ],
            "initialFloorPriceRaw": [
                440
            ],
            "isBuyOpen": [
                13
            ],
            "isSellOpen": [
                13
            ],
            "issuanceToken": [
                370
            ],
            "issuanceToken_id": [
                368
            ],
            "lastElevationTimestamp": [
                440
            ],
            "lastTradeTimestamp": [
                440
            ],
            "lastUpdatedAt": [
                440
            ],
            "marketSupplyFormatted": [
                368
            ],
            "marketSupplyRaw": [
                440
            ],
            "maxLTV": [
                440
            ],
            "reserveBalanceFormatted": [
                368
            ],
            "reserveBalanceRaw": [
                440
            ],
            "reserveToken": [
                370
            ],
            "reserveToken_id": [
                368
            ],
            "sellFeeBps": [
                440
            ],
            "status": [
                438
            ],
            "totalSupplyFormatted": [
                368
            ],
            "totalSupplyRaw": [
                440
            ],
            "trades": [
                378
            ],
            "tradingFeeBps": [
                440
            ],
            "__typename": [
                366
            ]
        },
        "Market_max_order_by": {
            "buyFeeBps": [
                441
            ],
            "createdAt": [
                441
            ],
            "creator_id": [
                441
            ],
            "currentPriceFormatted": [
                441
            ],
            "currentPriceRaw": [
                441
            ],
            "factory_id": [
                441
            ],
            "floorPriceFormatted": [
                441
            ],
            "floorPriceRaw": [
                441
            ],
            "floorSegmentSupplyFormatted": [
                441
            ],
            "floorSegmentSupplyRaw": [
                441
            ],
            "floorSupplyFormatted": [
                441
            ],
            "floorSupplyRaw": [
                441
            ],
            "id": [
                441
            ],
            "initialFloorPriceFormatted": [
                441
            ],
            "initialFloorPriceRaw": [
                441
            ],
            "issuanceToken_id": [
                441
            ],
            "lastElevationTimestamp": [
                441
            ],
            "lastTradeTimestamp": [
                441
            ],
            "lastUpdatedAt": [
                441
            ],
            "marketSupplyFormatted": [
                441
            ],
            "marketSupplyRaw": [
                441
            ],
            "maxLTV": [
                441
            ],
            "reserveBalanceFormatted": [
                441
            ],
            "reserveBalanceRaw": [
                441
            ],
            "reserveToken_id": [
                441
            ],
            "sellFeeBps": [
                441
            ],
            "status": [
                441
            ],
            "totalSupplyFormatted": [
                441
            ],
            "totalSupplyRaw": [
                441
            ],
            "tradingFeeBps": [
                441
            ],
            "__typename": [
                366
            ]
        },
        "Market_min_order_by": {
            "buyFeeBps": [
                441
            ],
            "createdAt": [
                441
            ],
            "creator_id": [
                441
            ],
            "currentPriceFormatted": [
                441
            ],
            "currentPriceRaw": [
                441
            ],
            "factory_id": [
                441
            ],
            "floorPriceFormatted": [
                441
            ],
            "floorPriceRaw": [
                441
            ],
            "floorSegmentSupplyFormatted": [
                441
            ],
            "floorSegmentSupplyRaw": [
                441
            ],
            "floorSupplyFormatted": [
                441
            ],
            "floorSupplyRaw": [
                441
            ],
            "id": [
                441
            ],
            "initialFloorPriceFormatted": [
                441
            ],
            "initialFloorPriceRaw": [
                441
            ],
            "issuanceToken_id": [
                441
            ],
            "lastElevationTimestamp": [
                441
            ],
            "lastTradeTimestamp": [
                441
            ],
            "lastUpdatedAt": [
                441
            ],
            "marketSupplyFormatted": [
                441
            ],
            "marketSupplyRaw": [
                441
            ],
            "maxLTV": [
                441
            ],
            "reserveBalanceFormatted": [
                441
            ],
            "reserveBalanceRaw": [
                441
            ],
            "reserveToken_id": [
                441
            ],
            "sellFeeBps": [
                441
            ],
            "status": [
                441
            ],
            "totalSupplyFormatted": [
                441
            ],
            "totalSupplyRaw": [
                441
            ],
            "tradingFeeBps": [
                441
            ],
            "__typename": [
                366
            ]
        },
        "Market_order_by": {
            "buyFeeBps": [
                441
            ],
            "createdAt": [
                441
            ],
            "creator_id": [
                441
            ],
            "currentPriceFormatted": [
                441
            ],
            "currentPriceRaw": [
                441
            ],
            "factory_id": [
                441
            ],
            "floorElevations_aggregate": [
                78
            ],
            "floorPriceFormatted": [
                441
            ],
            "floorPriceRaw": [
                441
            ],
            "floorSegmentSupplyFormatted": [
                441
            ],
            "floorSegmentSupplyRaw": [
                441
            ],
            "floorSupplyFormatted": [
                441
            ],
            "floorSupplyRaw": [
                441
            ],
            "id": [
                441
            ],
            "initialFloorPriceFormatted": [
                441
            ],
            "initialFloorPriceRaw": [
                441
            ],
            "isBuyOpen": [
                441
            ],
            "isSellOpen": [
                441
            ],
            "issuanceToken": [
                371
            ],
            "issuanceToken_id": [
                441
            ],
            "lastElevationTimestamp": [
                441
            ],
            "lastTradeTimestamp": [
                441
            ],
            "lastUpdatedAt": [
                441
            ],
            "marketSupplyFormatted": [
                441
            ],
            "marketSupplyRaw": [
                441
            ],
            "maxLTV": [
                441
            ],
            "reserveBalanceFormatted": [
                441
            ],
            "reserveBalanceRaw": [
                441
            ],
            "reserveToken": [
                371
            ],
            "reserveToken_id": [
                441
            ],
            "sellFeeBps": [
                441
            ],
            "status": [
                441
            ],
            "totalSupplyFormatted": [
                441
            ],
            "totalSupplyRaw": [
                441
            ],
            "trades_aggregate": [
                376
            ],
            "tradingFeeBps": [
                441
            ],
            "__typename": [
                366
            ]
        },
        "Market_select_column": {},
        "Market_stddev_order_by": {
            "buyFeeBps": [
                441
            ],
            "createdAt": [
                441
            ],
            "currentPriceRaw": [
                441
            ],
            "floorPriceRaw": [
                441
            ],
            "floorSegmentSupplyRaw": [
                441
            ],
            "floorSupplyRaw": [
                441
            ],
            "initialFloorPriceRaw": [
                441
            ],
            "lastElevationTimestamp": [
                441
            ],
            "lastTradeTimestamp": [
                441
            ],
            "lastUpdatedAt": [
                441
            ],
            "marketSupplyRaw": [
                441
            ],
            "maxLTV": [
                441
            ],
            "reserveBalanceRaw": [
                441
            ],
            "sellFeeBps": [
                441
            ],
            "totalSupplyRaw": [
                441
            ],
            "tradingFeeBps": [
                441
            ],
            "__typename": [
                366
            ]
        },
        "Market_stddev_pop_order_by": {
            "buyFeeBps": [
                441
            ],
            "createdAt": [
                441
            ],
            "currentPriceRaw": [
                441
            ],
            "floorPriceRaw": [
                441
            ],
            "floorSegmentSupplyRaw": [
                441
            ],
            "floorSupplyRaw": [
                441
            ],
            "initialFloorPriceRaw": [
                441
            ],
            "lastElevationTimestamp": [
                441
            ],
            "lastTradeTimestamp": [
                441
            ],
            "lastUpdatedAt": [
                441
            ],
            "marketSupplyRaw": [
                441
            ],
            "maxLTV": [
                441
            ],
            "reserveBalanceRaw": [
                441
            ],
            "sellFeeBps": [
                441
            ],
            "totalSupplyRaw": [
                441
            ],
            "tradingFeeBps": [
                441
            ],
            "__typename": [
                366
            ]
        },
        "Market_stddev_samp_order_by": {
            "buyFeeBps": [
                441
            ],
            "createdAt": [
                441
            ],
            "currentPriceRaw": [
                441
            ],
            "floorPriceRaw": [
                441
            ],
            "floorSegmentSupplyRaw": [
                441
            ],
            "floorSupplyRaw": [
                441
            ],
            "initialFloorPriceRaw": [
                441
            ],
            "lastElevationTimestamp": [
                441
            ],
            "lastTradeTimestamp": [
                441
            ],
            "lastUpdatedAt": [
                441
            ],
            "marketSupplyRaw": [
                441
            ],
            "maxLTV": [
                441
            ],
            "reserveBalanceRaw": [
                441
            ],
            "sellFeeBps": [
                441
            ],
            "totalSupplyRaw": [
                441
            ],
            "tradingFeeBps": [
                441
            ],
            "__typename": [
                366
            ]
        },
        "Market_stream_cursor_input": {
            "initial_value": [
                195
            ],
            "ordering": [
                429
            ],
            "__typename": [
                366
            ]
        },
        "Market_stream_cursor_value_input": {
            "buyFeeBps": [
                439
            ],
            "createdAt": [
                439
            ],
            "creator_id": [
                366
            ],
            "currentPriceFormatted": [
                366
            ],
            "currentPriceRaw": [
                439
            ],
            "factory_id": [
                366
            ],
            "floorPriceFormatted": [
                366
            ],
            "floorPriceRaw": [
                439
            ],
            "floorSegmentSupplyFormatted": [
                366
            ],
            "floorSegmentSupplyRaw": [
                439
            ],
            "floorSupplyFormatted": [
                366
            ],
            "floorSupplyRaw": [
                439
            ],
            "id": [
                366
            ],
            "initialFloorPriceFormatted": [
                366
            ],
            "initialFloorPriceRaw": [
                439
            ],
            "isBuyOpen": [
                12
            ],
            "isSellOpen": [
                12
            ],
            "issuanceToken_id": [
                366
            ],
            "lastElevationTimestamp": [
                439
            ],
            "lastTradeTimestamp": [
                439
            ],
            "lastUpdatedAt": [
                439
            ],
            "marketSupplyFormatted": [
                366
            ],
            "marketSupplyRaw": [
                439
            ],
            "maxLTV": [
                439
            ],
            "reserveBalanceFormatted": [
                366
            ],
            "reserveBalanceRaw": [
                439
            ],
            "reserveToken_id": [
                366
            ],
            "sellFeeBps": [
                439
            ],
            "status": [
                437
            ],
            "totalSupplyFormatted": [
                366
            ],
            "totalSupplyRaw": [
                439
            ],
            "tradingFeeBps": [
                439
            ],
            "__typename": [
                366
            ]
        },
        "Market_sum_order_by": {
            "buyFeeBps": [
                441
            ],
            "createdAt": [
                441
            ],
            "currentPriceRaw": [
                441
            ],
            "floorPriceRaw": [
                441
            ],
            "floorSegmentSupplyRaw": [
                441
            ],
            "floorSupplyRaw": [
                441
            ],
            "initialFloorPriceRaw": [
                441
            ],
            "lastElevationTimestamp": [
                441
            ],
            "lastTradeTimestamp": [
                441
            ],
            "lastUpdatedAt": [
                441
            ],
            "marketSupplyRaw": [
                441
            ],
            "maxLTV": [
                441
            ],
            "reserveBalanceRaw": [
                441
            ],
            "sellFeeBps": [
                441
            ],
            "totalSupplyRaw": [
                441
            ],
            "tradingFeeBps": [
                441
            ],
            "__typename": [
                366
            ]
        },
        "Market_var_pop_order_by": {
            "buyFeeBps": [
                441
            ],
            "createdAt": [
                441
            ],
            "currentPriceRaw": [
                441
            ],
            "floorPriceRaw": [
                441
            ],
            "floorSegmentSupplyRaw": [
                441
            ],
            "floorSupplyRaw": [
                441
            ],
            "initialFloorPriceRaw": [
                441
            ],
            "lastElevationTimestamp": [
                441
            ],
            "lastTradeTimestamp": [
                441
            ],
            "lastUpdatedAt": [
                441
            ],
            "marketSupplyRaw": [
                441
            ],
            "maxLTV": [
                441
            ],
            "reserveBalanceRaw": [
                441
            ],
            "sellFeeBps": [
                441
            ],
            "totalSupplyRaw": [
                441
            ],
            "tradingFeeBps": [
                441
            ],
            "__typename": [
                366
            ]
        },
        "Market_var_samp_order_by": {
            "buyFeeBps": [
                441
            ],
            "createdAt": [
                441
            ],
            "currentPriceRaw": [
                441
            ],
            "floorPriceRaw": [
                441
            ],
            "floorSegmentSupplyRaw": [
                441
            ],
            "floorSupplyRaw": [
                441
            ],
            "initialFloorPriceRaw": [
                441
            ],
            "lastElevationTimestamp": [
                441
            ],
            "lastTradeTimestamp": [
                441
            ],
            "lastUpdatedAt": [
                441
            ],
            "marketSupplyRaw": [
                441
            ],
            "maxLTV": [
                441
            ],
            "reserveBalanceRaw": [
                441
            ],
            "sellFeeBps": [
                441
            ],
            "totalSupplyRaw": [
                441
            ],
            "tradingFeeBps": [
                441
            ],
            "__typename": [
                366
            ]
        },
        "Market_variance_order_by": {
            "buyFeeBps": [
                441
            ],
            "createdAt": [
                441
            ],
            "currentPriceRaw": [
                441
            ],
            "floorPriceRaw": [
                441
            ],
            "floorSegmentSupplyRaw": [
                441
            ],
            "floorSupplyRaw": [
                441
            ],
            "initialFloorPriceRaw": [
                441
            ],
            "lastElevationTimestamp": [
                441
            ],
            "lastTradeTimestamp": [
                441
            ],
            "lastUpdatedAt": [
                441
            ],
            "marketSupplyRaw": [
                441
            ],
            "maxLTV": [
                441
            ],
            "reserveBalanceRaw": [
                441
            ],
            "sellFeeBps": [
                441
            ],
            "totalSupplyRaw": [
                441
            ],
            "tradingFeeBps": [
                441
            ],
            "__typename": [
                366
            ]
        },
        "ModuleAddress": {
            "createdAt": [
                439
            ],
            "id": [
                366
            ],
            "lastUpdatedAt": [
                439
            ],
            "market_id": [
                366
            ],
            "moduleType": [
                366
            ],
            "__typename": [
                366
            ]
        },
        "ModuleAddress_bool_exp": {
            "_and": [
                201
            ],
            "_not": [
                201
            ],
            "_or": [
                201
            ],
            "createdAt": [
                440
            ],
            "id": [
                368
            ],
            "lastUpdatedAt": [
                440
            ],
            "market_id": [
                368
            ],
            "moduleType": [
                368
            ],
            "__typename": [
                366
            ]
        },
        "ModuleAddress_order_by": {
            "createdAt": [
                441
            ],
            "id": [
                441
            ],
            "lastUpdatedAt": [
                441
            ],
            "market_id": [
                441
            ],
            "moduleType": [
                441
            ],
            "__typename": [
                366
            ]
        },
        "ModuleAddress_select_column": {},
        "ModuleAddress_stream_cursor_input": {
            "initial_value": [
                205
            ],
            "ordering": [
                429
            ],
            "__typename": [
                366
            ]
        },
        "ModuleAddress_stream_cursor_value_input": {
            "createdAt": [
                439
            ],
            "id": [
                366
            ],
            "lastUpdatedAt": [
                439
            ],
            "market_id": [
                366
            ],
            "moduleType": [
                366
            ],
            "__typename": [
                366
            ]
        },
        "ModuleRegistry": {
            "authorizer": [
                366
            ],
            "createdAt": [
                439
            ],
            "creditFacility": [
                366
            ],
            "feeTreasury": [
                366
            ],
            "floor": [
                366
            ],
            "id": [
                366
            ],
            "lastUpdatedAt": [
                439
            ],
            "presale": [
                366
            ],
            "staking": [
                366
            ],
            "__typename": [
                366
            ]
        },
        "ModuleRegistry_bool_exp": {
            "_and": [
                207
            ],
            "_not": [
                207
            ],
            "_or": [
                207
            ],
            "authorizer": [
                368
            ],
            "createdAt": [
                440
            ],
            "creditFacility": [
                368
            ],
            "feeTreasury": [
                368
            ],
            "floor": [
                368
            ],
            "id": [
                368
            ],
            "lastUpdatedAt": [
                440
            ],
            "presale": [
                368
            ],
            "staking": [
                368
            ],
            "__typename": [
                366
            ]
        },
        "ModuleRegistry_order_by": {
            "authorizer": [
                441
            ],
            "createdAt": [
                441
            ],
            "creditFacility": [
                441
            ],
            "feeTreasury": [
                441
            ],
            "floor": [
                441
            ],
            "id": [
                441
            ],
            "lastUpdatedAt": [
                441
            ],
            "presale": [
                441
            ],
            "staking": [
                441
            ],
            "__typename": [
                366
            ]
        },
        "ModuleRegistry_select_column": {},
        "ModuleRegistry_stream_cursor_input": {
            "initial_value": [
                211
            ],
            "ordering": [
                429
            ],
            "__typename": [
                366
            ]
        },
        "ModuleRegistry_stream_cursor_value_input": {
            "authorizer": [
                366
            ],
            "createdAt": [
                439
            ],
            "creditFacility": [
                366
            ],
            "feeTreasury": [
                366
            ],
            "floor": [
                366
            ],
            "id": [
                366
            ],
            "lastUpdatedAt": [
                439
            ],
            "presale": [
                366
            ],
            "staking": [
                366
            ],
            "__typename": [
                366
            ]
        },
        "PreSaleContract": {
            "authorizer": [
                366
            ],
            "claims": [
                218,
                {
                    "distinct_on": [
                        225,
                        "[PresaleClaim_select_column!]"
                    ],
                    "limit": [
                        135
                    ],
                    "offset": [
                        135
                    ],
                    "order_by": [
                        224,
                        "[PresaleClaim_order_by!]"
                    ],
                    "where": [
                        221
                    ]
                }
            ],
            "commissionBps": [
                366
            ],
            "createdAt": [
                439
            ],
            "currentState": [
                135
            ],
            "decayDuration": [
                439
            ],
            "decayStartTime": [
                439
            ],
            "endTime": [
                439
            ],
            "feeTreasury": [
                366
            ],
            "globalIssuanceCapFormatted": [
                366
            ],
            "globalIssuanceCapRaw": [
                439
            ],
            "id": [
                366
            ],
            "initialMultiplier": [
                439
            ],
            "lastUpdatedAt": [
                439
            ],
            "lendingFacility": [
                366
            ],
            "market_id": [
                366
            ],
            "maxLeverage": [
                439
            ],
            "merkleRoot": [
                366
            ],
            "participations": [
                235,
                {
                    "distinct_on": [
                        242,
                        "[PresaleParticipation_select_column!]"
                    ],
                    "limit": [
                        135
                    ],
                    "offset": [
                        135
                    ],
                    "order_by": [
                        241,
                        "[PresaleParticipation_order_by!]"
                    ],
                    "where": [
                        238
                    ]
                }
            ],
            "perAddressIssuanceCapFormatted": [
                366
            ],
            "perAddressIssuanceCapRaw": [
                439
            ],
            "priceBreakpointsFlat": [
                366
            ],
            "purchaseToken": [
                369
            ],
            "purchaseToken_id": [
                366
            ],
            "saleToken": [
                369
            ],
            "saleToken_id": [
                366
            ],
            "startTime": [
                439
            ],
            "timeSafeguardTs": [
                439
            ],
            "totalMintedFormatted": [
                366
            ],
            "totalMintedRaw": [
                439
            ],
            "totalParticipants": [
                439
            ],
            "totalRaisedFormatted": [
                366
            ],
            "totalRaisedRaw": [
                439
            ],
            "whitelistSize": [
                439
            ],
            "whitelistedAddresses": [
                366
            ],
            "__typename": [
                366
            ]
        },
        "PreSaleContract_bool_exp": {
            "_and": [
                213
            ],
            "_not": [
                213
            ],
            "_or": [
                213
            ],
            "authorizer": [
                368
            ],
            "claims": [
                221
            ],
            "commissionBps": [
                367
            ],
            "createdAt": [
                440
            ],
            "currentState": [
                136
            ],
            "decayDuration": [
                440
            ],
            "decayStartTime": [
                440
            ],
            "endTime": [
                440
            ],
            "feeTreasury": [
                368
            ],
            "globalIssuanceCapFormatted": [
                368
            ],
            "globalIssuanceCapRaw": [
                440
            ],
            "id": [
                368
            ],
            "initialMultiplier": [
                440
            ],
            "lastUpdatedAt": [
                440
            ],
            "lendingFacility": [
                368
            ],
            "market_id": [
                368
            ],
            "maxLeverage": [
                440
            ],
            "merkleRoot": [
                368
            ],
            "participations": [
                238
            ],
            "perAddressIssuanceCapFormatted": [
                368
            ],
            "perAddressIssuanceCapRaw": [
                440
            ],
            "priceBreakpointsFlat": [
                367
            ],
            "purchaseToken": [
                370
            ],
            "purchaseToken_id": [
                368
            ],
            "saleToken": [
                370
            ],
            "saleToken_id": [
                368
            ],
            "startTime": [
                440
            ],
            "timeSafeguardTs": [
                440
            ],
            "totalMintedFormatted": [
                368
            ],
            "totalMintedRaw": [
                440
            ],
            "totalParticipants": [
                440
            ],
            "totalRaisedFormatted": [
                368
            ],
            "totalRaisedRaw": [
                440
            ],
            "whitelistSize": [
                440
            ],
            "whitelistedAddresses": [
                367
            ],
            "__typename": [
                366
            ]
        },
        "PreSaleContract_order_by": {
            "authorizer": [
                441
            ],
            "claims_aggregate": [
                219
            ],
            "commissionBps": [
                441
            ],
            "createdAt": [
                441
            ],
            "currentState": [
                441
            ],
            "decayDuration": [
                441
            ],
            "decayStartTime": [
                441
            ],
            "endTime": [
                441
            ],
            "feeTreasury": [
                441
            ],
            "globalIssuanceCapFormatted": [
                441
            ],
            "globalIssuanceCapRaw": [
                441
            ],
            "id": [
                441
            ],
            "initialMultiplier": [
                441
            ],
            "lastUpdatedAt": [
                441
            ],
            "lendingFacility": [
                441
            ],
            "market_id": [
                441
            ],
            "maxLeverage": [
                441
            ],
            "merkleRoot": [
                441
            ],
            "participations_aggregate": [
                236
            ],
            "perAddressIssuanceCapFormatted": [
                441
            ],
            "perAddressIssuanceCapRaw": [
                441
            ],
            "priceBreakpointsFlat": [
                441
            ],
            "purchaseToken": [
                371
            ],
            "purchaseToken_id": [
                441
            ],
            "saleToken": [
                371
            ],
            "saleToken_id": [
                441
            ],
            "startTime": [
                441
            ],
            "timeSafeguardTs": [
                441
            ],
            "totalMintedFormatted": [
                441
            ],
            "totalMintedRaw": [
                441
            ],
            "totalParticipants": [
                441
            ],
            "totalRaisedFormatted": [
                441
            ],
            "totalRaisedRaw": [
                441
            ],
            "whitelistSize": [
                441
            ],
            "whitelistedAddresses": [
                441
            ],
            "__typename": [
                366
            ]
        },
        "PreSaleContract_select_column": {},
        "PreSaleContract_stream_cursor_input": {
            "initial_value": [
                217
            ],
            "ordering": [
                429
            ],
            "__typename": [
                366
            ]
        },
        "PreSaleContract_stream_cursor_value_input": {
            "authorizer": [
                366
            ],
            "commissionBps": [
                366
            ],
            "createdAt": [
                439
            ],
            "currentState": [
                135
            ],
            "decayDuration": [
                439
            ],
            "decayStartTime": [
                439
            ],
            "endTime": [
                439
            ],
            "feeTreasury": [
                366
            ],
            "globalIssuanceCapFormatted": [
                366
            ],
            "globalIssuanceCapRaw": [
                439
            ],
            "id": [
                366
            ],
            "initialMultiplier": [
                439
            ],
            "lastUpdatedAt": [
                439
            ],
            "lendingFacility": [
                366
            ],
            "market_id": [
                366
            ],
            "maxLeverage": [
                439
            ],
            "merkleRoot": [
                366
            ],
            "perAddressIssuanceCapFormatted": [
                366
            ],
            "perAddressIssuanceCapRaw": [
                439
            ],
            "priceBreakpointsFlat": [
                366
            ],
            "purchaseToken_id": [
                366
            ],
            "saleToken_id": [
                366
            ],
            "startTime": [
                439
            ],
            "timeSafeguardTs": [
                439
            ],
            "totalMintedFormatted": [
                366
            ],
            "totalMintedRaw": [
                439
            ],
            "totalParticipants": [
                439
            ],
            "totalRaisedFormatted": [
                366
            ],
            "totalRaisedRaw": [
                439
            ],
            "whitelistSize": [
                439
            ],
            "whitelistedAddresses": [
                366
            ],
            "__typename": [
                366
            ]
        },
        "PresaleClaim": {
            "amountFormatted": [
                366
            ],
            "amountRaw": [
                439
            ],
            "claimType": [
                442
            ],
            "id": [
                366
            ],
            "loanId": [
                439
            ],
            "positionId": [
                439
            ],
            "presale_id": [
                366
            ],
            "timestamp": [
                439
            ],
            "trancheIndex": [
                439
            ],
            "transactionHash": [
                366
            ],
            "__typename": [
                366
            ]
        },
        "PresaleClaim_aggregate_order_by": {
            "avg": [
                220
            ],
            "count": [
                441
            ],
            "max": [
                222
            ],
            "min": [
                223
            ],
            "stddev": [
                226
            ],
            "stddev_pop": [
                227
            ],
            "stddev_samp": [
                228
            ],
            "sum": [
                231
            ],
            "var_pop": [
                232
            ],
            "var_samp": [
                233
            ],
            "variance": [
                234
            ],
            "__typename": [
                366
            ]
        },
        "PresaleClaim_avg_order_by": {
            "amountRaw": [
                441
            ],
            "loanId": [
                441
            ],
            "positionId": [
                441
            ],
            "timestamp": [
                441
            ],
            "trancheIndex": [
                441
            ],
            "__typename": [
                366
            ]
        },
        "PresaleClaim_bool_exp": {
            "_and": [
                221
            ],
            "_not": [
                221
            ],
            "_or": [
                221
            ],
            "amountFormatted": [
                368
            ],
            "amountRaw": [
                440
            ],
            "claimType": [
                443
            ],
            "id": [
                368
            ],
            "loanId": [
                440
            ],
            "positionId": [
                440
            ],
            "presale_id": [
                368
            ],
            "timestamp": [
                440
            ],
            "trancheIndex": [
                440
            ],
            "transactionHash": [
                368
            ],
            "__typename": [
                366
            ]
        },
        "PresaleClaim_max_order_by": {
            "amountFormatted": [
                441
            ],
            "amountRaw": [
                441
            ],
            "claimType": [
                441
            ],
            "id": [
                441
            ],
            "loanId": [
                441
            ],
            "positionId": [
                441
            ],
            "presale_id": [
                441
            ],
            "timestamp": [
                441
            ],
            "trancheIndex": [
                441
            ],
            "transactionHash": [
                441
            ],
            "__typename": [
                366
            ]
        },
        "PresaleClaim_min_order_by": {
            "amountFormatted": [
                441
            ],
            "amountRaw": [
                441
            ],
            "claimType": [
                441
            ],
            "id": [
                441
            ],
            "loanId": [
                441
            ],
            "positionId": [
                441
            ],
            "presale_id": [
                441
            ],
            "timestamp": [
                441
            ],
            "trancheIndex": [
                441
            ],
            "transactionHash": [
                441
            ],
            "__typename": [
                366
            ]
        },
        "PresaleClaim_order_by": {
            "amountFormatted": [
                441
            ],
            "amountRaw": [
                441
            ],
            "claimType": [
                441
            ],
            "id": [
                441
            ],
            "loanId": [
                441
            ],
            "positionId": [
                441
            ],
            "presale_id": [
                441
            ],
            "timestamp": [
                441
            ],
            "trancheIndex": [
                441
            ],
            "transactionHash": [
                441
            ],
            "__typename": [
                366
            ]
        },
        "PresaleClaim_select_column": {},
        "PresaleClaim_stddev_order_by": {
            "amountRaw": [
                441
            ],
            "loanId": [
                441
            ],
            "positionId": [
                441
            ],
            "timestamp": [
                441
            ],
            "trancheIndex": [
                441
            ],
            "__typename": [
                366
            ]
        },
        "PresaleClaim_stddev_pop_order_by": {
            "amountRaw": [
                441
            ],
            "loanId": [
                441
            ],
            "positionId": [
                441
            ],
            "timestamp": [
                441
            ],
            "trancheIndex": [
                441
            ],
            "__typename": [
                366
            ]
        },
        "PresaleClaim_stddev_samp_order_by": {
            "amountRaw": [
                441
            ],
            "loanId": [
                441
            ],
            "positionId": [
                441
            ],
            "timestamp": [
                441
            ],
            "trancheIndex": [
                441
            ],
            "__typename": [
                366
            ]
        },
        "PresaleClaim_stream_cursor_input": {
            "initial_value": [
                230
            ],
            "ordering": [
                429
            ],
            "__typename": [
                366
            ]
        },
        "PresaleClaim_stream_cursor_value_input": {
            "amountFormatted": [
                366
            ],
            "amountRaw": [
                439
            ],
            "claimType": [
                442
            ],
            "id": [
                366
            ],
            "loanId": [
                439
            ],
            "positionId": [
                439
            ],
            "presale_id": [
                366
            ],
            "timestamp": [
                439
            ],
            "trancheIndex": [
                439
            ],
            "transactionHash": [
                366
            ],
            "__typename": [
                366
            ]
        },
        "PresaleClaim_sum_order_by": {
            "amountRaw": [
                441
            ],
            "loanId": [
                441
            ],
            "positionId": [
                441
            ],
            "timestamp": [
                441
            ],
            "trancheIndex": [
                441
            ],
            "__typename": [
                366
            ]
        },
        "PresaleClaim_var_pop_order_by": {
            "amountRaw": [
                441
            ],
            "loanId": [
                441
            ],
            "positionId": [
                441
            ],
            "timestamp": [
                441
            ],
            "trancheIndex": [
                441
            ],
            "__typename": [
                366
            ]
        },
        "PresaleClaim_var_samp_order_by": {
            "amountRaw": [
                441
            ],
            "loanId": [
                441
            ],
            "positionId": [
                441
            ],
            "timestamp": [
                441
            ],
            "trancheIndex": [
                441
            ],
            "__typename": [
                366
            ]
        },
        "PresaleClaim_variance_order_by": {
            "amountRaw": [
                441
            ],
            "loanId": [
                441
            ],
            "positionId": [
                441
            ],
            "timestamp": [
                441
            ],
            "trancheIndex": [
                441
            ],
            "__typename": [
                366
            ]
        },
        "PresaleParticipation": {
            "depositAmountFormatted": [
                366
            ],
            "depositAmountRaw": [
                439
            ],
            "id": [
                366
            ],
            "leverage": [
                439
            ],
            "loopCount": [
                439
            ],
            "mintedAmountFormatted": [
                366
            ],
            "mintedAmountRaw": [
                439
            ],
            "positionId": [
                439
            ],
            "presale_id": [
                366
            ],
            "timestamp": [
                439
            ],
            "transactionHash": [
                366
            ],
            "user_id": [
                366
            ],
            "__typename": [
                366
            ]
        },
        "PresaleParticipation_aggregate_order_by": {
            "avg": [
                237
            ],
            "count": [
                441
            ],
            "max": [
                239
            ],
            "min": [
                240
            ],
            "stddev": [
                243
            ],
            "stddev_pop": [
                244
            ],
            "stddev_samp": [
                245
            ],
            "sum": [
                248
            ],
            "var_pop": [
                249
            ],
            "var_samp": [
                250
            ],
            "variance": [
                251
            ],
            "__typename": [
                366
            ]
        },
        "PresaleParticipation_avg_order_by": {
            "depositAmountRaw": [
                441
            ],
            "leverage": [
                441
            ],
            "loopCount": [
                441
            ],
            "mintedAmountRaw": [
                441
            ],
            "positionId": [
                441
            ],
            "timestamp": [
                441
            ],
            "__typename": [
                366
            ]
        },
        "PresaleParticipation_bool_exp": {
            "_and": [
                238
            ],
            "_not": [
                238
            ],
            "_or": [
                238
            ],
            "depositAmountFormatted": [
                368
            ],
            "depositAmountRaw": [
                440
            ],
            "id": [
                368
            ],
            "leverage": [
                440
            ],
            "loopCount": [
                440
            ],
            "mintedAmountFormatted": [
                368
            ],
            "mintedAmountRaw": [
                440
            ],
            "positionId": [
                440
            ],
            "presale_id": [
                368
            ],
            "timestamp": [
                440
            ],
            "transactionHash": [
                368
            ],
            "user_id": [
                368
            ],
            "__typename": [
                366
            ]
        },
        "PresaleParticipation_max_order_by": {
            "depositAmountFormatted": [
                441
            ],
            "depositAmountRaw": [
                441
            ],
            "id": [
                441
            ],
            "leverage": [
                441
            ],
            "loopCount": [
                441
            ],
            "mintedAmountFormatted": [
                441
            ],
            "mintedAmountRaw": [
                441
            ],
            "positionId": [
                441
            ],
            "presale_id": [
                441
            ],
            "timestamp": [
                441
            ],
            "transactionHash": [
                441
            ],
            "user_id": [
                441
            ],
            "__typename": [
                366
            ]
        },
        "PresaleParticipation_min_order_by": {
            "depositAmountFormatted": [
                441
            ],
            "depositAmountRaw": [
                441
            ],
            "id": [
                441
            ],
            "leverage": [
                441
            ],
            "loopCount": [
                441
            ],
            "mintedAmountFormatted": [
                441
            ],
            "mintedAmountRaw": [
                441
            ],
            "positionId": [
                441
            ],
            "presale_id": [
                441
            ],
            "timestamp": [
                441
            ],
            "transactionHash": [
                441
            ],
            "user_id": [
                441
            ],
            "__typename": [
                366
            ]
        },
        "PresaleParticipation_order_by": {
            "depositAmountFormatted": [
                441
            ],
            "depositAmountRaw": [
                441
            ],
            "id": [
                441
            ],
            "leverage": [
                441
            ],
            "loopCount": [
                441
            ],
            "mintedAmountFormatted": [
                441
            ],
            "mintedAmountRaw": [
                441
            ],
            "positionId": [
                441
            ],
            "presale_id": [
                441
            ],
            "timestamp": [
                441
            ],
            "transactionHash": [
                441
            ],
            "user_id": [
                441
            ],
            "__typename": [
                366
            ]
        },
        "PresaleParticipation_select_column": {},
        "PresaleParticipation_stddev_order_by": {
            "depositAmountRaw": [
                441
            ],
            "leverage": [
                441
            ],
            "loopCount": [
                441
            ],
            "mintedAmountRaw": [
                441
            ],
            "positionId": [
                441
            ],
            "timestamp": [
                441
            ],
            "__typename": [
                366
            ]
        },
        "PresaleParticipation_stddev_pop_order_by": {
            "depositAmountRaw": [
                441
            ],
            "leverage": [
                441
            ],
            "loopCount": [
                441
            ],
            "mintedAmountRaw": [
                441
            ],
            "positionId": [
                441
            ],
            "timestamp": [
                441
            ],
            "__typename": [
                366
            ]
        },
        "PresaleParticipation_stddev_samp_order_by": {
            "depositAmountRaw": [
                441
            ],
            "leverage": [
                441
            ],
            "loopCount": [
                441
            ],
            "mintedAmountRaw": [
                441
            ],
            "positionId": [
                441
            ],
            "timestamp": [
                441
            ],
            "__typename": [
                366
            ]
        },
        "PresaleParticipation_stream_cursor_input": {
            "initial_value": [
                247
            ],
            "ordering": [
                429
            ],
            "__typename": [
                366
            ]
        },
        "PresaleParticipation_stream_cursor_value_input": {
            "depositAmountFormatted": [
                366
            ],
            "depositAmountRaw": [
                439
            ],
            "id": [
                366
            ],
            "leverage": [
                439
            ],
            "loopCount": [
                439
            ],
            "mintedAmountFormatted": [
                366
            ],
            "mintedAmountRaw": [
                439
            ],
            "positionId": [
                439
            ],
            "presale_id": [
                366
            ],
            "timestamp": [
                439
            ],
            "transactionHash": [
                366
            ],
            "user_id": [
                366
            ],
            "__typename": [
                366
            ]
        },
        "PresaleParticipation_sum_order_by": {
            "depositAmountRaw": [
                441
            ],
            "leverage": [
                441
            ],
            "loopCount": [
                441
            ],
            "mintedAmountRaw": [
                441
            ],
            "positionId": [
                441
            ],
            "timestamp": [
                441
            ],
            "__typename": [
                366
            ]
        },
        "PresaleParticipation_var_pop_order_by": {
            "depositAmountRaw": [
                441
            ],
            "leverage": [
                441
            ],
            "loopCount": [
                441
            ],
            "mintedAmountRaw": [
                441
            ],
            "positionId": [
                441
            ],
            "timestamp": [
                441
            ],
            "__typename": [
                366
            ]
        },
        "PresaleParticipation_var_samp_order_by": {
            "depositAmountRaw": [
                441
            ],
            "leverage": [
                441
            ],
            "loopCount": [
                441
            ],
            "mintedAmountRaw": [
                441
            ],
            "positionId": [
                441
            ],
            "timestamp": [
                441
            ],
            "__typename": [
                366
            ]
        },
        "PresaleParticipation_variance_order_by": {
            "depositAmountRaw": [
                441
            ],
            "leverage": [
                441
            ],
            "loopCount": [
                441
            ],
            "mintedAmountRaw": [
                441
            ],
            "positionId": [
                441
            ],
            "timestamp": [
                441
            ],
            "__typename": [
                366
            ]
        },
        "PriceCandle": {
            "closeFormatted": [
                366
            ],
            "closeRaw": [
                439
            ],
            "highFormatted": [
                366
            ],
            "highRaw": [
                439
            ],
            "id": [
                366
            ],
            "lowFormatted": [
                366
            ],
            "lowRaw": [
                439
            ],
            "market_id": [
                366
            ],
            "openFormatted": [
                366
            ],
            "openRaw": [
                439
            ],
            "period": [
                421
            ],
            "timestamp": [
                439
            ],
            "trades": [
                439
            ],
            "volumeFormatted": [
                366
            ],
            "volumeRaw": [
                439
            ],
            "__typename": [
                366
            ]
        },
        "PriceCandle_bool_exp": {
            "_and": [
                253
            ],
            "_not": [
                253
            ],
            "_or": [
                253
            ],
            "closeFormatted": [
                368
            ],
            "closeRaw": [
                440
            ],
            "highFormatted": [
                368
            ],
            "highRaw": [
                440
            ],
            "id": [
                368
            ],
            "lowFormatted": [
                368
            ],
            "lowRaw": [
                440
            ],
            "market_id": [
                368
            ],
            "openFormatted": [
                368
            ],
            "openRaw": [
                440
            ],
            "period": [
                422
            ],
            "timestamp": [
                440
            ],
            "trades": [
                440
            ],
            "volumeFormatted": [
                368
            ],
            "volumeRaw": [
                440
            ],
            "__typename": [
                366
            ]
        },
        "PriceCandle_order_by": {
            "closeFormatted": [
                441
            ],
            "closeRaw": [
                441
            ],
            "highFormatted": [
                441
            ],
            "highRaw": [
                441
            ],
            "id": [
                441
            ],
            "lowFormatted": [
                441
            ],
            "lowRaw": [
                441
            ],
            "market_id": [
                441
            ],
            "openFormatted": [
                441
            ],
            "openRaw": [
                441
            ],
            "period": [
                441
            ],
            "timestamp": [
                441
            ],
            "trades": [
                441
            ],
            "volumeFormatted": [
                441
            ],
            "volumeRaw": [
                441
            ],
            "__typename": [
                366
            ]
        },
        "PriceCandle_select_column": {},
        "PriceCandle_stream_cursor_input": {
            "initial_value": [
                257
            ],
            "ordering": [
                429
            ],
            "__typename": [
                366
            ]
        },
        "PriceCandle_stream_cursor_value_input": {
            "closeFormatted": [
                366
            ],
            "closeRaw": [
                439
            ],
            "highFormatted": [
                366
            ],
            "highRaw": [
                439
            ],
            "id": [
                366
            ],
            "lowFormatted": [
                366
            ],
            "lowRaw": [
                439
            ],
            "market_id": [
                366
            ],
            "openFormatted": [
                366
            ],
            "openRaw": [
                439
            ],
            "period": [
                421
            ],
            "timestamp": [
                439
            ],
            "trades": [
                439
            ],
            "volumeFormatted": [
                366
            ],
            "volumeRaw": [
                439
            ],
            "__typename": [
                366
            ]
        },
        "Role": {
            "adminRole": [
                366
            ],
            "adminRoleName": [
                366
            ],
            "authorizer_id": [
                366
            ],
            "createdAt": [
                439
            ],
            "id": [
                366
            ],
            "isAdminBurned": [
                12
            ],
            "lastUpdatedAt": [
                439
            ],
            "members": [
                259,
                {
                    "distinct_on": [
                        266,
                        "[RoleMember_select_column!]"
                    ],
                    "limit": [
                        135
                    ],
                    "offset": [
                        135
                    ],
                    "order_by": [
                        265,
                        "[RoleMember_order_by!]"
                    ],
                    "where": [
                        262
                    ]
                }
            ],
            "name": [
                366
            ],
            "permissions": [
                276,
                {
                    "distinct_on": [
                        283,
                        "[RolePermission_select_column!]"
                    ],
                    "limit": [
                        135
                    ],
                    "offset": [
                        135
                    ],
                    "order_by": [
                        282,
                        "[RolePermission_order_by!]"
                    ],
                    "where": [
                        279
                    ]
                }
            ],
            "roleId": [
                366
            ],
            "__typename": [
                366
            ]
        },
        "RoleMember": {
            "grantedAt": [
                439
            ],
            "grantedBy": [
                366
            ],
            "id": [
                366
            ],
            "member": [
                366
            ],
            "role_id": [
                366
            ],
            "transactionHash": [
                366
            ],
            "__typename": [
                366
            ]
        },
        "RoleMember_aggregate_order_by": {
            "avg": [
                261
            ],
            "count": [
                441
            ],
            "max": [
                263
            ],
            "min": [
                264
            ],
            "stddev": [
                267
            ],
            "stddev_pop": [
                268
            ],
            "stddev_samp": [
                269
            ],
            "sum": [
                272
            ],
            "var_pop": [
                273
            ],
            "var_samp": [
                274
            ],
            "variance": [
                275
            ],
            "__typename": [
                366
            ]
        },
        "RoleMember_avg_order_by": {
            "grantedAt": [
                441
            ],
            "__typename": [
                366
            ]
        },
        "RoleMember_bool_exp": {
            "_and": [
                262
            ],
            "_not": [
                262
            ],
            "_or": [
                262
            ],
            "grantedAt": [
                440
            ],
            "grantedBy": [
                368
            ],
            "id": [
                368
            ],
            "member": [
                368
            ],
            "role_id": [
                368
            ],
            "transactionHash": [
                368
            ],
            "__typename": [
                366
            ]
        },
        "RoleMember_max_order_by": {
            "grantedAt": [
                441
            ],
            "grantedBy": [
                441
            ],
            "id": [
                441
            ],
            "member": [
                441
            ],
            "role_id": [
                441
            ],
            "transactionHash": [
                441
            ],
            "__typename": [
                366
            ]
        },
        "RoleMember_min_order_by": {
            "grantedAt": [
                441
            ],
            "grantedBy": [
                441
            ],
            "id": [
                441
            ],
            "member": [
                441
            ],
            "role_id": [
                441
            ],
            "transactionHash": [
                441
            ],
            "__typename": [
                366
            ]
        },
        "RoleMember_order_by": {
            "grantedAt": [
                441
            ],
            "grantedBy": [
                441
            ],
            "id": [
                441
            ],
            "member": [
                441
            ],
            "role_id": [
                441
            ],
            "transactionHash": [
                441
            ],
            "__typename": [
                366
            ]
        },
        "RoleMember_select_column": {},
        "RoleMember_stddev_order_by": {
            "grantedAt": [
                441
            ],
            "__typename": [
                366
            ]
        },
        "RoleMember_stddev_pop_order_by": {
            "grantedAt": [
                441
            ],
            "__typename": [
                366
            ]
        },
        "RoleMember_stddev_samp_order_by": {
            "grantedAt": [
                441
            ],
            "__typename": [
                366
            ]
        },
        "RoleMember_stream_cursor_input": {
            "initial_value": [
                271
            ],
            "ordering": [
                429
            ],
            "__typename": [
                366
            ]
        },
        "RoleMember_stream_cursor_value_input": {
            "grantedAt": [
                439
            ],
            "grantedBy": [
                366
            ],
            "id": [
                366
            ],
            "member": [
                366
            ],
            "role_id": [
                366
            ],
            "transactionHash": [
                366
            ],
            "__typename": [
                366
            ]
        },
        "RoleMember_sum_order_by": {
            "grantedAt": [
                441
            ],
            "__typename": [
                366
            ]
        },
        "RoleMember_var_pop_order_by": {
            "grantedAt": [
                441
            ],
            "__typename": [
                366
            ]
        },
        "RoleMember_var_samp_order_by": {
            "grantedAt": [
                441
            ],
            "__typename": [
                366
            ]
        },
        "RoleMember_variance_order_by": {
            "grantedAt": [
                441
            ],
            "__typename": [
                366
            ]
        },
        "RolePermission": {
            "addedAt": [
                439
            ],
            "id": [
                366
            ],
            "role_id": [
                366
            ],
            "selector": [
                366
            ],
            "selectorName": [
                366
            ],
            "target": [
                366
            ],
            "transactionHash": [
                366
            ],
            "__typename": [
                366
            ]
        },
        "RolePermission_aggregate_order_by": {
            "avg": [
                278
            ],
            "count": [
                441
            ],
            "max": [
                280
            ],
            "min": [
                281
            ],
            "stddev": [
                284
            ],
            "stddev_pop": [
                285
            ],
            "stddev_samp": [
                286
            ],
            "sum": [
                289
            ],
            "var_pop": [
                290
            ],
            "var_samp": [
                291
            ],
            "variance": [
                292
            ],
            "__typename": [
                366
            ]
        },
        "RolePermission_avg_order_by": {
            "addedAt": [
                441
            ],
            "__typename": [
                366
            ]
        },
        "RolePermission_bool_exp": {
            "_and": [
                279
            ],
            "_not": [
                279
            ],
            "_or": [
                279
            ],
            "addedAt": [
                440
            ],
            "id": [
                368
            ],
            "role_id": [
                368
            ],
            "selector": [
                368
            ],
            "selectorName": [
                368
            ],
            "target": [
                368
            ],
            "transactionHash": [
                368
            ],
            "__typename": [
                366
            ]
        },
        "RolePermission_max_order_by": {
            "addedAt": [
                441
            ],
            "id": [
                441
            ],
            "role_id": [
                441
            ],
            "selector": [
                441
            ],
            "selectorName": [
                441
            ],
            "target": [
                441
            ],
            "transactionHash": [
                441
            ],
            "__typename": [
                366
            ]
        },
        "RolePermission_min_order_by": {
            "addedAt": [
                441
            ],
            "id": [
                441
            ],
            "role_id": [
                441
            ],
            "selector": [
                441
            ],
            "selectorName": [
                441
            ],
            "target": [
                441
            ],
            "transactionHash": [
                441
            ],
            "__typename": [
                366
            ]
        },
        "RolePermission_order_by": {
            "addedAt": [
                441
            ],
            "id": [
                441
            ],
            "role_id": [
                441
            ],
            "selector": [
                441
            ],
            "selectorName": [
                441
            ],
            "target": [
                441
            ],
            "transactionHash": [
                441
            ],
            "__typename": [
                366
            ]
        },
        "RolePermission_select_column": {},
        "RolePermission_stddev_order_by": {
            "addedAt": [
                441
            ],
            "__typename": [
                366
            ]
        },
        "RolePermission_stddev_pop_order_by": {
            "addedAt": [
                441
            ],
            "__typename": [
                366
            ]
        },
        "RolePermission_stddev_samp_order_by": {
            "addedAt": [
                441
            ],
            "__typename": [
                366
            ]
        },
        "RolePermission_stream_cursor_input": {
            "initial_value": [
                288
            ],
            "ordering": [
                429
            ],
            "__typename": [
                366
            ]
        },
        "RolePermission_stream_cursor_value_input": {
            "addedAt": [
                439
            ],
            "id": [
                366
            ],
            "role_id": [
                366
            ],
            "selector": [
                366
            ],
            "selectorName": [
                366
            ],
            "target": [
                366
            ],
            "transactionHash": [
                366
            ],
            "__typename": [
                366
            ]
        },
        "RolePermission_sum_order_by": {
            "addedAt": [
                441
            ],
            "__typename": [
                366
            ]
        },
        "RolePermission_var_pop_order_by": {
            "addedAt": [
                441
            ],
            "__typename": [
                366
            ]
        },
        "RolePermission_var_samp_order_by": {
            "addedAt": [
                441
            ],
            "__typename": [
                366
            ]
        },
        "RolePermission_variance_order_by": {
            "addedAt": [
                441
            ],
            "__typename": [
                366
            ]
        },
        "Role_aggregate_order_by": {
            "avg": [
                294
            ],
            "count": [
                441
            ],
            "max": [
                296
            ],
            "min": [
                297
            ],
            "stddev": [
                300
            ],
            "stddev_pop": [
                301
            ],
            "stddev_samp": [
                302
            ],
            "sum": [
                305
            ],
            "var_pop": [
                306
            ],
            "var_samp": [
                307
            ],
            "variance": [
                308
            ],
            "__typename": [
                366
            ]
        },
        "Role_avg_order_by": {
            "createdAt": [
                441
            ],
            "lastUpdatedAt": [
                441
            ],
            "__typename": [
                366
            ]
        },
        "Role_bool_exp": {
            "_and": [
                295
            ],
            "_not": [
                295
            ],
            "_or": [
                295
            ],
            "adminRole": [
                368
            ],
            "adminRoleName": [
                368
            ],
            "authorizer_id": [
                368
            ],
            "createdAt": [
                440
            ],
            "id": [
                368
            ],
            "isAdminBurned": [
                13
            ],
            "lastUpdatedAt": [
                440
            ],
            "members": [
                262
            ],
            "name": [
                368
            ],
            "permissions": [
                279
            ],
            "roleId": [
                368
            ],
            "__typename": [
                366
            ]
        },
        "Role_max_order_by": {
            "adminRole": [
                441
            ],
            "adminRoleName": [
                441
            ],
            "authorizer_id": [
                441
            ],
            "createdAt": [
                441
            ],
            "id": [
                441
            ],
            "lastUpdatedAt": [
                441
            ],
            "name": [
                441
            ],
            "roleId": [
                441
            ],
            "__typename": [
                366
            ]
        },
        "Role_min_order_by": {
            "adminRole": [
                441
            ],
            "adminRoleName": [
                441
            ],
            "authorizer_id": [
                441
            ],
            "createdAt": [
                441
            ],
            "id": [
                441
            ],
            "lastUpdatedAt": [
                441
            ],
            "name": [
                441
            ],
            "roleId": [
                441
            ],
            "__typename": [
                366
            ]
        },
        "Role_order_by": {
            "adminRole": [
                441
            ],
            "adminRoleName": [
                441
            ],
            "authorizer_id": [
                441
            ],
            "createdAt": [
                441
            ],
            "id": [
                441
            ],
            "isAdminBurned": [
                441
            ],
            "lastUpdatedAt": [
                441
            ],
            "members_aggregate": [
                260
            ],
            "name": [
                441
            ],
            "permissions_aggregate": [
                277
            ],
            "roleId": [
                441
            ],
            "__typename": [
                366
            ]
        },
        "Role_select_column": {},
        "Role_stddev_order_by": {
            "createdAt": [
                441
            ],
            "lastUpdatedAt": [
                441
            ],
            "__typename": [
                366
            ]
        },
        "Role_stddev_pop_order_by": {
            "createdAt": [
                441
            ],
            "lastUpdatedAt": [
                441
            ],
            "__typename": [
                366
            ]
        },
        "Role_stddev_samp_order_by": {
            "createdAt": [
                441
            ],
            "lastUpdatedAt": [
                441
            ],
            "__typename": [
                366
            ]
        },
        "Role_stream_cursor_input": {
            "initial_value": [
                304
            ],
            "ordering": [
                429
            ],
            "__typename": [
                366
            ]
        },
        "Role_stream_cursor_value_input": {
            "adminRole": [
                366
            ],
            "adminRoleName": [
                366
            ],
            "authorizer_id": [
                366
            ],
            "createdAt": [
                439
            ],
            "id": [
                366
            ],
            "isAdminBurned": [
                12
            ],
            "lastUpdatedAt": [
                439
            ],
            "name": [
                366
            ],
            "roleId": [
                366
            ],
            "__typename": [
                366
            ]
        },
        "Role_sum_order_by": {
            "createdAt": [
                441
            ],
            "lastUpdatedAt": [
                441
            ],
            "__typename": [
                366
            ]
        },
        "Role_var_pop_order_by": {
            "createdAt": [
                441
            ],
            "lastUpdatedAt": [
                441
            ],
            "__typename": [
                366
            ]
        },
        "Role_var_samp_order_by": {
            "createdAt": [
                441
            ],
            "lastUpdatedAt": [
                441
            ],
            "__typename": [
                366
            ]
        },
        "Role_variance_order_by": {
            "createdAt": [
                441
            ],
            "lastUpdatedAt": [
                441
            ],
            "__typename": [
                366
            ]
        },
        "StakePosition": {
            "activities": [
                326,
                {
                    "distinct_on": [
                        333,
                        "[StakingActivity_select_column!]"
                    ],
                    "limit": [
                        135
                    ],
                    "offset": [
                        135
                    ],
                    "order_by": [
                        332,
                        "[StakingActivity_order_by!]"
                    ],
                    "where": [
                        329
                    ]
                }
            ],
            "collateralDeployedFormatted": [
                366
            ],
            "collateralDeployedRaw": [
                439
            ],
            "createdAt": [
                439
            ],
            "floorPriceAtStakeFormatted": [
                366
            ],
            "floorPriceAtStakeRaw": [
                439
            ],
            "id": [
                366
            ],
            "issuanceTokenAmountFormatted": [
                366
            ],
            "issuanceTokenAmountRaw": [
                439
            ],
            "lastUpdatedAt": [
                439
            ],
            "stakingManager_id": [
                366
            ],
            "status": [
                452
            ],
            "strategy_id": [
                366
            ],
            "totalFeePaidFormatted": [
                366
            ],
            "totalFeePaidRaw": [
                439
            ],
            "totalYieldHarvestedFormatted": [
                366
            ],
            "totalYieldHarvestedRaw": [
                439
            ],
            "transactionHash": [
                366
            ],
            "user_id": [
                366
            ],
            "__typename": [
                366
            ]
        },
        "StakePosition_aggregate_order_by": {
            "avg": [
                311
            ],
            "count": [
                441
            ],
            "max": [
                313
            ],
            "min": [
                314
            ],
            "stddev": [
                317
            ],
            "stddev_pop": [
                318
            ],
            "stddev_samp": [
                319
            ],
            "sum": [
                322
            ],
            "var_pop": [
                323
            ],
            "var_samp": [
                324
            ],
            "variance": [
                325
            ],
            "__typename": [
                366
            ]
        },
        "StakePosition_avg_order_by": {
            "collateralDeployedRaw": [
                441
            ],
            "createdAt": [
                441
            ],
            "floorPriceAtStakeRaw": [
                441
            ],
            "issuanceTokenAmountRaw": [
                441
            ],
            "lastUpdatedAt": [
                441
            ],
            "totalFeePaidRaw": [
                441
            ],
            "totalYieldHarvestedRaw": [
                441
            ],
            "__typename": [
                366
            ]
        },
        "StakePosition_bool_exp": {
            "_and": [
                312
            ],
            "_not": [
                312
            ],
            "_or": [
                312
            ],
            "activities": [
                329
            ],
            "collateralDeployedFormatted": [
                368
            ],
            "collateralDeployedRaw": [
                440
            ],
            "createdAt": [
                440
            ],
            "floorPriceAtStakeFormatted": [
                368
            ],
            "floorPriceAtStakeRaw": [
                440
            ],
            "id": [
                368
            ],
            "issuanceTokenAmountFormatted": [
                368
            ],
            "issuanceTokenAmountRaw": [
                440
            ],
            "lastUpdatedAt": [
                440
            ],
            "stakingManager_id": [
                368
            ],
            "status": [
                453
            ],
            "strategy_id": [
                368
            ],
            "totalFeePaidFormatted": [
                368
            ],
            "totalFeePaidRaw": [
                440
            ],
            "totalYieldHarvestedFormatted": [
                368
            ],
            "totalYieldHarvestedRaw": [
                440
            ],
            "transactionHash": [
                368
            ],
            "user_id": [
                368
            ],
            "__typename": [
                366
            ]
        },
        "StakePosition_max_order_by": {
            "collateralDeployedFormatted": [
                441
            ],
            "collateralDeployedRaw": [
                441
            ],
            "createdAt": [
                441
            ],
            "floorPriceAtStakeFormatted": [
                441
            ],
            "floorPriceAtStakeRaw": [
                441
            ],
            "id": [
                441
            ],
            "issuanceTokenAmountFormatted": [
                441
            ],
            "issuanceTokenAmountRaw": [
                441
            ],
            "lastUpdatedAt": [
                441
            ],
            "stakingManager_id": [
                441
            ],
            "status": [
                441
            ],
            "strategy_id": [
                441
            ],
            "totalFeePaidFormatted": [
                441
            ],
            "totalFeePaidRaw": [
                441
            ],
            "totalYieldHarvestedFormatted": [
                441
            ],
            "totalYieldHarvestedRaw": [
                441
            ],
            "transactionHash": [
                441
            ],
            "user_id": [
                441
            ],
            "__typename": [
                366
            ]
        },
        "StakePosition_min_order_by": {
            "collateralDeployedFormatted": [
                441
            ],
            "collateralDeployedRaw": [
                441
            ],
            "createdAt": [
                441
            ],
            "floorPriceAtStakeFormatted": [
                441
            ],
            "floorPriceAtStakeRaw": [
                441
            ],
            "id": [
                441
            ],
            "issuanceTokenAmountFormatted": [
                441
            ],
            "issuanceTokenAmountRaw": [
                441
            ],
            "lastUpdatedAt": [
                441
            ],
            "stakingManager_id": [
                441
            ],
            "status": [
                441
            ],
            "strategy_id": [
                441
            ],
            "totalFeePaidFormatted": [
                441
            ],
            "totalFeePaidRaw": [
                441
            ],
            "totalYieldHarvestedFormatted": [
                441
            ],
            "totalYieldHarvestedRaw": [
                441
            ],
            "transactionHash": [
                441
            ],
            "user_id": [
                441
            ],
            "__typename": [
                366
            ]
        },
        "StakePosition_order_by": {
            "activities_aggregate": [
                327
            ],
            "collateralDeployedFormatted": [
                441
            ],
            "collateralDeployedRaw": [
                441
            ],
            "createdAt": [
                441
            ],
            "floorPriceAtStakeFormatted": [
                441
            ],
            "floorPriceAtStakeRaw": [
                441
            ],
            "id": [
                441
            ],
            "issuanceTokenAmountFormatted": [
                441
            ],
            "issuanceTokenAmountRaw": [
                441
            ],
            "lastUpdatedAt": [
                441
            ],
            "stakingManager_id": [
                441
            ],
            "status": [
                441
            ],
            "strategy_id": [
                441
            ],
            "totalFeePaidFormatted": [
                441
            ],
            "totalFeePaidRaw": [
                441
            ],
            "totalYieldHarvestedFormatted": [
                441
            ],
            "totalYieldHarvestedRaw": [
                441
            ],
            "transactionHash": [
                441
            ],
            "user_id": [
                441
            ],
            "__typename": [
                366
            ]
        },
        "StakePosition_select_column": {},
        "StakePosition_stddev_order_by": {
            "collateralDeployedRaw": [
                441
            ],
            "createdAt": [
                441
            ],
            "floorPriceAtStakeRaw": [
                441
            ],
            "issuanceTokenAmountRaw": [
                441
            ],
            "lastUpdatedAt": [
                441
            ],
            "totalFeePaidRaw": [
                441
            ],
            "totalYieldHarvestedRaw": [
                441
            ],
            "__typename": [
                366
            ]
        },
        "StakePosition_stddev_pop_order_by": {
            "collateralDeployedRaw": [
                441
            ],
            "createdAt": [
                441
            ],
            "floorPriceAtStakeRaw": [
                441
            ],
            "issuanceTokenAmountRaw": [
                441
            ],
            "lastUpdatedAt": [
                441
            ],
            "totalFeePaidRaw": [
                441
            ],
            "totalYieldHarvestedRaw": [
                441
            ],
            "__typename": [
                366
            ]
        },
        "StakePosition_stddev_samp_order_by": {
            "collateralDeployedRaw": [
                441
            ],
            "createdAt": [
                441
            ],
            "floorPriceAtStakeRaw": [
                441
            ],
            "issuanceTokenAmountRaw": [
                441
            ],
            "lastUpdatedAt": [
                441
            ],
            "totalFeePaidRaw": [
                441
            ],
            "totalYieldHarvestedRaw": [
                441
            ],
            "__typename": [
                366
            ]
        },
        "StakePosition_stream_cursor_input": {
            "initial_value": [
                321
            ],
            "ordering": [
                429
            ],
            "__typename": [
                366
            ]
        },
        "StakePosition_stream_cursor_value_input": {
            "collateralDeployedFormatted": [
                366
            ],
            "collateralDeployedRaw": [
                439
            ],
            "createdAt": [
                439
            ],
            "floorPriceAtStakeFormatted": [
                366
            ],
            "floorPriceAtStakeRaw": [
                439
            ],
            "id": [
                366
            ],
            "issuanceTokenAmountFormatted": [
                366
            ],
            "issuanceTokenAmountRaw": [
                439
            ],
            "lastUpdatedAt": [
                439
            ],
            "stakingManager_id": [
                366
            ],
            "status": [
                452
            ],
            "strategy_id": [
                366
            ],
            "totalFeePaidFormatted": [
                366
            ],
            "totalFeePaidRaw": [
                439
            ],
            "totalYieldHarvestedFormatted": [
                366
            ],
            "totalYieldHarvestedRaw": [
                439
            ],
            "transactionHash": [
                366
            ],
            "user_id": [
                366
            ],
            "__typename": [
                366
            ]
        },
        "StakePosition_sum_order_by": {
            "collateralDeployedRaw": [
                441
            ],
            "createdAt": [
                441
            ],
            "floorPriceAtStakeRaw": [
                441
            ],
            "issuanceTokenAmountRaw": [
                441
            ],
            "lastUpdatedAt": [
                441
            ],
            "totalFeePaidRaw": [
                441
            ],
            "totalYieldHarvestedRaw": [
                441
            ],
            "__typename": [
                366
            ]
        },
        "StakePosition_var_pop_order_by": {
            "collateralDeployedRaw": [
                441
            ],
            "createdAt": [
                441
            ],
            "floorPriceAtStakeRaw": [
                441
            ],
            "issuanceTokenAmountRaw": [
                441
            ],
            "lastUpdatedAt": [
                441
            ],
            "totalFeePaidRaw": [
                441
            ],
            "totalYieldHarvestedRaw": [
                441
            ],
            "__typename": [
                366
            ]
        },
        "StakePosition_var_samp_order_by": {
            "collateralDeployedRaw": [
                441
            ],
            "createdAt": [
                441
            ],
            "floorPriceAtStakeRaw": [
                441
            ],
            "issuanceTokenAmountRaw": [
                441
            ],
            "lastUpdatedAt": [
                441
            ],
            "totalFeePaidRaw": [
                441
            ],
            "totalYieldHarvestedRaw": [
                441
            ],
            "__typename": [
                366
            ]
        },
        "StakePosition_variance_order_by": {
            "collateralDeployedRaw": [
                441
            ],
            "createdAt": [
                441
            ],
            "floorPriceAtStakeRaw": [
                441
            ],
            "issuanceTokenAmountRaw": [
                441
            ],
            "lastUpdatedAt": [
                441
            ],
            "totalFeePaidRaw": [
                441
            ],
            "totalYieldHarvestedRaw": [
                441
            ],
            "__typename": [
                366
            ]
        },
        "StakingActivity": {
            "activityType": [
                454
            ],
            "collateralAmountFormatted": [
                366
            ],
            "collateralAmountRaw": [
                439
            ],
            "feeAmountFormatted": [
                366
            ],
            "feeAmountRaw": [
                439
            ],
            "id": [
                366
            ],
            "issuanceTokenAmountFormatted": [
                366
            ],
            "issuanceTokenAmountRaw": [
                439
            ],
            "position_id": [
                366
            ],
            "receiver": [
                366
            ],
            "stakingManager_id": [
                366
            ],
            "timestamp": [
                439
            ],
            "transactionHash": [
                366
            ],
            "user_id": [
                366
            ],
            "yieldAmountFormatted": [
                366
            ],
            "yieldAmountRaw": [
                439
            ],
            "__typename": [
                366
            ]
        },
        "StakingActivity_aggregate_order_by": {
            "avg": [
                328
            ],
            "count": [
                441
            ],
            "max": [
                330
            ],
            "min": [
                331
            ],
            "stddev": [
                334
            ],
            "stddev_pop": [
                335
            ],
            "stddev_samp": [
                336
            ],
            "sum": [
                339
            ],
            "var_pop": [
                340
            ],
            "var_samp": [
                341
            ],
            "variance": [
                342
            ],
            "__typename": [
                366
            ]
        },
        "StakingActivity_avg_order_by": {
            "collateralAmountRaw": [
                441
            ],
            "feeAmountRaw": [
                441
            ],
            "issuanceTokenAmountRaw": [
                441
            ],
            "timestamp": [
                441
            ],
            "yieldAmountRaw": [
                441
            ],
            "__typename": [
                366
            ]
        },
        "StakingActivity_bool_exp": {
            "_and": [
                329
            ],
            "_not": [
                329
            ],
            "_or": [
                329
            ],
            "activityType": [
                455
            ],
            "collateralAmountFormatted": [
                368
            ],
            "collateralAmountRaw": [
                440
            ],
            "feeAmountFormatted": [
                368
            ],
            "feeAmountRaw": [
                440
            ],
            "id": [
                368
            ],
            "issuanceTokenAmountFormatted": [
                368
            ],
            "issuanceTokenAmountRaw": [
                440
            ],
            "position_id": [
                368
            ],
            "receiver": [
                368
            ],
            "stakingManager_id": [
                368
            ],
            "timestamp": [
                440
            ],
            "transactionHash": [
                368
            ],
            "user_id": [
                368
            ],
            "yieldAmountFormatted": [
                368
            ],
            "yieldAmountRaw": [
                440
            ],
            "__typename": [
                366
            ]
        },
        "StakingActivity_max_order_by": {
            "activityType": [
                441
            ],
            "collateralAmountFormatted": [
                441
            ],
            "collateralAmountRaw": [
                441
            ],
            "feeAmountFormatted": [
                441
            ],
            "feeAmountRaw": [
                441
            ],
            "id": [
                441
            ],
            "issuanceTokenAmountFormatted": [
                441
            ],
            "issuanceTokenAmountRaw": [
                441
            ],
            "position_id": [
                441
            ],
            "receiver": [
                441
            ],
            "stakingManager_id": [
                441
            ],
            "timestamp": [
                441
            ],
            "transactionHash": [
                441
            ],
            "user_id": [
                441
            ],
            "yieldAmountFormatted": [
                441
            ],
            "yieldAmountRaw": [
                441
            ],
            "__typename": [
                366
            ]
        },
        "StakingActivity_min_order_by": {
            "activityType": [
                441
            ],
            "collateralAmountFormatted": [
                441
            ],
            "collateralAmountRaw": [
                441
            ],
            "feeAmountFormatted": [
                441
            ],
            "feeAmountRaw": [
                441
            ],
            "id": [
                441
            ],
            "issuanceTokenAmountFormatted": [
                441
            ],
            "issuanceTokenAmountRaw": [
                441
            ],
            "position_id": [
                441
            ],
            "receiver": [
                441
            ],
            "stakingManager_id": [
                441
            ],
            "timestamp": [
                441
            ],
            "transactionHash": [
                441
            ],
            "user_id": [
                441
            ],
            "yieldAmountFormatted": [
                441
            ],
            "yieldAmountRaw": [
                441
            ],
            "__typename": [
                366
            ]
        },
        "StakingActivity_order_by": {
            "activityType": [
                441
            ],
            "collateralAmountFormatted": [
                441
            ],
            "collateralAmountRaw": [
                441
            ],
            "feeAmountFormatted": [
                441
            ],
            "feeAmountRaw": [
                441
            ],
            "id": [
                441
            ],
            "issuanceTokenAmountFormatted": [
                441
            ],
            "issuanceTokenAmountRaw": [
                441
            ],
            "position_id": [
                441
            ],
            "receiver": [
                441
            ],
            "stakingManager_id": [
                441
            ],
            "timestamp": [
                441
            ],
            "transactionHash": [
                441
            ],
            "user_id": [
                441
            ],
            "yieldAmountFormatted": [
                441
            ],
            "yieldAmountRaw": [
                441
            ],
            "__typename": [
                366
            ]
        },
        "StakingActivity_select_column": {},
        "StakingActivity_stddev_order_by": {
            "collateralAmountRaw": [
                441
            ],
            "feeAmountRaw": [
                441
            ],
            "issuanceTokenAmountRaw": [
                441
            ],
            "timestamp": [
                441
            ],
            "yieldAmountRaw": [
                441
            ],
            "__typename": [
                366
            ]
        },
        "StakingActivity_stddev_pop_order_by": {
            "collateralAmountRaw": [
                441
            ],
            "feeAmountRaw": [
                441
            ],
            "issuanceTokenAmountRaw": [
                441
            ],
            "timestamp": [
                441
            ],
            "yieldAmountRaw": [
                441
            ],
            "__typename": [
                366
            ]
        },
        "StakingActivity_stddev_samp_order_by": {
            "collateralAmountRaw": [
                441
            ],
            "feeAmountRaw": [
                441
            ],
            "issuanceTokenAmountRaw": [
                441
            ],
            "timestamp": [
                441
            ],
            "yieldAmountRaw": [
                441
            ],
            "__typename": [
                366
            ]
        },
        "StakingActivity_stream_cursor_input": {
            "initial_value": [
                338
            ],
            "ordering": [
                429
            ],
            "__typename": [
                366
            ]
        },
        "StakingActivity_stream_cursor_value_input": {
            "activityType": [
                454
            ],
            "collateralAmountFormatted": [
                366
            ],
            "collateralAmountRaw": [
                439
            ],
            "feeAmountFormatted": [
                366
            ],
            "feeAmountRaw": [
                439
            ],
            "id": [
                366
            ],
            "issuanceTokenAmountFormatted": [
                366
            ],
            "issuanceTokenAmountRaw": [
                439
            ],
            "position_id": [
                366
            ],
            "receiver": [
                366
            ],
            "stakingManager_id": [
                366
            ],
            "timestamp": [
                439
            ],
            "transactionHash": [
                366
            ],
            "user_id": [
                366
            ],
            "yieldAmountFormatted": [
                366
            ],
            "yieldAmountRaw": [
                439
            ],
            "__typename": [
                366
            ]
        },
        "StakingActivity_sum_order_by": {
            "collateralAmountRaw": [
                441
            ],
            "feeAmountRaw": [
                441
            ],
            "issuanceTokenAmountRaw": [
                441
            ],
            "timestamp": [
                441
            ],
            "yieldAmountRaw": [
                441
            ],
            "__typename": [
                366
            ]
        },
        "StakingActivity_var_pop_order_by": {
            "collateralAmountRaw": [
                441
            ],
            "feeAmountRaw": [
                441
            ],
            "issuanceTokenAmountRaw": [
                441
            ],
            "timestamp": [
                441
            ],
            "yieldAmountRaw": [
                441
            ],
            "__typename": [
                366
            ]
        },
        "StakingActivity_var_samp_order_by": {
            "collateralAmountRaw": [
                441
            ],
            "feeAmountRaw": [
                441
            ],
            "issuanceTokenAmountRaw": [
                441
            ],
            "timestamp": [
                441
            ],
            "yieldAmountRaw": [
                441
            ],
            "__typename": [
                366
            ]
        },
        "StakingActivity_variance_order_by": {
            "collateralAmountRaw": [
                441
            ],
            "feeAmountRaw": [
                441
            ],
            "issuanceTokenAmountRaw": [
                441
            ],
            "timestamp": [
                441
            ],
            "yieldAmountRaw": [
                441
            ],
            "__typename": [
                366
            ]
        },
        "StakingManager": {
            "createdAt": [
                439
            ],
            "id": [
                366
            ],
            "lastUpdatedAt": [
                439
            ],
            "market_id": [
                366
            ],
            "performanceFeeBps": [
                439
            ],
            "positions": [
                309,
                {
                    "distinct_on": [
                        316,
                        "[StakePosition_select_column!]"
                    ],
                    "limit": [
                        135
                    ],
                    "offset": [
                        135
                    ],
                    "order_by": [
                        315,
                        "[StakePosition_order_by!]"
                    ],
                    "where": [
                        312
                    ]
                }
            ],
            "strategies": [
                349,
                {
                    "distinct_on": [
                        356,
                        "[Strategy_select_column!]"
                    ],
                    "limit": [
                        135
                    ],
                    "offset": [
                        135
                    ],
                    "order_by": [
                        355,
                        "[Strategy_order_by!]"
                    ],
                    "where": [
                        352
                    ]
                }
            ],
            "totalCollateralDeployedFormatted": [
                366
            ],
            "totalCollateralDeployedRaw": [
                439
            ],
            "totalFeesCapturedFormatted": [
                366
            ],
            "totalFeesCapturedRaw": [
                439
            ],
            "totalStakedIssuanceFormatted": [
                366
            ],
            "totalStakedIssuanceRaw": [
                439
            ],
            "totalYieldHarvestedFormatted": [
                366
            ],
            "totalYieldHarvestedRaw": [
                439
            ],
            "__typename": [
                366
            ]
        },
        "StakingManager_bool_exp": {
            "_and": [
                344
            ],
            "_not": [
                344
            ],
            "_or": [
                344
            ],
            "createdAt": [
                440
            ],
            "id": [
                368
            ],
            "lastUpdatedAt": [
                440
            ],
            "market_id": [
                368
            ],
            "performanceFeeBps": [
                440
            ],
            "positions": [
                312
            ],
            "strategies": [
                352
            ],
            "totalCollateralDeployedFormatted": [
                368
            ],
            "totalCollateralDeployedRaw": [
                440
            ],
            "totalFeesCapturedFormatted": [
                368
            ],
            "totalFeesCapturedRaw": [
                440
            ],
            "totalStakedIssuanceFormatted": [
                368
            ],
            "totalStakedIssuanceRaw": [
                440
            ],
            "totalYieldHarvestedFormatted": [
                368
            ],
            "totalYieldHarvestedRaw": [
                440
            ],
            "__typename": [
                366
            ]
        },
        "StakingManager_order_by": {
            "createdAt": [
                441
            ],
            "id": [
                441
            ],
            "lastUpdatedAt": [
                441
            ],
            "market_id": [
                441
            ],
            "performanceFeeBps": [
                441
            ],
            "positions_aggregate": [
                310
            ],
            "strategies_aggregate": [
                350
            ],
            "totalCollateralDeployedFormatted": [
                441
            ],
            "totalCollateralDeployedRaw": [
                441
            ],
            "totalFeesCapturedFormatted": [
                441
            ],
            "totalFeesCapturedRaw": [
                441
            ],
            "totalStakedIssuanceFormatted": [
                441
            ],
            "totalStakedIssuanceRaw": [
                441
            ],
            "totalYieldHarvestedFormatted": [
                441
            ],
            "totalYieldHarvestedRaw": [
                441
            ],
            "__typename": [
                366
            ]
        },
        "StakingManager_select_column": {},
        "StakingManager_stream_cursor_input": {
            "initial_value": [
                348
            ],
            "ordering": [
                429
            ],
            "__typename": [
                366
            ]
        },
        "StakingManager_stream_cursor_value_input": {
            "createdAt": [
                439
            ],
            "id": [
                366
            ],
            "lastUpdatedAt": [
                439
            ],
            "market_id": [
                366
            ],
            "performanceFeeBps": [
                439
            ],
            "totalCollateralDeployedFormatted": [
                366
            ],
            "totalCollateralDeployedRaw": [
                439
            ],
            "totalFeesCapturedFormatted": [
                366
            ],
            "totalFeesCapturedRaw": [
                439
            ],
            "totalStakedIssuanceFormatted": [
                366
            ],
            "totalStakedIssuanceRaw": [
                439
            ],
            "totalYieldHarvestedFormatted": [
                366
            ],
            "totalYieldHarvestedRaw": [
                439
            ],
            "__typename": [
                366
            ]
        },
        "Strategy": {
            "addedAt": [
                439
            ],
            "collateralToken": [
                369
            ],
            "collateralToken_id": [
                366
            ],
            "id": [
                366
            ],
            "isActive": [
                12
            ],
            "name": [
                366
            ],
            "positions": [
                309,
                {
                    "distinct_on": [
                        316,
                        "[StakePosition_select_column!]"
                    ],
                    "limit": [
                        135
                    ],
                    "offset": [
                        135
                    ],
                    "order_by": [
                        315,
                        "[StakePosition_order_by!]"
                    ],
                    "where": [
                        312
                    ]
                }
            ],
            "removedAt": [
                439
            ],
            "stakingManager_id": [
                366
            ],
            "symbol": [
                366
            ],
            "transactionHash": [
                366
            ],
            "__typename": [
                366
            ]
        },
        "Strategy_aggregate_order_by": {
            "avg": [
                351
            ],
            "count": [
                441
            ],
            "max": [
                353
            ],
            "min": [
                354
            ],
            "stddev": [
                357
            ],
            "stddev_pop": [
                358
            ],
            "stddev_samp": [
                359
            ],
            "sum": [
                362
            ],
            "var_pop": [
                363
            ],
            "var_samp": [
                364
            ],
            "variance": [
                365
            ],
            "__typename": [
                366
            ]
        },
        "Strategy_avg_order_by": {
            "addedAt": [
                441
            ],
            "removedAt": [
                441
            ],
            "__typename": [
                366
            ]
        },
        "Strategy_bool_exp": {
            "_and": [
                352
            ],
            "_not": [
                352
            ],
            "_or": [
                352
            ],
            "addedAt": [
                440
            ],
            "collateralToken": [
                370
            ],
            "collateralToken_id": [
                368
            ],
            "id": [
                368
            ],
            "isActive": [
                13
            ],
            "name": [
                368
            ],
            "positions": [
                312
            ],
            "removedAt": [
                440
            ],
            "stakingManager_id": [
                368
            ],
            "symbol": [
                368
            ],
            "transactionHash": [
                368
            ],
            "__typename": [
                366
            ]
        },
        "Strategy_max_order_by": {
            "addedAt": [
                441
            ],
            "collateralToken_id": [
                441
            ],
            "id": [
                441
            ],
            "name": [
                441
            ],
            "removedAt": [
                441
            ],
            "stakingManager_id": [
                441
            ],
            "symbol": [
                441
            ],
            "transactionHash": [
                441
            ],
            "__typename": [
                366
            ]
        },
        "Strategy_min_order_by": {
            "addedAt": [
                441
            ],
            "collateralToken_id": [
                441
            ],
            "id": [
                441
            ],
            "name": [
                441
            ],
            "removedAt": [
                441
            ],
            "stakingManager_id": [
                441
            ],
            "symbol": [
                441
            ],
            "transactionHash": [
                441
            ],
            "__typename": [
                366
            ]
        },
        "Strategy_order_by": {
            "addedAt": [
                441
            ],
            "collateralToken": [
                371
            ],
            "collateralToken_id": [
                441
            ],
            "id": [
                441
            ],
            "isActive": [
                441
            ],
            "name": [
                441
            ],
            "positions_aggregate": [
                310
            ],
            "removedAt": [
                441
            ],
            "stakingManager_id": [
                441
            ],
            "symbol": [
                441
            ],
            "transactionHash": [
                441
            ],
            "__typename": [
                366
            ]
        },
        "Strategy_select_column": {},
        "Strategy_stddev_order_by": {
            "addedAt": [
                441
            ],
            "removedAt": [
                441
            ],
            "__typename": [
                366
            ]
        },
        "Strategy_stddev_pop_order_by": {
            "addedAt": [
                441
            ],
            "removedAt": [
                441
            ],
            "__typename": [
                366
            ]
        },
        "Strategy_stddev_samp_order_by": {
            "addedAt": [
                441
            ],
            "removedAt": [
                441
            ],
            "__typename": [
                366
            ]
        },
        "Strategy_stream_cursor_input": {
            "initial_value": [
                361
            ],
            "ordering": [
                429
            ],
            "__typename": [
                366
            ]
        },
        "Strategy_stream_cursor_value_input": {
            "addedAt": [
                439
            ],
            "collateralToken_id": [
                366
            ],
            "id": [
                366
            ],
            "isActive": [
                12
            ],
            "name": [
                366
            ],
            "removedAt": [
                439
            ],
            "stakingManager_id": [
                366
            ],
            "symbol": [
                366
            ],
            "transactionHash": [
                366
            ],
            "__typename": [
                366
            ]
        },
        "Strategy_sum_order_by": {
            "addedAt": [
                441
            ],
            "removedAt": [
                441
            ],
            "__typename": [
                366
            ]
        },
        "Strategy_var_pop_order_by": {
            "addedAt": [
                441
            ],
            "removedAt": [
                441
            ],
            "__typename": [
                366
            ]
        },
        "Strategy_var_samp_order_by": {
            "addedAt": [
                441
            ],
            "removedAt": [
                441
            ],
            "__typename": [
                366
            ]
        },
        "Strategy_variance_order_by": {
            "addedAt": [
                441
            ],
            "removedAt": [
                441
            ],
            "__typename": [
                366
            ]
        },
        "String": {},
        "String_array_comparison_exp": {
            "_contained_in": [
                366
            ],
            "_contains": [
                366
            ],
            "_eq": [
                366
            ],
            "_gt": [
                366
            ],
            "_gte": [
                366
            ],
            "_in": [
                366
            ],
            "_is_null": [
                12
            ],
            "_lt": [
                366
            ],
            "_lte": [
                366
            ],
            "_neq": [
                366
            ],
            "_nin": [
                366
            ],
            "__typename": [
                366
            ]
        },
        "String_comparison_exp": {
            "_eq": [
                366
            ],
            "_gt": [
                366
            ],
            "_gte": [
                366
            ],
            "_ilike": [
                366
            ],
            "_in": [
                366
            ],
            "_iregex": [
                366
            ],
            "_is_null": [
                12
            ],
            "_like": [
                366
            ],
            "_lt": [
                366
            ],
            "_lte": [
                366
            ],
            "_neq": [
                366
            ],
            "_nilike": [
                366
            ],
            "_nin": [
                366
            ],
            "_niregex": [
                366
            ],
            "_nlike": [
                366
            ],
            "_nregex": [
                366
            ],
            "_nsimilar": [
                366
            ],
            "_regex": [
                366
            ],
            "_similar": [
                366
            ],
            "__typename": [
                366
            ]
        },
        "Token": {
            "contractURI": [
                366
            ],
            "decimals": [
                135
            ],
            "id": [
                366
            ],
            "maxSupplyFormatted": [
                366
            ],
            "maxSupplyRaw": [
                439
            ],
            "name": [
                366
            ],
            "symbol": [
                366
            ],
            "__typename": [
                366
            ]
        },
        "Token_bool_exp": {
            "_and": [
                370
            ],
            "_not": [
                370
            ],
            "_or": [
                370
            ],
            "contractURI": [
                368
            ],
            "decimals": [
                136
            ],
            "id": [
                368
            ],
            "maxSupplyFormatted": [
                368
            ],
            "maxSupplyRaw": [
                440
            ],
            "name": [
                368
            ],
            "symbol": [
                368
            ],
            "__typename": [
                366
            ]
        },
        "Token_order_by": {
            "contractURI": [
                441
            ],
            "decimals": [
                441
            ],
            "id": [
                441
            ],
            "maxSupplyFormatted": [
                441
            ],
            "maxSupplyRaw": [
                441
            ],
            "name": [
                441
            ],
            "symbol": [
                441
            ],
            "__typename": [
                366
            ]
        },
        "Token_select_column": {},
        "Token_stream_cursor_input": {
            "initial_value": [
                374
            ],
            "ordering": [
                429
            ],
            "__typename": [
                366
            ]
        },
        "Token_stream_cursor_value_input": {
            "contractURI": [
                366
            ],
            "decimals": [
                135
            ],
            "id": [
                366
            ],
            "maxSupplyFormatted": [
                366
            ],
            "maxSupplyRaw": [
                439
            ],
            "name": [
                366
            ],
            "symbol": [
                366
            ],
            "__typename": [
                366
            ]
        },
        "Trade": {
            "feeFormatted": [
                366
            ],
            "feeRaw": [
                439
            ],
            "id": [
                366
            ],
            "market_id": [
                366
            ],
            "newPriceFormatted": [
                366
            ],
            "newPriceRaw": [
                439
            ],
            "reserveAmountFormatted": [
                366
            ],
            "reserveAmountRaw": [
                439
            ],
            "timestamp": [
                439
            ],
            "tokenAmountFormatted": [
                366
            ],
            "tokenAmountRaw": [
                439
            ],
            "tradeType": [
                458
            ],
            "transactionHash": [
                366
            ],
            "user_id": [
                366
            ],
            "__typename": [
                366
            ]
        },
        "Trade_aggregate_order_by": {
            "avg": [
                377
            ],
            "count": [
                441
            ],
            "max": [
                379
            ],
            "min": [
                380
            ],
            "stddev": [
                383
            ],
            "stddev_pop": [
                384
            ],
            "stddev_samp": [
                385
            ],
            "sum": [
                388
            ],
            "var_pop": [
                389
            ],
            "var_samp": [
                390
            ],
            "variance": [
                391
            ],
            "__typename": [
                366
            ]
        },
        "Trade_avg_order_by": {
            "feeRaw": [
                441
            ],
            "newPriceRaw": [
                441
            ],
            "reserveAmountRaw": [
                441
            ],
            "timestamp": [
                441
            ],
            "tokenAmountRaw": [
                441
            ],
            "__typename": [
                366
            ]
        },
        "Trade_bool_exp": {
            "_and": [
                378
            ],
            "_not": [
                378
            ],
            "_or": [
                378
            ],
            "feeFormatted": [
                368
            ],
            "feeRaw": [
                440
            ],
            "id": [
                368
            ],
            "market_id": [
                368
            ],
            "newPriceFormatted": [
                368
            ],
            "newPriceRaw": [
                440
            ],
            "reserveAmountFormatted": [
                368
            ],
            "reserveAmountRaw": [
                440
            ],
            "timestamp": [
                440
            ],
            "tokenAmountFormatted": [
                368
            ],
            "tokenAmountRaw": [
                440
            ],
            "tradeType": [
                459
            ],
            "transactionHash": [
                368
            ],
            "user_id": [
                368
            ],
            "__typename": [
                366
            ]
        },
        "Trade_max_order_by": {
            "feeFormatted": [
                441
            ],
            "feeRaw": [
                441
            ],
            "id": [
                441
            ],
            "market_id": [
                441
            ],
            "newPriceFormatted": [
                441
            ],
            "newPriceRaw": [
                441
            ],
            "reserveAmountFormatted": [
                441
            ],
            "reserveAmountRaw": [
                441
            ],
            "timestamp": [
                441
            ],
            "tokenAmountFormatted": [
                441
            ],
            "tokenAmountRaw": [
                441
            ],
            "tradeType": [
                441
            ],
            "transactionHash": [
                441
            ],
            "user_id": [
                441
            ],
            "__typename": [
                366
            ]
        },
        "Trade_min_order_by": {
            "feeFormatted": [
                441
            ],
            "feeRaw": [
                441
            ],
            "id": [
                441
            ],
            "market_id": [
                441
            ],
            "newPriceFormatted": [
                441
            ],
            "newPriceRaw": [
                441
            ],
            "reserveAmountFormatted": [
                441
            ],
            "reserveAmountRaw": [
                441
            ],
            "timestamp": [
                441
            ],
            "tokenAmountFormatted": [
                441
            ],
            "tokenAmountRaw": [
                441
            ],
            "tradeType": [
                441
            ],
            "transactionHash": [
                441
            ],
            "user_id": [
                441
            ],
            "__typename": [
                366
            ]
        },
        "Trade_order_by": {
            "feeFormatted": [
                441
            ],
            "feeRaw": [
                441
            ],
            "id": [
                441
            ],
            "market_id": [
                441
            ],
            "newPriceFormatted": [
                441
            ],
            "newPriceRaw": [
                441
            ],
            "reserveAmountFormatted": [
                441
            ],
            "reserveAmountRaw": [
                441
            ],
            "timestamp": [
                441
            ],
            "tokenAmountFormatted": [
                441
            ],
            "tokenAmountRaw": [
                441
            ],
            "tradeType": [
                441
            ],
            "transactionHash": [
                441
            ],
            "user_id": [
                441
            ],
            "__typename": [
                366
            ]
        },
        "Trade_select_column": {},
        "Trade_stddev_order_by": {
            "feeRaw": [
                441
            ],
            "newPriceRaw": [
                441
            ],
            "reserveAmountRaw": [
                441
            ],
            "timestamp": [
                441
            ],
            "tokenAmountRaw": [
                441
            ],
            "__typename": [
                366
            ]
        },
        "Trade_stddev_pop_order_by": {
            "feeRaw": [
                441
            ],
            "newPriceRaw": [
                441
            ],
            "reserveAmountRaw": [
                441
            ],
            "timestamp": [
                441
            ],
            "tokenAmountRaw": [
                441
            ],
            "__typename": [
                366
            ]
        },
        "Trade_stddev_samp_order_by": {
            "feeRaw": [
                441
            ],
            "newPriceRaw": [
                441
            ],
            "reserveAmountRaw": [
                441
            ],
            "timestamp": [
                441
            ],
            "tokenAmountRaw": [
                441
            ],
            "__typename": [
                366
            ]
        },
        "Trade_stream_cursor_input": {
            "initial_value": [
                387
            ],
            "ordering": [
                429
            ],
            "__typename": [
                366
            ]
        },
        "Trade_stream_cursor_value_input": {
            "feeFormatted": [
                366
            ],
            "feeRaw": [
                439
            ],
            "id": [
                366
            ],
            "market_id": [
                366
            ],
            "newPriceFormatted": [
                366
            ],
            "newPriceRaw": [
                439
            ],
            "reserveAmountFormatted": [
                366
            ],
            "reserveAmountRaw": [
                439
            ],
            "timestamp": [
                439
            ],
            "tokenAmountFormatted": [
                366
            ],
            "tokenAmountRaw": [
                439
            ],
            "tradeType": [
                458
            ],
            "transactionHash": [
                366
            ],
            "user_id": [
                366
            ],
            "__typename": [
                366
            ]
        },
        "Trade_sum_order_by": {
            "feeRaw": [
                441
            ],
            "newPriceRaw": [
                441
            ],
            "reserveAmountRaw": [
                441
            ],
            "timestamp": [
                441
            ],
            "tokenAmountRaw": [
                441
            ],
            "__typename": [
                366
            ]
        },
        "Trade_var_pop_order_by": {
            "feeRaw": [
                441
            ],
            "newPriceRaw": [
                441
            ],
            "reserveAmountRaw": [
                441
            ],
            "timestamp": [
                441
            ],
            "tokenAmountRaw": [
                441
            ],
            "__typename": [
                366
            ]
        },
        "Trade_var_samp_order_by": {
            "feeRaw": [
                441
            ],
            "newPriceRaw": [
                441
            ],
            "reserveAmountRaw": [
                441
            ],
            "timestamp": [
                441
            ],
            "tokenAmountRaw": [
                441
            ],
            "__typename": [
                366
            ]
        },
        "Trade_variance_order_by": {
            "feeRaw": [
                441
            ],
            "newPriceRaw": [
                441
            ],
            "reserveAmountRaw": [
                441
            ],
            "timestamp": [
                441
            ],
            "tokenAmountRaw": [
                441
            ],
            "__typename": [
                366
            ]
        },
        "Treasury": {
            "createdAt": [
                439
            ],
            "feeSplitterPayments": [
                43,
                {
                    "distinct_on": [
                        50,
                        "[FeeSplitterPayment_select_column!]"
                    ],
                    "limit": [
                        135
                    ],
                    "offset": [
                        135
                    ],
                    "order_by": [
                        49,
                        "[FeeSplitterPayment_order_by!]"
                    ],
                    "where": [
                        46
                    ]
                }
            ],
            "feeSplitterReceipts": [
                60,
                {
                    "distinct_on": [
                        67,
                        "[FeeSplitterReceipt_select_column!]"
                    ],
                    "limit": [
                        135
                    ],
                    "offset": [
                        135
                    ],
                    "order_by": [
                        66,
                        "[FeeSplitterReceipt_order_by!]"
                    ],
                    "where": [
                        63
                    ]
                }
            ],
            "floorRaiseShares": [
                439
            ],
            "floorRaiseTreasury_id": [
                366
            ],
            "id": [
                366
            ],
            "lastUpdatedAt": [
                439
            ],
            "market_id": [
                366
            ],
            "totalFeesDistributedFormatted": [
                366
            ],
            "totalFeesDistributedRaw": [
                439
            ],
            "totalFeesReceivedFormatted": [
                366
            ],
            "totalFeesReceivedRaw": [
                439
            ],
            "treasuryAddress": [
                366
            ],
            "__typename": [
                366
            ]
        },
        "Treasury_bool_exp": {
            "_and": [
                393
            ],
            "_not": [
                393
            ],
            "_or": [
                393
            ],
            "createdAt": [
                440
            ],
            "feeSplitterPayments": [
                46
            ],
            "feeSplitterReceipts": [
                63
            ],
            "floorRaiseShares": [
                440
            ],
            "floorRaiseTreasury_id": [
                368
            ],
            "id": [
                368
            ],
            "lastUpdatedAt": [
                440
            ],
            "market_id": [
                368
            ],
            "totalFeesDistributedFormatted": [
                368
            ],
            "totalFeesDistributedRaw": [
                440
            ],
            "totalFeesReceivedFormatted": [
                368
            ],
            "totalFeesReceivedRaw": [
                440
            ],
            "treasuryAddress": [
                368
            ],
            "__typename": [
                366
            ]
        },
        "Treasury_order_by": {
            "createdAt": [
                441
            ],
            "feeSplitterPayments_aggregate": [
                44
            ],
            "feeSplitterReceipts_aggregate": [
                61
            ],
            "floorRaiseShares": [
                441
            ],
            "floorRaiseTreasury_id": [
                441
            ],
            "id": [
                441
            ],
            "lastUpdatedAt": [
                441
            ],
            "market_id": [
                441
            ],
            "totalFeesDistributedFormatted": [
                441
            ],
            "totalFeesDistributedRaw": [
                441
            ],
            "totalFeesReceivedFormatted": [
                441
            ],
            "totalFeesReceivedRaw": [
                441
            ],
            "treasuryAddress": [
                441
            ],
            "__typename": [
                366
            ]
        },
        "Treasury_select_column": {},
        "Treasury_stream_cursor_input": {
            "initial_value": [
                397
            ],
            "ordering": [
                429
            ],
            "__typename": [
                366
            ]
        },
        "Treasury_stream_cursor_value_input": {
            "createdAt": [
                439
            ],
            "floorRaiseShares": [
                439
            ],
            "floorRaiseTreasury_id": [
                366
            ],
            "id": [
                366
            ],
            "lastUpdatedAt": [
                439
            ],
            "market_id": [
                366
            ],
            "totalFeesDistributedFormatted": [
                366
            ],
            "totalFeesDistributedRaw": [
                439
            ],
            "totalFeesReceivedFormatted": [
                366
            ],
            "totalFeesReceivedRaw": [
                439
            ],
            "treasuryAddress": [
                366
            ],
            "__typename": [
                366
            ]
        },
        "UserMarketPosition": {
            "claimableRewardsFormatted": [
                366
            ],
            "claimableRewardsRaw": [
                439
            ],
            "id": [
                366
            ],
            "lastUpdatedAt": [
                439
            ],
            "lockedCollateralFormatted": [
                366
            ],
            "lockedCollateralRaw": [
                439
            ],
            "market_id": [
                366
            ],
            "netFTokenChangeFormatted": [
                366
            ],
            "netFTokenChangeRaw": [
                439
            ],
            "presaleDepositFormatted": [
                366
            ],
            "presaleDepositRaw": [
                439
            ],
            "presaleLeverage": [
                439
            ],
            "stakedAmountFormatted": [
                366
            ],
            "stakedAmountRaw": [
                439
            ],
            "totalDebtFormatted": [
                366
            ],
            "totalDebtRaw": [
                439
            ],
            "user_id": [
                366
            ],
            "__typename": [
                366
            ]
        },
        "UserMarketPosition_aggregate_order_by": {
            "avg": [
                400
            ],
            "count": [
                441
            ],
            "max": [
                402
            ],
            "min": [
                403
            ],
            "stddev": [
                406
            ],
            "stddev_pop": [
                407
            ],
            "stddev_samp": [
                408
            ],
            "sum": [
                411
            ],
            "var_pop": [
                412
            ],
            "var_samp": [
                413
            ],
            "variance": [
                414
            ],
            "__typename": [
                366
            ]
        },
        "UserMarketPosition_avg_order_by": {
            "claimableRewardsRaw": [
                441
            ],
            "lastUpdatedAt": [
                441
            ],
            "lockedCollateralRaw": [
                441
            ],
            "netFTokenChangeRaw": [
                441
            ],
            "presaleDepositRaw": [
                441
            ],
            "presaleLeverage": [
                441
            ],
            "stakedAmountRaw": [
                441
            ],
            "totalDebtRaw": [
                441
            ],
            "__typename": [
                366
            ]
        },
        "UserMarketPosition_bool_exp": {
            "_and": [
                401
            ],
            "_not": [
                401
            ],
            "_or": [
                401
            ],
            "claimableRewardsFormatted": [
                368
            ],
            "claimableRewardsRaw": [
                440
            ],
            "id": [
                368
            ],
            "lastUpdatedAt": [
                440
            ],
            "lockedCollateralFormatted": [
                368
            ],
            "lockedCollateralRaw": [
                440
            ],
            "market_id": [
                368
            ],
            "netFTokenChangeFormatted": [
                368
            ],
            "netFTokenChangeRaw": [
                440
            ],
            "presaleDepositFormatted": [
                368
            ],
            "presaleDepositRaw": [
                440
            ],
            "presaleLeverage": [
                440
            ],
            "stakedAmountFormatted": [
                368
            ],
            "stakedAmountRaw": [
                440
            ],
            "totalDebtFormatted": [
                368
            ],
            "totalDebtRaw": [
                440
            ],
            "user_id": [
                368
            ],
            "__typename": [
                366
            ]
        },
        "UserMarketPosition_max_order_by": {
            "claimableRewardsFormatted": [
                441
            ],
            "claimableRewardsRaw": [
                441
            ],
            "id": [
                441
            ],
            "lastUpdatedAt": [
                441
            ],
            "lockedCollateralFormatted": [
                441
            ],
            "lockedCollateralRaw": [
                441
            ],
            "market_id": [
                441
            ],
            "netFTokenChangeFormatted": [
                441
            ],
            "netFTokenChangeRaw": [
                441
            ],
            "presaleDepositFormatted": [
                441
            ],
            "presaleDepositRaw": [
                441
            ],
            "presaleLeverage": [
                441
            ],
            "stakedAmountFormatted": [
                441
            ],
            "stakedAmountRaw": [
                441
            ],
            "totalDebtFormatted": [
                441
            ],
            "totalDebtRaw": [
                441
            ],
            "user_id": [
                441
            ],
            "__typename": [
                366
            ]
        },
        "UserMarketPosition_min_order_by": {
            "claimableRewardsFormatted": [
                441
            ],
            "claimableRewardsRaw": [
                441
            ],
            "id": [
                441
            ],
            "lastUpdatedAt": [
                441
            ],
            "lockedCollateralFormatted": [
                441
            ],
            "lockedCollateralRaw": [
                441
            ],
            "market_id": [
                441
            ],
            "netFTokenChangeFormatted": [
                441
            ],
            "netFTokenChangeRaw": [
                441
            ],
            "presaleDepositFormatted": [
                441
            ],
            "presaleDepositRaw": [
                441
            ],
            "presaleLeverage": [
                441
            ],
            "stakedAmountFormatted": [
                441
            ],
            "stakedAmountRaw": [
                441
            ],
            "totalDebtFormatted": [
                441
            ],
            "totalDebtRaw": [
                441
            ],
            "user_id": [
                441
            ],
            "__typename": [
                366
            ]
        },
        "UserMarketPosition_order_by": {
            "claimableRewardsFormatted": [
                441
            ],
            "claimableRewardsRaw": [
                441
            ],
            "id": [
                441
            ],
            "lastUpdatedAt": [
                441
            ],
            "lockedCollateralFormatted": [
                441
            ],
            "lockedCollateralRaw": [
                441
            ],
            "market_id": [
                441
            ],
            "netFTokenChangeFormatted": [
                441
            ],
            "netFTokenChangeRaw": [
                441
            ],
            "presaleDepositFormatted": [
                441
            ],
            "presaleDepositRaw": [
                441
            ],
            "presaleLeverage": [
                441
            ],
            "stakedAmountFormatted": [
                441
            ],
            "stakedAmountRaw": [
                441
            ],
            "totalDebtFormatted": [
                441
            ],
            "totalDebtRaw": [
                441
            ],
            "user_id": [
                441
            ],
            "__typename": [
                366
            ]
        },
        "UserMarketPosition_select_column": {},
        "UserMarketPosition_stddev_order_by": {
            "claimableRewardsRaw": [
                441
            ],
            "lastUpdatedAt": [
                441
            ],
            "lockedCollateralRaw": [
                441
            ],
            "netFTokenChangeRaw": [
                441
            ],
            "presaleDepositRaw": [
                441
            ],
            "presaleLeverage": [
                441
            ],
            "stakedAmountRaw": [
                441
            ],
            "totalDebtRaw": [
                441
            ],
            "__typename": [
                366
            ]
        },
        "UserMarketPosition_stddev_pop_order_by": {
            "claimableRewardsRaw": [
                441
            ],
            "lastUpdatedAt": [
                441
            ],
            "lockedCollateralRaw": [
                441
            ],
            "netFTokenChangeRaw": [
                441
            ],
            "presaleDepositRaw": [
                441
            ],
            "presaleLeverage": [
                441
            ],
            "stakedAmountRaw": [
                441
            ],
            "totalDebtRaw": [
                441
            ],
            "__typename": [
                366
            ]
        },
        "UserMarketPosition_stddev_samp_order_by": {
            "claimableRewardsRaw": [
                441
            ],
            "lastUpdatedAt": [
                441
            ],
            "lockedCollateralRaw": [
                441
            ],
            "netFTokenChangeRaw": [
                441
            ],
            "presaleDepositRaw": [
                441
            ],
            "presaleLeverage": [
                441
            ],
            "stakedAmountRaw": [
                441
            ],
            "totalDebtRaw": [
                441
            ],
            "__typename": [
                366
            ]
        },
        "UserMarketPosition_stream_cursor_input": {
            "initial_value": [
                410
            ],
            "ordering": [
                429
            ],
            "__typename": [
                366
            ]
        },
        "UserMarketPosition_stream_cursor_value_input": {
            "claimableRewardsFormatted": [
                366
            ],
            "claimableRewardsRaw": [
                439
            ],
            "id": [
                366
            ],
            "lastUpdatedAt": [
                439
            ],
            "lockedCollateralFormatted": [
                366
            ],
            "lockedCollateralRaw": [
                439
            ],
            "market_id": [
                366
            ],
            "netFTokenChangeFormatted": [
                366
            ],
            "netFTokenChangeRaw": [
                439
            ],
            "presaleDepositFormatted": [
                366
            ],
            "presaleDepositRaw": [
                439
            ],
            "presaleLeverage": [
                439
            ],
            "stakedAmountFormatted": [
                366
            ],
            "stakedAmountRaw": [
                439
            ],
            "totalDebtFormatted": [
                366
            ],
            "totalDebtRaw": [
                439
            ],
            "user_id": [
                366
            ],
            "__typename": [
                366
            ]
        },
        "UserMarketPosition_sum_order_by": {
            "claimableRewardsRaw": [
                441
            ],
            "lastUpdatedAt": [
                441
            ],
            "lockedCollateralRaw": [
                441
            ],
            "netFTokenChangeRaw": [
                441
            ],
            "presaleDepositRaw": [
                441
            ],
            "presaleLeverage": [
                441
            ],
            "stakedAmountRaw": [
                441
            ],
            "totalDebtRaw": [
                441
            ],
            "__typename": [
                366
            ]
        },
        "UserMarketPosition_var_pop_order_by": {
            "claimableRewardsRaw": [
                441
            ],
            "lastUpdatedAt": [
                441
            ],
            "lockedCollateralRaw": [
                441
            ],
            "netFTokenChangeRaw": [
                441
            ],
            "presaleDepositRaw": [
                441
            ],
            "presaleLeverage": [
                441
            ],
            "stakedAmountRaw": [
                441
            ],
            "totalDebtRaw": [
                441
            ],
            "__typename": [
                366
            ]
        },
        "UserMarketPosition_var_samp_order_by": {
            "claimableRewardsRaw": [
                441
            ],
            "lastUpdatedAt": [
                441
            ],
            "lockedCollateralRaw": [
                441
            ],
            "netFTokenChangeRaw": [
                441
            ],
            "presaleDepositRaw": [
                441
            ],
            "presaleLeverage": [
                441
            ],
            "stakedAmountRaw": [
                441
            ],
            "totalDebtRaw": [
                441
            ],
            "__typename": [
                366
            ]
        },
        "UserMarketPosition_variance_order_by": {
            "claimableRewardsRaw": [
                441
            ],
            "lastUpdatedAt": [
                441
            ],
            "lockedCollateralRaw": [
                441
            ],
            "netFTokenChangeRaw": [
                441
            ],
            "presaleDepositRaw": [
                441
            ],
            "presaleLeverage": [
                441
            ],
            "stakedAmountRaw": [
                441
            ],
            "totalDebtRaw": [
                441
            ],
            "__typename": [
                366
            ]
        },
        "_meta": {
            "bufferBlock": [
                135
            ],
            "chainId": [
                135
            ],
            "endBlock": [
                135
            ],
            "eventsProcessed": [
                135
            ],
            "firstEventBlock": [
                135
            ],
            "isReady": [
                12
            ],
            "progressBlock": [
                135
            ],
            "readyAt": [
                456
            ],
            "sourceBlock": [
                135
            ],
            "startBlock": [
                135
            ],
            "__typename": [
                366
            ]
        },
        "_meta_bool_exp": {
            "_and": [
                416
            ],
            "_not": [
                416
            ],
            "_or": [
                416
            ],
            "bufferBlock": [
                136
            ],
            "chainId": [
                136
            ],
            "endBlock": [
                136
            ],
            "eventsProcessed": [
                136
            ],
            "firstEventBlock": [
                136
            ],
            "isReady": [
                13
            ],
            "progressBlock": [
                136
            ],
            "readyAt": [
                457
            ],
            "sourceBlock": [
                136
            ],
            "startBlock": [
                136
            ],
            "__typename": [
                366
            ]
        },
        "_meta_order_by": {
            "bufferBlock": [
                441
            ],
            "chainId": [
                441
            ],
            "endBlock": [
                441
            ],
            "eventsProcessed": [
                441
            ],
            "firstEventBlock": [
                441
            ],
            "isReady": [
                441
            ],
            "progressBlock": [
                441
            ],
            "readyAt": [
                441
            ],
            "sourceBlock": [
                441
            ],
            "startBlock": [
                441
            ],
            "__typename": [
                366
            ]
        },
        "_meta_select_column": {},
        "_meta_stream_cursor_input": {
            "initial_value": [
                420
            ],
            "ordering": [
                429
            ],
            "__typename": [
                366
            ]
        },
        "_meta_stream_cursor_value_input": {
            "bufferBlock": [
                135
            ],
            "chainId": [
                135
            ],
            "endBlock": [
                135
            ],
            "eventsProcessed": [
                135
            ],
            "firstEventBlock": [
                135
            ],
            "isReady": [
                12
            ],
            "progressBlock": [
                135
            ],
            "readyAt": [
                456
            ],
            "sourceBlock": [
                135
            ],
            "startBlock": [
                135
            ],
            "__typename": [
                366
            ]
        },
        "candleperiod": {},
        "candleperiod_comparison_exp": {
            "_eq": [
                421
            ],
            "_gt": [
                421
            ],
            "_gte": [
                421
            ],
            "_in": [
                421
            ],
            "_is_null": [
                12
            ],
            "_lt": [
                421
            ],
            "_lte": [
                421
            ],
            "_neq": [
                421
            ],
            "_nin": [
                421
            ],
            "__typename": [
                366
            ]
        },
        "chain_metadata": {
            "block_height": [
                135
            ],
            "chain_id": [
                135
            ],
            "end_block": [
                135
            ],
            "first_event_block_number": [
                135
            ],
            "is_hyper_sync": [
                12
            ],
            "latest_fetched_block_number": [
                135
            ],
            "latest_processed_block": [
                135
            ],
            "num_batches_fetched": [
                135
            ],
            "num_events_processed": [
                135
            ],
            "start_block": [
                135
            ],
            "timestamp_caught_up_to_head_or_endblock": [
                456
            ],
            "__typename": [
                366
            ]
        },
        "chain_metadata_bool_exp": {
            "_and": [
                424
            ],
            "_not": [
                424
            ],
            "_or": [
                424
            ],
            "block_height": [
                136
            ],
            "chain_id": [
                136
            ],
            "end_block": [
                136
            ],
            "first_event_block_number": [
                136
            ],
            "is_hyper_sync": [
                13
            ],
            "latest_fetched_block_number": [
                136
            ],
            "latest_processed_block": [
                136
            ],
            "num_batches_fetched": [
                136
            ],
            "num_events_processed": [
                136
            ],
            "start_block": [
                136
            ],
            "timestamp_caught_up_to_head_or_endblock": [
                457
            ],
            "__typename": [
                366
            ]
        },
        "chain_metadata_order_by": {
            "block_height": [
                441
            ],
            "chain_id": [
                441
            ],
            "end_block": [
                441
            ],
            "first_event_block_number": [
                441
            ],
            "is_hyper_sync": [
                441
            ],
            "latest_fetched_block_number": [
                441
            ],
            "latest_processed_block": [
                441
            ],
            "num_batches_fetched": [
                441
            ],
            "num_events_processed": [
                441
            ],
            "start_block": [
                441
            ],
            "timestamp_caught_up_to_head_or_endblock": [
                441
            ],
            "__typename": [
                366
            ]
        },
        "chain_metadata_select_column": {},
        "chain_metadata_stream_cursor_input": {
            "initial_value": [
                428
            ],
            "ordering": [
                429
            ],
            "__typename": [
                366
            ]
        },
        "chain_metadata_stream_cursor_value_input": {
            "block_height": [
                135
            ],
            "chain_id": [
                135
            ],
            "end_block": [
                135
            ],
            "first_event_block_number": [
                135
            ],
            "is_hyper_sync": [
                12
            ],
            "latest_fetched_block_number": [
                135
            ],
            "latest_processed_block": [
                135
            ],
            "num_batches_fetched": [
                135
            ],
            "num_events_processed": [
                135
            ],
            "start_block": [
                135
            ],
            "timestamp_caught_up_to_head_or_endblock": [
                456
            ],
            "__typename": [
                366
            ]
        },
        "cursor_ordering": {},
        "factorykind": {},
        "factorykind_comparison_exp": {
            "_eq": [
                430
            ],
            "_gt": [
                430
            ],
            "_gte": [
                430
            ],
            "_in": [
                430
            ],
            "_is_null": [
                12
            ],
            "_lt": [
                430
            ],
            "_lte": [
                430
            ],
            "_neq": [
                430
            ],
            "_nin": [
                430
            ],
            "__typename": [
                366
            ]
        },
        "jsonb": {},
        "jsonb_cast_exp": {
            "String": [
                368
            ],
            "__typename": [
                366
            ]
        },
        "jsonb_comparison_exp": {
            "_cast": [
                433
            ],
            "_contained_in": [
                432
            ],
            "_contains": [
                432
            ],
            "_eq": [
                432
            ],
            "_gt": [
                432
            ],
            "_gte": [
                432
            ],
            "_has_key": [
                366
            ],
            "_has_keys_all": [
                366
            ],
            "_has_keys_any": [
                366
            ],
            "_in": [
                432
            ],
            "_is_null": [
                12
            ],
            "_lt": [
                432
            ],
            "_lte": [
                432
            ],
            "_neq": [
                432
            ],
            "_nin": [
                432
            ],
            "__typename": [
                366
            ]
        },
        "loanstatus": {},
        "loanstatus_comparison_exp": {
            "_eq": [
                435
            ],
            "_gt": [
                435
            ],
            "_gte": [
                435
            ],
            "_in": [
                435
            ],
            "_is_null": [
                12
            ],
            "_lt": [
                435
            ],
            "_lte": [
                435
            ],
            "_neq": [
                435
            ],
            "_nin": [
                435
            ],
            "__typename": [
                366
            ]
        },
        "marketstatus": {},
        "marketstatus_comparison_exp": {
            "_eq": [
                437
            ],
            "_gt": [
                437
            ],
            "_gte": [
                437
            ],
            "_in": [
                437
            ],
            "_is_null": [
                12
            ],
            "_lt": [
                437
            ],
            "_lte": [
                437
            ],
            "_neq": [
                437
            ],
            "_nin": [
                437
            ],
            "__typename": [
                366
            ]
        },
        "numeric": {},
        "numeric_comparison_exp": {
            "_eq": [
                439
            ],
            "_gt": [
                439
            ],
            "_gte": [
                439
            ],
            "_in": [
                439
            ],
            "_is_null": [
                12
            ],
            "_lt": [
                439
            ],
            "_lte": [
                439
            ],
            "_neq": [
                439
            ],
            "_nin": [
                439
            ],
            "__typename": [
                366
            ]
        },
        "order_by": {},
        "presaleclaimtype": {},
        "presaleclaimtype_comparison_exp": {
            "_eq": [
                442
            ],
            "_gt": [
                442
            ],
            "_gte": [
                442
            ],
            "_in": [
                442
            ],
            "_is_null": [
                12
            ],
            "_lt": [
                442
            ],
            "_lte": [
                442
            ],
            "_neq": [
                442
            ],
            "_nin": [
                442
            ],
            "__typename": [
                366
            ]
        },
        "raw_events": {
            "block_fields": [
                432,
                {
                    "path": [
                        366
                    ]
                }
            ],
            "block_hash": [
                366
            ],
            "block_number": [
                135
            ],
            "block_timestamp": [
                135
            ],
            "chain_id": [
                135
            ],
            "contract_name": [
                366
            ],
            "event_id": [
                439
            ],
            "event_name": [
                366
            ],
            "log_index": [
                135
            ],
            "params": [
                432,
                {
                    "path": [
                        366
                    ]
                }
            ],
            "serial": [
                135
            ],
            "src_address": [
                366
            ],
            "transaction_fields": [
                432,
                {
                    "path": [
                        366
                    ]
                }
            ],
            "__typename": [
                366
            ]
        },
        "raw_events_bool_exp": {
            "_and": [
                445
            ],
            "_not": [
                445
            ],
            "_or": [
                445
            ],
            "block_fields": [
                434
            ],
            "block_hash": [
                368
            ],
            "block_number": [
                136
            ],
            "block_timestamp": [
                136
            ],
            "chain_id": [
                136
            ],
            "contract_name": [
                368
            ],
            "event_id": [
                440
            ],
            "event_name": [
                368
            ],
            "log_index": [
                136
            ],
            "params": [
                434
            ],
            "serial": [
                136
            ],
            "src_address": [
                368
            ],
            "transaction_fields": [
                434
            ],
            "__typename": [
                366
            ]
        },
        "raw_events_order_by": {
            "block_fields": [
                441
            ],
            "block_hash": [
                441
            ],
            "block_number": [
                441
            ],
            "block_timestamp": [
                441
            ],
            "chain_id": [
                441
            ],
            "contract_name": [
                441
            ],
            "event_id": [
                441
            ],
            "event_name": [
                441
            ],
            "log_index": [
                441
            ],
            "params": [
                441
            ],
            "serial": [
                441
            ],
            "src_address": [
                441
            ],
            "transaction_fields": [
                441
            ],
            "__typename": [
                366
            ]
        },
        "raw_events_select_column": {},
        "raw_events_stream_cursor_input": {
            "initial_value": [
                449
            ],
            "ordering": [
                429
            ],
            "__typename": [
                366
            ]
        },
        "raw_events_stream_cursor_value_input": {
            "block_fields": [
                432
            ],
            "block_hash": [
                366
            ],
            "block_number": [
                135
            ],
            "block_timestamp": [
                135
            ],
            "chain_id": [
                135
            ],
            "contract_name": [
                366
            ],
            "event_id": [
                439
            ],
            "event_name": [
                366
            ],
            "log_index": [
                135
            ],
            "params": [
                432
            ],
            "serial": [
                135
            ],
            "src_address": [
                366
            ],
            "transaction_fields": [
                432
            ],
            "__typename": [
                366
            ]
        },
        "snapshotperiod": {},
        "snapshotperiod_comparison_exp": {
            "_eq": [
                450
            ],
            "_gt": [
                450
            ],
            "_gte": [
                450
            ],
            "_in": [
                450
            ],
            "_is_null": [
                12
            ],
            "_lt": [
                450
            ],
            "_lte": [
                450
            ],
            "_neq": [
                450
            ],
            "_nin": [
                450
            ],
            "__typename": [
                366
            ]
        },
        "stakepositionstatus": {},
        "stakepositionstatus_comparison_exp": {
            "_eq": [
                452
            ],
            "_gt": [
                452
            ],
            "_gte": [
                452
            ],
            "_in": [
                452
            ],
            "_is_null": [
                12
            ],
            "_lt": [
                452
            ],
            "_lte": [
                452
            ],
            "_neq": [
                452
            ],
            "_nin": [
                452
            ],
            "__typename": [
                366
            ]
        },
        "stakingactivitytype": {},
        "stakingactivitytype_comparison_exp": {
            "_eq": [
                454
            ],
            "_gt": [
                454
            ],
            "_gte": [
                454
            ],
            "_in": [
                454
            ],
            "_is_null": [
                12
            ],
            "_lt": [
                454
            ],
            "_lte": [
                454
            ],
            "_neq": [
                454
            ],
            "_nin": [
                454
            ],
            "__typename": [
                366
            ]
        },
        "timestamptz": {},
        "timestamptz_comparison_exp": {
            "_eq": [
                456
            ],
            "_gt": [
                456
            ],
            "_gte": [
                456
            ],
            "_in": [
                456
            ],
            "_is_null": [
                12
            ],
            "_lt": [
                456
            ],
            "_lte": [
                456
            ],
            "_neq": [
                456
            ],
            "_nin": [
                456
            ],
            "__typename": [
                366
            ]
        },
        "tradetype": {},
        "tradetype_comparison_exp": {
            "_eq": [
                458
            ],
            "_gt": [
                458
            ],
            "_gte": [
                458
            ],
            "_in": [
                458
            ],
            "_is_null": [
                12
            ],
            "_lt": [
                458
            ],
            "_lte": [
                458
            ],
            "_neq": [
                458
            ],
            "_nin": [
                458
            ],
            "__typename": [
                366
            ]
        },
        "Query": {
            "Account": [
                0,
                {
                    "distinct_on": [
                        3,
                        "[Account_select_column!]"
                    ],
                    "limit": [
                        135
                    ],
                    "offset": [
                        135
                    ],
                    "order_by": [
                        2,
                        "[Account_order_by!]"
                    ],
                    "where": [
                        1
                    ]
                }
            ],
            "Account_by_pk": [
                0,
                {
                    "id": [
                        366,
                        "String!"
                    ]
                }
            ],
            "AuthorizerContract": [
                6,
                {
                    "distinct_on": [
                        9,
                        "[AuthorizerContract_select_column!]"
                    ],
                    "limit": [
                        135
                    ],
                    "offset": [
                        135
                    ],
                    "order_by": [
                        8,
                        "[AuthorizerContract_order_by!]"
                    ],
                    "where": [
                        7
                    ]
                }
            ],
            "AuthorizerContract_by_pk": [
                6,
                {
                    "id": [
                        366,
                        "String!"
                    ]
                }
            ],
            "CreditFacilityContract": [
                14,
                {
                    "distinct_on": [
                        17,
                        "[CreditFacilityContract_select_column!]"
                    ],
                    "limit": [
                        135
                    ],
                    "offset": [
                        135
                    ],
                    "order_by": [
                        16,
                        "[CreditFacilityContract_order_by!]"
                    ],
                    "where": [
                        15
                    ]
                }
            ],
            "CreditFacilityContract_by_pk": [
                14,
                {
                    "id": [
                        366,
                        "String!"
                    ]
                }
            ],
            "FactoryDeployerPermission": [
                20,
                {
                    "distinct_on": [
                        27,
                        "[FactoryDeployerPermission_select_column!]"
                    ],
                    "limit": [
                        135
                    ],
                    "offset": [
                        135
                    ],
                    "order_by": [
                        26,
                        "[FactoryDeployerPermission_order_by!]"
                    ],
                    "where": [
                        23
                    ]
                }
            ],
            "FactoryDeployerPermission_by_pk": [
                20,
                {
                    "id": [
                        366,
                        "String!"
                    ]
                }
            ],
            "FactoryDeploymentConfig": [
                37,
                {
                    "distinct_on": [
                        40,
                        "[FactoryDeploymentConfig_select_column!]"
                    ],
                    "limit": [
                        135
                    ],
                    "offset": [
                        135
                    ],
                    "order_by": [
                        39,
                        "[FactoryDeploymentConfig_order_by!]"
                    ],
                    "where": [
                        38
                    ]
                }
            ],
            "FactoryDeploymentConfig_by_pk": [
                37,
                {
                    "id": [
                        366,
                        "String!"
                    ]
                }
            ],
            "FeeSplitterPayment": [
                43,
                {
                    "distinct_on": [
                        50,
                        "[FeeSplitterPayment_select_column!]"
                    ],
                    "limit": [
                        135
                    ],
                    "offset": [
                        135
                    ],
                    "order_by": [
                        49,
                        "[FeeSplitterPayment_order_by!]"
                    ],
                    "where": [
                        46
                    ]
                }
            ],
            "FeeSplitterPayment_by_pk": [
                43,
                {
                    "id": [
                        366,
                        "String!"
                    ]
                }
            ],
            "FeeSplitterReceipt": [
                60,
                {
                    "distinct_on": [
                        67,
                        "[FeeSplitterReceipt_select_column!]"
                    ],
                    "limit": [
                        135
                    ],
                    "offset": [
                        135
                    ],
                    "order_by": [
                        66,
                        "[FeeSplitterReceipt_order_by!]"
                    ],
                    "where": [
                        63
                    ]
                }
            ],
            "FeeSplitterReceipt_by_pk": [
                60,
                {
                    "id": [
                        366,
                        "String!"
                    ]
                }
            ],
            "FloorElevation": [
                77,
                {
                    "distinct_on": [
                        84,
                        "[FloorElevation_select_column!]"
                    ],
                    "limit": [
                        135
                    ],
                    "offset": [
                        135
                    ],
                    "order_by": [
                        83,
                        "[FloorElevation_order_by!]"
                    ],
                    "where": [
                        80
                    ]
                }
            ],
            "FloorElevation_by_pk": [
                77,
                {
                    "id": [
                        366,
                        "String!"
                    ]
                }
            ],
            "FloorRaiseAttempt": [
                94,
                {
                    "distinct_on": [
                        101,
                        "[FloorRaiseAttempt_select_column!]"
                    ],
                    "limit": [
                        135
                    ],
                    "offset": [
                        135
                    ],
                    "order_by": [
                        100,
                        "[FloorRaiseAttempt_order_by!]"
                    ],
                    "where": [
                        97
                    ]
                }
            ],
            "FloorRaiseAttempt_by_pk": [
                94,
                {
                    "id": [
                        366,
                        "String!"
                    ]
                }
            ],
            "FloorRaiseTreasury": [
                111,
                {
                    "distinct_on": [
                        114,
                        "[FloorRaiseTreasury_select_column!]"
                    ],
                    "limit": [
                        135
                    ],
                    "offset": [
                        135
                    ],
                    "order_by": [
                        113,
                        "[FloorRaiseTreasury_order_by!]"
                    ],
                    "where": [
                        112
                    ]
                }
            ],
            "FloorRaiseTreasury_by_pk": [
                111,
                {
                    "id": [
                        366,
                        "String!"
                    ]
                }
            ],
            "GlobalRegistry": [
                117,
                {
                    "distinct_on": [
                        120,
                        "[GlobalRegistry_select_column!]"
                    ],
                    "limit": [
                        135
                    ],
                    "offset": [
                        135
                    ],
                    "order_by": [
                        119,
                        "[GlobalRegistry_order_by!]"
                    ],
                    "where": [
                        118
                    ]
                }
            ],
            "GlobalRegistry_by_pk": [
                117,
                {
                    "id": [
                        366,
                        "String!"
                    ]
                }
            ],
            "GlobalStats": [
                123,
                {
                    "distinct_on": [
                        132,
                        "[GlobalStats_select_column!]"
                    ],
                    "limit": [
                        135
                    ],
                    "offset": [
                        135
                    ],
                    "order_by": [
                        131,
                        "[GlobalStats_order_by!]"
                    ],
                    "where": [
                        130
                    ]
                }
            ],
            "GlobalStatsSnapshot": [
                124,
                {
                    "distinct_on": [
                        127,
                        "[GlobalStatsSnapshot_select_column!]"
                    ],
                    "limit": [
                        135
                    ],
                    "offset": [
                        135
                    ],
                    "order_by": [
                        126,
                        "[GlobalStatsSnapshot_order_by!]"
                    ],
                    "where": [
                        125
                    ]
                }
            ],
            "GlobalStatsSnapshot_by_pk": [
                124,
                {
                    "id": [
                        366,
                        "String!"
                    ]
                }
            ],
            "GlobalStats_by_pk": [
                123,
                {
                    "id": [
                        366,
                        "String!"
                    ]
                }
            ],
            "Loan": [
                137,
                {
                    "distinct_on": [
                        161,
                        "[Loan_select_column!]"
                    ],
                    "limit": [
                        135
                    ],
                    "offset": [
                        135
                    ],
                    "order_by": [
                        160,
                        "[Loan_order_by!]"
                    ],
                    "where": [
                        157
                    ]
                }
            ],
            "LoanStatusHistory": [
                138,
                {
                    "distinct_on": [
                        145,
                        "[LoanStatusHistory_select_column!]"
                    ],
                    "limit": [
                        135
                    ],
                    "offset": [
                        135
                    ],
                    "order_by": [
                        144,
                        "[LoanStatusHistory_order_by!]"
                    ],
                    "where": [
                        141
                    ]
                }
            ],
            "LoanStatusHistory_by_pk": [
                138,
                {
                    "id": [
                        366,
                        "String!"
                    ]
                }
            ],
            "Loan_by_pk": [
                137,
                {
                    "id": [
                        366,
                        "String!"
                    ]
                }
            ],
            "Market": [
                171,
                {
                    "distinct_on": [
                        190,
                        "[Market_select_column!]"
                    ],
                    "limit": [
                        135
                    ],
                    "offset": [
                        135
                    ],
                    "order_by": [
                        189,
                        "[Market_order_by!]"
                    ],
                    "where": [
                        186
                    ]
                }
            ],
            "MarketRollingStats": [
                172,
                {
                    "distinct_on": [
                        175,
                        "[MarketRollingStats_select_column!]"
                    ],
                    "limit": [
                        135
                    ],
                    "offset": [
                        135
                    ],
                    "order_by": [
                        174,
                        "[MarketRollingStats_order_by!]"
                    ],
                    "where": [
                        173
                    ]
                }
            ],
            "MarketRollingStats_by_pk": [
                172,
                {
                    "id": [
                        366,
                        "String!"
                    ]
                }
            ],
            "MarketSnapshot": [
                178,
                {
                    "distinct_on": [
                        181,
                        "[MarketSnapshot_select_column!]"
                    ],
                    "limit": [
                        135
                    ],
                    "offset": [
                        135
                    ],
                    "order_by": [
                        180,
                        "[MarketSnapshot_order_by!]"
                    ],
                    "where": [
                        179
                    ]
                }
            ],
            "MarketSnapshot_by_pk": [
                178,
                {
                    "id": [
                        366,
                        "String!"
                    ]
                }
            ],
            "Market_by_pk": [
                171,
                {
                    "id": [
                        366,
                        "String!"
                    ]
                }
            ],
            "ModuleAddress": [
                200,
                {
                    "distinct_on": [
                        203,
                        "[ModuleAddress_select_column!]"
                    ],
                    "limit": [
                        135
                    ],
                    "offset": [
                        135
                    ],
                    "order_by": [
                        202,
                        "[ModuleAddress_order_by!]"
                    ],
                    "where": [
                        201
                    ]
                }
            ],
            "ModuleAddress_by_pk": [
                200,
                {
                    "id": [
                        366,
                        "String!"
                    ]
                }
            ],
            "ModuleRegistry": [
                206,
                {
                    "distinct_on": [
                        209,
                        "[ModuleRegistry_select_column!]"
                    ],
                    "limit": [
                        135
                    ],
                    "offset": [
                        135
                    ],
                    "order_by": [
                        208,
                        "[ModuleRegistry_order_by!]"
                    ],
                    "where": [
                        207
                    ]
                }
            ],
            "ModuleRegistry_by_pk": [
                206,
                {
                    "id": [
                        366,
                        "String!"
                    ]
                }
            ],
            "PreSaleContract": [
                212,
                {
                    "distinct_on": [
                        215,
                        "[PreSaleContract_select_column!]"
                    ],
                    "limit": [
                        135
                    ],
                    "offset": [
                        135
                    ],
                    "order_by": [
                        214,
                        "[PreSaleContract_order_by!]"
                    ],
                    "where": [
                        213
                    ]
                }
            ],
            "PreSaleContract_by_pk": [
                212,
                {
                    "id": [
                        366,
                        "String!"
                    ]
                }
            ],
            "PresaleClaim": [
                218,
                {
                    "distinct_on": [
                        225,
                        "[PresaleClaim_select_column!]"
                    ],
                    "limit": [
                        135
                    ],
                    "offset": [
                        135
                    ],
                    "order_by": [
                        224,
                        "[PresaleClaim_order_by!]"
                    ],
                    "where": [
                        221
                    ]
                }
            ],
            "PresaleClaim_by_pk": [
                218,
                {
                    "id": [
                        366,
                        "String!"
                    ]
                }
            ],
            "PresaleParticipation": [
                235,
                {
                    "distinct_on": [
                        242,
                        "[PresaleParticipation_select_column!]"
                    ],
                    "limit": [
                        135
                    ],
                    "offset": [
                        135
                    ],
                    "order_by": [
                        241,
                        "[PresaleParticipation_order_by!]"
                    ],
                    "where": [
                        238
                    ]
                }
            ],
            "PresaleParticipation_by_pk": [
                235,
                {
                    "id": [
                        366,
                        "String!"
                    ]
                }
            ],
            "PriceCandle": [
                252,
                {
                    "distinct_on": [
                        255,
                        "[PriceCandle_select_column!]"
                    ],
                    "limit": [
                        135
                    ],
                    "offset": [
                        135
                    ],
                    "order_by": [
                        254,
                        "[PriceCandle_order_by!]"
                    ],
                    "where": [
                        253
                    ]
                }
            ],
            "PriceCandle_by_pk": [
                252,
                {
                    "id": [
                        366,
                        "String!"
                    ]
                }
            ],
            "Role": [
                258,
                {
                    "distinct_on": [
                        299,
                        "[Role_select_column!]"
                    ],
                    "limit": [
                        135
                    ],
                    "offset": [
                        135
                    ],
                    "order_by": [
                        298,
                        "[Role_order_by!]"
                    ],
                    "where": [
                        295
                    ]
                }
            ],
            "RoleMember": [
                259,
                {
                    "distinct_on": [
                        266,
                        "[RoleMember_select_column!]"
                    ],
                    "limit": [
                        135
                    ],
                    "offset": [
                        135
                    ],
                    "order_by": [
                        265,
                        "[RoleMember_order_by!]"
                    ],
                    "where": [
                        262
                    ]
                }
            ],
            "RoleMember_by_pk": [
                259,
                {
                    "id": [
                        366,
                        "String!"
                    ]
                }
            ],
            "RolePermission": [
                276,
                {
                    "distinct_on": [
                        283,
                        "[RolePermission_select_column!]"
                    ],
                    "limit": [
                        135
                    ],
                    "offset": [
                        135
                    ],
                    "order_by": [
                        282,
                        "[RolePermission_order_by!]"
                    ],
                    "where": [
                        279
                    ]
                }
            ],
            "RolePermission_by_pk": [
                276,
                {
                    "id": [
                        366,
                        "String!"
                    ]
                }
            ],
            "Role_by_pk": [
                258,
                {
                    "id": [
                        366,
                        "String!"
                    ]
                }
            ],
            "StakePosition": [
                309,
                {
                    "distinct_on": [
                        316,
                        "[StakePosition_select_column!]"
                    ],
                    "limit": [
                        135
                    ],
                    "offset": [
                        135
                    ],
                    "order_by": [
                        315,
                        "[StakePosition_order_by!]"
                    ],
                    "where": [
                        312
                    ]
                }
            ],
            "StakePosition_by_pk": [
                309,
                {
                    "id": [
                        366,
                        "String!"
                    ]
                }
            ],
            "StakingActivity": [
                326,
                {
                    "distinct_on": [
                        333,
                        "[StakingActivity_select_column!]"
                    ],
                    "limit": [
                        135
                    ],
                    "offset": [
                        135
                    ],
                    "order_by": [
                        332,
                        "[StakingActivity_order_by!]"
                    ],
                    "where": [
                        329
                    ]
                }
            ],
            "StakingActivity_by_pk": [
                326,
                {
                    "id": [
                        366,
                        "String!"
                    ]
                }
            ],
            "StakingManager": [
                343,
                {
                    "distinct_on": [
                        346,
                        "[StakingManager_select_column!]"
                    ],
                    "limit": [
                        135
                    ],
                    "offset": [
                        135
                    ],
                    "order_by": [
                        345,
                        "[StakingManager_order_by!]"
                    ],
                    "where": [
                        344
                    ]
                }
            ],
            "StakingManager_by_pk": [
                343,
                {
                    "id": [
                        366,
                        "String!"
                    ]
                }
            ],
            "Strategy": [
                349,
                {
                    "distinct_on": [
                        356,
                        "[Strategy_select_column!]"
                    ],
                    "limit": [
                        135
                    ],
                    "offset": [
                        135
                    ],
                    "order_by": [
                        355,
                        "[Strategy_order_by!]"
                    ],
                    "where": [
                        352
                    ]
                }
            ],
            "Strategy_by_pk": [
                349,
                {
                    "id": [
                        366,
                        "String!"
                    ]
                }
            ],
            "Token": [
                369,
                {
                    "distinct_on": [
                        372,
                        "[Token_select_column!]"
                    ],
                    "limit": [
                        135
                    ],
                    "offset": [
                        135
                    ],
                    "order_by": [
                        371,
                        "[Token_order_by!]"
                    ],
                    "where": [
                        370
                    ]
                }
            ],
            "Token_by_pk": [
                369,
                {
                    "id": [
                        366,
                        "String!"
                    ]
                }
            ],
            "Trade": [
                375,
                {
                    "distinct_on": [
                        382,
                        "[Trade_select_column!]"
                    ],
                    "limit": [
                        135
                    ],
                    "offset": [
                        135
                    ],
                    "order_by": [
                        381,
                        "[Trade_order_by!]"
                    ],
                    "where": [
                        378
                    ]
                }
            ],
            "Trade_by_pk": [
                375,
                {
                    "id": [
                        366,
                        "String!"
                    ]
                }
            ],
            "Treasury": [
                392,
                {
                    "distinct_on": [
                        395,
                        "[Treasury_select_column!]"
                    ],
                    "limit": [
                        135
                    ],
                    "offset": [
                        135
                    ],
                    "order_by": [
                        394,
                        "[Treasury_order_by!]"
                    ],
                    "where": [
                        393
                    ]
                }
            ],
            "Treasury_by_pk": [
                392,
                {
                    "id": [
                        366,
                        "String!"
                    ]
                }
            ],
            "UserMarketPosition": [
                398,
                {
                    "distinct_on": [
                        405,
                        "[UserMarketPosition_select_column!]"
                    ],
                    "limit": [
                        135
                    ],
                    "offset": [
                        135
                    ],
                    "order_by": [
                        404,
                        "[UserMarketPosition_order_by!]"
                    ],
                    "where": [
                        401
                    ]
                }
            ],
            "UserMarketPosition_by_pk": [
                398,
                {
                    "id": [
                        366,
                        "String!"
                    ]
                }
            ],
            "_meta": [
                415,
                {
                    "distinct_on": [
                        418,
                        "[_meta_select_column!]"
                    ],
                    "limit": [
                        135
                    ],
                    "offset": [
                        135
                    ],
                    "order_by": [
                        417,
                        "[_meta_order_by!]"
                    ],
                    "where": [
                        416
                    ]
                }
            ],
            "chain_metadata": [
                423,
                {
                    "distinct_on": [
                        426,
                        "[chain_metadata_select_column!]"
                    ],
                    "limit": [
                        135
                    ],
                    "offset": [
                        135
                    ],
                    "order_by": [
                        425,
                        "[chain_metadata_order_by!]"
                    ],
                    "where": [
                        424
                    ]
                }
            ],
            "raw_events": [
                444,
                {
                    "distinct_on": [
                        447,
                        "[raw_events_select_column!]"
                    ],
                    "limit": [
                        135
                    ],
                    "offset": [
                        135
                    ],
                    "order_by": [
                        446,
                        "[raw_events_order_by!]"
                    ],
                    "where": [
                        445
                    ]
                }
            ],
            "raw_events_by_pk": [
                444,
                {
                    "serial": [
                        135,
                        "Int!"
                    ]
                }
            ],
            "__typename": [
                366
            ]
        },
        "Subscription": {
            "Account": [
                0,
                {
                    "distinct_on": [
                        3,
                        "[Account_select_column!]"
                    ],
                    "limit": [
                        135
                    ],
                    "offset": [
                        135
                    ],
                    "order_by": [
                        2,
                        "[Account_order_by!]"
                    ],
                    "where": [
                        1
                    ]
                }
            ],
            "Account_by_pk": [
                0,
                {
                    "id": [
                        366,
                        "String!"
                    ]
                }
            ],
            "Account_stream": [
                0,
                {
                    "batch_size": [
                        135,
                        "Int!"
                    ],
                    "cursor": [
                        4,
                        "[Account_stream_cursor_input]!"
                    ],
                    "where": [
                        1
                    ]
                }
            ],
            "AuthorizerContract": [
                6,
                {
                    "distinct_on": [
                        9,
                        "[AuthorizerContract_select_column!]"
                    ],
                    "limit": [
                        135
                    ],
                    "offset": [
                        135
                    ],
                    "order_by": [
                        8,
                        "[AuthorizerContract_order_by!]"
                    ],
                    "where": [
                        7
                    ]
                }
            ],
            "AuthorizerContract_by_pk": [
                6,
                {
                    "id": [
                        366,
                        "String!"
                    ]
                }
            ],
            "AuthorizerContract_stream": [
                6,
                {
                    "batch_size": [
                        135,
                        "Int!"
                    ],
                    "cursor": [
                        10,
                        "[AuthorizerContract_stream_cursor_input]!"
                    ],
                    "where": [
                        7
                    ]
                }
            ],
            "CreditFacilityContract": [
                14,
                {
                    "distinct_on": [
                        17,
                        "[CreditFacilityContract_select_column!]"
                    ],
                    "limit": [
                        135
                    ],
                    "offset": [
                        135
                    ],
                    "order_by": [
                        16,
                        "[CreditFacilityContract_order_by!]"
                    ],
                    "where": [
                        15
                    ]
                }
            ],
            "CreditFacilityContract_by_pk": [
                14,
                {
                    "id": [
                        366,
                        "String!"
                    ]
                }
            ],
            "CreditFacilityContract_stream": [
                14,
                {
                    "batch_size": [
                        135,
                        "Int!"
                    ],
                    "cursor": [
                        18,
                        "[CreditFacilityContract_stream_cursor_input]!"
                    ],
                    "where": [
                        15
                    ]
                }
            ],
            "FactoryDeployerPermission": [
                20,
                {
                    "distinct_on": [
                        27,
                        "[FactoryDeployerPermission_select_column!]"
                    ],
                    "limit": [
                        135
                    ],
                    "offset": [
                        135
                    ],
                    "order_by": [
                        26,
                        "[FactoryDeployerPermission_order_by!]"
                    ],
                    "where": [
                        23
                    ]
                }
            ],
            "FactoryDeployerPermission_by_pk": [
                20,
                {
                    "id": [
                        366,
                        "String!"
                    ]
                }
            ],
            "FactoryDeployerPermission_stream": [
                20,
                {
                    "batch_size": [
                        135,
                        "Int!"
                    ],
                    "cursor": [
                        31,
                        "[FactoryDeployerPermission_stream_cursor_input]!"
                    ],
                    "where": [
                        23
                    ]
                }
            ],
            "FactoryDeploymentConfig": [
                37,
                {
                    "distinct_on": [
                        40,
                        "[FactoryDeploymentConfig_select_column!]"
                    ],
                    "limit": [
                        135
                    ],
                    "offset": [
                        135
                    ],
                    "order_by": [
                        39,
                        "[FactoryDeploymentConfig_order_by!]"
                    ],
                    "where": [
                        38
                    ]
                }
            ],
            "FactoryDeploymentConfig_by_pk": [
                37,
                {
                    "id": [
                        366,
                        "String!"
                    ]
                }
            ],
            "FactoryDeploymentConfig_stream": [
                37,
                {
                    "batch_size": [
                        135,
                        "Int!"
                    ],
                    "cursor": [
                        41,
                        "[FactoryDeploymentConfig_stream_cursor_input]!"
                    ],
                    "where": [
                        38
                    ]
                }
            ],
            "FeeSplitterPayment": [
                43,
                {
                    "distinct_on": [
                        50,
                        "[FeeSplitterPayment_select_column!]"
                    ],
                    "limit": [
                        135
                    ],
                    "offset": [
                        135
                    ],
                    "order_by": [
                        49,
                        "[FeeSplitterPayment_order_by!]"
                    ],
                    "where": [
                        46
                    ]
                }
            ],
            "FeeSplitterPayment_by_pk": [
                43,
                {
                    "id": [
                        366,
                        "String!"
                    ]
                }
            ],
            "FeeSplitterPayment_stream": [
                43,
                {
                    "batch_size": [
                        135,
                        "Int!"
                    ],
                    "cursor": [
                        54,
                        "[FeeSplitterPayment_stream_cursor_input]!"
                    ],
                    "where": [
                        46
                    ]
                }
            ],
            "FeeSplitterReceipt": [
                60,
                {
                    "distinct_on": [
                        67,
                        "[FeeSplitterReceipt_select_column!]"
                    ],
                    "limit": [
                        135
                    ],
                    "offset": [
                        135
                    ],
                    "order_by": [
                        66,
                        "[FeeSplitterReceipt_order_by!]"
                    ],
                    "where": [
                        63
                    ]
                }
            ],
            "FeeSplitterReceipt_by_pk": [
                60,
                {
                    "id": [
                        366,
                        "String!"
                    ]
                }
            ],
            "FeeSplitterReceipt_stream": [
                60,
                {
                    "batch_size": [
                        135,
                        "Int!"
                    ],
                    "cursor": [
                        71,
                        "[FeeSplitterReceipt_stream_cursor_input]!"
                    ],
                    "where": [
                        63
                    ]
                }
            ],
            "FloorElevation": [
                77,
                {
                    "distinct_on": [
                        84,
                        "[FloorElevation_select_column!]"
                    ],
                    "limit": [
                        135
                    ],
                    "offset": [
                        135
                    ],
                    "order_by": [
                        83,
                        "[FloorElevation_order_by!]"
                    ],
                    "where": [
                        80
                    ]
                }
            ],
            "FloorElevation_by_pk": [
                77,
                {
                    "id": [
                        366,
                        "String!"
                    ]
                }
            ],
            "FloorElevation_stream": [
                77,
                {
                    "batch_size": [
                        135,
                        "Int!"
                    ],
                    "cursor": [
                        88,
                        "[FloorElevation_stream_cursor_input]!"
                    ],
                    "where": [
                        80
                    ]
                }
            ],
            "FloorRaiseAttempt": [
                94,
                {
                    "distinct_on": [
                        101,
                        "[FloorRaiseAttempt_select_column!]"
                    ],
                    "limit": [
                        135
                    ],
                    "offset": [
                        135
                    ],
                    "order_by": [
                        100,
                        "[FloorRaiseAttempt_order_by!]"
                    ],
                    "where": [
                        97
                    ]
                }
            ],
            "FloorRaiseAttempt_by_pk": [
                94,
                {
                    "id": [
                        366,
                        "String!"
                    ]
                }
            ],
            "FloorRaiseAttempt_stream": [
                94,
                {
                    "batch_size": [
                        135,
                        "Int!"
                    ],
                    "cursor": [
                        105,
                        "[FloorRaiseAttempt_stream_cursor_input]!"
                    ],
                    "where": [
                        97
                    ]
                }
            ],
            "FloorRaiseTreasury": [
                111,
                {
                    "distinct_on": [
                        114,
                        "[FloorRaiseTreasury_select_column!]"
                    ],
                    "limit": [
                        135
                    ],
                    "offset": [
                        135
                    ],
                    "order_by": [
                        113,
                        "[FloorRaiseTreasury_order_by!]"
                    ],
                    "where": [
                        112
                    ]
                }
            ],
            "FloorRaiseTreasury_by_pk": [
                111,
                {
                    "id": [
                        366,
                        "String!"
                    ]
                }
            ],
            "FloorRaiseTreasury_stream": [
                111,
                {
                    "batch_size": [
                        135,
                        "Int!"
                    ],
                    "cursor": [
                        115,
                        "[FloorRaiseTreasury_stream_cursor_input]!"
                    ],
                    "where": [
                        112
                    ]
                }
            ],
            "GlobalRegistry": [
                117,
                {
                    "distinct_on": [
                        120,
                        "[GlobalRegistry_select_column!]"
                    ],
                    "limit": [
                        135
                    ],
                    "offset": [
                        135
                    ],
                    "order_by": [
                        119,
                        "[GlobalRegistry_order_by!]"
                    ],
                    "where": [
                        118
                    ]
                }
            ],
            "GlobalRegistry_by_pk": [
                117,
                {
                    "id": [
                        366,
                        "String!"
                    ]
                }
            ],
            "GlobalRegistry_stream": [
                117,
                {
                    "batch_size": [
                        135,
                        "Int!"
                    ],
                    "cursor": [
                        121,
                        "[GlobalRegistry_stream_cursor_input]!"
                    ],
                    "where": [
                        118
                    ]
                }
            ],
            "GlobalStats": [
                123,
                {
                    "distinct_on": [
                        132,
                        "[GlobalStats_select_column!]"
                    ],
                    "limit": [
                        135
                    ],
                    "offset": [
                        135
                    ],
                    "order_by": [
                        131,
                        "[GlobalStats_order_by!]"
                    ],
                    "where": [
                        130
                    ]
                }
            ],
            "GlobalStatsSnapshot": [
                124,
                {
                    "distinct_on": [
                        127,
                        "[GlobalStatsSnapshot_select_column!]"
                    ],
                    "limit": [
                        135
                    ],
                    "offset": [
                        135
                    ],
                    "order_by": [
                        126,
                        "[GlobalStatsSnapshot_order_by!]"
                    ],
                    "where": [
                        125
                    ]
                }
            ],
            "GlobalStatsSnapshot_by_pk": [
                124,
                {
                    "id": [
                        366,
                        "String!"
                    ]
                }
            ],
            "GlobalStatsSnapshot_stream": [
                124,
                {
                    "batch_size": [
                        135,
                        "Int!"
                    ],
                    "cursor": [
                        128,
                        "[GlobalStatsSnapshot_stream_cursor_input]!"
                    ],
                    "where": [
                        125
                    ]
                }
            ],
            "GlobalStats_by_pk": [
                123,
                {
                    "id": [
                        366,
                        "String!"
                    ]
                }
            ],
            "GlobalStats_stream": [
                123,
                {
                    "batch_size": [
                        135,
                        "Int!"
                    ],
                    "cursor": [
                        133,
                        "[GlobalStats_stream_cursor_input]!"
                    ],
                    "where": [
                        130
                    ]
                }
            ],
            "Loan": [
                137,
                {
                    "distinct_on": [
                        161,
                        "[Loan_select_column!]"
                    ],
                    "limit": [
                        135
                    ],
                    "offset": [
                        135
                    ],
                    "order_by": [
                        160,
                        "[Loan_order_by!]"
                    ],
                    "where": [
                        157
                    ]
                }
            ],
            "LoanStatusHistory": [
                138,
                {
                    "distinct_on": [
                        145,
                        "[LoanStatusHistory_select_column!]"
                    ],
                    "limit": [
                        135
                    ],
                    "offset": [
                        135
                    ],
                    "order_by": [
                        144,
                        "[LoanStatusHistory_order_by!]"
                    ],
                    "where": [
                        141
                    ]
                }
            ],
            "LoanStatusHistory_by_pk": [
                138,
                {
                    "id": [
                        366,
                        "String!"
                    ]
                }
            ],
            "LoanStatusHistory_stream": [
                138,
                {
                    "batch_size": [
                        135,
                        "Int!"
                    ],
                    "cursor": [
                        149,
                        "[LoanStatusHistory_stream_cursor_input]!"
                    ],
                    "where": [
                        141
                    ]
                }
            ],
            "Loan_by_pk": [
                137,
                {
                    "id": [
                        366,
                        "String!"
                    ]
                }
            ],
            "Loan_stream": [
                137,
                {
                    "batch_size": [
                        135,
                        "Int!"
                    ],
                    "cursor": [
                        165,
                        "[Loan_stream_cursor_input]!"
                    ],
                    "where": [
                        157
                    ]
                }
            ],
            "Market": [
                171,
                {
                    "distinct_on": [
                        190,
                        "[Market_select_column!]"
                    ],
                    "limit": [
                        135
                    ],
                    "offset": [
                        135
                    ],
                    "order_by": [
                        189,
                        "[Market_order_by!]"
                    ],
                    "where": [
                        186
                    ]
                }
            ],
            "MarketRollingStats": [
                172,
                {
                    "distinct_on": [
                        175,
                        "[MarketRollingStats_select_column!]"
                    ],
                    "limit": [
                        135
                    ],
                    "offset": [
                        135
                    ],
                    "order_by": [
                        174,
                        "[MarketRollingStats_order_by!]"
                    ],
                    "where": [
                        173
                    ]
                }
            ],
            "MarketRollingStats_by_pk": [
                172,
                {
                    "id": [
                        366,
                        "String!"
                    ]
                }
            ],
            "MarketRollingStats_stream": [
                172,
                {
                    "batch_size": [
                        135,
                        "Int!"
                    ],
                    "cursor": [
                        176,
                        "[MarketRollingStats_stream_cursor_input]!"
                    ],
                    "where": [
                        173
                    ]
                }
            ],
            "MarketSnapshot": [
                178,
                {
                    "distinct_on": [
                        181,
                        "[MarketSnapshot_select_column!]"
                    ],
                    "limit": [
                        135
                    ],
                    "offset": [
                        135
                    ],
                    "order_by": [
                        180,
                        "[MarketSnapshot_order_by!]"
                    ],
                    "where": [
                        179
                    ]
                }
            ],
            "MarketSnapshot_by_pk": [
                178,
                {
                    "id": [
                        366,
                        "String!"
                    ]
                }
            ],
            "MarketSnapshot_stream": [
                178,
                {
                    "batch_size": [
                        135,
                        "Int!"
                    ],
                    "cursor": [
                        182,
                        "[MarketSnapshot_stream_cursor_input]!"
                    ],
                    "where": [
                        179
                    ]
                }
            ],
            "Market_by_pk": [
                171,
                {
                    "id": [
                        366,
                        "String!"
                    ]
                }
            ],
            "Market_stream": [
                171,
                {
                    "batch_size": [
                        135,
                        "Int!"
                    ],
                    "cursor": [
                        194,
                        "[Market_stream_cursor_input]!"
                    ],
                    "where": [
                        186
                    ]
                }
            ],
            "ModuleAddress": [
                200,
                {
                    "distinct_on": [
                        203,
                        "[ModuleAddress_select_column!]"
                    ],
                    "limit": [
                        135
                    ],
                    "offset": [
                        135
                    ],
                    "order_by": [
                        202,
                        "[ModuleAddress_order_by!]"
                    ],
                    "where": [
                        201
                    ]
                }
            ],
            "ModuleAddress_by_pk": [
                200,
                {
                    "id": [
                        366,
                        "String!"
                    ]
                }
            ],
            "ModuleAddress_stream": [
                200,
                {
                    "batch_size": [
                        135,
                        "Int!"
                    ],
                    "cursor": [
                        204,
                        "[ModuleAddress_stream_cursor_input]!"
                    ],
                    "where": [
                        201
                    ]
                }
            ],
            "ModuleRegistry": [
                206,
                {
                    "distinct_on": [
                        209,
                        "[ModuleRegistry_select_column!]"
                    ],
                    "limit": [
                        135
                    ],
                    "offset": [
                        135
                    ],
                    "order_by": [
                        208,
                        "[ModuleRegistry_order_by!]"
                    ],
                    "where": [
                        207
                    ]
                }
            ],
            "ModuleRegistry_by_pk": [
                206,
                {
                    "id": [
                        366,
                        "String!"
                    ]
                }
            ],
            "ModuleRegistry_stream": [
                206,
                {
                    "batch_size": [
                        135,
                        "Int!"
                    ],
                    "cursor": [
                        210,
                        "[ModuleRegistry_stream_cursor_input]!"
                    ],
                    "where": [
                        207
                    ]
                }
            ],
            "PreSaleContract": [
                212,
                {
                    "distinct_on": [
                        215,
                        "[PreSaleContract_select_column!]"
                    ],
                    "limit": [
                        135
                    ],
                    "offset": [
                        135
                    ],
                    "order_by": [
                        214,
                        "[PreSaleContract_order_by!]"
                    ],
                    "where": [
                        213
                    ]
                }
            ],
            "PreSaleContract_by_pk": [
                212,
                {
                    "id": [
                        366,
                        "String!"
                    ]
                }
            ],
            "PreSaleContract_stream": [
                212,
                {
                    "batch_size": [
                        135,
                        "Int!"
                    ],
                    "cursor": [
                        216,
                        "[PreSaleContract_stream_cursor_input]!"
                    ],
                    "where": [
                        213
                    ]
                }
            ],
            "PresaleClaim": [
                218,
                {
                    "distinct_on": [
                        225,
                        "[PresaleClaim_select_column!]"
                    ],
                    "limit": [
                        135
                    ],
                    "offset": [
                        135
                    ],
                    "order_by": [
                        224,
                        "[PresaleClaim_order_by!]"
                    ],
                    "where": [
                        221
                    ]
                }
            ],
            "PresaleClaim_by_pk": [
                218,
                {
                    "id": [
                        366,
                        "String!"
                    ]
                }
            ],
            "PresaleClaim_stream": [
                218,
                {
                    "batch_size": [
                        135,
                        "Int!"
                    ],
                    "cursor": [
                        229,
                        "[PresaleClaim_stream_cursor_input]!"
                    ],
                    "where": [
                        221
                    ]
                }
            ],
            "PresaleParticipation": [
                235,
                {
                    "distinct_on": [
                        242,
                        "[PresaleParticipation_select_column!]"
                    ],
                    "limit": [
                        135
                    ],
                    "offset": [
                        135
                    ],
                    "order_by": [
                        241,
                        "[PresaleParticipation_order_by!]"
                    ],
                    "where": [
                        238
                    ]
                }
            ],
            "PresaleParticipation_by_pk": [
                235,
                {
                    "id": [
                        366,
                        "String!"
                    ]
                }
            ],
            "PresaleParticipation_stream": [
                235,
                {
                    "batch_size": [
                        135,
                        "Int!"
                    ],
                    "cursor": [
                        246,
                        "[PresaleParticipation_stream_cursor_input]!"
                    ],
                    "where": [
                        238
                    ]
                }
            ],
            "PriceCandle": [
                252,
                {
                    "distinct_on": [
                        255,
                        "[PriceCandle_select_column!]"
                    ],
                    "limit": [
                        135
                    ],
                    "offset": [
                        135
                    ],
                    "order_by": [
                        254,
                        "[PriceCandle_order_by!]"
                    ],
                    "where": [
                        253
                    ]
                }
            ],
            "PriceCandle_by_pk": [
                252,
                {
                    "id": [
                        366,
                        "String!"
                    ]
                }
            ],
            "PriceCandle_stream": [
                252,
                {
                    "batch_size": [
                        135,
                        "Int!"
                    ],
                    "cursor": [
                        256,
                        "[PriceCandle_stream_cursor_input]!"
                    ],
                    "where": [
                        253
                    ]
                }
            ],
            "Role": [
                258,
                {
                    "distinct_on": [
                        299,
                        "[Role_select_column!]"
                    ],
                    "limit": [
                        135
                    ],
                    "offset": [
                        135
                    ],
                    "order_by": [
                        298,
                        "[Role_order_by!]"
                    ],
                    "where": [
                        295
                    ]
                }
            ],
            "RoleMember": [
                259,
                {
                    "distinct_on": [
                        266,
                        "[RoleMember_select_column!]"
                    ],
                    "limit": [
                        135
                    ],
                    "offset": [
                        135
                    ],
                    "order_by": [
                        265,
                        "[RoleMember_order_by!]"
                    ],
                    "where": [
                        262
                    ]
                }
            ],
            "RoleMember_by_pk": [
                259,
                {
                    "id": [
                        366,
                        "String!"
                    ]
                }
            ],
            "RoleMember_stream": [
                259,
                {
                    "batch_size": [
                        135,
                        "Int!"
                    ],
                    "cursor": [
                        270,
                        "[RoleMember_stream_cursor_input]!"
                    ],
                    "where": [
                        262
                    ]
                }
            ],
            "RolePermission": [
                276,
                {
                    "distinct_on": [
                        283,
                        "[RolePermission_select_column!]"
                    ],
                    "limit": [
                        135
                    ],
                    "offset": [
                        135
                    ],
                    "order_by": [
                        282,
                        "[RolePermission_order_by!]"
                    ],
                    "where": [
                        279
                    ]
                }
            ],
            "RolePermission_by_pk": [
                276,
                {
                    "id": [
                        366,
                        "String!"
                    ]
                }
            ],
            "RolePermission_stream": [
                276,
                {
                    "batch_size": [
                        135,
                        "Int!"
                    ],
                    "cursor": [
                        287,
                        "[RolePermission_stream_cursor_input]!"
                    ],
                    "where": [
                        279
                    ]
                }
            ],
            "Role_by_pk": [
                258,
                {
                    "id": [
                        366,
                        "String!"
                    ]
                }
            ],
            "Role_stream": [
                258,
                {
                    "batch_size": [
                        135,
                        "Int!"
                    ],
                    "cursor": [
                        303,
                        "[Role_stream_cursor_input]!"
                    ],
                    "where": [
                        295
                    ]
                }
            ],
            "StakePosition": [
                309,
                {
                    "distinct_on": [
                        316,
                        "[StakePosition_select_column!]"
                    ],
                    "limit": [
                        135
                    ],
                    "offset": [
                        135
                    ],
                    "order_by": [
                        315,
                        "[StakePosition_order_by!]"
                    ],
                    "where": [
                        312
                    ]
                }
            ],
            "StakePosition_by_pk": [
                309,
                {
                    "id": [
                        366,
                        "String!"
                    ]
                }
            ],
            "StakePosition_stream": [
                309,
                {
                    "batch_size": [
                        135,
                        "Int!"
                    ],
                    "cursor": [
                        320,
                        "[StakePosition_stream_cursor_input]!"
                    ],
                    "where": [
                        312
                    ]
                }
            ],
            "StakingActivity": [
                326,
                {
                    "distinct_on": [
                        333,
                        "[StakingActivity_select_column!]"
                    ],
                    "limit": [
                        135
                    ],
                    "offset": [
                        135
                    ],
                    "order_by": [
                        332,
                        "[StakingActivity_order_by!]"
                    ],
                    "where": [
                        329
                    ]
                }
            ],
            "StakingActivity_by_pk": [
                326,
                {
                    "id": [
                        366,
                        "String!"
                    ]
                }
            ],
            "StakingActivity_stream": [
                326,
                {
                    "batch_size": [
                        135,
                        "Int!"
                    ],
                    "cursor": [
                        337,
                        "[StakingActivity_stream_cursor_input]!"
                    ],
                    "where": [
                        329
                    ]
                }
            ],
            "StakingManager": [
                343,
                {
                    "distinct_on": [
                        346,
                        "[StakingManager_select_column!]"
                    ],
                    "limit": [
                        135
                    ],
                    "offset": [
                        135
                    ],
                    "order_by": [
                        345,
                        "[StakingManager_order_by!]"
                    ],
                    "where": [
                        344
                    ]
                }
            ],
            "StakingManager_by_pk": [
                343,
                {
                    "id": [
                        366,
                        "String!"
                    ]
                }
            ],
            "StakingManager_stream": [
                343,
                {
                    "batch_size": [
                        135,
                        "Int!"
                    ],
                    "cursor": [
                        347,
                        "[StakingManager_stream_cursor_input]!"
                    ],
                    "where": [
                        344
                    ]
                }
            ],
            "Strategy": [
                349,
                {
                    "distinct_on": [
                        356,
                        "[Strategy_select_column!]"
                    ],
                    "limit": [
                        135
                    ],
                    "offset": [
                        135
                    ],
                    "order_by": [
                        355,
                        "[Strategy_order_by!]"
                    ],
                    "where": [
                        352
                    ]
                }
            ],
            "Strategy_by_pk": [
                349,
                {
                    "id": [
                        366,
                        "String!"
                    ]
                }
            ],
            "Strategy_stream": [
                349,
                {
                    "batch_size": [
                        135,
                        "Int!"
                    ],
                    "cursor": [
                        360,
                        "[Strategy_stream_cursor_input]!"
                    ],
                    "where": [
                        352
                    ]
                }
            ],
            "Token": [
                369,
                {
                    "distinct_on": [
                        372,
                        "[Token_select_column!]"
                    ],
                    "limit": [
                        135
                    ],
                    "offset": [
                        135
                    ],
                    "order_by": [
                        371,
                        "[Token_order_by!]"
                    ],
                    "where": [
                        370
                    ]
                }
            ],
            "Token_by_pk": [
                369,
                {
                    "id": [
                        366,
                        "String!"
                    ]
                }
            ],
            "Token_stream": [
                369,
                {
                    "batch_size": [
                        135,
                        "Int!"
                    ],
                    "cursor": [
                        373,
                        "[Token_stream_cursor_input]!"
                    ],
                    "where": [
                        370
                    ]
                }
            ],
            "Trade": [
                375,
                {
                    "distinct_on": [
                        382,
                        "[Trade_select_column!]"
                    ],
                    "limit": [
                        135
                    ],
                    "offset": [
                        135
                    ],
                    "order_by": [
                        381,
                        "[Trade_order_by!]"
                    ],
                    "where": [
                        378
                    ]
                }
            ],
            "Trade_by_pk": [
                375,
                {
                    "id": [
                        366,
                        "String!"
                    ]
                }
            ],
            "Trade_stream": [
                375,
                {
                    "batch_size": [
                        135,
                        "Int!"
                    ],
                    "cursor": [
                        386,
                        "[Trade_stream_cursor_input]!"
                    ],
                    "where": [
                        378
                    ]
                }
            ],
            "Treasury": [
                392,
                {
                    "distinct_on": [
                        395,
                        "[Treasury_select_column!]"
                    ],
                    "limit": [
                        135
                    ],
                    "offset": [
                        135
                    ],
                    "order_by": [
                        394,
                        "[Treasury_order_by!]"
                    ],
                    "where": [
                        393
                    ]
                }
            ],
            "Treasury_by_pk": [
                392,
                {
                    "id": [
                        366,
                        "String!"
                    ]
                }
            ],
            "Treasury_stream": [
                392,
                {
                    "batch_size": [
                        135,
                        "Int!"
                    ],
                    "cursor": [
                        396,
                        "[Treasury_stream_cursor_input]!"
                    ],
                    "where": [
                        393
                    ]
                }
            ],
            "UserMarketPosition": [
                398,
                {
                    "distinct_on": [
                        405,
                        "[UserMarketPosition_select_column!]"
                    ],
                    "limit": [
                        135
                    ],
                    "offset": [
                        135
                    ],
                    "order_by": [
                        404,
                        "[UserMarketPosition_order_by!]"
                    ],
                    "where": [
                        401
                    ]
                }
            ],
            "UserMarketPosition_by_pk": [
                398,
                {
                    "id": [
                        366,
                        "String!"
                    ]
                }
            ],
            "UserMarketPosition_stream": [
                398,
                {
                    "batch_size": [
                        135,
                        "Int!"
                    ],
                    "cursor": [
                        409,
                        "[UserMarketPosition_stream_cursor_input]!"
                    ],
                    "where": [
                        401
                    ]
                }
            ],
            "_meta": [
                415,
                {
                    "distinct_on": [
                        418,
                        "[_meta_select_column!]"
                    ],
                    "limit": [
                        135
                    ],
                    "offset": [
                        135
                    ],
                    "order_by": [
                        417,
                        "[_meta_order_by!]"
                    ],
                    "where": [
                        416
                    ]
                }
            ],
            "_meta_stream": [
                415,
                {
                    "batch_size": [
                        135,
                        "Int!"
                    ],
                    "cursor": [
                        419,
                        "[_meta_stream_cursor_input]!"
                    ],
                    "where": [
                        416
                    ]
                }
            ],
            "chain_metadata": [
                423,
                {
                    "distinct_on": [
                        426,
                        "[chain_metadata_select_column!]"
                    ],
                    "limit": [
                        135
                    ],
                    "offset": [
                        135
                    ],
                    "order_by": [
                        425,
                        "[chain_metadata_order_by!]"
                    ],
                    "where": [
                        424
                    ]
                }
            ],
            "chain_metadata_stream": [
                423,
                {
                    "batch_size": [
                        135,
                        "Int!"
                    ],
                    "cursor": [
                        427,
                        "[chain_metadata_stream_cursor_input]!"
                    ],
                    "where": [
                        424
                    ]
                }
            ],
            "raw_events": [
                444,
                {
                    "distinct_on": [
                        447,
                        "[raw_events_select_column!]"
                    ],
                    "limit": [
                        135
                    ],
                    "offset": [
                        135
                    ],
                    "order_by": [
                        446,
                        "[raw_events_order_by!]"
                    ],
                    "where": [
                        445
                    ]
                }
            ],
            "raw_events_by_pk": [
                444,
                {
                    "serial": [
                        135,
                        "Int!"
                    ]
                }
            ],
            "raw_events_stream": [
                444,
                {
                    "batch_size": [
                        135,
                        "Int!"
                    ],
                    "cursor": [
                        448,
                        "[raw_events_stream_cursor_input]!"
                    ],
                    "where": [
                        445
                    ]
                }
            ],
            "__typename": [
                366
            ]
        }
    }
}