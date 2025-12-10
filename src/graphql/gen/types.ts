export default {
    "scalars": [
        3,
        9,
        12,
        17,
        27,
        44,
        57,
        63,
        66,
        77,
        93,
        107,
        113,
        122,
        135,
        141,
        147,
        157,
        174,
        187,
        198,
        215,
        231,
        248,
        261,
        264,
        270,
        280,
        297,
        307,
        312,
        315,
        317,
        321,
        327,
        333,
        336,
        339,
        341,
        343,
        346,
        350,
        353,
        358,
        361,
        363,
        365,
        367
    ],
    "types": {
        "Account": {
            "db_write_timestamp": [
                363
            ],
            "id": [
                264
            ],
            "loans": [
                69,
                {
                    "distinct_on": [
                        93,
                        "[Loan_select_column!]"
                    ],
                    "limit": [
                        66
                    ],
                    "offset": [
                        66
                    ],
                    "order_by": [
                        92,
                        "[Loan_order_by!]"
                    ],
                    "where": [
                        89
                    ]
                }
            ],
            "marketsCreated": [
                103,
                {
                    "distinct_on": [
                        122,
                        "[Market_select_column!]"
                    ],
                    "limit": [
                        66
                    ],
                    "offset": [
                        66
                    ],
                    "order_by": [
                        121,
                        "[Market_order_by!]"
                    ],
                    "where": [
                        118
                    ]
                }
            ],
            "presaleParticipations": [
                167,
                {
                    "distinct_on": [
                        174,
                        "[PresaleParticipation_select_column!]"
                    ],
                    "limit": [
                        66
                    ],
                    "offset": [
                        66
                    ],
                    "order_by": [
                        173,
                        "[PresaleParticipation_order_by!]"
                    ],
                    "where": [
                        170
                    ]
                }
            ],
            "stakes": [
                241,
                {
                    "distinct_on": [
                        248,
                        "[Stake_select_column!]"
                    ],
                    "limit": [
                        66
                    ],
                    "offset": [
                        66
                    ],
                    "order_by": [
                        247,
                        "[Stake_order_by!]"
                    ],
                    "where": [
                        244
                    ]
                }
            ],
            "trades": [
                273,
                {
                    "distinct_on": [
                        280,
                        "[Trade_select_column!]"
                    ],
                    "limit": [
                        66
                    ],
                    "offset": [
                        66
                    ],
                    "order_by": [
                        279,
                        "[Trade_order_by!]"
                    ],
                    "where": [
                        276
                    ]
                }
            ],
            "userMarketPositions": [
                290,
                {
                    "distinct_on": [
                        297,
                        "[UserMarketPosition_select_column!]"
                    ],
                    "limit": [
                        66
                    ],
                    "offset": [
                        66
                    ],
                    "order_by": [
                        296,
                        "[UserMarketPosition_order_by!]"
                    ],
                    "where": [
                        293
                    ]
                }
            ],
            "__typename": [
                264
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
                364
            ],
            "id": [
                266
            ],
            "loans": [
                89
            ],
            "marketsCreated": [
                118
            ],
            "presaleParticipations": [
                170
            ],
            "stakes": [
                244
            ],
            "trades": [
                276
            ],
            "userMarketPositions": [
                293
            ],
            "__typename": [
                264
            ]
        },
        "Account_order_by": {
            "db_write_timestamp": [
                346
            ],
            "id": [
                346
            ],
            "loans_aggregate": [
                87
            ],
            "marketsCreated_aggregate": [
                116
            ],
            "presaleParticipations_aggregate": [
                168
            ],
            "stakes_aggregate": [
                242
            ],
            "trades_aggregate": [
                274
            ],
            "userMarketPositions_aggregate": [
                291
            ],
            "__typename": [
                264
            ]
        },
        "Account_select_column": {},
        "Account_stream_cursor_input": {
            "initial_value": [
                5
            ],
            "ordering": [
                317
            ],
            "__typename": [
                264
            ]
        },
        "Account_stream_cursor_value_input": {
            "db_write_timestamp": [
                363
            ],
            "id": [
                264
            ],
            "__typename": [
                264
            ]
        },
        "AuthorizerContract": {
            "createdAt": [
                343
            ],
            "db_write_timestamp": [
                363
            ],
            "floor": [
                264
            ],
            "id": [
                264
            ],
            "lastAssignedRoleId": [
                343
            ],
            "lastUpdatedAt": [
                343
            ],
            "roles": [
                190,
                {
                    "distinct_on": [
                        231,
                        "[Role_select_column!]"
                    ],
                    "limit": [
                        66
                    ],
                    "offset": [
                        66
                    ],
                    "order_by": [
                        230,
                        "[Role_order_by!]"
                    ],
                    "where": [
                        227
                    ]
                }
            ],
            "__typename": [
                264
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
                345
            ],
            "db_write_timestamp": [
                364
            ],
            "floor": [
                266
            ],
            "id": [
                266
            ],
            "lastAssignedRoleId": [
                345
            ],
            "lastUpdatedAt": [
                345
            ],
            "roles": [
                227
            ],
            "__typename": [
                264
            ]
        },
        "AuthorizerContract_order_by": {
            "createdAt": [
                346
            ],
            "db_write_timestamp": [
                346
            ],
            "floor": [
                346
            ],
            "id": [
                346
            ],
            "lastAssignedRoleId": [
                346
            ],
            "lastUpdatedAt": [
                346
            ],
            "roles_aggregate": [
                225
            ],
            "__typename": [
                264
            ]
        },
        "AuthorizerContract_select_column": {},
        "AuthorizerContract_stream_cursor_input": {
            "initial_value": [
                11
            ],
            "ordering": [
                317
            ],
            "__typename": [
                264
            ]
        },
        "AuthorizerContract_stream_cursor_value_input": {
            "createdAt": [
                343
            ],
            "db_write_timestamp": [
                363
            ],
            "floor": [
                264
            ],
            "id": [
                264
            ],
            "lastAssignedRoleId": [
                343
            ],
            "lastUpdatedAt": [
                343
            ],
            "__typename": [
                264
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
                264
            ]
        },
        "CreditFacilityContract": {
            "borrowToken_id": [
                264
            ],
            "collateralToken_id": [
                264
            ],
            "createdAt": [
                343
            ],
            "db_write_timestamp": [
                363
            ],
            "id": [
                264
            ],
            "lastUpdatedAt": [
                343
            ],
            "loans": [
                69,
                {
                    "distinct_on": [
                        93,
                        "[Loan_select_column!]"
                    ],
                    "limit": [
                        66
                    ],
                    "offset": [
                        66
                    ],
                    "order_by": [
                        92,
                        "[Loan_order_by!]"
                    ],
                    "where": [
                        89
                    ]
                }
            ],
            "market_id": [
                264
            ],
            "totalDebtFormatted": [
                264
            ],
            "totalDebtRaw": [
                343
            ],
            "totalLoans": [
                343
            ],
            "totalLockedCollateralFormatted": [
                264
            ],
            "totalLockedCollateralRaw": [
                343
            ],
            "totalVolumeFormatted": [
                264
            ],
            "totalVolumeRaw": [
                343
            ],
            "__typename": [
                264
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
                266
            ],
            "collateralToken_id": [
                266
            ],
            "createdAt": [
                345
            ],
            "db_write_timestamp": [
                364
            ],
            "id": [
                266
            ],
            "lastUpdatedAt": [
                345
            ],
            "loans": [
                89
            ],
            "market_id": [
                266
            ],
            "totalDebtFormatted": [
                266
            ],
            "totalDebtRaw": [
                345
            ],
            "totalLoans": [
                345
            ],
            "totalLockedCollateralFormatted": [
                266
            ],
            "totalLockedCollateralRaw": [
                345
            ],
            "totalVolumeFormatted": [
                266
            ],
            "totalVolumeRaw": [
                345
            ],
            "__typename": [
                264
            ]
        },
        "CreditFacilityContract_order_by": {
            "borrowToken_id": [
                346
            ],
            "collateralToken_id": [
                346
            ],
            "createdAt": [
                346
            ],
            "db_write_timestamp": [
                346
            ],
            "id": [
                346
            ],
            "lastUpdatedAt": [
                346
            ],
            "loans_aggregate": [
                87
            ],
            "market_id": [
                346
            ],
            "totalDebtFormatted": [
                346
            ],
            "totalDebtRaw": [
                346
            ],
            "totalLoans": [
                346
            ],
            "totalLockedCollateralFormatted": [
                346
            ],
            "totalLockedCollateralRaw": [
                346
            ],
            "totalVolumeFormatted": [
                346
            ],
            "totalVolumeRaw": [
                346
            ],
            "__typename": [
                264
            ]
        },
        "CreditFacilityContract_select_column": {},
        "CreditFacilityContract_stream_cursor_input": {
            "initial_value": [
                19
            ],
            "ordering": [
                317
            ],
            "__typename": [
                264
            ]
        },
        "CreditFacilityContract_stream_cursor_value_input": {
            "borrowToken_id": [
                264
            ],
            "collateralToken_id": [
                264
            ],
            "createdAt": [
                343
            ],
            "db_write_timestamp": [
                363
            ],
            "id": [
                264
            ],
            "lastUpdatedAt": [
                343
            ],
            "market_id": [
                264
            ],
            "totalDebtFormatted": [
                264
            ],
            "totalDebtRaw": [
                343
            ],
            "totalLoans": [
                343
            ],
            "totalLockedCollateralFormatted": [
                264
            ],
            "totalLockedCollateralRaw": [
                343
            ],
            "totalVolumeFormatted": [
                264
            ],
            "totalVolumeRaw": [
                343
            ],
            "__typename": [
                264
            ]
        },
        "FeeDistribution": {
            "db_write_timestamp": [
                363
            ],
            "floorAmountFormatted": [
                264
            ],
            "floorAmountRaw": [
                343
            ],
            "id": [
                264
            ],
            "market_id": [
                264
            ],
            "stakingAmountFormatted": [
                264
            ],
            "stakingAmountRaw": [
                343
            ],
            "timestamp": [
                343
            ],
            "transactionHash": [
                264
            ],
            "treasuryAmountFormatted": [
                264
            ],
            "treasuryAmountRaw": [
                343
            ],
            "__typename": [
                264
            ]
        },
        "FeeDistribution_aggregate_order_by": {
            "avg": [
                22
            ],
            "count": [
                346
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
                264
            ]
        },
        "FeeDistribution_avg_order_by": {
            "floorAmountRaw": [
                346
            ],
            "stakingAmountRaw": [
                346
            ],
            "timestamp": [
                346
            ],
            "treasuryAmountRaw": [
                346
            ],
            "__typename": [
                264
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
                364
            ],
            "floorAmountFormatted": [
                266
            ],
            "floorAmountRaw": [
                345
            ],
            "id": [
                266
            ],
            "market_id": [
                266
            ],
            "stakingAmountFormatted": [
                266
            ],
            "stakingAmountRaw": [
                345
            ],
            "timestamp": [
                345
            ],
            "transactionHash": [
                266
            ],
            "treasuryAmountFormatted": [
                266
            ],
            "treasuryAmountRaw": [
                345
            ],
            "__typename": [
                264
            ]
        },
        "FeeDistribution_max_order_by": {
            "db_write_timestamp": [
                346
            ],
            "floorAmountFormatted": [
                346
            ],
            "floorAmountRaw": [
                346
            ],
            "id": [
                346
            ],
            "market_id": [
                346
            ],
            "stakingAmountFormatted": [
                346
            ],
            "stakingAmountRaw": [
                346
            ],
            "timestamp": [
                346
            ],
            "transactionHash": [
                346
            ],
            "treasuryAmountFormatted": [
                346
            ],
            "treasuryAmountRaw": [
                346
            ],
            "__typename": [
                264
            ]
        },
        "FeeDistribution_min_order_by": {
            "db_write_timestamp": [
                346
            ],
            "floorAmountFormatted": [
                346
            ],
            "floorAmountRaw": [
                346
            ],
            "id": [
                346
            ],
            "market_id": [
                346
            ],
            "stakingAmountFormatted": [
                346
            ],
            "stakingAmountRaw": [
                346
            ],
            "timestamp": [
                346
            ],
            "transactionHash": [
                346
            ],
            "treasuryAmountFormatted": [
                346
            ],
            "treasuryAmountRaw": [
                346
            ],
            "__typename": [
                264
            ]
        },
        "FeeDistribution_order_by": {
            "db_write_timestamp": [
                346
            ],
            "floorAmountFormatted": [
                346
            ],
            "floorAmountRaw": [
                346
            ],
            "id": [
                346
            ],
            "market_id": [
                346
            ],
            "stakingAmountFormatted": [
                346
            ],
            "stakingAmountRaw": [
                346
            ],
            "timestamp": [
                346
            ],
            "transactionHash": [
                346
            ],
            "treasuryAmountFormatted": [
                346
            ],
            "treasuryAmountRaw": [
                346
            ],
            "__typename": [
                264
            ]
        },
        "FeeDistribution_select_column": {},
        "FeeDistribution_stddev_order_by": {
            "floorAmountRaw": [
                346
            ],
            "stakingAmountRaw": [
                346
            ],
            "timestamp": [
                346
            ],
            "treasuryAmountRaw": [
                346
            ],
            "__typename": [
                264
            ]
        },
        "FeeDistribution_stddev_pop_order_by": {
            "floorAmountRaw": [
                346
            ],
            "stakingAmountRaw": [
                346
            ],
            "timestamp": [
                346
            ],
            "treasuryAmountRaw": [
                346
            ],
            "__typename": [
                264
            ]
        },
        "FeeDistribution_stddev_samp_order_by": {
            "floorAmountRaw": [
                346
            ],
            "stakingAmountRaw": [
                346
            ],
            "timestamp": [
                346
            ],
            "treasuryAmountRaw": [
                346
            ],
            "__typename": [
                264
            ]
        },
        "FeeDistribution_stream_cursor_input": {
            "initial_value": [
                32
            ],
            "ordering": [
                317
            ],
            "__typename": [
                264
            ]
        },
        "FeeDistribution_stream_cursor_value_input": {
            "db_write_timestamp": [
                363
            ],
            "floorAmountFormatted": [
                264
            ],
            "floorAmountRaw": [
                343
            ],
            "id": [
                264
            ],
            "market_id": [
                264
            ],
            "stakingAmountFormatted": [
                264
            ],
            "stakingAmountRaw": [
                343
            ],
            "timestamp": [
                343
            ],
            "transactionHash": [
                264
            ],
            "treasuryAmountFormatted": [
                264
            ],
            "treasuryAmountRaw": [
                343
            ],
            "__typename": [
                264
            ]
        },
        "FeeDistribution_sum_order_by": {
            "floorAmountRaw": [
                346
            ],
            "stakingAmountRaw": [
                346
            ],
            "timestamp": [
                346
            ],
            "treasuryAmountRaw": [
                346
            ],
            "__typename": [
                264
            ]
        },
        "FeeDistribution_var_pop_order_by": {
            "floorAmountRaw": [
                346
            ],
            "stakingAmountRaw": [
                346
            ],
            "timestamp": [
                346
            ],
            "treasuryAmountRaw": [
                346
            ],
            "__typename": [
                264
            ]
        },
        "FeeDistribution_var_samp_order_by": {
            "floorAmountRaw": [
                346
            ],
            "stakingAmountRaw": [
                346
            ],
            "timestamp": [
                346
            ],
            "treasuryAmountRaw": [
                346
            ],
            "__typename": [
                264
            ]
        },
        "FeeDistribution_variance_order_by": {
            "floorAmountRaw": [
                346
            ],
            "stakingAmountRaw": [
                346
            ],
            "timestamp": [
                346
            ],
            "treasuryAmountRaw": [
                346
            ],
            "__typename": [
                264
            ]
        },
        "FloorElevation": {
            "db_write_timestamp": [
                363
            ],
            "deployedAmountFormatted": [
                264
            ],
            "deployedAmountRaw": [
                343
            ],
            "id": [
                264
            ],
            "market_id": [
                264
            ],
            "newFloorPriceFormatted": [
                264
            ],
            "newFloorPriceRaw": [
                343
            ],
            "oldFloorPriceFormatted": [
                264
            ],
            "oldFloorPriceRaw": [
                343
            ],
            "timestamp": [
                343
            ],
            "transactionHash": [
                264
            ],
            "__typename": [
                264
            ]
        },
        "FloorElevation_aggregate_order_by": {
            "avg": [
                39
            ],
            "count": [
                346
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
                264
            ]
        },
        "FloorElevation_avg_order_by": {
            "deployedAmountRaw": [
                346
            ],
            "newFloorPriceRaw": [
                346
            ],
            "oldFloorPriceRaw": [
                346
            ],
            "timestamp": [
                346
            ],
            "__typename": [
                264
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
                364
            ],
            "deployedAmountFormatted": [
                266
            ],
            "deployedAmountRaw": [
                345
            ],
            "id": [
                266
            ],
            "market_id": [
                266
            ],
            "newFloorPriceFormatted": [
                266
            ],
            "newFloorPriceRaw": [
                345
            ],
            "oldFloorPriceFormatted": [
                266
            ],
            "oldFloorPriceRaw": [
                345
            ],
            "timestamp": [
                345
            ],
            "transactionHash": [
                266
            ],
            "__typename": [
                264
            ]
        },
        "FloorElevation_max_order_by": {
            "db_write_timestamp": [
                346
            ],
            "deployedAmountFormatted": [
                346
            ],
            "deployedAmountRaw": [
                346
            ],
            "id": [
                346
            ],
            "market_id": [
                346
            ],
            "newFloorPriceFormatted": [
                346
            ],
            "newFloorPriceRaw": [
                346
            ],
            "oldFloorPriceFormatted": [
                346
            ],
            "oldFloorPriceRaw": [
                346
            ],
            "timestamp": [
                346
            ],
            "transactionHash": [
                346
            ],
            "__typename": [
                264
            ]
        },
        "FloorElevation_min_order_by": {
            "db_write_timestamp": [
                346
            ],
            "deployedAmountFormatted": [
                346
            ],
            "deployedAmountRaw": [
                346
            ],
            "id": [
                346
            ],
            "market_id": [
                346
            ],
            "newFloorPriceFormatted": [
                346
            ],
            "newFloorPriceRaw": [
                346
            ],
            "oldFloorPriceFormatted": [
                346
            ],
            "oldFloorPriceRaw": [
                346
            ],
            "timestamp": [
                346
            ],
            "transactionHash": [
                346
            ],
            "__typename": [
                264
            ]
        },
        "FloorElevation_order_by": {
            "db_write_timestamp": [
                346
            ],
            "deployedAmountFormatted": [
                346
            ],
            "deployedAmountRaw": [
                346
            ],
            "id": [
                346
            ],
            "market_id": [
                346
            ],
            "newFloorPriceFormatted": [
                346
            ],
            "newFloorPriceRaw": [
                346
            ],
            "oldFloorPriceFormatted": [
                346
            ],
            "oldFloorPriceRaw": [
                346
            ],
            "timestamp": [
                346
            ],
            "transactionHash": [
                346
            ],
            "__typename": [
                264
            ]
        },
        "FloorElevation_select_column": {},
        "FloorElevation_stddev_order_by": {
            "deployedAmountRaw": [
                346
            ],
            "newFloorPriceRaw": [
                346
            ],
            "oldFloorPriceRaw": [
                346
            ],
            "timestamp": [
                346
            ],
            "__typename": [
                264
            ]
        },
        "FloorElevation_stddev_pop_order_by": {
            "deployedAmountRaw": [
                346
            ],
            "newFloorPriceRaw": [
                346
            ],
            "oldFloorPriceRaw": [
                346
            ],
            "timestamp": [
                346
            ],
            "__typename": [
                264
            ]
        },
        "FloorElevation_stddev_samp_order_by": {
            "deployedAmountRaw": [
                346
            ],
            "newFloorPriceRaw": [
                346
            ],
            "oldFloorPriceRaw": [
                346
            ],
            "timestamp": [
                346
            ],
            "__typename": [
                264
            ]
        },
        "FloorElevation_stream_cursor_input": {
            "initial_value": [
                49
            ],
            "ordering": [
                317
            ],
            "__typename": [
                264
            ]
        },
        "FloorElevation_stream_cursor_value_input": {
            "db_write_timestamp": [
                363
            ],
            "deployedAmountFormatted": [
                264
            ],
            "deployedAmountRaw": [
                343
            ],
            "id": [
                264
            ],
            "market_id": [
                264
            ],
            "newFloorPriceFormatted": [
                264
            ],
            "newFloorPriceRaw": [
                343
            ],
            "oldFloorPriceFormatted": [
                264
            ],
            "oldFloorPriceRaw": [
                343
            ],
            "timestamp": [
                343
            ],
            "transactionHash": [
                264
            ],
            "__typename": [
                264
            ]
        },
        "FloorElevation_sum_order_by": {
            "deployedAmountRaw": [
                346
            ],
            "newFloorPriceRaw": [
                346
            ],
            "oldFloorPriceRaw": [
                346
            ],
            "timestamp": [
                346
            ],
            "__typename": [
                264
            ]
        },
        "FloorElevation_var_pop_order_by": {
            "deployedAmountRaw": [
                346
            ],
            "newFloorPriceRaw": [
                346
            ],
            "oldFloorPriceRaw": [
                346
            ],
            "timestamp": [
                346
            ],
            "__typename": [
                264
            ]
        },
        "FloorElevation_var_samp_order_by": {
            "deployedAmountRaw": [
                346
            ],
            "newFloorPriceRaw": [
                346
            ],
            "oldFloorPriceRaw": [
                346
            ],
            "timestamp": [
                346
            ],
            "__typename": [
                264
            ]
        },
        "FloorElevation_variance_order_by": {
            "deployedAmountRaw": [
                346
            ],
            "newFloorPriceRaw": [
                346
            ],
            "oldFloorPriceRaw": [
                346
            ],
            "timestamp": [
                346
            ],
            "__typename": [
                264
            ]
        },
        "GlobalRegistry": {
            "createdAt": [
                343
            ],
            "db_write_timestamp": [
                363
            ],
            "floorFactoryAddress": [
                264
            ],
            "id": [
                264
            ],
            "lastUpdatedAt": [
                343
            ],
            "moduleFactoryAddress": [
                264
            ],
            "__typename": [
                264
            ]
        },
        "GlobalRegistry_bool_exp": {
            "_and": [
                55
            ],
            "_not": [
                55
            ],
            "_or": [
                55
            ],
            "createdAt": [
                345
            ],
            "db_write_timestamp": [
                364
            ],
            "floorFactoryAddress": [
                266
            ],
            "id": [
                266
            ],
            "lastUpdatedAt": [
                345
            ],
            "moduleFactoryAddress": [
                266
            ],
            "__typename": [
                264
            ]
        },
        "GlobalRegistry_order_by": {
            "createdAt": [
                346
            ],
            "db_write_timestamp": [
                346
            ],
            "floorFactoryAddress": [
                346
            ],
            "id": [
                346
            ],
            "lastUpdatedAt": [
                346
            ],
            "moduleFactoryAddress": [
                346
            ],
            "__typename": [
                264
            ]
        },
        "GlobalRegistry_select_column": {},
        "GlobalRegistry_stream_cursor_input": {
            "initial_value": [
                59
            ],
            "ordering": [
                317
            ],
            "__typename": [
                264
            ]
        },
        "GlobalRegistry_stream_cursor_value_input": {
            "createdAt": [
                343
            ],
            "db_write_timestamp": [
                363
            ],
            "floorFactoryAddress": [
                264
            ],
            "id": [
                264
            ],
            "lastUpdatedAt": [
                343
            ],
            "moduleFactoryAddress": [
                264
            ],
            "__typename": [
                264
            ]
        },
        "GlobalStats": {
            "activeMarkets": [
                343
            ],
            "db_write_timestamp": [
                363
            ],
            "id": [
                264
            ],
            "lastUpdatedAt": [
                343
            ],
            "totalLockedCollateralFormatted": [
                264
            ],
            "totalLockedCollateralRaw": [
                343
            ],
            "totalMarkets": [
                343
            ],
            "totalOutstandingDebtFormatted": [
                264
            ],
            "totalOutstandingDebtRaw": [
                343
            ],
            "totalVolumeFormatted": [
                264
            ],
            "totalVolumeRaw": [
                343
            ],
            "__typename": [
                264
            ]
        },
        "GlobalStats_bool_exp": {
            "_and": [
                61
            ],
            "_not": [
                61
            ],
            "_or": [
                61
            ],
            "activeMarkets": [
                345
            ],
            "db_write_timestamp": [
                364
            ],
            "id": [
                266
            ],
            "lastUpdatedAt": [
                345
            ],
            "totalLockedCollateralFormatted": [
                266
            ],
            "totalLockedCollateralRaw": [
                345
            ],
            "totalMarkets": [
                345
            ],
            "totalOutstandingDebtFormatted": [
                266
            ],
            "totalOutstandingDebtRaw": [
                345
            ],
            "totalVolumeFormatted": [
                266
            ],
            "totalVolumeRaw": [
                345
            ],
            "__typename": [
                264
            ]
        },
        "GlobalStats_order_by": {
            "activeMarkets": [
                346
            ],
            "db_write_timestamp": [
                346
            ],
            "id": [
                346
            ],
            "lastUpdatedAt": [
                346
            ],
            "totalLockedCollateralFormatted": [
                346
            ],
            "totalLockedCollateralRaw": [
                346
            ],
            "totalMarkets": [
                346
            ],
            "totalOutstandingDebtFormatted": [
                346
            ],
            "totalOutstandingDebtRaw": [
                346
            ],
            "totalVolumeFormatted": [
                346
            ],
            "totalVolumeRaw": [
                346
            ],
            "__typename": [
                264
            ]
        },
        "GlobalStats_select_column": {},
        "GlobalStats_stream_cursor_input": {
            "initial_value": [
                65
            ],
            "ordering": [
                317
            ],
            "__typename": [
                264
            ]
        },
        "GlobalStats_stream_cursor_value_input": {
            "activeMarkets": [
                343
            ],
            "db_write_timestamp": [
                363
            ],
            "id": [
                264
            ],
            "lastUpdatedAt": [
                343
            ],
            "totalLockedCollateralFormatted": [
                264
            ],
            "totalLockedCollateralRaw": [
                343
            ],
            "totalMarkets": [
                343
            ],
            "totalOutstandingDebtFormatted": [
                264
            ],
            "totalOutstandingDebtRaw": [
                343
            ],
            "totalVolumeFormatted": [
                264
            ],
            "totalVolumeRaw": [
                343
            ],
            "__typename": [
                264
            ]
        },
        "Int": {},
        "Int_array_comparison_exp": {
            "_contained_in": [
                66
            ],
            "_contains": [
                66
            ],
            "_eq": [
                66
            ],
            "_gt": [
                66
            ],
            "_gte": [
                66
            ],
            "_in": [
                66
            ],
            "_is_null": [
                12
            ],
            "_lt": [
                66
            ],
            "_lte": [
                66
            ],
            "_neq": [
                66
            ],
            "_nin": [
                66
            ],
            "__typename": [
                264
            ]
        },
        "Int_comparison_exp": {
            "_eq": [
                66
            ],
            "_gt": [
                66
            ],
            "_gte": [
                66
            ],
            "_in": [
                66
            ],
            "_is_null": [
                12
            ],
            "_lt": [
                66
            ],
            "_lte": [
                66
            ],
            "_neq": [
                66
            ],
            "_nin": [
                66
            ],
            "__typename": [
                264
            ]
        },
        "Loan": {
            "borrowAmountFormatted": [
                264
            ],
            "borrowAmountRaw": [
                343
            ],
            "borrower_id": [
                264
            ],
            "closedAt": [
                343
            ],
            "db_write_timestamp": [
                363
            ],
            "facility_id": [
                264
            ],
            "floorPriceAtBorrowFormatted": [
                264
            ],
            "floorPriceAtBorrowRaw": [
                343
            ],
            "id": [
                264
            ],
            "lastUpdatedAt": [
                343
            ],
            "lockedCollateralFormatted": [
                264
            ],
            "lockedCollateralRaw": [
                343
            ],
            "market_id": [
                264
            ],
            "openedAt": [
                343
            ],
            "originationFeeFormatted": [
                264
            ],
            "originationFeeRaw": [
                343
            ],
            "remainingDebtFormatted": [
                264
            ],
            "remainingDebtRaw": [
                343
            ],
            "status": [
                339
            ],
            "statusHistory": [
                70,
                {
                    "distinct_on": [
                        77,
                        "[LoanStatusHistory_select_column!]"
                    ],
                    "limit": [
                        66
                    ],
                    "offset": [
                        66
                    ],
                    "order_by": [
                        76,
                        "[LoanStatusHistory_order_by!]"
                    ],
                    "where": [
                        73
                    ]
                }
            ],
            "transactionHash": [
                264
            ],
            "__typename": [
                264
            ]
        },
        "LoanStatusHistory": {
            "db_write_timestamp": [
                363
            ],
            "id": [
                264
            ],
            "loan_id": [
                264
            ],
            "lockedCollateralFormatted": [
                264
            ],
            "lockedCollateralRaw": [
                343
            ],
            "remainingDebtFormatted": [
                264
            ],
            "remainingDebtRaw": [
                343
            ],
            "status": [
                339
            ],
            "timestamp": [
                343
            ],
            "transactionHash": [
                264
            ],
            "__typename": [
                264
            ]
        },
        "LoanStatusHistory_aggregate_order_by": {
            "avg": [
                72
            ],
            "count": [
                346
            ],
            "max": [
                74
            ],
            "min": [
                75
            ],
            "stddev": [
                78
            ],
            "stddev_pop": [
                79
            ],
            "stddev_samp": [
                80
            ],
            "sum": [
                83
            ],
            "var_pop": [
                84
            ],
            "var_samp": [
                85
            ],
            "variance": [
                86
            ],
            "__typename": [
                264
            ]
        },
        "LoanStatusHistory_avg_order_by": {
            "lockedCollateralRaw": [
                346
            ],
            "remainingDebtRaw": [
                346
            ],
            "timestamp": [
                346
            ],
            "__typename": [
                264
            ]
        },
        "LoanStatusHistory_bool_exp": {
            "_and": [
                73
            ],
            "_not": [
                73
            ],
            "_or": [
                73
            ],
            "db_write_timestamp": [
                364
            ],
            "id": [
                266
            ],
            "loan_id": [
                266
            ],
            "lockedCollateralFormatted": [
                266
            ],
            "lockedCollateralRaw": [
                345
            ],
            "remainingDebtFormatted": [
                266
            ],
            "remainingDebtRaw": [
                345
            ],
            "status": [
                340
            ],
            "timestamp": [
                345
            ],
            "transactionHash": [
                266
            ],
            "__typename": [
                264
            ]
        },
        "LoanStatusHistory_max_order_by": {
            "db_write_timestamp": [
                346
            ],
            "id": [
                346
            ],
            "loan_id": [
                346
            ],
            "lockedCollateralFormatted": [
                346
            ],
            "lockedCollateralRaw": [
                346
            ],
            "remainingDebtFormatted": [
                346
            ],
            "remainingDebtRaw": [
                346
            ],
            "status": [
                346
            ],
            "timestamp": [
                346
            ],
            "transactionHash": [
                346
            ],
            "__typename": [
                264
            ]
        },
        "LoanStatusHistory_min_order_by": {
            "db_write_timestamp": [
                346
            ],
            "id": [
                346
            ],
            "loan_id": [
                346
            ],
            "lockedCollateralFormatted": [
                346
            ],
            "lockedCollateralRaw": [
                346
            ],
            "remainingDebtFormatted": [
                346
            ],
            "remainingDebtRaw": [
                346
            ],
            "status": [
                346
            ],
            "timestamp": [
                346
            ],
            "transactionHash": [
                346
            ],
            "__typename": [
                264
            ]
        },
        "LoanStatusHistory_order_by": {
            "db_write_timestamp": [
                346
            ],
            "id": [
                346
            ],
            "loan_id": [
                346
            ],
            "lockedCollateralFormatted": [
                346
            ],
            "lockedCollateralRaw": [
                346
            ],
            "remainingDebtFormatted": [
                346
            ],
            "remainingDebtRaw": [
                346
            ],
            "status": [
                346
            ],
            "timestamp": [
                346
            ],
            "transactionHash": [
                346
            ],
            "__typename": [
                264
            ]
        },
        "LoanStatusHistory_select_column": {},
        "LoanStatusHistory_stddev_order_by": {
            "lockedCollateralRaw": [
                346
            ],
            "remainingDebtRaw": [
                346
            ],
            "timestamp": [
                346
            ],
            "__typename": [
                264
            ]
        },
        "LoanStatusHistory_stddev_pop_order_by": {
            "lockedCollateralRaw": [
                346
            ],
            "remainingDebtRaw": [
                346
            ],
            "timestamp": [
                346
            ],
            "__typename": [
                264
            ]
        },
        "LoanStatusHistory_stddev_samp_order_by": {
            "lockedCollateralRaw": [
                346
            ],
            "remainingDebtRaw": [
                346
            ],
            "timestamp": [
                346
            ],
            "__typename": [
                264
            ]
        },
        "LoanStatusHistory_stream_cursor_input": {
            "initial_value": [
                82
            ],
            "ordering": [
                317
            ],
            "__typename": [
                264
            ]
        },
        "LoanStatusHistory_stream_cursor_value_input": {
            "db_write_timestamp": [
                363
            ],
            "id": [
                264
            ],
            "loan_id": [
                264
            ],
            "lockedCollateralFormatted": [
                264
            ],
            "lockedCollateralRaw": [
                343
            ],
            "remainingDebtFormatted": [
                264
            ],
            "remainingDebtRaw": [
                343
            ],
            "status": [
                339
            ],
            "timestamp": [
                343
            ],
            "transactionHash": [
                264
            ],
            "__typename": [
                264
            ]
        },
        "LoanStatusHistory_sum_order_by": {
            "lockedCollateralRaw": [
                346
            ],
            "remainingDebtRaw": [
                346
            ],
            "timestamp": [
                346
            ],
            "__typename": [
                264
            ]
        },
        "LoanStatusHistory_var_pop_order_by": {
            "lockedCollateralRaw": [
                346
            ],
            "remainingDebtRaw": [
                346
            ],
            "timestamp": [
                346
            ],
            "__typename": [
                264
            ]
        },
        "LoanStatusHistory_var_samp_order_by": {
            "lockedCollateralRaw": [
                346
            ],
            "remainingDebtRaw": [
                346
            ],
            "timestamp": [
                346
            ],
            "__typename": [
                264
            ]
        },
        "LoanStatusHistory_variance_order_by": {
            "lockedCollateralRaw": [
                346
            ],
            "remainingDebtRaw": [
                346
            ],
            "timestamp": [
                346
            ],
            "__typename": [
                264
            ]
        },
        "Loan_aggregate_order_by": {
            "avg": [
                88
            ],
            "count": [
                346
            ],
            "max": [
                90
            ],
            "min": [
                91
            ],
            "stddev": [
                94
            ],
            "stddev_pop": [
                95
            ],
            "stddev_samp": [
                96
            ],
            "sum": [
                99
            ],
            "var_pop": [
                100
            ],
            "var_samp": [
                101
            ],
            "variance": [
                102
            ],
            "__typename": [
                264
            ]
        },
        "Loan_avg_order_by": {
            "borrowAmountRaw": [
                346
            ],
            "closedAt": [
                346
            ],
            "floorPriceAtBorrowRaw": [
                346
            ],
            "lastUpdatedAt": [
                346
            ],
            "lockedCollateralRaw": [
                346
            ],
            "openedAt": [
                346
            ],
            "originationFeeRaw": [
                346
            ],
            "remainingDebtRaw": [
                346
            ],
            "__typename": [
                264
            ]
        },
        "Loan_bool_exp": {
            "_and": [
                89
            ],
            "_not": [
                89
            ],
            "_or": [
                89
            ],
            "borrowAmountFormatted": [
                266
            ],
            "borrowAmountRaw": [
                345
            ],
            "borrower_id": [
                266
            ],
            "closedAt": [
                345
            ],
            "db_write_timestamp": [
                364
            ],
            "facility_id": [
                266
            ],
            "floorPriceAtBorrowFormatted": [
                266
            ],
            "floorPriceAtBorrowRaw": [
                345
            ],
            "id": [
                266
            ],
            "lastUpdatedAt": [
                345
            ],
            "lockedCollateralFormatted": [
                266
            ],
            "lockedCollateralRaw": [
                345
            ],
            "market_id": [
                266
            ],
            "openedAt": [
                345
            ],
            "originationFeeFormatted": [
                266
            ],
            "originationFeeRaw": [
                345
            ],
            "remainingDebtFormatted": [
                266
            ],
            "remainingDebtRaw": [
                345
            ],
            "status": [
                340
            ],
            "statusHistory": [
                73
            ],
            "transactionHash": [
                266
            ],
            "__typename": [
                264
            ]
        },
        "Loan_max_order_by": {
            "borrowAmountFormatted": [
                346
            ],
            "borrowAmountRaw": [
                346
            ],
            "borrower_id": [
                346
            ],
            "closedAt": [
                346
            ],
            "db_write_timestamp": [
                346
            ],
            "facility_id": [
                346
            ],
            "floorPriceAtBorrowFormatted": [
                346
            ],
            "floorPriceAtBorrowRaw": [
                346
            ],
            "id": [
                346
            ],
            "lastUpdatedAt": [
                346
            ],
            "lockedCollateralFormatted": [
                346
            ],
            "lockedCollateralRaw": [
                346
            ],
            "market_id": [
                346
            ],
            "openedAt": [
                346
            ],
            "originationFeeFormatted": [
                346
            ],
            "originationFeeRaw": [
                346
            ],
            "remainingDebtFormatted": [
                346
            ],
            "remainingDebtRaw": [
                346
            ],
            "status": [
                346
            ],
            "transactionHash": [
                346
            ],
            "__typename": [
                264
            ]
        },
        "Loan_min_order_by": {
            "borrowAmountFormatted": [
                346
            ],
            "borrowAmountRaw": [
                346
            ],
            "borrower_id": [
                346
            ],
            "closedAt": [
                346
            ],
            "db_write_timestamp": [
                346
            ],
            "facility_id": [
                346
            ],
            "floorPriceAtBorrowFormatted": [
                346
            ],
            "floorPriceAtBorrowRaw": [
                346
            ],
            "id": [
                346
            ],
            "lastUpdatedAt": [
                346
            ],
            "lockedCollateralFormatted": [
                346
            ],
            "lockedCollateralRaw": [
                346
            ],
            "market_id": [
                346
            ],
            "openedAt": [
                346
            ],
            "originationFeeFormatted": [
                346
            ],
            "originationFeeRaw": [
                346
            ],
            "remainingDebtFormatted": [
                346
            ],
            "remainingDebtRaw": [
                346
            ],
            "status": [
                346
            ],
            "transactionHash": [
                346
            ],
            "__typename": [
                264
            ]
        },
        "Loan_order_by": {
            "borrowAmountFormatted": [
                346
            ],
            "borrowAmountRaw": [
                346
            ],
            "borrower_id": [
                346
            ],
            "closedAt": [
                346
            ],
            "db_write_timestamp": [
                346
            ],
            "facility_id": [
                346
            ],
            "floorPriceAtBorrowFormatted": [
                346
            ],
            "floorPriceAtBorrowRaw": [
                346
            ],
            "id": [
                346
            ],
            "lastUpdatedAt": [
                346
            ],
            "lockedCollateralFormatted": [
                346
            ],
            "lockedCollateralRaw": [
                346
            ],
            "market_id": [
                346
            ],
            "openedAt": [
                346
            ],
            "originationFeeFormatted": [
                346
            ],
            "originationFeeRaw": [
                346
            ],
            "remainingDebtFormatted": [
                346
            ],
            "remainingDebtRaw": [
                346
            ],
            "status": [
                346
            ],
            "statusHistory_aggregate": [
                71
            ],
            "transactionHash": [
                346
            ],
            "__typename": [
                264
            ]
        },
        "Loan_select_column": {},
        "Loan_stddev_order_by": {
            "borrowAmountRaw": [
                346
            ],
            "closedAt": [
                346
            ],
            "floorPriceAtBorrowRaw": [
                346
            ],
            "lastUpdatedAt": [
                346
            ],
            "lockedCollateralRaw": [
                346
            ],
            "openedAt": [
                346
            ],
            "originationFeeRaw": [
                346
            ],
            "remainingDebtRaw": [
                346
            ],
            "__typename": [
                264
            ]
        },
        "Loan_stddev_pop_order_by": {
            "borrowAmountRaw": [
                346
            ],
            "closedAt": [
                346
            ],
            "floorPriceAtBorrowRaw": [
                346
            ],
            "lastUpdatedAt": [
                346
            ],
            "lockedCollateralRaw": [
                346
            ],
            "openedAt": [
                346
            ],
            "originationFeeRaw": [
                346
            ],
            "remainingDebtRaw": [
                346
            ],
            "__typename": [
                264
            ]
        },
        "Loan_stddev_samp_order_by": {
            "borrowAmountRaw": [
                346
            ],
            "closedAt": [
                346
            ],
            "floorPriceAtBorrowRaw": [
                346
            ],
            "lastUpdatedAt": [
                346
            ],
            "lockedCollateralRaw": [
                346
            ],
            "openedAt": [
                346
            ],
            "originationFeeRaw": [
                346
            ],
            "remainingDebtRaw": [
                346
            ],
            "__typename": [
                264
            ]
        },
        "Loan_stream_cursor_input": {
            "initial_value": [
                98
            ],
            "ordering": [
                317
            ],
            "__typename": [
                264
            ]
        },
        "Loan_stream_cursor_value_input": {
            "borrowAmountFormatted": [
                264
            ],
            "borrowAmountRaw": [
                343
            ],
            "borrower_id": [
                264
            ],
            "closedAt": [
                343
            ],
            "db_write_timestamp": [
                363
            ],
            "facility_id": [
                264
            ],
            "floorPriceAtBorrowFormatted": [
                264
            ],
            "floorPriceAtBorrowRaw": [
                343
            ],
            "id": [
                264
            ],
            "lastUpdatedAt": [
                343
            ],
            "lockedCollateralFormatted": [
                264
            ],
            "lockedCollateralRaw": [
                343
            ],
            "market_id": [
                264
            ],
            "openedAt": [
                343
            ],
            "originationFeeFormatted": [
                264
            ],
            "originationFeeRaw": [
                343
            ],
            "remainingDebtFormatted": [
                264
            ],
            "remainingDebtRaw": [
                343
            ],
            "status": [
                339
            ],
            "transactionHash": [
                264
            ],
            "__typename": [
                264
            ]
        },
        "Loan_sum_order_by": {
            "borrowAmountRaw": [
                346
            ],
            "closedAt": [
                346
            ],
            "floorPriceAtBorrowRaw": [
                346
            ],
            "lastUpdatedAt": [
                346
            ],
            "lockedCollateralRaw": [
                346
            ],
            "openedAt": [
                346
            ],
            "originationFeeRaw": [
                346
            ],
            "remainingDebtRaw": [
                346
            ],
            "__typename": [
                264
            ]
        },
        "Loan_var_pop_order_by": {
            "borrowAmountRaw": [
                346
            ],
            "closedAt": [
                346
            ],
            "floorPriceAtBorrowRaw": [
                346
            ],
            "lastUpdatedAt": [
                346
            ],
            "lockedCollateralRaw": [
                346
            ],
            "openedAt": [
                346
            ],
            "originationFeeRaw": [
                346
            ],
            "remainingDebtRaw": [
                346
            ],
            "__typename": [
                264
            ]
        },
        "Loan_var_samp_order_by": {
            "borrowAmountRaw": [
                346
            ],
            "closedAt": [
                346
            ],
            "floorPriceAtBorrowRaw": [
                346
            ],
            "lastUpdatedAt": [
                346
            ],
            "lockedCollateralRaw": [
                346
            ],
            "openedAt": [
                346
            ],
            "originationFeeRaw": [
                346
            ],
            "remainingDebtRaw": [
                346
            ],
            "__typename": [
                264
            ]
        },
        "Loan_variance_order_by": {
            "borrowAmountRaw": [
                346
            ],
            "closedAt": [
                346
            ],
            "floorPriceAtBorrowRaw": [
                346
            ],
            "lastUpdatedAt": [
                346
            ],
            "lockedCollateralRaw": [
                346
            ],
            "openedAt": [
                346
            ],
            "originationFeeRaw": [
                346
            ],
            "remainingDebtRaw": [
                346
            ],
            "__typename": [
                264
            ]
        },
        "Market": {
            "buyFeeBps": [
                343
            ],
            "createdAt": [
                343
            ],
            "creator_id": [
                264
            ],
            "currentPriceFormatted": [
                264
            ],
            "currentPriceRaw": [
                343
            ],
            "db_write_timestamp": [
                363
            ],
            "factory_id": [
                264
            ],
            "feeDistributions": [
                20,
                {
                    "distinct_on": [
                        27,
                        "[FeeDistribution_select_column!]"
                    ],
                    "limit": [
                        66
                    ],
                    "offset": [
                        66
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
                        66
                    ],
                    "offset": [
                        66
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
                264
            ],
            "floorPriceRaw": [
                343
            ],
            "floorSupplyFormatted": [
                264
            ],
            "floorSupplyRaw": [
                343
            ],
            "id": [
                264
            ],
            "initialFloorPriceFormatted": [
                264
            ],
            "initialFloorPriceRaw": [
                343
            ],
            "isBuyOpen": [
                12
            ],
            "isSellOpen": [
                12
            ],
            "issuanceToken": [
                267
            ],
            "issuanceToken_id": [
                264
            ],
            "lastElevationTimestamp": [
                343
            ],
            "lastTradeTimestamp": [
                343
            ],
            "lastUpdatedAt": [
                343
            ],
            "marketSupplyFormatted": [
                264
            ],
            "marketSupplyRaw": [
                343
            ],
            "maxLTV": [
                343
            ],
            "reserveToken": [
                267
            ],
            "reserveToken_id": [
                264
            ],
            "sellFeeBps": [
                343
            ],
            "status": [
                341
            ],
            "totalSupplyFormatted": [
                264
            ],
            "totalSupplyRaw": [
                343
            ],
            "trades": [
                273,
                {
                    "distinct_on": [
                        280,
                        "[Trade_select_column!]"
                    ],
                    "limit": [
                        66
                    ],
                    "offset": [
                        66
                    ],
                    "order_by": [
                        279,
                        "[Trade_order_by!]"
                    ],
                    "where": [
                        276
                    ]
                }
            ],
            "tradingFeeBps": [
                343
            ],
            "__typename": [
                264
            ]
        },
        "MarketRollingStats": {
            "averagePriceFormatted": [
                264
            ],
            "averagePriceRaw": [
                343
            ],
            "db_write_timestamp": [
                363
            ],
            "id": [
                264
            ],
            "lastUpdatedAt": [
                343
            ],
            "market_id": [
                264
            ],
            "tradeCount": [
                343
            ],
            "volumeFormatted": [
                264
            ],
            "volumeRaw": [
                343
            ],
            "windowSeconds": [
                66
            ],
            "__typename": [
                264
            ]
        },
        "MarketRollingStats_bool_exp": {
            "_and": [
                105
            ],
            "_not": [
                105
            ],
            "_or": [
                105
            ],
            "averagePriceFormatted": [
                266
            ],
            "averagePriceRaw": [
                345
            ],
            "db_write_timestamp": [
                364
            ],
            "id": [
                266
            ],
            "lastUpdatedAt": [
                345
            ],
            "market_id": [
                266
            ],
            "tradeCount": [
                345
            ],
            "volumeFormatted": [
                266
            ],
            "volumeRaw": [
                345
            ],
            "windowSeconds": [
                68
            ],
            "__typename": [
                264
            ]
        },
        "MarketRollingStats_order_by": {
            "averagePriceFormatted": [
                346
            ],
            "averagePriceRaw": [
                346
            ],
            "db_write_timestamp": [
                346
            ],
            "id": [
                346
            ],
            "lastUpdatedAt": [
                346
            ],
            "market_id": [
                346
            ],
            "tradeCount": [
                346
            ],
            "volumeFormatted": [
                346
            ],
            "volumeRaw": [
                346
            ],
            "windowSeconds": [
                346
            ],
            "__typename": [
                264
            ]
        },
        "MarketRollingStats_select_column": {},
        "MarketRollingStats_stream_cursor_input": {
            "initial_value": [
                109
            ],
            "ordering": [
                317
            ],
            "__typename": [
                264
            ]
        },
        "MarketRollingStats_stream_cursor_value_input": {
            "averagePriceFormatted": [
                264
            ],
            "averagePriceRaw": [
                343
            ],
            "db_write_timestamp": [
                363
            ],
            "id": [
                264
            ],
            "lastUpdatedAt": [
                343
            ],
            "market_id": [
                264
            ],
            "tradeCount": [
                343
            ],
            "volumeFormatted": [
                264
            ],
            "volumeRaw": [
                343
            ],
            "windowSeconds": [
                66
            ],
            "__typename": [
                264
            ]
        },
        "MarketSnapshot": {
            "db_write_timestamp": [
                363
            ],
            "floorPriceFormatted": [
                264
            ],
            "floorPriceRaw": [
                343
            ],
            "id": [
                264
            ],
            "marketSupplyFormatted": [
                264
            ],
            "marketSupplyRaw": [
                343
            ],
            "market_id": [
                264
            ],
            "priceFormatted": [
                264
            ],
            "priceRaw": [
                343
            ],
            "timestamp": [
                343
            ],
            "totalSupplyFormatted": [
                264
            ],
            "totalSupplyRaw": [
                343
            ],
            "trades24h": [
                343
            ],
            "volume24hFormatted": [
                264
            ],
            "volume24hRaw": [
                343
            ],
            "__typename": [
                264
            ]
        },
        "MarketSnapshot_bool_exp": {
            "_and": [
                111
            ],
            "_not": [
                111
            ],
            "_or": [
                111
            ],
            "db_write_timestamp": [
                364
            ],
            "floorPriceFormatted": [
                266
            ],
            "floorPriceRaw": [
                345
            ],
            "id": [
                266
            ],
            "marketSupplyFormatted": [
                266
            ],
            "marketSupplyRaw": [
                345
            ],
            "market_id": [
                266
            ],
            "priceFormatted": [
                266
            ],
            "priceRaw": [
                345
            ],
            "timestamp": [
                345
            ],
            "totalSupplyFormatted": [
                266
            ],
            "totalSupplyRaw": [
                345
            ],
            "trades24h": [
                345
            ],
            "volume24hFormatted": [
                266
            ],
            "volume24hRaw": [
                345
            ],
            "__typename": [
                264
            ]
        },
        "MarketSnapshot_order_by": {
            "db_write_timestamp": [
                346
            ],
            "floorPriceFormatted": [
                346
            ],
            "floorPriceRaw": [
                346
            ],
            "id": [
                346
            ],
            "marketSupplyFormatted": [
                346
            ],
            "marketSupplyRaw": [
                346
            ],
            "market_id": [
                346
            ],
            "priceFormatted": [
                346
            ],
            "priceRaw": [
                346
            ],
            "timestamp": [
                346
            ],
            "totalSupplyFormatted": [
                346
            ],
            "totalSupplyRaw": [
                346
            ],
            "trades24h": [
                346
            ],
            "volume24hFormatted": [
                346
            ],
            "volume24hRaw": [
                346
            ],
            "__typename": [
                264
            ]
        },
        "MarketSnapshot_select_column": {},
        "MarketSnapshot_stream_cursor_input": {
            "initial_value": [
                115
            ],
            "ordering": [
                317
            ],
            "__typename": [
                264
            ]
        },
        "MarketSnapshot_stream_cursor_value_input": {
            "db_write_timestamp": [
                363
            ],
            "floorPriceFormatted": [
                264
            ],
            "floorPriceRaw": [
                343
            ],
            "id": [
                264
            ],
            "marketSupplyFormatted": [
                264
            ],
            "marketSupplyRaw": [
                343
            ],
            "market_id": [
                264
            ],
            "priceFormatted": [
                264
            ],
            "priceRaw": [
                343
            ],
            "timestamp": [
                343
            ],
            "totalSupplyFormatted": [
                264
            ],
            "totalSupplyRaw": [
                343
            ],
            "trades24h": [
                343
            ],
            "volume24hFormatted": [
                264
            ],
            "volume24hRaw": [
                343
            ],
            "__typename": [
                264
            ]
        },
        "Market_aggregate_order_by": {
            "avg": [
                117
            ],
            "count": [
                346
            ],
            "max": [
                119
            ],
            "min": [
                120
            ],
            "stddev": [
                123
            ],
            "stddev_pop": [
                124
            ],
            "stddev_samp": [
                125
            ],
            "sum": [
                128
            ],
            "var_pop": [
                129
            ],
            "var_samp": [
                130
            ],
            "variance": [
                131
            ],
            "__typename": [
                264
            ]
        },
        "Market_avg_order_by": {
            "buyFeeBps": [
                346
            ],
            "createdAt": [
                346
            ],
            "currentPriceRaw": [
                346
            ],
            "floorPriceRaw": [
                346
            ],
            "floorSupplyRaw": [
                346
            ],
            "initialFloorPriceRaw": [
                346
            ],
            "lastElevationTimestamp": [
                346
            ],
            "lastTradeTimestamp": [
                346
            ],
            "lastUpdatedAt": [
                346
            ],
            "marketSupplyRaw": [
                346
            ],
            "maxLTV": [
                346
            ],
            "sellFeeBps": [
                346
            ],
            "totalSupplyRaw": [
                346
            ],
            "tradingFeeBps": [
                346
            ],
            "__typename": [
                264
            ]
        },
        "Market_bool_exp": {
            "_and": [
                118
            ],
            "_not": [
                118
            ],
            "_or": [
                118
            ],
            "buyFeeBps": [
                345
            ],
            "createdAt": [
                345
            ],
            "creator_id": [
                266
            ],
            "currentPriceFormatted": [
                266
            ],
            "currentPriceRaw": [
                345
            ],
            "db_write_timestamp": [
                364
            ],
            "factory_id": [
                266
            ],
            "feeDistributions": [
                23
            ],
            "floorElevations": [
                40
            ],
            "floorPriceFormatted": [
                266
            ],
            "floorPriceRaw": [
                345
            ],
            "floorSupplyFormatted": [
                266
            ],
            "floorSupplyRaw": [
                345
            ],
            "id": [
                266
            ],
            "initialFloorPriceFormatted": [
                266
            ],
            "initialFloorPriceRaw": [
                345
            ],
            "isBuyOpen": [
                13
            ],
            "isSellOpen": [
                13
            ],
            "issuanceToken": [
                268
            ],
            "issuanceToken_id": [
                266
            ],
            "lastElevationTimestamp": [
                345
            ],
            "lastTradeTimestamp": [
                345
            ],
            "lastUpdatedAt": [
                345
            ],
            "marketSupplyFormatted": [
                266
            ],
            "marketSupplyRaw": [
                345
            ],
            "maxLTV": [
                345
            ],
            "reserveToken": [
                268
            ],
            "reserveToken_id": [
                266
            ],
            "sellFeeBps": [
                345
            ],
            "status": [
                342
            ],
            "totalSupplyFormatted": [
                266
            ],
            "totalSupplyRaw": [
                345
            ],
            "trades": [
                276
            ],
            "tradingFeeBps": [
                345
            ],
            "__typename": [
                264
            ]
        },
        "Market_max_order_by": {
            "buyFeeBps": [
                346
            ],
            "createdAt": [
                346
            ],
            "creator_id": [
                346
            ],
            "currentPriceFormatted": [
                346
            ],
            "currentPriceRaw": [
                346
            ],
            "db_write_timestamp": [
                346
            ],
            "factory_id": [
                346
            ],
            "floorPriceFormatted": [
                346
            ],
            "floorPriceRaw": [
                346
            ],
            "floorSupplyFormatted": [
                346
            ],
            "floorSupplyRaw": [
                346
            ],
            "id": [
                346
            ],
            "initialFloorPriceFormatted": [
                346
            ],
            "initialFloorPriceRaw": [
                346
            ],
            "issuanceToken_id": [
                346
            ],
            "lastElevationTimestamp": [
                346
            ],
            "lastTradeTimestamp": [
                346
            ],
            "lastUpdatedAt": [
                346
            ],
            "marketSupplyFormatted": [
                346
            ],
            "marketSupplyRaw": [
                346
            ],
            "maxLTV": [
                346
            ],
            "reserveToken_id": [
                346
            ],
            "sellFeeBps": [
                346
            ],
            "status": [
                346
            ],
            "totalSupplyFormatted": [
                346
            ],
            "totalSupplyRaw": [
                346
            ],
            "tradingFeeBps": [
                346
            ],
            "__typename": [
                264
            ]
        },
        "Market_min_order_by": {
            "buyFeeBps": [
                346
            ],
            "createdAt": [
                346
            ],
            "creator_id": [
                346
            ],
            "currentPriceFormatted": [
                346
            ],
            "currentPriceRaw": [
                346
            ],
            "db_write_timestamp": [
                346
            ],
            "factory_id": [
                346
            ],
            "floorPriceFormatted": [
                346
            ],
            "floorPriceRaw": [
                346
            ],
            "floorSupplyFormatted": [
                346
            ],
            "floorSupplyRaw": [
                346
            ],
            "id": [
                346
            ],
            "initialFloorPriceFormatted": [
                346
            ],
            "initialFloorPriceRaw": [
                346
            ],
            "issuanceToken_id": [
                346
            ],
            "lastElevationTimestamp": [
                346
            ],
            "lastTradeTimestamp": [
                346
            ],
            "lastUpdatedAt": [
                346
            ],
            "marketSupplyFormatted": [
                346
            ],
            "marketSupplyRaw": [
                346
            ],
            "maxLTV": [
                346
            ],
            "reserveToken_id": [
                346
            ],
            "sellFeeBps": [
                346
            ],
            "status": [
                346
            ],
            "totalSupplyFormatted": [
                346
            ],
            "totalSupplyRaw": [
                346
            ],
            "tradingFeeBps": [
                346
            ],
            "__typename": [
                264
            ]
        },
        "Market_order_by": {
            "buyFeeBps": [
                346
            ],
            "createdAt": [
                346
            ],
            "creator_id": [
                346
            ],
            "currentPriceFormatted": [
                346
            ],
            "currentPriceRaw": [
                346
            ],
            "db_write_timestamp": [
                346
            ],
            "factory_id": [
                346
            ],
            "feeDistributions_aggregate": [
                21
            ],
            "floorElevations_aggregate": [
                38
            ],
            "floorPriceFormatted": [
                346
            ],
            "floorPriceRaw": [
                346
            ],
            "floorSupplyFormatted": [
                346
            ],
            "floorSupplyRaw": [
                346
            ],
            "id": [
                346
            ],
            "initialFloorPriceFormatted": [
                346
            ],
            "initialFloorPriceRaw": [
                346
            ],
            "isBuyOpen": [
                346
            ],
            "isSellOpen": [
                346
            ],
            "issuanceToken": [
                269
            ],
            "issuanceToken_id": [
                346
            ],
            "lastElevationTimestamp": [
                346
            ],
            "lastTradeTimestamp": [
                346
            ],
            "lastUpdatedAt": [
                346
            ],
            "marketSupplyFormatted": [
                346
            ],
            "marketSupplyRaw": [
                346
            ],
            "maxLTV": [
                346
            ],
            "reserveToken": [
                269
            ],
            "reserveToken_id": [
                346
            ],
            "sellFeeBps": [
                346
            ],
            "status": [
                346
            ],
            "totalSupplyFormatted": [
                346
            ],
            "totalSupplyRaw": [
                346
            ],
            "trades_aggregate": [
                274
            ],
            "tradingFeeBps": [
                346
            ],
            "__typename": [
                264
            ]
        },
        "Market_select_column": {},
        "Market_stddev_order_by": {
            "buyFeeBps": [
                346
            ],
            "createdAt": [
                346
            ],
            "currentPriceRaw": [
                346
            ],
            "floorPriceRaw": [
                346
            ],
            "floorSupplyRaw": [
                346
            ],
            "initialFloorPriceRaw": [
                346
            ],
            "lastElevationTimestamp": [
                346
            ],
            "lastTradeTimestamp": [
                346
            ],
            "lastUpdatedAt": [
                346
            ],
            "marketSupplyRaw": [
                346
            ],
            "maxLTV": [
                346
            ],
            "sellFeeBps": [
                346
            ],
            "totalSupplyRaw": [
                346
            ],
            "tradingFeeBps": [
                346
            ],
            "__typename": [
                264
            ]
        },
        "Market_stddev_pop_order_by": {
            "buyFeeBps": [
                346
            ],
            "createdAt": [
                346
            ],
            "currentPriceRaw": [
                346
            ],
            "floorPriceRaw": [
                346
            ],
            "floorSupplyRaw": [
                346
            ],
            "initialFloorPriceRaw": [
                346
            ],
            "lastElevationTimestamp": [
                346
            ],
            "lastTradeTimestamp": [
                346
            ],
            "lastUpdatedAt": [
                346
            ],
            "marketSupplyRaw": [
                346
            ],
            "maxLTV": [
                346
            ],
            "sellFeeBps": [
                346
            ],
            "totalSupplyRaw": [
                346
            ],
            "tradingFeeBps": [
                346
            ],
            "__typename": [
                264
            ]
        },
        "Market_stddev_samp_order_by": {
            "buyFeeBps": [
                346
            ],
            "createdAt": [
                346
            ],
            "currentPriceRaw": [
                346
            ],
            "floorPriceRaw": [
                346
            ],
            "floorSupplyRaw": [
                346
            ],
            "initialFloorPriceRaw": [
                346
            ],
            "lastElevationTimestamp": [
                346
            ],
            "lastTradeTimestamp": [
                346
            ],
            "lastUpdatedAt": [
                346
            ],
            "marketSupplyRaw": [
                346
            ],
            "maxLTV": [
                346
            ],
            "sellFeeBps": [
                346
            ],
            "totalSupplyRaw": [
                346
            ],
            "tradingFeeBps": [
                346
            ],
            "__typename": [
                264
            ]
        },
        "Market_stream_cursor_input": {
            "initial_value": [
                127
            ],
            "ordering": [
                317
            ],
            "__typename": [
                264
            ]
        },
        "Market_stream_cursor_value_input": {
            "buyFeeBps": [
                343
            ],
            "createdAt": [
                343
            ],
            "creator_id": [
                264
            ],
            "currentPriceFormatted": [
                264
            ],
            "currentPriceRaw": [
                343
            ],
            "db_write_timestamp": [
                363
            ],
            "factory_id": [
                264
            ],
            "floorPriceFormatted": [
                264
            ],
            "floorPriceRaw": [
                343
            ],
            "floorSupplyFormatted": [
                264
            ],
            "floorSupplyRaw": [
                343
            ],
            "id": [
                264
            ],
            "initialFloorPriceFormatted": [
                264
            ],
            "initialFloorPriceRaw": [
                343
            ],
            "isBuyOpen": [
                12
            ],
            "isSellOpen": [
                12
            ],
            "issuanceToken_id": [
                264
            ],
            "lastElevationTimestamp": [
                343
            ],
            "lastTradeTimestamp": [
                343
            ],
            "lastUpdatedAt": [
                343
            ],
            "marketSupplyFormatted": [
                264
            ],
            "marketSupplyRaw": [
                343
            ],
            "maxLTV": [
                343
            ],
            "reserveToken_id": [
                264
            ],
            "sellFeeBps": [
                343
            ],
            "status": [
                341
            ],
            "totalSupplyFormatted": [
                264
            ],
            "totalSupplyRaw": [
                343
            ],
            "tradingFeeBps": [
                343
            ],
            "__typename": [
                264
            ]
        },
        "Market_sum_order_by": {
            "buyFeeBps": [
                346
            ],
            "createdAt": [
                346
            ],
            "currentPriceRaw": [
                346
            ],
            "floorPriceRaw": [
                346
            ],
            "floorSupplyRaw": [
                346
            ],
            "initialFloorPriceRaw": [
                346
            ],
            "lastElevationTimestamp": [
                346
            ],
            "lastTradeTimestamp": [
                346
            ],
            "lastUpdatedAt": [
                346
            ],
            "marketSupplyRaw": [
                346
            ],
            "maxLTV": [
                346
            ],
            "sellFeeBps": [
                346
            ],
            "totalSupplyRaw": [
                346
            ],
            "tradingFeeBps": [
                346
            ],
            "__typename": [
                264
            ]
        },
        "Market_var_pop_order_by": {
            "buyFeeBps": [
                346
            ],
            "createdAt": [
                346
            ],
            "currentPriceRaw": [
                346
            ],
            "floorPriceRaw": [
                346
            ],
            "floorSupplyRaw": [
                346
            ],
            "initialFloorPriceRaw": [
                346
            ],
            "lastElevationTimestamp": [
                346
            ],
            "lastTradeTimestamp": [
                346
            ],
            "lastUpdatedAt": [
                346
            ],
            "marketSupplyRaw": [
                346
            ],
            "maxLTV": [
                346
            ],
            "sellFeeBps": [
                346
            ],
            "totalSupplyRaw": [
                346
            ],
            "tradingFeeBps": [
                346
            ],
            "__typename": [
                264
            ]
        },
        "Market_var_samp_order_by": {
            "buyFeeBps": [
                346
            ],
            "createdAt": [
                346
            ],
            "currentPriceRaw": [
                346
            ],
            "floorPriceRaw": [
                346
            ],
            "floorSupplyRaw": [
                346
            ],
            "initialFloorPriceRaw": [
                346
            ],
            "lastElevationTimestamp": [
                346
            ],
            "lastTradeTimestamp": [
                346
            ],
            "lastUpdatedAt": [
                346
            ],
            "marketSupplyRaw": [
                346
            ],
            "maxLTV": [
                346
            ],
            "sellFeeBps": [
                346
            ],
            "totalSupplyRaw": [
                346
            ],
            "tradingFeeBps": [
                346
            ],
            "__typename": [
                264
            ]
        },
        "Market_variance_order_by": {
            "buyFeeBps": [
                346
            ],
            "createdAt": [
                346
            ],
            "currentPriceRaw": [
                346
            ],
            "floorPriceRaw": [
                346
            ],
            "floorSupplyRaw": [
                346
            ],
            "initialFloorPriceRaw": [
                346
            ],
            "lastElevationTimestamp": [
                346
            ],
            "lastTradeTimestamp": [
                346
            ],
            "lastUpdatedAt": [
                346
            ],
            "marketSupplyRaw": [
                346
            ],
            "maxLTV": [
                346
            ],
            "sellFeeBps": [
                346
            ],
            "totalSupplyRaw": [
                346
            ],
            "tradingFeeBps": [
                346
            ],
            "__typename": [
                264
            ]
        },
        "ModuleAddress": {
            "createdAt": [
                343
            ],
            "db_write_timestamp": [
                363
            ],
            "id": [
                264
            ],
            "lastUpdatedAt": [
                343
            ],
            "market_id": [
                264
            ],
            "moduleType": [
                264
            ],
            "__typename": [
                264
            ]
        },
        "ModuleAddress_bool_exp": {
            "_and": [
                133
            ],
            "_not": [
                133
            ],
            "_or": [
                133
            ],
            "createdAt": [
                345
            ],
            "db_write_timestamp": [
                364
            ],
            "id": [
                266
            ],
            "lastUpdatedAt": [
                345
            ],
            "market_id": [
                266
            ],
            "moduleType": [
                266
            ],
            "__typename": [
                264
            ]
        },
        "ModuleAddress_order_by": {
            "createdAt": [
                346
            ],
            "db_write_timestamp": [
                346
            ],
            "id": [
                346
            ],
            "lastUpdatedAt": [
                346
            ],
            "market_id": [
                346
            ],
            "moduleType": [
                346
            ],
            "__typename": [
                264
            ]
        },
        "ModuleAddress_select_column": {},
        "ModuleAddress_stream_cursor_input": {
            "initial_value": [
                137
            ],
            "ordering": [
                317
            ],
            "__typename": [
                264
            ]
        },
        "ModuleAddress_stream_cursor_value_input": {
            "createdAt": [
                343
            ],
            "db_write_timestamp": [
                363
            ],
            "id": [
                264
            ],
            "lastUpdatedAt": [
                343
            ],
            "market_id": [
                264
            ],
            "moduleType": [
                264
            ],
            "__typename": [
                264
            ]
        },
        "ModuleRegistry": {
            "authorizer": [
                264
            ],
            "createdAt": [
                343
            ],
            "creditFacility": [
                264
            ],
            "db_write_timestamp": [
                363
            ],
            "feeTreasury": [
                264
            ],
            "floor": [
                264
            ],
            "id": [
                264
            ],
            "lastUpdatedAt": [
                343
            ],
            "presale": [
                264
            ],
            "staking": [
                264
            ],
            "__typename": [
                264
            ]
        },
        "ModuleRegistry_bool_exp": {
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
                266
            ],
            "createdAt": [
                345
            ],
            "creditFacility": [
                266
            ],
            "db_write_timestamp": [
                364
            ],
            "feeTreasury": [
                266
            ],
            "floor": [
                266
            ],
            "id": [
                266
            ],
            "lastUpdatedAt": [
                345
            ],
            "presale": [
                266
            ],
            "staking": [
                266
            ],
            "__typename": [
                264
            ]
        },
        "ModuleRegistry_order_by": {
            "authorizer": [
                346
            ],
            "createdAt": [
                346
            ],
            "creditFacility": [
                346
            ],
            "db_write_timestamp": [
                346
            ],
            "feeTreasury": [
                346
            ],
            "floor": [
                346
            ],
            "id": [
                346
            ],
            "lastUpdatedAt": [
                346
            ],
            "presale": [
                346
            ],
            "staking": [
                346
            ],
            "__typename": [
                264
            ]
        },
        "ModuleRegistry_select_column": {},
        "ModuleRegistry_stream_cursor_input": {
            "initial_value": [
                143
            ],
            "ordering": [
                317
            ],
            "__typename": [
                264
            ]
        },
        "ModuleRegistry_stream_cursor_value_input": {
            "authorizer": [
                264
            ],
            "createdAt": [
                343
            ],
            "creditFacility": [
                264
            ],
            "db_write_timestamp": [
                363
            ],
            "feeTreasury": [
                264
            ],
            "floor": [
                264
            ],
            "id": [
                264
            ],
            "lastUpdatedAt": [
                343
            ],
            "presale": [
                264
            ],
            "staking": [
                264
            ],
            "__typename": [
                264
            ]
        },
        "PreSaleContract": {
            "authorizer": [
                264
            ],
            "claims": [
                150,
                {
                    "distinct_on": [
                        157,
                        "[PresaleClaim_select_column!]"
                    ],
                    "limit": [
                        66
                    ],
                    "offset": [
                        66
                    ],
                    "order_by": [
                        156,
                        "[PresaleClaim_order_by!]"
                    ],
                    "where": [
                        153
                    ]
                }
            ],
            "commissionBps": [
                343
            ],
            "createdAt": [
                343
            ],
            "currentState": [
                66
            ],
            "db_write_timestamp": [
                363
            ],
            "endTime": [
                343
            ],
            "feeTreasury": [
                264
            ],
            "globalDepositCapFormatted": [
                264
            ],
            "globalDepositCapRaw": [
                343
            ],
            "id": [
                264
            ],
            "lastUpdatedAt": [
                343
            ],
            "lendingFacility": [
                264
            ],
            "market_id": [
                264
            ],
            "maxLeverage": [
                343
            ],
            "participations": [
                167,
                {
                    "distinct_on": [
                        174,
                        "[PresaleParticipation_select_column!]"
                    ],
                    "limit": [
                        66
                    ],
                    "offset": [
                        66
                    ],
                    "order_by": [
                        173,
                        "[PresaleParticipation_order_by!]"
                    ],
                    "where": [
                        170
                    ]
                }
            ],
            "perAddressDepositCapFormatted": [
                264
            ],
            "perAddressDepositCapRaw": [
                343
            ],
            "priceBreakpointOffsets": [
                66
            ],
            "priceBreakpointsFlat": [
                343
            ],
            "purchaseToken": [
                267
            ],
            "purchaseToken_id": [
                264
            ],
            "saleToken": [
                267
            ],
            "saleToken_id": [
                264
            ],
            "startTime": [
                343
            ],
            "timeSafeguardTs": [
                343
            ],
            "totalParticipants": [
                343
            ],
            "totalRaisedFormatted": [
                264
            ],
            "totalRaisedRaw": [
                343
            ],
            "whitelistSize": [
                343
            ],
            "whitelistedAddresses": [
                264
            ],
            "__typename": [
                264
            ]
        },
        "PreSaleContract_bool_exp": {
            "_and": [
                145
            ],
            "_not": [
                145
            ],
            "_or": [
                145
            ],
            "authorizer": [
                266
            ],
            "claims": [
                153
            ],
            "commissionBps": [
                344
            ],
            "createdAt": [
                345
            ],
            "currentState": [
                68
            ],
            "db_write_timestamp": [
                364
            ],
            "endTime": [
                345
            ],
            "feeTreasury": [
                266
            ],
            "globalDepositCapFormatted": [
                266
            ],
            "globalDepositCapRaw": [
                345
            ],
            "id": [
                266
            ],
            "lastUpdatedAt": [
                345
            ],
            "lendingFacility": [
                266
            ],
            "market_id": [
                266
            ],
            "maxLeverage": [
                345
            ],
            "participations": [
                170
            ],
            "perAddressDepositCapFormatted": [
                266
            ],
            "perAddressDepositCapRaw": [
                345
            ],
            "priceBreakpointOffsets": [
                67
            ],
            "priceBreakpointsFlat": [
                344
            ],
            "purchaseToken": [
                268
            ],
            "purchaseToken_id": [
                266
            ],
            "saleToken": [
                268
            ],
            "saleToken_id": [
                266
            ],
            "startTime": [
                345
            ],
            "timeSafeguardTs": [
                345
            ],
            "totalParticipants": [
                345
            ],
            "totalRaisedFormatted": [
                266
            ],
            "totalRaisedRaw": [
                345
            ],
            "whitelistSize": [
                345
            ],
            "whitelistedAddresses": [
                265
            ],
            "__typename": [
                264
            ]
        },
        "PreSaleContract_order_by": {
            "authorizer": [
                346
            ],
            "claims_aggregate": [
                151
            ],
            "commissionBps": [
                346
            ],
            "createdAt": [
                346
            ],
            "currentState": [
                346
            ],
            "db_write_timestamp": [
                346
            ],
            "endTime": [
                346
            ],
            "feeTreasury": [
                346
            ],
            "globalDepositCapFormatted": [
                346
            ],
            "globalDepositCapRaw": [
                346
            ],
            "id": [
                346
            ],
            "lastUpdatedAt": [
                346
            ],
            "lendingFacility": [
                346
            ],
            "market_id": [
                346
            ],
            "maxLeverage": [
                346
            ],
            "participations_aggregate": [
                168
            ],
            "perAddressDepositCapFormatted": [
                346
            ],
            "perAddressDepositCapRaw": [
                346
            ],
            "priceBreakpointOffsets": [
                346
            ],
            "priceBreakpointsFlat": [
                346
            ],
            "purchaseToken": [
                269
            ],
            "purchaseToken_id": [
                346
            ],
            "saleToken": [
                269
            ],
            "saleToken_id": [
                346
            ],
            "startTime": [
                346
            ],
            "timeSafeguardTs": [
                346
            ],
            "totalParticipants": [
                346
            ],
            "totalRaisedFormatted": [
                346
            ],
            "totalRaisedRaw": [
                346
            ],
            "whitelistSize": [
                346
            ],
            "whitelistedAddresses": [
                346
            ],
            "__typename": [
                264
            ]
        },
        "PreSaleContract_select_column": {},
        "PreSaleContract_stream_cursor_input": {
            "initial_value": [
                149
            ],
            "ordering": [
                317
            ],
            "__typename": [
                264
            ]
        },
        "PreSaleContract_stream_cursor_value_input": {
            "authorizer": [
                264
            ],
            "commissionBps": [
                343
            ],
            "createdAt": [
                343
            ],
            "currentState": [
                66
            ],
            "db_write_timestamp": [
                363
            ],
            "endTime": [
                343
            ],
            "feeTreasury": [
                264
            ],
            "globalDepositCapFormatted": [
                264
            ],
            "globalDepositCapRaw": [
                343
            ],
            "id": [
                264
            ],
            "lastUpdatedAt": [
                343
            ],
            "lendingFacility": [
                264
            ],
            "market_id": [
                264
            ],
            "maxLeverage": [
                343
            ],
            "perAddressDepositCapFormatted": [
                264
            ],
            "perAddressDepositCapRaw": [
                343
            ],
            "priceBreakpointOffsets": [
                66
            ],
            "priceBreakpointsFlat": [
                343
            ],
            "purchaseToken_id": [
                264
            ],
            "saleToken_id": [
                264
            ],
            "startTime": [
                343
            ],
            "timeSafeguardTs": [
                343
            ],
            "totalParticipants": [
                343
            ],
            "totalRaisedFormatted": [
                264
            ],
            "totalRaisedRaw": [
                343
            ],
            "whitelistSize": [
                343
            ],
            "whitelistedAddresses": [
                264
            ],
            "__typename": [
                264
            ]
        },
        "PresaleClaim": {
            "amountFormatted": [
                264
            ],
            "amountRaw": [
                343
            ],
            "claimType": [
                353
            ],
            "db_write_timestamp": [
                363
            ],
            "id": [
                264
            ],
            "loanId": [
                343
            ],
            "positionId": [
                343
            ],
            "presale_id": [
                264
            ],
            "timestamp": [
                343
            ],
            "trancheIndex": [
                343
            ],
            "transactionHash": [
                264
            ],
            "__typename": [
                264
            ]
        },
        "PresaleClaim_aggregate_order_by": {
            "avg": [
                152
            ],
            "count": [
                346
            ],
            "max": [
                154
            ],
            "min": [
                155
            ],
            "stddev": [
                158
            ],
            "stddev_pop": [
                159
            ],
            "stddev_samp": [
                160
            ],
            "sum": [
                163
            ],
            "var_pop": [
                164
            ],
            "var_samp": [
                165
            ],
            "variance": [
                166
            ],
            "__typename": [
                264
            ]
        },
        "PresaleClaim_avg_order_by": {
            "amountRaw": [
                346
            ],
            "loanId": [
                346
            ],
            "positionId": [
                346
            ],
            "timestamp": [
                346
            ],
            "trancheIndex": [
                346
            ],
            "__typename": [
                264
            ]
        },
        "PresaleClaim_bool_exp": {
            "_and": [
                153
            ],
            "_not": [
                153
            ],
            "_or": [
                153
            ],
            "amountFormatted": [
                266
            ],
            "amountRaw": [
                345
            ],
            "claimType": [
                354
            ],
            "db_write_timestamp": [
                364
            ],
            "id": [
                266
            ],
            "loanId": [
                345
            ],
            "positionId": [
                345
            ],
            "presale_id": [
                266
            ],
            "timestamp": [
                345
            ],
            "trancheIndex": [
                345
            ],
            "transactionHash": [
                266
            ],
            "__typename": [
                264
            ]
        },
        "PresaleClaim_max_order_by": {
            "amountFormatted": [
                346
            ],
            "amountRaw": [
                346
            ],
            "claimType": [
                346
            ],
            "db_write_timestamp": [
                346
            ],
            "id": [
                346
            ],
            "loanId": [
                346
            ],
            "positionId": [
                346
            ],
            "presale_id": [
                346
            ],
            "timestamp": [
                346
            ],
            "trancheIndex": [
                346
            ],
            "transactionHash": [
                346
            ],
            "__typename": [
                264
            ]
        },
        "PresaleClaim_min_order_by": {
            "amountFormatted": [
                346
            ],
            "amountRaw": [
                346
            ],
            "claimType": [
                346
            ],
            "db_write_timestamp": [
                346
            ],
            "id": [
                346
            ],
            "loanId": [
                346
            ],
            "positionId": [
                346
            ],
            "presale_id": [
                346
            ],
            "timestamp": [
                346
            ],
            "trancheIndex": [
                346
            ],
            "transactionHash": [
                346
            ],
            "__typename": [
                264
            ]
        },
        "PresaleClaim_order_by": {
            "amountFormatted": [
                346
            ],
            "amountRaw": [
                346
            ],
            "claimType": [
                346
            ],
            "db_write_timestamp": [
                346
            ],
            "id": [
                346
            ],
            "loanId": [
                346
            ],
            "positionId": [
                346
            ],
            "presale_id": [
                346
            ],
            "timestamp": [
                346
            ],
            "trancheIndex": [
                346
            ],
            "transactionHash": [
                346
            ],
            "__typename": [
                264
            ]
        },
        "PresaleClaim_select_column": {},
        "PresaleClaim_stddev_order_by": {
            "amountRaw": [
                346
            ],
            "loanId": [
                346
            ],
            "positionId": [
                346
            ],
            "timestamp": [
                346
            ],
            "trancheIndex": [
                346
            ],
            "__typename": [
                264
            ]
        },
        "PresaleClaim_stddev_pop_order_by": {
            "amountRaw": [
                346
            ],
            "loanId": [
                346
            ],
            "positionId": [
                346
            ],
            "timestamp": [
                346
            ],
            "trancheIndex": [
                346
            ],
            "__typename": [
                264
            ]
        },
        "PresaleClaim_stddev_samp_order_by": {
            "amountRaw": [
                346
            ],
            "loanId": [
                346
            ],
            "positionId": [
                346
            ],
            "timestamp": [
                346
            ],
            "trancheIndex": [
                346
            ],
            "__typename": [
                264
            ]
        },
        "PresaleClaim_stream_cursor_input": {
            "initial_value": [
                162
            ],
            "ordering": [
                317
            ],
            "__typename": [
                264
            ]
        },
        "PresaleClaim_stream_cursor_value_input": {
            "amountFormatted": [
                264
            ],
            "amountRaw": [
                343
            ],
            "claimType": [
                353
            ],
            "db_write_timestamp": [
                363
            ],
            "id": [
                264
            ],
            "loanId": [
                343
            ],
            "positionId": [
                343
            ],
            "presale_id": [
                264
            ],
            "timestamp": [
                343
            ],
            "trancheIndex": [
                343
            ],
            "transactionHash": [
                264
            ],
            "__typename": [
                264
            ]
        },
        "PresaleClaim_sum_order_by": {
            "amountRaw": [
                346
            ],
            "loanId": [
                346
            ],
            "positionId": [
                346
            ],
            "timestamp": [
                346
            ],
            "trancheIndex": [
                346
            ],
            "__typename": [
                264
            ]
        },
        "PresaleClaim_var_pop_order_by": {
            "amountRaw": [
                346
            ],
            "loanId": [
                346
            ],
            "positionId": [
                346
            ],
            "timestamp": [
                346
            ],
            "trancheIndex": [
                346
            ],
            "__typename": [
                264
            ]
        },
        "PresaleClaim_var_samp_order_by": {
            "amountRaw": [
                346
            ],
            "loanId": [
                346
            ],
            "positionId": [
                346
            ],
            "timestamp": [
                346
            ],
            "trancheIndex": [
                346
            ],
            "__typename": [
                264
            ]
        },
        "PresaleClaim_variance_order_by": {
            "amountRaw": [
                346
            ],
            "loanId": [
                346
            ],
            "positionId": [
                346
            ],
            "timestamp": [
                346
            ],
            "trancheIndex": [
                346
            ],
            "__typename": [
                264
            ]
        },
        "PresaleParticipation": {
            "db_write_timestamp": [
                363
            ],
            "depositAmountFormatted": [
                264
            ],
            "depositAmountRaw": [
                343
            ],
            "id": [
                264
            ],
            "leverage": [
                343
            ],
            "loopCount": [
                343
            ],
            "mintedAmountFormatted": [
                264
            ],
            "mintedAmountRaw": [
                343
            ],
            "positionId": [
                343
            ],
            "presale_id": [
                264
            ],
            "timestamp": [
                343
            ],
            "transactionHash": [
                264
            ],
            "user_id": [
                264
            ],
            "__typename": [
                264
            ]
        },
        "PresaleParticipation_aggregate_order_by": {
            "avg": [
                169
            ],
            "count": [
                346
            ],
            "max": [
                171
            ],
            "min": [
                172
            ],
            "stddev": [
                175
            ],
            "stddev_pop": [
                176
            ],
            "stddev_samp": [
                177
            ],
            "sum": [
                180
            ],
            "var_pop": [
                181
            ],
            "var_samp": [
                182
            ],
            "variance": [
                183
            ],
            "__typename": [
                264
            ]
        },
        "PresaleParticipation_avg_order_by": {
            "depositAmountRaw": [
                346
            ],
            "leverage": [
                346
            ],
            "loopCount": [
                346
            ],
            "mintedAmountRaw": [
                346
            ],
            "positionId": [
                346
            ],
            "timestamp": [
                346
            ],
            "__typename": [
                264
            ]
        },
        "PresaleParticipation_bool_exp": {
            "_and": [
                170
            ],
            "_not": [
                170
            ],
            "_or": [
                170
            ],
            "db_write_timestamp": [
                364
            ],
            "depositAmountFormatted": [
                266
            ],
            "depositAmountRaw": [
                345
            ],
            "id": [
                266
            ],
            "leverage": [
                345
            ],
            "loopCount": [
                345
            ],
            "mintedAmountFormatted": [
                266
            ],
            "mintedAmountRaw": [
                345
            ],
            "positionId": [
                345
            ],
            "presale_id": [
                266
            ],
            "timestamp": [
                345
            ],
            "transactionHash": [
                266
            ],
            "user_id": [
                266
            ],
            "__typename": [
                264
            ]
        },
        "PresaleParticipation_max_order_by": {
            "db_write_timestamp": [
                346
            ],
            "depositAmountFormatted": [
                346
            ],
            "depositAmountRaw": [
                346
            ],
            "id": [
                346
            ],
            "leverage": [
                346
            ],
            "loopCount": [
                346
            ],
            "mintedAmountFormatted": [
                346
            ],
            "mintedAmountRaw": [
                346
            ],
            "positionId": [
                346
            ],
            "presale_id": [
                346
            ],
            "timestamp": [
                346
            ],
            "transactionHash": [
                346
            ],
            "user_id": [
                346
            ],
            "__typename": [
                264
            ]
        },
        "PresaleParticipation_min_order_by": {
            "db_write_timestamp": [
                346
            ],
            "depositAmountFormatted": [
                346
            ],
            "depositAmountRaw": [
                346
            ],
            "id": [
                346
            ],
            "leverage": [
                346
            ],
            "loopCount": [
                346
            ],
            "mintedAmountFormatted": [
                346
            ],
            "mintedAmountRaw": [
                346
            ],
            "positionId": [
                346
            ],
            "presale_id": [
                346
            ],
            "timestamp": [
                346
            ],
            "transactionHash": [
                346
            ],
            "user_id": [
                346
            ],
            "__typename": [
                264
            ]
        },
        "PresaleParticipation_order_by": {
            "db_write_timestamp": [
                346
            ],
            "depositAmountFormatted": [
                346
            ],
            "depositAmountRaw": [
                346
            ],
            "id": [
                346
            ],
            "leverage": [
                346
            ],
            "loopCount": [
                346
            ],
            "mintedAmountFormatted": [
                346
            ],
            "mintedAmountRaw": [
                346
            ],
            "positionId": [
                346
            ],
            "presale_id": [
                346
            ],
            "timestamp": [
                346
            ],
            "transactionHash": [
                346
            ],
            "user_id": [
                346
            ],
            "__typename": [
                264
            ]
        },
        "PresaleParticipation_select_column": {},
        "PresaleParticipation_stddev_order_by": {
            "depositAmountRaw": [
                346
            ],
            "leverage": [
                346
            ],
            "loopCount": [
                346
            ],
            "mintedAmountRaw": [
                346
            ],
            "positionId": [
                346
            ],
            "timestamp": [
                346
            ],
            "__typename": [
                264
            ]
        },
        "PresaleParticipation_stddev_pop_order_by": {
            "depositAmountRaw": [
                346
            ],
            "leverage": [
                346
            ],
            "loopCount": [
                346
            ],
            "mintedAmountRaw": [
                346
            ],
            "positionId": [
                346
            ],
            "timestamp": [
                346
            ],
            "__typename": [
                264
            ]
        },
        "PresaleParticipation_stddev_samp_order_by": {
            "depositAmountRaw": [
                346
            ],
            "leverage": [
                346
            ],
            "loopCount": [
                346
            ],
            "mintedAmountRaw": [
                346
            ],
            "positionId": [
                346
            ],
            "timestamp": [
                346
            ],
            "__typename": [
                264
            ]
        },
        "PresaleParticipation_stream_cursor_input": {
            "initial_value": [
                179
            ],
            "ordering": [
                317
            ],
            "__typename": [
                264
            ]
        },
        "PresaleParticipation_stream_cursor_value_input": {
            "db_write_timestamp": [
                363
            ],
            "depositAmountFormatted": [
                264
            ],
            "depositAmountRaw": [
                343
            ],
            "id": [
                264
            ],
            "leverage": [
                343
            ],
            "loopCount": [
                343
            ],
            "mintedAmountFormatted": [
                264
            ],
            "mintedAmountRaw": [
                343
            ],
            "positionId": [
                343
            ],
            "presale_id": [
                264
            ],
            "timestamp": [
                343
            ],
            "transactionHash": [
                264
            ],
            "user_id": [
                264
            ],
            "__typename": [
                264
            ]
        },
        "PresaleParticipation_sum_order_by": {
            "depositAmountRaw": [
                346
            ],
            "leverage": [
                346
            ],
            "loopCount": [
                346
            ],
            "mintedAmountRaw": [
                346
            ],
            "positionId": [
                346
            ],
            "timestamp": [
                346
            ],
            "__typename": [
                264
            ]
        },
        "PresaleParticipation_var_pop_order_by": {
            "depositAmountRaw": [
                346
            ],
            "leverage": [
                346
            ],
            "loopCount": [
                346
            ],
            "mintedAmountRaw": [
                346
            ],
            "positionId": [
                346
            ],
            "timestamp": [
                346
            ],
            "__typename": [
                264
            ]
        },
        "PresaleParticipation_var_samp_order_by": {
            "depositAmountRaw": [
                346
            ],
            "leverage": [
                346
            ],
            "loopCount": [
                346
            ],
            "mintedAmountRaw": [
                346
            ],
            "positionId": [
                346
            ],
            "timestamp": [
                346
            ],
            "__typename": [
                264
            ]
        },
        "PresaleParticipation_variance_order_by": {
            "depositAmountRaw": [
                346
            ],
            "leverage": [
                346
            ],
            "loopCount": [
                346
            ],
            "mintedAmountRaw": [
                346
            ],
            "positionId": [
                346
            ],
            "timestamp": [
                346
            ],
            "__typename": [
                264
            ]
        },
        "PriceCandle": {
            "closeFormatted": [
                264
            ],
            "closeRaw": [
                343
            ],
            "db_write_timestamp": [
                363
            ],
            "highFormatted": [
                264
            ],
            "highRaw": [
                343
            ],
            "id": [
                264
            ],
            "lowFormatted": [
                264
            ],
            "lowRaw": [
                343
            ],
            "market_id": [
                264
            ],
            "openFormatted": [
                264
            ],
            "openRaw": [
                343
            ],
            "period": [
                307
            ],
            "timestamp": [
                343
            ],
            "trades": [
                343
            ],
            "volumeFormatted": [
                264
            ],
            "volumeRaw": [
                343
            ],
            "__typename": [
                264
            ]
        },
        "PriceCandle_bool_exp": {
            "_and": [
                185
            ],
            "_not": [
                185
            ],
            "_or": [
                185
            ],
            "closeFormatted": [
                266
            ],
            "closeRaw": [
                345
            ],
            "db_write_timestamp": [
                364
            ],
            "highFormatted": [
                266
            ],
            "highRaw": [
                345
            ],
            "id": [
                266
            ],
            "lowFormatted": [
                266
            ],
            "lowRaw": [
                345
            ],
            "market_id": [
                266
            ],
            "openFormatted": [
                266
            ],
            "openRaw": [
                345
            ],
            "period": [
                308
            ],
            "timestamp": [
                345
            ],
            "trades": [
                345
            ],
            "volumeFormatted": [
                266
            ],
            "volumeRaw": [
                345
            ],
            "__typename": [
                264
            ]
        },
        "PriceCandle_order_by": {
            "closeFormatted": [
                346
            ],
            "closeRaw": [
                346
            ],
            "db_write_timestamp": [
                346
            ],
            "highFormatted": [
                346
            ],
            "highRaw": [
                346
            ],
            "id": [
                346
            ],
            "lowFormatted": [
                346
            ],
            "lowRaw": [
                346
            ],
            "market_id": [
                346
            ],
            "openFormatted": [
                346
            ],
            "openRaw": [
                346
            ],
            "period": [
                346
            ],
            "timestamp": [
                346
            ],
            "trades": [
                346
            ],
            "volumeFormatted": [
                346
            ],
            "volumeRaw": [
                346
            ],
            "__typename": [
                264
            ]
        },
        "PriceCandle_select_column": {},
        "PriceCandle_stream_cursor_input": {
            "initial_value": [
                189
            ],
            "ordering": [
                317
            ],
            "__typename": [
                264
            ]
        },
        "PriceCandle_stream_cursor_value_input": {
            "closeFormatted": [
                264
            ],
            "closeRaw": [
                343
            ],
            "db_write_timestamp": [
                363
            ],
            "highFormatted": [
                264
            ],
            "highRaw": [
                343
            ],
            "id": [
                264
            ],
            "lowFormatted": [
                264
            ],
            "lowRaw": [
                343
            ],
            "market_id": [
                264
            ],
            "openFormatted": [
                264
            ],
            "openRaw": [
                343
            ],
            "period": [
                307
            ],
            "timestamp": [
                343
            ],
            "trades": [
                343
            ],
            "volumeFormatted": [
                264
            ],
            "volumeRaw": [
                343
            ],
            "__typename": [
                264
            ]
        },
        "Role": {
            "adminRole": [
                264
            ],
            "adminRoleName": [
                264
            ],
            "authorizer_id": [
                264
            ],
            "createdAt": [
                343
            ],
            "db_write_timestamp": [
                363
            ],
            "id": [
                264
            ],
            "isAdminBurned": [
                12
            ],
            "lastUpdatedAt": [
                343
            ],
            "members": [
                191,
                {
                    "distinct_on": [
                        198,
                        "[RoleMember_select_column!]"
                    ],
                    "limit": [
                        66
                    ],
                    "offset": [
                        66
                    ],
                    "order_by": [
                        197,
                        "[RoleMember_order_by!]"
                    ],
                    "where": [
                        194
                    ]
                }
            ],
            "name": [
                264
            ],
            "permissions": [
                208,
                {
                    "distinct_on": [
                        215,
                        "[RolePermission_select_column!]"
                    ],
                    "limit": [
                        66
                    ],
                    "offset": [
                        66
                    ],
                    "order_by": [
                        214,
                        "[RolePermission_order_by!]"
                    ],
                    "where": [
                        211
                    ]
                }
            ],
            "roleId": [
                264
            ],
            "__typename": [
                264
            ]
        },
        "RoleMember": {
            "db_write_timestamp": [
                363
            ],
            "grantedAt": [
                343
            ],
            "grantedBy": [
                264
            ],
            "id": [
                264
            ],
            "member": [
                264
            ],
            "role_id": [
                264
            ],
            "transactionHash": [
                264
            ],
            "__typename": [
                264
            ]
        },
        "RoleMember_aggregate_order_by": {
            "avg": [
                193
            ],
            "count": [
                346
            ],
            "max": [
                195
            ],
            "min": [
                196
            ],
            "stddev": [
                199
            ],
            "stddev_pop": [
                200
            ],
            "stddev_samp": [
                201
            ],
            "sum": [
                204
            ],
            "var_pop": [
                205
            ],
            "var_samp": [
                206
            ],
            "variance": [
                207
            ],
            "__typename": [
                264
            ]
        },
        "RoleMember_avg_order_by": {
            "grantedAt": [
                346
            ],
            "__typename": [
                264
            ]
        },
        "RoleMember_bool_exp": {
            "_and": [
                194
            ],
            "_not": [
                194
            ],
            "_or": [
                194
            ],
            "db_write_timestamp": [
                364
            ],
            "grantedAt": [
                345
            ],
            "grantedBy": [
                266
            ],
            "id": [
                266
            ],
            "member": [
                266
            ],
            "role_id": [
                266
            ],
            "transactionHash": [
                266
            ],
            "__typename": [
                264
            ]
        },
        "RoleMember_max_order_by": {
            "db_write_timestamp": [
                346
            ],
            "grantedAt": [
                346
            ],
            "grantedBy": [
                346
            ],
            "id": [
                346
            ],
            "member": [
                346
            ],
            "role_id": [
                346
            ],
            "transactionHash": [
                346
            ],
            "__typename": [
                264
            ]
        },
        "RoleMember_min_order_by": {
            "db_write_timestamp": [
                346
            ],
            "grantedAt": [
                346
            ],
            "grantedBy": [
                346
            ],
            "id": [
                346
            ],
            "member": [
                346
            ],
            "role_id": [
                346
            ],
            "transactionHash": [
                346
            ],
            "__typename": [
                264
            ]
        },
        "RoleMember_order_by": {
            "db_write_timestamp": [
                346
            ],
            "grantedAt": [
                346
            ],
            "grantedBy": [
                346
            ],
            "id": [
                346
            ],
            "member": [
                346
            ],
            "role_id": [
                346
            ],
            "transactionHash": [
                346
            ],
            "__typename": [
                264
            ]
        },
        "RoleMember_select_column": {},
        "RoleMember_stddev_order_by": {
            "grantedAt": [
                346
            ],
            "__typename": [
                264
            ]
        },
        "RoleMember_stddev_pop_order_by": {
            "grantedAt": [
                346
            ],
            "__typename": [
                264
            ]
        },
        "RoleMember_stddev_samp_order_by": {
            "grantedAt": [
                346
            ],
            "__typename": [
                264
            ]
        },
        "RoleMember_stream_cursor_input": {
            "initial_value": [
                203
            ],
            "ordering": [
                317
            ],
            "__typename": [
                264
            ]
        },
        "RoleMember_stream_cursor_value_input": {
            "db_write_timestamp": [
                363
            ],
            "grantedAt": [
                343
            ],
            "grantedBy": [
                264
            ],
            "id": [
                264
            ],
            "member": [
                264
            ],
            "role_id": [
                264
            ],
            "transactionHash": [
                264
            ],
            "__typename": [
                264
            ]
        },
        "RoleMember_sum_order_by": {
            "grantedAt": [
                346
            ],
            "__typename": [
                264
            ]
        },
        "RoleMember_var_pop_order_by": {
            "grantedAt": [
                346
            ],
            "__typename": [
                264
            ]
        },
        "RoleMember_var_samp_order_by": {
            "grantedAt": [
                346
            ],
            "__typename": [
                264
            ]
        },
        "RoleMember_variance_order_by": {
            "grantedAt": [
                346
            ],
            "__typename": [
                264
            ]
        },
        "RolePermission": {
            "addedAt": [
                343
            ],
            "db_write_timestamp": [
                363
            ],
            "id": [
                264
            ],
            "role_id": [
                264
            ],
            "selector": [
                264
            ],
            "selectorName": [
                264
            ],
            "target": [
                264
            ],
            "transactionHash": [
                264
            ],
            "__typename": [
                264
            ]
        },
        "RolePermission_aggregate_order_by": {
            "avg": [
                210
            ],
            "count": [
                346
            ],
            "max": [
                212
            ],
            "min": [
                213
            ],
            "stddev": [
                216
            ],
            "stddev_pop": [
                217
            ],
            "stddev_samp": [
                218
            ],
            "sum": [
                221
            ],
            "var_pop": [
                222
            ],
            "var_samp": [
                223
            ],
            "variance": [
                224
            ],
            "__typename": [
                264
            ]
        },
        "RolePermission_avg_order_by": {
            "addedAt": [
                346
            ],
            "__typename": [
                264
            ]
        },
        "RolePermission_bool_exp": {
            "_and": [
                211
            ],
            "_not": [
                211
            ],
            "_or": [
                211
            ],
            "addedAt": [
                345
            ],
            "db_write_timestamp": [
                364
            ],
            "id": [
                266
            ],
            "role_id": [
                266
            ],
            "selector": [
                266
            ],
            "selectorName": [
                266
            ],
            "target": [
                266
            ],
            "transactionHash": [
                266
            ],
            "__typename": [
                264
            ]
        },
        "RolePermission_max_order_by": {
            "addedAt": [
                346
            ],
            "db_write_timestamp": [
                346
            ],
            "id": [
                346
            ],
            "role_id": [
                346
            ],
            "selector": [
                346
            ],
            "selectorName": [
                346
            ],
            "target": [
                346
            ],
            "transactionHash": [
                346
            ],
            "__typename": [
                264
            ]
        },
        "RolePermission_min_order_by": {
            "addedAt": [
                346
            ],
            "db_write_timestamp": [
                346
            ],
            "id": [
                346
            ],
            "role_id": [
                346
            ],
            "selector": [
                346
            ],
            "selectorName": [
                346
            ],
            "target": [
                346
            ],
            "transactionHash": [
                346
            ],
            "__typename": [
                264
            ]
        },
        "RolePermission_order_by": {
            "addedAt": [
                346
            ],
            "db_write_timestamp": [
                346
            ],
            "id": [
                346
            ],
            "role_id": [
                346
            ],
            "selector": [
                346
            ],
            "selectorName": [
                346
            ],
            "target": [
                346
            ],
            "transactionHash": [
                346
            ],
            "__typename": [
                264
            ]
        },
        "RolePermission_select_column": {},
        "RolePermission_stddev_order_by": {
            "addedAt": [
                346
            ],
            "__typename": [
                264
            ]
        },
        "RolePermission_stddev_pop_order_by": {
            "addedAt": [
                346
            ],
            "__typename": [
                264
            ]
        },
        "RolePermission_stddev_samp_order_by": {
            "addedAt": [
                346
            ],
            "__typename": [
                264
            ]
        },
        "RolePermission_stream_cursor_input": {
            "initial_value": [
                220
            ],
            "ordering": [
                317
            ],
            "__typename": [
                264
            ]
        },
        "RolePermission_stream_cursor_value_input": {
            "addedAt": [
                343
            ],
            "db_write_timestamp": [
                363
            ],
            "id": [
                264
            ],
            "role_id": [
                264
            ],
            "selector": [
                264
            ],
            "selectorName": [
                264
            ],
            "target": [
                264
            ],
            "transactionHash": [
                264
            ],
            "__typename": [
                264
            ]
        },
        "RolePermission_sum_order_by": {
            "addedAt": [
                346
            ],
            "__typename": [
                264
            ]
        },
        "RolePermission_var_pop_order_by": {
            "addedAt": [
                346
            ],
            "__typename": [
                264
            ]
        },
        "RolePermission_var_samp_order_by": {
            "addedAt": [
                346
            ],
            "__typename": [
                264
            ]
        },
        "RolePermission_variance_order_by": {
            "addedAt": [
                346
            ],
            "__typename": [
                264
            ]
        },
        "Role_aggregate_order_by": {
            "avg": [
                226
            ],
            "count": [
                346
            ],
            "max": [
                228
            ],
            "min": [
                229
            ],
            "stddev": [
                232
            ],
            "stddev_pop": [
                233
            ],
            "stddev_samp": [
                234
            ],
            "sum": [
                237
            ],
            "var_pop": [
                238
            ],
            "var_samp": [
                239
            ],
            "variance": [
                240
            ],
            "__typename": [
                264
            ]
        },
        "Role_avg_order_by": {
            "createdAt": [
                346
            ],
            "lastUpdatedAt": [
                346
            ],
            "__typename": [
                264
            ]
        },
        "Role_bool_exp": {
            "_and": [
                227
            ],
            "_not": [
                227
            ],
            "_or": [
                227
            ],
            "adminRole": [
                266
            ],
            "adminRoleName": [
                266
            ],
            "authorizer_id": [
                266
            ],
            "createdAt": [
                345
            ],
            "db_write_timestamp": [
                364
            ],
            "id": [
                266
            ],
            "isAdminBurned": [
                13
            ],
            "lastUpdatedAt": [
                345
            ],
            "members": [
                194
            ],
            "name": [
                266
            ],
            "permissions": [
                211
            ],
            "roleId": [
                266
            ],
            "__typename": [
                264
            ]
        },
        "Role_max_order_by": {
            "adminRole": [
                346
            ],
            "adminRoleName": [
                346
            ],
            "authorizer_id": [
                346
            ],
            "createdAt": [
                346
            ],
            "db_write_timestamp": [
                346
            ],
            "id": [
                346
            ],
            "lastUpdatedAt": [
                346
            ],
            "name": [
                346
            ],
            "roleId": [
                346
            ],
            "__typename": [
                264
            ]
        },
        "Role_min_order_by": {
            "adminRole": [
                346
            ],
            "adminRoleName": [
                346
            ],
            "authorizer_id": [
                346
            ],
            "createdAt": [
                346
            ],
            "db_write_timestamp": [
                346
            ],
            "id": [
                346
            ],
            "lastUpdatedAt": [
                346
            ],
            "name": [
                346
            ],
            "roleId": [
                346
            ],
            "__typename": [
                264
            ]
        },
        "Role_order_by": {
            "adminRole": [
                346
            ],
            "adminRoleName": [
                346
            ],
            "authorizer_id": [
                346
            ],
            "createdAt": [
                346
            ],
            "db_write_timestamp": [
                346
            ],
            "id": [
                346
            ],
            "isAdminBurned": [
                346
            ],
            "lastUpdatedAt": [
                346
            ],
            "members_aggregate": [
                192
            ],
            "name": [
                346
            ],
            "permissions_aggregate": [
                209
            ],
            "roleId": [
                346
            ],
            "__typename": [
                264
            ]
        },
        "Role_select_column": {},
        "Role_stddev_order_by": {
            "createdAt": [
                346
            ],
            "lastUpdatedAt": [
                346
            ],
            "__typename": [
                264
            ]
        },
        "Role_stddev_pop_order_by": {
            "createdAt": [
                346
            ],
            "lastUpdatedAt": [
                346
            ],
            "__typename": [
                264
            ]
        },
        "Role_stddev_samp_order_by": {
            "createdAt": [
                346
            ],
            "lastUpdatedAt": [
                346
            ],
            "__typename": [
                264
            ]
        },
        "Role_stream_cursor_input": {
            "initial_value": [
                236
            ],
            "ordering": [
                317
            ],
            "__typename": [
                264
            ]
        },
        "Role_stream_cursor_value_input": {
            "adminRole": [
                264
            ],
            "adminRoleName": [
                264
            ],
            "authorizer_id": [
                264
            ],
            "createdAt": [
                343
            ],
            "db_write_timestamp": [
                363
            ],
            "id": [
                264
            ],
            "isAdminBurned": [
                12
            ],
            "lastUpdatedAt": [
                343
            ],
            "name": [
                264
            ],
            "roleId": [
                264
            ],
            "__typename": [
                264
            ]
        },
        "Role_sum_order_by": {
            "createdAt": [
                346
            ],
            "lastUpdatedAt": [
                346
            ],
            "__typename": [
                264
            ]
        },
        "Role_var_pop_order_by": {
            "createdAt": [
                346
            ],
            "lastUpdatedAt": [
                346
            ],
            "__typename": [
                264
            ]
        },
        "Role_var_samp_order_by": {
            "createdAt": [
                346
            ],
            "lastUpdatedAt": [
                346
            ],
            "__typename": [
                264
            ]
        },
        "Role_variance_order_by": {
            "createdAt": [
                346
            ],
            "lastUpdatedAt": [
                346
            ],
            "__typename": [
                264
            ]
        },
        "Stake": {
            "amountFormatted": [
                264
            ],
            "amountRaw": [
                343
            ],
            "contract_id": [
                264
            ],
            "db_write_timestamp": [
                363
            ],
            "id": [
                264
            ],
            "lockDuration": [
                343
            ],
            "status": [
                361
            ],
            "timestamp": [
                343
            ],
            "transactionHash": [
                264
            ],
            "user_id": [
                264
            ],
            "__typename": [
                264
            ]
        },
        "Stake_aggregate_order_by": {
            "avg": [
                243
            ],
            "count": [
                346
            ],
            "max": [
                245
            ],
            "min": [
                246
            ],
            "stddev": [
                249
            ],
            "stddev_pop": [
                250
            ],
            "stddev_samp": [
                251
            ],
            "sum": [
                254
            ],
            "var_pop": [
                255
            ],
            "var_samp": [
                256
            ],
            "variance": [
                257
            ],
            "__typename": [
                264
            ]
        },
        "Stake_avg_order_by": {
            "amountRaw": [
                346
            ],
            "lockDuration": [
                346
            ],
            "timestamp": [
                346
            ],
            "__typename": [
                264
            ]
        },
        "Stake_bool_exp": {
            "_and": [
                244
            ],
            "_not": [
                244
            ],
            "_or": [
                244
            ],
            "amountFormatted": [
                266
            ],
            "amountRaw": [
                345
            ],
            "contract_id": [
                266
            ],
            "db_write_timestamp": [
                364
            ],
            "id": [
                266
            ],
            "lockDuration": [
                345
            ],
            "status": [
                362
            ],
            "timestamp": [
                345
            ],
            "transactionHash": [
                266
            ],
            "user_id": [
                266
            ],
            "__typename": [
                264
            ]
        },
        "Stake_max_order_by": {
            "amountFormatted": [
                346
            ],
            "amountRaw": [
                346
            ],
            "contract_id": [
                346
            ],
            "db_write_timestamp": [
                346
            ],
            "id": [
                346
            ],
            "lockDuration": [
                346
            ],
            "status": [
                346
            ],
            "timestamp": [
                346
            ],
            "transactionHash": [
                346
            ],
            "user_id": [
                346
            ],
            "__typename": [
                264
            ]
        },
        "Stake_min_order_by": {
            "amountFormatted": [
                346
            ],
            "amountRaw": [
                346
            ],
            "contract_id": [
                346
            ],
            "db_write_timestamp": [
                346
            ],
            "id": [
                346
            ],
            "lockDuration": [
                346
            ],
            "status": [
                346
            ],
            "timestamp": [
                346
            ],
            "transactionHash": [
                346
            ],
            "user_id": [
                346
            ],
            "__typename": [
                264
            ]
        },
        "Stake_order_by": {
            "amountFormatted": [
                346
            ],
            "amountRaw": [
                346
            ],
            "contract_id": [
                346
            ],
            "db_write_timestamp": [
                346
            ],
            "id": [
                346
            ],
            "lockDuration": [
                346
            ],
            "status": [
                346
            ],
            "timestamp": [
                346
            ],
            "transactionHash": [
                346
            ],
            "user_id": [
                346
            ],
            "__typename": [
                264
            ]
        },
        "Stake_select_column": {},
        "Stake_stddev_order_by": {
            "amountRaw": [
                346
            ],
            "lockDuration": [
                346
            ],
            "timestamp": [
                346
            ],
            "__typename": [
                264
            ]
        },
        "Stake_stddev_pop_order_by": {
            "amountRaw": [
                346
            ],
            "lockDuration": [
                346
            ],
            "timestamp": [
                346
            ],
            "__typename": [
                264
            ]
        },
        "Stake_stddev_samp_order_by": {
            "amountRaw": [
                346
            ],
            "lockDuration": [
                346
            ],
            "timestamp": [
                346
            ],
            "__typename": [
                264
            ]
        },
        "Stake_stream_cursor_input": {
            "initial_value": [
                253
            ],
            "ordering": [
                317
            ],
            "__typename": [
                264
            ]
        },
        "Stake_stream_cursor_value_input": {
            "amountFormatted": [
                264
            ],
            "amountRaw": [
                343
            ],
            "contract_id": [
                264
            ],
            "db_write_timestamp": [
                363
            ],
            "id": [
                264
            ],
            "lockDuration": [
                343
            ],
            "status": [
                361
            ],
            "timestamp": [
                343
            ],
            "transactionHash": [
                264
            ],
            "user_id": [
                264
            ],
            "__typename": [
                264
            ]
        },
        "Stake_sum_order_by": {
            "amountRaw": [
                346
            ],
            "lockDuration": [
                346
            ],
            "timestamp": [
                346
            ],
            "__typename": [
                264
            ]
        },
        "Stake_var_pop_order_by": {
            "amountRaw": [
                346
            ],
            "lockDuration": [
                346
            ],
            "timestamp": [
                346
            ],
            "__typename": [
                264
            ]
        },
        "Stake_var_samp_order_by": {
            "amountRaw": [
                346
            ],
            "lockDuration": [
                346
            ],
            "timestamp": [
                346
            ],
            "__typename": [
                264
            ]
        },
        "Stake_variance_order_by": {
            "amountRaw": [
                346
            ],
            "lockDuration": [
                346
            ],
            "timestamp": [
                346
            ],
            "__typename": [
                264
            ]
        },
        "StakingContract": {
            "createdAt": [
                343
            ],
            "db_write_timestamp": [
                363
            ],
            "id": [
                264
            ],
            "rewardToken_id": [
                264
            ],
            "stakes": [
                241,
                {
                    "distinct_on": [
                        248,
                        "[Stake_select_column!]"
                    ],
                    "limit": [
                        66
                    ],
                    "offset": [
                        66
                    ],
                    "order_by": [
                        247,
                        "[Stake_order_by!]"
                    ],
                    "where": [
                        244
                    ]
                }
            ],
            "stakingToken_id": [
                264
            ],
            "totalRewardsFormatted": [
                264
            ],
            "totalRewardsRaw": [
                343
            ],
            "totalStakedFormatted": [
                264
            ],
            "totalStakedRaw": [
                343
            ],
            "__typename": [
                264
            ]
        },
        "StakingContract_bool_exp": {
            "_and": [
                259
            ],
            "_not": [
                259
            ],
            "_or": [
                259
            ],
            "createdAt": [
                345
            ],
            "db_write_timestamp": [
                364
            ],
            "id": [
                266
            ],
            "rewardToken_id": [
                266
            ],
            "stakes": [
                244
            ],
            "stakingToken_id": [
                266
            ],
            "totalRewardsFormatted": [
                266
            ],
            "totalRewardsRaw": [
                345
            ],
            "totalStakedFormatted": [
                266
            ],
            "totalStakedRaw": [
                345
            ],
            "__typename": [
                264
            ]
        },
        "StakingContract_order_by": {
            "createdAt": [
                346
            ],
            "db_write_timestamp": [
                346
            ],
            "id": [
                346
            ],
            "rewardToken_id": [
                346
            ],
            "stakes_aggregate": [
                242
            ],
            "stakingToken_id": [
                346
            ],
            "totalRewardsFormatted": [
                346
            ],
            "totalRewardsRaw": [
                346
            ],
            "totalStakedFormatted": [
                346
            ],
            "totalStakedRaw": [
                346
            ],
            "__typename": [
                264
            ]
        },
        "StakingContract_select_column": {},
        "StakingContract_stream_cursor_input": {
            "initial_value": [
                263
            ],
            "ordering": [
                317
            ],
            "__typename": [
                264
            ]
        },
        "StakingContract_stream_cursor_value_input": {
            "createdAt": [
                343
            ],
            "db_write_timestamp": [
                363
            ],
            "id": [
                264
            ],
            "rewardToken_id": [
                264
            ],
            "stakingToken_id": [
                264
            ],
            "totalRewardsFormatted": [
                264
            ],
            "totalRewardsRaw": [
                343
            ],
            "totalStakedFormatted": [
                264
            ],
            "totalStakedRaw": [
                343
            ],
            "__typename": [
                264
            ]
        },
        "String": {},
        "String_array_comparison_exp": {
            "_contained_in": [
                264
            ],
            "_contains": [
                264
            ],
            "_eq": [
                264
            ],
            "_gt": [
                264
            ],
            "_gte": [
                264
            ],
            "_in": [
                264
            ],
            "_is_null": [
                12
            ],
            "_lt": [
                264
            ],
            "_lte": [
                264
            ],
            "_neq": [
                264
            ],
            "_nin": [
                264
            ],
            "__typename": [
                264
            ]
        },
        "String_comparison_exp": {
            "_eq": [
                264
            ],
            "_gt": [
                264
            ],
            "_gte": [
                264
            ],
            "_ilike": [
                264
            ],
            "_in": [
                264
            ],
            "_iregex": [
                264
            ],
            "_is_null": [
                12
            ],
            "_like": [
                264
            ],
            "_lt": [
                264
            ],
            "_lte": [
                264
            ],
            "_neq": [
                264
            ],
            "_nilike": [
                264
            ],
            "_nin": [
                264
            ],
            "_niregex": [
                264
            ],
            "_nlike": [
                264
            ],
            "_nregex": [
                264
            ],
            "_nsimilar": [
                264
            ],
            "_regex": [
                264
            ],
            "_similar": [
                264
            ],
            "__typename": [
                264
            ]
        },
        "Token": {
            "db_write_timestamp": [
                363
            ],
            "decimals": [
                66
            ],
            "id": [
                264
            ],
            "maxSupplyFormatted": [
                264
            ],
            "maxSupplyRaw": [
                343
            ],
            "name": [
                264
            ],
            "symbol": [
                264
            ],
            "__typename": [
                264
            ]
        },
        "Token_bool_exp": {
            "_and": [
                268
            ],
            "_not": [
                268
            ],
            "_or": [
                268
            ],
            "db_write_timestamp": [
                364
            ],
            "decimals": [
                68
            ],
            "id": [
                266
            ],
            "maxSupplyFormatted": [
                266
            ],
            "maxSupplyRaw": [
                345
            ],
            "name": [
                266
            ],
            "symbol": [
                266
            ],
            "__typename": [
                264
            ]
        },
        "Token_order_by": {
            "db_write_timestamp": [
                346
            ],
            "decimals": [
                346
            ],
            "id": [
                346
            ],
            "maxSupplyFormatted": [
                346
            ],
            "maxSupplyRaw": [
                346
            ],
            "name": [
                346
            ],
            "symbol": [
                346
            ],
            "__typename": [
                264
            ]
        },
        "Token_select_column": {},
        "Token_stream_cursor_input": {
            "initial_value": [
                272
            ],
            "ordering": [
                317
            ],
            "__typename": [
                264
            ]
        },
        "Token_stream_cursor_value_input": {
            "db_write_timestamp": [
                363
            ],
            "decimals": [
                66
            ],
            "id": [
                264
            ],
            "maxSupplyFormatted": [
                264
            ],
            "maxSupplyRaw": [
                343
            ],
            "name": [
                264
            ],
            "symbol": [
                264
            ],
            "__typename": [
                264
            ]
        },
        "Trade": {
            "db_write_timestamp": [
                363
            ],
            "feeFormatted": [
                264
            ],
            "feeRaw": [
                343
            ],
            "id": [
                264
            ],
            "market_id": [
                264
            ],
            "newPriceFormatted": [
                264
            ],
            "newPriceRaw": [
                343
            ],
            "reserveAmountFormatted": [
                264
            ],
            "reserveAmountRaw": [
                343
            ],
            "timestamp": [
                343
            ],
            "tokenAmountFormatted": [
                264
            ],
            "tokenAmountRaw": [
                343
            ],
            "tradeType": [
                367
            ],
            "transactionHash": [
                264
            ],
            "user_id": [
                264
            ],
            "__typename": [
                264
            ]
        },
        "Trade_aggregate_order_by": {
            "avg": [
                275
            ],
            "count": [
                346
            ],
            "max": [
                277
            ],
            "min": [
                278
            ],
            "stddev": [
                281
            ],
            "stddev_pop": [
                282
            ],
            "stddev_samp": [
                283
            ],
            "sum": [
                286
            ],
            "var_pop": [
                287
            ],
            "var_samp": [
                288
            ],
            "variance": [
                289
            ],
            "__typename": [
                264
            ]
        },
        "Trade_avg_order_by": {
            "feeRaw": [
                346
            ],
            "newPriceRaw": [
                346
            ],
            "reserveAmountRaw": [
                346
            ],
            "timestamp": [
                346
            ],
            "tokenAmountRaw": [
                346
            ],
            "__typename": [
                264
            ]
        },
        "Trade_bool_exp": {
            "_and": [
                276
            ],
            "_not": [
                276
            ],
            "_or": [
                276
            ],
            "db_write_timestamp": [
                364
            ],
            "feeFormatted": [
                266
            ],
            "feeRaw": [
                345
            ],
            "id": [
                266
            ],
            "market_id": [
                266
            ],
            "newPriceFormatted": [
                266
            ],
            "newPriceRaw": [
                345
            ],
            "reserveAmountFormatted": [
                266
            ],
            "reserveAmountRaw": [
                345
            ],
            "timestamp": [
                345
            ],
            "tokenAmountFormatted": [
                266
            ],
            "tokenAmountRaw": [
                345
            ],
            "tradeType": [
                368
            ],
            "transactionHash": [
                266
            ],
            "user_id": [
                266
            ],
            "__typename": [
                264
            ]
        },
        "Trade_max_order_by": {
            "db_write_timestamp": [
                346
            ],
            "feeFormatted": [
                346
            ],
            "feeRaw": [
                346
            ],
            "id": [
                346
            ],
            "market_id": [
                346
            ],
            "newPriceFormatted": [
                346
            ],
            "newPriceRaw": [
                346
            ],
            "reserveAmountFormatted": [
                346
            ],
            "reserveAmountRaw": [
                346
            ],
            "timestamp": [
                346
            ],
            "tokenAmountFormatted": [
                346
            ],
            "tokenAmountRaw": [
                346
            ],
            "tradeType": [
                346
            ],
            "transactionHash": [
                346
            ],
            "user_id": [
                346
            ],
            "__typename": [
                264
            ]
        },
        "Trade_min_order_by": {
            "db_write_timestamp": [
                346
            ],
            "feeFormatted": [
                346
            ],
            "feeRaw": [
                346
            ],
            "id": [
                346
            ],
            "market_id": [
                346
            ],
            "newPriceFormatted": [
                346
            ],
            "newPriceRaw": [
                346
            ],
            "reserveAmountFormatted": [
                346
            ],
            "reserveAmountRaw": [
                346
            ],
            "timestamp": [
                346
            ],
            "tokenAmountFormatted": [
                346
            ],
            "tokenAmountRaw": [
                346
            ],
            "tradeType": [
                346
            ],
            "transactionHash": [
                346
            ],
            "user_id": [
                346
            ],
            "__typename": [
                264
            ]
        },
        "Trade_order_by": {
            "db_write_timestamp": [
                346
            ],
            "feeFormatted": [
                346
            ],
            "feeRaw": [
                346
            ],
            "id": [
                346
            ],
            "market_id": [
                346
            ],
            "newPriceFormatted": [
                346
            ],
            "newPriceRaw": [
                346
            ],
            "reserveAmountFormatted": [
                346
            ],
            "reserveAmountRaw": [
                346
            ],
            "timestamp": [
                346
            ],
            "tokenAmountFormatted": [
                346
            ],
            "tokenAmountRaw": [
                346
            ],
            "tradeType": [
                346
            ],
            "transactionHash": [
                346
            ],
            "user_id": [
                346
            ],
            "__typename": [
                264
            ]
        },
        "Trade_select_column": {},
        "Trade_stddev_order_by": {
            "feeRaw": [
                346
            ],
            "newPriceRaw": [
                346
            ],
            "reserveAmountRaw": [
                346
            ],
            "timestamp": [
                346
            ],
            "tokenAmountRaw": [
                346
            ],
            "__typename": [
                264
            ]
        },
        "Trade_stddev_pop_order_by": {
            "feeRaw": [
                346
            ],
            "newPriceRaw": [
                346
            ],
            "reserveAmountRaw": [
                346
            ],
            "timestamp": [
                346
            ],
            "tokenAmountRaw": [
                346
            ],
            "__typename": [
                264
            ]
        },
        "Trade_stddev_samp_order_by": {
            "feeRaw": [
                346
            ],
            "newPriceRaw": [
                346
            ],
            "reserveAmountRaw": [
                346
            ],
            "timestamp": [
                346
            ],
            "tokenAmountRaw": [
                346
            ],
            "__typename": [
                264
            ]
        },
        "Trade_stream_cursor_input": {
            "initial_value": [
                285
            ],
            "ordering": [
                317
            ],
            "__typename": [
                264
            ]
        },
        "Trade_stream_cursor_value_input": {
            "db_write_timestamp": [
                363
            ],
            "feeFormatted": [
                264
            ],
            "feeRaw": [
                343
            ],
            "id": [
                264
            ],
            "market_id": [
                264
            ],
            "newPriceFormatted": [
                264
            ],
            "newPriceRaw": [
                343
            ],
            "reserveAmountFormatted": [
                264
            ],
            "reserveAmountRaw": [
                343
            ],
            "timestamp": [
                343
            ],
            "tokenAmountFormatted": [
                264
            ],
            "tokenAmountRaw": [
                343
            ],
            "tradeType": [
                367
            ],
            "transactionHash": [
                264
            ],
            "user_id": [
                264
            ],
            "__typename": [
                264
            ]
        },
        "Trade_sum_order_by": {
            "feeRaw": [
                346
            ],
            "newPriceRaw": [
                346
            ],
            "reserveAmountRaw": [
                346
            ],
            "timestamp": [
                346
            ],
            "tokenAmountRaw": [
                346
            ],
            "__typename": [
                264
            ]
        },
        "Trade_var_pop_order_by": {
            "feeRaw": [
                346
            ],
            "newPriceRaw": [
                346
            ],
            "reserveAmountRaw": [
                346
            ],
            "timestamp": [
                346
            ],
            "tokenAmountRaw": [
                346
            ],
            "__typename": [
                264
            ]
        },
        "Trade_var_samp_order_by": {
            "feeRaw": [
                346
            ],
            "newPriceRaw": [
                346
            ],
            "reserveAmountRaw": [
                346
            ],
            "timestamp": [
                346
            ],
            "tokenAmountRaw": [
                346
            ],
            "__typename": [
                264
            ]
        },
        "Trade_variance_order_by": {
            "feeRaw": [
                346
            ],
            "newPriceRaw": [
                346
            ],
            "reserveAmountRaw": [
                346
            ],
            "timestamp": [
                346
            ],
            "tokenAmountRaw": [
                346
            ],
            "__typename": [
                264
            ]
        },
        "UserMarketPosition": {
            "claimableRewardsFormatted": [
                264
            ],
            "claimableRewardsRaw": [
                343
            ],
            "db_write_timestamp": [
                363
            ],
            "id": [
                264
            ],
            "lastUpdatedAt": [
                343
            ],
            "lockedCollateralFormatted": [
                264
            ],
            "lockedCollateralRaw": [
                343
            ],
            "market_id": [
                264
            ],
            "netFTokenChangeFormatted": [
                264
            ],
            "netFTokenChangeRaw": [
                343
            ],
            "presaleDepositFormatted": [
                264
            ],
            "presaleDepositRaw": [
                343
            ],
            "presaleLeverage": [
                343
            ],
            "stakedAmountFormatted": [
                264
            ],
            "stakedAmountRaw": [
                343
            ],
            "totalDebtFormatted": [
                264
            ],
            "totalDebtRaw": [
                343
            ],
            "user_id": [
                264
            ],
            "__typename": [
                264
            ]
        },
        "UserMarketPosition_aggregate_order_by": {
            "avg": [
                292
            ],
            "count": [
                346
            ],
            "max": [
                294
            ],
            "min": [
                295
            ],
            "stddev": [
                298
            ],
            "stddev_pop": [
                299
            ],
            "stddev_samp": [
                300
            ],
            "sum": [
                303
            ],
            "var_pop": [
                304
            ],
            "var_samp": [
                305
            ],
            "variance": [
                306
            ],
            "__typename": [
                264
            ]
        },
        "UserMarketPosition_avg_order_by": {
            "claimableRewardsRaw": [
                346
            ],
            "lastUpdatedAt": [
                346
            ],
            "lockedCollateralRaw": [
                346
            ],
            "netFTokenChangeRaw": [
                346
            ],
            "presaleDepositRaw": [
                346
            ],
            "presaleLeverage": [
                346
            ],
            "stakedAmountRaw": [
                346
            ],
            "totalDebtRaw": [
                346
            ],
            "__typename": [
                264
            ]
        },
        "UserMarketPosition_bool_exp": {
            "_and": [
                293
            ],
            "_not": [
                293
            ],
            "_or": [
                293
            ],
            "claimableRewardsFormatted": [
                266
            ],
            "claimableRewardsRaw": [
                345
            ],
            "db_write_timestamp": [
                364
            ],
            "id": [
                266
            ],
            "lastUpdatedAt": [
                345
            ],
            "lockedCollateralFormatted": [
                266
            ],
            "lockedCollateralRaw": [
                345
            ],
            "market_id": [
                266
            ],
            "netFTokenChangeFormatted": [
                266
            ],
            "netFTokenChangeRaw": [
                345
            ],
            "presaleDepositFormatted": [
                266
            ],
            "presaleDepositRaw": [
                345
            ],
            "presaleLeverage": [
                345
            ],
            "stakedAmountFormatted": [
                266
            ],
            "stakedAmountRaw": [
                345
            ],
            "totalDebtFormatted": [
                266
            ],
            "totalDebtRaw": [
                345
            ],
            "user_id": [
                266
            ],
            "__typename": [
                264
            ]
        },
        "UserMarketPosition_max_order_by": {
            "claimableRewardsFormatted": [
                346
            ],
            "claimableRewardsRaw": [
                346
            ],
            "db_write_timestamp": [
                346
            ],
            "id": [
                346
            ],
            "lastUpdatedAt": [
                346
            ],
            "lockedCollateralFormatted": [
                346
            ],
            "lockedCollateralRaw": [
                346
            ],
            "market_id": [
                346
            ],
            "netFTokenChangeFormatted": [
                346
            ],
            "netFTokenChangeRaw": [
                346
            ],
            "presaleDepositFormatted": [
                346
            ],
            "presaleDepositRaw": [
                346
            ],
            "presaleLeverage": [
                346
            ],
            "stakedAmountFormatted": [
                346
            ],
            "stakedAmountRaw": [
                346
            ],
            "totalDebtFormatted": [
                346
            ],
            "totalDebtRaw": [
                346
            ],
            "user_id": [
                346
            ],
            "__typename": [
                264
            ]
        },
        "UserMarketPosition_min_order_by": {
            "claimableRewardsFormatted": [
                346
            ],
            "claimableRewardsRaw": [
                346
            ],
            "db_write_timestamp": [
                346
            ],
            "id": [
                346
            ],
            "lastUpdatedAt": [
                346
            ],
            "lockedCollateralFormatted": [
                346
            ],
            "lockedCollateralRaw": [
                346
            ],
            "market_id": [
                346
            ],
            "netFTokenChangeFormatted": [
                346
            ],
            "netFTokenChangeRaw": [
                346
            ],
            "presaleDepositFormatted": [
                346
            ],
            "presaleDepositRaw": [
                346
            ],
            "presaleLeverage": [
                346
            ],
            "stakedAmountFormatted": [
                346
            ],
            "stakedAmountRaw": [
                346
            ],
            "totalDebtFormatted": [
                346
            ],
            "totalDebtRaw": [
                346
            ],
            "user_id": [
                346
            ],
            "__typename": [
                264
            ]
        },
        "UserMarketPosition_order_by": {
            "claimableRewardsFormatted": [
                346
            ],
            "claimableRewardsRaw": [
                346
            ],
            "db_write_timestamp": [
                346
            ],
            "id": [
                346
            ],
            "lastUpdatedAt": [
                346
            ],
            "lockedCollateralFormatted": [
                346
            ],
            "lockedCollateralRaw": [
                346
            ],
            "market_id": [
                346
            ],
            "netFTokenChangeFormatted": [
                346
            ],
            "netFTokenChangeRaw": [
                346
            ],
            "presaleDepositFormatted": [
                346
            ],
            "presaleDepositRaw": [
                346
            ],
            "presaleLeverage": [
                346
            ],
            "stakedAmountFormatted": [
                346
            ],
            "stakedAmountRaw": [
                346
            ],
            "totalDebtFormatted": [
                346
            ],
            "totalDebtRaw": [
                346
            ],
            "user_id": [
                346
            ],
            "__typename": [
                264
            ]
        },
        "UserMarketPosition_select_column": {},
        "UserMarketPosition_stddev_order_by": {
            "claimableRewardsRaw": [
                346
            ],
            "lastUpdatedAt": [
                346
            ],
            "lockedCollateralRaw": [
                346
            ],
            "netFTokenChangeRaw": [
                346
            ],
            "presaleDepositRaw": [
                346
            ],
            "presaleLeverage": [
                346
            ],
            "stakedAmountRaw": [
                346
            ],
            "totalDebtRaw": [
                346
            ],
            "__typename": [
                264
            ]
        },
        "UserMarketPosition_stddev_pop_order_by": {
            "claimableRewardsRaw": [
                346
            ],
            "lastUpdatedAt": [
                346
            ],
            "lockedCollateralRaw": [
                346
            ],
            "netFTokenChangeRaw": [
                346
            ],
            "presaleDepositRaw": [
                346
            ],
            "presaleLeverage": [
                346
            ],
            "stakedAmountRaw": [
                346
            ],
            "totalDebtRaw": [
                346
            ],
            "__typename": [
                264
            ]
        },
        "UserMarketPosition_stddev_samp_order_by": {
            "claimableRewardsRaw": [
                346
            ],
            "lastUpdatedAt": [
                346
            ],
            "lockedCollateralRaw": [
                346
            ],
            "netFTokenChangeRaw": [
                346
            ],
            "presaleDepositRaw": [
                346
            ],
            "presaleLeverage": [
                346
            ],
            "stakedAmountRaw": [
                346
            ],
            "totalDebtRaw": [
                346
            ],
            "__typename": [
                264
            ]
        },
        "UserMarketPosition_stream_cursor_input": {
            "initial_value": [
                302
            ],
            "ordering": [
                317
            ],
            "__typename": [
                264
            ]
        },
        "UserMarketPosition_stream_cursor_value_input": {
            "claimableRewardsFormatted": [
                264
            ],
            "claimableRewardsRaw": [
                343
            ],
            "db_write_timestamp": [
                363
            ],
            "id": [
                264
            ],
            "lastUpdatedAt": [
                343
            ],
            "lockedCollateralFormatted": [
                264
            ],
            "lockedCollateralRaw": [
                343
            ],
            "market_id": [
                264
            ],
            "netFTokenChangeFormatted": [
                264
            ],
            "netFTokenChangeRaw": [
                343
            ],
            "presaleDepositFormatted": [
                264
            ],
            "presaleDepositRaw": [
                343
            ],
            "presaleLeverage": [
                343
            ],
            "stakedAmountFormatted": [
                264
            ],
            "stakedAmountRaw": [
                343
            ],
            "totalDebtFormatted": [
                264
            ],
            "totalDebtRaw": [
                343
            ],
            "user_id": [
                264
            ],
            "__typename": [
                264
            ]
        },
        "UserMarketPosition_sum_order_by": {
            "claimableRewardsRaw": [
                346
            ],
            "lastUpdatedAt": [
                346
            ],
            "lockedCollateralRaw": [
                346
            ],
            "netFTokenChangeRaw": [
                346
            ],
            "presaleDepositRaw": [
                346
            ],
            "presaleLeverage": [
                346
            ],
            "stakedAmountRaw": [
                346
            ],
            "totalDebtRaw": [
                346
            ],
            "__typename": [
                264
            ]
        },
        "UserMarketPosition_var_pop_order_by": {
            "claimableRewardsRaw": [
                346
            ],
            "lastUpdatedAt": [
                346
            ],
            "lockedCollateralRaw": [
                346
            ],
            "netFTokenChangeRaw": [
                346
            ],
            "presaleDepositRaw": [
                346
            ],
            "presaleLeverage": [
                346
            ],
            "stakedAmountRaw": [
                346
            ],
            "totalDebtRaw": [
                346
            ],
            "__typename": [
                264
            ]
        },
        "UserMarketPosition_var_samp_order_by": {
            "claimableRewardsRaw": [
                346
            ],
            "lastUpdatedAt": [
                346
            ],
            "lockedCollateralRaw": [
                346
            ],
            "netFTokenChangeRaw": [
                346
            ],
            "presaleDepositRaw": [
                346
            ],
            "presaleLeverage": [
                346
            ],
            "stakedAmountRaw": [
                346
            ],
            "totalDebtRaw": [
                346
            ],
            "__typename": [
                264
            ]
        },
        "UserMarketPosition_variance_order_by": {
            "claimableRewardsRaw": [
                346
            ],
            "lastUpdatedAt": [
                346
            ],
            "lockedCollateralRaw": [
                346
            ],
            "netFTokenChangeRaw": [
                346
            ],
            "presaleDepositRaw": [
                346
            ],
            "presaleLeverage": [
                346
            ],
            "stakedAmountRaw": [
                346
            ],
            "totalDebtRaw": [
                346
            ],
            "__typename": [
                264
            ]
        },
        "candleperiod": {},
        "candleperiod_comparison_exp": {
            "_eq": [
                307
            ],
            "_gt": [
                307
            ],
            "_gte": [
                307
            ],
            "_in": [
                307
            ],
            "_is_null": [
                12
            ],
            "_lt": [
                307
            ],
            "_lte": [
                307
            ],
            "_neq": [
                307
            ],
            "_nin": [
                307
            ],
            "__typename": [
                264
            ]
        },
        "chain_metadata": {
            "block_height": [
                66
            ],
            "chain_id": [
                66
            ],
            "end_block": [
                66
            ],
            "first_event_block_number": [
                66
            ],
            "is_hyper_sync": [
                12
            ],
            "latest_fetched_block_number": [
                66
            ],
            "latest_processed_block": [
                66
            ],
            "num_batches_fetched": [
                66
            ],
            "num_events_processed": [
                66
            ],
            "start_block": [
                66
            ],
            "timestamp_caught_up_to_head_or_endblock": [
                365
            ],
            "__typename": [
                264
            ]
        },
        "chain_metadata_bool_exp": {
            "_and": [
                310
            ],
            "_not": [
                310
            ],
            "_or": [
                310
            ],
            "block_height": [
                68
            ],
            "chain_id": [
                68
            ],
            "end_block": [
                68
            ],
            "first_event_block_number": [
                68
            ],
            "is_hyper_sync": [
                13
            ],
            "latest_fetched_block_number": [
                68
            ],
            "latest_processed_block": [
                68
            ],
            "num_batches_fetched": [
                68
            ],
            "num_events_processed": [
                68
            ],
            "start_block": [
                68
            ],
            "timestamp_caught_up_to_head_or_endblock": [
                366
            ],
            "__typename": [
                264
            ]
        },
        "chain_metadata_order_by": {
            "block_height": [
                346
            ],
            "chain_id": [
                346
            ],
            "end_block": [
                346
            ],
            "first_event_block_number": [
                346
            ],
            "is_hyper_sync": [
                346
            ],
            "latest_fetched_block_number": [
                346
            ],
            "latest_processed_block": [
                346
            ],
            "num_batches_fetched": [
                346
            ],
            "num_events_processed": [
                346
            ],
            "start_block": [
                346
            ],
            "timestamp_caught_up_to_head_or_endblock": [
                346
            ],
            "__typename": [
                264
            ]
        },
        "chain_metadata_select_column": {},
        "chain_metadata_stream_cursor_input": {
            "initial_value": [
                314
            ],
            "ordering": [
                317
            ],
            "__typename": [
                264
            ]
        },
        "chain_metadata_stream_cursor_value_input": {
            "block_height": [
                66
            ],
            "chain_id": [
                66
            ],
            "end_block": [
                66
            ],
            "first_event_block_number": [
                66
            ],
            "is_hyper_sync": [
                12
            ],
            "latest_fetched_block_number": [
                66
            ],
            "latest_processed_block": [
                66
            ],
            "num_batches_fetched": [
                66
            ],
            "num_events_processed": [
                66
            ],
            "start_block": [
                66
            ],
            "timestamp_caught_up_to_head_or_endblock": [
                365
            ],
            "__typename": [
                264
            ]
        },
        "contract_type": {},
        "contract_type_comparison_exp": {
            "_eq": [
                315
            ],
            "_gt": [
                315
            ],
            "_gte": [
                315
            ],
            "_in": [
                315
            ],
            "_is_null": [
                12
            ],
            "_lt": [
                315
            ],
            "_lte": [
                315
            ],
            "_neq": [
                315
            ],
            "_nin": [
                315
            ],
            "__typename": [
                264
            ]
        },
        "cursor_ordering": {},
        "dynamic_contract_registry": {
            "chain_id": [
                66
            ],
            "contract_address": [
                264
            ],
            "contract_type": [
                315
            ],
            "id": [
                264
            ],
            "registering_event_block_number": [
                66
            ],
            "registering_event_block_timestamp": [
                66
            ],
            "registering_event_contract_name": [
                264
            ],
            "registering_event_log_index": [
                66
            ],
            "registering_event_name": [
                264
            ],
            "registering_event_src_address": [
                264
            ],
            "__typename": [
                264
            ]
        },
        "dynamic_contract_registry_bool_exp": {
            "_and": [
                319
            ],
            "_not": [
                319
            ],
            "_or": [
                319
            ],
            "chain_id": [
                68
            ],
            "contract_address": [
                266
            ],
            "contract_type": [
                316
            ],
            "id": [
                266
            ],
            "registering_event_block_number": [
                68
            ],
            "registering_event_block_timestamp": [
                68
            ],
            "registering_event_contract_name": [
                266
            ],
            "registering_event_log_index": [
                68
            ],
            "registering_event_name": [
                266
            ],
            "registering_event_src_address": [
                266
            ],
            "__typename": [
                264
            ]
        },
        "dynamic_contract_registry_order_by": {
            "chain_id": [
                346
            ],
            "contract_address": [
                346
            ],
            "contract_type": [
                346
            ],
            "id": [
                346
            ],
            "registering_event_block_number": [
                346
            ],
            "registering_event_block_timestamp": [
                346
            ],
            "registering_event_contract_name": [
                346
            ],
            "registering_event_log_index": [
                346
            ],
            "registering_event_name": [
                346
            ],
            "registering_event_src_address": [
                346
            ],
            "__typename": [
                264
            ]
        },
        "dynamic_contract_registry_select_column": {},
        "dynamic_contract_registry_stream_cursor_input": {
            "initial_value": [
                323
            ],
            "ordering": [
                317
            ],
            "__typename": [
                264
            ]
        },
        "dynamic_contract_registry_stream_cursor_value_input": {
            "chain_id": [
                66
            ],
            "contract_address": [
                264
            ],
            "contract_type": [
                315
            ],
            "id": [
                264
            ],
            "registering_event_block_number": [
                66
            ],
            "registering_event_block_timestamp": [
                66
            ],
            "registering_event_contract_name": [
                264
            ],
            "registering_event_log_index": [
                66
            ],
            "registering_event_name": [
                264
            ],
            "registering_event_src_address": [
                264
            ],
            "__typename": [
                264
            ]
        },
        "end_of_block_range_scanned_data": {
            "block_hash": [
                264
            ],
            "block_number": [
                66
            ],
            "chain_id": [
                66
            ],
            "__typename": [
                264
            ]
        },
        "end_of_block_range_scanned_data_bool_exp": {
            "_and": [
                325
            ],
            "_not": [
                325
            ],
            "_or": [
                325
            ],
            "block_hash": [
                266
            ],
            "block_number": [
                68
            ],
            "chain_id": [
                68
            ],
            "__typename": [
                264
            ]
        },
        "end_of_block_range_scanned_data_order_by": {
            "block_hash": [
                346
            ],
            "block_number": [
                346
            ],
            "chain_id": [
                346
            ],
            "__typename": [
                264
            ]
        },
        "end_of_block_range_scanned_data_select_column": {},
        "end_of_block_range_scanned_data_stream_cursor_input": {
            "initial_value": [
                329
            ],
            "ordering": [
                317
            ],
            "__typename": [
                264
            ]
        },
        "end_of_block_range_scanned_data_stream_cursor_value_input": {
            "block_hash": [
                264
            ],
            "block_number": [
                66
            ],
            "chain_id": [
                66
            ],
            "__typename": [
                264
            ]
        },
        "event_sync_state": {
            "block_number": [
                66
            ],
            "block_timestamp": [
                66
            ],
            "chain_id": [
                66
            ],
            "is_pre_registering_dynamic_contracts": [
                12
            ],
            "log_index": [
                66
            ],
            "__typename": [
                264
            ]
        },
        "event_sync_state_bool_exp": {
            "_and": [
                331
            ],
            "_not": [
                331
            ],
            "_or": [
                331
            ],
            "block_number": [
                68
            ],
            "block_timestamp": [
                68
            ],
            "chain_id": [
                68
            ],
            "is_pre_registering_dynamic_contracts": [
                13
            ],
            "log_index": [
                68
            ],
            "__typename": [
                264
            ]
        },
        "event_sync_state_order_by": {
            "block_number": [
                346
            ],
            "block_timestamp": [
                346
            ],
            "chain_id": [
                346
            ],
            "is_pre_registering_dynamic_contracts": [
                346
            ],
            "log_index": [
                346
            ],
            "__typename": [
                264
            ]
        },
        "event_sync_state_select_column": {},
        "event_sync_state_stream_cursor_input": {
            "initial_value": [
                335
            ],
            "ordering": [
                317
            ],
            "__typename": [
                264
            ]
        },
        "event_sync_state_stream_cursor_value_input": {
            "block_number": [
                66
            ],
            "block_timestamp": [
                66
            ],
            "chain_id": [
                66
            ],
            "is_pre_registering_dynamic_contracts": [
                12
            ],
            "log_index": [
                66
            ],
            "__typename": [
                264
            ]
        },
        "jsonb": {},
        "jsonb_cast_exp": {
            "String": [
                266
            ],
            "__typename": [
                264
            ]
        },
        "jsonb_comparison_exp": {
            "_cast": [
                337
            ],
            "_contained_in": [
                336
            ],
            "_contains": [
                336
            ],
            "_eq": [
                336
            ],
            "_gt": [
                336
            ],
            "_gte": [
                336
            ],
            "_has_key": [
                264
            ],
            "_has_keys_all": [
                264
            ],
            "_has_keys_any": [
                264
            ],
            "_in": [
                336
            ],
            "_is_null": [
                12
            ],
            "_lt": [
                336
            ],
            "_lte": [
                336
            ],
            "_neq": [
                336
            ],
            "_nin": [
                336
            ],
            "__typename": [
                264
            ]
        },
        "loanstatus": {},
        "loanstatus_comparison_exp": {
            "_eq": [
                339
            ],
            "_gt": [
                339
            ],
            "_gte": [
                339
            ],
            "_in": [
                339
            ],
            "_is_null": [
                12
            ],
            "_lt": [
                339
            ],
            "_lte": [
                339
            ],
            "_neq": [
                339
            ],
            "_nin": [
                339
            ],
            "__typename": [
                264
            ]
        },
        "marketstatus": {},
        "marketstatus_comparison_exp": {
            "_eq": [
                341
            ],
            "_gt": [
                341
            ],
            "_gte": [
                341
            ],
            "_in": [
                341
            ],
            "_is_null": [
                12
            ],
            "_lt": [
                341
            ],
            "_lte": [
                341
            ],
            "_neq": [
                341
            ],
            "_nin": [
                341
            ],
            "__typename": [
                264
            ]
        },
        "numeric": {},
        "numeric_array_comparison_exp": {
            "_contained_in": [
                343
            ],
            "_contains": [
                343
            ],
            "_eq": [
                343
            ],
            "_gt": [
                343
            ],
            "_gte": [
                343
            ],
            "_in": [
                343
            ],
            "_is_null": [
                12
            ],
            "_lt": [
                343
            ],
            "_lte": [
                343
            ],
            "_neq": [
                343
            ],
            "_nin": [
                343
            ],
            "__typename": [
                264
            ]
        },
        "numeric_comparison_exp": {
            "_eq": [
                343
            ],
            "_gt": [
                343
            ],
            "_gte": [
                343
            ],
            "_in": [
                343
            ],
            "_is_null": [
                12
            ],
            "_lt": [
                343
            ],
            "_lte": [
                343
            ],
            "_neq": [
                343
            ],
            "_nin": [
                343
            ],
            "__typename": [
                264
            ]
        },
        "order_by": {},
        "persisted_state": {
            "abi_files_hash": [
                264
            ],
            "config_hash": [
                264
            ],
            "envio_version": [
                264
            ],
            "handler_files_hash": [
                264
            ],
            "id": [
                66
            ],
            "schema_hash": [
                264
            ],
            "__typename": [
                264
            ]
        },
        "persisted_state_bool_exp": {
            "_and": [
                348
            ],
            "_not": [
                348
            ],
            "_or": [
                348
            ],
            "abi_files_hash": [
                266
            ],
            "config_hash": [
                266
            ],
            "envio_version": [
                266
            ],
            "handler_files_hash": [
                266
            ],
            "id": [
                68
            ],
            "schema_hash": [
                266
            ],
            "__typename": [
                264
            ]
        },
        "persisted_state_order_by": {
            "abi_files_hash": [
                346
            ],
            "config_hash": [
                346
            ],
            "envio_version": [
                346
            ],
            "handler_files_hash": [
                346
            ],
            "id": [
                346
            ],
            "schema_hash": [
                346
            ],
            "__typename": [
                264
            ]
        },
        "persisted_state_select_column": {},
        "persisted_state_stream_cursor_input": {
            "initial_value": [
                352
            ],
            "ordering": [
                317
            ],
            "__typename": [
                264
            ]
        },
        "persisted_state_stream_cursor_value_input": {
            "abi_files_hash": [
                264
            ],
            "config_hash": [
                264
            ],
            "envio_version": [
                264
            ],
            "handler_files_hash": [
                264
            ],
            "id": [
                66
            ],
            "schema_hash": [
                264
            ],
            "__typename": [
                264
            ]
        },
        "presaleclaimtype": {},
        "presaleclaimtype_comparison_exp": {
            "_eq": [
                353
            ],
            "_gt": [
                353
            ],
            "_gte": [
                353
            ],
            "_in": [
                353
            ],
            "_is_null": [
                12
            ],
            "_lt": [
                353
            ],
            "_lte": [
                353
            ],
            "_neq": [
                353
            ],
            "_nin": [
                353
            ],
            "__typename": [
                264
            ]
        },
        "raw_events": {
            "block_fields": [
                336,
                {
                    "path": [
                        264
                    ]
                }
            ],
            "block_hash": [
                264
            ],
            "block_number": [
                66
            ],
            "block_timestamp": [
                66
            ],
            "chain_id": [
                66
            ],
            "contract_name": [
                264
            ],
            "db_write_timestamp": [
                363
            ],
            "event_id": [
                343
            ],
            "event_name": [
                264
            ],
            "log_index": [
                66
            ],
            "params": [
                336,
                {
                    "path": [
                        264
                    ]
                }
            ],
            "serial": [
                66
            ],
            "src_address": [
                264
            ],
            "transaction_fields": [
                336,
                {
                    "path": [
                        264
                    ]
                }
            ],
            "__typename": [
                264
            ]
        },
        "raw_events_bool_exp": {
            "_and": [
                356
            ],
            "_not": [
                356
            ],
            "_or": [
                356
            ],
            "block_fields": [
                338
            ],
            "block_hash": [
                266
            ],
            "block_number": [
                68
            ],
            "block_timestamp": [
                68
            ],
            "chain_id": [
                68
            ],
            "contract_name": [
                266
            ],
            "db_write_timestamp": [
                364
            ],
            "event_id": [
                345
            ],
            "event_name": [
                266
            ],
            "log_index": [
                68
            ],
            "params": [
                338
            ],
            "serial": [
                68
            ],
            "src_address": [
                266
            ],
            "transaction_fields": [
                338
            ],
            "__typename": [
                264
            ]
        },
        "raw_events_order_by": {
            "block_fields": [
                346
            ],
            "block_hash": [
                346
            ],
            "block_number": [
                346
            ],
            "block_timestamp": [
                346
            ],
            "chain_id": [
                346
            ],
            "contract_name": [
                346
            ],
            "db_write_timestamp": [
                346
            ],
            "event_id": [
                346
            ],
            "event_name": [
                346
            ],
            "log_index": [
                346
            ],
            "params": [
                346
            ],
            "serial": [
                346
            ],
            "src_address": [
                346
            ],
            "transaction_fields": [
                346
            ],
            "__typename": [
                264
            ]
        },
        "raw_events_select_column": {},
        "raw_events_stream_cursor_input": {
            "initial_value": [
                360
            ],
            "ordering": [
                317
            ],
            "__typename": [
                264
            ]
        },
        "raw_events_stream_cursor_value_input": {
            "block_fields": [
                336
            ],
            "block_hash": [
                264
            ],
            "block_number": [
                66
            ],
            "block_timestamp": [
                66
            ],
            "chain_id": [
                66
            ],
            "contract_name": [
                264
            ],
            "db_write_timestamp": [
                363
            ],
            "event_id": [
                343
            ],
            "event_name": [
                264
            ],
            "log_index": [
                66
            ],
            "params": [
                336
            ],
            "serial": [
                66
            ],
            "src_address": [
                264
            ],
            "transaction_fields": [
                336
            ],
            "__typename": [
                264
            ]
        },
        "stakestatus": {},
        "stakestatus_comparison_exp": {
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
                264
            ]
        },
        "timestamp": {},
        "timestamp_comparison_exp": {
            "_eq": [
                363
            ],
            "_gt": [
                363
            ],
            "_gte": [
                363
            ],
            "_in": [
                363
            ],
            "_is_null": [
                12
            ],
            "_lt": [
                363
            ],
            "_lte": [
                363
            ],
            "_neq": [
                363
            ],
            "_nin": [
                363
            ],
            "__typename": [
                264
            ]
        },
        "timestamptz": {},
        "timestamptz_comparison_exp": {
            "_eq": [
                365
            ],
            "_gt": [
                365
            ],
            "_gte": [
                365
            ],
            "_in": [
                365
            ],
            "_is_null": [
                12
            ],
            "_lt": [
                365
            ],
            "_lte": [
                365
            ],
            "_neq": [
                365
            ],
            "_nin": [
                365
            ],
            "__typename": [
                264
            ]
        },
        "tradetype": {},
        "tradetype_comparison_exp": {
            "_eq": [
                367
            ],
            "_gt": [
                367
            ],
            "_gte": [
                367
            ],
            "_in": [
                367
            ],
            "_is_null": [
                12
            ],
            "_lt": [
                367
            ],
            "_lte": [
                367
            ],
            "_neq": [
                367
            ],
            "_nin": [
                367
            ],
            "__typename": [
                264
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
                        66
                    ],
                    "offset": [
                        66
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
                        264,
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
                        66
                    ],
                    "offset": [
                        66
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
                        264,
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
                        66
                    ],
                    "offset": [
                        66
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
                        264,
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
                        66
                    ],
                    "offset": [
                        66
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
                        264,
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
                        66
                    ],
                    "offset": [
                        66
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
                        264,
                        "String!"
                    ]
                }
            ],
            "GlobalRegistry": [
                54,
                {
                    "distinct_on": [
                        57,
                        "[GlobalRegistry_select_column!]"
                    ],
                    "limit": [
                        66
                    ],
                    "offset": [
                        66
                    ],
                    "order_by": [
                        56,
                        "[GlobalRegistry_order_by!]"
                    ],
                    "where": [
                        55
                    ]
                }
            ],
            "GlobalRegistry_by_pk": [
                54,
                {
                    "id": [
                        264,
                        "String!"
                    ]
                }
            ],
            "GlobalStats": [
                60,
                {
                    "distinct_on": [
                        63,
                        "[GlobalStats_select_column!]"
                    ],
                    "limit": [
                        66
                    ],
                    "offset": [
                        66
                    ],
                    "order_by": [
                        62,
                        "[GlobalStats_order_by!]"
                    ],
                    "where": [
                        61
                    ]
                }
            ],
            "GlobalStats_by_pk": [
                60,
                {
                    "id": [
                        264,
                        "String!"
                    ]
                }
            ],
            "Loan": [
                69,
                {
                    "distinct_on": [
                        93,
                        "[Loan_select_column!]"
                    ],
                    "limit": [
                        66
                    ],
                    "offset": [
                        66
                    ],
                    "order_by": [
                        92,
                        "[Loan_order_by!]"
                    ],
                    "where": [
                        89
                    ]
                }
            ],
            "LoanStatusHistory": [
                70,
                {
                    "distinct_on": [
                        77,
                        "[LoanStatusHistory_select_column!]"
                    ],
                    "limit": [
                        66
                    ],
                    "offset": [
                        66
                    ],
                    "order_by": [
                        76,
                        "[LoanStatusHistory_order_by!]"
                    ],
                    "where": [
                        73
                    ]
                }
            ],
            "LoanStatusHistory_by_pk": [
                70,
                {
                    "id": [
                        264,
                        "String!"
                    ]
                }
            ],
            "Loan_by_pk": [
                69,
                {
                    "id": [
                        264,
                        "String!"
                    ]
                }
            ],
            "Market": [
                103,
                {
                    "distinct_on": [
                        122,
                        "[Market_select_column!]"
                    ],
                    "limit": [
                        66
                    ],
                    "offset": [
                        66
                    ],
                    "order_by": [
                        121,
                        "[Market_order_by!]"
                    ],
                    "where": [
                        118
                    ]
                }
            ],
            "MarketRollingStats": [
                104,
                {
                    "distinct_on": [
                        107,
                        "[MarketRollingStats_select_column!]"
                    ],
                    "limit": [
                        66
                    ],
                    "offset": [
                        66
                    ],
                    "order_by": [
                        106,
                        "[MarketRollingStats_order_by!]"
                    ],
                    "where": [
                        105
                    ]
                }
            ],
            "MarketRollingStats_by_pk": [
                104,
                {
                    "id": [
                        264,
                        "String!"
                    ]
                }
            ],
            "MarketSnapshot": [
                110,
                {
                    "distinct_on": [
                        113,
                        "[MarketSnapshot_select_column!]"
                    ],
                    "limit": [
                        66
                    ],
                    "offset": [
                        66
                    ],
                    "order_by": [
                        112,
                        "[MarketSnapshot_order_by!]"
                    ],
                    "where": [
                        111
                    ]
                }
            ],
            "MarketSnapshot_by_pk": [
                110,
                {
                    "id": [
                        264,
                        "String!"
                    ]
                }
            ],
            "Market_by_pk": [
                103,
                {
                    "id": [
                        264,
                        "String!"
                    ]
                }
            ],
            "ModuleAddress": [
                132,
                {
                    "distinct_on": [
                        135,
                        "[ModuleAddress_select_column!]"
                    ],
                    "limit": [
                        66
                    ],
                    "offset": [
                        66
                    ],
                    "order_by": [
                        134,
                        "[ModuleAddress_order_by!]"
                    ],
                    "where": [
                        133
                    ]
                }
            ],
            "ModuleAddress_by_pk": [
                132,
                {
                    "id": [
                        264,
                        "String!"
                    ]
                }
            ],
            "ModuleRegistry": [
                138,
                {
                    "distinct_on": [
                        141,
                        "[ModuleRegistry_select_column!]"
                    ],
                    "limit": [
                        66
                    ],
                    "offset": [
                        66
                    ],
                    "order_by": [
                        140,
                        "[ModuleRegistry_order_by!]"
                    ],
                    "where": [
                        139
                    ]
                }
            ],
            "ModuleRegistry_by_pk": [
                138,
                {
                    "id": [
                        264,
                        "String!"
                    ]
                }
            ],
            "PreSaleContract": [
                144,
                {
                    "distinct_on": [
                        147,
                        "[PreSaleContract_select_column!]"
                    ],
                    "limit": [
                        66
                    ],
                    "offset": [
                        66
                    ],
                    "order_by": [
                        146,
                        "[PreSaleContract_order_by!]"
                    ],
                    "where": [
                        145
                    ]
                }
            ],
            "PreSaleContract_by_pk": [
                144,
                {
                    "id": [
                        264,
                        "String!"
                    ]
                }
            ],
            "PresaleClaim": [
                150,
                {
                    "distinct_on": [
                        157,
                        "[PresaleClaim_select_column!]"
                    ],
                    "limit": [
                        66
                    ],
                    "offset": [
                        66
                    ],
                    "order_by": [
                        156,
                        "[PresaleClaim_order_by!]"
                    ],
                    "where": [
                        153
                    ]
                }
            ],
            "PresaleClaim_by_pk": [
                150,
                {
                    "id": [
                        264,
                        "String!"
                    ]
                }
            ],
            "PresaleParticipation": [
                167,
                {
                    "distinct_on": [
                        174,
                        "[PresaleParticipation_select_column!]"
                    ],
                    "limit": [
                        66
                    ],
                    "offset": [
                        66
                    ],
                    "order_by": [
                        173,
                        "[PresaleParticipation_order_by!]"
                    ],
                    "where": [
                        170
                    ]
                }
            ],
            "PresaleParticipation_by_pk": [
                167,
                {
                    "id": [
                        264,
                        "String!"
                    ]
                }
            ],
            "PriceCandle": [
                184,
                {
                    "distinct_on": [
                        187,
                        "[PriceCandle_select_column!]"
                    ],
                    "limit": [
                        66
                    ],
                    "offset": [
                        66
                    ],
                    "order_by": [
                        186,
                        "[PriceCandle_order_by!]"
                    ],
                    "where": [
                        185
                    ]
                }
            ],
            "PriceCandle_by_pk": [
                184,
                {
                    "id": [
                        264,
                        "String!"
                    ]
                }
            ],
            "Role": [
                190,
                {
                    "distinct_on": [
                        231,
                        "[Role_select_column!]"
                    ],
                    "limit": [
                        66
                    ],
                    "offset": [
                        66
                    ],
                    "order_by": [
                        230,
                        "[Role_order_by!]"
                    ],
                    "where": [
                        227
                    ]
                }
            ],
            "RoleMember": [
                191,
                {
                    "distinct_on": [
                        198,
                        "[RoleMember_select_column!]"
                    ],
                    "limit": [
                        66
                    ],
                    "offset": [
                        66
                    ],
                    "order_by": [
                        197,
                        "[RoleMember_order_by!]"
                    ],
                    "where": [
                        194
                    ]
                }
            ],
            "RoleMember_by_pk": [
                191,
                {
                    "id": [
                        264,
                        "String!"
                    ]
                }
            ],
            "RolePermission": [
                208,
                {
                    "distinct_on": [
                        215,
                        "[RolePermission_select_column!]"
                    ],
                    "limit": [
                        66
                    ],
                    "offset": [
                        66
                    ],
                    "order_by": [
                        214,
                        "[RolePermission_order_by!]"
                    ],
                    "where": [
                        211
                    ]
                }
            ],
            "RolePermission_by_pk": [
                208,
                {
                    "id": [
                        264,
                        "String!"
                    ]
                }
            ],
            "Role_by_pk": [
                190,
                {
                    "id": [
                        264,
                        "String!"
                    ]
                }
            ],
            "Stake": [
                241,
                {
                    "distinct_on": [
                        248,
                        "[Stake_select_column!]"
                    ],
                    "limit": [
                        66
                    ],
                    "offset": [
                        66
                    ],
                    "order_by": [
                        247,
                        "[Stake_order_by!]"
                    ],
                    "where": [
                        244
                    ]
                }
            ],
            "Stake_by_pk": [
                241,
                {
                    "id": [
                        264,
                        "String!"
                    ]
                }
            ],
            "StakingContract": [
                258,
                {
                    "distinct_on": [
                        261,
                        "[StakingContract_select_column!]"
                    ],
                    "limit": [
                        66
                    ],
                    "offset": [
                        66
                    ],
                    "order_by": [
                        260,
                        "[StakingContract_order_by!]"
                    ],
                    "where": [
                        259
                    ]
                }
            ],
            "StakingContract_by_pk": [
                258,
                {
                    "id": [
                        264,
                        "String!"
                    ]
                }
            ],
            "Token": [
                267,
                {
                    "distinct_on": [
                        270,
                        "[Token_select_column!]"
                    ],
                    "limit": [
                        66
                    ],
                    "offset": [
                        66
                    ],
                    "order_by": [
                        269,
                        "[Token_order_by!]"
                    ],
                    "where": [
                        268
                    ]
                }
            ],
            "Token_by_pk": [
                267,
                {
                    "id": [
                        264,
                        "String!"
                    ]
                }
            ],
            "Trade": [
                273,
                {
                    "distinct_on": [
                        280,
                        "[Trade_select_column!]"
                    ],
                    "limit": [
                        66
                    ],
                    "offset": [
                        66
                    ],
                    "order_by": [
                        279,
                        "[Trade_order_by!]"
                    ],
                    "where": [
                        276
                    ]
                }
            ],
            "Trade_by_pk": [
                273,
                {
                    "id": [
                        264,
                        "String!"
                    ]
                }
            ],
            "UserMarketPosition": [
                290,
                {
                    "distinct_on": [
                        297,
                        "[UserMarketPosition_select_column!]"
                    ],
                    "limit": [
                        66
                    ],
                    "offset": [
                        66
                    ],
                    "order_by": [
                        296,
                        "[UserMarketPosition_order_by!]"
                    ],
                    "where": [
                        293
                    ]
                }
            ],
            "UserMarketPosition_by_pk": [
                290,
                {
                    "id": [
                        264,
                        "String!"
                    ]
                }
            ],
            "chain_metadata": [
                309,
                {
                    "distinct_on": [
                        312,
                        "[chain_metadata_select_column!]"
                    ],
                    "limit": [
                        66
                    ],
                    "offset": [
                        66
                    ],
                    "order_by": [
                        311,
                        "[chain_metadata_order_by!]"
                    ],
                    "where": [
                        310
                    ]
                }
            ],
            "chain_metadata_by_pk": [
                309,
                {
                    "chain_id": [
                        66,
                        "Int!"
                    ]
                }
            ],
            "dynamic_contract_registry": [
                318,
                {
                    "distinct_on": [
                        321,
                        "[dynamic_contract_registry_select_column!]"
                    ],
                    "limit": [
                        66
                    ],
                    "offset": [
                        66
                    ],
                    "order_by": [
                        320,
                        "[dynamic_contract_registry_order_by!]"
                    ],
                    "where": [
                        319
                    ]
                }
            ],
            "dynamic_contract_registry_by_pk": [
                318,
                {
                    "id": [
                        264,
                        "String!"
                    ]
                }
            ],
            "end_of_block_range_scanned_data": [
                324,
                {
                    "distinct_on": [
                        327,
                        "[end_of_block_range_scanned_data_select_column!]"
                    ],
                    "limit": [
                        66
                    ],
                    "offset": [
                        66
                    ],
                    "order_by": [
                        326,
                        "[end_of_block_range_scanned_data_order_by!]"
                    ],
                    "where": [
                        325
                    ]
                }
            ],
            "end_of_block_range_scanned_data_by_pk": [
                324,
                {
                    "block_number": [
                        66,
                        "Int!"
                    ],
                    "chain_id": [
                        66,
                        "Int!"
                    ]
                }
            ],
            "event_sync_state": [
                330,
                {
                    "distinct_on": [
                        333,
                        "[event_sync_state_select_column!]"
                    ],
                    "limit": [
                        66
                    ],
                    "offset": [
                        66
                    ],
                    "order_by": [
                        332,
                        "[event_sync_state_order_by!]"
                    ],
                    "where": [
                        331
                    ]
                }
            ],
            "event_sync_state_by_pk": [
                330,
                {
                    "chain_id": [
                        66,
                        "Int!"
                    ]
                }
            ],
            "persisted_state": [
                347,
                {
                    "distinct_on": [
                        350,
                        "[persisted_state_select_column!]"
                    ],
                    "limit": [
                        66
                    ],
                    "offset": [
                        66
                    ],
                    "order_by": [
                        349,
                        "[persisted_state_order_by!]"
                    ],
                    "where": [
                        348
                    ]
                }
            ],
            "persisted_state_by_pk": [
                347,
                {
                    "id": [
                        66,
                        "Int!"
                    ]
                }
            ],
            "raw_events": [
                355,
                {
                    "distinct_on": [
                        358,
                        "[raw_events_select_column!]"
                    ],
                    "limit": [
                        66
                    ],
                    "offset": [
                        66
                    ],
                    "order_by": [
                        357,
                        "[raw_events_order_by!]"
                    ],
                    "where": [
                        356
                    ]
                }
            ],
            "raw_events_by_pk": [
                355,
                {
                    "serial": [
                        66,
                        "Int!"
                    ]
                }
            ],
            "__typename": [
                264
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
                        66
                    ],
                    "offset": [
                        66
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
                        264,
                        "String!"
                    ]
                }
            ],
            "Account_stream": [
                0,
                {
                    "batch_size": [
                        66,
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
                        66
                    ],
                    "offset": [
                        66
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
                        264,
                        "String!"
                    ]
                }
            ],
            "AuthorizerContract_stream": [
                6,
                {
                    "batch_size": [
                        66,
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
                        66
                    ],
                    "offset": [
                        66
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
                        264,
                        "String!"
                    ]
                }
            ],
            "CreditFacilityContract_stream": [
                14,
                {
                    "batch_size": [
                        66,
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
                        66
                    ],
                    "offset": [
                        66
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
                        264,
                        "String!"
                    ]
                }
            ],
            "FeeDistribution_stream": [
                20,
                {
                    "batch_size": [
                        66,
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
                        66
                    ],
                    "offset": [
                        66
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
                        264,
                        "String!"
                    ]
                }
            ],
            "FloorElevation_stream": [
                37,
                {
                    "batch_size": [
                        66,
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
            "GlobalRegistry": [
                54,
                {
                    "distinct_on": [
                        57,
                        "[GlobalRegistry_select_column!]"
                    ],
                    "limit": [
                        66
                    ],
                    "offset": [
                        66
                    ],
                    "order_by": [
                        56,
                        "[GlobalRegistry_order_by!]"
                    ],
                    "where": [
                        55
                    ]
                }
            ],
            "GlobalRegistry_by_pk": [
                54,
                {
                    "id": [
                        264,
                        "String!"
                    ]
                }
            ],
            "GlobalRegistry_stream": [
                54,
                {
                    "batch_size": [
                        66,
                        "Int!"
                    ],
                    "cursor": [
                        58,
                        "[GlobalRegistry_stream_cursor_input]!"
                    ],
                    "where": [
                        55
                    ]
                }
            ],
            "GlobalStats": [
                60,
                {
                    "distinct_on": [
                        63,
                        "[GlobalStats_select_column!]"
                    ],
                    "limit": [
                        66
                    ],
                    "offset": [
                        66
                    ],
                    "order_by": [
                        62,
                        "[GlobalStats_order_by!]"
                    ],
                    "where": [
                        61
                    ]
                }
            ],
            "GlobalStats_by_pk": [
                60,
                {
                    "id": [
                        264,
                        "String!"
                    ]
                }
            ],
            "GlobalStats_stream": [
                60,
                {
                    "batch_size": [
                        66,
                        "Int!"
                    ],
                    "cursor": [
                        64,
                        "[GlobalStats_stream_cursor_input]!"
                    ],
                    "where": [
                        61
                    ]
                }
            ],
            "Loan": [
                69,
                {
                    "distinct_on": [
                        93,
                        "[Loan_select_column!]"
                    ],
                    "limit": [
                        66
                    ],
                    "offset": [
                        66
                    ],
                    "order_by": [
                        92,
                        "[Loan_order_by!]"
                    ],
                    "where": [
                        89
                    ]
                }
            ],
            "LoanStatusHistory": [
                70,
                {
                    "distinct_on": [
                        77,
                        "[LoanStatusHistory_select_column!]"
                    ],
                    "limit": [
                        66
                    ],
                    "offset": [
                        66
                    ],
                    "order_by": [
                        76,
                        "[LoanStatusHistory_order_by!]"
                    ],
                    "where": [
                        73
                    ]
                }
            ],
            "LoanStatusHistory_by_pk": [
                70,
                {
                    "id": [
                        264,
                        "String!"
                    ]
                }
            ],
            "LoanStatusHistory_stream": [
                70,
                {
                    "batch_size": [
                        66,
                        "Int!"
                    ],
                    "cursor": [
                        81,
                        "[LoanStatusHistory_stream_cursor_input]!"
                    ],
                    "where": [
                        73
                    ]
                }
            ],
            "Loan_by_pk": [
                69,
                {
                    "id": [
                        264,
                        "String!"
                    ]
                }
            ],
            "Loan_stream": [
                69,
                {
                    "batch_size": [
                        66,
                        "Int!"
                    ],
                    "cursor": [
                        97,
                        "[Loan_stream_cursor_input]!"
                    ],
                    "where": [
                        89
                    ]
                }
            ],
            "Market": [
                103,
                {
                    "distinct_on": [
                        122,
                        "[Market_select_column!]"
                    ],
                    "limit": [
                        66
                    ],
                    "offset": [
                        66
                    ],
                    "order_by": [
                        121,
                        "[Market_order_by!]"
                    ],
                    "where": [
                        118
                    ]
                }
            ],
            "MarketRollingStats": [
                104,
                {
                    "distinct_on": [
                        107,
                        "[MarketRollingStats_select_column!]"
                    ],
                    "limit": [
                        66
                    ],
                    "offset": [
                        66
                    ],
                    "order_by": [
                        106,
                        "[MarketRollingStats_order_by!]"
                    ],
                    "where": [
                        105
                    ]
                }
            ],
            "MarketRollingStats_by_pk": [
                104,
                {
                    "id": [
                        264,
                        "String!"
                    ]
                }
            ],
            "MarketRollingStats_stream": [
                104,
                {
                    "batch_size": [
                        66,
                        "Int!"
                    ],
                    "cursor": [
                        108,
                        "[MarketRollingStats_stream_cursor_input]!"
                    ],
                    "where": [
                        105
                    ]
                }
            ],
            "MarketSnapshot": [
                110,
                {
                    "distinct_on": [
                        113,
                        "[MarketSnapshot_select_column!]"
                    ],
                    "limit": [
                        66
                    ],
                    "offset": [
                        66
                    ],
                    "order_by": [
                        112,
                        "[MarketSnapshot_order_by!]"
                    ],
                    "where": [
                        111
                    ]
                }
            ],
            "MarketSnapshot_by_pk": [
                110,
                {
                    "id": [
                        264,
                        "String!"
                    ]
                }
            ],
            "MarketSnapshot_stream": [
                110,
                {
                    "batch_size": [
                        66,
                        "Int!"
                    ],
                    "cursor": [
                        114,
                        "[MarketSnapshot_stream_cursor_input]!"
                    ],
                    "where": [
                        111
                    ]
                }
            ],
            "Market_by_pk": [
                103,
                {
                    "id": [
                        264,
                        "String!"
                    ]
                }
            ],
            "Market_stream": [
                103,
                {
                    "batch_size": [
                        66,
                        "Int!"
                    ],
                    "cursor": [
                        126,
                        "[Market_stream_cursor_input]!"
                    ],
                    "where": [
                        118
                    ]
                }
            ],
            "ModuleAddress": [
                132,
                {
                    "distinct_on": [
                        135,
                        "[ModuleAddress_select_column!]"
                    ],
                    "limit": [
                        66
                    ],
                    "offset": [
                        66
                    ],
                    "order_by": [
                        134,
                        "[ModuleAddress_order_by!]"
                    ],
                    "where": [
                        133
                    ]
                }
            ],
            "ModuleAddress_by_pk": [
                132,
                {
                    "id": [
                        264,
                        "String!"
                    ]
                }
            ],
            "ModuleAddress_stream": [
                132,
                {
                    "batch_size": [
                        66,
                        "Int!"
                    ],
                    "cursor": [
                        136,
                        "[ModuleAddress_stream_cursor_input]!"
                    ],
                    "where": [
                        133
                    ]
                }
            ],
            "ModuleRegistry": [
                138,
                {
                    "distinct_on": [
                        141,
                        "[ModuleRegistry_select_column!]"
                    ],
                    "limit": [
                        66
                    ],
                    "offset": [
                        66
                    ],
                    "order_by": [
                        140,
                        "[ModuleRegistry_order_by!]"
                    ],
                    "where": [
                        139
                    ]
                }
            ],
            "ModuleRegistry_by_pk": [
                138,
                {
                    "id": [
                        264,
                        "String!"
                    ]
                }
            ],
            "ModuleRegistry_stream": [
                138,
                {
                    "batch_size": [
                        66,
                        "Int!"
                    ],
                    "cursor": [
                        142,
                        "[ModuleRegistry_stream_cursor_input]!"
                    ],
                    "where": [
                        139
                    ]
                }
            ],
            "PreSaleContract": [
                144,
                {
                    "distinct_on": [
                        147,
                        "[PreSaleContract_select_column!]"
                    ],
                    "limit": [
                        66
                    ],
                    "offset": [
                        66
                    ],
                    "order_by": [
                        146,
                        "[PreSaleContract_order_by!]"
                    ],
                    "where": [
                        145
                    ]
                }
            ],
            "PreSaleContract_by_pk": [
                144,
                {
                    "id": [
                        264,
                        "String!"
                    ]
                }
            ],
            "PreSaleContract_stream": [
                144,
                {
                    "batch_size": [
                        66,
                        "Int!"
                    ],
                    "cursor": [
                        148,
                        "[PreSaleContract_stream_cursor_input]!"
                    ],
                    "where": [
                        145
                    ]
                }
            ],
            "PresaleClaim": [
                150,
                {
                    "distinct_on": [
                        157,
                        "[PresaleClaim_select_column!]"
                    ],
                    "limit": [
                        66
                    ],
                    "offset": [
                        66
                    ],
                    "order_by": [
                        156,
                        "[PresaleClaim_order_by!]"
                    ],
                    "where": [
                        153
                    ]
                }
            ],
            "PresaleClaim_by_pk": [
                150,
                {
                    "id": [
                        264,
                        "String!"
                    ]
                }
            ],
            "PresaleClaim_stream": [
                150,
                {
                    "batch_size": [
                        66,
                        "Int!"
                    ],
                    "cursor": [
                        161,
                        "[PresaleClaim_stream_cursor_input]!"
                    ],
                    "where": [
                        153
                    ]
                }
            ],
            "PresaleParticipation": [
                167,
                {
                    "distinct_on": [
                        174,
                        "[PresaleParticipation_select_column!]"
                    ],
                    "limit": [
                        66
                    ],
                    "offset": [
                        66
                    ],
                    "order_by": [
                        173,
                        "[PresaleParticipation_order_by!]"
                    ],
                    "where": [
                        170
                    ]
                }
            ],
            "PresaleParticipation_by_pk": [
                167,
                {
                    "id": [
                        264,
                        "String!"
                    ]
                }
            ],
            "PresaleParticipation_stream": [
                167,
                {
                    "batch_size": [
                        66,
                        "Int!"
                    ],
                    "cursor": [
                        178,
                        "[PresaleParticipation_stream_cursor_input]!"
                    ],
                    "where": [
                        170
                    ]
                }
            ],
            "PriceCandle": [
                184,
                {
                    "distinct_on": [
                        187,
                        "[PriceCandle_select_column!]"
                    ],
                    "limit": [
                        66
                    ],
                    "offset": [
                        66
                    ],
                    "order_by": [
                        186,
                        "[PriceCandle_order_by!]"
                    ],
                    "where": [
                        185
                    ]
                }
            ],
            "PriceCandle_by_pk": [
                184,
                {
                    "id": [
                        264,
                        "String!"
                    ]
                }
            ],
            "PriceCandle_stream": [
                184,
                {
                    "batch_size": [
                        66,
                        "Int!"
                    ],
                    "cursor": [
                        188,
                        "[PriceCandle_stream_cursor_input]!"
                    ],
                    "where": [
                        185
                    ]
                }
            ],
            "Role": [
                190,
                {
                    "distinct_on": [
                        231,
                        "[Role_select_column!]"
                    ],
                    "limit": [
                        66
                    ],
                    "offset": [
                        66
                    ],
                    "order_by": [
                        230,
                        "[Role_order_by!]"
                    ],
                    "where": [
                        227
                    ]
                }
            ],
            "RoleMember": [
                191,
                {
                    "distinct_on": [
                        198,
                        "[RoleMember_select_column!]"
                    ],
                    "limit": [
                        66
                    ],
                    "offset": [
                        66
                    ],
                    "order_by": [
                        197,
                        "[RoleMember_order_by!]"
                    ],
                    "where": [
                        194
                    ]
                }
            ],
            "RoleMember_by_pk": [
                191,
                {
                    "id": [
                        264,
                        "String!"
                    ]
                }
            ],
            "RoleMember_stream": [
                191,
                {
                    "batch_size": [
                        66,
                        "Int!"
                    ],
                    "cursor": [
                        202,
                        "[RoleMember_stream_cursor_input]!"
                    ],
                    "where": [
                        194
                    ]
                }
            ],
            "RolePermission": [
                208,
                {
                    "distinct_on": [
                        215,
                        "[RolePermission_select_column!]"
                    ],
                    "limit": [
                        66
                    ],
                    "offset": [
                        66
                    ],
                    "order_by": [
                        214,
                        "[RolePermission_order_by!]"
                    ],
                    "where": [
                        211
                    ]
                }
            ],
            "RolePermission_by_pk": [
                208,
                {
                    "id": [
                        264,
                        "String!"
                    ]
                }
            ],
            "RolePermission_stream": [
                208,
                {
                    "batch_size": [
                        66,
                        "Int!"
                    ],
                    "cursor": [
                        219,
                        "[RolePermission_stream_cursor_input]!"
                    ],
                    "where": [
                        211
                    ]
                }
            ],
            "Role_by_pk": [
                190,
                {
                    "id": [
                        264,
                        "String!"
                    ]
                }
            ],
            "Role_stream": [
                190,
                {
                    "batch_size": [
                        66,
                        "Int!"
                    ],
                    "cursor": [
                        235,
                        "[Role_stream_cursor_input]!"
                    ],
                    "where": [
                        227
                    ]
                }
            ],
            "Stake": [
                241,
                {
                    "distinct_on": [
                        248,
                        "[Stake_select_column!]"
                    ],
                    "limit": [
                        66
                    ],
                    "offset": [
                        66
                    ],
                    "order_by": [
                        247,
                        "[Stake_order_by!]"
                    ],
                    "where": [
                        244
                    ]
                }
            ],
            "Stake_by_pk": [
                241,
                {
                    "id": [
                        264,
                        "String!"
                    ]
                }
            ],
            "Stake_stream": [
                241,
                {
                    "batch_size": [
                        66,
                        "Int!"
                    ],
                    "cursor": [
                        252,
                        "[Stake_stream_cursor_input]!"
                    ],
                    "where": [
                        244
                    ]
                }
            ],
            "StakingContract": [
                258,
                {
                    "distinct_on": [
                        261,
                        "[StakingContract_select_column!]"
                    ],
                    "limit": [
                        66
                    ],
                    "offset": [
                        66
                    ],
                    "order_by": [
                        260,
                        "[StakingContract_order_by!]"
                    ],
                    "where": [
                        259
                    ]
                }
            ],
            "StakingContract_by_pk": [
                258,
                {
                    "id": [
                        264,
                        "String!"
                    ]
                }
            ],
            "StakingContract_stream": [
                258,
                {
                    "batch_size": [
                        66,
                        "Int!"
                    ],
                    "cursor": [
                        262,
                        "[StakingContract_stream_cursor_input]!"
                    ],
                    "where": [
                        259
                    ]
                }
            ],
            "Token": [
                267,
                {
                    "distinct_on": [
                        270,
                        "[Token_select_column!]"
                    ],
                    "limit": [
                        66
                    ],
                    "offset": [
                        66
                    ],
                    "order_by": [
                        269,
                        "[Token_order_by!]"
                    ],
                    "where": [
                        268
                    ]
                }
            ],
            "Token_by_pk": [
                267,
                {
                    "id": [
                        264,
                        "String!"
                    ]
                }
            ],
            "Token_stream": [
                267,
                {
                    "batch_size": [
                        66,
                        "Int!"
                    ],
                    "cursor": [
                        271,
                        "[Token_stream_cursor_input]!"
                    ],
                    "where": [
                        268
                    ]
                }
            ],
            "Trade": [
                273,
                {
                    "distinct_on": [
                        280,
                        "[Trade_select_column!]"
                    ],
                    "limit": [
                        66
                    ],
                    "offset": [
                        66
                    ],
                    "order_by": [
                        279,
                        "[Trade_order_by!]"
                    ],
                    "where": [
                        276
                    ]
                }
            ],
            "Trade_by_pk": [
                273,
                {
                    "id": [
                        264,
                        "String!"
                    ]
                }
            ],
            "Trade_stream": [
                273,
                {
                    "batch_size": [
                        66,
                        "Int!"
                    ],
                    "cursor": [
                        284,
                        "[Trade_stream_cursor_input]!"
                    ],
                    "where": [
                        276
                    ]
                }
            ],
            "UserMarketPosition": [
                290,
                {
                    "distinct_on": [
                        297,
                        "[UserMarketPosition_select_column!]"
                    ],
                    "limit": [
                        66
                    ],
                    "offset": [
                        66
                    ],
                    "order_by": [
                        296,
                        "[UserMarketPosition_order_by!]"
                    ],
                    "where": [
                        293
                    ]
                }
            ],
            "UserMarketPosition_by_pk": [
                290,
                {
                    "id": [
                        264,
                        "String!"
                    ]
                }
            ],
            "UserMarketPosition_stream": [
                290,
                {
                    "batch_size": [
                        66,
                        "Int!"
                    ],
                    "cursor": [
                        301,
                        "[UserMarketPosition_stream_cursor_input]!"
                    ],
                    "where": [
                        293
                    ]
                }
            ],
            "chain_metadata": [
                309,
                {
                    "distinct_on": [
                        312,
                        "[chain_metadata_select_column!]"
                    ],
                    "limit": [
                        66
                    ],
                    "offset": [
                        66
                    ],
                    "order_by": [
                        311,
                        "[chain_metadata_order_by!]"
                    ],
                    "where": [
                        310
                    ]
                }
            ],
            "chain_metadata_by_pk": [
                309,
                {
                    "chain_id": [
                        66,
                        "Int!"
                    ]
                }
            ],
            "chain_metadata_stream": [
                309,
                {
                    "batch_size": [
                        66,
                        "Int!"
                    ],
                    "cursor": [
                        313,
                        "[chain_metadata_stream_cursor_input]!"
                    ],
                    "where": [
                        310
                    ]
                }
            ],
            "dynamic_contract_registry": [
                318,
                {
                    "distinct_on": [
                        321,
                        "[dynamic_contract_registry_select_column!]"
                    ],
                    "limit": [
                        66
                    ],
                    "offset": [
                        66
                    ],
                    "order_by": [
                        320,
                        "[dynamic_contract_registry_order_by!]"
                    ],
                    "where": [
                        319
                    ]
                }
            ],
            "dynamic_contract_registry_by_pk": [
                318,
                {
                    "id": [
                        264,
                        "String!"
                    ]
                }
            ],
            "dynamic_contract_registry_stream": [
                318,
                {
                    "batch_size": [
                        66,
                        "Int!"
                    ],
                    "cursor": [
                        322,
                        "[dynamic_contract_registry_stream_cursor_input]!"
                    ],
                    "where": [
                        319
                    ]
                }
            ],
            "end_of_block_range_scanned_data": [
                324,
                {
                    "distinct_on": [
                        327,
                        "[end_of_block_range_scanned_data_select_column!]"
                    ],
                    "limit": [
                        66
                    ],
                    "offset": [
                        66
                    ],
                    "order_by": [
                        326,
                        "[end_of_block_range_scanned_data_order_by!]"
                    ],
                    "where": [
                        325
                    ]
                }
            ],
            "end_of_block_range_scanned_data_by_pk": [
                324,
                {
                    "block_number": [
                        66,
                        "Int!"
                    ],
                    "chain_id": [
                        66,
                        "Int!"
                    ]
                }
            ],
            "end_of_block_range_scanned_data_stream": [
                324,
                {
                    "batch_size": [
                        66,
                        "Int!"
                    ],
                    "cursor": [
                        328,
                        "[end_of_block_range_scanned_data_stream_cursor_input]!"
                    ],
                    "where": [
                        325
                    ]
                }
            ],
            "event_sync_state": [
                330,
                {
                    "distinct_on": [
                        333,
                        "[event_sync_state_select_column!]"
                    ],
                    "limit": [
                        66
                    ],
                    "offset": [
                        66
                    ],
                    "order_by": [
                        332,
                        "[event_sync_state_order_by!]"
                    ],
                    "where": [
                        331
                    ]
                }
            ],
            "event_sync_state_by_pk": [
                330,
                {
                    "chain_id": [
                        66,
                        "Int!"
                    ]
                }
            ],
            "event_sync_state_stream": [
                330,
                {
                    "batch_size": [
                        66,
                        "Int!"
                    ],
                    "cursor": [
                        334,
                        "[event_sync_state_stream_cursor_input]!"
                    ],
                    "where": [
                        331
                    ]
                }
            ],
            "persisted_state": [
                347,
                {
                    "distinct_on": [
                        350,
                        "[persisted_state_select_column!]"
                    ],
                    "limit": [
                        66
                    ],
                    "offset": [
                        66
                    ],
                    "order_by": [
                        349,
                        "[persisted_state_order_by!]"
                    ],
                    "where": [
                        348
                    ]
                }
            ],
            "persisted_state_by_pk": [
                347,
                {
                    "id": [
                        66,
                        "Int!"
                    ]
                }
            ],
            "persisted_state_stream": [
                347,
                {
                    "batch_size": [
                        66,
                        "Int!"
                    ],
                    "cursor": [
                        351,
                        "[persisted_state_stream_cursor_input]!"
                    ],
                    "where": [
                        348
                    ]
                }
            ],
            "raw_events": [
                355,
                {
                    "distinct_on": [
                        358,
                        "[raw_events_select_column!]"
                    ],
                    "limit": [
                        66
                    ],
                    "offset": [
                        66
                    ],
                    "order_by": [
                        357,
                        "[raw_events_order_by!]"
                    ],
                    "where": [
                        356
                    ]
                }
            ],
            "raw_events_by_pk": [
                355,
                {
                    "serial": [
                        66,
                        "Int!"
                    ]
                }
            ],
            "raw_events_stream": [
                355,
                {
                    "batch_size": [
                        66,
                        "Int!"
                    ],
                    "cursor": [
                        359,
                        "[raw_events_stream_cursor_input]!"
                    ],
                    "where": [
                        356
                    ]
                }
            ],
            "__typename": [
                264
            ]
        }
    }
}