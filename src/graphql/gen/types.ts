export default {
    "scalars": [
        3,
        9,
        12,
        17,
        27,
        44,
        57,
        60,
        71,
        87,
        101,
        107,
        116,
        129,
        135,
        141,
        151,
        168,
        181,
        192,
        209,
        225,
        242,
        255,
        258,
        264,
        274,
        291,
        301,
        306,
        309,
        311,
        315,
        321,
        327,
        330,
        333,
        335,
        337,
        340,
        344,
        347,
        352,
        355,
        357,
        359,
        361
    ],
    "types": {
        "Account": {
            "db_write_timestamp": [
                357
            ],
            "id": [
                258
            ],
            "loans": [
                63,
                {
                    "distinct_on": [
                        87,
                        "[Loan_select_column!]"
                    ],
                    "limit": [
                        60
                    ],
                    "offset": [
                        60
                    ],
                    "order_by": [
                        86,
                        "[Loan_order_by!]"
                    ],
                    "where": [
                        83
                    ]
                }
            ],
            "marketsCreated": [
                97,
                {
                    "distinct_on": [
                        116,
                        "[Market_select_column!]"
                    ],
                    "limit": [
                        60
                    ],
                    "offset": [
                        60
                    ],
                    "order_by": [
                        115,
                        "[Market_order_by!]"
                    ],
                    "where": [
                        112
                    ]
                }
            ],
            "presaleParticipations": [
                161,
                {
                    "distinct_on": [
                        168,
                        "[PresaleParticipation_select_column!]"
                    ],
                    "limit": [
                        60
                    ],
                    "offset": [
                        60
                    ],
                    "order_by": [
                        167,
                        "[PresaleParticipation_order_by!]"
                    ],
                    "where": [
                        164
                    ]
                }
            ],
            "stakes": [
                235,
                {
                    "distinct_on": [
                        242,
                        "[Stake_select_column!]"
                    ],
                    "limit": [
                        60
                    ],
                    "offset": [
                        60
                    ],
                    "order_by": [
                        241,
                        "[Stake_order_by!]"
                    ],
                    "where": [
                        238
                    ]
                }
            ],
            "trades": [
                267,
                {
                    "distinct_on": [
                        274,
                        "[Trade_select_column!]"
                    ],
                    "limit": [
                        60
                    ],
                    "offset": [
                        60
                    ],
                    "order_by": [
                        273,
                        "[Trade_order_by!]"
                    ],
                    "where": [
                        270
                    ]
                }
            ],
            "userMarketPositions": [
                284,
                {
                    "distinct_on": [
                        291,
                        "[UserMarketPosition_select_column!]"
                    ],
                    "limit": [
                        60
                    ],
                    "offset": [
                        60
                    ],
                    "order_by": [
                        290,
                        "[UserMarketPosition_order_by!]"
                    ],
                    "where": [
                        287
                    ]
                }
            ],
            "__typename": [
                258
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
            "db_write_timestamp": [
                358
            ],
            "id": [
                260
            ],
            "loans": [
                83
            ],
            "marketsCreated": [
                112
            ],
            "presaleParticipations": [
                164
            ],
            "stakes": [
                238
            ],
            "trades": [
                270
            ],
            "userMarketPositions": [
                287
            ],
            "__typename": [
                258
            ]
        },
        "Account_order_by": {
            "db_write_timestamp": [
                340
            ],
            "id": [
                340
            ],
            "loans_aggregate": [
                81
            ],
            "marketsCreated_aggregate": [
                110
            ],
            "presaleParticipations_aggregate": [
                162
            ],
            "stakes_aggregate": [
                236
            ],
            "trades_aggregate": [
                268
            ],
            "userMarketPositions_aggregate": [
                285
            ],
            "__typename": [
                258
            ]
        },
        "Account_select_column": {},
        "Account_stream_cursor_input": {
            "initial_value": [
                5
            ],
            "ordering": [
                311
            ],
            "__typename": [
                258
            ]
        },
        "Account_stream_cursor_value_input": {
            "db_write_timestamp": [
                357
            ],
            "id": [
                258
            ],
            "__typename": [
                258
            ]
        },
        "AuthorizerContract": {
            "createdAt": [
                337
            ],
            "db_write_timestamp": [
                357
            ],
            "floor": [
                258
            ],
            "id": [
                258
            ],
            "lastAssignedRoleId": [
                337
            ],
            "lastUpdatedAt": [
                337
            ],
            "roles": [
                184,
                {
                    "distinct_on": [
                        225,
                        "[Role_select_column!]"
                    ],
                    "limit": [
                        60
                    ],
                    "offset": [
                        60
                    ],
                    "order_by": [
                        224,
                        "[Role_order_by!]"
                    ],
                    "where": [
                        221
                    ]
                }
            ],
            "__typename": [
                258
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
                339
            ],
            "db_write_timestamp": [
                358
            ],
            "floor": [
                260
            ],
            "id": [
                260
            ],
            "lastAssignedRoleId": [
                339
            ],
            "lastUpdatedAt": [
                339
            ],
            "roles": [
                221
            ],
            "__typename": [
                258
            ]
        },
        "AuthorizerContract_order_by": {
            "createdAt": [
                340
            ],
            "db_write_timestamp": [
                340
            ],
            "floor": [
                340
            ],
            "id": [
                340
            ],
            "lastAssignedRoleId": [
                340
            ],
            "lastUpdatedAt": [
                340
            ],
            "roles_aggregate": [
                219
            ],
            "__typename": [
                258
            ]
        },
        "AuthorizerContract_select_column": {},
        "AuthorizerContract_stream_cursor_input": {
            "initial_value": [
                11
            ],
            "ordering": [
                311
            ],
            "__typename": [
                258
            ]
        },
        "AuthorizerContract_stream_cursor_value_input": {
            "createdAt": [
                337
            ],
            "db_write_timestamp": [
                357
            ],
            "floor": [
                258
            ],
            "id": [
                258
            ],
            "lastAssignedRoleId": [
                337
            ],
            "lastUpdatedAt": [
                337
            ],
            "__typename": [
                258
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
                258
            ]
        },
        "CreditFacilityContract": {
            "borrowToken_id": [
                258
            ],
            "collateralToken_id": [
                258
            ],
            "createdAt": [
                337
            ],
            "db_write_timestamp": [
                357
            ],
            "id": [
                258
            ],
            "lastUpdatedAt": [
                337
            ],
            "loans": [
                63,
                {
                    "distinct_on": [
                        87,
                        "[Loan_select_column!]"
                    ],
                    "limit": [
                        60
                    ],
                    "offset": [
                        60
                    ],
                    "order_by": [
                        86,
                        "[Loan_order_by!]"
                    ],
                    "where": [
                        83
                    ]
                }
            ],
            "market_id": [
                258
            ],
            "totalDebtFormatted": [
                258
            ],
            "totalDebtRaw": [
                337
            ],
            "totalLoans": [
                337
            ],
            "totalLockedCollateralFormatted": [
                258
            ],
            "totalLockedCollateralRaw": [
                337
            ],
            "totalVolumeFormatted": [
                258
            ],
            "totalVolumeRaw": [
                337
            ],
            "__typename": [
                258
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
                260
            ],
            "collateralToken_id": [
                260
            ],
            "createdAt": [
                339
            ],
            "db_write_timestamp": [
                358
            ],
            "id": [
                260
            ],
            "lastUpdatedAt": [
                339
            ],
            "loans": [
                83
            ],
            "market_id": [
                260
            ],
            "totalDebtFormatted": [
                260
            ],
            "totalDebtRaw": [
                339
            ],
            "totalLoans": [
                339
            ],
            "totalLockedCollateralFormatted": [
                260
            ],
            "totalLockedCollateralRaw": [
                339
            ],
            "totalVolumeFormatted": [
                260
            ],
            "totalVolumeRaw": [
                339
            ],
            "__typename": [
                258
            ]
        },
        "CreditFacilityContract_order_by": {
            "borrowToken_id": [
                340
            ],
            "collateralToken_id": [
                340
            ],
            "createdAt": [
                340
            ],
            "db_write_timestamp": [
                340
            ],
            "id": [
                340
            ],
            "lastUpdatedAt": [
                340
            ],
            "loans_aggregate": [
                81
            ],
            "market_id": [
                340
            ],
            "totalDebtFormatted": [
                340
            ],
            "totalDebtRaw": [
                340
            ],
            "totalLoans": [
                340
            ],
            "totalLockedCollateralFormatted": [
                340
            ],
            "totalLockedCollateralRaw": [
                340
            ],
            "totalVolumeFormatted": [
                340
            ],
            "totalVolumeRaw": [
                340
            ],
            "__typename": [
                258
            ]
        },
        "CreditFacilityContract_select_column": {},
        "CreditFacilityContract_stream_cursor_input": {
            "initial_value": [
                19
            ],
            "ordering": [
                311
            ],
            "__typename": [
                258
            ]
        },
        "CreditFacilityContract_stream_cursor_value_input": {
            "borrowToken_id": [
                258
            ],
            "collateralToken_id": [
                258
            ],
            "createdAt": [
                337
            ],
            "db_write_timestamp": [
                357
            ],
            "id": [
                258
            ],
            "lastUpdatedAt": [
                337
            ],
            "market_id": [
                258
            ],
            "totalDebtFormatted": [
                258
            ],
            "totalDebtRaw": [
                337
            ],
            "totalLoans": [
                337
            ],
            "totalLockedCollateralFormatted": [
                258
            ],
            "totalLockedCollateralRaw": [
                337
            ],
            "totalVolumeFormatted": [
                258
            ],
            "totalVolumeRaw": [
                337
            ],
            "__typename": [
                258
            ]
        },
        "FeeDistribution": {
            "db_write_timestamp": [
                357
            ],
            "floorAmountFormatted": [
                258
            ],
            "floorAmountRaw": [
                337
            ],
            "id": [
                258
            ],
            "market_id": [
                258
            ],
            "stakingAmountFormatted": [
                258
            ],
            "stakingAmountRaw": [
                337
            ],
            "timestamp": [
                337
            ],
            "transactionHash": [
                258
            ],
            "treasuryAmountFormatted": [
                258
            ],
            "treasuryAmountRaw": [
                337
            ],
            "__typename": [
                258
            ]
        },
        "FeeDistribution_aggregate_order_by": {
            "avg": [
                22
            ],
            "count": [
                340
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
                258
            ]
        },
        "FeeDistribution_avg_order_by": {
            "floorAmountRaw": [
                340
            ],
            "stakingAmountRaw": [
                340
            ],
            "timestamp": [
                340
            ],
            "treasuryAmountRaw": [
                340
            ],
            "__typename": [
                258
            ]
        },
        "FeeDistribution_bool_exp": {
            "_and": [
                23
            ],
            "_not": [
                23
            ],
            "_or": [
                23
            ],
            "db_write_timestamp": [
                358
            ],
            "floorAmountFormatted": [
                260
            ],
            "floorAmountRaw": [
                339
            ],
            "id": [
                260
            ],
            "market_id": [
                260
            ],
            "stakingAmountFormatted": [
                260
            ],
            "stakingAmountRaw": [
                339
            ],
            "timestamp": [
                339
            ],
            "transactionHash": [
                260
            ],
            "treasuryAmountFormatted": [
                260
            ],
            "treasuryAmountRaw": [
                339
            ],
            "__typename": [
                258
            ]
        },
        "FeeDistribution_max_order_by": {
            "db_write_timestamp": [
                340
            ],
            "floorAmountFormatted": [
                340
            ],
            "floorAmountRaw": [
                340
            ],
            "id": [
                340
            ],
            "market_id": [
                340
            ],
            "stakingAmountFormatted": [
                340
            ],
            "stakingAmountRaw": [
                340
            ],
            "timestamp": [
                340
            ],
            "transactionHash": [
                340
            ],
            "treasuryAmountFormatted": [
                340
            ],
            "treasuryAmountRaw": [
                340
            ],
            "__typename": [
                258
            ]
        },
        "FeeDistribution_min_order_by": {
            "db_write_timestamp": [
                340
            ],
            "floorAmountFormatted": [
                340
            ],
            "floorAmountRaw": [
                340
            ],
            "id": [
                340
            ],
            "market_id": [
                340
            ],
            "stakingAmountFormatted": [
                340
            ],
            "stakingAmountRaw": [
                340
            ],
            "timestamp": [
                340
            ],
            "transactionHash": [
                340
            ],
            "treasuryAmountFormatted": [
                340
            ],
            "treasuryAmountRaw": [
                340
            ],
            "__typename": [
                258
            ]
        },
        "FeeDistribution_order_by": {
            "db_write_timestamp": [
                340
            ],
            "floorAmountFormatted": [
                340
            ],
            "floorAmountRaw": [
                340
            ],
            "id": [
                340
            ],
            "market_id": [
                340
            ],
            "stakingAmountFormatted": [
                340
            ],
            "stakingAmountRaw": [
                340
            ],
            "timestamp": [
                340
            ],
            "transactionHash": [
                340
            ],
            "treasuryAmountFormatted": [
                340
            ],
            "treasuryAmountRaw": [
                340
            ],
            "__typename": [
                258
            ]
        },
        "FeeDistribution_select_column": {},
        "FeeDistribution_stddev_order_by": {
            "floorAmountRaw": [
                340
            ],
            "stakingAmountRaw": [
                340
            ],
            "timestamp": [
                340
            ],
            "treasuryAmountRaw": [
                340
            ],
            "__typename": [
                258
            ]
        },
        "FeeDistribution_stddev_pop_order_by": {
            "floorAmountRaw": [
                340
            ],
            "stakingAmountRaw": [
                340
            ],
            "timestamp": [
                340
            ],
            "treasuryAmountRaw": [
                340
            ],
            "__typename": [
                258
            ]
        },
        "FeeDistribution_stddev_samp_order_by": {
            "floorAmountRaw": [
                340
            ],
            "stakingAmountRaw": [
                340
            ],
            "timestamp": [
                340
            ],
            "treasuryAmountRaw": [
                340
            ],
            "__typename": [
                258
            ]
        },
        "FeeDistribution_stream_cursor_input": {
            "initial_value": [
                32
            ],
            "ordering": [
                311
            ],
            "__typename": [
                258
            ]
        },
        "FeeDistribution_stream_cursor_value_input": {
            "db_write_timestamp": [
                357
            ],
            "floorAmountFormatted": [
                258
            ],
            "floorAmountRaw": [
                337
            ],
            "id": [
                258
            ],
            "market_id": [
                258
            ],
            "stakingAmountFormatted": [
                258
            ],
            "stakingAmountRaw": [
                337
            ],
            "timestamp": [
                337
            ],
            "transactionHash": [
                258
            ],
            "treasuryAmountFormatted": [
                258
            ],
            "treasuryAmountRaw": [
                337
            ],
            "__typename": [
                258
            ]
        },
        "FeeDistribution_sum_order_by": {
            "floorAmountRaw": [
                340
            ],
            "stakingAmountRaw": [
                340
            ],
            "timestamp": [
                340
            ],
            "treasuryAmountRaw": [
                340
            ],
            "__typename": [
                258
            ]
        },
        "FeeDistribution_var_pop_order_by": {
            "floorAmountRaw": [
                340
            ],
            "stakingAmountRaw": [
                340
            ],
            "timestamp": [
                340
            ],
            "treasuryAmountRaw": [
                340
            ],
            "__typename": [
                258
            ]
        },
        "FeeDistribution_var_samp_order_by": {
            "floorAmountRaw": [
                340
            ],
            "stakingAmountRaw": [
                340
            ],
            "timestamp": [
                340
            ],
            "treasuryAmountRaw": [
                340
            ],
            "__typename": [
                258
            ]
        },
        "FeeDistribution_variance_order_by": {
            "floorAmountRaw": [
                340
            ],
            "stakingAmountRaw": [
                340
            ],
            "timestamp": [
                340
            ],
            "treasuryAmountRaw": [
                340
            ],
            "__typename": [
                258
            ]
        },
        "FloorElevation": {
            "db_write_timestamp": [
                357
            ],
            "deployedAmountFormatted": [
                258
            ],
            "deployedAmountRaw": [
                337
            ],
            "id": [
                258
            ],
            "market_id": [
                258
            ],
            "newFloorPriceFormatted": [
                258
            ],
            "newFloorPriceRaw": [
                337
            ],
            "oldFloorPriceFormatted": [
                258
            ],
            "oldFloorPriceRaw": [
                337
            ],
            "timestamp": [
                337
            ],
            "transactionHash": [
                258
            ],
            "__typename": [
                258
            ]
        },
        "FloorElevation_aggregate_order_by": {
            "avg": [
                39
            ],
            "count": [
                340
            ],
            "max": [
                41
            ],
            "min": [
                42
            ],
            "stddev": [
                45
            ],
            "stddev_pop": [
                46
            ],
            "stddev_samp": [
                47
            ],
            "sum": [
                50
            ],
            "var_pop": [
                51
            ],
            "var_samp": [
                52
            ],
            "variance": [
                53
            ],
            "__typename": [
                258
            ]
        },
        "FloorElevation_avg_order_by": {
            "deployedAmountRaw": [
                340
            ],
            "newFloorPriceRaw": [
                340
            ],
            "oldFloorPriceRaw": [
                340
            ],
            "timestamp": [
                340
            ],
            "__typename": [
                258
            ]
        },
        "FloorElevation_bool_exp": {
            "_and": [
                40
            ],
            "_not": [
                40
            ],
            "_or": [
                40
            ],
            "db_write_timestamp": [
                358
            ],
            "deployedAmountFormatted": [
                260
            ],
            "deployedAmountRaw": [
                339
            ],
            "id": [
                260
            ],
            "market_id": [
                260
            ],
            "newFloorPriceFormatted": [
                260
            ],
            "newFloorPriceRaw": [
                339
            ],
            "oldFloorPriceFormatted": [
                260
            ],
            "oldFloorPriceRaw": [
                339
            ],
            "timestamp": [
                339
            ],
            "transactionHash": [
                260
            ],
            "__typename": [
                258
            ]
        },
        "FloorElevation_max_order_by": {
            "db_write_timestamp": [
                340
            ],
            "deployedAmountFormatted": [
                340
            ],
            "deployedAmountRaw": [
                340
            ],
            "id": [
                340
            ],
            "market_id": [
                340
            ],
            "newFloorPriceFormatted": [
                340
            ],
            "newFloorPriceRaw": [
                340
            ],
            "oldFloorPriceFormatted": [
                340
            ],
            "oldFloorPriceRaw": [
                340
            ],
            "timestamp": [
                340
            ],
            "transactionHash": [
                340
            ],
            "__typename": [
                258
            ]
        },
        "FloorElevation_min_order_by": {
            "db_write_timestamp": [
                340
            ],
            "deployedAmountFormatted": [
                340
            ],
            "deployedAmountRaw": [
                340
            ],
            "id": [
                340
            ],
            "market_id": [
                340
            ],
            "newFloorPriceFormatted": [
                340
            ],
            "newFloorPriceRaw": [
                340
            ],
            "oldFloorPriceFormatted": [
                340
            ],
            "oldFloorPriceRaw": [
                340
            ],
            "timestamp": [
                340
            ],
            "transactionHash": [
                340
            ],
            "__typename": [
                258
            ]
        },
        "FloorElevation_order_by": {
            "db_write_timestamp": [
                340
            ],
            "deployedAmountFormatted": [
                340
            ],
            "deployedAmountRaw": [
                340
            ],
            "id": [
                340
            ],
            "market_id": [
                340
            ],
            "newFloorPriceFormatted": [
                340
            ],
            "newFloorPriceRaw": [
                340
            ],
            "oldFloorPriceFormatted": [
                340
            ],
            "oldFloorPriceRaw": [
                340
            ],
            "timestamp": [
                340
            ],
            "transactionHash": [
                340
            ],
            "__typename": [
                258
            ]
        },
        "FloorElevation_select_column": {},
        "FloorElevation_stddev_order_by": {
            "deployedAmountRaw": [
                340
            ],
            "newFloorPriceRaw": [
                340
            ],
            "oldFloorPriceRaw": [
                340
            ],
            "timestamp": [
                340
            ],
            "__typename": [
                258
            ]
        },
        "FloorElevation_stddev_pop_order_by": {
            "deployedAmountRaw": [
                340
            ],
            "newFloorPriceRaw": [
                340
            ],
            "oldFloorPriceRaw": [
                340
            ],
            "timestamp": [
                340
            ],
            "__typename": [
                258
            ]
        },
        "FloorElevation_stddev_samp_order_by": {
            "deployedAmountRaw": [
                340
            ],
            "newFloorPriceRaw": [
                340
            ],
            "oldFloorPriceRaw": [
                340
            ],
            "timestamp": [
                340
            ],
            "__typename": [
                258
            ]
        },
        "FloorElevation_stream_cursor_input": {
            "initial_value": [
                49
            ],
            "ordering": [
                311
            ],
            "__typename": [
                258
            ]
        },
        "FloorElevation_stream_cursor_value_input": {
            "db_write_timestamp": [
                357
            ],
            "deployedAmountFormatted": [
                258
            ],
            "deployedAmountRaw": [
                337
            ],
            "id": [
                258
            ],
            "market_id": [
                258
            ],
            "newFloorPriceFormatted": [
                258
            ],
            "newFloorPriceRaw": [
                337
            ],
            "oldFloorPriceFormatted": [
                258
            ],
            "oldFloorPriceRaw": [
                337
            ],
            "timestamp": [
                337
            ],
            "transactionHash": [
                258
            ],
            "__typename": [
                258
            ]
        },
        "FloorElevation_sum_order_by": {
            "deployedAmountRaw": [
                340
            ],
            "newFloorPriceRaw": [
                340
            ],
            "oldFloorPriceRaw": [
                340
            ],
            "timestamp": [
                340
            ],
            "__typename": [
                258
            ]
        },
        "FloorElevation_var_pop_order_by": {
            "deployedAmountRaw": [
                340
            ],
            "newFloorPriceRaw": [
                340
            ],
            "oldFloorPriceRaw": [
                340
            ],
            "timestamp": [
                340
            ],
            "__typename": [
                258
            ]
        },
        "FloorElevation_var_samp_order_by": {
            "deployedAmountRaw": [
                340
            ],
            "newFloorPriceRaw": [
                340
            ],
            "oldFloorPriceRaw": [
                340
            ],
            "timestamp": [
                340
            ],
            "__typename": [
                258
            ]
        },
        "FloorElevation_variance_order_by": {
            "deployedAmountRaw": [
                340
            ],
            "newFloorPriceRaw": [
                340
            ],
            "oldFloorPriceRaw": [
                340
            ],
            "timestamp": [
                340
            ],
            "__typename": [
                258
            ]
        },
        "GlobalStats": {
            "activeMarkets": [
                337
            ],
            "db_write_timestamp": [
                357
            ],
            "id": [
                258
            ],
            "lastUpdatedAt": [
                337
            ],
            "totalLockedCollateralFormatted": [
                258
            ],
            "totalLockedCollateralRaw": [
                337
            ],
            "totalMarkets": [
                337
            ],
            "totalOutstandingDebtFormatted": [
                258
            ],
            "totalOutstandingDebtRaw": [
                337
            ],
            "totalVolumeFormatted": [
                258
            ],
            "totalVolumeRaw": [
                337
            ],
            "__typename": [
                258
            ]
        },
        "GlobalStats_bool_exp": {
            "_and": [
                55
            ],
            "_not": [
                55
            ],
            "_or": [
                55
            ],
            "activeMarkets": [
                339
            ],
            "db_write_timestamp": [
                358
            ],
            "id": [
                260
            ],
            "lastUpdatedAt": [
                339
            ],
            "totalLockedCollateralFormatted": [
                260
            ],
            "totalLockedCollateralRaw": [
                339
            ],
            "totalMarkets": [
                339
            ],
            "totalOutstandingDebtFormatted": [
                260
            ],
            "totalOutstandingDebtRaw": [
                339
            ],
            "totalVolumeFormatted": [
                260
            ],
            "totalVolumeRaw": [
                339
            ],
            "__typename": [
                258
            ]
        },
        "GlobalStats_order_by": {
            "activeMarkets": [
                340
            ],
            "db_write_timestamp": [
                340
            ],
            "id": [
                340
            ],
            "lastUpdatedAt": [
                340
            ],
            "totalLockedCollateralFormatted": [
                340
            ],
            "totalLockedCollateralRaw": [
                340
            ],
            "totalMarkets": [
                340
            ],
            "totalOutstandingDebtFormatted": [
                340
            ],
            "totalOutstandingDebtRaw": [
                340
            ],
            "totalVolumeFormatted": [
                340
            ],
            "totalVolumeRaw": [
                340
            ],
            "__typename": [
                258
            ]
        },
        "GlobalStats_select_column": {},
        "GlobalStats_stream_cursor_input": {
            "initial_value": [
                59
            ],
            "ordering": [
                311
            ],
            "__typename": [
                258
            ]
        },
        "GlobalStats_stream_cursor_value_input": {
            "activeMarkets": [
                337
            ],
            "db_write_timestamp": [
                357
            ],
            "id": [
                258
            ],
            "lastUpdatedAt": [
                337
            ],
            "totalLockedCollateralFormatted": [
                258
            ],
            "totalLockedCollateralRaw": [
                337
            ],
            "totalMarkets": [
                337
            ],
            "totalOutstandingDebtFormatted": [
                258
            ],
            "totalOutstandingDebtRaw": [
                337
            ],
            "totalVolumeFormatted": [
                258
            ],
            "totalVolumeRaw": [
                337
            ],
            "__typename": [
                258
            ]
        },
        "Int": {},
        "Int_array_comparison_exp": {
            "_contained_in": [
                60
            ],
            "_contains": [
                60
            ],
            "_eq": [
                60
            ],
            "_gt": [
                60
            ],
            "_gte": [
                60
            ],
            "_in": [
                60
            ],
            "_is_null": [
                12
            ],
            "_lt": [
                60
            ],
            "_lte": [
                60
            ],
            "_neq": [
                60
            ],
            "_nin": [
                60
            ],
            "__typename": [
                258
            ]
        },
        "Int_comparison_exp": {
            "_eq": [
                60
            ],
            "_gt": [
                60
            ],
            "_gte": [
                60
            ],
            "_in": [
                60
            ],
            "_is_null": [
                12
            ],
            "_lt": [
                60
            ],
            "_lte": [
                60
            ],
            "_neq": [
                60
            ],
            "_nin": [
                60
            ],
            "__typename": [
                258
            ]
        },
        "Loan": {
            "borrowAmountFormatted": [
                258
            ],
            "borrowAmountRaw": [
                337
            ],
            "borrower_id": [
                258
            ],
            "closedAt": [
                337
            ],
            "db_write_timestamp": [
                357
            ],
            "facility_id": [
                258
            ],
            "floorPriceAtBorrowFormatted": [
                258
            ],
            "floorPriceAtBorrowRaw": [
                337
            ],
            "id": [
                258
            ],
            "lastUpdatedAt": [
                337
            ],
            "lockedCollateralFormatted": [
                258
            ],
            "lockedCollateralRaw": [
                337
            ],
            "market_id": [
                258
            ],
            "openedAt": [
                337
            ],
            "originationFeeFormatted": [
                258
            ],
            "originationFeeRaw": [
                337
            ],
            "remainingDebtFormatted": [
                258
            ],
            "remainingDebtRaw": [
                337
            ],
            "status": [
                333
            ],
            "statusHistory": [
                64,
                {
                    "distinct_on": [
                        71,
                        "[LoanStatusHistory_select_column!]"
                    ],
                    "limit": [
                        60
                    ],
                    "offset": [
                        60
                    ],
                    "order_by": [
                        70,
                        "[LoanStatusHistory_order_by!]"
                    ],
                    "where": [
                        67
                    ]
                }
            ],
            "transactionHash": [
                258
            ],
            "__typename": [
                258
            ]
        },
        "LoanStatusHistory": {
            "db_write_timestamp": [
                357
            ],
            "id": [
                258
            ],
            "loan_id": [
                258
            ],
            "lockedCollateralFormatted": [
                258
            ],
            "lockedCollateralRaw": [
                337
            ],
            "remainingDebtFormatted": [
                258
            ],
            "remainingDebtRaw": [
                337
            ],
            "status": [
                333
            ],
            "timestamp": [
                337
            ],
            "transactionHash": [
                258
            ],
            "__typename": [
                258
            ]
        },
        "LoanStatusHistory_aggregate_order_by": {
            "avg": [
                66
            ],
            "count": [
                340
            ],
            "max": [
                68
            ],
            "min": [
                69
            ],
            "stddev": [
                72
            ],
            "stddev_pop": [
                73
            ],
            "stddev_samp": [
                74
            ],
            "sum": [
                77
            ],
            "var_pop": [
                78
            ],
            "var_samp": [
                79
            ],
            "variance": [
                80
            ],
            "__typename": [
                258
            ]
        },
        "LoanStatusHistory_avg_order_by": {
            "lockedCollateralRaw": [
                340
            ],
            "remainingDebtRaw": [
                340
            ],
            "timestamp": [
                340
            ],
            "__typename": [
                258
            ]
        },
        "LoanStatusHistory_bool_exp": {
            "_and": [
                67
            ],
            "_not": [
                67
            ],
            "_or": [
                67
            ],
            "db_write_timestamp": [
                358
            ],
            "id": [
                260
            ],
            "loan_id": [
                260
            ],
            "lockedCollateralFormatted": [
                260
            ],
            "lockedCollateralRaw": [
                339
            ],
            "remainingDebtFormatted": [
                260
            ],
            "remainingDebtRaw": [
                339
            ],
            "status": [
                334
            ],
            "timestamp": [
                339
            ],
            "transactionHash": [
                260
            ],
            "__typename": [
                258
            ]
        },
        "LoanStatusHistory_max_order_by": {
            "db_write_timestamp": [
                340
            ],
            "id": [
                340
            ],
            "loan_id": [
                340
            ],
            "lockedCollateralFormatted": [
                340
            ],
            "lockedCollateralRaw": [
                340
            ],
            "remainingDebtFormatted": [
                340
            ],
            "remainingDebtRaw": [
                340
            ],
            "status": [
                340
            ],
            "timestamp": [
                340
            ],
            "transactionHash": [
                340
            ],
            "__typename": [
                258
            ]
        },
        "LoanStatusHistory_min_order_by": {
            "db_write_timestamp": [
                340
            ],
            "id": [
                340
            ],
            "loan_id": [
                340
            ],
            "lockedCollateralFormatted": [
                340
            ],
            "lockedCollateralRaw": [
                340
            ],
            "remainingDebtFormatted": [
                340
            ],
            "remainingDebtRaw": [
                340
            ],
            "status": [
                340
            ],
            "timestamp": [
                340
            ],
            "transactionHash": [
                340
            ],
            "__typename": [
                258
            ]
        },
        "LoanStatusHistory_order_by": {
            "db_write_timestamp": [
                340
            ],
            "id": [
                340
            ],
            "loan_id": [
                340
            ],
            "lockedCollateralFormatted": [
                340
            ],
            "lockedCollateralRaw": [
                340
            ],
            "remainingDebtFormatted": [
                340
            ],
            "remainingDebtRaw": [
                340
            ],
            "status": [
                340
            ],
            "timestamp": [
                340
            ],
            "transactionHash": [
                340
            ],
            "__typename": [
                258
            ]
        },
        "LoanStatusHistory_select_column": {},
        "LoanStatusHistory_stddev_order_by": {
            "lockedCollateralRaw": [
                340
            ],
            "remainingDebtRaw": [
                340
            ],
            "timestamp": [
                340
            ],
            "__typename": [
                258
            ]
        },
        "LoanStatusHistory_stddev_pop_order_by": {
            "lockedCollateralRaw": [
                340
            ],
            "remainingDebtRaw": [
                340
            ],
            "timestamp": [
                340
            ],
            "__typename": [
                258
            ]
        },
        "LoanStatusHistory_stddev_samp_order_by": {
            "lockedCollateralRaw": [
                340
            ],
            "remainingDebtRaw": [
                340
            ],
            "timestamp": [
                340
            ],
            "__typename": [
                258
            ]
        },
        "LoanStatusHistory_stream_cursor_input": {
            "initial_value": [
                76
            ],
            "ordering": [
                311
            ],
            "__typename": [
                258
            ]
        },
        "LoanStatusHistory_stream_cursor_value_input": {
            "db_write_timestamp": [
                357
            ],
            "id": [
                258
            ],
            "loan_id": [
                258
            ],
            "lockedCollateralFormatted": [
                258
            ],
            "lockedCollateralRaw": [
                337
            ],
            "remainingDebtFormatted": [
                258
            ],
            "remainingDebtRaw": [
                337
            ],
            "status": [
                333
            ],
            "timestamp": [
                337
            ],
            "transactionHash": [
                258
            ],
            "__typename": [
                258
            ]
        },
        "LoanStatusHistory_sum_order_by": {
            "lockedCollateralRaw": [
                340
            ],
            "remainingDebtRaw": [
                340
            ],
            "timestamp": [
                340
            ],
            "__typename": [
                258
            ]
        },
        "LoanStatusHistory_var_pop_order_by": {
            "lockedCollateralRaw": [
                340
            ],
            "remainingDebtRaw": [
                340
            ],
            "timestamp": [
                340
            ],
            "__typename": [
                258
            ]
        },
        "LoanStatusHistory_var_samp_order_by": {
            "lockedCollateralRaw": [
                340
            ],
            "remainingDebtRaw": [
                340
            ],
            "timestamp": [
                340
            ],
            "__typename": [
                258
            ]
        },
        "LoanStatusHistory_variance_order_by": {
            "lockedCollateralRaw": [
                340
            ],
            "remainingDebtRaw": [
                340
            ],
            "timestamp": [
                340
            ],
            "__typename": [
                258
            ]
        },
        "Loan_aggregate_order_by": {
            "avg": [
                82
            ],
            "count": [
                340
            ],
            "max": [
                84
            ],
            "min": [
                85
            ],
            "stddev": [
                88
            ],
            "stddev_pop": [
                89
            ],
            "stddev_samp": [
                90
            ],
            "sum": [
                93
            ],
            "var_pop": [
                94
            ],
            "var_samp": [
                95
            ],
            "variance": [
                96
            ],
            "__typename": [
                258
            ]
        },
        "Loan_avg_order_by": {
            "borrowAmountRaw": [
                340
            ],
            "closedAt": [
                340
            ],
            "floorPriceAtBorrowRaw": [
                340
            ],
            "lastUpdatedAt": [
                340
            ],
            "lockedCollateralRaw": [
                340
            ],
            "openedAt": [
                340
            ],
            "originationFeeRaw": [
                340
            ],
            "remainingDebtRaw": [
                340
            ],
            "__typename": [
                258
            ]
        },
        "Loan_bool_exp": {
            "_and": [
                83
            ],
            "_not": [
                83
            ],
            "_or": [
                83
            ],
            "borrowAmountFormatted": [
                260
            ],
            "borrowAmountRaw": [
                339
            ],
            "borrower_id": [
                260
            ],
            "closedAt": [
                339
            ],
            "db_write_timestamp": [
                358
            ],
            "facility_id": [
                260
            ],
            "floorPriceAtBorrowFormatted": [
                260
            ],
            "floorPriceAtBorrowRaw": [
                339
            ],
            "id": [
                260
            ],
            "lastUpdatedAt": [
                339
            ],
            "lockedCollateralFormatted": [
                260
            ],
            "lockedCollateralRaw": [
                339
            ],
            "market_id": [
                260
            ],
            "openedAt": [
                339
            ],
            "originationFeeFormatted": [
                260
            ],
            "originationFeeRaw": [
                339
            ],
            "remainingDebtFormatted": [
                260
            ],
            "remainingDebtRaw": [
                339
            ],
            "status": [
                334
            ],
            "statusHistory": [
                67
            ],
            "transactionHash": [
                260
            ],
            "__typename": [
                258
            ]
        },
        "Loan_max_order_by": {
            "borrowAmountFormatted": [
                340
            ],
            "borrowAmountRaw": [
                340
            ],
            "borrower_id": [
                340
            ],
            "closedAt": [
                340
            ],
            "db_write_timestamp": [
                340
            ],
            "facility_id": [
                340
            ],
            "floorPriceAtBorrowFormatted": [
                340
            ],
            "floorPriceAtBorrowRaw": [
                340
            ],
            "id": [
                340
            ],
            "lastUpdatedAt": [
                340
            ],
            "lockedCollateralFormatted": [
                340
            ],
            "lockedCollateralRaw": [
                340
            ],
            "market_id": [
                340
            ],
            "openedAt": [
                340
            ],
            "originationFeeFormatted": [
                340
            ],
            "originationFeeRaw": [
                340
            ],
            "remainingDebtFormatted": [
                340
            ],
            "remainingDebtRaw": [
                340
            ],
            "status": [
                340
            ],
            "transactionHash": [
                340
            ],
            "__typename": [
                258
            ]
        },
        "Loan_min_order_by": {
            "borrowAmountFormatted": [
                340
            ],
            "borrowAmountRaw": [
                340
            ],
            "borrower_id": [
                340
            ],
            "closedAt": [
                340
            ],
            "db_write_timestamp": [
                340
            ],
            "facility_id": [
                340
            ],
            "floorPriceAtBorrowFormatted": [
                340
            ],
            "floorPriceAtBorrowRaw": [
                340
            ],
            "id": [
                340
            ],
            "lastUpdatedAt": [
                340
            ],
            "lockedCollateralFormatted": [
                340
            ],
            "lockedCollateralRaw": [
                340
            ],
            "market_id": [
                340
            ],
            "openedAt": [
                340
            ],
            "originationFeeFormatted": [
                340
            ],
            "originationFeeRaw": [
                340
            ],
            "remainingDebtFormatted": [
                340
            ],
            "remainingDebtRaw": [
                340
            ],
            "status": [
                340
            ],
            "transactionHash": [
                340
            ],
            "__typename": [
                258
            ]
        },
        "Loan_order_by": {
            "borrowAmountFormatted": [
                340
            ],
            "borrowAmountRaw": [
                340
            ],
            "borrower_id": [
                340
            ],
            "closedAt": [
                340
            ],
            "db_write_timestamp": [
                340
            ],
            "facility_id": [
                340
            ],
            "floorPriceAtBorrowFormatted": [
                340
            ],
            "floorPriceAtBorrowRaw": [
                340
            ],
            "id": [
                340
            ],
            "lastUpdatedAt": [
                340
            ],
            "lockedCollateralFormatted": [
                340
            ],
            "lockedCollateralRaw": [
                340
            ],
            "market_id": [
                340
            ],
            "openedAt": [
                340
            ],
            "originationFeeFormatted": [
                340
            ],
            "originationFeeRaw": [
                340
            ],
            "remainingDebtFormatted": [
                340
            ],
            "remainingDebtRaw": [
                340
            ],
            "status": [
                340
            ],
            "statusHistory_aggregate": [
                65
            ],
            "transactionHash": [
                340
            ],
            "__typename": [
                258
            ]
        },
        "Loan_select_column": {},
        "Loan_stddev_order_by": {
            "borrowAmountRaw": [
                340
            ],
            "closedAt": [
                340
            ],
            "floorPriceAtBorrowRaw": [
                340
            ],
            "lastUpdatedAt": [
                340
            ],
            "lockedCollateralRaw": [
                340
            ],
            "openedAt": [
                340
            ],
            "originationFeeRaw": [
                340
            ],
            "remainingDebtRaw": [
                340
            ],
            "__typename": [
                258
            ]
        },
        "Loan_stddev_pop_order_by": {
            "borrowAmountRaw": [
                340
            ],
            "closedAt": [
                340
            ],
            "floorPriceAtBorrowRaw": [
                340
            ],
            "lastUpdatedAt": [
                340
            ],
            "lockedCollateralRaw": [
                340
            ],
            "openedAt": [
                340
            ],
            "originationFeeRaw": [
                340
            ],
            "remainingDebtRaw": [
                340
            ],
            "__typename": [
                258
            ]
        },
        "Loan_stddev_samp_order_by": {
            "borrowAmountRaw": [
                340
            ],
            "closedAt": [
                340
            ],
            "floorPriceAtBorrowRaw": [
                340
            ],
            "lastUpdatedAt": [
                340
            ],
            "lockedCollateralRaw": [
                340
            ],
            "openedAt": [
                340
            ],
            "originationFeeRaw": [
                340
            ],
            "remainingDebtRaw": [
                340
            ],
            "__typename": [
                258
            ]
        },
        "Loan_stream_cursor_input": {
            "initial_value": [
                92
            ],
            "ordering": [
                311
            ],
            "__typename": [
                258
            ]
        },
        "Loan_stream_cursor_value_input": {
            "borrowAmountFormatted": [
                258
            ],
            "borrowAmountRaw": [
                337
            ],
            "borrower_id": [
                258
            ],
            "closedAt": [
                337
            ],
            "db_write_timestamp": [
                357
            ],
            "facility_id": [
                258
            ],
            "floorPriceAtBorrowFormatted": [
                258
            ],
            "floorPriceAtBorrowRaw": [
                337
            ],
            "id": [
                258
            ],
            "lastUpdatedAt": [
                337
            ],
            "lockedCollateralFormatted": [
                258
            ],
            "lockedCollateralRaw": [
                337
            ],
            "market_id": [
                258
            ],
            "openedAt": [
                337
            ],
            "originationFeeFormatted": [
                258
            ],
            "originationFeeRaw": [
                337
            ],
            "remainingDebtFormatted": [
                258
            ],
            "remainingDebtRaw": [
                337
            ],
            "status": [
                333
            ],
            "transactionHash": [
                258
            ],
            "__typename": [
                258
            ]
        },
        "Loan_sum_order_by": {
            "borrowAmountRaw": [
                340
            ],
            "closedAt": [
                340
            ],
            "floorPriceAtBorrowRaw": [
                340
            ],
            "lastUpdatedAt": [
                340
            ],
            "lockedCollateralRaw": [
                340
            ],
            "openedAt": [
                340
            ],
            "originationFeeRaw": [
                340
            ],
            "remainingDebtRaw": [
                340
            ],
            "__typename": [
                258
            ]
        },
        "Loan_var_pop_order_by": {
            "borrowAmountRaw": [
                340
            ],
            "closedAt": [
                340
            ],
            "floorPriceAtBorrowRaw": [
                340
            ],
            "lastUpdatedAt": [
                340
            ],
            "lockedCollateralRaw": [
                340
            ],
            "openedAt": [
                340
            ],
            "originationFeeRaw": [
                340
            ],
            "remainingDebtRaw": [
                340
            ],
            "__typename": [
                258
            ]
        },
        "Loan_var_samp_order_by": {
            "borrowAmountRaw": [
                340
            ],
            "closedAt": [
                340
            ],
            "floorPriceAtBorrowRaw": [
                340
            ],
            "lastUpdatedAt": [
                340
            ],
            "lockedCollateralRaw": [
                340
            ],
            "openedAt": [
                340
            ],
            "originationFeeRaw": [
                340
            ],
            "remainingDebtRaw": [
                340
            ],
            "__typename": [
                258
            ]
        },
        "Loan_variance_order_by": {
            "borrowAmountRaw": [
                340
            ],
            "closedAt": [
                340
            ],
            "floorPriceAtBorrowRaw": [
                340
            ],
            "lastUpdatedAt": [
                340
            ],
            "lockedCollateralRaw": [
                340
            ],
            "openedAt": [
                340
            ],
            "originationFeeRaw": [
                340
            ],
            "remainingDebtRaw": [
                340
            ],
            "__typename": [
                258
            ]
        },
        "Market": {
            "buyFeeBps": [
                337
            ],
            "createdAt": [
                337
            ],
            "creator_id": [
                258
            ],
            "currentPriceFormatted": [
                258
            ],
            "currentPriceRaw": [
                337
            ],
            "db_write_timestamp": [
                357
            ],
            "factory_id": [
                258
            ],
            "feeDistributions": [
                20,
                {
                    "distinct_on": [
                        27,
                        "[FeeDistribution_select_column!]"
                    ],
                    "limit": [
                        60
                    ],
                    "offset": [
                        60
                    ],
                    "order_by": [
                        26,
                        "[FeeDistribution_order_by!]"
                    ],
                    "where": [
                        23
                    ]
                }
            ],
            "floorElevations": [
                37,
                {
                    "distinct_on": [
                        44,
                        "[FloorElevation_select_column!]"
                    ],
                    "limit": [
                        60
                    ],
                    "offset": [
                        60
                    ],
                    "order_by": [
                        43,
                        "[FloorElevation_order_by!]"
                    ],
                    "where": [
                        40
                    ]
                }
            ],
            "floorPriceFormatted": [
                258
            ],
            "floorPriceRaw": [
                337
            ],
            "floorSupplyFormatted": [
                258
            ],
            "floorSupplyRaw": [
                337
            ],
            "id": [
                258
            ],
            "initialFloorPriceFormatted": [
                258
            ],
            "initialFloorPriceRaw": [
                337
            ],
            "isBuyOpen": [
                12
            ],
            "isSellOpen": [
                12
            ],
            "issuanceToken": [
                261
            ],
            "issuanceToken_id": [
                258
            ],
            "lastElevationTimestamp": [
                337
            ],
            "lastTradeTimestamp": [
                337
            ],
            "lastUpdatedAt": [
                337
            ],
            "marketSupplyFormatted": [
                258
            ],
            "marketSupplyRaw": [
                337
            ],
            "maxLTV": [
                337
            ],
            "reserveToken": [
                261
            ],
            "reserveToken_id": [
                258
            ],
            "sellFeeBps": [
                337
            ],
            "status": [
                335
            ],
            "totalSupplyFormatted": [
                258
            ],
            "totalSupplyRaw": [
                337
            ],
            "trades": [
                267,
                {
                    "distinct_on": [
                        274,
                        "[Trade_select_column!]"
                    ],
                    "limit": [
                        60
                    ],
                    "offset": [
                        60
                    ],
                    "order_by": [
                        273,
                        "[Trade_order_by!]"
                    ],
                    "where": [
                        270
                    ]
                }
            ],
            "tradingFeeBps": [
                337
            ],
            "__typename": [
                258
            ]
        },
        "MarketRollingStats": {
            "averagePriceFormatted": [
                258
            ],
            "averagePriceRaw": [
                337
            ],
            "db_write_timestamp": [
                357
            ],
            "id": [
                258
            ],
            "lastUpdatedAt": [
                337
            ],
            "market_id": [
                258
            ],
            "tradeCount": [
                337
            ],
            "volumeFormatted": [
                258
            ],
            "volumeRaw": [
                337
            ],
            "windowSeconds": [
                60
            ],
            "__typename": [
                258
            ]
        },
        "MarketRollingStats_bool_exp": {
            "_and": [
                99
            ],
            "_not": [
                99
            ],
            "_or": [
                99
            ],
            "averagePriceFormatted": [
                260
            ],
            "averagePriceRaw": [
                339
            ],
            "db_write_timestamp": [
                358
            ],
            "id": [
                260
            ],
            "lastUpdatedAt": [
                339
            ],
            "market_id": [
                260
            ],
            "tradeCount": [
                339
            ],
            "volumeFormatted": [
                260
            ],
            "volumeRaw": [
                339
            ],
            "windowSeconds": [
                62
            ],
            "__typename": [
                258
            ]
        },
        "MarketRollingStats_order_by": {
            "averagePriceFormatted": [
                340
            ],
            "averagePriceRaw": [
                340
            ],
            "db_write_timestamp": [
                340
            ],
            "id": [
                340
            ],
            "lastUpdatedAt": [
                340
            ],
            "market_id": [
                340
            ],
            "tradeCount": [
                340
            ],
            "volumeFormatted": [
                340
            ],
            "volumeRaw": [
                340
            ],
            "windowSeconds": [
                340
            ],
            "__typename": [
                258
            ]
        },
        "MarketRollingStats_select_column": {},
        "MarketRollingStats_stream_cursor_input": {
            "initial_value": [
                103
            ],
            "ordering": [
                311
            ],
            "__typename": [
                258
            ]
        },
        "MarketRollingStats_stream_cursor_value_input": {
            "averagePriceFormatted": [
                258
            ],
            "averagePriceRaw": [
                337
            ],
            "db_write_timestamp": [
                357
            ],
            "id": [
                258
            ],
            "lastUpdatedAt": [
                337
            ],
            "market_id": [
                258
            ],
            "tradeCount": [
                337
            ],
            "volumeFormatted": [
                258
            ],
            "volumeRaw": [
                337
            ],
            "windowSeconds": [
                60
            ],
            "__typename": [
                258
            ]
        },
        "MarketSnapshot": {
            "db_write_timestamp": [
                357
            ],
            "floorPriceFormatted": [
                258
            ],
            "floorPriceRaw": [
                337
            ],
            "id": [
                258
            ],
            "marketSupplyFormatted": [
                258
            ],
            "marketSupplyRaw": [
                337
            ],
            "market_id": [
                258
            ],
            "priceFormatted": [
                258
            ],
            "priceRaw": [
                337
            ],
            "timestamp": [
                337
            ],
            "totalSupplyFormatted": [
                258
            ],
            "totalSupplyRaw": [
                337
            ],
            "trades24h": [
                337
            ],
            "volume24hFormatted": [
                258
            ],
            "volume24hRaw": [
                337
            ],
            "__typename": [
                258
            ]
        },
        "MarketSnapshot_bool_exp": {
            "_and": [
                105
            ],
            "_not": [
                105
            ],
            "_or": [
                105
            ],
            "db_write_timestamp": [
                358
            ],
            "floorPriceFormatted": [
                260
            ],
            "floorPriceRaw": [
                339
            ],
            "id": [
                260
            ],
            "marketSupplyFormatted": [
                260
            ],
            "marketSupplyRaw": [
                339
            ],
            "market_id": [
                260
            ],
            "priceFormatted": [
                260
            ],
            "priceRaw": [
                339
            ],
            "timestamp": [
                339
            ],
            "totalSupplyFormatted": [
                260
            ],
            "totalSupplyRaw": [
                339
            ],
            "trades24h": [
                339
            ],
            "volume24hFormatted": [
                260
            ],
            "volume24hRaw": [
                339
            ],
            "__typename": [
                258
            ]
        },
        "MarketSnapshot_order_by": {
            "db_write_timestamp": [
                340
            ],
            "floorPriceFormatted": [
                340
            ],
            "floorPriceRaw": [
                340
            ],
            "id": [
                340
            ],
            "marketSupplyFormatted": [
                340
            ],
            "marketSupplyRaw": [
                340
            ],
            "market_id": [
                340
            ],
            "priceFormatted": [
                340
            ],
            "priceRaw": [
                340
            ],
            "timestamp": [
                340
            ],
            "totalSupplyFormatted": [
                340
            ],
            "totalSupplyRaw": [
                340
            ],
            "trades24h": [
                340
            ],
            "volume24hFormatted": [
                340
            ],
            "volume24hRaw": [
                340
            ],
            "__typename": [
                258
            ]
        },
        "MarketSnapshot_select_column": {},
        "MarketSnapshot_stream_cursor_input": {
            "initial_value": [
                109
            ],
            "ordering": [
                311
            ],
            "__typename": [
                258
            ]
        },
        "MarketSnapshot_stream_cursor_value_input": {
            "db_write_timestamp": [
                357
            ],
            "floorPriceFormatted": [
                258
            ],
            "floorPriceRaw": [
                337
            ],
            "id": [
                258
            ],
            "marketSupplyFormatted": [
                258
            ],
            "marketSupplyRaw": [
                337
            ],
            "market_id": [
                258
            ],
            "priceFormatted": [
                258
            ],
            "priceRaw": [
                337
            ],
            "timestamp": [
                337
            ],
            "totalSupplyFormatted": [
                258
            ],
            "totalSupplyRaw": [
                337
            ],
            "trades24h": [
                337
            ],
            "volume24hFormatted": [
                258
            ],
            "volume24hRaw": [
                337
            ],
            "__typename": [
                258
            ]
        },
        "Market_aggregate_order_by": {
            "avg": [
                111
            ],
            "count": [
                340
            ],
            "max": [
                113
            ],
            "min": [
                114
            ],
            "stddev": [
                117
            ],
            "stddev_pop": [
                118
            ],
            "stddev_samp": [
                119
            ],
            "sum": [
                122
            ],
            "var_pop": [
                123
            ],
            "var_samp": [
                124
            ],
            "variance": [
                125
            ],
            "__typename": [
                258
            ]
        },
        "Market_avg_order_by": {
            "buyFeeBps": [
                340
            ],
            "createdAt": [
                340
            ],
            "currentPriceRaw": [
                340
            ],
            "floorPriceRaw": [
                340
            ],
            "floorSupplyRaw": [
                340
            ],
            "initialFloorPriceRaw": [
                340
            ],
            "lastElevationTimestamp": [
                340
            ],
            "lastTradeTimestamp": [
                340
            ],
            "lastUpdatedAt": [
                340
            ],
            "marketSupplyRaw": [
                340
            ],
            "maxLTV": [
                340
            ],
            "sellFeeBps": [
                340
            ],
            "totalSupplyRaw": [
                340
            ],
            "tradingFeeBps": [
                340
            ],
            "__typename": [
                258
            ]
        },
        "Market_bool_exp": {
            "_and": [
                112
            ],
            "_not": [
                112
            ],
            "_or": [
                112
            ],
            "buyFeeBps": [
                339
            ],
            "createdAt": [
                339
            ],
            "creator_id": [
                260
            ],
            "currentPriceFormatted": [
                260
            ],
            "currentPriceRaw": [
                339
            ],
            "db_write_timestamp": [
                358
            ],
            "factory_id": [
                260
            ],
            "feeDistributions": [
                23
            ],
            "floorElevations": [
                40
            ],
            "floorPriceFormatted": [
                260
            ],
            "floorPriceRaw": [
                339
            ],
            "floorSupplyFormatted": [
                260
            ],
            "floorSupplyRaw": [
                339
            ],
            "id": [
                260
            ],
            "initialFloorPriceFormatted": [
                260
            ],
            "initialFloorPriceRaw": [
                339
            ],
            "isBuyOpen": [
                13
            ],
            "isSellOpen": [
                13
            ],
            "issuanceToken": [
                262
            ],
            "issuanceToken_id": [
                260
            ],
            "lastElevationTimestamp": [
                339
            ],
            "lastTradeTimestamp": [
                339
            ],
            "lastUpdatedAt": [
                339
            ],
            "marketSupplyFormatted": [
                260
            ],
            "marketSupplyRaw": [
                339
            ],
            "maxLTV": [
                339
            ],
            "reserveToken": [
                262
            ],
            "reserveToken_id": [
                260
            ],
            "sellFeeBps": [
                339
            ],
            "status": [
                336
            ],
            "totalSupplyFormatted": [
                260
            ],
            "totalSupplyRaw": [
                339
            ],
            "trades": [
                270
            ],
            "tradingFeeBps": [
                339
            ],
            "__typename": [
                258
            ]
        },
        "Market_max_order_by": {
            "buyFeeBps": [
                340
            ],
            "createdAt": [
                340
            ],
            "creator_id": [
                340
            ],
            "currentPriceFormatted": [
                340
            ],
            "currentPriceRaw": [
                340
            ],
            "db_write_timestamp": [
                340
            ],
            "factory_id": [
                340
            ],
            "floorPriceFormatted": [
                340
            ],
            "floorPriceRaw": [
                340
            ],
            "floorSupplyFormatted": [
                340
            ],
            "floorSupplyRaw": [
                340
            ],
            "id": [
                340
            ],
            "initialFloorPriceFormatted": [
                340
            ],
            "initialFloorPriceRaw": [
                340
            ],
            "issuanceToken_id": [
                340
            ],
            "lastElevationTimestamp": [
                340
            ],
            "lastTradeTimestamp": [
                340
            ],
            "lastUpdatedAt": [
                340
            ],
            "marketSupplyFormatted": [
                340
            ],
            "marketSupplyRaw": [
                340
            ],
            "maxLTV": [
                340
            ],
            "reserveToken_id": [
                340
            ],
            "sellFeeBps": [
                340
            ],
            "status": [
                340
            ],
            "totalSupplyFormatted": [
                340
            ],
            "totalSupplyRaw": [
                340
            ],
            "tradingFeeBps": [
                340
            ],
            "__typename": [
                258
            ]
        },
        "Market_min_order_by": {
            "buyFeeBps": [
                340
            ],
            "createdAt": [
                340
            ],
            "creator_id": [
                340
            ],
            "currentPriceFormatted": [
                340
            ],
            "currentPriceRaw": [
                340
            ],
            "db_write_timestamp": [
                340
            ],
            "factory_id": [
                340
            ],
            "floorPriceFormatted": [
                340
            ],
            "floorPriceRaw": [
                340
            ],
            "floorSupplyFormatted": [
                340
            ],
            "floorSupplyRaw": [
                340
            ],
            "id": [
                340
            ],
            "initialFloorPriceFormatted": [
                340
            ],
            "initialFloorPriceRaw": [
                340
            ],
            "issuanceToken_id": [
                340
            ],
            "lastElevationTimestamp": [
                340
            ],
            "lastTradeTimestamp": [
                340
            ],
            "lastUpdatedAt": [
                340
            ],
            "marketSupplyFormatted": [
                340
            ],
            "marketSupplyRaw": [
                340
            ],
            "maxLTV": [
                340
            ],
            "reserveToken_id": [
                340
            ],
            "sellFeeBps": [
                340
            ],
            "status": [
                340
            ],
            "totalSupplyFormatted": [
                340
            ],
            "totalSupplyRaw": [
                340
            ],
            "tradingFeeBps": [
                340
            ],
            "__typename": [
                258
            ]
        },
        "Market_order_by": {
            "buyFeeBps": [
                340
            ],
            "createdAt": [
                340
            ],
            "creator_id": [
                340
            ],
            "currentPriceFormatted": [
                340
            ],
            "currentPriceRaw": [
                340
            ],
            "db_write_timestamp": [
                340
            ],
            "factory_id": [
                340
            ],
            "feeDistributions_aggregate": [
                21
            ],
            "floorElevations_aggregate": [
                38
            ],
            "floorPriceFormatted": [
                340
            ],
            "floorPriceRaw": [
                340
            ],
            "floorSupplyFormatted": [
                340
            ],
            "floorSupplyRaw": [
                340
            ],
            "id": [
                340
            ],
            "initialFloorPriceFormatted": [
                340
            ],
            "initialFloorPriceRaw": [
                340
            ],
            "isBuyOpen": [
                340
            ],
            "isSellOpen": [
                340
            ],
            "issuanceToken": [
                263
            ],
            "issuanceToken_id": [
                340
            ],
            "lastElevationTimestamp": [
                340
            ],
            "lastTradeTimestamp": [
                340
            ],
            "lastUpdatedAt": [
                340
            ],
            "marketSupplyFormatted": [
                340
            ],
            "marketSupplyRaw": [
                340
            ],
            "maxLTV": [
                340
            ],
            "reserveToken": [
                263
            ],
            "reserveToken_id": [
                340
            ],
            "sellFeeBps": [
                340
            ],
            "status": [
                340
            ],
            "totalSupplyFormatted": [
                340
            ],
            "totalSupplyRaw": [
                340
            ],
            "trades_aggregate": [
                268
            ],
            "tradingFeeBps": [
                340
            ],
            "__typename": [
                258
            ]
        },
        "Market_select_column": {},
        "Market_stddev_order_by": {
            "buyFeeBps": [
                340
            ],
            "createdAt": [
                340
            ],
            "currentPriceRaw": [
                340
            ],
            "floorPriceRaw": [
                340
            ],
            "floorSupplyRaw": [
                340
            ],
            "initialFloorPriceRaw": [
                340
            ],
            "lastElevationTimestamp": [
                340
            ],
            "lastTradeTimestamp": [
                340
            ],
            "lastUpdatedAt": [
                340
            ],
            "marketSupplyRaw": [
                340
            ],
            "maxLTV": [
                340
            ],
            "sellFeeBps": [
                340
            ],
            "totalSupplyRaw": [
                340
            ],
            "tradingFeeBps": [
                340
            ],
            "__typename": [
                258
            ]
        },
        "Market_stddev_pop_order_by": {
            "buyFeeBps": [
                340
            ],
            "createdAt": [
                340
            ],
            "currentPriceRaw": [
                340
            ],
            "floorPriceRaw": [
                340
            ],
            "floorSupplyRaw": [
                340
            ],
            "initialFloorPriceRaw": [
                340
            ],
            "lastElevationTimestamp": [
                340
            ],
            "lastTradeTimestamp": [
                340
            ],
            "lastUpdatedAt": [
                340
            ],
            "marketSupplyRaw": [
                340
            ],
            "maxLTV": [
                340
            ],
            "sellFeeBps": [
                340
            ],
            "totalSupplyRaw": [
                340
            ],
            "tradingFeeBps": [
                340
            ],
            "__typename": [
                258
            ]
        },
        "Market_stddev_samp_order_by": {
            "buyFeeBps": [
                340
            ],
            "createdAt": [
                340
            ],
            "currentPriceRaw": [
                340
            ],
            "floorPriceRaw": [
                340
            ],
            "floorSupplyRaw": [
                340
            ],
            "initialFloorPriceRaw": [
                340
            ],
            "lastElevationTimestamp": [
                340
            ],
            "lastTradeTimestamp": [
                340
            ],
            "lastUpdatedAt": [
                340
            ],
            "marketSupplyRaw": [
                340
            ],
            "maxLTV": [
                340
            ],
            "sellFeeBps": [
                340
            ],
            "totalSupplyRaw": [
                340
            ],
            "tradingFeeBps": [
                340
            ],
            "__typename": [
                258
            ]
        },
        "Market_stream_cursor_input": {
            "initial_value": [
                121
            ],
            "ordering": [
                311
            ],
            "__typename": [
                258
            ]
        },
        "Market_stream_cursor_value_input": {
            "buyFeeBps": [
                337
            ],
            "createdAt": [
                337
            ],
            "creator_id": [
                258
            ],
            "currentPriceFormatted": [
                258
            ],
            "currentPriceRaw": [
                337
            ],
            "db_write_timestamp": [
                357
            ],
            "factory_id": [
                258
            ],
            "floorPriceFormatted": [
                258
            ],
            "floorPriceRaw": [
                337
            ],
            "floorSupplyFormatted": [
                258
            ],
            "floorSupplyRaw": [
                337
            ],
            "id": [
                258
            ],
            "initialFloorPriceFormatted": [
                258
            ],
            "initialFloorPriceRaw": [
                337
            ],
            "isBuyOpen": [
                12
            ],
            "isSellOpen": [
                12
            ],
            "issuanceToken_id": [
                258
            ],
            "lastElevationTimestamp": [
                337
            ],
            "lastTradeTimestamp": [
                337
            ],
            "lastUpdatedAt": [
                337
            ],
            "marketSupplyFormatted": [
                258
            ],
            "marketSupplyRaw": [
                337
            ],
            "maxLTV": [
                337
            ],
            "reserveToken_id": [
                258
            ],
            "sellFeeBps": [
                337
            ],
            "status": [
                335
            ],
            "totalSupplyFormatted": [
                258
            ],
            "totalSupplyRaw": [
                337
            ],
            "tradingFeeBps": [
                337
            ],
            "__typename": [
                258
            ]
        },
        "Market_sum_order_by": {
            "buyFeeBps": [
                340
            ],
            "createdAt": [
                340
            ],
            "currentPriceRaw": [
                340
            ],
            "floorPriceRaw": [
                340
            ],
            "floorSupplyRaw": [
                340
            ],
            "initialFloorPriceRaw": [
                340
            ],
            "lastElevationTimestamp": [
                340
            ],
            "lastTradeTimestamp": [
                340
            ],
            "lastUpdatedAt": [
                340
            ],
            "marketSupplyRaw": [
                340
            ],
            "maxLTV": [
                340
            ],
            "sellFeeBps": [
                340
            ],
            "totalSupplyRaw": [
                340
            ],
            "tradingFeeBps": [
                340
            ],
            "__typename": [
                258
            ]
        },
        "Market_var_pop_order_by": {
            "buyFeeBps": [
                340
            ],
            "createdAt": [
                340
            ],
            "currentPriceRaw": [
                340
            ],
            "floorPriceRaw": [
                340
            ],
            "floorSupplyRaw": [
                340
            ],
            "initialFloorPriceRaw": [
                340
            ],
            "lastElevationTimestamp": [
                340
            ],
            "lastTradeTimestamp": [
                340
            ],
            "lastUpdatedAt": [
                340
            ],
            "marketSupplyRaw": [
                340
            ],
            "maxLTV": [
                340
            ],
            "sellFeeBps": [
                340
            ],
            "totalSupplyRaw": [
                340
            ],
            "tradingFeeBps": [
                340
            ],
            "__typename": [
                258
            ]
        },
        "Market_var_samp_order_by": {
            "buyFeeBps": [
                340
            ],
            "createdAt": [
                340
            ],
            "currentPriceRaw": [
                340
            ],
            "floorPriceRaw": [
                340
            ],
            "floorSupplyRaw": [
                340
            ],
            "initialFloorPriceRaw": [
                340
            ],
            "lastElevationTimestamp": [
                340
            ],
            "lastTradeTimestamp": [
                340
            ],
            "lastUpdatedAt": [
                340
            ],
            "marketSupplyRaw": [
                340
            ],
            "maxLTV": [
                340
            ],
            "sellFeeBps": [
                340
            ],
            "totalSupplyRaw": [
                340
            ],
            "tradingFeeBps": [
                340
            ],
            "__typename": [
                258
            ]
        },
        "Market_variance_order_by": {
            "buyFeeBps": [
                340
            ],
            "createdAt": [
                340
            ],
            "currentPriceRaw": [
                340
            ],
            "floorPriceRaw": [
                340
            ],
            "floorSupplyRaw": [
                340
            ],
            "initialFloorPriceRaw": [
                340
            ],
            "lastElevationTimestamp": [
                340
            ],
            "lastTradeTimestamp": [
                340
            ],
            "lastUpdatedAt": [
                340
            ],
            "marketSupplyRaw": [
                340
            ],
            "maxLTV": [
                340
            ],
            "sellFeeBps": [
                340
            ],
            "totalSupplyRaw": [
                340
            ],
            "tradingFeeBps": [
                340
            ],
            "__typename": [
                258
            ]
        },
        "ModuleAddress": {
            "createdAt": [
                337
            ],
            "db_write_timestamp": [
                357
            ],
            "id": [
                258
            ],
            "lastUpdatedAt": [
                337
            ],
            "market_id": [
                258
            ],
            "moduleType": [
                258
            ],
            "__typename": [
                258
            ]
        },
        "ModuleAddress_bool_exp": {
            "_and": [
                127
            ],
            "_not": [
                127
            ],
            "_or": [
                127
            ],
            "createdAt": [
                339
            ],
            "db_write_timestamp": [
                358
            ],
            "id": [
                260
            ],
            "lastUpdatedAt": [
                339
            ],
            "market_id": [
                260
            ],
            "moduleType": [
                260
            ],
            "__typename": [
                258
            ]
        },
        "ModuleAddress_order_by": {
            "createdAt": [
                340
            ],
            "db_write_timestamp": [
                340
            ],
            "id": [
                340
            ],
            "lastUpdatedAt": [
                340
            ],
            "market_id": [
                340
            ],
            "moduleType": [
                340
            ],
            "__typename": [
                258
            ]
        },
        "ModuleAddress_select_column": {},
        "ModuleAddress_stream_cursor_input": {
            "initial_value": [
                131
            ],
            "ordering": [
                311
            ],
            "__typename": [
                258
            ]
        },
        "ModuleAddress_stream_cursor_value_input": {
            "createdAt": [
                337
            ],
            "db_write_timestamp": [
                357
            ],
            "id": [
                258
            ],
            "lastUpdatedAt": [
                337
            ],
            "market_id": [
                258
            ],
            "moduleType": [
                258
            ],
            "__typename": [
                258
            ]
        },
        "ModuleRegistry": {
            "authorizer": [
                258
            ],
            "createdAt": [
                337
            ],
            "creditFacility": [
                258
            ],
            "db_write_timestamp": [
                357
            ],
            "feeTreasury": [
                258
            ],
            "floor": [
                258
            ],
            "id": [
                258
            ],
            "lastUpdatedAt": [
                337
            ],
            "presale": [
                258
            ],
            "staking": [
                258
            ],
            "__typename": [
                258
            ]
        },
        "ModuleRegistry_bool_exp": {
            "_and": [
                133
            ],
            "_not": [
                133
            ],
            "_or": [
                133
            ],
            "authorizer": [
                260
            ],
            "createdAt": [
                339
            ],
            "creditFacility": [
                260
            ],
            "db_write_timestamp": [
                358
            ],
            "feeTreasury": [
                260
            ],
            "floor": [
                260
            ],
            "id": [
                260
            ],
            "lastUpdatedAt": [
                339
            ],
            "presale": [
                260
            ],
            "staking": [
                260
            ],
            "__typename": [
                258
            ]
        },
        "ModuleRegistry_order_by": {
            "authorizer": [
                340
            ],
            "createdAt": [
                340
            ],
            "creditFacility": [
                340
            ],
            "db_write_timestamp": [
                340
            ],
            "feeTreasury": [
                340
            ],
            "floor": [
                340
            ],
            "id": [
                340
            ],
            "lastUpdatedAt": [
                340
            ],
            "presale": [
                340
            ],
            "staking": [
                340
            ],
            "__typename": [
                258
            ]
        },
        "ModuleRegistry_select_column": {},
        "ModuleRegistry_stream_cursor_input": {
            "initial_value": [
                137
            ],
            "ordering": [
                311
            ],
            "__typename": [
                258
            ]
        },
        "ModuleRegistry_stream_cursor_value_input": {
            "authorizer": [
                258
            ],
            "createdAt": [
                337
            ],
            "creditFacility": [
                258
            ],
            "db_write_timestamp": [
                357
            ],
            "feeTreasury": [
                258
            ],
            "floor": [
                258
            ],
            "id": [
                258
            ],
            "lastUpdatedAt": [
                337
            ],
            "presale": [
                258
            ],
            "staking": [
                258
            ],
            "__typename": [
                258
            ]
        },
        "PreSaleContract": {
            "authorizer": [
                258
            ],
            "claims": [
                144,
                {
                    "distinct_on": [
                        151,
                        "[PresaleClaim_select_column!]"
                    ],
                    "limit": [
                        60
                    ],
                    "offset": [
                        60
                    ],
                    "order_by": [
                        150,
                        "[PresaleClaim_order_by!]"
                    ],
                    "where": [
                        147
                    ]
                }
            ],
            "commissionBps": [
                337
            ],
            "createdAt": [
                337
            ],
            "currentState": [
                60
            ],
            "db_write_timestamp": [
                357
            ],
            "endTime": [
                337
            ],
            "feeTreasury": [
                258
            ],
            "globalDepositCapFormatted": [
                258
            ],
            "globalDepositCapRaw": [
                337
            ],
            "id": [
                258
            ],
            "lastUpdatedAt": [
                337
            ],
            "lendingFacility": [
                258
            ],
            "market_id": [
                258
            ],
            "maxLeverage": [
                337
            ],
            "participations": [
                161,
                {
                    "distinct_on": [
                        168,
                        "[PresaleParticipation_select_column!]"
                    ],
                    "limit": [
                        60
                    ],
                    "offset": [
                        60
                    ],
                    "order_by": [
                        167,
                        "[PresaleParticipation_order_by!]"
                    ],
                    "where": [
                        164
                    ]
                }
            ],
            "perAddressDepositCapFormatted": [
                258
            ],
            "perAddressDepositCapRaw": [
                337
            ],
            "priceBreakpointOffsets": [
                60
            ],
            "priceBreakpointsFlat": [
                337
            ],
            "purchaseToken": [
                261
            ],
            "purchaseToken_id": [
                258
            ],
            "saleToken": [
                261
            ],
            "saleToken_id": [
                258
            ],
            "startTime": [
                337
            ],
            "timeSafeguardTs": [
                337
            ],
            "totalParticipants": [
                337
            ],
            "totalRaisedFormatted": [
                258
            ],
            "totalRaisedRaw": [
                337
            ],
            "whitelistSize": [
                337
            ],
            "whitelistedAddresses": [
                258
            ],
            "__typename": [
                258
            ]
        },
        "PreSaleContract_bool_exp": {
            "_and": [
                139
            ],
            "_not": [
                139
            ],
            "_or": [
                139
            ],
            "authorizer": [
                260
            ],
            "claims": [
                147
            ],
            "commissionBps": [
                338
            ],
            "createdAt": [
                339
            ],
            "currentState": [
                62
            ],
            "db_write_timestamp": [
                358
            ],
            "endTime": [
                339
            ],
            "feeTreasury": [
                260
            ],
            "globalDepositCapFormatted": [
                260
            ],
            "globalDepositCapRaw": [
                339
            ],
            "id": [
                260
            ],
            "lastUpdatedAt": [
                339
            ],
            "lendingFacility": [
                260
            ],
            "market_id": [
                260
            ],
            "maxLeverage": [
                339
            ],
            "participations": [
                164
            ],
            "perAddressDepositCapFormatted": [
                260
            ],
            "perAddressDepositCapRaw": [
                339
            ],
            "priceBreakpointOffsets": [
                61
            ],
            "priceBreakpointsFlat": [
                338
            ],
            "purchaseToken": [
                262
            ],
            "purchaseToken_id": [
                260
            ],
            "saleToken": [
                262
            ],
            "saleToken_id": [
                260
            ],
            "startTime": [
                339
            ],
            "timeSafeguardTs": [
                339
            ],
            "totalParticipants": [
                339
            ],
            "totalRaisedFormatted": [
                260
            ],
            "totalRaisedRaw": [
                339
            ],
            "whitelistSize": [
                339
            ],
            "whitelistedAddresses": [
                259
            ],
            "__typename": [
                258
            ]
        },
        "PreSaleContract_order_by": {
            "authorizer": [
                340
            ],
            "claims_aggregate": [
                145
            ],
            "commissionBps": [
                340
            ],
            "createdAt": [
                340
            ],
            "currentState": [
                340
            ],
            "db_write_timestamp": [
                340
            ],
            "endTime": [
                340
            ],
            "feeTreasury": [
                340
            ],
            "globalDepositCapFormatted": [
                340
            ],
            "globalDepositCapRaw": [
                340
            ],
            "id": [
                340
            ],
            "lastUpdatedAt": [
                340
            ],
            "lendingFacility": [
                340
            ],
            "market_id": [
                340
            ],
            "maxLeverage": [
                340
            ],
            "participations_aggregate": [
                162
            ],
            "perAddressDepositCapFormatted": [
                340
            ],
            "perAddressDepositCapRaw": [
                340
            ],
            "priceBreakpointOffsets": [
                340
            ],
            "priceBreakpointsFlat": [
                340
            ],
            "purchaseToken": [
                263
            ],
            "purchaseToken_id": [
                340
            ],
            "saleToken": [
                263
            ],
            "saleToken_id": [
                340
            ],
            "startTime": [
                340
            ],
            "timeSafeguardTs": [
                340
            ],
            "totalParticipants": [
                340
            ],
            "totalRaisedFormatted": [
                340
            ],
            "totalRaisedRaw": [
                340
            ],
            "whitelistSize": [
                340
            ],
            "whitelistedAddresses": [
                340
            ],
            "__typename": [
                258
            ]
        },
        "PreSaleContract_select_column": {},
        "PreSaleContract_stream_cursor_input": {
            "initial_value": [
                143
            ],
            "ordering": [
                311
            ],
            "__typename": [
                258
            ]
        },
        "PreSaleContract_stream_cursor_value_input": {
            "authorizer": [
                258
            ],
            "commissionBps": [
                337
            ],
            "createdAt": [
                337
            ],
            "currentState": [
                60
            ],
            "db_write_timestamp": [
                357
            ],
            "endTime": [
                337
            ],
            "feeTreasury": [
                258
            ],
            "globalDepositCapFormatted": [
                258
            ],
            "globalDepositCapRaw": [
                337
            ],
            "id": [
                258
            ],
            "lastUpdatedAt": [
                337
            ],
            "lendingFacility": [
                258
            ],
            "market_id": [
                258
            ],
            "maxLeverage": [
                337
            ],
            "perAddressDepositCapFormatted": [
                258
            ],
            "perAddressDepositCapRaw": [
                337
            ],
            "priceBreakpointOffsets": [
                60
            ],
            "priceBreakpointsFlat": [
                337
            ],
            "purchaseToken_id": [
                258
            ],
            "saleToken_id": [
                258
            ],
            "startTime": [
                337
            ],
            "timeSafeguardTs": [
                337
            ],
            "totalParticipants": [
                337
            ],
            "totalRaisedFormatted": [
                258
            ],
            "totalRaisedRaw": [
                337
            ],
            "whitelistSize": [
                337
            ],
            "whitelistedAddresses": [
                258
            ],
            "__typename": [
                258
            ]
        },
        "PresaleClaim": {
            "amountFormatted": [
                258
            ],
            "amountRaw": [
                337
            ],
            "claimType": [
                347
            ],
            "db_write_timestamp": [
                357
            ],
            "id": [
                258
            ],
            "loanId": [
                337
            ],
            "positionId": [
                337
            ],
            "presale_id": [
                258
            ],
            "timestamp": [
                337
            ],
            "trancheIndex": [
                337
            ],
            "transactionHash": [
                258
            ],
            "__typename": [
                258
            ]
        },
        "PresaleClaim_aggregate_order_by": {
            "avg": [
                146
            ],
            "count": [
                340
            ],
            "max": [
                148
            ],
            "min": [
                149
            ],
            "stddev": [
                152
            ],
            "stddev_pop": [
                153
            ],
            "stddev_samp": [
                154
            ],
            "sum": [
                157
            ],
            "var_pop": [
                158
            ],
            "var_samp": [
                159
            ],
            "variance": [
                160
            ],
            "__typename": [
                258
            ]
        },
        "PresaleClaim_avg_order_by": {
            "amountRaw": [
                340
            ],
            "loanId": [
                340
            ],
            "positionId": [
                340
            ],
            "timestamp": [
                340
            ],
            "trancheIndex": [
                340
            ],
            "__typename": [
                258
            ]
        },
        "PresaleClaim_bool_exp": {
            "_and": [
                147
            ],
            "_not": [
                147
            ],
            "_or": [
                147
            ],
            "amountFormatted": [
                260
            ],
            "amountRaw": [
                339
            ],
            "claimType": [
                348
            ],
            "db_write_timestamp": [
                358
            ],
            "id": [
                260
            ],
            "loanId": [
                339
            ],
            "positionId": [
                339
            ],
            "presale_id": [
                260
            ],
            "timestamp": [
                339
            ],
            "trancheIndex": [
                339
            ],
            "transactionHash": [
                260
            ],
            "__typename": [
                258
            ]
        },
        "PresaleClaim_max_order_by": {
            "amountFormatted": [
                340
            ],
            "amountRaw": [
                340
            ],
            "claimType": [
                340
            ],
            "db_write_timestamp": [
                340
            ],
            "id": [
                340
            ],
            "loanId": [
                340
            ],
            "positionId": [
                340
            ],
            "presale_id": [
                340
            ],
            "timestamp": [
                340
            ],
            "trancheIndex": [
                340
            ],
            "transactionHash": [
                340
            ],
            "__typename": [
                258
            ]
        },
        "PresaleClaim_min_order_by": {
            "amountFormatted": [
                340
            ],
            "amountRaw": [
                340
            ],
            "claimType": [
                340
            ],
            "db_write_timestamp": [
                340
            ],
            "id": [
                340
            ],
            "loanId": [
                340
            ],
            "positionId": [
                340
            ],
            "presale_id": [
                340
            ],
            "timestamp": [
                340
            ],
            "trancheIndex": [
                340
            ],
            "transactionHash": [
                340
            ],
            "__typename": [
                258
            ]
        },
        "PresaleClaim_order_by": {
            "amountFormatted": [
                340
            ],
            "amountRaw": [
                340
            ],
            "claimType": [
                340
            ],
            "db_write_timestamp": [
                340
            ],
            "id": [
                340
            ],
            "loanId": [
                340
            ],
            "positionId": [
                340
            ],
            "presale_id": [
                340
            ],
            "timestamp": [
                340
            ],
            "trancheIndex": [
                340
            ],
            "transactionHash": [
                340
            ],
            "__typename": [
                258
            ]
        },
        "PresaleClaim_select_column": {},
        "PresaleClaim_stddev_order_by": {
            "amountRaw": [
                340
            ],
            "loanId": [
                340
            ],
            "positionId": [
                340
            ],
            "timestamp": [
                340
            ],
            "trancheIndex": [
                340
            ],
            "__typename": [
                258
            ]
        },
        "PresaleClaim_stddev_pop_order_by": {
            "amountRaw": [
                340
            ],
            "loanId": [
                340
            ],
            "positionId": [
                340
            ],
            "timestamp": [
                340
            ],
            "trancheIndex": [
                340
            ],
            "__typename": [
                258
            ]
        },
        "PresaleClaim_stddev_samp_order_by": {
            "amountRaw": [
                340
            ],
            "loanId": [
                340
            ],
            "positionId": [
                340
            ],
            "timestamp": [
                340
            ],
            "trancheIndex": [
                340
            ],
            "__typename": [
                258
            ]
        },
        "PresaleClaim_stream_cursor_input": {
            "initial_value": [
                156
            ],
            "ordering": [
                311
            ],
            "__typename": [
                258
            ]
        },
        "PresaleClaim_stream_cursor_value_input": {
            "amountFormatted": [
                258
            ],
            "amountRaw": [
                337
            ],
            "claimType": [
                347
            ],
            "db_write_timestamp": [
                357
            ],
            "id": [
                258
            ],
            "loanId": [
                337
            ],
            "positionId": [
                337
            ],
            "presale_id": [
                258
            ],
            "timestamp": [
                337
            ],
            "trancheIndex": [
                337
            ],
            "transactionHash": [
                258
            ],
            "__typename": [
                258
            ]
        },
        "PresaleClaim_sum_order_by": {
            "amountRaw": [
                340
            ],
            "loanId": [
                340
            ],
            "positionId": [
                340
            ],
            "timestamp": [
                340
            ],
            "trancheIndex": [
                340
            ],
            "__typename": [
                258
            ]
        },
        "PresaleClaim_var_pop_order_by": {
            "amountRaw": [
                340
            ],
            "loanId": [
                340
            ],
            "positionId": [
                340
            ],
            "timestamp": [
                340
            ],
            "trancheIndex": [
                340
            ],
            "__typename": [
                258
            ]
        },
        "PresaleClaim_var_samp_order_by": {
            "amountRaw": [
                340
            ],
            "loanId": [
                340
            ],
            "positionId": [
                340
            ],
            "timestamp": [
                340
            ],
            "trancheIndex": [
                340
            ],
            "__typename": [
                258
            ]
        },
        "PresaleClaim_variance_order_by": {
            "amountRaw": [
                340
            ],
            "loanId": [
                340
            ],
            "positionId": [
                340
            ],
            "timestamp": [
                340
            ],
            "trancheIndex": [
                340
            ],
            "__typename": [
                258
            ]
        },
        "PresaleParticipation": {
            "db_write_timestamp": [
                357
            ],
            "depositAmountFormatted": [
                258
            ],
            "depositAmountRaw": [
                337
            ],
            "id": [
                258
            ],
            "leverage": [
                337
            ],
            "loopCount": [
                337
            ],
            "mintedAmountFormatted": [
                258
            ],
            "mintedAmountRaw": [
                337
            ],
            "positionId": [
                337
            ],
            "presale_id": [
                258
            ],
            "timestamp": [
                337
            ],
            "transactionHash": [
                258
            ],
            "user_id": [
                258
            ],
            "__typename": [
                258
            ]
        },
        "PresaleParticipation_aggregate_order_by": {
            "avg": [
                163
            ],
            "count": [
                340
            ],
            "max": [
                165
            ],
            "min": [
                166
            ],
            "stddev": [
                169
            ],
            "stddev_pop": [
                170
            ],
            "stddev_samp": [
                171
            ],
            "sum": [
                174
            ],
            "var_pop": [
                175
            ],
            "var_samp": [
                176
            ],
            "variance": [
                177
            ],
            "__typename": [
                258
            ]
        },
        "PresaleParticipation_avg_order_by": {
            "depositAmountRaw": [
                340
            ],
            "leverage": [
                340
            ],
            "loopCount": [
                340
            ],
            "mintedAmountRaw": [
                340
            ],
            "positionId": [
                340
            ],
            "timestamp": [
                340
            ],
            "__typename": [
                258
            ]
        },
        "PresaleParticipation_bool_exp": {
            "_and": [
                164
            ],
            "_not": [
                164
            ],
            "_or": [
                164
            ],
            "db_write_timestamp": [
                358
            ],
            "depositAmountFormatted": [
                260
            ],
            "depositAmountRaw": [
                339
            ],
            "id": [
                260
            ],
            "leverage": [
                339
            ],
            "loopCount": [
                339
            ],
            "mintedAmountFormatted": [
                260
            ],
            "mintedAmountRaw": [
                339
            ],
            "positionId": [
                339
            ],
            "presale_id": [
                260
            ],
            "timestamp": [
                339
            ],
            "transactionHash": [
                260
            ],
            "user_id": [
                260
            ],
            "__typename": [
                258
            ]
        },
        "PresaleParticipation_max_order_by": {
            "db_write_timestamp": [
                340
            ],
            "depositAmountFormatted": [
                340
            ],
            "depositAmountRaw": [
                340
            ],
            "id": [
                340
            ],
            "leverage": [
                340
            ],
            "loopCount": [
                340
            ],
            "mintedAmountFormatted": [
                340
            ],
            "mintedAmountRaw": [
                340
            ],
            "positionId": [
                340
            ],
            "presale_id": [
                340
            ],
            "timestamp": [
                340
            ],
            "transactionHash": [
                340
            ],
            "user_id": [
                340
            ],
            "__typename": [
                258
            ]
        },
        "PresaleParticipation_min_order_by": {
            "db_write_timestamp": [
                340
            ],
            "depositAmountFormatted": [
                340
            ],
            "depositAmountRaw": [
                340
            ],
            "id": [
                340
            ],
            "leverage": [
                340
            ],
            "loopCount": [
                340
            ],
            "mintedAmountFormatted": [
                340
            ],
            "mintedAmountRaw": [
                340
            ],
            "positionId": [
                340
            ],
            "presale_id": [
                340
            ],
            "timestamp": [
                340
            ],
            "transactionHash": [
                340
            ],
            "user_id": [
                340
            ],
            "__typename": [
                258
            ]
        },
        "PresaleParticipation_order_by": {
            "db_write_timestamp": [
                340
            ],
            "depositAmountFormatted": [
                340
            ],
            "depositAmountRaw": [
                340
            ],
            "id": [
                340
            ],
            "leverage": [
                340
            ],
            "loopCount": [
                340
            ],
            "mintedAmountFormatted": [
                340
            ],
            "mintedAmountRaw": [
                340
            ],
            "positionId": [
                340
            ],
            "presale_id": [
                340
            ],
            "timestamp": [
                340
            ],
            "transactionHash": [
                340
            ],
            "user_id": [
                340
            ],
            "__typename": [
                258
            ]
        },
        "PresaleParticipation_select_column": {},
        "PresaleParticipation_stddev_order_by": {
            "depositAmountRaw": [
                340
            ],
            "leverage": [
                340
            ],
            "loopCount": [
                340
            ],
            "mintedAmountRaw": [
                340
            ],
            "positionId": [
                340
            ],
            "timestamp": [
                340
            ],
            "__typename": [
                258
            ]
        },
        "PresaleParticipation_stddev_pop_order_by": {
            "depositAmountRaw": [
                340
            ],
            "leverage": [
                340
            ],
            "loopCount": [
                340
            ],
            "mintedAmountRaw": [
                340
            ],
            "positionId": [
                340
            ],
            "timestamp": [
                340
            ],
            "__typename": [
                258
            ]
        },
        "PresaleParticipation_stddev_samp_order_by": {
            "depositAmountRaw": [
                340
            ],
            "leverage": [
                340
            ],
            "loopCount": [
                340
            ],
            "mintedAmountRaw": [
                340
            ],
            "positionId": [
                340
            ],
            "timestamp": [
                340
            ],
            "__typename": [
                258
            ]
        },
        "PresaleParticipation_stream_cursor_input": {
            "initial_value": [
                173
            ],
            "ordering": [
                311
            ],
            "__typename": [
                258
            ]
        },
        "PresaleParticipation_stream_cursor_value_input": {
            "db_write_timestamp": [
                357
            ],
            "depositAmountFormatted": [
                258
            ],
            "depositAmountRaw": [
                337
            ],
            "id": [
                258
            ],
            "leverage": [
                337
            ],
            "loopCount": [
                337
            ],
            "mintedAmountFormatted": [
                258
            ],
            "mintedAmountRaw": [
                337
            ],
            "positionId": [
                337
            ],
            "presale_id": [
                258
            ],
            "timestamp": [
                337
            ],
            "transactionHash": [
                258
            ],
            "user_id": [
                258
            ],
            "__typename": [
                258
            ]
        },
        "PresaleParticipation_sum_order_by": {
            "depositAmountRaw": [
                340
            ],
            "leverage": [
                340
            ],
            "loopCount": [
                340
            ],
            "mintedAmountRaw": [
                340
            ],
            "positionId": [
                340
            ],
            "timestamp": [
                340
            ],
            "__typename": [
                258
            ]
        },
        "PresaleParticipation_var_pop_order_by": {
            "depositAmountRaw": [
                340
            ],
            "leverage": [
                340
            ],
            "loopCount": [
                340
            ],
            "mintedAmountRaw": [
                340
            ],
            "positionId": [
                340
            ],
            "timestamp": [
                340
            ],
            "__typename": [
                258
            ]
        },
        "PresaleParticipation_var_samp_order_by": {
            "depositAmountRaw": [
                340
            ],
            "leverage": [
                340
            ],
            "loopCount": [
                340
            ],
            "mintedAmountRaw": [
                340
            ],
            "positionId": [
                340
            ],
            "timestamp": [
                340
            ],
            "__typename": [
                258
            ]
        },
        "PresaleParticipation_variance_order_by": {
            "depositAmountRaw": [
                340
            ],
            "leverage": [
                340
            ],
            "loopCount": [
                340
            ],
            "mintedAmountRaw": [
                340
            ],
            "positionId": [
                340
            ],
            "timestamp": [
                340
            ],
            "__typename": [
                258
            ]
        },
        "PriceCandle": {
            "closeFormatted": [
                258
            ],
            "closeRaw": [
                337
            ],
            "db_write_timestamp": [
                357
            ],
            "highFormatted": [
                258
            ],
            "highRaw": [
                337
            ],
            "id": [
                258
            ],
            "lowFormatted": [
                258
            ],
            "lowRaw": [
                337
            ],
            "market_id": [
                258
            ],
            "openFormatted": [
                258
            ],
            "openRaw": [
                337
            ],
            "period": [
                301
            ],
            "timestamp": [
                337
            ],
            "trades": [
                337
            ],
            "volumeFormatted": [
                258
            ],
            "volumeRaw": [
                337
            ],
            "__typename": [
                258
            ]
        },
        "PriceCandle_bool_exp": {
            "_and": [
                179
            ],
            "_not": [
                179
            ],
            "_or": [
                179
            ],
            "closeFormatted": [
                260
            ],
            "closeRaw": [
                339
            ],
            "db_write_timestamp": [
                358
            ],
            "highFormatted": [
                260
            ],
            "highRaw": [
                339
            ],
            "id": [
                260
            ],
            "lowFormatted": [
                260
            ],
            "lowRaw": [
                339
            ],
            "market_id": [
                260
            ],
            "openFormatted": [
                260
            ],
            "openRaw": [
                339
            ],
            "period": [
                302
            ],
            "timestamp": [
                339
            ],
            "trades": [
                339
            ],
            "volumeFormatted": [
                260
            ],
            "volumeRaw": [
                339
            ],
            "__typename": [
                258
            ]
        },
        "PriceCandle_order_by": {
            "closeFormatted": [
                340
            ],
            "closeRaw": [
                340
            ],
            "db_write_timestamp": [
                340
            ],
            "highFormatted": [
                340
            ],
            "highRaw": [
                340
            ],
            "id": [
                340
            ],
            "lowFormatted": [
                340
            ],
            "lowRaw": [
                340
            ],
            "market_id": [
                340
            ],
            "openFormatted": [
                340
            ],
            "openRaw": [
                340
            ],
            "period": [
                340
            ],
            "timestamp": [
                340
            ],
            "trades": [
                340
            ],
            "volumeFormatted": [
                340
            ],
            "volumeRaw": [
                340
            ],
            "__typename": [
                258
            ]
        },
        "PriceCandle_select_column": {},
        "PriceCandle_stream_cursor_input": {
            "initial_value": [
                183
            ],
            "ordering": [
                311
            ],
            "__typename": [
                258
            ]
        },
        "PriceCandle_stream_cursor_value_input": {
            "closeFormatted": [
                258
            ],
            "closeRaw": [
                337
            ],
            "db_write_timestamp": [
                357
            ],
            "highFormatted": [
                258
            ],
            "highRaw": [
                337
            ],
            "id": [
                258
            ],
            "lowFormatted": [
                258
            ],
            "lowRaw": [
                337
            ],
            "market_id": [
                258
            ],
            "openFormatted": [
                258
            ],
            "openRaw": [
                337
            ],
            "period": [
                301
            ],
            "timestamp": [
                337
            ],
            "trades": [
                337
            ],
            "volumeFormatted": [
                258
            ],
            "volumeRaw": [
                337
            ],
            "__typename": [
                258
            ]
        },
        "Role": {
            "adminRole": [
                258
            ],
            "adminRoleName": [
                258
            ],
            "authorizer_id": [
                258
            ],
            "createdAt": [
                337
            ],
            "db_write_timestamp": [
                357
            ],
            "id": [
                258
            ],
            "isAdminBurned": [
                12
            ],
            "lastUpdatedAt": [
                337
            ],
            "members": [
                185,
                {
                    "distinct_on": [
                        192,
                        "[RoleMember_select_column!]"
                    ],
                    "limit": [
                        60
                    ],
                    "offset": [
                        60
                    ],
                    "order_by": [
                        191,
                        "[RoleMember_order_by!]"
                    ],
                    "where": [
                        188
                    ]
                }
            ],
            "name": [
                258
            ],
            "permissions": [
                202,
                {
                    "distinct_on": [
                        209,
                        "[RolePermission_select_column!]"
                    ],
                    "limit": [
                        60
                    ],
                    "offset": [
                        60
                    ],
                    "order_by": [
                        208,
                        "[RolePermission_order_by!]"
                    ],
                    "where": [
                        205
                    ]
                }
            ],
            "roleId": [
                258
            ],
            "__typename": [
                258
            ]
        },
        "RoleMember": {
            "db_write_timestamp": [
                357
            ],
            "grantedAt": [
                337
            ],
            "grantedBy": [
                258
            ],
            "id": [
                258
            ],
            "member": [
                258
            ],
            "role_id": [
                258
            ],
            "transactionHash": [
                258
            ],
            "__typename": [
                258
            ]
        },
        "RoleMember_aggregate_order_by": {
            "avg": [
                187
            ],
            "count": [
                340
            ],
            "max": [
                189
            ],
            "min": [
                190
            ],
            "stddev": [
                193
            ],
            "stddev_pop": [
                194
            ],
            "stddev_samp": [
                195
            ],
            "sum": [
                198
            ],
            "var_pop": [
                199
            ],
            "var_samp": [
                200
            ],
            "variance": [
                201
            ],
            "__typename": [
                258
            ]
        },
        "RoleMember_avg_order_by": {
            "grantedAt": [
                340
            ],
            "__typename": [
                258
            ]
        },
        "RoleMember_bool_exp": {
            "_and": [
                188
            ],
            "_not": [
                188
            ],
            "_or": [
                188
            ],
            "db_write_timestamp": [
                358
            ],
            "grantedAt": [
                339
            ],
            "grantedBy": [
                260
            ],
            "id": [
                260
            ],
            "member": [
                260
            ],
            "role_id": [
                260
            ],
            "transactionHash": [
                260
            ],
            "__typename": [
                258
            ]
        },
        "RoleMember_max_order_by": {
            "db_write_timestamp": [
                340
            ],
            "grantedAt": [
                340
            ],
            "grantedBy": [
                340
            ],
            "id": [
                340
            ],
            "member": [
                340
            ],
            "role_id": [
                340
            ],
            "transactionHash": [
                340
            ],
            "__typename": [
                258
            ]
        },
        "RoleMember_min_order_by": {
            "db_write_timestamp": [
                340
            ],
            "grantedAt": [
                340
            ],
            "grantedBy": [
                340
            ],
            "id": [
                340
            ],
            "member": [
                340
            ],
            "role_id": [
                340
            ],
            "transactionHash": [
                340
            ],
            "__typename": [
                258
            ]
        },
        "RoleMember_order_by": {
            "db_write_timestamp": [
                340
            ],
            "grantedAt": [
                340
            ],
            "grantedBy": [
                340
            ],
            "id": [
                340
            ],
            "member": [
                340
            ],
            "role_id": [
                340
            ],
            "transactionHash": [
                340
            ],
            "__typename": [
                258
            ]
        },
        "RoleMember_select_column": {},
        "RoleMember_stddev_order_by": {
            "grantedAt": [
                340
            ],
            "__typename": [
                258
            ]
        },
        "RoleMember_stddev_pop_order_by": {
            "grantedAt": [
                340
            ],
            "__typename": [
                258
            ]
        },
        "RoleMember_stddev_samp_order_by": {
            "grantedAt": [
                340
            ],
            "__typename": [
                258
            ]
        },
        "RoleMember_stream_cursor_input": {
            "initial_value": [
                197
            ],
            "ordering": [
                311
            ],
            "__typename": [
                258
            ]
        },
        "RoleMember_stream_cursor_value_input": {
            "db_write_timestamp": [
                357
            ],
            "grantedAt": [
                337
            ],
            "grantedBy": [
                258
            ],
            "id": [
                258
            ],
            "member": [
                258
            ],
            "role_id": [
                258
            ],
            "transactionHash": [
                258
            ],
            "__typename": [
                258
            ]
        },
        "RoleMember_sum_order_by": {
            "grantedAt": [
                340
            ],
            "__typename": [
                258
            ]
        },
        "RoleMember_var_pop_order_by": {
            "grantedAt": [
                340
            ],
            "__typename": [
                258
            ]
        },
        "RoleMember_var_samp_order_by": {
            "grantedAt": [
                340
            ],
            "__typename": [
                258
            ]
        },
        "RoleMember_variance_order_by": {
            "grantedAt": [
                340
            ],
            "__typename": [
                258
            ]
        },
        "RolePermission": {
            "addedAt": [
                337
            ],
            "db_write_timestamp": [
                357
            ],
            "id": [
                258
            ],
            "role_id": [
                258
            ],
            "selector": [
                258
            ],
            "selectorName": [
                258
            ],
            "target": [
                258
            ],
            "transactionHash": [
                258
            ],
            "__typename": [
                258
            ]
        },
        "RolePermission_aggregate_order_by": {
            "avg": [
                204
            ],
            "count": [
                340
            ],
            "max": [
                206
            ],
            "min": [
                207
            ],
            "stddev": [
                210
            ],
            "stddev_pop": [
                211
            ],
            "stddev_samp": [
                212
            ],
            "sum": [
                215
            ],
            "var_pop": [
                216
            ],
            "var_samp": [
                217
            ],
            "variance": [
                218
            ],
            "__typename": [
                258
            ]
        },
        "RolePermission_avg_order_by": {
            "addedAt": [
                340
            ],
            "__typename": [
                258
            ]
        },
        "RolePermission_bool_exp": {
            "_and": [
                205
            ],
            "_not": [
                205
            ],
            "_or": [
                205
            ],
            "addedAt": [
                339
            ],
            "db_write_timestamp": [
                358
            ],
            "id": [
                260
            ],
            "role_id": [
                260
            ],
            "selector": [
                260
            ],
            "selectorName": [
                260
            ],
            "target": [
                260
            ],
            "transactionHash": [
                260
            ],
            "__typename": [
                258
            ]
        },
        "RolePermission_max_order_by": {
            "addedAt": [
                340
            ],
            "db_write_timestamp": [
                340
            ],
            "id": [
                340
            ],
            "role_id": [
                340
            ],
            "selector": [
                340
            ],
            "selectorName": [
                340
            ],
            "target": [
                340
            ],
            "transactionHash": [
                340
            ],
            "__typename": [
                258
            ]
        },
        "RolePermission_min_order_by": {
            "addedAt": [
                340
            ],
            "db_write_timestamp": [
                340
            ],
            "id": [
                340
            ],
            "role_id": [
                340
            ],
            "selector": [
                340
            ],
            "selectorName": [
                340
            ],
            "target": [
                340
            ],
            "transactionHash": [
                340
            ],
            "__typename": [
                258
            ]
        },
        "RolePermission_order_by": {
            "addedAt": [
                340
            ],
            "db_write_timestamp": [
                340
            ],
            "id": [
                340
            ],
            "role_id": [
                340
            ],
            "selector": [
                340
            ],
            "selectorName": [
                340
            ],
            "target": [
                340
            ],
            "transactionHash": [
                340
            ],
            "__typename": [
                258
            ]
        },
        "RolePermission_select_column": {},
        "RolePermission_stddev_order_by": {
            "addedAt": [
                340
            ],
            "__typename": [
                258
            ]
        },
        "RolePermission_stddev_pop_order_by": {
            "addedAt": [
                340
            ],
            "__typename": [
                258
            ]
        },
        "RolePermission_stddev_samp_order_by": {
            "addedAt": [
                340
            ],
            "__typename": [
                258
            ]
        },
        "RolePermission_stream_cursor_input": {
            "initial_value": [
                214
            ],
            "ordering": [
                311
            ],
            "__typename": [
                258
            ]
        },
        "RolePermission_stream_cursor_value_input": {
            "addedAt": [
                337
            ],
            "db_write_timestamp": [
                357
            ],
            "id": [
                258
            ],
            "role_id": [
                258
            ],
            "selector": [
                258
            ],
            "selectorName": [
                258
            ],
            "target": [
                258
            ],
            "transactionHash": [
                258
            ],
            "__typename": [
                258
            ]
        },
        "RolePermission_sum_order_by": {
            "addedAt": [
                340
            ],
            "__typename": [
                258
            ]
        },
        "RolePermission_var_pop_order_by": {
            "addedAt": [
                340
            ],
            "__typename": [
                258
            ]
        },
        "RolePermission_var_samp_order_by": {
            "addedAt": [
                340
            ],
            "__typename": [
                258
            ]
        },
        "RolePermission_variance_order_by": {
            "addedAt": [
                340
            ],
            "__typename": [
                258
            ]
        },
        "Role_aggregate_order_by": {
            "avg": [
                220
            ],
            "count": [
                340
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
                258
            ]
        },
        "Role_avg_order_by": {
            "createdAt": [
                340
            ],
            "lastUpdatedAt": [
                340
            ],
            "__typename": [
                258
            ]
        },
        "Role_bool_exp": {
            "_and": [
                221
            ],
            "_not": [
                221
            ],
            "_or": [
                221
            ],
            "adminRole": [
                260
            ],
            "adminRoleName": [
                260
            ],
            "authorizer_id": [
                260
            ],
            "createdAt": [
                339
            ],
            "db_write_timestamp": [
                358
            ],
            "id": [
                260
            ],
            "isAdminBurned": [
                13
            ],
            "lastUpdatedAt": [
                339
            ],
            "members": [
                188
            ],
            "name": [
                260
            ],
            "permissions": [
                205
            ],
            "roleId": [
                260
            ],
            "__typename": [
                258
            ]
        },
        "Role_max_order_by": {
            "adminRole": [
                340
            ],
            "adminRoleName": [
                340
            ],
            "authorizer_id": [
                340
            ],
            "createdAt": [
                340
            ],
            "db_write_timestamp": [
                340
            ],
            "id": [
                340
            ],
            "lastUpdatedAt": [
                340
            ],
            "name": [
                340
            ],
            "roleId": [
                340
            ],
            "__typename": [
                258
            ]
        },
        "Role_min_order_by": {
            "adminRole": [
                340
            ],
            "adminRoleName": [
                340
            ],
            "authorizer_id": [
                340
            ],
            "createdAt": [
                340
            ],
            "db_write_timestamp": [
                340
            ],
            "id": [
                340
            ],
            "lastUpdatedAt": [
                340
            ],
            "name": [
                340
            ],
            "roleId": [
                340
            ],
            "__typename": [
                258
            ]
        },
        "Role_order_by": {
            "adminRole": [
                340
            ],
            "adminRoleName": [
                340
            ],
            "authorizer_id": [
                340
            ],
            "createdAt": [
                340
            ],
            "db_write_timestamp": [
                340
            ],
            "id": [
                340
            ],
            "isAdminBurned": [
                340
            ],
            "lastUpdatedAt": [
                340
            ],
            "members_aggregate": [
                186
            ],
            "name": [
                340
            ],
            "permissions_aggregate": [
                203
            ],
            "roleId": [
                340
            ],
            "__typename": [
                258
            ]
        },
        "Role_select_column": {},
        "Role_stddev_order_by": {
            "createdAt": [
                340
            ],
            "lastUpdatedAt": [
                340
            ],
            "__typename": [
                258
            ]
        },
        "Role_stddev_pop_order_by": {
            "createdAt": [
                340
            ],
            "lastUpdatedAt": [
                340
            ],
            "__typename": [
                258
            ]
        },
        "Role_stddev_samp_order_by": {
            "createdAt": [
                340
            ],
            "lastUpdatedAt": [
                340
            ],
            "__typename": [
                258
            ]
        },
        "Role_stream_cursor_input": {
            "initial_value": [
                230
            ],
            "ordering": [
                311
            ],
            "__typename": [
                258
            ]
        },
        "Role_stream_cursor_value_input": {
            "adminRole": [
                258
            ],
            "adminRoleName": [
                258
            ],
            "authorizer_id": [
                258
            ],
            "createdAt": [
                337
            ],
            "db_write_timestamp": [
                357
            ],
            "id": [
                258
            ],
            "isAdminBurned": [
                12
            ],
            "lastUpdatedAt": [
                337
            ],
            "name": [
                258
            ],
            "roleId": [
                258
            ],
            "__typename": [
                258
            ]
        },
        "Role_sum_order_by": {
            "createdAt": [
                340
            ],
            "lastUpdatedAt": [
                340
            ],
            "__typename": [
                258
            ]
        },
        "Role_var_pop_order_by": {
            "createdAt": [
                340
            ],
            "lastUpdatedAt": [
                340
            ],
            "__typename": [
                258
            ]
        },
        "Role_var_samp_order_by": {
            "createdAt": [
                340
            ],
            "lastUpdatedAt": [
                340
            ],
            "__typename": [
                258
            ]
        },
        "Role_variance_order_by": {
            "createdAt": [
                340
            ],
            "lastUpdatedAt": [
                340
            ],
            "__typename": [
                258
            ]
        },
        "Stake": {
            "amountFormatted": [
                258
            ],
            "amountRaw": [
                337
            ],
            "contract_id": [
                258
            ],
            "db_write_timestamp": [
                357
            ],
            "id": [
                258
            ],
            "lockDuration": [
                337
            ],
            "status": [
                355
            ],
            "timestamp": [
                337
            ],
            "transactionHash": [
                258
            ],
            "user_id": [
                258
            ],
            "__typename": [
                258
            ]
        },
        "Stake_aggregate_order_by": {
            "avg": [
                237
            ],
            "count": [
                340
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
                258
            ]
        },
        "Stake_avg_order_by": {
            "amountRaw": [
                340
            ],
            "lockDuration": [
                340
            ],
            "timestamp": [
                340
            ],
            "__typename": [
                258
            ]
        },
        "Stake_bool_exp": {
            "_and": [
                238
            ],
            "_not": [
                238
            ],
            "_or": [
                238
            ],
            "amountFormatted": [
                260
            ],
            "amountRaw": [
                339
            ],
            "contract_id": [
                260
            ],
            "db_write_timestamp": [
                358
            ],
            "id": [
                260
            ],
            "lockDuration": [
                339
            ],
            "status": [
                356
            ],
            "timestamp": [
                339
            ],
            "transactionHash": [
                260
            ],
            "user_id": [
                260
            ],
            "__typename": [
                258
            ]
        },
        "Stake_max_order_by": {
            "amountFormatted": [
                340
            ],
            "amountRaw": [
                340
            ],
            "contract_id": [
                340
            ],
            "db_write_timestamp": [
                340
            ],
            "id": [
                340
            ],
            "lockDuration": [
                340
            ],
            "status": [
                340
            ],
            "timestamp": [
                340
            ],
            "transactionHash": [
                340
            ],
            "user_id": [
                340
            ],
            "__typename": [
                258
            ]
        },
        "Stake_min_order_by": {
            "amountFormatted": [
                340
            ],
            "amountRaw": [
                340
            ],
            "contract_id": [
                340
            ],
            "db_write_timestamp": [
                340
            ],
            "id": [
                340
            ],
            "lockDuration": [
                340
            ],
            "status": [
                340
            ],
            "timestamp": [
                340
            ],
            "transactionHash": [
                340
            ],
            "user_id": [
                340
            ],
            "__typename": [
                258
            ]
        },
        "Stake_order_by": {
            "amountFormatted": [
                340
            ],
            "amountRaw": [
                340
            ],
            "contract_id": [
                340
            ],
            "db_write_timestamp": [
                340
            ],
            "id": [
                340
            ],
            "lockDuration": [
                340
            ],
            "status": [
                340
            ],
            "timestamp": [
                340
            ],
            "transactionHash": [
                340
            ],
            "user_id": [
                340
            ],
            "__typename": [
                258
            ]
        },
        "Stake_select_column": {},
        "Stake_stddev_order_by": {
            "amountRaw": [
                340
            ],
            "lockDuration": [
                340
            ],
            "timestamp": [
                340
            ],
            "__typename": [
                258
            ]
        },
        "Stake_stddev_pop_order_by": {
            "amountRaw": [
                340
            ],
            "lockDuration": [
                340
            ],
            "timestamp": [
                340
            ],
            "__typename": [
                258
            ]
        },
        "Stake_stddev_samp_order_by": {
            "amountRaw": [
                340
            ],
            "lockDuration": [
                340
            ],
            "timestamp": [
                340
            ],
            "__typename": [
                258
            ]
        },
        "Stake_stream_cursor_input": {
            "initial_value": [
                247
            ],
            "ordering": [
                311
            ],
            "__typename": [
                258
            ]
        },
        "Stake_stream_cursor_value_input": {
            "amountFormatted": [
                258
            ],
            "amountRaw": [
                337
            ],
            "contract_id": [
                258
            ],
            "db_write_timestamp": [
                357
            ],
            "id": [
                258
            ],
            "lockDuration": [
                337
            ],
            "status": [
                355
            ],
            "timestamp": [
                337
            ],
            "transactionHash": [
                258
            ],
            "user_id": [
                258
            ],
            "__typename": [
                258
            ]
        },
        "Stake_sum_order_by": {
            "amountRaw": [
                340
            ],
            "lockDuration": [
                340
            ],
            "timestamp": [
                340
            ],
            "__typename": [
                258
            ]
        },
        "Stake_var_pop_order_by": {
            "amountRaw": [
                340
            ],
            "lockDuration": [
                340
            ],
            "timestamp": [
                340
            ],
            "__typename": [
                258
            ]
        },
        "Stake_var_samp_order_by": {
            "amountRaw": [
                340
            ],
            "lockDuration": [
                340
            ],
            "timestamp": [
                340
            ],
            "__typename": [
                258
            ]
        },
        "Stake_variance_order_by": {
            "amountRaw": [
                340
            ],
            "lockDuration": [
                340
            ],
            "timestamp": [
                340
            ],
            "__typename": [
                258
            ]
        },
        "StakingContract": {
            "createdAt": [
                337
            ],
            "db_write_timestamp": [
                357
            ],
            "id": [
                258
            ],
            "rewardToken_id": [
                258
            ],
            "stakes": [
                235,
                {
                    "distinct_on": [
                        242,
                        "[Stake_select_column!]"
                    ],
                    "limit": [
                        60
                    ],
                    "offset": [
                        60
                    ],
                    "order_by": [
                        241,
                        "[Stake_order_by!]"
                    ],
                    "where": [
                        238
                    ]
                }
            ],
            "stakingToken_id": [
                258
            ],
            "totalRewardsFormatted": [
                258
            ],
            "totalRewardsRaw": [
                337
            ],
            "totalStakedFormatted": [
                258
            ],
            "totalStakedRaw": [
                337
            ],
            "__typename": [
                258
            ]
        },
        "StakingContract_bool_exp": {
            "_and": [
                253
            ],
            "_not": [
                253
            ],
            "_or": [
                253
            ],
            "createdAt": [
                339
            ],
            "db_write_timestamp": [
                358
            ],
            "id": [
                260
            ],
            "rewardToken_id": [
                260
            ],
            "stakes": [
                238
            ],
            "stakingToken_id": [
                260
            ],
            "totalRewardsFormatted": [
                260
            ],
            "totalRewardsRaw": [
                339
            ],
            "totalStakedFormatted": [
                260
            ],
            "totalStakedRaw": [
                339
            ],
            "__typename": [
                258
            ]
        },
        "StakingContract_order_by": {
            "createdAt": [
                340
            ],
            "db_write_timestamp": [
                340
            ],
            "id": [
                340
            ],
            "rewardToken_id": [
                340
            ],
            "stakes_aggregate": [
                236
            ],
            "stakingToken_id": [
                340
            ],
            "totalRewardsFormatted": [
                340
            ],
            "totalRewardsRaw": [
                340
            ],
            "totalStakedFormatted": [
                340
            ],
            "totalStakedRaw": [
                340
            ],
            "__typename": [
                258
            ]
        },
        "StakingContract_select_column": {},
        "StakingContract_stream_cursor_input": {
            "initial_value": [
                257
            ],
            "ordering": [
                311
            ],
            "__typename": [
                258
            ]
        },
        "StakingContract_stream_cursor_value_input": {
            "createdAt": [
                337
            ],
            "db_write_timestamp": [
                357
            ],
            "id": [
                258
            ],
            "rewardToken_id": [
                258
            ],
            "stakingToken_id": [
                258
            ],
            "totalRewardsFormatted": [
                258
            ],
            "totalRewardsRaw": [
                337
            ],
            "totalStakedFormatted": [
                258
            ],
            "totalStakedRaw": [
                337
            ],
            "__typename": [
                258
            ]
        },
        "String": {},
        "String_array_comparison_exp": {
            "_contained_in": [
                258
            ],
            "_contains": [
                258
            ],
            "_eq": [
                258
            ],
            "_gt": [
                258
            ],
            "_gte": [
                258
            ],
            "_in": [
                258
            ],
            "_is_null": [
                12
            ],
            "_lt": [
                258
            ],
            "_lte": [
                258
            ],
            "_neq": [
                258
            ],
            "_nin": [
                258
            ],
            "__typename": [
                258
            ]
        },
        "String_comparison_exp": {
            "_eq": [
                258
            ],
            "_gt": [
                258
            ],
            "_gte": [
                258
            ],
            "_ilike": [
                258
            ],
            "_in": [
                258
            ],
            "_iregex": [
                258
            ],
            "_is_null": [
                12
            ],
            "_like": [
                258
            ],
            "_lt": [
                258
            ],
            "_lte": [
                258
            ],
            "_neq": [
                258
            ],
            "_nilike": [
                258
            ],
            "_nin": [
                258
            ],
            "_niregex": [
                258
            ],
            "_nlike": [
                258
            ],
            "_nregex": [
                258
            ],
            "_nsimilar": [
                258
            ],
            "_regex": [
                258
            ],
            "_similar": [
                258
            ],
            "__typename": [
                258
            ]
        },
        "Token": {
            "db_write_timestamp": [
                357
            ],
            "decimals": [
                60
            ],
            "id": [
                258
            ],
            "maxSupplyFormatted": [
                258
            ],
            "maxSupplyRaw": [
                337
            ],
            "name": [
                258
            ],
            "symbol": [
                258
            ],
            "__typename": [
                258
            ]
        },
        "Token_bool_exp": {
            "_and": [
                262
            ],
            "_not": [
                262
            ],
            "_or": [
                262
            ],
            "db_write_timestamp": [
                358
            ],
            "decimals": [
                62
            ],
            "id": [
                260
            ],
            "maxSupplyFormatted": [
                260
            ],
            "maxSupplyRaw": [
                339
            ],
            "name": [
                260
            ],
            "symbol": [
                260
            ],
            "__typename": [
                258
            ]
        },
        "Token_order_by": {
            "db_write_timestamp": [
                340
            ],
            "decimals": [
                340
            ],
            "id": [
                340
            ],
            "maxSupplyFormatted": [
                340
            ],
            "maxSupplyRaw": [
                340
            ],
            "name": [
                340
            ],
            "symbol": [
                340
            ],
            "__typename": [
                258
            ]
        },
        "Token_select_column": {},
        "Token_stream_cursor_input": {
            "initial_value": [
                266
            ],
            "ordering": [
                311
            ],
            "__typename": [
                258
            ]
        },
        "Token_stream_cursor_value_input": {
            "db_write_timestamp": [
                357
            ],
            "decimals": [
                60
            ],
            "id": [
                258
            ],
            "maxSupplyFormatted": [
                258
            ],
            "maxSupplyRaw": [
                337
            ],
            "name": [
                258
            ],
            "symbol": [
                258
            ],
            "__typename": [
                258
            ]
        },
        "Trade": {
            "db_write_timestamp": [
                357
            ],
            "feeFormatted": [
                258
            ],
            "feeRaw": [
                337
            ],
            "id": [
                258
            ],
            "market_id": [
                258
            ],
            "newPriceFormatted": [
                258
            ],
            "newPriceRaw": [
                337
            ],
            "reserveAmountFormatted": [
                258
            ],
            "reserveAmountRaw": [
                337
            ],
            "timestamp": [
                337
            ],
            "tokenAmountFormatted": [
                258
            ],
            "tokenAmountRaw": [
                337
            ],
            "tradeType": [
                361
            ],
            "transactionHash": [
                258
            ],
            "user_id": [
                258
            ],
            "__typename": [
                258
            ]
        },
        "Trade_aggregate_order_by": {
            "avg": [
                269
            ],
            "count": [
                340
            ],
            "max": [
                271
            ],
            "min": [
                272
            ],
            "stddev": [
                275
            ],
            "stddev_pop": [
                276
            ],
            "stddev_samp": [
                277
            ],
            "sum": [
                280
            ],
            "var_pop": [
                281
            ],
            "var_samp": [
                282
            ],
            "variance": [
                283
            ],
            "__typename": [
                258
            ]
        },
        "Trade_avg_order_by": {
            "feeRaw": [
                340
            ],
            "newPriceRaw": [
                340
            ],
            "reserveAmountRaw": [
                340
            ],
            "timestamp": [
                340
            ],
            "tokenAmountRaw": [
                340
            ],
            "__typename": [
                258
            ]
        },
        "Trade_bool_exp": {
            "_and": [
                270
            ],
            "_not": [
                270
            ],
            "_or": [
                270
            ],
            "db_write_timestamp": [
                358
            ],
            "feeFormatted": [
                260
            ],
            "feeRaw": [
                339
            ],
            "id": [
                260
            ],
            "market_id": [
                260
            ],
            "newPriceFormatted": [
                260
            ],
            "newPriceRaw": [
                339
            ],
            "reserveAmountFormatted": [
                260
            ],
            "reserveAmountRaw": [
                339
            ],
            "timestamp": [
                339
            ],
            "tokenAmountFormatted": [
                260
            ],
            "tokenAmountRaw": [
                339
            ],
            "tradeType": [
                362
            ],
            "transactionHash": [
                260
            ],
            "user_id": [
                260
            ],
            "__typename": [
                258
            ]
        },
        "Trade_max_order_by": {
            "db_write_timestamp": [
                340
            ],
            "feeFormatted": [
                340
            ],
            "feeRaw": [
                340
            ],
            "id": [
                340
            ],
            "market_id": [
                340
            ],
            "newPriceFormatted": [
                340
            ],
            "newPriceRaw": [
                340
            ],
            "reserveAmountFormatted": [
                340
            ],
            "reserveAmountRaw": [
                340
            ],
            "timestamp": [
                340
            ],
            "tokenAmountFormatted": [
                340
            ],
            "tokenAmountRaw": [
                340
            ],
            "tradeType": [
                340
            ],
            "transactionHash": [
                340
            ],
            "user_id": [
                340
            ],
            "__typename": [
                258
            ]
        },
        "Trade_min_order_by": {
            "db_write_timestamp": [
                340
            ],
            "feeFormatted": [
                340
            ],
            "feeRaw": [
                340
            ],
            "id": [
                340
            ],
            "market_id": [
                340
            ],
            "newPriceFormatted": [
                340
            ],
            "newPriceRaw": [
                340
            ],
            "reserveAmountFormatted": [
                340
            ],
            "reserveAmountRaw": [
                340
            ],
            "timestamp": [
                340
            ],
            "tokenAmountFormatted": [
                340
            ],
            "tokenAmountRaw": [
                340
            ],
            "tradeType": [
                340
            ],
            "transactionHash": [
                340
            ],
            "user_id": [
                340
            ],
            "__typename": [
                258
            ]
        },
        "Trade_order_by": {
            "db_write_timestamp": [
                340
            ],
            "feeFormatted": [
                340
            ],
            "feeRaw": [
                340
            ],
            "id": [
                340
            ],
            "market_id": [
                340
            ],
            "newPriceFormatted": [
                340
            ],
            "newPriceRaw": [
                340
            ],
            "reserveAmountFormatted": [
                340
            ],
            "reserveAmountRaw": [
                340
            ],
            "timestamp": [
                340
            ],
            "tokenAmountFormatted": [
                340
            ],
            "tokenAmountRaw": [
                340
            ],
            "tradeType": [
                340
            ],
            "transactionHash": [
                340
            ],
            "user_id": [
                340
            ],
            "__typename": [
                258
            ]
        },
        "Trade_select_column": {},
        "Trade_stddev_order_by": {
            "feeRaw": [
                340
            ],
            "newPriceRaw": [
                340
            ],
            "reserveAmountRaw": [
                340
            ],
            "timestamp": [
                340
            ],
            "tokenAmountRaw": [
                340
            ],
            "__typename": [
                258
            ]
        },
        "Trade_stddev_pop_order_by": {
            "feeRaw": [
                340
            ],
            "newPriceRaw": [
                340
            ],
            "reserveAmountRaw": [
                340
            ],
            "timestamp": [
                340
            ],
            "tokenAmountRaw": [
                340
            ],
            "__typename": [
                258
            ]
        },
        "Trade_stddev_samp_order_by": {
            "feeRaw": [
                340
            ],
            "newPriceRaw": [
                340
            ],
            "reserveAmountRaw": [
                340
            ],
            "timestamp": [
                340
            ],
            "tokenAmountRaw": [
                340
            ],
            "__typename": [
                258
            ]
        },
        "Trade_stream_cursor_input": {
            "initial_value": [
                279
            ],
            "ordering": [
                311
            ],
            "__typename": [
                258
            ]
        },
        "Trade_stream_cursor_value_input": {
            "db_write_timestamp": [
                357
            ],
            "feeFormatted": [
                258
            ],
            "feeRaw": [
                337
            ],
            "id": [
                258
            ],
            "market_id": [
                258
            ],
            "newPriceFormatted": [
                258
            ],
            "newPriceRaw": [
                337
            ],
            "reserveAmountFormatted": [
                258
            ],
            "reserveAmountRaw": [
                337
            ],
            "timestamp": [
                337
            ],
            "tokenAmountFormatted": [
                258
            ],
            "tokenAmountRaw": [
                337
            ],
            "tradeType": [
                361
            ],
            "transactionHash": [
                258
            ],
            "user_id": [
                258
            ],
            "__typename": [
                258
            ]
        },
        "Trade_sum_order_by": {
            "feeRaw": [
                340
            ],
            "newPriceRaw": [
                340
            ],
            "reserveAmountRaw": [
                340
            ],
            "timestamp": [
                340
            ],
            "tokenAmountRaw": [
                340
            ],
            "__typename": [
                258
            ]
        },
        "Trade_var_pop_order_by": {
            "feeRaw": [
                340
            ],
            "newPriceRaw": [
                340
            ],
            "reserveAmountRaw": [
                340
            ],
            "timestamp": [
                340
            ],
            "tokenAmountRaw": [
                340
            ],
            "__typename": [
                258
            ]
        },
        "Trade_var_samp_order_by": {
            "feeRaw": [
                340
            ],
            "newPriceRaw": [
                340
            ],
            "reserveAmountRaw": [
                340
            ],
            "timestamp": [
                340
            ],
            "tokenAmountRaw": [
                340
            ],
            "__typename": [
                258
            ]
        },
        "Trade_variance_order_by": {
            "feeRaw": [
                340
            ],
            "newPriceRaw": [
                340
            ],
            "reserveAmountRaw": [
                340
            ],
            "timestamp": [
                340
            ],
            "tokenAmountRaw": [
                340
            ],
            "__typename": [
                258
            ]
        },
        "UserMarketPosition": {
            "claimableRewardsFormatted": [
                258
            ],
            "claimableRewardsRaw": [
                337
            ],
            "db_write_timestamp": [
                357
            ],
            "id": [
                258
            ],
            "lastUpdatedAt": [
                337
            ],
            "lockedCollateralFormatted": [
                258
            ],
            "lockedCollateralRaw": [
                337
            ],
            "market_id": [
                258
            ],
            "netFTokenChangeFormatted": [
                258
            ],
            "netFTokenChangeRaw": [
                337
            ],
            "presaleDepositFormatted": [
                258
            ],
            "presaleDepositRaw": [
                337
            ],
            "presaleLeverage": [
                337
            ],
            "stakedAmountFormatted": [
                258
            ],
            "stakedAmountRaw": [
                337
            ],
            "totalDebtFormatted": [
                258
            ],
            "totalDebtRaw": [
                337
            ],
            "user_id": [
                258
            ],
            "__typename": [
                258
            ]
        },
        "UserMarketPosition_aggregate_order_by": {
            "avg": [
                286
            ],
            "count": [
                340
            ],
            "max": [
                288
            ],
            "min": [
                289
            ],
            "stddev": [
                292
            ],
            "stddev_pop": [
                293
            ],
            "stddev_samp": [
                294
            ],
            "sum": [
                297
            ],
            "var_pop": [
                298
            ],
            "var_samp": [
                299
            ],
            "variance": [
                300
            ],
            "__typename": [
                258
            ]
        },
        "UserMarketPosition_avg_order_by": {
            "claimableRewardsRaw": [
                340
            ],
            "lastUpdatedAt": [
                340
            ],
            "lockedCollateralRaw": [
                340
            ],
            "netFTokenChangeRaw": [
                340
            ],
            "presaleDepositRaw": [
                340
            ],
            "presaleLeverage": [
                340
            ],
            "stakedAmountRaw": [
                340
            ],
            "totalDebtRaw": [
                340
            ],
            "__typename": [
                258
            ]
        },
        "UserMarketPosition_bool_exp": {
            "_and": [
                287
            ],
            "_not": [
                287
            ],
            "_or": [
                287
            ],
            "claimableRewardsFormatted": [
                260
            ],
            "claimableRewardsRaw": [
                339
            ],
            "db_write_timestamp": [
                358
            ],
            "id": [
                260
            ],
            "lastUpdatedAt": [
                339
            ],
            "lockedCollateralFormatted": [
                260
            ],
            "lockedCollateralRaw": [
                339
            ],
            "market_id": [
                260
            ],
            "netFTokenChangeFormatted": [
                260
            ],
            "netFTokenChangeRaw": [
                339
            ],
            "presaleDepositFormatted": [
                260
            ],
            "presaleDepositRaw": [
                339
            ],
            "presaleLeverage": [
                339
            ],
            "stakedAmountFormatted": [
                260
            ],
            "stakedAmountRaw": [
                339
            ],
            "totalDebtFormatted": [
                260
            ],
            "totalDebtRaw": [
                339
            ],
            "user_id": [
                260
            ],
            "__typename": [
                258
            ]
        },
        "UserMarketPosition_max_order_by": {
            "claimableRewardsFormatted": [
                340
            ],
            "claimableRewardsRaw": [
                340
            ],
            "db_write_timestamp": [
                340
            ],
            "id": [
                340
            ],
            "lastUpdatedAt": [
                340
            ],
            "lockedCollateralFormatted": [
                340
            ],
            "lockedCollateralRaw": [
                340
            ],
            "market_id": [
                340
            ],
            "netFTokenChangeFormatted": [
                340
            ],
            "netFTokenChangeRaw": [
                340
            ],
            "presaleDepositFormatted": [
                340
            ],
            "presaleDepositRaw": [
                340
            ],
            "presaleLeverage": [
                340
            ],
            "stakedAmountFormatted": [
                340
            ],
            "stakedAmountRaw": [
                340
            ],
            "totalDebtFormatted": [
                340
            ],
            "totalDebtRaw": [
                340
            ],
            "user_id": [
                340
            ],
            "__typename": [
                258
            ]
        },
        "UserMarketPosition_min_order_by": {
            "claimableRewardsFormatted": [
                340
            ],
            "claimableRewardsRaw": [
                340
            ],
            "db_write_timestamp": [
                340
            ],
            "id": [
                340
            ],
            "lastUpdatedAt": [
                340
            ],
            "lockedCollateralFormatted": [
                340
            ],
            "lockedCollateralRaw": [
                340
            ],
            "market_id": [
                340
            ],
            "netFTokenChangeFormatted": [
                340
            ],
            "netFTokenChangeRaw": [
                340
            ],
            "presaleDepositFormatted": [
                340
            ],
            "presaleDepositRaw": [
                340
            ],
            "presaleLeverage": [
                340
            ],
            "stakedAmountFormatted": [
                340
            ],
            "stakedAmountRaw": [
                340
            ],
            "totalDebtFormatted": [
                340
            ],
            "totalDebtRaw": [
                340
            ],
            "user_id": [
                340
            ],
            "__typename": [
                258
            ]
        },
        "UserMarketPosition_order_by": {
            "claimableRewardsFormatted": [
                340
            ],
            "claimableRewardsRaw": [
                340
            ],
            "db_write_timestamp": [
                340
            ],
            "id": [
                340
            ],
            "lastUpdatedAt": [
                340
            ],
            "lockedCollateralFormatted": [
                340
            ],
            "lockedCollateralRaw": [
                340
            ],
            "market_id": [
                340
            ],
            "netFTokenChangeFormatted": [
                340
            ],
            "netFTokenChangeRaw": [
                340
            ],
            "presaleDepositFormatted": [
                340
            ],
            "presaleDepositRaw": [
                340
            ],
            "presaleLeverage": [
                340
            ],
            "stakedAmountFormatted": [
                340
            ],
            "stakedAmountRaw": [
                340
            ],
            "totalDebtFormatted": [
                340
            ],
            "totalDebtRaw": [
                340
            ],
            "user_id": [
                340
            ],
            "__typename": [
                258
            ]
        },
        "UserMarketPosition_select_column": {},
        "UserMarketPosition_stddev_order_by": {
            "claimableRewardsRaw": [
                340
            ],
            "lastUpdatedAt": [
                340
            ],
            "lockedCollateralRaw": [
                340
            ],
            "netFTokenChangeRaw": [
                340
            ],
            "presaleDepositRaw": [
                340
            ],
            "presaleLeverage": [
                340
            ],
            "stakedAmountRaw": [
                340
            ],
            "totalDebtRaw": [
                340
            ],
            "__typename": [
                258
            ]
        },
        "UserMarketPosition_stddev_pop_order_by": {
            "claimableRewardsRaw": [
                340
            ],
            "lastUpdatedAt": [
                340
            ],
            "lockedCollateralRaw": [
                340
            ],
            "netFTokenChangeRaw": [
                340
            ],
            "presaleDepositRaw": [
                340
            ],
            "presaleLeverage": [
                340
            ],
            "stakedAmountRaw": [
                340
            ],
            "totalDebtRaw": [
                340
            ],
            "__typename": [
                258
            ]
        },
        "UserMarketPosition_stddev_samp_order_by": {
            "claimableRewardsRaw": [
                340
            ],
            "lastUpdatedAt": [
                340
            ],
            "lockedCollateralRaw": [
                340
            ],
            "netFTokenChangeRaw": [
                340
            ],
            "presaleDepositRaw": [
                340
            ],
            "presaleLeverage": [
                340
            ],
            "stakedAmountRaw": [
                340
            ],
            "totalDebtRaw": [
                340
            ],
            "__typename": [
                258
            ]
        },
        "UserMarketPosition_stream_cursor_input": {
            "initial_value": [
                296
            ],
            "ordering": [
                311
            ],
            "__typename": [
                258
            ]
        },
        "UserMarketPosition_stream_cursor_value_input": {
            "claimableRewardsFormatted": [
                258
            ],
            "claimableRewardsRaw": [
                337
            ],
            "db_write_timestamp": [
                357
            ],
            "id": [
                258
            ],
            "lastUpdatedAt": [
                337
            ],
            "lockedCollateralFormatted": [
                258
            ],
            "lockedCollateralRaw": [
                337
            ],
            "market_id": [
                258
            ],
            "netFTokenChangeFormatted": [
                258
            ],
            "netFTokenChangeRaw": [
                337
            ],
            "presaleDepositFormatted": [
                258
            ],
            "presaleDepositRaw": [
                337
            ],
            "presaleLeverage": [
                337
            ],
            "stakedAmountFormatted": [
                258
            ],
            "stakedAmountRaw": [
                337
            ],
            "totalDebtFormatted": [
                258
            ],
            "totalDebtRaw": [
                337
            ],
            "user_id": [
                258
            ],
            "__typename": [
                258
            ]
        },
        "UserMarketPosition_sum_order_by": {
            "claimableRewardsRaw": [
                340
            ],
            "lastUpdatedAt": [
                340
            ],
            "lockedCollateralRaw": [
                340
            ],
            "netFTokenChangeRaw": [
                340
            ],
            "presaleDepositRaw": [
                340
            ],
            "presaleLeverage": [
                340
            ],
            "stakedAmountRaw": [
                340
            ],
            "totalDebtRaw": [
                340
            ],
            "__typename": [
                258
            ]
        },
        "UserMarketPosition_var_pop_order_by": {
            "claimableRewardsRaw": [
                340
            ],
            "lastUpdatedAt": [
                340
            ],
            "lockedCollateralRaw": [
                340
            ],
            "netFTokenChangeRaw": [
                340
            ],
            "presaleDepositRaw": [
                340
            ],
            "presaleLeverage": [
                340
            ],
            "stakedAmountRaw": [
                340
            ],
            "totalDebtRaw": [
                340
            ],
            "__typename": [
                258
            ]
        },
        "UserMarketPosition_var_samp_order_by": {
            "claimableRewardsRaw": [
                340
            ],
            "lastUpdatedAt": [
                340
            ],
            "lockedCollateralRaw": [
                340
            ],
            "netFTokenChangeRaw": [
                340
            ],
            "presaleDepositRaw": [
                340
            ],
            "presaleLeverage": [
                340
            ],
            "stakedAmountRaw": [
                340
            ],
            "totalDebtRaw": [
                340
            ],
            "__typename": [
                258
            ]
        },
        "UserMarketPosition_variance_order_by": {
            "claimableRewardsRaw": [
                340
            ],
            "lastUpdatedAt": [
                340
            ],
            "lockedCollateralRaw": [
                340
            ],
            "netFTokenChangeRaw": [
                340
            ],
            "presaleDepositRaw": [
                340
            ],
            "presaleLeverage": [
                340
            ],
            "stakedAmountRaw": [
                340
            ],
            "totalDebtRaw": [
                340
            ],
            "__typename": [
                258
            ]
        },
        "candleperiod": {},
        "candleperiod_comparison_exp": {
            "_eq": [
                301
            ],
            "_gt": [
                301
            ],
            "_gte": [
                301
            ],
            "_in": [
                301
            ],
            "_is_null": [
                12
            ],
            "_lt": [
                301
            ],
            "_lte": [
                301
            ],
            "_neq": [
                301
            ],
            "_nin": [
                301
            ],
            "__typename": [
                258
            ]
        },
        "chain_metadata": {
            "block_height": [
                60
            ],
            "chain_id": [
                60
            ],
            "end_block": [
                60
            ],
            "first_event_block_number": [
                60
            ],
            "is_hyper_sync": [
                12
            ],
            "latest_fetched_block_number": [
                60
            ],
            "latest_processed_block": [
                60
            ],
            "num_batches_fetched": [
                60
            ],
            "num_events_processed": [
                60
            ],
            "start_block": [
                60
            ],
            "timestamp_caught_up_to_head_or_endblock": [
                359
            ],
            "__typename": [
                258
            ]
        },
        "chain_metadata_bool_exp": {
            "_and": [
                304
            ],
            "_not": [
                304
            ],
            "_or": [
                304
            ],
            "block_height": [
                62
            ],
            "chain_id": [
                62
            ],
            "end_block": [
                62
            ],
            "first_event_block_number": [
                62
            ],
            "is_hyper_sync": [
                13
            ],
            "latest_fetched_block_number": [
                62
            ],
            "latest_processed_block": [
                62
            ],
            "num_batches_fetched": [
                62
            ],
            "num_events_processed": [
                62
            ],
            "start_block": [
                62
            ],
            "timestamp_caught_up_to_head_or_endblock": [
                360
            ],
            "__typename": [
                258
            ]
        },
        "chain_metadata_order_by": {
            "block_height": [
                340
            ],
            "chain_id": [
                340
            ],
            "end_block": [
                340
            ],
            "first_event_block_number": [
                340
            ],
            "is_hyper_sync": [
                340
            ],
            "latest_fetched_block_number": [
                340
            ],
            "latest_processed_block": [
                340
            ],
            "num_batches_fetched": [
                340
            ],
            "num_events_processed": [
                340
            ],
            "start_block": [
                340
            ],
            "timestamp_caught_up_to_head_or_endblock": [
                340
            ],
            "__typename": [
                258
            ]
        },
        "chain_metadata_select_column": {},
        "chain_metadata_stream_cursor_input": {
            "initial_value": [
                308
            ],
            "ordering": [
                311
            ],
            "__typename": [
                258
            ]
        },
        "chain_metadata_stream_cursor_value_input": {
            "block_height": [
                60
            ],
            "chain_id": [
                60
            ],
            "end_block": [
                60
            ],
            "first_event_block_number": [
                60
            ],
            "is_hyper_sync": [
                12
            ],
            "latest_fetched_block_number": [
                60
            ],
            "latest_processed_block": [
                60
            ],
            "num_batches_fetched": [
                60
            ],
            "num_events_processed": [
                60
            ],
            "start_block": [
                60
            ],
            "timestamp_caught_up_to_head_or_endblock": [
                359
            ],
            "__typename": [
                258
            ]
        },
        "contract_type": {},
        "contract_type_comparison_exp": {
            "_eq": [
                309
            ],
            "_gt": [
                309
            ],
            "_gte": [
                309
            ],
            "_in": [
                309
            ],
            "_is_null": [
                12
            ],
            "_lt": [
                309
            ],
            "_lte": [
                309
            ],
            "_neq": [
                309
            ],
            "_nin": [
                309
            ],
            "__typename": [
                258
            ]
        },
        "cursor_ordering": {},
        "dynamic_contract_registry": {
            "chain_id": [
                60
            ],
            "contract_address": [
                258
            ],
            "contract_type": [
                309
            ],
            "id": [
                258
            ],
            "registering_event_block_number": [
                60
            ],
            "registering_event_block_timestamp": [
                60
            ],
            "registering_event_contract_name": [
                258
            ],
            "registering_event_log_index": [
                60
            ],
            "registering_event_name": [
                258
            ],
            "registering_event_src_address": [
                258
            ],
            "__typename": [
                258
            ]
        },
        "dynamic_contract_registry_bool_exp": {
            "_and": [
                313
            ],
            "_not": [
                313
            ],
            "_or": [
                313
            ],
            "chain_id": [
                62
            ],
            "contract_address": [
                260
            ],
            "contract_type": [
                310
            ],
            "id": [
                260
            ],
            "registering_event_block_number": [
                62
            ],
            "registering_event_block_timestamp": [
                62
            ],
            "registering_event_contract_name": [
                260
            ],
            "registering_event_log_index": [
                62
            ],
            "registering_event_name": [
                260
            ],
            "registering_event_src_address": [
                260
            ],
            "__typename": [
                258
            ]
        },
        "dynamic_contract_registry_order_by": {
            "chain_id": [
                340
            ],
            "contract_address": [
                340
            ],
            "contract_type": [
                340
            ],
            "id": [
                340
            ],
            "registering_event_block_number": [
                340
            ],
            "registering_event_block_timestamp": [
                340
            ],
            "registering_event_contract_name": [
                340
            ],
            "registering_event_log_index": [
                340
            ],
            "registering_event_name": [
                340
            ],
            "registering_event_src_address": [
                340
            ],
            "__typename": [
                258
            ]
        },
        "dynamic_contract_registry_select_column": {},
        "dynamic_contract_registry_stream_cursor_input": {
            "initial_value": [
                317
            ],
            "ordering": [
                311
            ],
            "__typename": [
                258
            ]
        },
        "dynamic_contract_registry_stream_cursor_value_input": {
            "chain_id": [
                60
            ],
            "contract_address": [
                258
            ],
            "contract_type": [
                309
            ],
            "id": [
                258
            ],
            "registering_event_block_number": [
                60
            ],
            "registering_event_block_timestamp": [
                60
            ],
            "registering_event_contract_name": [
                258
            ],
            "registering_event_log_index": [
                60
            ],
            "registering_event_name": [
                258
            ],
            "registering_event_src_address": [
                258
            ],
            "__typename": [
                258
            ]
        },
        "end_of_block_range_scanned_data": {
            "block_hash": [
                258
            ],
            "block_number": [
                60
            ],
            "chain_id": [
                60
            ],
            "__typename": [
                258
            ]
        },
        "end_of_block_range_scanned_data_bool_exp": {
            "_and": [
                319
            ],
            "_not": [
                319
            ],
            "_or": [
                319
            ],
            "block_hash": [
                260
            ],
            "block_number": [
                62
            ],
            "chain_id": [
                62
            ],
            "__typename": [
                258
            ]
        },
        "end_of_block_range_scanned_data_order_by": {
            "block_hash": [
                340
            ],
            "block_number": [
                340
            ],
            "chain_id": [
                340
            ],
            "__typename": [
                258
            ]
        },
        "end_of_block_range_scanned_data_select_column": {},
        "end_of_block_range_scanned_data_stream_cursor_input": {
            "initial_value": [
                323
            ],
            "ordering": [
                311
            ],
            "__typename": [
                258
            ]
        },
        "end_of_block_range_scanned_data_stream_cursor_value_input": {
            "block_hash": [
                258
            ],
            "block_number": [
                60
            ],
            "chain_id": [
                60
            ],
            "__typename": [
                258
            ]
        },
        "event_sync_state": {
            "block_number": [
                60
            ],
            "block_timestamp": [
                60
            ],
            "chain_id": [
                60
            ],
            "is_pre_registering_dynamic_contracts": [
                12
            ],
            "log_index": [
                60
            ],
            "__typename": [
                258
            ]
        },
        "event_sync_state_bool_exp": {
            "_and": [
                325
            ],
            "_not": [
                325
            ],
            "_or": [
                325
            ],
            "block_number": [
                62
            ],
            "block_timestamp": [
                62
            ],
            "chain_id": [
                62
            ],
            "is_pre_registering_dynamic_contracts": [
                13
            ],
            "log_index": [
                62
            ],
            "__typename": [
                258
            ]
        },
        "event_sync_state_order_by": {
            "block_number": [
                340
            ],
            "block_timestamp": [
                340
            ],
            "chain_id": [
                340
            ],
            "is_pre_registering_dynamic_contracts": [
                340
            ],
            "log_index": [
                340
            ],
            "__typename": [
                258
            ]
        },
        "event_sync_state_select_column": {},
        "event_sync_state_stream_cursor_input": {
            "initial_value": [
                329
            ],
            "ordering": [
                311
            ],
            "__typename": [
                258
            ]
        },
        "event_sync_state_stream_cursor_value_input": {
            "block_number": [
                60
            ],
            "block_timestamp": [
                60
            ],
            "chain_id": [
                60
            ],
            "is_pre_registering_dynamic_contracts": [
                12
            ],
            "log_index": [
                60
            ],
            "__typename": [
                258
            ]
        },
        "jsonb": {},
        "jsonb_cast_exp": {
            "String": [
                260
            ],
            "__typename": [
                258
            ]
        },
        "jsonb_comparison_exp": {
            "_cast": [
                331
            ],
            "_contained_in": [
                330
            ],
            "_contains": [
                330
            ],
            "_eq": [
                330
            ],
            "_gt": [
                330
            ],
            "_gte": [
                330
            ],
            "_has_key": [
                258
            ],
            "_has_keys_all": [
                258
            ],
            "_has_keys_any": [
                258
            ],
            "_in": [
                330
            ],
            "_is_null": [
                12
            ],
            "_lt": [
                330
            ],
            "_lte": [
                330
            ],
            "_neq": [
                330
            ],
            "_nin": [
                330
            ],
            "__typename": [
                258
            ]
        },
        "loanstatus": {},
        "loanstatus_comparison_exp": {
            "_eq": [
                333
            ],
            "_gt": [
                333
            ],
            "_gte": [
                333
            ],
            "_in": [
                333
            ],
            "_is_null": [
                12
            ],
            "_lt": [
                333
            ],
            "_lte": [
                333
            ],
            "_neq": [
                333
            ],
            "_nin": [
                333
            ],
            "__typename": [
                258
            ]
        },
        "marketstatus": {},
        "marketstatus_comparison_exp": {
            "_eq": [
                335
            ],
            "_gt": [
                335
            ],
            "_gte": [
                335
            ],
            "_in": [
                335
            ],
            "_is_null": [
                12
            ],
            "_lt": [
                335
            ],
            "_lte": [
                335
            ],
            "_neq": [
                335
            ],
            "_nin": [
                335
            ],
            "__typename": [
                258
            ]
        },
        "numeric": {},
        "numeric_array_comparison_exp": {
            "_contained_in": [
                337
            ],
            "_contains": [
                337
            ],
            "_eq": [
                337
            ],
            "_gt": [
                337
            ],
            "_gte": [
                337
            ],
            "_in": [
                337
            ],
            "_is_null": [
                12
            ],
            "_lt": [
                337
            ],
            "_lte": [
                337
            ],
            "_neq": [
                337
            ],
            "_nin": [
                337
            ],
            "__typename": [
                258
            ]
        },
        "numeric_comparison_exp": {
            "_eq": [
                337
            ],
            "_gt": [
                337
            ],
            "_gte": [
                337
            ],
            "_in": [
                337
            ],
            "_is_null": [
                12
            ],
            "_lt": [
                337
            ],
            "_lte": [
                337
            ],
            "_neq": [
                337
            ],
            "_nin": [
                337
            ],
            "__typename": [
                258
            ]
        },
        "order_by": {},
        "persisted_state": {
            "abi_files_hash": [
                258
            ],
            "config_hash": [
                258
            ],
            "envio_version": [
                258
            ],
            "handler_files_hash": [
                258
            ],
            "id": [
                60
            ],
            "schema_hash": [
                258
            ],
            "__typename": [
                258
            ]
        },
        "persisted_state_bool_exp": {
            "_and": [
                342
            ],
            "_not": [
                342
            ],
            "_or": [
                342
            ],
            "abi_files_hash": [
                260
            ],
            "config_hash": [
                260
            ],
            "envio_version": [
                260
            ],
            "handler_files_hash": [
                260
            ],
            "id": [
                62
            ],
            "schema_hash": [
                260
            ],
            "__typename": [
                258
            ]
        },
        "persisted_state_order_by": {
            "abi_files_hash": [
                340
            ],
            "config_hash": [
                340
            ],
            "envio_version": [
                340
            ],
            "handler_files_hash": [
                340
            ],
            "id": [
                340
            ],
            "schema_hash": [
                340
            ],
            "__typename": [
                258
            ]
        },
        "persisted_state_select_column": {},
        "persisted_state_stream_cursor_input": {
            "initial_value": [
                346
            ],
            "ordering": [
                311
            ],
            "__typename": [
                258
            ]
        },
        "persisted_state_stream_cursor_value_input": {
            "abi_files_hash": [
                258
            ],
            "config_hash": [
                258
            ],
            "envio_version": [
                258
            ],
            "handler_files_hash": [
                258
            ],
            "id": [
                60
            ],
            "schema_hash": [
                258
            ],
            "__typename": [
                258
            ]
        },
        "presaleclaimtype": {},
        "presaleclaimtype_comparison_exp": {
            "_eq": [
                347
            ],
            "_gt": [
                347
            ],
            "_gte": [
                347
            ],
            "_in": [
                347
            ],
            "_is_null": [
                12
            ],
            "_lt": [
                347
            ],
            "_lte": [
                347
            ],
            "_neq": [
                347
            ],
            "_nin": [
                347
            ],
            "__typename": [
                258
            ]
        },
        "raw_events": {
            "block_fields": [
                330,
                {
                    "path": [
                        258
                    ]
                }
            ],
            "block_hash": [
                258
            ],
            "block_number": [
                60
            ],
            "block_timestamp": [
                60
            ],
            "chain_id": [
                60
            ],
            "contract_name": [
                258
            ],
            "db_write_timestamp": [
                357
            ],
            "event_id": [
                337
            ],
            "event_name": [
                258
            ],
            "log_index": [
                60
            ],
            "params": [
                330,
                {
                    "path": [
                        258
                    ]
                }
            ],
            "serial": [
                60
            ],
            "src_address": [
                258
            ],
            "transaction_fields": [
                330,
                {
                    "path": [
                        258
                    ]
                }
            ],
            "__typename": [
                258
            ]
        },
        "raw_events_bool_exp": {
            "_and": [
                350
            ],
            "_not": [
                350
            ],
            "_or": [
                350
            ],
            "block_fields": [
                332
            ],
            "block_hash": [
                260
            ],
            "block_number": [
                62
            ],
            "block_timestamp": [
                62
            ],
            "chain_id": [
                62
            ],
            "contract_name": [
                260
            ],
            "db_write_timestamp": [
                358
            ],
            "event_id": [
                339
            ],
            "event_name": [
                260
            ],
            "log_index": [
                62
            ],
            "params": [
                332
            ],
            "serial": [
                62
            ],
            "src_address": [
                260
            ],
            "transaction_fields": [
                332
            ],
            "__typename": [
                258
            ]
        },
        "raw_events_order_by": {
            "block_fields": [
                340
            ],
            "block_hash": [
                340
            ],
            "block_number": [
                340
            ],
            "block_timestamp": [
                340
            ],
            "chain_id": [
                340
            ],
            "contract_name": [
                340
            ],
            "db_write_timestamp": [
                340
            ],
            "event_id": [
                340
            ],
            "event_name": [
                340
            ],
            "log_index": [
                340
            ],
            "params": [
                340
            ],
            "serial": [
                340
            ],
            "src_address": [
                340
            ],
            "transaction_fields": [
                340
            ],
            "__typename": [
                258
            ]
        },
        "raw_events_select_column": {},
        "raw_events_stream_cursor_input": {
            "initial_value": [
                354
            ],
            "ordering": [
                311
            ],
            "__typename": [
                258
            ]
        },
        "raw_events_stream_cursor_value_input": {
            "block_fields": [
                330
            ],
            "block_hash": [
                258
            ],
            "block_number": [
                60
            ],
            "block_timestamp": [
                60
            ],
            "chain_id": [
                60
            ],
            "contract_name": [
                258
            ],
            "db_write_timestamp": [
                357
            ],
            "event_id": [
                337
            ],
            "event_name": [
                258
            ],
            "log_index": [
                60
            ],
            "params": [
                330
            ],
            "serial": [
                60
            ],
            "src_address": [
                258
            ],
            "transaction_fields": [
                330
            ],
            "__typename": [
                258
            ]
        },
        "stakestatus": {},
        "stakestatus_comparison_exp": {
            "_eq": [
                355
            ],
            "_gt": [
                355
            ],
            "_gte": [
                355
            ],
            "_in": [
                355
            ],
            "_is_null": [
                12
            ],
            "_lt": [
                355
            ],
            "_lte": [
                355
            ],
            "_neq": [
                355
            ],
            "_nin": [
                355
            ],
            "__typename": [
                258
            ]
        },
        "timestamp": {},
        "timestamp_comparison_exp": {
            "_eq": [
                357
            ],
            "_gt": [
                357
            ],
            "_gte": [
                357
            ],
            "_in": [
                357
            ],
            "_is_null": [
                12
            ],
            "_lt": [
                357
            ],
            "_lte": [
                357
            ],
            "_neq": [
                357
            ],
            "_nin": [
                357
            ],
            "__typename": [
                258
            ]
        },
        "timestamptz": {},
        "timestamptz_comparison_exp": {
            "_eq": [
                359
            ],
            "_gt": [
                359
            ],
            "_gte": [
                359
            ],
            "_in": [
                359
            ],
            "_is_null": [
                12
            ],
            "_lt": [
                359
            ],
            "_lte": [
                359
            ],
            "_neq": [
                359
            ],
            "_nin": [
                359
            ],
            "__typename": [
                258
            ]
        },
        "tradetype": {},
        "tradetype_comparison_exp": {
            "_eq": [
                361
            ],
            "_gt": [
                361
            ],
            "_gte": [
                361
            ],
            "_in": [
                361
            ],
            "_is_null": [
                12
            ],
            "_lt": [
                361
            ],
            "_lte": [
                361
            ],
            "_neq": [
                361
            ],
            "_nin": [
                361
            ],
            "__typename": [
                258
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
                        60
                    ],
                    "offset": [
                        60
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
                        258,
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
                        60
                    ],
                    "offset": [
                        60
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
                        258,
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
                        60
                    ],
                    "offset": [
                        60
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
                        258,
                        "String!"
                    ]
                }
            ],
            "FeeDistribution": [
                20,
                {
                    "distinct_on": [
                        27,
                        "[FeeDistribution_select_column!]"
                    ],
                    "limit": [
                        60
                    ],
                    "offset": [
                        60
                    ],
                    "order_by": [
                        26,
                        "[FeeDistribution_order_by!]"
                    ],
                    "where": [
                        23
                    ]
                }
            ],
            "FeeDistribution_by_pk": [
                20,
                {
                    "id": [
                        258,
                        "String!"
                    ]
                }
            ],
            "FloorElevation": [
                37,
                {
                    "distinct_on": [
                        44,
                        "[FloorElevation_select_column!]"
                    ],
                    "limit": [
                        60
                    ],
                    "offset": [
                        60
                    ],
                    "order_by": [
                        43,
                        "[FloorElevation_order_by!]"
                    ],
                    "where": [
                        40
                    ]
                }
            ],
            "FloorElevation_by_pk": [
                37,
                {
                    "id": [
                        258,
                        "String!"
                    ]
                }
            ],
            "GlobalStats": [
                54,
                {
                    "distinct_on": [
                        57,
                        "[GlobalStats_select_column!]"
                    ],
                    "limit": [
                        60
                    ],
                    "offset": [
                        60
                    ],
                    "order_by": [
                        56,
                        "[GlobalStats_order_by!]"
                    ],
                    "where": [
                        55
                    ]
                }
            ],
            "GlobalStats_by_pk": [
                54,
                {
                    "id": [
                        258,
                        "String!"
                    ]
                }
            ],
            "Loan": [
                63,
                {
                    "distinct_on": [
                        87,
                        "[Loan_select_column!]"
                    ],
                    "limit": [
                        60
                    ],
                    "offset": [
                        60
                    ],
                    "order_by": [
                        86,
                        "[Loan_order_by!]"
                    ],
                    "where": [
                        83
                    ]
                }
            ],
            "LoanStatusHistory": [
                64,
                {
                    "distinct_on": [
                        71,
                        "[LoanStatusHistory_select_column!]"
                    ],
                    "limit": [
                        60
                    ],
                    "offset": [
                        60
                    ],
                    "order_by": [
                        70,
                        "[LoanStatusHistory_order_by!]"
                    ],
                    "where": [
                        67
                    ]
                }
            ],
            "LoanStatusHistory_by_pk": [
                64,
                {
                    "id": [
                        258,
                        "String!"
                    ]
                }
            ],
            "Loan_by_pk": [
                63,
                {
                    "id": [
                        258,
                        "String!"
                    ]
                }
            ],
            "Market": [
                97,
                {
                    "distinct_on": [
                        116,
                        "[Market_select_column!]"
                    ],
                    "limit": [
                        60
                    ],
                    "offset": [
                        60
                    ],
                    "order_by": [
                        115,
                        "[Market_order_by!]"
                    ],
                    "where": [
                        112
                    ]
                }
            ],
            "MarketRollingStats": [
                98,
                {
                    "distinct_on": [
                        101,
                        "[MarketRollingStats_select_column!]"
                    ],
                    "limit": [
                        60
                    ],
                    "offset": [
                        60
                    ],
                    "order_by": [
                        100,
                        "[MarketRollingStats_order_by!]"
                    ],
                    "where": [
                        99
                    ]
                }
            ],
            "MarketRollingStats_by_pk": [
                98,
                {
                    "id": [
                        258,
                        "String!"
                    ]
                }
            ],
            "MarketSnapshot": [
                104,
                {
                    "distinct_on": [
                        107,
                        "[MarketSnapshot_select_column!]"
                    ],
                    "limit": [
                        60
                    ],
                    "offset": [
                        60
                    ],
                    "order_by": [
                        106,
                        "[MarketSnapshot_order_by!]"
                    ],
                    "where": [
                        105
                    ]
                }
            ],
            "MarketSnapshot_by_pk": [
                104,
                {
                    "id": [
                        258,
                        "String!"
                    ]
                }
            ],
            "Market_by_pk": [
                97,
                {
                    "id": [
                        258,
                        "String!"
                    ]
                }
            ],
            "ModuleAddress": [
                126,
                {
                    "distinct_on": [
                        129,
                        "[ModuleAddress_select_column!]"
                    ],
                    "limit": [
                        60
                    ],
                    "offset": [
                        60
                    ],
                    "order_by": [
                        128,
                        "[ModuleAddress_order_by!]"
                    ],
                    "where": [
                        127
                    ]
                }
            ],
            "ModuleAddress_by_pk": [
                126,
                {
                    "id": [
                        258,
                        "String!"
                    ]
                }
            ],
            "ModuleRegistry": [
                132,
                {
                    "distinct_on": [
                        135,
                        "[ModuleRegistry_select_column!]"
                    ],
                    "limit": [
                        60
                    ],
                    "offset": [
                        60
                    ],
                    "order_by": [
                        134,
                        "[ModuleRegistry_order_by!]"
                    ],
                    "where": [
                        133
                    ]
                }
            ],
            "ModuleRegistry_by_pk": [
                132,
                {
                    "id": [
                        258,
                        "String!"
                    ]
                }
            ],
            "PreSaleContract": [
                138,
                {
                    "distinct_on": [
                        141,
                        "[PreSaleContract_select_column!]"
                    ],
                    "limit": [
                        60
                    ],
                    "offset": [
                        60
                    ],
                    "order_by": [
                        140,
                        "[PreSaleContract_order_by!]"
                    ],
                    "where": [
                        139
                    ]
                }
            ],
            "PreSaleContract_by_pk": [
                138,
                {
                    "id": [
                        258,
                        "String!"
                    ]
                }
            ],
            "PresaleClaim": [
                144,
                {
                    "distinct_on": [
                        151,
                        "[PresaleClaim_select_column!]"
                    ],
                    "limit": [
                        60
                    ],
                    "offset": [
                        60
                    ],
                    "order_by": [
                        150,
                        "[PresaleClaim_order_by!]"
                    ],
                    "where": [
                        147
                    ]
                }
            ],
            "PresaleClaim_by_pk": [
                144,
                {
                    "id": [
                        258,
                        "String!"
                    ]
                }
            ],
            "PresaleParticipation": [
                161,
                {
                    "distinct_on": [
                        168,
                        "[PresaleParticipation_select_column!]"
                    ],
                    "limit": [
                        60
                    ],
                    "offset": [
                        60
                    ],
                    "order_by": [
                        167,
                        "[PresaleParticipation_order_by!]"
                    ],
                    "where": [
                        164
                    ]
                }
            ],
            "PresaleParticipation_by_pk": [
                161,
                {
                    "id": [
                        258,
                        "String!"
                    ]
                }
            ],
            "PriceCandle": [
                178,
                {
                    "distinct_on": [
                        181,
                        "[PriceCandle_select_column!]"
                    ],
                    "limit": [
                        60
                    ],
                    "offset": [
                        60
                    ],
                    "order_by": [
                        180,
                        "[PriceCandle_order_by!]"
                    ],
                    "where": [
                        179
                    ]
                }
            ],
            "PriceCandle_by_pk": [
                178,
                {
                    "id": [
                        258,
                        "String!"
                    ]
                }
            ],
            "Role": [
                184,
                {
                    "distinct_on": [
                        225,
                        "[Role_select_column!]"
                    ],
                    "limit": [
                        60
                    ],
                    "offset": [
                        60
                    ],
                    "order_by": [
                        224,
                        "[Role_order_by!]"
                    ],
                    "where": [
                        221
                    ]
                }
            ],
            "RoleMember": [
                185,
                {
                    "distinct_on": [
                        192,
                        "[RoleMember_select_column!]"
                    ],
                    "limit": [
                        60
                    ],
                    "offset": [
                        60
                    ],
                    "order_by": [
                        191,
                        "[RoleMember_order_by!]"
                    ],
                    "where": [
                        188
                    ]
                }
            ],
            "RoleMember_by_pk": [
                185,
                {
                    "id": [
                        258,
                        "String!"
                    ]
                }
            ],
            "RolePermission": [
                202,
                {
                    "distinct_on": [
                        209,
                        "[RolePermission_select_column!]"
                    ],
                    "limit": [
                        60
                    ],
                    "offset": [
                        60
                    ],
                    "order_by": [
                        208,
                        "[RolePermission_order_by!]"
                    ],
                    "where": [
                        205
                    ]
                }
            ],
            "RolePermission_by_pk": [
                202,
                {
                    "id": [
                        258,
                        "String!"
                    ]
                }
            ],
            "Role_by_pk": [
                184,
                {
                    "id": [
                        258,
                        "String!"
                    ]
                }
            ],
            "Stake": [
                235,
                {
                    "distinct_on": [
                        242,
                        "[Stake_select_column!]"
                    ],
                    "limit": [
                        60
                    ],
                    "offset": [
                        60
                    ],
                    "order_by": [
                        241,
                        "[Stake_order_by!]"
                    ],
                    "where": [
                        238
                    ]
                }
            ],
            "Stake_by_pk": [
                235,
                {
                    "id": [
                        258,
                        "String!"
                    ]
                }
            ],
            "StakingContract": [
                252,
                {
                    "distinct_on": [
                        255,
                        "[StakingContract_select_column!]"
                    ],
                    "limit": [
                        60
                    ],
                    "offset": [
                        60
                    ],
                    "order_by": [
                        254,
                        "[StakingContract_order_by!]"
                    ],
                    "where": [
                        253
                    ]
                }
            ],
            "StakingContract_by_pk": [
                252,
                {
                    "id": [
                        258,
                        "String!"
                    ]
                }
            ],
            "Token": [
                261,
                {
                    "distinct_on": [
                        264,
                        "[Token_select_column!]"
                    ],
                    "limit": [
                        60
                    ],
                    "offset": [
                        60
                    ],
                    "order_by": [
                        263,
                        "[Token_order_by!]"
                    ],
                    "where": [
                        262
                    ]
                }
            ],
            "Token_by_pk": [
                261,
                {
                    "id": [
                        258,
                        "String!"
                    ]
                }
            ],
            "Trade": [
                267,
                {
                    "distinct_on": [
                        274,
                        "[Trade_select_column!]"
                    ],
                    "limit": [
                        60
                    ],
                    "offset": [
                        60
                    ],
                    "order_by": [
                        273,
                        "[Trade_order_by!]"
                    ],
                    "where": [
                        270
                    ]
                }
            ],
            "Trade_by_pk": [
                267,
                {
                    "id": [
                        258,
                        "String!"
                    ]
                }
            ],
            "UserMarketPosition": [
                284,
                {
                    "distinct_on": [
                        291,
                        "[UserMarketPosition_select_column!]"
                    ],
                    "limit": [
                        60
                    ],
                    "offset": [
                        60
                    ],
                    "order_by": [
                        290,
                        "[UserMarketPosition_order_by!]"
                    ],
                    "where": [
                        287
                    ]
                }
            ],
            "UserMarketPosition_by_pk": [
                284,
                {
                    "id": [
                        258,
                        "String!"
                    ]
                }
            ],
            "chain_metadata": [
                303,
                {
                    "distinct_on": [
                        306,
                        "[chain_metadata_select_column!]"
                    ],
                    "limit": [
                        60
                    ],
                    "offset": [
                        60
                    ],
                    "order_by": [
                        305,
                        "[chain_metadata_order_by!]"
                    ],
                    "where": [
                        304
                    ]
                }
            ],
            "chain_metadata_by_pk": [
                303,
                {
                    "chain_id": [
                        60,
                        "Int!"
                    ]
                }
            ],
            "dynamic_contract_registry": [
                312,
                {
                    "distinct_on": [
                        315,
                        "[dynamic_contract_registry_select_column!]"
                    ],
                    "limit": [
                        60
                    ],
                    "offset": [
                        60
                    ],
                    "order_by": [
                        314,
                        "[dynamic_contract_registry_order_by!]"
                    ],
                    "where": [
                        313
                    ]
                }
            ],
            "dynamic_contract_registry_by_pk": [
                312,
                {
                    "id": [
                        258,
                        "String!"
                    ]
                }
            ],
            "end_of_block_range_scanned_data": [
                318,
                {
                    "distinct_on": [
                        321,
                        "[end_of_block_range_scanned_data_select_column!]"
                    ],
                    "limit": [
                        60
                    ],
                    "offset": [
                        60
                    ],
                    "order_by": [
                        320,
                        "[end_of_block_range_scanned_data_order_by!]"
                    ],
                    "where": [
                        319
                    ]
                }
            ],
            "end_of_block_range_scanned_data_by_pk": [
                318,
                {
                    "block_number": [
                        60,
                        "Int!"
                    ],
                    "chain_id": [
                        60,
                        "Int!"
                    ]
                }
            ],
            "event_sync_state": [
                324,
                {
                    "distinct_on": [
                        327,
                        "[event_sync_state_select_column!]"
                    ],
                    "limit": [
                        60
                    ],
                    "offset": [
                        60
                    ],
                    "order_by": [
                        326,
                        "[event_sync_state_order_by!]"
                    ],
                    "where": [
                        325
                    ]
                }
            ],
            "event_sync_state_by_pk": [
                324,
                {
                    "chain_id": [
                        60,
                        "Int!"
                    ]
                }
            ],
            "persisted_state": [
                341,
                {
                    "distinct_on": [
                        344,
                        "[persisted_state_select_column!]"
                    ],
                    "limit": [
                        60
                    ],
                    "offset": [
                        60
                    ],
                    "order_by": [
                        343,
                        "[persisted_state_order_by!]"
                    ],
                    "where": [
                        342
                    ]
                }
            ],
            "persisted_state_by_pk": [
                341,
                {
                    "id": [
                        60,
                        "Int!"
                    ]
                }
            ],
            "raw_events": [
                349,
                {
                    "distinct_on": [
                        352,
                        "[raw_events_select_column!]"
                    ],
                    "limit": [
                        60
                    ],
                    "offset": [
                        60
                    ],
                    "order_by": [
                        351,
                        "[raw_events_order_by!]"
                    ],
                    "where": [
                        350
                    ]
                }
            ],
            "raw_events_by_pk": [
                349,
                {
                    "serial": [
                        60,
                        "Int!"
                    ]
                }
            ],
            "__typename": [
                258
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
                        60
                    ],
                    "offset": [
                        60
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
                        258,
                        "String!"
                    ]
                }
            ],
            "Account_stream": [
                0,
                {
                    "batch_size": [
                        60,
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
                        60
                    ],
                    "offset": [
                        60
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
                        258,
                        "String!"
                    ]
                }
            ],
            "AuthorizerContract_stream": [
                6,
                {
                    "batch_size": [
                        60,
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
                        60
                    ],
                    "offset": [
                        60
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
                        258,
                        "String!"
                    ]
                }
            ],
            "CreditFacilityContract_stream": [
                14,
                {
                    "batch_size": [
                        60,
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
            "FeeDistribution": [
                20,
                {
                    "distinct_on": [
                        27,
                        "[FeeDistribution_select_column!]"
                    ],
                    "limit": [
                        60
                    ],
                    "offset": [
                        60
                    ],
                    "order_by": [
                        26,
                        "[FeeDistribution_order_by!]"
                    ],
                    "where": [
                        23
                    ]
                }
            ],
            "FeeDistribution_by_pk": [
                20,
                {
                    "id": [
                        258,
                        "String!"
                    ]
                }
            ],
            "FeeDistribution_stream": [
                20,
                {
                    "batch_size": [
                        60,
                        "Int!"
                    ],
                    "cursor": [
                        31,
                        "[FeeDistribution_stream_cursor_input]!"
                    ],
                    "where": [
                        23
                    ]
                }
            ],
            "FloorElevation": [
                37,
                {
                    "distinct_on": [
                        44,
                        "[FloorElevation_select_column!]"
                    ],
                    "limit": [
                        60
                    ],
                    "offset": [
                        60
                    ],
                    "order_by": [
                        43,
                        "[FloorElevation_order_by!]"
                    ],
                    "where": [
                        40
                    ]
                }
            ],
            "FloorElevation_by_pk": [
                37,
                {
                    "id": [
                        258,
                        "String!"
                    ]
                }
            ],
            "FloorElevation_stream": [
                37,
                {
                    "batch_size": [
                        60,
                        "Int!"
                    ],
                    "cursor": [
                        48,
                        "[FloorElevation_stream_cursor_input]!"
                    ],
                    "where": [
                        40
                    ]
                }
            ],
            "GlobalStats": [
                54,
                {
                    "distinct_on": [
                        57,
                        "[GlobalStats_select_column!]"
                    ],
                    "limit": [
                        60
                    ],
                    "offset": [
                        60
                    ],
                    "order_by": [
                        56,
                        "[GlobalStats_order_by!]"
                    ],
                    "where": [
                        55
                    ]
                }
            ],
            "GlobalStats_by_pk": [
                54,
                {
                    "id": [
                        258,
                        "String!"
                    ]
                }
            ],
            "GlobalStats_stream": [
                54,
                {
                    "batch_size": [
                        60,
                        "Int!"
                    ],
                    "cursor": [
                        58,
                        "[GlobalStats_stream_cursor_input]!"
                    ],
                    "where": [
                        55
                    ]
                }
            ],
            "Loan": [
                63,
                {
                    "distinct_on": [
                        87,
                        "[Loan_select_column!]"
                    ],
                    "limit": [
                        60
                    ],
                    "offset": [
                        60
                    ],
                    "order_by": [
                        86,
                        "[Loan_order_by!]"
                    ],
                    "where": [
                        83
                    ]
                }
            ],
            "LoanStatusHistory": [
                64,
                {
                    "distinct_on": [
                        71,
                        "[LoanStatusHistory_select_column!]"
                    ],
                    "limit": [
                        60
                    ],
                    "offset": [
                        60
                    ],
                    "order_by": [
                        70,
                        "[LoanStatusHistory_order_by!]"
                    ],
                    "where": [
                        67
                    ]
                }
            ],
            "LoanStatusHistory_by_pk": [
                64,
                {
                    "id": [
                        258,
                        "String!"
                    ]
                }
            ],
            "LoanStatusHistory_stream": [
                64,
                {
                    "batch_size": [
                        60,
                        "Int!"
                    ],
                    "cursor": [
                        75,
                        "[LoanStatusHistory_stream_cursor_input]!"
                    ],
                    "where": [
                        67
                    ]
                }
            ],
            "Loan_by_pk": [
                63,
                {
                    "id": [
                        258,
                        "String!"
                    ]
                }
            ],
            "Loan_stream": [
                63,
                {
                    "batch_size": [
                        60,
                        "Int!"
                    ],
                    "cursor": [
                        91,
                        "[Loan_stream_cursor_input]!"
                    ],
                    "where": [
                        83
                    ]
                }
            ],
            "Market": [
                97,
                {
                    "distinct_on": [
                        116,
                        "[Market_select_column!]"
                    ],
                    "limit": [
                        60
                    ],
                    "offset": [
                        60
                    ],
                    "order_by": [
                        115,
                        "[Market_order_by!]"
                    ],
                    "where": [
                        112
                    ]
                }
            ],
            "MarketRollingStats": [
                98,
                {
                    "distinct_on": [
                        101,
                        "[MarketRollingStats_select_column!]"
                    ],
                    "limit": [
                        60
                    ],
                    "offset": [
                        60
                    ],
                    "order_by": [
                        100,
                        "[MarketRollingStats_order_by!]"
                    ],
                    "where": [
                        99
                    ]
                }
            ],
            "MarketRollingStats_by_pk": [
                98,
                {
                    "id": [
                        258,
                        "String!"
                    ]
                }
            ],
            "MarketRollingStats_stream": [
                98,
                {
                    "batch_size": [
                        60,
                        "Int!"
                    ],
                    "cursor": [
                        102,
                        "[MarketRollingStats_stream_cursor_input]!"
                    ],
                    "where": [
                        99
                    ]
                }
            ],
            "MarketSnapshot": [
                104,
                {
                    "distinct_on": [
                        107,
                        "[MarketSnapshot_select_column!]"
                    ],
                    "limit": [
                        60
                    ],
                    "offset": [
                        60
                    ],
                    "order_by": [
                        106,
                        "[MarketSnapshot_order_by!]"
                    ],
                    "where": [
                        105
                    ]
                }
            ],
            "MarketSnapshot_by_pk": [
                104,
                {
                    "id": [
                        258,
                        "String!"
                    ]
                }
            ],
            "MarketSnapshot_stream": [
                104,
                {
                    "batch_size": [
                        60,
                        "Int!"
                    ],
                    "cursor": [
                        108,
                        "[MarketSnapshot_stream_cursor_input]!"
                    ],
                    "where": [
                        105
                    ]
                }
            ],
            "Market_by_pk": [
                97,
                {
                    "id": [
                        258,
                        "String!"
                    ]
                }
            ],
            "Market_stream": [
                97,
                {
                    "batch_size": [
                        60,
                        "Int!"
                    ],
                    "cursor": [
                        120,
                        "[Market_stream_cursor_input]!"
                    ],
                    "where": [
                        112
                    ]
                }
            ],
            "ModuleAddress": [
                126,
                {
                    "distinct_on": [
                        129,
                        "[ModuleAddress_select_column!]"
                    ],
                    "limit": [
                        60
                    ],
                    "offset": [
                        60
                    ],
                    "order_by": [
                        128,
                        "[ModuleAddress_order_by!]"
                    ],
                    "where": [
                        127
                    ]
                }
            ],
            "ModuleAddress_by_pk": [
                126,
                {
                    "id": [
                        258,
                        "String!"
                    ]
                }
            ],
            "ModuleAddress_stream": [
                126,
                {
                    "batch_size": [
                        60,
                        "Int!"
                    ],
                    "cursor": [
                        130,
                        "[ModuleAddress_stream_cursor_input]!"
                    ],
                    "where": [
                        127
                    ]
                }
            ],
            "ModuleRegistry": [
                132,
                {
                    "distinct_on": [
                        135,
                        "[ModuleRegistry_select_column!]"
                    ],
                    "limit": [
                        60
                    ],
                    "offset": [
                        60
                    ],
                    "order_by": [
                        134,
                        "[ModuleRegistry_order_by!]"
                    ],
                    "where": [
                        133
                    ]
                }
            ],
            "ModuleRegistry_by_pk": [
                132,
                {
                    "id": [
                        258,
                        "String!"
                    ]
                }
            ],
            "ModuleRegistry_stream": [
                132,
                {
                    "batch_size": [
                        60,
                        "Int!"
                    ],
                    "cursor": [
                        136,
                        "[ModuleRegistry_stream_cursor_input]!"
                    ],
                    "where": [
                        133
                    ]
                }
            ],
            "PreSaleContract": [
                138,
                {
                    "distinct_on": [
                        141,
                        "[PreSaleContract_select_column!]"
                    ],
                    "limit": [
                        60
                    ],
                    "offset": [
                        60
                    ],
                    "order_by": [
                        140,
                        "[PreSaleContract_order_by!]"
                    ],
                    "where": [
                        139
                    ]
                }
            ],
            "PreSaleContract_by_pk": [
                138,
                {
                    "id": [
                        258,
                        "String!"
                    ]
                }
            ],
            "PreSaleContract_stream": [
                138,
                {
                    "batch_size": [
                        60,
                        "Int!"
                    ],
                    "cursor": [
                        142,
                        "[PreSaleContract_stream_cursor_input]!"
                    ],
                    "where": [
                        139
                    ]
                }
            ],
            "PresaleClaim": [
                144,
                {
                    "distinct_on": [
                        151,
                        "[PresaleClaim_select_column!]"
                    ],
                    "limit": [
                        60
                    ],
                    "offset": [
                        60
                    ],
                    "order_by": [
                        150,
                        "[PresaleClaim_order_by!]"
                    ],
                    "where": [
                        147
                    ]
                }
            ],
            "PresaleClaim_by_pk": [
                144,
                {
                    "id": [
                        258,
                        "String!"
                    ]
                }
            ],
            "PresaleClaim_stream": [
                144,
                {
                    "batch_size": [
                        60,
                        "Int!"
                    ],
                    "cursor": [
                        155,
                        "[PresaleClaim_stream_cursor_input]!"
                    ],
                    "where": [
                        147
                    ]
                }
            ],
            "PresaleParticipation": [
                161,
                {
                    "distinct_on": [
                        168,
                        "[PresaleParticipation_select_column!]"
                    ],
                    "limit": [
                        60
                    ],
                    "offset": [
                        60
                    ],
                    "order_by": [
                        167,
                        "[PresaleParticipation_order_by!]"
                    ],
                    "where": [
                        164
                    ]
                }
            ],
            "PresaleParticipation_by_pk": [
                161,
                {
                    "id": [
                        258,
                        "String!"
                    ]
                }
            ],
            "PresaleParticipation_stream": [
                161,
                {
                    "batch_size": [
                        60,
                        "Int!"
                    ],
                    "cursor": [
                        172,
                        "[PresaleParticipation_stream_cursor_input]!"
                    ],
                    "where": [
                        164
                    ]
                }
            ],
            "PriceCandle": [
                178,
                {
                    "distinct_on": [
                        181,
                        "[PriceCandle_select_column!]"
                    ],
                    "limit": [
                        60
                    ],
                    "offset": [
                        60
                    ],
                    "order_by": [
                        180,
                        "[PriceCandle_order_by!]"
                    ],
                    "where": [
                        179
                    ]
                }
            ],
            "PriceCandle_by_pk": [
                178,
                {
                    "id": [
                        258,
                        "String!"
                    ]
                }
            ],
            "PriceCandle_stream": [
                178,
                {
                    "batch_size": [
                        60,
                        "Int!"
                    ],
                    "cursor": [
                        182,
                        "[PriceCandle_stream_cursor_input]!"
                    ],
                    "where": [
                        179
                    ]
                }
            ],
            "Role": [
                184,
                {
                    "distinct_on": [
                        225,
                        "[Role_select_column!]"
                    ],
                    "limit": [
                        60
                    ],
                    "offset": [
                        60
                    ],
                    "order_by": [
                        224,
                        "[Role_order_by!]"
                    ],
                    "where": [
                        221
                    ]
                }
            ],
            "RoleMember": [
                185,
                {
                    "distinct_on": [
                        192,
                        "[RoleMember_select_column!]"
                    ],
                    "limit": [
                        60
                    ],
                    "offset": [
                        60
                    ],
                    "order_by": [
                        191,
                        "[RoleMember_order_by!]"
                    ],
                    "where": [
                        188
                    ]
                }
            ],
            "RoleMember_by_pk": [
                185,
                {
                    "id": [
                        258,
                        "String!"
                    ]
                }
            ],
            "RoleMember_stream": [
                185,
                {
                    "batch_size": [
                        60,
                        "Int!"
                    ],
                    "cursor": [
                        196,
                        "[RoleMember_stream_cursor_input]!"
                    ],
                    "where": [
                        188
                    ]
                }
            ],
            "RolePermission": [
                202,
                {
                    "distinct_on": [
                        209,
                        "[RolePermission_select_column!]"
                    ],
                    "limit": [
                        60
                    ],
                    "offset": [
                        60
                    ],
                    "order_by": [
                        208,
                        "[RolePermission_order_by!]"
                    ],
                    "where": [
                        205
                    ]
                }
            ],
            "RolePermission_by_pk": [
                202,
                {
                    "id": [
                        258,
                        "String!"
                    ]
                }
            ],
            "RolePermission_stream": [
                202,
                {
                    "batch_size": [
                        60,
                        "Int!"
                    ],
                    "cursor": [
                        213,
                        "[RolePermission_stream_cursor_input]!"
                    ],
                    "where": [
                        205
                    ]
                }
            ],
            "Role_by_pk": [
                184,
                {
                    "id": [
                        258,
                        "String!"
                    ]
                }
            ],
            "Role_stream": [
                184,
                {
                    "batch_size": [
                        60,
                        "Int!"
                    ],
                    "cursor": [
                        229,
                        "[Role_stream_cursor_input]!"
                    ],
                    "where": [
                        221
                    ]
                }
            ],
            "Stake": [
                235,
                {
                    "distinct_on": [
                        242,
                        "[Stake_select_column!]"
                    ],
                    "limit": [
                        60
                    ],
                    "offset": [
                        60
                    ],
                    "order_by": [
                        241,
                        "[Stake_order_by!]"
                    ],
                    "where": [
                        238
                    ]
                }
            ],
            "Stake_by_pk": [
                235,
                {
                    "id": [
                        258,
                        "String!"
                    ]
                }
            ],
            "Stake_stream": [
                235,
                {
                    "batch_size": [
                        60,
                        "Int!"
                    ],
                    "cursor": [
                        246,
                        "[Stake_stream_cursor_input]!"
                    ],
                    "where": [
                        238
                    ]
                }
            ],
            "StakingContract": [
                252,
                {
                    "distinct_on": [
                        255,
                        "[StakingContract_select_column!]"
                    ],
                    "limit": [
                        60
                    ],
                    "offset": [
                        60
                    ],
                    "order_by": [
                        254,
                        "[StakingContract_order_by!]"
                    ],
                    "where": [
                        253
                    ]
                }
            ],
            "StakingContract_by_pk": [
                252,
                {
                    "id": [
                        258,
                        "String!"
                    ]
                }
            ],
            "StakingContract_stream": [
                252,
                {
                    "batch_size": [
                        60,
                        "Int!"
                    ],
                    "cursor": [
                        256,
                        "[StakingContract_stream_cursor_input]!"
                    ],
                    "where": [
                        253
                    ]
                }
            ],
            "Token": [
                261,
                {
                    "distinct_on": [
                        264,
                        "[Token_select_column!]"
                    ],
                    "limit": [
                        60
                    ],
                    "offset": [
                        60
                    ],
                    "order_by": [
                        263,
                        "[Token_order_by!]"
                    ],
                    "where": [
                        262
                    ]
                }
            ],
            "Token_by_pk": [
                261,
                {
                    "id": [
                        258,
                        "String!"
                    ]
                }
            ],
            "Token_stream": [
                261,
                {
                    "batch_size": [
                        60,
                        "Int!"
                    ],
                    "cursor": [
                        265,
                        "[Token_stream_cursor_input]!"
                    ],
                    "where": [
                        262
                    ]
                }
            ],
            "Trade": [
                267,
                {
                    "distinct_on": [
                        274,
                        "[Trade_select_column!]"
                    ],
                    "limit": [
                        60
                    ],
                    "offset": [
                        60
                    ],
                    "order_by": [
                        273,
                        "[Trade_order_by!]"
                    ],
                    "where": [
                        270
                    ]
                }
            ],
            "Trade_by_pk": [
                267,
                {
                    "id": [
                        258,
                        "String!"
                    ]
                }
            ],
            "Trade_stream": [
                267,
                {
                    "batch_size": [
                        60,
                        "Int!"
                    ],
                    "cursor": [
                        278,
                        "[Trade_stream_cursor_input]!"
                    ],
                    "where": [
                        270
                    ]
                }
            ],
            "UserMarketPosition": [
                284,
                {
                    "distinct_on": [
                        291,
                        "[UserMarketPosition_select_column!]"
                    ],
                    "limit": [
                        60
                    ],
                    "offset": [
                        60
                    ],
                    "order_by": [
                        290,
                        "[UserMarketPosition_order_by!]"
                    ],
                    "where": [
                        287
                    ]
                }
            ],
            "UserMarketPosition_by_pk": [
                284,
                {
                    "id": [
                        258,
                        "String!"
                    ]
                }
            ],
            "UserMarketPosition_stream": [
                284,
                {
                    "batch_size": [
                        60,
                        "Int!"
                    ],
                    "cursor": [
                        295,
                        "[UserMarketPosition_stream_cursor_input]!"
                    ],
                    "where": [
                        287
                    ]
                }
            ],
            "chain_metadata": [
                303,
                {
                    "distinct_on": [
                        306,
                        "[chain_metadata_select_column!]"
                    ],
                    "limit": [
                        60
                    ],
                    "offset": [
                        60
                    ],
                    "order_by": [
                        305,
                        "[chain_metadata_order_by!]"
                    ],
                    "where": [
                        304
                    ]
                }
            ],
            "chain_metadata_by_pk": [
                303,
                {
                    "chain_id": [
                        60,
                        "Int!"
                    ]
                }
            ],
            "chain_metadata_stream": [
                303,
                {
                    "batch_size": [
                        60,
                        "Int!"
                    ],
                    "cursor": [
                        307,
                        "[chain_metadata_stream_cursor_input]!"
                    ],
                    "where": [
                        304
                    ]
                }
            ],
            "dynamic_contract_registry": [
                312,
                {
                    "distinct_on": [
                        315,
                        "[dynamic_contract_registry_select_column!]"
                    ],
                    "limit": [
                        60
                    ],
                    "offset": [
                        60
                    ],
                    "order_by": [
                        314,
                        "[dynamic_contract_registry_order_by!]"
                    ],
                    "where": [
                        313
                    ]
                }
            ],
            "dynamic_contract_registry_by_pk": [
                312,
                {
                    "id": [
                        258,
                        "String!"
                    ]
                }
            ],
            "dynamic_contract_registry_stream": [
                312,
                {
                    "batch_size": [
                        60,
                        "Int!"
                    ],
                    "cursor": [
                        316,
                        "[dynamic_contract_registry_stream_cursor_input]!"
                    ],
                    "where": [
                        313
                    ]
                }
            ],
            "end_of_block_range_scanned_data": [
                318,
                {
                    "distinct_on": [
                        321,
                        "[end_of_block_range_scanned_data_select_column!]"
                    ],
                    "limit": [
                        60
                    ],
                    "offset": [
                        60
                    ],
                    "order_by": [
                        320,
                        "[end_of_block_range_scanned_data_order_by!]"
                    ],
                    "where": [
                        319
                    ]
                }
            ],
            "end_of_block_range_scanned_data_by_pk": [
                318,
                {
                    "block_number": [
                        60,
                        "Int!"
                    ],
                    "chain_id": [
                        60,
                        "Int!"
                    ]
                }
            ],
            "end_of_block_range_scanned_data_stream": [
                318,
                {
                    "batch_size": [
                        60,
                        "Int!"
                    ],
                    "cursor": [
                        322,
                        "[end_of_block_range_scanned_data_stream_cursor_input]!"
                    ],
                    "where": [
                        319
                    ]
                }
            ],
            "event_sync_state": [
                324,
                {
                    "distinct_on": [
                        327,
                        "[event_sync_state_select_column!]"
                    ],
                    "limit": [
                        60
                    ],
                    "offset": [
                        60
                    ],
                    "order_by": [
                        326,
                        "[event_sync_state_order_by!]"
                    ],
                    "where": [
                        325
                    ]
                }
            ],
            "event_sync_state_by_pk": [
                324,
                {
                    "chain_id": [
                        60,
                        "Int!"
                    ]
                }
            ],
            "event_sync_state_stream": [
                324,
                {
                    "batch_size": [
                        60,
                        "Int!"
                    ],
                    "cursor": [
                        328,
                        "[event_sync_state_stream_cursor_input]!"
                    ],
                    "where": [
                        325
                    ]
                }
            ],
            "persisted_state": [
                341,
                {
                    "distinct_on": [
                        344,
                        "[persisted_state_select_column!]"
                    ],
                    "limit": [
                        60
                    ],
                    "offset": [
                        60
                    ],
                    "order_by": [
                        343,
                        "[persisted_state_order_by!]"
                    ],
                    "where": [
                        342
                    ]
                }
            ],
            "persisted_state_by_pk": [
                341,
                {
                    "id": [
                        60,
                        "Int!"
                    ]
                }
            ],
            "persisted_state_stream": [
                341,
                {
                    "batch_size": [
                        60,
                        "Int!"
                    ],
                    "cursor": [
                        345,
                        "[persisted_state_stream_cursor_input]!"
                    ],
                    "where": [
                        342
                    ]
                }
            ],
            "raw_events": [
                349,
                {
                    "distinct_on": [
                        352,
                        "[raw_events_select_column!]"
                    ],
                    "limit": [
                        60
                    ],
                    "offset": [
                        60
                    ],
                    "order_by": [
                        351,
                        "[raw_events_order_by!]"
                    ],
                    "where": [
                        350
                    ]
                }
            ],
            "raw_events_by_pk": [
                349,
                {
                    "serial": [
                        60,
                        "Int!"
                    ]
                }
            ],
            "raw_events_stream": [
                349,
                {
                    "batch_size": [
                        60,
                        "Int!"
                    ],
                    "cursor": [
                        353,
                        "[raw_events_stream_cursor_input]!"
                    ],
                    "where": [
                        350
                    ]
                }
            ],
            "__typename": [
                258
            ]
        }
    }
}