export default {
    "scalars": [
        3,
        6,
        11,
        21,
        38,
        51,
        54,
        64,
        80,
        94,
        100,
        109,
        122,
        128,
        134,
        144,
        161,
        178,
        191,
        201,
        214,
        217,
        222,
        232,
        249,
        259,
        264,
        267,
        269,
        273,
        279,
        285,
        288,
        291,
        293,
        295,
        297,
        301,
        304,
        306,
        311,
        314,
        316,
        318,
        320
    ],
    "types": {
        "Account": {
            "db_write_timestamp": [
                316
            ],
            "id": [
                217
            ],
            "loans": [
                56,
                {
                    "distinct_on": [
                        80,
                        "[Loan_select_column!]"
                    ],
                    "limit": [
                        54
                    ],
                    "offset": [
                        54
                    ],
                    "order_by": [
                        79,
                        "[Loan_order_by!]"
                    ],
                    "where": [
                        76
                    ]
                }
            ],
            "marketsCreated": [
                90,
                {
                    "distinct_on": [
                        109,
                        "[Market_select_column!]"
                    ],
                    "limit": [
                        54
                    ],
                    "offset": [
                        54
                    ],
                    "order_by": [
                        108,
                        "[Market_order_by!]"
                    ],
                    "where": [
                        105
                    ]
                }
            ],
            "presaleParticipations": [
                171,
                {
                    "distinct_on": [
                        178,
                        "[PresaleParticipation_select_column!]"
                    ],
                    "limit": [
                        54
                    ],
                    "offset": [
                        54
                    ],
                    "order_by": [
                        177,
                        "[PresaleParticipation_order_by!]"
                    ],
                    "where": [
                        174
                    ]
                }
            ],
            "stakes": [
                194,
                {
                    "distinct_on": [
                        201,
                        "[Stake_select_column!]"
                    ],
                    "limit": [
                        54
                    ],
                    "offset": [
                        54
                    ],
                    "order_by": [
                        200,
                        "[Stake_order_by!]"
                    ],
                    "where": [
                        197
                    ]
                }
            ],
            "trades": [
                225,
                {
                    "distinct_on": [
                        232,
                        "[Trade_select_column!]"
                    ],
                    "limit": [
                        54
                    ],
                    "offset": [
                        54
                    ],
                    "order_by": [
                        231,
                        "[Trade_order_by!]"
                    ],
                    "where": [
                        228
                    ]
                }
            ],
            "userMarketPositions": [
                242,
                {
                    "distinct_on": [
                        249,
                        "[UserMarketPosition_select_column!]"
                    ],
                    "limit": [
                        54
                    ],
                    "offset": [
                        54
                    ],
                    "order_by": [
                        248,
                        "[UserMarketPosition_order_by!]"
                    ],
                    "where": [
                        245
                    ]
                }
            ],
            "__typename": [
                217
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
                317
            ],
            "id": [
                218
            ],
            "loans": [
                76
            ],
            "marketsCreated": [
                105
            ],
            "presaleParticipations": [
                174
            ],
            "stakes": [
                197
            ],
            "trades": [
                228
            ],
            "userMarketPositions": [
                245
            ],
            "__typename": [
                217
            ]
        },
        "Account_order_by": {
            "db_write_timestamp": [
                297
            ],
            "id": [
                297
            ],
            "loans_aggregate": [
                74
            ],
            "marketsCreated_aggregate": [
                103
            ],
            "presaleParticipations_aggregate": [
                172
            ],
            "stakes_aggregate": [
                195
            ],
            "trades_aggregate": [
                226
            ],
            "userMarketPositions_aggregate": [
                243
            ],
            "__typename": [
                217
            ]
        },
        "Account_select_column": {},
        "Account_stream_cursor_input": {
            "initial_value": [
                5
            ],
            "ordering": [
                269
            ],
            "__typename": [
                217
            ]
        },
        "Account_stream_cursor_value_input": {
            "db_write_timestamp": [
                316
            ],
            "id": [
                217
            ],
            "__typename": [
                217
            ]
        },
        "Boolean": {},
        "Boolean_comparison_exp": {
            "_eq": [
                6
            ],
            "_gt": [
                6
            ],
            "_gte": [
                6
            ],
            "_in": [
                6
            ],
            "_is_null": [
                6
            ],
            "_lt": [
                6
            ],
            "_lte": [
                6
            ],
            "_neq": [
                6
            ],
            "_nin": [
                6
            ],
            "__typename": [
                217
            ]
        },
        "CreditFacilityContract": {
            "borrowToken_id": [
                217
            ],
            "collateralToken_id": [
                217
            ],
            "createdAt": [
                295
            ],
            "db_write_timestamp": [
                316
            ],
            "id": [
                217
            ],
            "lastUpdatedAt": [
                295
            ],
            "loans": [
                56,
                {
                    "distinct_on": [
                        80,
                        "[Loan_select_column!]"
                    ],
                    "limit": [
                        54
                    ],
                    "offset": [
                        54
                    ],
                    "order_by": [
                        79,
                        "[Loan_order_by!]"
                    ],
                    "where": [
                        76
                    ]
                }
            ],
            "market_id": [
                217
            ],
            "totalDebtFormatted": [
                217
            ],
            "totalDebtRaw": [
                295
            ],
            "totalLoans": [
                295
            ],
            "totalLockedCollateralFormatted": [
                217
            ],
            "totalLockedCollateralRaw": [
                295
            ],
            "totalVolumeFormatted": [
                217
            ],
            "totalVolumeRaw": [
                295
            ],
            "__typename": [
                217
            ]
        },
        "CreditFacilityContract_bool_exp": {
            "_and": [
                9
            ],
            "_not": [
                9
            ],
            "_or": [
                9
            ],
            "borrowToken_id": [
                218
            ],
            "collateralToken_id": [
                218
            ],
            "createdAt": [
                296
            ],
            "db_write_timestamp": [
                317
            ],
            "id": [
                218
            ],
            "lastUpdatedAt": [
                296
            ],
            "loans": [
                76
            ],
            "market_id": [
                218
            ],
            "totalDebtFormatted": [
                218
            ],
            "totalDebtRaw": [
                296
            ],
            "totalLoans": [
                296
            ],
            "totalLockedCollateralFormatted": [
                218
            ],
            "totalLockedCollateralRaw": [
                296
            ],
            "totalVolumeFormatted": [
                218
            ],
            "totalVolumeRaw": [
                296
            ],
            "__typename": [
                217
            ]
        },
        "CreditFacilityContract_order_by": {
            "borrowToken_id": [
                297
            ],
            "collateralToken_id": [
                297
            ],
            "createdAt": [
                297
            ],
            "db_write_timestamp": [
                297
            ],
            "id": [
                297
            ],
            "lastUpdatedAt": [
                297
            ],
            "loans_aggregate": [
                74
            ],
            "market_id": [
                297
            ],
            "totalDebtFormatted": [
                297
            ],
            "totalDebtRaw": [
                297
            ],
            "totalLoans": [
                297
            ],
            "totalLockedCollateralFormatted": [
                297
            ],
            "totalLockedCollateralRaw": [
                297
            ],
            "totalVolumeFormatted": [
                297
            ],
            "totalVolumeRaw": [
                297
            ],
            "__typename": [
                217
            ]
        },
        "CreditFacilityContract_select_column": {},
        "CreditFacilityContract_stream_cursor_input": {
            "initial_value": [
                13
            ],
            "ordering": [
                269
            ],
            "__typename": [
                217
            ]
        },
        "CreditFacilityContract_stream_cursor_value_input": {
            "borrowToken_id": [
                217
            ],
            "collateralToken_id": [
                217
            ],
            "createdAt": [
                295
            ],
            "db_write_timestamp": [
                316
            ],
            "id": [
                217
            ],
            "lastUpdatedAt": [
                295
            ],
            "market_id": [
                217
            ],
            "totalDebtFormatted": [
                217
            ],
            "totalDebtRaw": [
                295
            ],
            "totalLoans": [
                295
            ],
            "totalLockedCollateralFormatted": [
                217
            ],
            "totalLockedCollateralRaw": [
                295
            ],
            "totalVolumeFormatted": [
                217
            ],
            "totalVolumeRaw": [
                295
            ],
            "__typename": [
                217
            ]
        },
        "FeeDistribution": {
            "db_write_timestamp": [
                316
            ],
            "floorAmountFormatted": [
                217
            ],
            "floorAmountRaw": [
                295
            ],
            "id": [
                217
            ],
            "market_id": [
                217
            ],
            "stakingAmountFormatted": [
                217
            ],
            "stakingAmountRaw": [
                295
            ],
            "timestamp": [
                295
            ],
            "transactionHash": [
                217
            ],
            "treasuryAmountFormatted": [
                217
            ],
            "treasuryAmountRaw": [
                295
            ],
            "__typename": [
                217
            ]
        },
        "FeeDistribution_aggregate_order_by": {
            "avg": [
                16
            ],
            "count": [
                297
            ],
            "max": [
                18
            ],
            "min": [
                19
            ],
            "stddev": [
                22
            ],
            "stddev_pop": [
                23
            ],
            "stddev_samp": [
                24
            ],
            "sum": [
                27
            ],
            "var_pop": [
                28
            ],
            "var_samp": [
                29
            ],
            "variance": [
                30
            ],
            "__typename": [
                217
            ]
        },
        "FeeDistribution_avg_order_by": {
            "floorAmountRaw": [
                297
            ],
            "stakingAmountRaw": [
                297
            ],
            "timestamp": [
                297
            ],
            "treasuryAmountRaw": [
                297
            ],
            "__typename": [
                217
            ]
        },
        "FeeDistribution_bool_exp": {
            "_and": [
                17
            ],
            "_not": [
                17
            ],
            "_or": [
                17
            ],
            "db_write_timestamp": [
                317
            ],
            "floorAmountFormatted": [
                218
            ],
            "floorAmountRaw": [
                296
            ],
            "id": [
                218
            ],
            "market_id": [
                218
            ],
            "stakingAmountFormatted": [
                218
            ],
            "stakingAmountRaw": [
                296
            ],
            "timestamp": [
                296
            ],
            "transactionHash": [
                218
            ],
            "treasuryAmountFormatted": [
                218
            ],
            "treasuryAmountRaw": [
                296
            ],
            "__typename": [
                217
            ]
        },
        "FeeDistribution_max_order_by": {
            "db_write_timestamp": [
                297
            ],
            "floorAmountFormatted": [
                297
            ],
            "floorAmountRaw": [
                297
            ],
            "id": [
                297
            ],
            "market_id": [
                297
            ],
            "stakingAmountFormatted": [
                297
            ],
            "stakingAmountRaw": [
                297
            ],
            "timestamp": [
                297
            ],
            "transactionHash": [
                297
            ],
            "treasuryAmountFormatted": [
                297
            ],
            "treasuryAmountRaw": [
                297
            ],
            "__typename": [
                217
            ]
        },
        "FeeDistribution_min_order_by": {
            "db_write_timestamp": [
                297
            ],
            "floorAmountFormatted": [
                297
            ],
            "floorAmountRaw": [
                297
            ],
            "id": [
                297
            ],
            "market_id": [
                297
            ],
            "stakingAmountFormatted": [
                297
            ],
            "stakingAmountRaw": [
                297
            ],
            "timestamp": [
                297
            ],
            "transactionHash": [
                297
            ],
            "treasuryAmountFormatted": [
                297
            ],
            "treasuryAmountRaw": [
                297
            ],
            "__typename": [
                217
            ]
        },
        "FeeDistribution_order_by": {
            "db_write_timestamp": [
                297
            ],
            "floorAmountFormatted": [
                297
            ],
            "floorAmountRaw": [
                297
            ],
            "id": [
                297
            ],
            "market_id": [
                297
            ],
            "stakingAmountFormatted": [
                297
            ],
            "stakingAmountRaw": [
                297
            ],
            "timestamp": [
                297
            ],
            "transactionHash": [
                297
            ],
            "treasuryAmountFormatted": [
                297
            ],
            "treasuryAmountRaw": [
                297
            ],
            "__typename": [
                217
            ]
        },
        "FeeDistribution_select_column": {},
        "FeeDistribution_stddev_order_by": {
            "floorAmountRaw": [
                297
            ],
            "stakingAmountRaw": [
                297
            ],
            "timestamp": [
                297
            ],
            "treasuryAmountRaw": [
                297
            ],
            "__typename": [
                217
            ]
        },
        "FeeDistribution_stddev_pop_order_by": {
            "floorAmountRaw": [
                297
            ],
            "stakingAmountRaw": [
                297
            ],
            "timestamp": [
                297
            ],
            "treasuryAmountRaw": [
                297
            ],
            "__typename": [
                217
            ]
        },
        "FeeDistribution_stddev_samp_order_by": {
            "floorAmountRaw": [
                297
            ],
            "stakingAmountRaw": [
                297
            ],
            "timestamp": [
                297
            ],
            "treasuryAmountRaw": [
                297
            ],
            "__typename": [
                217
            ]
        },
        "FeeDistribution_stream_cursor_input": {
            "initial_value": [
                26
            ],
            "ordering": [
                269
            ],
            "__typename": [
                217
            ]
        },
        "FeeDistribution_stream_cursor_value_input": {
            "db_write_timestamp": [
                316
            ],
            "floorAmountFormatted": [
                217
            ],
            "floorAmountRaw": [
                295
            ],
            "id": [
                217
            ],
            "market_id": [
                217
            ],
            "stakingAmountFormatted": [
                217
            ],
            "stakingAmountRaw": [
                295
            ],
            "timestamp": [
                295
            ],
            "transactionHash": [
                217
            ],
            "treasuryAmountFormatted": [
                217
            ],
            "treasuryAmountRaw": [
                295
            ],
            "__typename": [
                217
            ]
        },
        "FeeDistribution_sum_order_by": {
            "floorAmountRaw": [
                297
            ],
            "stakingAmountRaw": [
                297
            ],
            "timestamp": [
                297
            ],
            "treasuryAmountRaw": [
                297
            ],
            "__typename": [
                217
            ]
        },
        "FeeDistribution_var_pop_order_by": {
            "floorAmountRaw": [
                297
            ],
            "stakingAmountRaw": [
                297
            ],
            "timestamp": [
                297
            ],
            "treasuryAmountRaw": [
                297
            ],
            "__typename": [
                217
            ]
        },
        "FeeDistribution_var_samp_order_by": {
            "floorAmountRaw": [
                297
            ],
            "stakingAmountRaw": [
                297
            ],
            "timestamp": [
                297
            ],
            "treasuryAmountRaw": [
                297
            ],
            "__typename": [
                217
            ]
        },
        "FeeDistribution_variance_order_by": {
            "floorAmountRaw": [
                297
            ],
            "stakingAmountRaw": [
                297
            ],
            "timestamp": [
                297
            ],
            "treasuryAmountRaw": [
                297
            ],
            "__typename": [
                217
            ]
        },
        "FloorElevation": {
            "db_write_timestamp": [
                316
            ],
            "deployedAmountFormatted": [
                217
            ],
            "deployedAmountRaw": [
                295
            ],
            "id": [
                217
            ],
            "market_id": [
                217
            ],
            "newFloorPriceFormatted": [
                217
            ],
            "newFloorPriceRaw": [
                295
            ],
            "oldFloorPriceFormatted": [
                217
            ],
            "oldFloorPriceRaw": [
                295
            ],
            "timestamp": [
                295
            ],
            "transactionHash": [
                217
            ],
            "__typename": [
                217
            ]
        },
        "FloorElevation_aggregate_order_by": {
            "avg": [
                33
            ],
            "count": [
                297
            ],
            "max": [
                35
            ],
            "min": [
                36
            ],
            "stddev": [
                39
            ],
            "stddev_pop": [
                40
            ],
            "stddev_samp": [
                41
            ],
            "sum": [
                44
            ],
            "var_pop": [
                45
            ],
            "var_samp": [
                46
            ],
            "variance": [
                47
            ],
            "__typename": [
                217
            ]
        },
        "FloorElevation_avg_order_by": {
            "deployedAmountRaw": [
                297
            ],
            "newFloorPriceRaw": [
                297
            ],
            "oldFloorPriceRaw": [
                297
            ],
            "timestamp": [
                297
            ],
            "__typename": [
                217
            ]
        },
        "FloorElevation_bool_exp": {
            "_and": [
                34
            ],
            "_not": [
                34
            ],
            "_or": [
                34
            ],
            "db_write_timestamp": [
                317
            ],
            "deployedAmountFormatted": [
                218
            ],
            "deployedAmountRaw": [
                296
            ],
            "id": [
                218
            ],
            "market_id": [
                218
            ],
            "newFloorPriceFormatted": [
                218
            ],
            "newFloorPriceRaw": [
                296
            ],
            "oldFloorPriceFormatted": [
                218
            ],
            "oldFloorPriceRaw": [
                296
            ],
            "timestamp": [
                296
            ],
            "transactionHash": [
                218
            ],
            "__typename": [
                217
            ]
        },
        "FloorElevation_max_order_by": {
            "db_write_timestamp": [
                297
            ],
            "deployedAmountFormatted": [
                297
            ],
            "deployedAmountRaw": [
                297
            ],
            "id": [
                297
            ],
            "market_id": [
                297
            ],
            "newFloorPriceFormatted": [
                297
            ],
            "newFloorPriceRaw": [
                297
            ],
            "oldFloorPriceFormatted": [
                297
            ],
            "oldFloorPriceRaw": [
                297
            ],
            "timestamp": [
                297
            ],
            "transactionHash": [
                297
            ],
            "__typename": [
                217
            ]
        },
        "FloorElevation_min_order_by": {
            "db_write_timestamp": [
                297
            ],
            "deployedAmountFormatted": [
                297
            ],
            "deployedAmountRaw": [
                297
            ],
            "id": [
                297
            ],
            "market_id": [
                297
            ],
            "newFloorPriceFormatted": [
                297
            ],
            "newFloorPriceRaw": [
                297
            ],
            "oldFloorPriceFormatted": [
                297
            ],
            "oldFloorPriceRaw": [
                297
            ],
            "timestamp": [
                297
            ],
            "transactionHash": [
                297
            ],
            "__typename": [
                217
            ]
        },
        "FloorElevation_order_by": {
            "db_write_timestamp": [
                297
            ],
            "deployedAmountFormatted": [
                297
            ],
            "deployedAmountRaw": [
                297
            ],
            "id": [
                297
            ],
            "market_id": [
                297
            ],
            "newFloorPriceFormatted": [
                297
            ],
            "newFloorPriceRaw": [
                297
            ],
            "oldFloorPriceFormatted": [
                297
            ],
            "oldFloorPriceRaw": [
                297
            ],
            "timestamp": [
                297
            ],
            "transactionHash": [
                297
            ],
            "__typename": [
                217
            ]
        },
        "FloorElevation_select_column": {},
        "FloorElevation_stddev_order_by": {
            "deployedAmountRaw": [
                297
            ],
            "newFloorPriceRaw": [
                297
            ],
            "oldFloorPriceRaw": [
                297
            ],
            "timestamp": [
                297
            ],
            "__typename": [
                217
            ]
        },
        "FloorElevation_stddev_pop_order_by": {
            "deployedAmountRaw": [
                297
            ],
            "newFloorPriceRaw": [
                297
            ],
            "oldFloorPriceRaw": [
                297
            ],
            "timestamp": [
                297
            ],
            "__typename": [
                217
            ]
        },
        "FloorElevation_stddev_samp_order_by": {
            "deployedAmountRaw": [
                297
            ],
            "newFloorPriceRaw": [
                297
            ],
            "oldFloorPriceRaw": [
                297
            ],
            "timestamp": [
                297
            ],
            "__typename": [
                217
            ]
        },
        "FloorElevation_stream_cursor_input": {
            "initial_value": [
                43
            ],
            "ordering": [
                269
            ],
            "__typename": [
                217
            ]
        },
        "FloorElevation_stream_cursor_value_input": {
            "db_write_timestamp": [
                316
            ],
            "deployedAmountFormatted": [
                217
            ],
            "deployedAmountRaw": [
                295
            ],
            "id": [
                217
            ],
            "market_id": [
                217
            ],
            "newFloorPriceFormatted": [
                217
            ],
            "newFloorPriceRaw": [
                295
            ],
            "oldFloorPriceFormatted": [
                217
            ],
            "oldFloorPriceRaw": [
                295
            ],
            "timestamp": [
                295
            ],
            "transactionHash": [
                217
            ],
            "__typename": [
                217
            ]
        },
        "FloorElevation_sum_order_by": {
            "deployedAmountRaw": [
                297
            ],
            "newFloorPriceRaw": [
                297
            ],
            "oldFloorPriceRaw": [
                297
            ],
            "timestamp": [
                297
            ],
            "__typename": [
                217
            ]
        },
        "FloorElevation_var_pop_order_by": {
            "deployedAmountRaw": [
                297
            ],
            "newFloorPriceRaw": [
                297
            ],
            "oldFloorPriceRaw": [
                297
            ],
            "timestamp": [
                297
            ],
            "__typename": [
                217
            ]
        },
        "FloorElevation_var_samp_order_by": {
            "deployedAmountRaw": [
                297
            ],
            "newFloorPriceRaw": [
                297
            ],
            "oldFloorPriceRaw": [
                297
            ],
            "timestamp": [
                297
            ],
            "__typename": [
                217
            ]
        },
        "FloorElevation_variance_order_by": {
            "deployedAmountRaw": [
                297
            ],
            "newFloorPriceRaw": [
                297
            ],
            "oldFloorPriceRaw": [
                297
            ],
            "timestamp": [
                297
            ],
            "__typename": [
                217
            ]
        },
        "GlobalStats": {
            "activeMarkets": [
                295
            ],
            "db_write_timestamp": [
                316
            ],
            "id": [
                217
            ],
            "lastUpdatedAt": [
                295
            ],
            "totalLockedCollateralFormatted": [
                217
            ],
            "totalLockedCollateralRaw": [
                295
            ],
            "totalMarkets": [
                295
            ],
            "totalOutstandingDebtFormatted": [
                217
            ],
            "totalOutstandingDebtRaw": [
                295
            ],
            "totalVolumeFormatted": [
                217
            ],
            "totalVolumeRaw": [
                295
            ],
            "__typename": [
                217
            ]
        },
        "GlobalStats_bool_exp": {
            "_and": [
                49
            ],
            "_not": [
                49
            ],
            "_or": [
                49
            ],
            "activeMarkets": [
                296
            ],
            "db_write_timestamp": [
                317
            ],
            "id": [
                218
            ],
            "lastUpdatedAt": [
                296
            ],
            "totalLockedCollateralFormatted": [
                218
            ],
            "totalLockedCollateralRaw": [
                296
            ],
            "totalMarkets": [
                296
            ],
            "totalOutstandingDebtFormatted": [
                218
            ],
            "totalOutstandingDebtRaw": [
                296
            ],
            "totalVolumeFormatted": [
                218
            ],
            "totalVolumeRaw": [
                296
            ],
            "__typename": [
                217
            ]
        },
        "GlobalStats_order_by": {
            "activeMarkets": [
                297
            ],
            "db_write_timestamp": [
                297
            ],
            "id": [
                297
            ],
            "lastUpdatedAt": [
                297
            ],
            "totalLockedCollateralFormatted": [
                297
            ],
            "totalLockedCollateralRaw": [
                297
            ],
            "totalMarkets": [
                297
            ],
            "totalOutstandingDebtFormatted": [
                297
            ],
            "totalOutstandingDebtRaw": [
                297
            ],
            "totalVolumeFormatted": [
                297
            ],
            "totalVolumeRaw": [
                297
            ],
            "__typename": [
                217
            ]
        },
        "GlobalStats_select_column": {},
        "GlobalStats_stream_cursor_input": {
            "initial_value": [
                53
            ],
            "ordering": [
                269
            ],
            "__typename": [
                217
            ]
        },
        "GlobalStats_stream_cursor_value_input": {
            "activeMarkets": [
                295
            ],
            "db_write_timestamp": [
                316
            ],
            "id": [
                217
            ],
            "lastUpdatedAt": [
                295
            ],
            "totalLockedCollateralFormatted": [
                217
            ],
            "totalLockedCollateralRaw": [
                295
            ],
            "totalMarkets": [
                295
            ],
            "totalOutstandingDebtFormatted": [
                217
            ],
            "totalOutstandingDebtRaw": [
                295
            ],
            "totalVolumeFormatted": [
                217
            ],
            "totalVolumeRaw": [
                295
            ],
            "__typename": [
                217
            ]
        },
        "Int": {},
        "Int_comparison_exp": {
            "_eq": [
                54
            ],
            "_gt": [
                54
            ],
            "_gte": [
                54
            ],
            "_in": [
                54
            ],
            "_is_null": [
                6
            ],
            "_lt": [
                54
            ],
            "_lte": [
                54
            ],
            "_neq": [
                54
            ],
            "_nin": [
                54
            ],
            "__typename": [
                217
            ]
        },
        "Loan": {
            "borrowAmountFormatted": [
                217
            ],
            "borrowAmountRaw": [
                295
            ],
            "borrower_id": [
                217
            ],
            "closedAt": [
                295
            ],
            "db_write_timestamp": [
                316
            ],
            "facility_id": [
                217
            ],
            "floorPriceAtBorrowFormatted": [
                217
            ],
            "floorPriceAtBorrowRaw": [
                295
            ],
            "id": [
                217
            ],
            "lastUpdatedAt": [
                295
            ],
            "lockedCollateralFormatted": [
                217
            ],
            "lockedCollateralRaw": [
                295
            ],
            "market_id": [
                217
            ],
            "openedAt": [
                295
            ],
            "originationFeeFormatted": [
                217
            ],
            "originationFeeRaw": [
                295
            ],
            "remainingDebtFormatted": [
                217
            ],
            "remainingDebtRaw": [
                295
            ],
            "status": [
                291
            ],
            "statusHistory": [
                57,
                {
                    "distinct_on": [
                        64,
                        "[LoanStatusHistory_select_column!]"
                    ],
                    "limit": [
                        54
                    ],
                    "offset": [
                        54
                    ],
                    "order_by": [
                        63,
                        "[LoanStatusHistory_order_by!]"
                    ],
                    "where": [
                        60
                    ]
                }
            ],
            "transactionHash": [
                217
            ],
            "__typename": [
                217
            ]
        },
        "LoanStatusHistory": {
            "db_write_timestamp": [
                316
            ],
            "id": [
                217
            ],
            "loan_id": [
                217
            ],
            "lockedCollateralFormatted": [
                217
            ],
            "lockedCollateralRaw": [
                295
            ],
            "remainingDebtFormatted": [
                217
            ],
            "remainingDebtRaw": [
                295
            ],
            "status": [
                291
            ],
            "timestamp": [
                295
            ],
            "transactionHash": [
                217
            ],
            "__typename": [
                217
            ]
        },
        "LoanStatusHistory_aggregate_order_by": {
            "avg": [
                59
            ],
            "count": [
                297
            ],
            "max": [
                61
            ],
            "min": [
                62
            ],
            "stddev": [
                65
            ],
            "stddev_pop": [
                66
            ],
            "stddev_samp": [
                67
            ],
            "sum": [
                70
            ],
            "var_pop": [
                71
            ],
            "var_samp": [
                72
            ],
            "variance": [
                73
            ],
            "__typename": [
                217
            ]
        },
        "LoanStatusHistory_avg_order_by": {
            "lockedCollateralRaw": [
                297
            ],
            "remainingDebtRaw": [
                297
            ],
            "timestamp": [
                297
            ],
            "__typename": [
                217
            ]
        },
        "LoanStatusHistory_bool_exp": {
            "_and": [
                60
            ],
            "_not": [
                60
            ],
            "_or": [
                60
            ],
            "db_write_timestamp": [
                317
            ],
            "id": [
                218
            ],
            "loan_id": [
                218
            ],
            "lockedCollateralFormatted": [
                218
            ],
            "lockedCollateralRaw": [
                296
            ],
            "remainingDebtFormatted": [
                218
            ],
            "remainingDebtRaw": [
                296
            ],
            "status": [
                292
            ],
            "timestamp": [
                296
            ],
            "transactionHash": [
                218
            ],
            "__typename": [
                217
            ]
        },
        "LoanStatusHistory_max_order_by": {
            "db_write_timestamp": [
                297
            ],
            "id": [
                297
            ],
            "loan_id": [
                297
            ],
            "lockedCollateralFormatted": [
                297
            ],
            "lockedCollateralRaw": [
                297
            ],
            "remainingDebtFormatted": [
                297
            ],
            "remainingDebtRaw": [
                297
            ],
            "status": [
                297
            ],
            "timestamp": [
                297
            ],
            "transactionHash": [
                297
            ],
            "__typename": [
                217
            ]
        },
        "LoanStatusHistory_min_order_by": {
            "db_write_timestamp": [
                297
            ],
            "id": [
                297
            ],
            "loan_id": [
                297
            ],
            "lockedCollateralFormatted": [
                297
            ],
            "lockedCollateralRaw": [
                297
            ],
            "remainingDebtFormatted": [
                297
            ],
            "remainingDebtRaw": [
                297
            ],
            "status": [
                297
            ],
            "timestamp": [
                297
            ],
            "transactionHash": [
                297
            ],
            "__typename": [
                217
            ]
        },
        "LoanStatusHistory_order_by": {
            "db_write_timestamp": [
                297
            ],
            "id": [
                297
            ],
            "loan_id": [
                297
            ],
            "lockedCollateralFormatted": [
                297
            ],
            "lockedCollateralRaw": [
                297
            ],
            "remainingDebtFormatted": [
                297
            ],
            "remainingDebtRaw": [
                297
            ],
            "status": [
                297
            ],
            "timestamp": [
                297
            ],
            "transactionHash": [
                297
            ],
            "__typename": [
                217
            ]
        },
        "LoanStatusHistory_select_column": {},
        "LoanStatusHistory_stddev_order_by": {
            "lockedCollateralRaw": [
                297
            ],
            "remainingDebtRaw": [
                297
            ],
            "timestamp": [
                297
            ],
            "__typename": [
                217
            ]
        },
        "LoanStatusHistory_stddev_pop_order_by": {
            "lockedCollateralRaw": [
                297
            ],
            "remainingDebtRaw": [
                297
            ],
            "timestamp": [
                297
            ],
            "__typename": [
                217
            ]
        },
        "LoanStatusHistory_stddev_samp_order_by": {
            "lockedCollateralRaw": [
                297
            ],
            "remainingDebtRaw": [
                297
            ],
            "timestamp": [
                297
            ],
            "__typename": [
                217
            ]
        },
        "LoanStatusHistory_stream_cursor_input": {
            "initial_value": [
                69
            ],
            "ordering": [
                269
            ],
            "__typename": [
                217
            ]
        },
        "LoanStatusHistory_stream_cursor_value_input": {
            "db_write_timestamp": [
                316
            ],
            "id": [
                217
            ],
            "loan_id": [
                217
            ],
            "lockedCollateralFormatted": [
                217
            ],
            "lockedCollateralRaw": [
                295
            ],
            "remainingDebtFormatted": [
                217
            ],
            "remainingDebtRaw": [
                295
            ],
            "status": [
                291
            ],
            "timestamp": [
                295
            ],
            "transactionHash": [
                217
            ],
            "__typename": [
                217
            ]
        },
        "LoanStatusHistory_sum_order_by": {
            "lockedCollateralRaw": [
                297
            ],
            "remainingDebtRaw": [
                297
            ],
            "timestamp": [
                297
            ],
            "__typename": [
                217
            ]
        },
        "LoanStatusHistory_var_pop_order_by": {
            "lockedCollateralRaw": [
                297
            ],
            "remainingDebtRaw": [
                297
            ],
            "timestamp": [
                297
            ],
            "__typename": [
                217
            ]
        },
        "LoanStatusHistory_var_samp_order_by": {
            "lockedCollateralRaw": [
                297
            ],
            "remainingDebtRaw": [
                297
            ],
            "timestamp": [
                297
            ],
            "__typename": [
                217
            ]
        },
        "LoanStatusHistory_variance_order_by": {
            "lockedCollateralRaw": [
                297
            ],
            "remainingDebtRaw": [
                297
            ],
            "timestamp": [
                297
            ],
            "__typename": [
                217
            ]
        },
        "Loan_aggregate_order_by": {
            "avg": [
                75
            ],
            "count": [
                297
            ],
            "max": [
                77
            ],
            "min": [
                78
            ],
            "stddev": [
                81
            ],
            "stddev_pop": [
                82
            ],
            "stddev_samp": [
                83
            ],
            "sum": [
                86
            ],
            "var_pop": [
                87
            ],
            "var_samp": [
                88
            ],
            "variance": [
                89
            ],
            "__typename": [
                217
            ]
        },
        "Loan_avg_order_by": {
            "borrowAmountRaw": [
                297
            ],
            "closedAt": [
                297
            ],
            "floorPriceAtBorrowRaw": [
                297
            ],
            "lastUpdatedAt": [
                297
            ],
            "lockedCollateralRaw": [
                297
            ],
            "openedAt": [
                297
            ],
            "originationFeeRaw": [
                297
            ],
            "remainingDebtRaw": [
                297
            ],
            "__typename": [
                217
            ]
        },
        "Loan_bool_exp": {
            "_and": [
                76
            ],
            "_not": [
                76
            ],
            "_or": [
                76
            ],
            "borrowAmountFormatted": [
                218
            ],
            "borrowAmountRaw": [
                296
            ],
            "borrower_id": [
                218
            ],
            "closedAt": [
                296
            ],
            "db_write_timestamp": [
                317
            ],
            "facility_id": [
                218
            ],
            "floorPriceAtBorrowFormatted": [
                218
            ],
            "floorPriceAtBorrowRaw": [
                296
            ],
            "id": [
                218
            ],
            "lastUpdatedAt": [
                296
            ],
            "lockedCollateralFormatted": [
                218
            ],
            "lockedCollateralRaw": [
                296
            ],
            "market_id": [
                218
            ],
            "openedAt": [
                296
            ],
            "originationFeeFormatted": [
                218
            ],
            "originationFeeRaw": [
                296
            ],
            "remainingDebtFormatted": [
                218
            ],
            "remainingDebtRaw": [
                296
            ],
            "status": [
                292
            ],
            "statusHistory": [
                60
            ],
            "transactionHash": [
                218
            ],
            "__typename": [
                217
            ]
        },
        "Loan_max_order_by": {
            "borrowAmountFormatted": [
                297
            ],
            "borrowAmountRaw": [
                297
            ],
            "borrower_id": [
                297
            ],
            "closedAt": [
                297
            ],
            "db_write_timestamp": [
                297
            ],
            "facility_id": [
                297
            ],
            "floorPriceAtBorrowFormatted": [
                297
            ],
            "floorPriceAtBorrowRaw": [
                297
            ],
            "id": [
                297
            ],
            "lastUpdatedAt": [
                297
            ],
            "lockedCollateralFormatted": [
                297
            ],
            "lockedCollateralRaw": [
                297
            ],
            "market_id": [
                297
            ],
            "openedAt": [
                297
            ],
            "originationFeeFormatted": [
                297
            ],
            "originationFeeRaw": [
                297
            ],
            "remainingDebtFormatted": [
                297
            ],
            "remainingDebtRaw": [
                297
            ],
            "status": [
                297
            ],
            "transactionHash": [
                297
            ],
            "__typename": [
                217
            ]
        },
        "Loan_min_order_by": {
            "borrowAmountFormatted": [
                297
            ],
            "borrowAmountRaw": [
                297
            ],
            "borrower_id": [
                297
            ],
            "closedAt": [
                297
            ],
            "db_write_timestamp": [
                297
            ],
            "facility_id": [
                297
            ],
            "floorPriceAtBorrowFormatted": [
                297
            ],
            "floorPriceAtBorrowRaw": [
                297
            ],
            "id": [
                297
            ],
            "lastUpdatedAt": [
                297
            ],
            "lockedCollateralFormatted": [
                297
            ],
            "lockedCollateralRaw": [
                297
            ],
            "market_id": [
                297
            ],
            "openedAt": [
                297
            ],
            "originationFeeFormatted": [
                297
            ],
            "originationFeeRaw": [
                297
            ],
            "remainingDebtFormatted": [
                297
            ],
            "remainingDebtRaw": [
                297
            ],
            "status": [
                297
            ],
            "transactionHash": [
                297
            ],
            "__typename": [
                217
            ]
        },
        "Loan_order_by": {
            "borrowAmountFormatted": [
                297
            ],
            "borrowAmountRaw": [
                297
            ],
            "borrower_id": [
                297
            ],
            "closedAt": [
                297
            ],
            "db_write_timestamp": [
                297
            ],
            "facility_id": [
                297
            ],
            "floorPriceAtBorrowFormatted": [
                297
            ],
            "floorPriceAtBorrowRaw": [
                297
            ],
            "id": [
                297
            ],
            "lastUpdatedAt": [
                297
            ],
            "lockedCollateralFormatted": [
                297
            ],
            "lockedCollateralRaw": [
                297
            ],
            "market_id": [
                297
            ],
            "openedAt": [
                297
            ],
            "originationFeeFormatted": [
                297
            ],
            "originationFeeRaw": [
                297
            ],
            "remainingDebtFormatted": [
                297
            ],
            "remainingDebtRaw": [
                297
            ],
            "status": [
                297
            ],
            "statusHistory_aggregate": [
                58
            ],
            "transactionHash": [
                297
            ],
            "__typename": [
                217
            ]
        },
        "Loan_select_column": {},
        "Loan_stddev_order_by": {
            "borrowAmountRaw": [
                297
            ],
            "closedAt": [
                297
            ],
            "floorPriceAtBorrowRaw": [
                297
            ],
            "lastUpdatedAt": [
                297
            ],
            "lockedCollateralRaw": [
                297
            ],
            "openedAt": [
                297
            ],
            "originationFeeRaw": [
                297
            ],
            "remainingDebtRaw": [
                297
            ],
            "__typename": [
                217
            ]
        },
        "Loan_stddev_pop_order_by": {
            "borrowAmountRaw": [
                297
            ],
            "closedAt": [
                297
            ],
            "floorPriceAtBorrowRaw": [
                297
            ],
            "lastUpdatedAt": [
                297
            ],
            "lockedCollateralRaw": [
                297
            ],
            "openedAt": [
                297
            ],
            "originationFeeRaw": [
                297
            ],
            "remainingDebtRaw": [
                297
            ],
            "__typename": [
                217
            ]
        },
        "Loan_stddev_samp_order_by": {
            "borrowAmountRaw": [
                297
            ],
            "closedAt": [
                297
            ],
            "floorPriceAtBorrowRaw": [
                297
            ],
            "lastUpdatedAt": [
                297
            ],
            "lockedCollateralRaw": [
                297
            ],
            "openedAt": [
                297
            ],
            "originationFeeRaw": [
                297
            ],
            "remainingDebtRaw": [
                297
            ],
            "__typename": [
                217
            ]
        },
        "Loan_stream_cursor_input": {
            "initial_value": [
                85
            ],
            "ordering": [
                269
            ],
            "__typename": [
                217
            ]
        },
        "Loan_stream_cursor_value_input": {
            "borrowAmountFormatted": [
                217
            ],
            "borrowAmountRaw": [
                295
            ],
            "borrower_id": [
                217
            ],
            "closedAt": [
                295
            ],
            "db_write_timestamp": [
                316
            ],
            "facility_id": [
                217
            ],
            "floorPriceAtBorrowFormatted": [
                217
            ],
            "floorPriceAtBorrowRaw": [
                295
            ],
            "id": [
                217
            ],
            "lastUpdatedAt": [
                295
            ],
            "lockedCollateralFormatted": [
                217
            ],
            "lockedCollateralRaw": [
                295
            ],
            "market_id": [
                217
            ],
            "openedAt": [
                295
            ],
            "originationFeeFormatted": [
                217
            ],
            "originationFeeRaw": [
                295
            ],
            "remainingDebtFormatted": [
                217
            ],
            "remainingDebtRaw": [
                295
            ],
            "status": [
                291
            ],
            "transactionHash": [
                217
            ],
            "__typename": [
                217
            ]
        },
        "Loan_sum_order_by": {
            "borrowAmountRaw": [
                297
            ],
            "closedAt": [
                297
            ],
            "floorPriceAtBorrowRaw": [
                297
            ],
            "lastUpdatedAt": [
                297
            ],
            "lockedCollateralRaw": [
                297
            ],
            "openedAt": [
                297
            ],
            "originationFeeRaw": [
                297
            ],
            "remainingDebtRaw": [
                297
            ],
            "__typename": [
                217
            ]
        },
        "Loan_var_pop_order_by": {
            "borrowAmountRaw": [
                297
            ],
            "closedAt": [
                297
            ],
            "floorPriceAtBorrowRaw": [
                297
            ],
            "lastUpdatedAt": [
                297
            ],
            "lockedCollateralRaw": [
                297
            ],
            "openedAt": [
                297
            ],
            "originationFeeRaw": [
                297
            ],
            "remainingDebtRaw": [
                297
            ],
            "__typename": [
                217
            ]
        },
        "Loan_var_samp_order_by": {
            "borrowAmountRaw": [
                297
            ],
            "closedAt": [
                297
            ],
            "floorPriceAtBorrowRaw": [
                297
            ],
            "lastUpdatedAt": [
                297
            ],
            "lockedCollateralRaw": [
                297
            ],
            "openedAt": [
                297
            ],
            "originationFeeRaw": [
                297
            ],
            "remainingDebtRaw": [
                297
            ],
            "__typename": [
                217
            ]
        },
        "Loan_variance_order_by": {
            "borrowAmountRaw": [
                297
            ],
            "closedAt": [
                297
            ],
            "floorPriceAtBorrowRaw": [
                297
            ],
            "lastUpdatedAt": [
                297
            ],
            "lockedCollateralRaw": [
                297
            ],
            "openedAt": [
                297
            ],
            "originationFeeRaw": [
                297
            ],
            "remainingDebtRaw": [
                297
            ],
            "__typename": [
                217
            ]
        },
        "Market": {
            "buyFeeBps": [
                295
            ],
            "createdAt": [
                295
            ],
            "creator_id": [
                217
            ],
            "currentPriceFormatted": [
                217
            ],
            "currentPriceRaw": [
                295
            ],
            "db_write_timestamp": [
                316
            ],
            "factory_id": [
                217
            ],
            "feeDistributions": [
                14,
                {
                    "distinct_on": [
                        21,
                        "[FeeDistribution_select_column!]"
                    ],
                    "limit": [
                        54
                    ],
                    "offset": [
                        54
                    ],
                    "order_by": [
                        20,
                        "[FeeDistribution_order_by!]"
                    ],
                    "where": [
                        17
                    ]
                }
            ],
            "floorElevations": [
                31,
                {
                    "distinct_on": [
                        38,
                        "[FloorElevation_select_column!]"
                    ],
                    "limit": [
                        54
                    ],
                    "offset": [
                        54
                    ],
                    "order_by": [
                        37,
                        "[FloorElevation_order_by!]"
                    ],
                    "where": [
                        34
                    ]
                }
            ],
            "floorPriceFormatted": [
                217
            ],
            "floorPriceRaw": [
                295
            ],
            "floorSupplyFormatted": [
                217
            ],
            "floorSupplyRaw": [
                295
            ],
            "id": [
                217
            ],
            "initialFloorPriceFormatted": [
                217
            ],
            "initialFloorPriceRaw": [
                295
            ],
            "isBuyOpen": [
                6
            ],
            "isSellOpen": [
                6
            ],
            "issuanceToken": [
                219
            ],
            "issuanceToken_id": [
                217
            ],
            "lastElevationTimestamp": [
                295
            ],
            "lastTradeTimestamp": [
                295
            ],
            "lastUpdatedAt": [
                295
            ],
            "marketSupplyFormatted": [
                217
            ],
            "marketSupplyRaw": [
                295
            ],
            "maxLTV": [
                295
            ],
            "reserveToken": [
                219
            ],
            "reserveToken_id": [
                217
            ],
            "sellFeeBps": [
                295
            ],
            "status": [
                293
            ],
            "totalSupplyFormatted": [
                217
            ],
            "totalSupplyRaw": [
                295
            ],
            "trades": [
                225,
                {
                    "distinct_on": [
                        232,
                        "[Trade_select_column!]"
                    ],
                    "limit": [
                        54
                    ],
                    "offset": [
                        54
                    ],
                    "order_by": [
                        231,
                        "[Trade_order_by!]"
                    ],
                    "where": [
                        228
                    ]
                }
            ],
            "tradingFeeBps": [
                295
            ],
            "__typename": [
                217
            ]
        },
        "MarketRollingStats": {
            "averagePriceFormatted": [
                217
            ],
            "averagePriceRaw": [
                295
            ],
            "db_write_timestamp": [
                316
            ],
            "id": [
                217
            ],
            "lastUpdatedAt": [
                295
            ],
            "market_id": [
                217
            ],
            "tradeCount": [
                295
            ],
            "volumeFormatted": [
                217
            ],
            "volumeRaw": [
                295
            ],
            "windowSeconds": [
                54
            ],
            "__typename": [
                217
            ]
        },
        "MarketRollingStats_bool_exp": {
            "_and": [
                92
            ],
            "_not": [
                92
            ],
            "_or": [
                92
            ],
            "averagePriceFormatted": [
                218
            ],
            "averagePriceRaw": [
                296
            ],
            "db_write_timestamp": [
                317
            ],
            "id": [
                218
            ],
            "lastUpdatedAt": [
                296
            ],
            "market_id": [
                218
            ],
            "tradeCount": [
                296
            ],
            "volumeFormatted": [
                218
            ],
            "volumeRaw": [
                296
            ],
            "windowSeconds": [
                55
            ],
            "__typename": [
                217
            ]
        },
        "MarketRollingStats_order_by": {
            "averagePriceFormatted": [
                297
            ],
            "averagePriceRaw": [
                297
            ],
            "db_write_timestamp": [
                297
            ],
            "id": [
                297
            ],
            "lastUpdatedAt": [
                297
            ],
            "market_id": [
                297
            ],
            "tradeCount": [
                297
            ],
            "volumeFormatted": [
                297
            ],
            "volumeRaw": [
                297
            ],
            "windowSeconds": [
                297
            ],
            "__typename": [
                217
            ]
        },
        "MarketRollingStats_select_column": {},
        "MarketRollingStats_stream_cursor_input": {
            "initial_value": [
                96
            ],
            "ordering": [
                269
            ],
            "__typename": [
                217
            ]
        },
        "MarketRollingStats_stream_cursor_value_input": {
            "averagePriceFormatted": [
                217
            ],
            "averagePriceRaw": [
                295
            ],
            "db_write_timestamp": [
                316
            ],
            "id": [
                217
            ],
            "lastUpdatedAt": [
                295
            ],
            "market_id": [
                217
            ],
            "tradeCount": [
                295
            ],
            "volumeFormatted": [
                217
            ],
            "volumeRaw": [
                295
            ],
            "windowSeconds": [
                54
            ],
            "__typename": [
                217
            ]
        },
        "MarketSnapshot": {
            "db_write_timestamp": [
                316
            ],
            "floorPriceFormatted": [
                217
            ],
            "floorPriceRaw": [
                295
            ],
            "id": [
                217
            ],
            "marketSupplyFormatted": [
                217
            ],
            "marketSupplyRaw": [
                295
            ],
            "market_id": [
                217
            ],
            "priceFormatted": [
                217
            ],
            "priceRaw": [
                295
            ],
            "timestamp": [
                295
            ],
            "totalSupplyFormatted": [
                217
            ],
            "totalSupplyRaw": [
                295
            ],
            "trades24h": [
                295
            ],
            "volume24hFormatted": [
                217
            ],
            "volume24hRaw": [
                295
            ],
            "__typename": [
                217
            ]
        },
        "MarketSnapshot_bool_exp": {
            "_and": [
                98
            ],
            "_not": [
                98
            ],
            "_or": [
                98
            ],
            "db_write_timestamp": [
                317
            ],
            "floorPriceFormatted": [
                218
            ],
            "floorPriceRaw": [
                296
            ],
            "id": [
                218
            ],
            "marketSupplyFormatted": [
                218
            ],
            "marketSupplyRaw": [
                296
            ],
            "market_id": [
                218
            ],
            "priceFormatted": [
                218
            ],
            "priceRaw": [
                296
            ],
            "timestamp": [
                296
            ],
            "totalSupplyFormatted": [
                218
            ],
            "totalSupplyRaw": [
                296
            ],
            "trades24h": [
                296
            ],
            "volume24hFormatted": [
                218
            ],
            "volume24hRaw": [
                296
            ],
            "__typename": [
                217
            ]
        },
        "MarketSnapshot_order_by": {
            "db_write_timestamp": [
                297
            ],
            "floorPriceFormatted": [
                297
            ],
            "floorPriceRaw": [
                297
            ],
            "id": [
                297
            ],
            "marketSupplyFormatted": [
                297
            ],
            "marketSupplyRaw": [
                297
            ],
            "market_id": [
                297
            ],
            "priceFormatted": [
                297
            ],
            "priceRaw": [
                297
            ],
            "timestamp": [
                297
            ],
            "totalSupplyFormatted": [
                297
            ],
            "totalSupplyRaw": [
                297
            ],
            "trades24h": [
                297
            ],
            "volume24hFormatted": [
                297
            ],
            "volume24hRaw": [
                297
            ],
            "__typename": [
                217
            ]
        },
        "MarketSnapshot_select_column": {},
        "MarketSnapshot_stream_cursor_input": {
            "initial_value": [
                102
            ],
            "ordering": [
                269
            ],
            "__typename": [
                217
            ]
        },
        "MarketSnapshot_stream_cursor_value_input": {
            "db_write_timestamp": [
                316
            ],
            "floorPriceFormatted": [
                217
            ],
            "floorPriceRaw": [
                295
            ],
            "id": [
                217
            ],
            "marketSupplyFormatted": [
                217
            ],
            "marketSupplyRaw": [
                295
            ],
            "market_id": [
                217
            ],
            "priceFormatted": [
                217
            ],
            "priceRaw": [
                295
            ],
            "timestamp": [
                295
            ],
            "totalSupplyFormatted": [
                217
            ],
            "totalSupplyRaw": [
                295
            ],
            "trades24h": [
                295
            ],
            "volume24hFormatted": [
                217
            ],
            "volume24hRaw": [
                295
            ],
            "__typename": [
                217
            ]
        },
        "Market_aggregate_order_by": {
            "avg": [
                104
            ],
            "count": [
                297
            ],
            "max": [
                106
            ],
            "min": [
                107
            ],
            "stddev": [
                110
            ],
            "stddev_pop": [
                111
            ],
            "stddev_samp": [
                112
            ],
            "sum": [
                115
            ],
            "var_pop": [
                116
            ],
            "var_samp": [
                117
            ],
            "variance": [
                118
            ],
            "__typename": [
                217
            ]
        },
        "Market_avg_order_by": {
            "buyFeeBps": [
                297
            ],
            "createdAt": [
                297
            ],
            "currentPriceRaw": [
                297
            ],
            "floorPriceRaw": [
                297
            ],
            "floorSupplyRaw": [
                297
            ],
            "initialFloorPriceRaw": [
                297
            ],
            "lastElevationTimestamp": [
                297
            ],
            "lastTradeTimestamp": [
                297
            ],
            "lastUpdatedAt": [
                297
            ],
            "marketSupplyRaw": [
                297
            ],
            "maxLTV": [
                297
            ],
            "sellFeeBps": [
                297
            ],
            "totalSupplyRaw": [
                297
            ],
            "tradingFeeBps": [
                297
            ],
            "__typename": [
                217
            ]
        },
        "Market_bool_exp": {
            "_and": [
                105
            ],
            "_not": [
                105
            ],
            "_or": [
                105
            ],
            "buyFeeBps": [
                296
            ],
            "createdAt": [
                296
            ],
            "creator_id": [
                218
            ],
            "currentPriceFormatted": [
                218
            ],
            "currentPriceRaw": [
                296
            ],
            "db_write_timestamp": [
                317
            ],
            "factory_id": [
                218
            ],
            "feeDistributions": [
                17
            ],
            "floorElevations": [
                34
            ],
            "floorPriceFormatted": [
                218
            ],
            "floorPriceRaw": [
                296
            ],
            "floorSupplyFormatted": [
                218
            ],
            "floorSupplyRaw": [
                296
            ],
            "id": [
                218
            ],
            "initialFloorPriceFormatted": [
                218
            ],
            "initialFloorPriceRaw": [
                296
            ],
            "isBuyOpen": [
                7
            ],
            "isSellOpen": [
                7
            ],
            "issuanceToken": [
                220
            ],
            "issuanceToken_id": [
                218
            ],
            "lastElevationTimestamp": [
                296
            ],
            "lastTradeTimestamp": [
                296
            ],
            "lastUpdatedAt": [
                296
            ],
            "marketSupplyFormatted": [
                218
            ],
            "marketSupplyRaw": [
                296
            ],
            "maxLTV": [
                296
            ],
            "reserveToken": [
                220
            ],
            "reserveToken_id": [
                218
            ],
            "sellFeeBps": [
                296
            ],
            "status": [
                294
            ],
            "totalSupplyFormatted": [
                218
            ],
            "totalSupplyRaw": [
                296
            ],
            "trades": [
                228
            ],
            "tradingFeeBps": [
                296
            ],
            "__typename": [
                217
            ]
        },
        "Market_max_order_by": {
            "buyFeeBps": [
                297
            ],
            "createdAt": [
                297
            ],
            "creator_id": [
                297
            ],
            "currentPriceFormatted": [
                297
            ],
            "currentPriceRaw": [
                297
            ],
            "db_write_timestamp": [
                297
            ],
            "factory_id": [
                297
            ],
            "floorPriceFormatted": [
                297
            ],
            "floorPriceRaw": [
                297
            ],
            "floorSupplyFormatted": [
                297
            ],
            "floorSupplyRaw": [
                297
            ],
            "id": [
                297
            ],
            "initialFloorPriceFormatted": [
                297
            ],
            "initialFloorPriceRaw": [
                297
            ],
            "issuanceToken_id": [
                297
            ],
            "lastElevationTimestamp": [
                297
            ],
            "lastTradeTimestamp": [
                297
            ],
            "lastUpdatedAt": [
                297
            ],
            "marketSupplyFormatted": [
                297
            ],
            "marketSupplyRaw": [
                297
            ],
            "maxLTV": [
                297
            ],
            "reserveToken_id": [
                297
            ],
            "sellFeeBps": [
                297
            ],
            "status": [
                297
            ],
            "totalSupplyFormatted": [
                297
            ],
            "totalSupplyRaw": [
                297
            ],
            "tradingFeeBps": [
                297
            ],
            "__typename": [
                217
            ]
        },
        "Market_min_order_by": {
            "buyFeeBps": [
                297
            ],
            "createdAt": [
                297
            ],
            "creator_id": [
                297
            ],
            "currentPriceFormatted": [
                297
            ],
            "currentPriceRaw": [
                297
            ],
            "db_write_timestamp": [
                297
            ],
            "factory_id": [
                297
            ],
            "floorPriceFormatted": [
                297
            ],
            "floorPriceRaw": [
                297
            ],
            "floorSupplyFormatted": [
                297
            ],
            "floorSupplyRaw": [
                297
            ],
            "id": [
                297
            ],
            "initialFloorPriceFormatted": [
                297
            ],
            "initialFloorPriceRaw": [
                297
            ],
            "issuanceToken_id": [
                297
            ],
            "lastElevationTimestamp": [
                297
            ],
            "lastTradeTimestamp": [
                297
            ],
            "lastUpdatedAt": [
                297
            ],
            "marketSupplyFormatted": [
                297
            ],
            "marketSupplyRaw": [
                297
            ],
            "maxLTV": [
                297
            ],
            "reserveToken_id": [
                297
            ],
            "sellFeeBps": [
                297
            ],
            "status": [
                297
            ],
            "totalSupplyFormatted": [
                297
            ],
            "totalSupplyRaw": [
                297
            ],
            "tradingFeeBps": [
                297
            ],
            "__typename": [
                217
            ]
        },
        "Market_order_by": {
            "buyFeeBps": [
                297
            ],
            "createdAt": [
                297
            ],
            "creator_id": [
                297
            ],
            "currentPriceFormatted": [
                297
            ],
            "currentPriceRaw": [
                297
            ],
            "db_write_timestamp": [
                297
            ],
            "factory_id": [
                297
            ],
            "feeDistributions_aggregate": [
                15
            ],
            "floorElevations_aggregate": [
                32
            ],
            "floorPriceFormatted": [
                297
            ],
            "floorPriceRaw": [
                297
            ],
            "floorSupplyFormatted": [
                297
            ],
            "floorSupplyRaw": [
                297
            ],
            "id": [
                297
            ],
            "initialFloorPriceFormatted": [
                297
            ],
            "initialFloorPriceRaw": [
                297
            ],
            "isBuyOpen": [
                297
            ],
            "isSellOpen": [
                297
            ],
            "issuanceToken": [
                221
            ],
            "issuanceToken_id": [
                297
            ],
            "lastElevationTimestamp": [
                297
            ],
            "lastTradeTimestamp": [
                297
            ],
            "lastUpdatedAt": [
                297
            ],
            "marketSupplyFormatted": [
                297
            ],
            "marketSupplyRaw": [
                297
            ],
            "maxLTV": [
                297
            ],
            "reserveToken": [
                221
            ],
            "reserveToken_id": [
                297
            ],
            "sellFeeBps": [
                297
            ],
            "status": [
                297
            ],
            "totalSupplyFormatted": [
                297
            ],
            "totalSupplyRaw": [
                297
            ],
            "trades_aggregate": [
                226
            ],
            "tradingFeeBps": [
                297
            ],
            "__typename": [
                217
            ]
        },
        "Market_select_column": {},
        "Market_stddev_order_by": {
            "buyFeeBps": [
                297
            ],
            "createdAt": [
                297
            ],
            "currentPriceRaw": [
                297
            ],
            "floorPriceRaw": [
                297
            ],
            "floorSupplyRaw": [
                297
            ],
            "initialFloorPriceRaw": [
                297
            ],
            "lastElevationTimestamp": [
                297
            ],
            "lastTradeTimestamp": [
                297
            ],
            "lastUpdatedAt": [
                297
            ],
            "marketSupplyRaw": [
                297
            ],
            "maxLTV": [
                297
            ],
            "sellFeeBps": [
                297
            ],
            "totalSupplyRaw": [
                297
            ],
            "tradingFeeBps": [
                297
            ],
            "__typename": [
                217
            ]
        },
        "Market_stddev_pop_order_by": {
            "buyFeeBps": [
                297
            ],
            "createdAt": [
                297
            ],
            "currentPriceRaw": [
                297
            ],
            "floorPriceRaw": [
                297
            ],
            "floorSupplyRaw": [
                297
            ],
            "initialFloorPriceRaw": [
                297
            ],
            "lastElevationTimestamp": [
                297
            ],
            "lastTradeTimestamp": [
                297
            ],
            "lastUpdatedAt": [
                297
            ],
            "marketSupplyRaw": [
                297
            ],
            "maxLTV": [
                297
            ],
            "sellFeeBps": [
                297
            ],
            "totalSupplyRaw": [
                297
            ],
            "tradingFeeBps": [
                297
            ],
            "__typename": [
                217
            ]
        },
        "Market_stddev_samp_order_by": {
            "buyFeeBps": [
                297
            ],
            "createdAt": [
                297
            ],
            "currentPriceRaw": [
                297
            ],
            "floorPriceRaw": [
                297
            ],
            "floorSupplyRaw": [
                297
            ],
            "initialFloorPriceRaw": [
                297
            ],
            "lastElevationTimestamp": [
                297
            ],
            "lastTradeTimestamp": [
                297
            ],
            "lastUpdatedAt": [
                297
            ],
            "marketSupplyRaw": [
                297
            ],
            "maxLTV": [
                297
            ],
            "sellFeeBps": [
                297
            ],
            "totalSupplyRaw": [
                297
            ],
            "tradingFeeBps": [
                297
            ],
            "__typename": [
                217
            ]
        },
        "Market_stream_cursor_input": {
            "initial_value": [
                114
            ],
            "ordering": [
                269
            ],
            "__typename": [
                217
            ]
        },
        "Market_stream_cursor_value_input": {
            "buyFeeBps": [
                295
            ],
            "createdAt": [
                295
            ],
            "creator_id": [
                217
            ],
            "currentPriceFormatted": [
                217
            ],
            "currentPriceRaw": [
                295
            ],
            "db_write_timestamp": [
                316
            ],
            "factory_id": [
                217
            ],
            "floorPriceFormatted": [
                217
            ],
            "floorPriceRaw": [
                295
            ],
            "floorSupplyFormatted": [
                217
            ],
            "floorSupplyRaw": [
                295
            ],
            "id": [
                217
            ],
            "initialFloorPriceFormatted": [
                217
            ],
            "initialFloorPriceRaw": [
                295
            ],
            "isBuyOpen": [
                6
            ],
            "isSellOpen": [
                6
            ],
            "issuanceToken_id": [
                217
            ],
            "lastElevationTimestamp": [
                295
            ],
            "lastTradeTimestamp": [
                295
            ],
            "lastUpdatedAt": [
                295
            ],
            "marketSupplyFormatted": [
                217
            ],
            "marketSupplyRaw": [
                295
            ],
            "maxLTV": [
                295
            ],
            "reserveToken_id": [
                217
            ],
            "sellFeeBps": [
                295
            ],
            "status": [
                293
            ],
            "totalSupplyFormatted": [
                217
            ],
            "totalSupplyRaw": [
                295
            ],
            "tradingFeeBps": [
                295
            ],
            "__typename": [
                217
            ]
        },
        "Market_sum_order_by": {
            "buyFeeBps": [
                297
            ],
            "createdAt": [
                297
            ],
            "currentPriceRaw": [
                297
            ],
            "floorPriceRaw": [
                297
            ],
            "floorSupplyRaw": [
                297
            ],
            "initialFloorPriceRaw": [
                297
            ],
            "lastElevationTimestamp": [
                297
            ],
            "lastTradeTimestamp": [
                297
            ],
            "lastUpdatedAt": [
                297
            ],
            "marketSupplyRaw": [
                297
            ],
            "maxLTV": [
                297
            ],
            "sellFeeBps": [
                297
            ],
            "totalSupplyRaw": [
                297
            ],
            "tradingFeeBps": [
                297
            ],
            "__typename": [
                217
            ]
        },
        "Market_var_pop_order_by": {
            "buyFeeBps": [
                297
            ],
            "createdAt": [
                297
            ],
            "currentPriceRaw": [
                297
            ],
            "floorPriceRaw": [
                297
            ],
            "floorSupplyRaw": [
                297
            ],
            "initialFloorPriceRaw": [
                297
            ],
            "lastElevationTimestamp": [
                297
            ],
            "lastTradeTimestamp": [
                297
            ],
            "lastUpdatedAt": [
                297
            ],
            "marketSupplyRaw": [
                297
            ],
            "maxLTV": [
                297
            ],
            "sellFeeBps": [
                297
            ],
            "totalSupplyRaw": [
                297
            ],
            "tradingFeeBps": [
                297
            ],
            "__typename": [
                217
            ]
        },
        "Market_var_samp_order_by": {
            "buyFeeBps": [
                297
            ],
            "createdAt": [
                297
            ],
            "currentPriceRaw": [
                297
            ],
            "floorPriceRaw": [
                297
            ],
            "floorSupplyRaw": [
                297
            ],
            "initialFloorPriceRaw": [
                297
            ],
            "lastElevationTimestamp": [
                297
            ],
            "lastTradeTimestamp": [
                297
            ],
            "lastUpdatedAt": [
                297
            ],
            "marketSupplyRaw": [
                297
            ],
            "maxLTV": [
                297
            ],
            "sellFeeBps": [
                297
            ],
            "totalSupplyRaw": [
                297
            ],
            "tradingFeeBps": [
                297
            ],
            "__typename": [
                217
            ]
        },
        "Market_variance_order_by": {
            "buyFeeBps": [
                297
            ],
            "createdAt": [
                297
            ],
            "currentPriceRaw": [
                297
            ],
            "floorPriceRaw": [
                297
            ],
            "floorSupplyRaw": [
                297
            ],
            "initialFloorPriceRaw": [
                297
            ],
            "lastElevationTimestamp": [
                297
            ],
            "lastTradeTimestamp": [
                297
            ],
            "lastUpdatedAt": [
                297
            ],
            "marketSupplyRaw": [
                297
            ],
            "maxLTV": [
                297
            ],
            "sellFeeBps": [
                297
            ],
            "totalSupplyRaw": [
                297
            ],
            "tradingFeeBps": [
                297
            ],
            "__typename": [
                217
            ]
        },
        "ModuleAddress": {
            "createdAt": [
                295
            ],
            "db_write_timestamp": [
                316
            ],
            "id": [
                217
            ],
            "lastUpdatedAt": [
                295
            ],
            "market_id": [
                217
            ],
            "moduleType": [
                217
            ],
            "__typename": [
                217
            ]
        },
        "ModuleAddress_bool_exp": {
            "_and": [
                120
            ],
            "_not": [
                120
            ],
            "_or": [
                120
            ],
            "createdAt": [
                296
            ],
            "db_write_timestamp": [
                317
            ],
            "id": [
                218
            ],
            "lastUpdatedAt": [
                296
            ],
            "market_id": [
                218
            ],
            "moduleType": [
                218
            ],
            "__typename": [
                217
            ]
        },
        "ModuleAddress_order_by": {
            "createdAt": [
                297
            ],
            "db_write_timestamp": [
                297
            ],
            "id": [
                297
            ],
            "lastUpdatedAt": [
                297
            ],
            "market_id": [
                297
            ],
            "moduleType": [
                297
            ],
            "__typename": [
                217
            ]
        },
        "ModuleAddress_select_column": {},
        "ModuleAddress_stream_cursor_input": {
            "initial_value": [
                124
            ],
            "ordering": [
                269
            ],
            "__typename": [
                217
            ]
        },
        "ModuleAddress_stream_cursor_value_input": {
            "createdAt": [
                295
            ],
            "db_write_timestamp": [
                316
            ],
            "id": [
                217
            ],
            "lastUpdatedAt": [
                295
            ],
            "market_id": [
                217
            ],
            "moduleType": [
                217
            ],
            "__typename": [
                217
            ]
        },
        "ModuleRegistry": {
            "authorizer": [
                217
            ],
            "createdAt": [
                295
            ],
            "creditFacility": [
                217
            ],
            "db_write_timestamp": [
                316
            ],
            "feeTreasury": [
                217
            ],
            "floor": [
                217
            ],
            "id": [
                217
            ],
            "lastUpdatedAt": [
                295
            ],
            "presale": [
                217
            ],
            "staking": [
                217
            ],
            "__typename": [
                217
            ]
        },
        "ModuleRegistry_bool_exp": {
            "_and": [
                126
            ],
            "_not": [
                126
            ],
            "_or": [
                126
            ],
            "authorizer": [
                218
            ],
            "createdAt": [
                296
            ],
            "creditFacility": [
                218
            ],
            "db_write_timestamp": [
                317
            ],
            "feeTreasury": [
                218
            ],
            "floor": [
                218
            ],
            "id": [
                218
            ],
            "lastUpdatedAt": [
                296
            ],
            "presale": [
                218
            ],
            "staking": [
                218
            ],
            "__typename": [
                217
            ]
        },
        "ModuleRegistry_order_by": {
            "authorizer": [
                297
            ],
            "createdAt": [
                297
            ],
            "creditFacility": [
                297
            ],
            "db_write_timestamp": [
                297
            ],
            "feeTreasury": [
                297
            ],
            "floor": [
                297
            ],
            "id": [
                297
            ],
            "lastUpdatedAt": [
                297
            ],
            "presale": [
                297
            ],
            "staking": [
                297
            ],
            "__typename": [
                217
            ]
        },
        "ModuleRegistry_select_column": {},
        "ModuleRegistry_stream_cursor_input": {
            "initial_value": [
                130
            ],
            "ordering": [
                269
            ],
            "__typename": [
                217
            ]
        },
        "ModuleRegistry_stream_cursor_value_input": {
            "authorizer": [
                217
            ],
            "createdAt": [
                295
            ],
            "creditFacility": [
                217
            ],
            "db_write_timestamp": [
                316
            ],
            "feeTreasury": [
                217
            ],
            "floor": [
                217
            ],
            "id": [
                217
            ],
            "lastUpdatedAt": [
                295
            ],
            "presale": [
                217
            ],
            "staking": [
                217
            ],
            "__typename": [
                217
            ]
        },
        "PreSaleContract": {
            "claims": [
                137,
                {
                    "distinct_on": [
                        144,
                        "[PresaleClaim_select_column!]"
                    ],
                    "limit": [
                        54
                    ],
                    "offset": [
                        54
                    ],
                    "order_by": [
                        143,
                        "[PresaleClaim_order_by!]"
                    ],
                    "where": [
                        140
                    ]
                }
            ],
            "commissionBpsJson": [
                217
            ],
            "configEvents": [
                154,
                {
                    "distinct_on": [
                        161,
                        "[PresaleConfigEvent_select_column!]"
                    ],
                    "limit": [
                        54
                    ],
                    "offset": [
                        54
                    ],
                    "order_by": [
                        160,
                        "[PresaleConfigEvent_order_by!]"
                    ],
                    "where": [
                        157
                    ]
                }
            ],
            "createdAt": [
                295
            ],
            "currentState": [
                54
            ],
            "db_write_timestamp": [
                316
            ],
            "endTime": [
                295
            ],
            "globalDepositCapFormatted": [
                217
            ],
            "globalDepositCapRaw": [
                295
            ],
            "id": [
                217
            ],
            "lastUpdatedAt": [
                295
            ],
            "lendingFacility": [
                217
            ],
            "market_id": [
                217
            ],
            "maxLeverage": [
                295
            ],
            "participations": [
                171,
                {
                    "distinct_on": [
                        178,
                        "[PresaleParticipation_select_column!]"
                    ],
                    "limit": [
                        54
                    ],
                    "offset": [
                        54
                    ],
                    "order_by": [
                        177,
                        "[PresaleParticipation_order_by!]"
                    ],
                    "where": [
                        174
                    ]
                }
            ],
            "perAddressDepositCapFormatted": [
                217
            ],
            "perAddressDepositCapRaw": [
                295
            ],
            "priceBreakpointsJson": [
                217
            ],
            "purchaseToken_id": [
                217
            ],
            "saleToken_id": [
                217
            ],
            "startTime": [
                295
            ],
            "timeSafeguardTs": [
                295
            ],
            "totalParticipants": [
                295
            ],
            "totalRaisedFormatted": [
                217
            ],
            "totalRaisedRaw": [
                295
            ],
            "whitelistSize": [
                295
            ],
            "__typename": [
                217
            ]
        },
        "PreSaleContract_bool_exp": {
            "_and": [
                132
            ],
            "_not": [
                132
            ],
            "_or": [
                132
            ],
            "claims": [
                140
            ],
            "commissionBpsJson": [
                218
            ],
            "configEvents": [
                157
            ],
            "createdAt": [
                296
            ],
            "currentState": [
                55
            ],
            "db_write_timestamp": [
                317
            ],
            "endTime": [
                296
            ],
            "globalDepositCapFormatted": [
                218
            ],
            "globalDepositCapRaw": [
                296
            ],
            "id": [
                218
            ],
            "lastUpdatedAt": [
                296
            ],
            "lendingFacility": [
                218
            ],
            "market_id": [
                218
            ],
            "maxLeverage": [
                296
            ],
            "participations": [
                174
            ],
            "perAddressDepositCapFormatted": [
                218
            ],
            "perAddressDepositCapRaw": [
                296
            ],
            "priceBreakpointsJson": [
                218
            ],
            "purchaseToken_id": [
                218
            ],
            "saleToken_id": [
                218
            ],
            "startTime": [
                296
            ],
            "timeSafeguardTs": [
                296
            ],
            "totalParticipants": [
                296
            ],
            "totalRaisedFormatted": [
                218
            ],
            "totalRaisedRaw": [
                296
            ],
            "whitelistSize": [
                296
            ],
            "__typename": [
                217
            ]
        },
        "PreSaleContract_order_by": {
            "claims_aggregate": [
                138
            ],
            "commissionBpsJson": [
                297
            ],
            "configEvents_aggregate": [
                155
            ],
            "createdAt": [
                297
            ],
            "currentState": [
                297
            ],
            "db_write_timestamp": [
                297
            ],
            "endTime": [
                297
            ],
            "globalDepositCapFormatted": [
                297
            ],
            "globalDepositCapRaw": [
                297
            ],
            "id": [
                297
            ],
            "lastUpdatedAt": [
                297
            ],
            "lendingFacility": [
                297
            ],
            "market_id": [
                297
            ],
            "maxLeverage": [
                297
            ],
            "participations_aggregate": [
                172
            ],
            "perAddressDepositCapFormatted": [
                297
            ],
            "perAddressDepositCapRaw": [
                297
            ],
            "priceBreakpointsJson": [
                297
            ],
            "purchaseToken_id": [
                297
            ],
            "saleToken_id": [
                297
            ],
            "startTime": [
                297
            ],
            "timeSafeguardTs": [
                297
            ],
            "totalParticipants": [
                297
            ],
            "totalRaisedFormatted": [
                297
            ],
            "totalRaisedRaw": [
                297
            ],
            "whitelistSize": [
                297
            ],
            "__typename": [
                217
            ]
        },
        "PreSaleContract_select_column": {},
        "PreSaleContract_stream_cursor_input": {
            "initial_value": [
                136
            ],
            "ordering": [
                269
            ],
            "__typename": [
                217
            ]
        },
        "PreSaleContract_stream_cursor_value_input": {
            "commissionBpsJson": [
                217
            ],
            "createdAt": [
                295
            ],
            "currentState": [
                54
            ],
            "db_write_timestamp": [
                316
            ],
            "endTime": [
                295
            ],
            "globalDepositCapFormatted": [
                217
            ],
            "globalDepositCapRaw": [
                295
            ],
            "id": [
                217
            ],
            "lastUpdatedAt": [
                295
            ],
            "lendingFacility": [
                217
            ],
            "market_id": [
                217
            ],
            "maxLeverage": [
                295
            ],
            "perAddressDepositCapFormatted": [
                217
            ],
            "perAddressDepositCapRaw": [
                295
            ],
            "priceBreakpointsJson": [
                217
            ],
            "purchaseToken_id": [
                217
            ],
            "saleToken_id": [
                217
            ],
            "startTime": [
                295
            ],
            "timeSafeguardTs": [
                295
            ],
            "totalParticipants": [
                295
            ],
            "totalRaisedFormatted": [
                217
            ],
            "totalRaisedRaw": [
                295
            ],
            "whitelistSize": [
                295
            ],
            "__typename": [
                217
            ]
        },
        "PresaleClaim": {
            "amountFormatted": [
                217
            ],
            "amountRaw": [
                295
            ],
            "claimType": [
                304
            ],
            "db_write_timestamp": [
                316
            ],
            "id": [
                217
            ],
            "loanId": [
                295
            ],
            "positionId": [
                295
            ],
            "presale_id": [
                217
            ],
            "timestamp": [
                295
            ],
            "trancheIndex": [
                295
            ],
            "transactionHash": [
                217
            ],
            "__typename": [
                217
            ]
        },
        "PresaleClaim_aggregate_order_by": {
            "avg": [
                139
            ],
            "count": [
                297
            ],
            "max": [
                141
            ],
            "min": [
                142
            ],
            "stddev": [
                145
            ],
            "stddev_pop": [
                146
            ],
            "stddev_samp": [
                147
            ],
            "sum": [
                150
            ],
            "var_pop": [
                151
            ],
            "var_samp": [
                152
            ],
            "variance": [
                153
            ],
            "__typename": [
                217
            ]
        },
        "PresaleClaim_avg_order_by": {
            "amountRaw": [
                297
            ],
            "loanId": [
                297
            ],
            "positionId": [
                297
            ],
            "timestamp": [
                297
            ],
            "trancheIndex": [
                297
            ],
            "__typename": [
                217
            ]
        },
        "PresaleClaim_bool_exp": {
            "_and": [
                140
            ],
            "_not": [
                140
            ],
            "_or": [
                140
            ],
            "amountFormatted": [
                218
            ],
            "amountRaw": [
                296
            ],
            "claimType": [
                305
            ],
            "db_write_timestamp": [
                317
            ],
            "id": [
                218
            ],
            "loanId": [
                296
            ],
            "positionId": [
                296
            ],
            "presale_id": [
                218
            ],
            "timestamp": [
                296
            ],
            "trancheIndex": [
                296
            ],
            "transactionHash": [
                218
            ],
            "__typename": [
                217
            ]
        },
        "PresaleClaim_max_order_by": {
            "amountFormatted": [
                297
            ],
            "amountRaw": [
                297
            ],
            "claimType": [
                297
            ],
            "db_write_timestamp": [
                297
            ],
            "id": [
                297
            ],
            "loanId": [
                297
            ],
            "positionId": [
                297
            ],
            "presale_id": [
                297
            ],
            "timestamp": [
                297
            ],
            "trancheIndex": [
                297
            ],
            "transactionHash": [
                297
            ],
            "__typename": [
                217
            ]
        },
        "PresaleClaim_min_order_by": {
            "amountFormatted": [
                297
            ],
            "amountRaw": [
                297
            ],
            "claimType": [
                297
            ],
            "db_write_timestamp": [
                297
            ],
            "id": [
                297
            ],
            "loanId": [
                297
            ],
            "positionId": [
                297
            ],
            "presale_id": [
                297
            ],
            "timestamp": [
                297
            ],
            "trancheIndex": [
                297
            ],
            "transactionHash": [
                297
            ],
            "__typename": [
                217
            ]
        },
        "PresaleClaim_order_by": {
            "amountFormatted": [
                297
            ],
            "amountRaw": [
                297
            ],
            "claimType": [
                297
            ],
            "db_write_timestamp": [
                297
            ],
            "id": [
                297
            ],
            "loanId": [
                297
            ],
            "positionId": [
                297
            ],
            "presale_id": [
                297
            ],
            "timestamp": [
                297
            ],
            "trancheIndex": [
                297
            ],
            "transactionHash": [
                297
            ],
            "__typename": [
                217
            ]
        },
        "PresaleClaim_select_column": {},
        "PresaleClaim_stddev_order_by": {
            "amountRaw": [
                297
            ],
            "loanId": [
                297
            ],
            "positionId": [
                297
            ],
            "timestamp": [
                297
            ],
            "trancheIndex": [
                297
            ],
            "__typename": [
                217
            ]
        },
        "PresaleClaim_stddev_pop_order_by": {
            "amountRaw": [
                297
            ],
            "loanId": [
                297
            ],
            "positionId": [
                297
            ],
            "timestamp": [
                297
            ],
            "trancheIndex": [
                297
            ],
            "__typename": [
                217
            ]
        },
        "PresaleClaim_stddev_samp_order_by": {
            "amountRaw": [
                297
            ],
            "loanId": [
                297
            ],
            "positionId": [
                297
            ],
            "timestamp": [
                297
            ],
            "trancheIndex": [
                297
            ],
            "__typename": [
                217
            ]
        },
        "PresaleClaim_stream_cursor_input": {
            "initial_value": [
                149
            ],
            "ordering": [
                269
            ],
            "__typename": [
                217
            ]
        },
        "PresaleClaim_stream_cursor_value_input": {
            "amountFormatted": [
                217
            ],
            "amountRaw": [
                295
            ],
            "claimType": [
                304
            ],
            "db_write_timestamp": [
                316
            ],
            "id": [
                217
            ],
            "loanId": [
                295
            ],
            "positionId": [
                295
            ],
            "presale_id": [
                217
            ],
            "timestamp": [
                295
            ],
            "trancheIndex": [
                295
            ],
            "transactionHash": [
                217
            ],
            "__typename": [
                217
            ]
        },
        "PresaleClaim_sum_order_by": {
            "amountRaw": [
                297
            ],
            "loanId": [
                297
            ],
            "positionId": [
                297
            ],
            "timestamp": [
                297
            ],
            "trancheIndex": [
                297
            ],
            "__typename": [
                217
            ]
        },
        "PresaleClaim_var_pop_order_by": {
            "amountRaw": [
                297
            ],
            "loanId": [
                297
            ],
            "positionId": [
                297
            ],
            "timestamp": [
                297
            ],
            "trancheIndex": [
                297
            ],
            "__typename": [
                217
            ]
        },
        "PresaleClaim_var_samp_order_by": {
            "amountRaw": [
                297
            ],
            "loanId": [
                297
            ],
            "positionId": [
                297
            ],
            "timestamp": [
                297
            ],
            "trancheIndex": [
                297
            ],
            "__typename": [
                217
            ]
        },
        "PresaleClaim_variance_order_by": {
            "amountRaw": [
                297
            ],
            "loanId": [
                297
            ],
            "positionId": [
                297
            ],
            "timestamp": [
                297
            ],
            "trancheIndex": [
                297
            ],
            "__typename": [
                217
            ]
        },
        "PresaleConfigEvent": {
            "db_write_timestamp": [
                316
            ],
            "eventType": [
                306
            ],
            "id": [
                217
            ],
            "payloadJson": [
                217
            ],
            "presale_id": [
                217
            ],
            "timestamp": [
                295
            ],
            "transactionHash": [
                217
            ],
            "__typename": [
                217
            ]
        },
        "PresaleConfigEvent_aggregate_order_by": {
            "avg": [
                156
            ],
            "count": [
                297
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
                217
            ]
        },
        "PresaleConfigEvent_avg_order_by": {
            "timestamp": [
                297
            ],
            "__typename": [
                217
            ]
        },
        "PresaleConfigEvent_bool_exp": {
            "_and": [
                157
            ],
            "_not": [
                157
            ],
            "_or": [
                157
            ],
            "db_write_timestamp": [
                317
            ],
            "eventType": [
                307
            ],
            "id": [
                218
            ],
            "payloadJson": [
                218
            ],
            "presale_id": [
                218
            ],
            "timestamp": [
                296
            ],
            "transactionHash": [
                218
            ],
            "__typename": [
                217
            ]
        },
        "PresaleConfigEvent_max_order_by": {
            "db_write_timestamp": [
                297
            ],
            "eventType": [
                297
            ],
            "id": [
                297
            ],
            "payloadJson": [
                297
            ],
            "presale_id": [
                297
            ],
            "timestamp": [
                297
            ],
            "transactionHash": [
                297
            ],
            "__typename": [
                217
            ]
        },
        "PresaleConfigEvent_min_order_by": {
            "db_write_timestamp": [
                297
            ],
            "eventType": [
                297
            ],
            "id": [
                297
            ],
            "payloadJson": [
                297
            ],
            "presale_id": [
                297
            ],
            "timestamp": [
                297
            ],
            "transactionHash": [
                297
            ],
            "__typename": [
                217
            ]
        },
        "PresaleConfigEvent_order_by": {
            "db_write_timestamp": [
                297
            ],
            "eventType": [
                297
            ],
            "id": [
                297
            ],
            "payloadJson": [
                297
            ],
            "presale_id": [
                297
            ],
            "timestamp": [
                297
            ],
            "transactionHash": [
                297
            ],
            "__typename": [
                217
            ]
        },
        "PresaleConfigEvent_select_column": {},
        "PresaleConfigEvent_stddev_order_by": {
            "timestamp": [
                297
            ],
            "__typename": [
                217
            ]
        },
        "PresaleConfigEvent_stddev_pop_order_by": {
            "timestamp": [
                297
            ],
            "__typename": [
                217
            ]
        },
        "PresaleConfigEvent_stddev_samp_order_by": {
            "timestamp": [
                297
            ],
            "__typename": [
                217
            ]
        },
        "PresaleConfigEvent_stream_cursor_input": {
            "initial_value": [
                166
            ],
            "ordering": [
                269
            ],
            "__typename": [
                217
            ]
        },
        "PresaleConfigEvent_stream_cursor_value_input": {
            "db_write_timestamp": [
                316
            ],
            "eventType": [
                306
            ],
            "id": [
                217
            ],
            "payloadJson": [
                217
            ],
            "presale_id": [
                217
            ],
            "timestamp": [
                295
            ],
            "transactionHash": [
                217
            ],
            "__typename": [
                217
            ]
        },
        "PresaleConfigEvent_sum_order_by": {
            "timestamp": [
                297
            ],
            "__typename": [
                217
            ]
        },
        "PresaleConfigEvent_var_pop_order_by": {
            "timestamp": [
                297
            ],
            "__typename": [
                217
            ]
        },
        "PresaleConfigEvent_var_samp_order_by": {
            "timestamp": [
                297
            ],
            "__typename": [
                217
            ]
        },
        "PresaleConfigEvent_variance_order_by": {
            "timestamp": [
                297
            ],
            "__typename": [
                217
            ]
        },
        "PresaleParticipation": {
            "db_write_timestamp": [
                316
            ],
            "depositAmountFormatted": [
                217
            ],
            "depositAmountRaw": [
                295
            ],
            "id": [
                217
            ],
            "leverage": [
                295
            ],
            "loopCount": [
                295
            ],
            "mintedAmountFormatted": [
                217
            ],
            "mintedAmountRaw": [
                295
            ],
            "positionId": [
                295
            ],
            "presale_id": [
                217
            ],
            "timestamp": [
                295
            ],
            "transactionHash": [
                217
            ],
            "user_id": [
                217
            ],
            "__typename": [
                217
            ]
        },
        "PresaleParticipation_aggregate_order_by": {
            "avg": [
                173
            ],
            "count": [
                297
            ],
            "max": [
                175
            ],
            "min": [
                176
            ],
            "stddev": [
                179
            ],
            "stddev_pop": [
                180
            ],
            "stddev_samp": [
                181
            ],
            "sum": [
                184
            ],
            "var_pop": [
                185
            ],
            "var_samp": [
                186
            ],
            "variance": [
                187
            ],
            "__typename": [
                217
            ]
        },
        "PresaleParticipation_avg_order_by": {
            "depositAmountRaw": [
                297
            ],
            "leverage": [
                297
            ],
            "loopCount": [
                297
            ],
            "mintedAmountRaw": [
                297
            ],
            "positionId": [
                297
            ],
            "timestamp": [
                297
            ],
            "__typename": [
                217
            ]
        },
        "PresaleParticipation_bool_exp": {
            "_and": [
                174
            ],
            "_not": [
                174
            ],
            "_or": [
                174
            ],
            "db_write_timestamp": [
                317
            ],
            "depositAmountFormatted": [
                218
            ],
            "depositAmountRaw": [
                296
            ],
            "id": [
                218
            ],
            "leverage": [
                296
            ],
            "loopCount": [
                296
            ],
            "mintedAmountFormatted": [
                218
            ],
            "mintedAmountRaw": [
                296
            ],
            "positionId": [
                296
            ],
            "presale_id": [
                218
            ],
            "timestamp": [
                296
            ],
            "transactionHash": [
                218
            ],
            "user_id": [
                218
            ],
            "__typename": [
                217
            ]
        },
        "PresaleParticipation_max_order_by": {
            "db_write_timestamp": [
                297
            ],
            "depositAmountFormatted": [
                297
            ],
            "depositAmountRaw": [
                297
            ],
            "id": [
                297
            ],
            "leverage": [
                297
            ],
            "loopCount": [
                297
            ],
            "mintedAmountFormatted": [
                297
            ],
            "mintedAmountRaw": [
                297
            ],
            "positionId": [
                297
            ],
            "presale_id": [
                297
            ],
            "timestamp": [
                297
            ],
            "transactionHash": [
                297
            ],
            "user_id": [
                297
            ],
            "__typename": [
                217
            ]
        },
        "PresaleParticipation_min_order_by": {
            "db_write_timestamp": [
                297
            ],
            "depositAmountFormatted": [
                297
            ],
            "depositAmountRaw": [
                297
            ],
            "id": [
                297
            ],
            "leverage": [
                297
            ],
            "loopCount": [
                297
            ],
            "mintedAmountFormatted": [
                297
            ],
            "mintedAmountRaw": [
                297
            ],
            "positionId": [
                297
            ],
            "presale_id": [
                297
            ],
            "timestamp": [
                297
            ],
            "transactionHash": [
                297
            ],
            "user_id": [
                297
            ],
            "__typename": [
                217
            ]
        },
        "PresaleParticipation_order_by": {
            "db_write_timestamp": [
                297
            ],
            "depositAmountFormatted": [
                297
            ],
            "depositAmountRaw": [
                297
            ],
            "id": [
                297
            ],
            "leverage": [
                297
            ],
            "loopCount": [
                297
            ],
            "mintedAmountFormatted": [
                297
            ],
            "mintedAmountRaw": [
                297
            ],
            "positionId": [
                297
            ],
            "presale_id": [
                297
            ],
            "timestamp": [
                297
            ],
            "transactionHash": [
                297
            ],
            "user_id": [
                297
            ],
            "__typename": [
                217
            ]
        },
        "PresaleParticipation_select_column": {},
        "PresaleParticipation_stddev_order_by": {
            "depositAmountRaw": [
                297
            ],
            "leverage": [
                297
            ],
            "loopCount": [
                297
            ],
            "mintedAmountRaw": [
                297
            ],
            "positionId": [
                297
            ],
            "timestamp": [
                297
            ],
            "__typename": [
                217
            ]
        },
        "PresaleParticipation_stddev_pop_order_by": {
            "depositAmountRaw": [
                297
            ],
            "leverage": [
                297
            ],
            "loopCount": [
                297
            ],
            "mintedAmountRaw": [
                297
            ],
            "positionId": [
                297
            ],
            "timestamp": [
                297
            ],
            "__typename": [
                217
            ]
        },
        "PresaleParticipation_stddev_samp_order_by": {
            "depositAmountRaw": [
                297
            ],
            "leverage": [
                297
            ],
            "loopCount": [
                297
            ],
            "mintedAmountRaw": [
                297
            ],
            "positionId": [
                297
            ],
            "timestamp": [
                297
            ],
            "__typename": [
                217
            ]
        },
        "PresaleParticipation_stream_cursor_input": {
            "initial_value": [
                183
            ],
            "ordering": [
                269
            ],
            "__typename": [
                217
            ]
        },
        "PresaleParticipation_stream_cursor_value_input": {
            "db_write_timestamp": [
                316
            ],
            "depositAmountFormatted": [
                217
            ],
            "depositAmountRaw": [
                295
            ],
            "id": [
                217
            ],
            "leverage": [
                295
            ],
            "loopCount": [
                295
            ],
            "mintedAmountFormatted": [
                217
            ],
            "mintedAmountRaw": [
                295
            ],
            "positionId": [
                295
            ],
            "presale_id": [
                217
            ],
            "timestamp": [
                295
            ],
            "transactionHash": [
                217
            ],
            "user_id": [
                217
            ],
            "__typename": [
                217
            ]
        },
        "PresaleParticipation_sum_order_by": {
            "depositAmountRaw": [
                297
            ],
            "leverage": [
                297
            ],
            "loopCount": [
                297
            ],
            "mintedAmountRaw": [
                297
            ],
            "positionId": [
                297
            ],
            "timestamp": [
                297
            ],
            "__typename": [
                217
            ]
        },
        "PresaleParticipation_var_pop_order_by": {
            "depositAmountRaw": [
                297
            ],
            "leverage": [
                297
            ],
            "loopCount": [
                297
            ],
            "mintedAmountRaw": [
                297
            ],
            "positionId": [
                297
            ],
            "timestamp": [
                297
            ],
            "__typename": [
                217
            ]
        },
        "PresaleParticipation_var_samp_order_by": {
            "depositAmountRaw": [
                297
            ],
            "leverage": [
                297
            ],
            "loopCount": [
                297
            ],
            "mintedAmountRaw": [
                297
            ],
            "positionId": [
                297
            ],
            "timestamp": [
                297
            ],
            "__typename": [
                217
            ]
        },
        "PresaleParticipation_variance_order_by": {
            "depositAmountRaw": [
                297
            ],
            "leverage": [
                297
            ],
            "loopCount": [
                297
            ],
            "mintedAmountRaw": [
                297
            ],
            "positionId": [
                297
            ],
            "timestamp": [
                297
            ],
            "__typename": [
                217
            ]
        },
        "PriceCandle": {
            "closeFormatted": [
                217
            ],
            "closeRaw": [
                295
            ],
            "db_write_timestamp": [
                316
            ],
            "highFormatted": [
                217
            ],
            "highRaw": [
                295
            ],
            "id": [
                217
            ],
            "lowFormatted": [
                217
            ],
            "lowRaw": [
                295
            ],
            "market_id": [
                217
            ],
            "openFormatted": [
                217
            ],
            "openRaw": [
                295
            ],
            "period": [
                259
            ],
            "timestamp": [
                295
            ],
            "trades": [
                295
            ],
            "volumeFormatted": [
                217
            ],
            "volumeRaw": [
                295
            ],
            "__typename": [
                217
            ]
        },
        "PriceCandle_bool_exp": {
            "_and": [
                189
            ],
            "_not": [
                189
            ],
            "_or": [
                189
            ],
            "closeFormatted": [
                218
            ],
            "closeRaw": [
                296
            ],
            "db_write_timestamp": [
                317
            ],
            "highFormatted": [
                218
            ],
            "highRaw": [
                296
            ],
            "id": [
                218
            ],
            "lowFormatted": [
                218
            ],
            "lowRaw": [
                296
            ],
            "market_id": [
                218
            ],
            "openFormatted": [
                218
            ],
            "openRaw": [
                296
            ],
            "period": [
                260
            ],
            "timestamp": [
                296
            ],
            "trades": [
                296
            ],
            "volumeFormatted": [
                218
            ],
            "volumeRaw": [
                296
            ],
            "__typename": [
                217
            ]
        },
        "PriceCandle_order_by": {
            "closeFormatted": [
                297
            ],
            "closeRaw": [
                297
            ],
            "db_write_timestamp": [
                297
            ],
            "highFormatted": [
                297
            ],
            "highRaw": [
                297
            ],
            "id": [
                297
            ],
            "lowFormatted": [
                297
            ],
            "lowRaw": [
                297
            ],
            "market_id": [
                297
            ],
            "openFormatted": [
                297
            ],
            "openRaw": [
                297
            ],
            "period": [
                297
            ],
            "timestamp": [
                297
            ],
            "trades": [
                297
            ],
            "volumeFormatted": [
                297
            ],
            "volumeRaw": [
                297
            ],
            "__typename": [
                217
            ]
        },
        "PriceCandle_select_column": {},
        "PriceCandle_stream_cursor_input": {
            "initial_value": [
                193
            ],
            "ordering": [
                269
            ],
            "__typename": [
                217
            ]
        },
        "PriceCandle_stream_cursor_value_input": {
            "closeFormatted": [
                217
            ],
            "closeRaw": [
                295
            ],
            "db_write_timestamp": [
                316
            ],
            "highFormatted": [
                217
            ],
            "highRaw": [
                295
            ],
            "id": [
                217
            ],
            "lowFormatted": [
                217
            ],
            "lowRaw": [
                295
            ],
            "market_id": [
                217
            ],
            "openFormatted": [
                217
            ],
            "openRaw": [
                295
            ],
            "period": [
                259
            ],
            "timestamp": [
                295
            ],
            "trades": [
                295
            ],
            "volumeFormatted": [
                217
            ],
            "volumeRaw": [
                295
            ],
            "__typename": [
                217
            ]
        },
        "Stake": {
            "amountFormatted": [
                217
            ],
            "amountRaw": [
                295
            ],
            "contract_id": [
                217
            ],
            "db_write_timestamp": [
                316
            ],
            "id": [
                217
            ],
            "lockDuration": [
                295
            ],
            "status": [
                314
            ],
            "timestamp": [
                295
            ],
            "transactionHash": [
                217
            ],
            "user_id": [
                217
            ],
            "__typename": [
                217
            ]
        },
        "Stake_aggregate_order_by": {
            "avg": [
                196
            ],
            "count": [
                297
            ],
            "max": [
                198
            ],
            "min": [
                199
            ],
            "stddev": [
                202
            ],
            "stddev_pop": [
                203
            ],
            "stddev_samp": [
                204
            ],
            "sum": [
                207
            ],
            "var_pop": [
                208
            ],
            "var_samp": [
                209
            ],
            "variance": [
                210
            ],
            "__typename": [
                217
            ]
        },
        "Stake_avg_order_by": {
            "amountRaw": [
                297
            ],
            "lockDuration": [
                297
            ],
            "timestamp": [
                297
            ],
            "__typename": [
                217
            ]
        },
        "Stake_bool_exp": {
            "_and": [
                197
            ],
            "_not": [
                197
            ],
            "_or": [
                197
            ],
            "amountFormatted": [
                218
            ],
            "amountRaw": [
                296
            ],
            "contract_id": [
                218
            ],
            "db_write_timestamp": [
                317
            ],
            "id": [
                218
            ],
            "lockDuration": [
                296
            ],
            "status": [
                315
            ],
            "timestamp": [
                296
            ],
            "transactionHash": [
                218
            ],
            "user_id": [
                218
            ],
            "__typename": [
                217
            ]
        },
        "Stake_max_order_by": {
            "amountFormatted": [
                297
            ],
            "amountRaw": [
                297
            ],
            "contract_id": [
                297
            ],
            "db_write_timestamp": [
                297
            ],
            "id": [
                297
            ],
            "lockDuration": [
                297
            ],
            "status": [
                297
            ],
            "timestamp": [
                297
            ],
            "transactionHash": [
                297
            ],
            "user_id": [
                297
            ],
            "__typename": [
                217
            ]
        },
        "Stake_min_order_by": {
            "amountFormatted": [
                297
            ],
            "amountRaw": [
                297
            ],
            "contract_id": [
                297
            ],
            "db_write_timestamp": [
                297
            ],
            "id": [
                297
            ],
            "lockDuration": [
                297
            ],
            "status": [
                297
            ],
            "timestamp": [
                297
            ],
            "transactionHash": [
                297
            ],
            "user_id": [
                297
            ],
            "__typename": [
                217
            ]
        },
        "Stake_order_by": {
            "amountFormatted": [
                297
            ],
            "amountRaw": [
                297
            ],
            "contract_id": [
                297
            ],
            "db_write_timestamp": [
                297
            ],
            "id": [
                297
            ],
            "lockDuration": [
                297
            ],
            "status": [
                297
            ],
            "timestamp": [
                297
            ],
            "transactionHash": [
                297
            ],
            "user_id": [
                297
            ],
            "__typename": [
                217
            ]
        },
        "Stake_select_column": {},
        "Stake_stddev_order_by": {
            "amountRaw": [
                297
            ],
            "lockDuration": [
                297
            ],
            "timestamp": [
                297
            ],
            "__typename": [
                217
            ]
        },
        "Stake_stddev_pop_order_by": {
            "amountRaw": [
                297
            ],
            "lockDuration": [
                297
            ],
            "timestamp": [
                297
            ],
            "__typename": [
                217
            ]
        },
        "Stake_stddev_samp_order_by": {
            "amountRaw": [
                297
            ],
            "lockDuration": [
                297
            ],
            "timestamp": [
                297
            ],
            "__typename": [
                217
            ]
        },
        "Stake_stream_cursor_input": {
            "initial_value": [
                206
            ],
            "ordering": [
                269
            ],
            "__typename": [
                217
            ]
        },
        "Stake_stream_cursor_value_input": {
            "amountFormatted": [
                217
            ],
            "amountRaw": [
                295
            ],
            "contract_id": [
                217
            ],
            "db_write_timestamp": [
                316
            ],
            "id": [
                217
            ],
            "lockDuration": [
                295
            ],
            "status": [
                314
            ],
            "timestamp": [
                295
            ],
            "transactionHash": [
                217
            ],
            "user_id": [
                217
            ],
            "__typename": [
                217
            ]
        },
        "Stake_sum_order_by": {
            "amountRaw": [
                297
            ],
            "lockDuration": [
                297
            ],
            "timestamp": [
                297
            ],
            "__typename": [
                217
            ]
        },
        "Stake_var_pop_order_by": {
            "amountRaw": [
                297
            ],
            "lockDuration": [
                297
            ],
            "timestamp": [
                297
            ],
            "__typename": [
                217
            ]
        },
        "Stake_var_samp_order_by": {
            "amountRaw": [
                297
            ],
            "lockDuration": [
                297
            ],
            "timestamp": [
                297
            ],
            "__typename": [
                217
            ]
        },
        "Stake_variance_order_by": {
            "amountRaw": [
                297
            ],
            "lockDuration": [
                297
            ],
            "timestamp": [
                297
            ],
            "__typename": [
                217
            ]
        },
        "StakingContract": {
            "createdAt": [
                295
            ],
            "db_write_timestamp": [
                316
            ],
            "id": [
                217
            ],
            "rewardToken_id": [
                217
            ],
            "stakes": [
                194,
                {
                    "distinct_on": [
                        201,
                        "[Stake_select_column!]"
                    ],
                    "limit": [
                        54
                    ],
                    "offset": [
                        54
                    ],
                    "order_by": [
                        200,
                        "[Stake_order_by!]"
                    ],
                    "where": [
                        197
                    ]
                }
            ],
            "stakingToken_id": [
                217
            ],
            "totalRewardsFormatted": [
                217
            ],
            "totalRewardsRaw": [
                295
            ],
            "totalStakedFormatted": [
                217
            ],
            "totalStakedRaw": [
                295
            ],
            "__typename": [
                217
            ]
        },
        "StakingContract_bool_exp": {
            "_and": [
                212
            ],
            "_not": [
                212
            ],
            "_or": [
                212
            ],
            "createdAt": [
                296
            ],
            "db_write_timestamp": [
                317
            ],
            "id": [
                218
            ],
            "rewardToken_id": [
                218
            ],
            "stakes": [
                197
            ],
            "stakingToken_id": [
                218
            ],
            "totalRewardsFormatted": [
                218
            ],
            "totalRewardsRaw": [
                296
            ],
            "totalStakedFormatted": [
                218
            ],
            "totalStakedRaw": [
                296
            ],
            "__typename": [
                217
            ]
        },
        "StakingContract_order_by": {
            "createdAt": [
                297
            ],
            "db_write_timestamp": [
                297
            ],
            "id": [
                297
            ],
            "rewardToken_id": [
                297
            ],
            "stakes_aggregate": [
                195
            ],
            "stakingToken_id": [
                297
            ],
            "totalRewardsFormatted": [
                297
            ],
            "totalRewardsRaw": [
                297
            ],
            "totalStakedFormatted": [
                297
            ],
            "totalStakedRaw": [
                297
            ],
            "__typename": [
                217
            ]
        },
        "StakingContract_select_column": {},
        "StakingContract_stream_cursor_input": {
            "initial_value": [
                216
            ],
            "ordering": [
                269
            ],
            "__typename": [
                217
            ]
        },
        "StakingContract_stream_cursor_value_input": {
            "createdAt": [
                295
            ],
            "db_write_timestamp": [
                316
            ],
            "id": [
                217
            ],
            "rewardToken_id": [
                217
            ],
            "stakingToken_id": [
                217
            ],
            "totalRewardsFormatted": [
                217
            ],
            "totalRewardsRaw": [
                295
            ],
            "totalStakedFormatted": [
                217
            ],
            "totalStakedRaw": [
                295
            ],
            "__typename": [
                217
            ]
        },
        "String": {},
        "String_comparison_exp": {
            "_eq": [
                217
            ],
            "_gt": [
                217
            ],
            "_gte": [
                217
            ],
            "_ilike": [
                217
            ],
            "_in": [
                217
            ],
            "_iregex": [
                217
            ],
            "_is_null": [
                6
            ],
            "_like": [
                217
            ],
            "_lt": [
                217
            ],
            "_lte": [
                217
            ],
            "_neq": [
                217
            ],
            "_nilike": [
                217
            ],
            "_nin": [
                217
            ],
            "_niregex": [
                217
            ],
            "_nlike": [
                217
            ],
            "_nregex": [
                217
            ],
            "_nsimilar": [
                217
            ],
            "_regex": [
                217
            ],
            "_similar": [
                217
            ],
            "__typename": [
                217
            ]
        },
        "Token": {
            "db_write_timestamp": [
                316
            ],
            "decimals": [
                54
            ],
            "id": [
                217
            ],
            "maxSupplyFormatted": [
                217
            ],
            "maxSupplyRaw": [
                295
            ],
            "name": [
                217
            ],
            "symbol": [
                217
            ],
            "__typename": [
                217
            ]
        },
        "Token_bool_exp": {
            "_and": [
                220
            ],
            "_not": [
                220
            ],
            "_or": [
                220
            ],
            "db_write_timestamp": [
                317
            ],
            "decimals": [
                55
            ],
            "id": [
                218
            ],
            "maxSupplyFormatted": [
                218
            ],
            "maxSupplyRaw": [
                296
            ],
            "name": [
                218
            ],
            "symbol": [
                218
            ],
            "__typename": [
                217
            ]
        },
        "Token_order_by": {
            "db_write_timestamp": [
                297
            ],
            "decimals": [
                297
            ],
            "id": [
                297
            ],
            "maxSupplyFormatted": [
                297
            ],
            "maxSupplyRaw": [
                297
            ],
            "name": [
                297
            ],
            "symbol": [
                297
            ],
            "__typename": [
                217
            ]
        },
        "Token_select_column": {},
        "Token_stream_cursor_input": {
            "initial_value": [
                224
            ],
            "ordering": [
                269
            ],
            "__typename": [
                217
            ]
        },
        "Token_stream_cursor_value_input": {
            "db_write_timestamp": [
                316
            ],
            "decimals": [
                54
            ],
            "id": [
                217
            ],
            "maxSupplyFormatted": [
                217
            ],
            "maxSupplyRaw": [
                295
            ],
            "name": [
                217
            ],
            "symbol": [
                217
            ],
            "__typename": [
                217
            ]
        },
        "Trade": {
            "db_write_timestamp": [
                316
            ],
            "feeFormatted": [
                217
            ],
            "feeRaw": [
                295
            ],
            "id": [
                217
            ],
            "market_id": [
                217
            ],
            "newPriceFormatted": [
                217
            ],
            "newPriceRaw": [
                295
            ],
            "reserveAmountFormatted": [
                217
            ],
            "reserveAmountRaw": [
                295
            ],
            "timestamp": [
                295
            ],
            "tokenAmountFormatted": [
                217
            ],
            "tokenAmountRaw": [
                295
            ],
            "tradeType": [
                320
            ],
            "transactionHash": [
                217
            ],
            "user_id": [
                217
            ],
            "__typename": [
                217
            ]
        },
        "Trade_aggregate_order_by": {
            "avg": [
                227
            ],
            "count": [
                297
            ],
            "max": [
                229
            ],
            "min": [
                230
            ],
            "stddev": [
                233
            ],
            "stddev_pop": [
                234
            ],
            "stddev_samp": [
                235
            ],
            "sum": [
                238
            ],
            "var_pop": [
                239
            ],
            "var_samp": [
                240
            ],
            "variance": [
                241
            ],
            "__typename": [
                217
            ]
        },
        "Trade_avg_order_by": {
            "feeRaw": [
                297
            ],
            "newPriceRaw": [
                297
            ],
            "reserveAmountRaw": [
                297
            ],
            "timestamp": [
                297
            ],
            "tokenAmountRaw": [
                297
            ],
            "__typename": [
                217
            ]
        },
        "Trade_bool_exp": {
            "_and": [
                228
            ],
            "_not": [
                228
            ],
            "_or": [
                228
            ],
            "db_write_timestamp": [
                317
            ],
            "feeFormatted": [
                218
            ],
            "feeRaw": [
                296
            ],
            "id": [
                218
            ],
            "market_id": [
                218
            ],
            "newPriceFormatted": [
                218
            ],
            "newPriceRaw": [
                296
            ],
            "reserveAmountFormatted": [
                218
            ],
            "reserveAmountRaw": [
                296
            ],
            "timestamp": [
                296
            ],
            "tokenAmountFormatted": [
                218
            ],
            "tokenAmountRaw": [
                296
            ],
            "tradeType": [
                321
            ],
            "transactionHash": [
                218
            ],
            "user_id": [
                218
            ],
            "__typename": [
                217
            ]
        },
        "Trade_max_order_by": {
            "db_write_timestamp": [
                297
            ],
            "feeFormatted": [
                297
            ],
            "feeRaw": [
                297
            ],
            "id": [
                297
            ],
            "market_id": [
                297
            ],
            "newPriceFormatted": [
                297
            ],
            "newPriceRaw": [
                297
            ],
            "reserveAmountFormatted": [
                297
            ],
            "reserveAmountRaw": [
                297
            ],
            "timestamp": [
                297
            ],
            "tokenAmountFormatted": [
                297
            ],
            "tokenAmountRaw": [
                297
            ],
            "tradeType": [
                297
            ],
            "transactionHash": [
                297
            ],
            "user_id": [
                297
            ],
            "__typename": [
                217
            ]
        },
        "Trade_min_order_by": {
            "db_write_timestamp": [
                297
            ],
            "feeFormatted": [
                297
            ],
            "feeRaw": [
                297
            ],
            "id": [
                297
            ],
            "market_id": [
                297
            ],
            "newPriceFormatted": [
                297
            ],
            "newPriceRaw": [
                297
            ],
            "reserveAmountFormatted": [
                297
            ],
            "reserveAmountRaw": [
                297
            ],
            "timestamp": [
                297
            ],
            "tokenAmountFormatted": [
                297
            ],
            "tokenAmountRaw": [
                297
            ],
            "tradeType": [
                297
            ],
            "transactionHash": [
                297
            ],
            "user_id": [
                297
            ],
            "__typename": [
                217
            ]
        },
        "Trade_order_by": {
            "db_write_timestamp": [
                297
            ],
            "feeFormatted": [
                297
            ],
            "feeRaw": [
                297
            ],
            "id": [
                297
            ],
            "market_id": [
                297
            ],
            "newPriceFormatted": [
                297
            ],
            "newPriceRaw": [
                297
            ],
            "reserveAmountFormatted": [
                297
            ],
            "reserveAmountRaw": [
                297
            ],
            "timestamp": [
                297
            ],
            "tokenAmountFormatted": [
                297
            ],
            "tokenAmountRaw": [
                297
            ],
            "tradeType": [
                297
            ],
            "transactionHash": [
                297
            ],
            "user_id": [
                297
            ],
            "__typename": [
                217
            ]
        },
        "Trade_select_column": {},
        "Trade_stddev_order_by": {
            "feeRaw": [
                297
            ],
            "newPriceRaw": [
                297
            ],
            "reserveAmountRaw": [
                297
            ],
            "timestamp": [
                297
            ],
            "tokenAmountRaw": [
                297
            ],
            "__typename": [
                217
            ]
        },
        "Trade_stddev_pop_order_by": {
            "feeRaw": [
                297
            ],
            "newPriceRaw": [
                297
            ],
            "reserveAmountRaw": [
                297
            ],
            "timestamp": [
                297
            ],
            "tokenAmountRaw": [
                297
            ],
            "__typename": [
                217
            ]
        },
        "Trade_stddev_samp_order_by": {
            "feeRaw": [
                297
            ],
            "newPriceRaw": [
                297
            ],
            "reserveAmountRaw": [
                297
            ],
            "timestamp": [
                297
            ],
            "tokenAmountRaw": [
                297
            ],
            "__typename": [
                217
            ]
        },
        "Trade_stream_cursor_input": {
            "initial_value": [
                237
            ],
            "ordering": [
                269
            ],
            "__typename": [
                217
            ]
        },
        "Trade_stream_cursor_value_input": {
            "db_write_timestamp": [
                316
            ],
            "feeFormatted": [
                217
            ],
            "feeRaw": [
                295
            ],
            "id": [
                217
            ],
            "market_id": [
                217
            ],
            "newPriceFormatted": [
                217
            ],
            "newPriceRaw": [
                295
            ],
            "reserveAmountFormatted": [
                217
            ],
            "reserveAmountRaw": [
                295
            ],
            "timestamp": [
                295
            ],
            "tokenAmountFormatted": [
                217
            ],
            "tokenAmountRaw": [
                295
            ],
            "tradeType": [
                320
            ],
            "transactionHash": [
                217
            ],
            "user_id": [
                217
            ],
            "__typename": [
                217
            ]
        },
        "Trade_sum_order_by": {
            "feeRaw": [
                297
            ],
            "newPriceRaw": [
                297
            ],
            "reserveAmountRaw": [
                297
            ],
            "timestamp": [
                297
            ],
            "tokenAmountRaw": [
                297
            ],
            "__typename": [
                217
            ]
        },
        "Trade_var_pop_order_by": {
            "feeRaw": [
                297
            ],
            "newPriceRaw": [
                297
            ],
            "reserveAmountRaw": [
                297
            ],
            "timestamp": [
                297
            ],
            "tokenAmountRaw": [
                297
            ],
            "__typename": [
                217
            ]
        },
        "Trade_var_samp_order_by": {
            "feeRaw": [
                297
            ],
            "newPriceRaw": [
                297
            ],
            "reserveAmountRaw": [
                297
            ],
            "timestamp": [
                297
            ],
            "tokenAmountRaw": [
                297
            ],
            "__typename": [
                217
            ]
        },
        "Trade_variance_order_by": {
            "feeRaw": [
                297
            ],
            "newPriceRaw": [
                297
            ],
            "reserveAmountRaw": [
                297
            ],
            "timestamp": [
                297
            ],
            "tokenAmountRaw": [
                297
            ],
            "__typename": [
                217
            ]
        },
        "UserMarketPosition": {
            "claimableRewardsFormatted": [
                217
            ],
            "claimableRewardsRaw": [
                295
            ],
            "db_write_timestamp": [
                316
            ],
            "id": [
                217
            ],
            "lastUpdatedAt": [
                295
            ],
            "lockedCollateralFormatted": [
                217
            ],
            "lockedCollateralRaw": [
                295
            ],
            "market_id": [
                217
            ],
            "netFTokenChangeFormatted": [
                217
            ],
            "netFTokenChangeRaw": [
                295
            ],
            "presaleDepositFormatted": [
                217
            ],
            "presaleDepositRaw": [
                295
            ],
            "presaleLeverage": [
                295
            ],
            "stakedAmountFormatted": [
                217
            ],
            "stakedAmountRaw": [
                295
            ],
            "totalDebtFormatted": [
                217
            ],
            "totalDebtRaw": [
                295
            ],
            "user_id": [
                217
            ],
            "__typename": [
                217
            ]
        },
        "UserMarketPosition_aggregate_order_by": {
            "avg": [
                244
            ],
            "count": [
                297
            ],
            "max": [
                246
            ],
            "min": [
                247
            ],
            "stddev": [
                250
            ],
            "stddev_pop": [
                251
            ],
            "stddev_samp": [
                252
            ],
            "sum": [
                255
            ],
            "var_pop": [
                256
            ],
            "var_samp": [
                257
            ],
            "variance": [
                258
            ],
            "__typename": [
                217
            ]
        },
        "UserMarketPosition_avg_order_by": {
            "claimableRewardsRaw": [
                297
            ],
            "lastUpdatedAt": [
                297
            ],
            "lockedCollateralRaw": [
                297
            ],
            "netFTokenChangeRaw": [
                297
            ],
            "presaleDepositRaw": [
                297
            ],
            "presaleLeverage": [
                297
            ],
            "stakedAmountRaw": [
                297
            ],
            "totalDebtRaw": [
                297
            ],
            "__typename": [
                217
            ]
        },
        "UserMarketPosition_bool_exp": {
            "_and": [
                245
            ],
            "_not": [
                245
            ],
            "_or": [
                245
            ],
            "claimableRewardsFormatted": [
                218
            ],
            "claimableRewardsRaw": [
                296
            ],
            "db_write_timestamp": [
                317
            ],
            "id": [
                218
            ],
            "lastUpdatedAt": [
                296
            ],
            "lockedCollateralFormatted": [
                218
            ],
            "lockedCollateralRaw": [
                296
            ],
            "market_id": [
                218
            ],
            "netFTokenChangeFormatted": [
                218
            ],
            "netFTokenChangeRaw": [
                296
            ],
            "presaleDepositFormatted": [
                218
            ],
            "presaleDepositRaw": [
                296
            ],
            "presaleLeverage": [
                296
            ],
            "stakedAmountFormatted": [
                218
            ],
            "stakedAmountRaw": [
                296
            ],
            "totalDebtFormatted": [
                218
            ],
            "totalDebtRaw": [
                296
            ],
            "user_id": [
                218
            ],
            "__typename": [
                217
            ]
        },
        "UserMarketPosition_max_order_by": {
            "claimableRewardsFormatted": [
                297
            ],
            "claimableRewardsRaw": [
                297
            ],
            "db_write_timestamp": [
                297
            ],
            "id": [
                297
            ],
            "lastUpdatedAt": [
                297
            ],
            "lockedCollateralFormatted": [
                297
            ],
            "lockedCollateralRaw": [
                297
            ],
            "market_id": [
                297
            ],
            "netFTokenChangeFormatted": [
                297
            ],
            "netFTokenChangeRaw": [
                297
            ],
            "presaleDepositFormatted": [
                297
            ],
            "presaleDepositRaw": [
                297
            ],
            "presaleLeverage": [
                297
            ],
            "stakedAmountFormatted": [
                297
            ],
            "stakedAmountRaw": [
                297
            ],
            "totalDebtFormatted": [
                297
            ],
            "totalDebtRaw": [
                297
            ],
            "user_id": [
                297
            ],
            "__typename": [
                217
            ]
        },
        "UserMarketPosition_min_order_by": {
            "claimableRewardsFormatted": [
                297
            ],
            "claimableRewardsRaw": [
                297
            ],
            "db_write_timestamp": [
                297
            ],
            "id": [
                297
            ],
            "lastUpdatedAt": [
                297
            ],
            "lockedCollateralFormatted": [
                297
            ],
            "lockedCollateralRaw": [
                297
            ],
            "market_id": [
                297
            ],
            "netFTokenChangeFormatted": [
                297
            ],
            "netFTokenChangeRaw": [
                297
            ],
            "presaleDepositFormatted": [
                297
            ],
            "presaleDepositRaw": [
                297
            ],
            "presaleLeverage": [
                297
            ],
            "stakedAmountFormatted": [
                297
            ],
            "stakedAmountRaw": [
                297
            ],
            "totalDebtFormatted": [
                297
            ],
            "totalDebtRaw": [
                297
            ],
            "user_id": [
                297
            ],
            "__typename": [
                217
            ]
        },
        "UserMarketPosition_order_by": {
            "claimableRewardsFormatted": [
                297
            ],
            "claimableRewardsRaw": [
                297
            ],
            "db_write_timestamp": [
                297
            ],
            "id": [
                297
            ],
            "lastUpdatedAt": [
                297
            ],
            "lockedCollateralFormatted": [
                297
            ],
            "lockedCollateralRaw": [
                297
            ],
            "market_id": [
                297
            ],
            "netFTokenChangeFormatted": [
                297
            ],
            "netFTokenChangeRaw": [
                297
            ],
            "presaleDepositFormatted": [
                297
            ],
            "presaleDepositRaw": [
                297
            ],
            "presaleLeverage": [
                297
            ],
            "stakedAmountFormatted": [
                297
            ],
            "stakedAmountRaw": [
                297
            ],
            "totalDebtFormatted": [
                297
            ],
            "totalDebtRaw": [
                297
            ],
            "user_id": [
                297
            ],
            "__typename": [
                217
            ]
        },
        "UserMarketPosition_select_column": {},
        "UserMarketPosition_stddev_order_by": {
            "claimableRewardsRaw": [
                297
            ],
            "lastUpdatedAt": [
                297
            ],
            "lockedCollateralRaw": [
                297
            ],
            "netFTokenChangeRaw": [
                297
            ],
            "presaleDepositRaw": [
                297
            ],
            "presaleLeverage": [
                297
            ],
            "stakedAmountRaw": [
                297
            ],
            "totalDebtRaw": [
                297
            ],
            "__typename": [
                217
            ]
        },
        "UserMarketPosition_stddev_pop_order_by": {
            "claimableRewardsRaw": [
                297
            ],
            "lastUpdatedAt": [
                297
            ],
            "lockedCollateralRaw": [
                297
            ],
            "netFTokenChangeRaw": [
                297
            ],
            "presaleDepositRaw": [
                297
            ],
            "presaleLeverage": [
                297
            ],
            "stakedAmountRaw": [
                297
            ],
            "totalDebtRaw": [
                297
            ],
            "__typename": [
                217
            ]
        },
        "UserMarketPosition_stddev_samp_order_by": {
            "claimableRewardsRaw": [
                297
            ],
            "lastUpdatedAt": [
                297
            ],
            "lockedCollateralRaw": [
                297
            ],
            "netFTokenChangeRaw": [
                297
            ],
            "presaleDepositRaw": [
                297
            ],
            "presaleLeverage": [
                297
            ],
            "stakedAmountRaw": [
                297
            ],
            "totalDebtRaw": [
                297
            ],
            "__typename": [
                217
            ]
        },
        "UserMarketPosition_stream_cursor_input": {
            "initial_value": [
                254
            ],
            "ordering": [
                269
            ],
            "__typename": [
                217
            ]
        },
        "UserMarketPosition_stream_cursor_value_input": {
            "claimableRewardsFormatted": [
                217
            ],
            "claimableRewardsRaw": [
                295
            ],
            "db_write_timestamp": [
                316
            ],
            "id": [
                217
            ],
            "lastUpdatedAt": [
                295
            ],
            "lockedCollateralFormatted": [
                217
            ],
            "lockedCollateralRaw": [
                295
            ],
            "market_id": [
                217
            ],
            "netFTokenChangeFormatted": [
                217
            ],
            "netFTokenChangeRaw": [
                295
            ],
            "presaleDepositFormatted": [
                217
            ],
            "presaleDepositRaw": [
                295
            ],
            "presaleLeverage": [
                295
            ],
            "stakedAmountFormatted": [
                217
            ],
            "stakedAmountRaw": [
                295
            ],
            "totalDebtFormatted": [
                217
            ],
            "totalDebtRaw": [
                295
            ],
            "user_id": [
                217
            ],
            "__typename": [
                217
            ]
        },
        "UserMarketPosition_sum_order_by": {
            "claimableRewardsRaw": [
                297
            ],
            "lastUpdatedAt": [
                297
            ],
            "lockedCollateralRaw": [
                297
            ],
            "netFTokenChangeRaw": [
                297
            ],
            "presaleDepositRaw": [
                297
            ],
            "presaleLeverage": [
                297
            ],
            "stakedAmountRaw": [
                297
            ],
            "totalDebtRaw": [
                297
            ],
            "__typename": [
                217
            ]
        },
        "UserMarketPosition_var_pop_order_by": {
            "claimableRewardsRaw": [
                297
            ],
            "lastUpdatedAt": [
                297
            ],
            "lockedCollateralRaw": [
                297
            ],
            "netFTokenChangeRaw": [
                297
            ],
            "presaleDepositRaw": [
                297
            ],
            "presaleLeverage": [
                297
            ],
            "stakedAmountRaw": [
                297
            ],
            "totalDebtRaw": [
                297
            ],
            "__typename": [
                217
            ]
        },
        "UserMarketPosition_var_samp_order_by": {
            "claimableRewardsRaw": [
                297
            ],
            "lastUpdatedAt": [
                297
            ],
            "lockedCollateralRaw": [
                297
            ],
            "netFTokenChangeRaw": [
                297
            ],
            "presaleDepositRaw": [
                297
            ],
            "presaleLeverage": [
                297
            ],
            "stakedAmountRaw": [
                297
            ],
            "totalDebtRaw": [
                297
            ],
            "__typename": [
                217
            ]
        },
        "UserMarketPosition_variance_order_by": {
            "claimableRewardsRaw": [
                297
            ],
            "lastUpdatedAt": [
                297
            ],
            "lockedCollateralRaw": [
                297
            ],
            "netFTokenChangeRaw": [
                297
            ],
            "presaleDepositRaw": [
                297
            ],
            "presaleLeverage": [
                297
            ],
            "stakedAmountRaw": [
                297
            ],
            "totalDebtRaw": [
                297
            ],
            "__typename": [
                217
            ]
        },
        "candleperiod": {},
        "candleperiod_comparison_exp": {
            "_eq": [
                259
            ],
            "_gt": [
                259
            ],
            "_gte": [
                259
            ],
            "_in": [
                259
            ],
            "_is_null": [
                6
            ],
            "_lt": [
                259
            ],
            "_lte": [
                259
            ],
            "_neq": [
                259
            ],
            "_nin": [
                259
            ],
            "__typename": [
                217
            ]
        },
        "chain_metadata": {
            "block_height": [
                54
            ],
            "chain_id": [
                54
            ],
            "end_block": [
                54
            ],
            "first_event_block_number": [
                54
            ],
            "is_hyper_sync": [
                6
            ],
            "latest_fetched_block_number": [
                54
            ],
            "latest_processed_block": [
                54
            ],
            "num_batches_fetched": [
                54
            ],
            "num_events_processed": [
                54
            ],
            "start_block": [
                54
            ],
            "timestamp_caught_up_to_head_or_endblock": [
                318
            ],
            "__typename": [
                217
            ]
        },
        "chain_metadata_bool_exp": {
            "_and": [
                262
            ],
            "_not": [
                262
            ],
            "_or": [
                262
            ],
            "block_height": [
                55
            ],
            "chain_id": [
                55
            ],
            "end_block": [
                55
            ],
            "first_event_block_number": [
                55
            ],
            "is_hyper_sync": [
                7
            ],
            "latest_fetched_block_number": [
                55
            ],
            "latest_processed_block": [
                55
            ],
            "num_batches_fetched": [
                55
            ],
            "num_events_processed": [
                55
            ],
            "start_block": [
                55
            ],
            "timestamp_caught_up_to_head_or_endblock": [
                319
            ],
            "__typename": [
                217
            ]
        },
        "chain_metadata_order_by": {
            "block_height": [
                297
            ],
            "chain_id": [
                297
            ],
            "end_block": [
                297
            ],
            "first_event_block_number": [
                297
            ],
            "is_hyper_sync": [
                297
            ],
            "latest_fetched_block_number": [
                297
            ],
            "latest_processed_block": [
                297
            ],
            "num_batches_fetched": [
                297
            ],
            "num_events_processed": [
                297
            ],
            "start_block": [
                297
            ],
            "timestamp_caught_up_to_head_or_endblock": [
                297
            ],
            "__typename": [
                217
            ]
        },
        "chain_metadata_select_column": {},
        "chain_metadata_stream_cursor_input": {
            "initial_value": [
                266
            ],
            "ordering": [
                269
            ],
            "__typename": [
                217
            ]
        },
        "chain_metadata_stream_cursor_value_input": {
            "block_height": [
                54
            ],
            "chain_id": [
                54
            ],
            "end_block": [
                54
            ],
            "first_event_block_number": [
                54
            ],
            "is_hyper_sync": [
                6
            ],
            "latest_fetched_block_number": [
                54
            ],
            "latest_processed_block": [
                54
            ],
            "num_batches_fetched": [
                54
            ],
            "num_events_processed": [
                54
            ],
            "start_block": [
                54
            ],
            "timestamp_caught_up_to_head_or_endblock": [
                318
            ],
            "__typename": [
                217
            ]
        },
        "contract_type": {},
        "contract_type_comparison_exp": {
            "_eq": [
                267
            ],
            "_gt": [
                267
            ],
            "_gte": [
                267
            ],
            "_in": [
                267
            ],
            "_is_null": [
                6
            ],
            "_lt": [
                267
            ],
            "_lte": [
                267
            ],
            "_neq": [
                267
            ],
            "_nin": [
                267
            ],
            "__typename": [
                217
            ]
        },
        "cursor_ordering": {},
        "dynamic_contract_registry": {
            "chain_id": [
                54
            ],
            "contract_address": [
                217
            ],
            "contract_type": [
                267
            ],
            "id": [
                217
            ],
            "registering_event_block_number": [
                54
            ],
            "registering_event_block_timestamp": [
                54
            ],
            "registering_event_contract_name": [
                217
            ],
            "registering_event_log_index": [
                54
            ],
            "registering_event_name": [
                217
            ],
            "registering_event_src_address": [
                217
            ],
            "__typename": [
                217
            ]
        },
        "dynamic_contract_registry_bool_exp": {
            "_and": [
                271
            ],
            "_not": [
                271
            ],
            "_or": [
                271
            ],
            "chain_id": [
                55
            ],
            "contract_address": [
                218
            ],
            "contract_type": [
                268
            ],
            "id": [
                218
            ],
            "registering_event_block_number": [
                55
            ],
            "registering_event_block_timestamp": [
                55
            ],
            "registering_event_contract_name": [
                218
            ],
            "registering_event_log_index": [
                55
            ],
            "registering_event_name": [
                218
            ],
            "registering_event_src_address": [
                218
            ],
            "__typename": [
                217
            ]
        },
        "dynamic_contract_registry_order_by": {
            "chain_id": [
                297
            ],
            "contract_address": [
                297
            ],
            "contract_type": [
                297
            ],
            "id": [
                297
            ],
            "registering_event_block_number": [
                297
            ],
            "registering_event_block_timestamp": [
                297
            ],
            "registering_event_contract_name": [
                297
            ],
            "registering_event_log_index": [
                297
            ],
            "registering_event_name": [
                297
            ],
            "registering_event_src_address": [
                297
            ],
            "__typename": [
                217
            ]
        },
        "dynamic_contract_registry_select_column": {},
        "dynamic_contract_registry_stream_cursor_input": {
            "initial_value": [
                275
            ],
            "ordering": [
                269
            ],
            "__typename": [
                217
            ]
        },
        "dynamic_contract_registry_stream_cursor_value_input": {
            "chain_id": [
                54
            ],
            "contract_address": [
                217
            ],
            "contract_type": [
                267
            ],
            "id": [
                217
            ],
            "registering_event_block_number": [
                54
            ],
            "registering_event_block_timestamp": [
                54
            ],
            "registering_event_contract_name": [
                217
            ],
            "registering_event_log_index": [
                54
            ],
            "registering_event_name": [
                217
            ],
            "registering_event_src_address": [
                217
            ],
            "__typename": [
                217
            ]
        },
        "end_of_block_range_scanned_data": {
            "block_hash": [
                217
            ],
            "block_number": [
                54
            ],
            "chain_id": [
                54
            ],
            "__typename": [
                217
            ]
        },
        "end_of_block_range_scanned_data_bool_exp": {
            "_and": [
                277
            ],
            "_not": [
                277
            ],
            "_or": [
                277
            ],
            "block_hash": [
                218
            ],
            "block_number": [
                55
            ],
            "chain_id": [
                55
            ],
            "__typename": [
                217
            ]
        },
        "end_of_block_range_scanned_data_order_by": {
            "block_hash": [
                297
            ],
            "block_number": [
                297
            ],
            "chain_id": [
                297
            ],
            "__typename": [
                217
            ]
        },
        "end_of_block_range_scanned_data_select_column": {},
        "end_of_block_range_scanned_data_stream_cursor_input": {
            "initial_value": [
                281
            ],
            "ordering": [
                269
            ],
            "__typename": [
                217
            ]
        },
        "end_of_block_range_scanned_data_stream_cursor_value_input": {
            "block_hash": [
                217
            ],
            "block_number": [
                54
            ],
            "chain_id": [
                54
            ],
            "__typename": [
                217
            ]
        },
        "event_sync_state": {
            "block_number": [
                54
            ],
            "block_timestamp": [
                54
            ],
            "chain_id": [
                54
            ],
            "is_pre_registering_dynamic_contracts": [
                6
            ],
            "log_index": [
                54
            ],
            "__typename": [
                217
            ]
        },
        "event_sync_state_bool_exp": {
            "_and": [
                283
            ],
            "_not": [
                283
            ],
            "_or": [
                283
            ],
            "block_number": [
                55
            ],
            "block_timestamp": [
                55
            ],
            "chain_id": [
                55
            ],
            "is_pre_registering_dynamic_contracts": [
                7
            ],
            "log_index": [
                55
            ],
            "__typename": [
                217
            ]
        },
        "event_sync_state_order_by": {
            "block_number": [
                297
            ],
            "block_timestamp": [
                297
            ],
            "chain_id": [
                297
            ],
            "is_pre_registering_dynamic_contracts": [
                297
            ],
            "log_index": [
                297
            ],
            "__typename": [
                217
            ]
        },
        "event_sync_state_select_column": {},
        "event_sync_state_stream_cursor_input": {
            "initial_value": [
                287
            ],
            "ordering": [
                269
            ],
            "__typename": [
                217
            ]
        },
        "event_sync_state_stream_cursor_value_input": {
            "block_number": [
                54
            ],
            "block_timestamp": [
                54
            ],
            "chain_id": [
                54
            ],
            "is_pre_registering_dynamic_contracts": [
                6
            ],
            "log_index": [
                54
            ],
            "__typename": [
                217
            ]
        },
        "jsonb": {},
        "jsonb_cast_exp": {
            "String": [
                218
            ],
            "__typename": [
                217
            ]
        },
        "jsonb_comparison_exp": {
            "_cast": [
                289
            ],
            "_contained_in": [
                288
            ],
            "_contains": [
                288
            ],
            "_eq": [
                288
            ],
            "_gt": [
                288
            ],
            "_gte": [
                288
            ],
            "_has_key": [
                217
            ],
            "_has_keys_all": [
                217
            ],
            "_has_keys_any": [
                217
            ],
            "_in": [
                288
            ],
            "_is_null": [
                6
            ],
            "_lt": [
                288
            ],
            "_lte": [
                288
            ],
            "_neq": [
                288
            ],
            "_nin": [
                288
            ],
            "__typename": [
                217
            ]
        },
        "loanstatus": {},
        "loanstatus_comparison_exp": {
            "_eq": [
                291
            ],
            "_gt": [
                291
            ],
            "_gte": [
                291
            ],
            "_in": [
                291
            ],
            "_is_null": [
                6
            ],
            "_lt": [
                291
            ],
            "_lte": [
                291
            ],
            "_neq": [
                291
            ],
            "_nin": [
                291
            ],
            "__typename": [
                217
            ]
        },
        "marketstatus": {},
        "marketstatus_comparison_exp": {
            "_eq": [
                293
            ],
            "_gt": [
                293
            ],
            "_gte": [
                293
            ],
            "_in": [
                293
            ],
            "_is_null": [
                6
            ],
            "_lt": [
                293
            ],
            "_lte": [
                293
            ],
            "_neq": [
                293
            ],
            "_nin": [
                293
            ],
            "__typename": [
                217
            ]
        },
        "numeric": {},
        "numeric_comparison_exp": {
            "_eq": [
                295
            ],
            "_gt": [
                295
            ],
            "_gte": [
                295
            ],
            "_in": [
                295
            ],
            "_is_null": [
                6
            ],
            "_lt": [
                295
            ],
            "_lte": [
                295
            ],
            "_neq": [
                295
            ],
            "_nin": [
                295
            ],
            "__typename": [
                217
            ]
        },
        "order_by": {},
        "persisted_state": {
            "abi_files_hash": [
                217
            ],
            "config_hash": [
                217
            ],
            "envio_version": [
                217
            ],
            "handler_files_hash": [
                217
            ],
            "id": [
                54
            ],
            "schema_hash": [
                217
            ],
            "__typename": [
                217
            ]
        },
        "persisted_state_bool_exp": {
            "_and": [
                299
            ],
            "_not": [
                299
            ],
            "_or": [
                299
            ],
            "abi_files_hash": [
                218
            ],
            "config_hash": [
                218
            ],
            "envio_version": [
                218
            ],
            "handler_files_hash": [
                218
            ],
            "id": [
                55
            ],
            "schema_hash": [
                218
            ],
            "__typename": [
                217
            ]
        },
        "persisted_state_order_by": {
            "abi_files_hash": [
                297
            ],
            "config_hash": [
                297
            ],
            "envio_version": [
                297
            ],
            "handler_files_hash": [
                297
            ],
            "id": [
                297
            ],
            "schema_hash": [
                297
            ],
            "__typename": [
                217
            ]
        },
        "persisted_state_select_column": {},
        "persisted_state_stream_cursor_input": {
            "initial_value": [
                303
            ],
            "ordering": [
                269
            ],
            "__typename": [
                217
            ]
        },
        "persisted_state_stream_cursor_value_input": {
            "abi_files_hash": [
                217
            ],
            "config_hash": [
                217
            ],
            "envio_version": [
                217
            ],
            "handler_files_hash": [
                217
            ],
            "id": [
                54
            ],
            "schema_hash": [
                217
            ],
            "__typename": [
                217
            ]
        },
        "presaleclaimtype": {},
        "presaleclaimtype_comparison_exp": {
            "_eq": [
                304
            ],
            "_gt": [
                304
            ],
            "_gte": [
                304
            ],
            "_in": [
                304
            ],
            "_is_null": [
                6
            ],
            "_lt": [
                304
            ],
            "_lte": [
                304
            ],
            "_neq": [
                304
            ],
            "_nin": [
                304
            ],
            "__typename": [
                217
            ]
        },
        "presaleconfigeventtype": {},
        "presaleconfigeventtype_comparison_exp": {
            "_eq": [
                306
            ],
            "_gt": [
                306
            ],
            "_gte": [
                306
            ],
            "_in": [
                306
            ],
            "_is_null": [
                6
            ],
            "_lt": [
                306
            ],
            "_lte": [
                306
            ],
            "_neq": [
                306
            ],
            "_nin": [
                306
            ],
            "__typename": [
                217
            ]
        },
        "raw_events": {
            "block_fields": [
                288,
                {
                    "path": [
                        217
                    ]
                }
            ],
            "block_hash": [
                217
            ],
            "block_number": [
                54
            ],
            "block_timestamp": [
                54
            ],
            "chain_id": [
                54
            ],
            "contract_name": [
                217
            ],
            "db_write_timestamp": [
                316
            ],
            "event_id": [
                295
            ],
            "event_name": [
                217
            ],
            "log_index": [
                54
            ],
            "params": [
                288,
                {
                    "path": [
                        217
                    ]
                }
            ],
            "serial": [
                54
            ],
            "src_address": [
                217
            ],
            "transaction_fields": [
                288,
                {
                    "path": [
                        217
                    ]
                }
            ],
            "__typename": [
                217
            ]
        },
        "raw_events_bool_exp": {
            "_and": [
                309
            ],
            "_not": [
                309
            ],
            "_or": [
                309
            ],
            "block_fields": [
                290
            ],
            "block_hash": [
                218
            ],
            "block_number": [
                55
            ],
            "block_timestamp": [
                55
            ],
            "chain_id": [
                55
            ],
            "contract_name": [
                218
            ],
            "db_write_timestamp": [
                317
            ],
            "event_id": [
                296
            ],
            "event_name": [
                218
            ],
            "log_index": [
                55
            ],
            "params": [
                290
            ],
            "serial": [
                55
            ],
            "src_address": [
                218
            ],
            "transaction_fields": [
                290
            ],
            "__typename": [
                217
            ]
        },
        "raw_events_order_by": {
            "block_fields": [
                297
            ],
            "block_hash": [
                297
            ],
            "block_number": [
                297
            ],
            "block_timestamp": [
                297
            ],
            "chain_id": [
                297
            ],
            "contract_name": [
                297
            ],
            "db_write_timestamp": [
                297
            ],
            "event_id": [
                297
            ],
            "event_name": [
                297
            ],
            "log_index": [
                297
            ],
            "params": [
                297
            ],
            "serial": [
                297
            ],
            "src_address": [
                297
            ],
            "transaction_fields": [
                297
            ],
            "__typename": [
                217
            ]
        },
        "raw_events_select_column": {},
        "raw_events_stream_cursor_input": {
            "initial_value": [
                313
            ],
            "ordering": [
                269
            ],
            "__typename": [
                217
            ]
        },
        "raw_events_stream_cursor_value_input": {
            "block_fields": [
                288
            ],
            "block_hash": [
                217
            ],
            "block_number": [
                54
            ],
            "block_timestamp": [
                54
            ],
            "chain_id": [
                54
            ],
            "contract_name": [
                217
            ],
            "db_write_timestamp": [
                316
            ],
            "event_id": [
                295
            ],
            "event_name": [
                217
            ],
            "log_index": [
                54
            ],
            "params": [
                288
            ],
            "serial": [
                54
            ],
            "src_address": [
                217
            ],
            "transaction_fields": [
                288
            ],
            "__typename": [
                217
            ]
        },
        "stakestatus": {},
        "stakestatus_comparison_exp": {
            "_eq": [
                314
            ],
            "_gt": [
                314
            ],
            "_gte": [
                314
            ],
            "_in": [
                314
            ],
            "_is_null": [
                6
            ],
            "_lt": [
                314
            ],
            "_lte": [
                314
            ],
            "_neq": [
                314
            ],
            "_nin": [
                314
            ],
            "__typename": [
                217
            ]
        },
        "timestamp": {},
        "timestamp_comparison_exp": {
            "_eq": [
                316
            ],
            "_gt": [
                316
            ],
            "_gte": [
                316
            ],
            "_in": [
                316
            ],
            "_is_null": [
                6
            ],
            "_lt": [
                316
            ],
            "_lte": [
                316
            ],
            "_neq": [
                316
            ],
            "_nin": [
                316
            ],
            "__typename": [
                217
            ]
        },
        "timestamptz": {},
        "timestamptz_comparison_exp": {
            "_eq": [
                318
            ],
            "_gt": [
                318
            ],
            "_gte": [
                318
            ],
            "_in": [
                318
            ],
            "_is_null": [
                6
            ],
            "_lt": [
                318
            ],
            "_lte": [
                318
            ],
            "_neq": [
                318
            ],
            "_nin": [
                318
            ],
            "__typename": [
                217
            ]
        },
        "tradetype": {},
        "tradetype_comparison_exp": {
            "_eq": [
                320
            ],
            "_gt": [
                320
            ],
            "_gte": [
                320
            ],
            "_in": [
                320
            ],
            "_is_null": [
                6
            ],
            "_lt": [
                320
            ],
            "_lte": [
                320
            ],
            "_neq": [
                320
            ],
            "_nin": [
                320
            ],
            "__typename": [
                217
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
                        54
                    ],
                    "offset": [
                        54
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
                        217,
                        "String!"
                    ]
                }
            ],
            "CreditFacilityContract": [
                8,
                {
                    "distinct_on": [
                        11,
                        "[CreditFacilityContract_select_column!]"
                    ],
                    "limit": [
                        54
                    ],
                    "offset": [
                        54
                    ],
                    "order_by": [
                        10,
                        "[CreditFacilityContract_order_by!]"
                    ],
                    "where": [
                        9
                    ]
                }
            ],
            "CreditFacilityContract_by_pk": [
                8,
                {
                    "id": [
                        217,
                        "String!"
                    ]
                }
            ],
            "FeeDistribution": [
                14,
                {
                    "distinct_on": [
                        21,
                        "[FeeDistribution_select_column!]"
                    ],
                    "limit": [
                        54
                    ],
                    "offset": [
                        54
                    ],
                    "order_by": [
                        20,
                        "[FeeDistribution_order_by!]"
                    ],
                    "where": [
                        17
                    ]
                }
            ],
            "FeeDistribution_by_pk": [
                14,
                {
                    "id": [
                        217,
                        "String!"
                    ]
                }
            ],
            "FloorElevation": [
                31,
                {
                    "distinct_on": [
                        38,
                        "[FloorElevation_select_column!]"
                    ],
                    "limit": [
                        54
                    ],
                    "offset": [
                        54
                    ],
                    "order_by": [
                        37,
                        "[FloorElevation_order_by!]"
                    ],
                    "where": [
                        34
                    ]
                }
            ],
            "FloorElevation_by_pk": [
                31,
                {
                    "id": [
                        217,
                        "String!"
                    ]
                }
            ],
            "GlobalStats": [
                48,
                {
                    "distinct_on": [
                        51,
                        "[GlobalStats_select_column!]"
                    ],
                    "limit": [
                        54
                    ],
                    "offset": [
                        54
                    ],
                    "order_by": [
                        50,
                        "[GlobalStats_order_by!]"
                    ],
                    "where": [
                        49
                    ]
                }
            ],
            "GlobalStats_by_pk": [
                48,
                {
                    "id": [
                        217,
                        "String!"
                    ]
                }
            ],
            "Loan": [
                56,
                {
                    "distinct_on": [
                        80,
                        "[Loan_select_column!]"
                    ],
                    "limit": [
                        54
                    ],
                    "offset": [
                        54
                    ],
                    "order_by": [
                        79,
                        "[Loan_order_by!]"
                    ],
                    "where": [
                        76
                    ]
                }
            ],
            "LoanStatusHistory": [
                57,
                {
                    "distinct_on": [
                        64,
                        "[LoanStatusHistory_select_column!]"
                    ],
                    "limit": [
                        54
                    ],
                    "offset": [
                        54
                    ],
                    "order_by": [
                        63,
                        "[LoanStatusHistory_order_by!]"
                    ],
                    "where": [
                        60
                    ]
                }
            ],
            "LoanStatusHistory_by_pk": [
                57,
                {
                    "id": [
                        217,
                        "String!"
                    ]
                }
            ],
            "Loan_by_pk": [
                56,
                {
                    "id": [
                        217,
                        "String!"
                    ]
                }
            ],
            "Market": [
                90,
                {
                    "distinct_on": [
                        109,
                        "[Market_select_column!]"
                    ],
                    "limit": [
                        54
                    ],
                    "offset": [
                        54
                    ],
                    "order_by": [
                        108,
                        "[Market_order_by!]"
                    ],
                    "where": [
                        105
                    ]
                }
            ],
            "MarketRollingStats": [
                91,
                {
                    "distinct_on": [
                        94,
                        "[MarketRollingStats_select_column!]"
                    ],
                    "limit": [
                        54
                    ],
                    "offset": [
                        54
                    ],
                    "order_by": [
                        93,
                        "[MarketRollingStats_order_by!]"
                    ],
                    "where": [
                        92
                    ]
                }
            ],
            "MarketRollingStats_by_pk": [
                91,
                {
                    "id": [
                        217,
                        "String!"
                    ]
                }
            ],
            "MarketSnapshot": [
                97,
                {
                    "distinct_on": [
                        100,
                        "[MarketSnapshot_select_column!]"
                    ],
                    "limit": [
                        54
                    ],
                    "offset": [
                        54
                    ],
                    "order_by": [
                        99,
                        "[MarketSnapshot_order_by!]"
                    ],
                    "where": [
                        98
                    ]
                }
            ],
            "MarketSnapshot_by_pk": [
                97,
                {
                    "id": [
                        217,
                        "String!"
                    ]
                }
            ],
            "Market_by_pk": [
                90,
                {
                    "id": [
                        217,
                        "String!"
                    ]
                }
            ],
            "ModuleAddress": [
                119,
                {
                    "distinct_on": [
                        122,
                        "[ModuleAddress_select_column!]"
                    ],
                    "limit": [
                        54
                    ],
                    "offset": [
                        54
                    ],
                    "order_by": [
                        121,
                        "[ModuleAddress_order_by!]"
                    ],
                    "where": [
                        120
                    ]
                }
            ],
            "ModuleAddress_by_pk": [
                119,
                {
                    "id": [
                        217,
                        "String!"
                    ]
                }
            ],
            "ModuleRegistry": [
                125,
                {
                    "distinct_on": [
                        128,
                        "[ModuleRegistry_select_column!]"
                    ],
                    "limit": [
                        54
                    ],
                    "offset": [
                        54
                    ],
                    "order_by": [
                        127,
                        "[ModuleRegistry_order_by!]"
                    ],
                    "where": [
                        126
                    ]
                }
            ],
            "ModuleRegistry_by_pk": [
                125,
                {
                    "id": [
                        217,
                        "String!"
                    ]
                }
            ],
            "PreSaleContract": [
                131,
                {
                    "distinct_on": [
                        134,
                        "[PreSaleContract_select_column!]"
                    ],
                    "limit": [
                        54
                    ],
                    "offset": [
                        54
                    ],
                    "order_by": [
                        133,
                        "[PreSaleContract_order_by!]"
                    ],
                    "where": [
                        132
                    ]
                }
            ],
            "PreSaleContract_by_pk": [
                131,
                {
                    "id": [
                        217,
                        "String!"
                    ]
                }
            ],
            "PresaleClaim": [
                137,
                {
                    "distinct_on": [
                        144,
                        "[PresaleClaim_select_column!]"
                    ],
                    "limit": [
                        54
                    ],
                    "offset": [
                        54
                    ],
                    "order_by": [
                        143,
                        "[PresaleClaim_order_by!]"
                    ],
                    "where": [
                        140
                    ]
                }
            ],
            "PresaleClaim_by_pk": [
                137,
                {
                    "id": [
                        217,
                        "String!"
                    ]
                }
            ],
            "PresaleConfigEvent": [
                154,
                {
                    "distinct_on": [
                        161,
                        "[PresaleConfigEvent_select_column!]"
                    ],
                    "limit": [
                        54
                    ],
                    "offset": [
                        54
                    ],
                    "order_by": [
                        160,
                        "[PresaleConfigEvent_order_by!]"
                    ],
                    "where": [
                        157
                    ]
                }
            ],
            "PresaleConfigEvent_by_pk": [
                154,
                {
                    "id": [
                        217,
                        "String!"
                    ]
                }
            ],
            "PresaleParticipation": [
                171,
                {
                    "distinct_on": [
                        178,
                        "[PresaleParticipation_select_column!]"
                    ],
                    "limit": [
                        54
                    ],
                    "offset": [
                        54
                    ],
                    "order_by": [
                        177,
                        "[PresaleParticipation_order_by!]"
                    ],
                    "where": [
                        174
                    ]
                }
            ],
            "PresaleParticipation_by_pk": [
                171,
                {
                    "id": [
                        217,
                        "String!"
                    ]
                }
            ],
            "PriceCandle": [
                188,
                {
                    "distinct_on": [
                        191,
                        "[PriceCandle_select_column!]"
                    ],
                    "limit": [
                        54
                    ],
                    "offset": [
                        54
                    ],
                    "order_by": [
                        190,
                        "[PriceCandle_order_by!]"
                    ],
                    "where": [
                        189
                    ]
                }
            ],
            "PriceCandle_by_pk": [
                188,
                {
                    "id": [
                        217,
                        "String!"
                    ]
                }
            ],
            "Stake": [
                194,
                {
                    "distinct_on": [
                        201,
                        "[Stake_select_column!]"
                    ],
                    "limit": [
                        54
                    ],
                    "offset": [
                        54
                    ],
                    "order_by": [
                        200,
                        "[Stake_order_by!]"
                    ],
                    "where": [
                        197
                    ]
                }
            ],
            "Stake_by_pk": [
                194,
                {
                    "id": [
                        217,
                        "String!"
                    ]
                }
            ],
            "StakingContract": [
                211,
                {
                    "distinct_on": [
                        214,
                        "[StakingContract_select_column!]"
                    ],
                    "limit": [
                        54
                    ],
                    "offset": [
                        54
                    ],
                    "order_by": [
                        213,
                        "[StakingContract_order_by!]"
                    ],
                    "where": [
                        212
                    ]
                }
            ],
            "StakingContract_by_pk": [
                211,
                {
                    "id": [
                        217,
                        "String!"
                    ]
                }
            ],
            "Token": [
                219,
                {
                    "distinct_on": [
                        222,
                        "[Token_select_column!]"
                    ],
                    "limit": [
                        54
                    ],
                    "offset": [
                        54
                    ],
                    "order_by": [
                        221,
                        "[Token_order_by!]"
                    ],
                    "where": [
                        220
                    ]
                }
            ],
            "Token_by_pk": [
                219,
                {
                    "id": [
                        217,
                        "String!"
                    ]
                }
            ],
            "Trade": [
                225,
                {
                    "distinct_on": [
                        232,
                        "[Trade_select_column!]"
                    ],
                    "limit": [
                        54
                    ],
                    "offset": [
                        54
                    ],
                    "order_by": [
                        231,
                        "[Trade_order_by!]"
                    ],
                    "where": [
                        228
                    ]
                }
            ],
            "Trade_by_pk": [
                225,
                {
                    "id": [
                        217,
                        "String!"
                    ]
                }
            ],
            "UserMarketPosition": [
                242,
                {
                    "distinct_on": [
                        249,
                        "[UserMarketPosition_select_column!]"
                    ],
                    "limit": [
                        54
                    ],
                    "offset": [
                        54
                    ],
                    "order_by": [
                        248,
                        "[UserMarketPosition_order_by!]"
                    ],
                    "where": [
                        245
                    ]
                }
            ],
            "UserMarketPosition_by_pk": [
                242,
                {
                    "id": [
                        217,
                        "String!"
                    ]
                }
            ],
            "chain_metadata": [
                261,
                {
                    "distinct_on": [
                        264,
                        "[chain_metadata_select_column!]"
                    ],
                    "limit": [
                        54
                    ],
                    "offset": [
                        54
                    ],
                    "order_by": [
                        263,
                        "[chain_metadata_order_by!]"
                    ],
                    "where": [
                        262
                    ]
                }
            ],
            "chain_metadata_by_pk": [
                261,
                {
                    "chain_id": [
                        54,
                        "Int!"
                    ]
                }
            ],
            "dynamic_contract_registry": [
                270,
                {
                    "distinct_on": [
                        273,
                        "[dynamic_contract_registry_select_column!]"
                    ],
                    "limit": [
                        54
                    ],
                    "offset": [
                        54
                    ],
                    "order_by": [
                        272,
                        "[dynamic_contract_registry_order_by!]"
                    ],
                    "where": [
                        271
                    ]
                }
            ],
            "dynamic_contract_registry_by_pk": [
                270,
                {
                    "id": [
                        217,
                        "String!"
                    ]
                }
            ],
            "end_of_block_range_scanned_data": [
                276,
                {
                    "distinct_on": [
                        279,
                        "[end_of_block_range_scanned_data_select_column!]"
                    ],
                    "limit": [
                        54
                    ],
                    "offset": [
                        54
                    ],
                    "order_by": [
                        278,
                        "[end_of_block_range_scanned_data_order_by!]"
                    ],
                    "where": [
                        277
                    ]
                }
            ],
            "end_of_block_range_scanned_data_by_pk": [
                276,
                {
                    "block_number": [
                        54,
                        "Int!"
                    ],
                    "chain_id": [
                        54,
                        "Int!"
                    ]
                }
            ],
            "event_sync_state": [
                282,
                {
                    "distinct_on": [
                        285,
                        "[event_sync_state_select_column!]"
                    ],
                    "limit": [
                        54
                    ],
                    "offset": [
                        54
                    ],
                    "order_by": [
                        284,
                        "[event_sync_state_order_by!]"
                    ],
                    "where": [
                        283
                    ]
                }
            ],
            "event_sync_state_by_pk": [
                282,
                {
                    "chain_id": [
                        54,
                        "Int!"
                    ]
                }
            ],
            "persisted_state": [
                298,
                {
                    "distinct_on": [
                        301,
                        "[persisted_state_select_column!]"
                    ],
                    "limit": [
                        54
                    ],
                    "offset": [
                        54
                    ],
                    "order_by": [
                        300,
                        "[persisted_state_order_by!]"
                    ],
                    "where": [
                        299
                    ]
                }
            ],
            "persisted_state_by_pk": [
                298,
                {
                    "id": [
                        54,
                        "Int!"
                    ]
                }
            ],
            "raw_events": [
                308,
                {
                    "distinct_on": [
                        311,
                        "[raw_events_select_column!]"
                    ],
                    "limit": [
                        54
                    ],
                    "offset": [
                        54
                    ],
                    "order_by": [
                        310,
                        "[raw_events_order_by!]"
                    ],
                    "where": [
                        309
                    ]
                }
            ],
            "raw_events_by_pk": [
                308,
                {
                    "serial": [
                        54,
                        "Int!"
                    ]
                }
            ],
            "__typename": [
                217
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
                        54
                    ],
                    "offset": [
                        54
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
                        217,
                        "String!"
                    ]
                }
            ],
            "Account_stream": [
                0,
                {
                    "batch_size": [
                        54,
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
            "CreditFacilityContract": [
                8,
                {
                    "distinct_on": [
                        11,
                        "[CreditFacilityContract_select_column!]"
                    ],
                    "limit": [
                        54
                    ],
                    "offset": [
                        54
                    ],
                    "order_by": [
                        10,
                        "[CreditFacilityContract_order_by!]"
                    ],
                    "where": [
                        9
                    ]
                }
            ],
            "CreditFacilityContract_by_pk": [
                8,
                {
                    "id": [
                        217,
                        "String!"
                    ]
                }
            ],
            "CreditFacilityContract_stream": [
                8,
                {
                    "batch_size": [
                        54,
                        "Int!"
                    ],
                    "cursor": [
                        12,
                        "[CreditFacilityContract_stream_cursor_input]!"
                    ],
                    "where": [
                        9
                    ]
                }
            ],
            "FeeDistribution": [
                14,
                {
                    "distinct_on": [
                        21,
                        "[FeeDistribution_select_column!]"
                    ],
                    "limit": [
                        54
                    ],
                    "offset": [
                        54
                    ],
                    "order_by": [
                        20,
                        "[FeeDistribution_order_by!]"
                    ],
                    "where": [
                        17
                    ]
                }
            ],
            "FeeDistribution_by_pk": [
                14,
                {
                    "id": [
                        217,
                        "String!"
                    ]
                }
            ],
            "FeeDistribution_stream": [
                14,
                {
                    "batch_size": [
                        54,
                        "Int!"
                    ],
                    "cursor": [
                        25,
                        "[FeeDistribution_stream_cursor_input]!"
                    ],
                    "where": [
                        17
                    ]
                }
            ],
            "FloorElevation": [
                31,
                {
                    "distinct_on": [
                        38,
                        "[FloorElevation_select_column!]"
                    ],
                    "limit": [
                        54
                    ],
                    "offset": [
                        54
                    ],
                    "order_by": [
                        37,
                        "[FloorElevation_order_by!]"
                    ],
                    "where": [
                        34
                    ]
                }
            ],
            "FloorElevation_by_pk": [
                31,
                {
                    "id": [
                        217,
                        "String!"
                    ]
                }
            ],
            "FloorElevation_stream": [
                31,
                {
                    "batch_size": [
                        54,
                        "Int!"
                    ],
                    "cursor": [
                        42,
                        "[FloorElevation_stream_cursor_input]!"
                    ],
                    "where": [
                        34
                    ]
                }
            ],
            "GlobalStats": [
                48,
                {
                    "distinct_on": [
                        51,
                        "[GlobalStats_select_column!]"
                    ],
                    "limit": [
                        54
                    ],
                    "offset": [
                        54
                    ],
                    "order_by": [
                        50,
                        "[GlobalStats_order_by!]"
                    ],
                    "where": [
                        49
                    ]
                }
            ],
            "GlobalStats_by_pk": [
                48,
                {
                    "id": [
                        217,
                        "String!"
                    ]
                }
            ],
            "GlobalStats_stream": [
                48,
                {
                    "batch_size": [
                        54,
                        "Int!"
                    ],
                    "cursor": [
                        52,
                        "[GlobalStats_stream_cursor_input]!"
                    ],
                    "where": [
                        49
                    ]
                }
            ],
            "Loan": [
                56,
                {
                    "distinct_on": [
                        80,
                        "[Loan_select_column!]"
                    ],
                    "limit": [
                        54
                    ],
                    "offset": [
                        54
                    ],
                    "order_by": [
                        79,
                        "[Loan_order_by!]"
                    ],
                    "where": [
                        76
                    ]
                }
            ],
            "LoanStatusHistory": [
                57,
                {
                    "distinct_on": [
                        64,
                        "[LoanStatusHistory_select_column!]"
                    ],
                    "limit": [
                        54
                    ],
                    "offset": [
                        54
                    ],
                    "order_by": [
                        63,
                        "[LoanStatusHistory_order_by!]"
                    ],
                    "where": [
                        60
                    ]
                }
            ],
            "LoanStatusHistory_by_pk": [
                57,
                {
                    "id": [
                        217,
                        "String!"
                    ]
                }
            ],
            "LoanStatusHistory_stream": [
                57,
                {
                    "batch_size": [
                        54,
                        "Int!"
                    ],
                    "cursor": [
                        68,
                        "[LoanStatusHistory_stream_cursor_input]!"
                    ],
                    "where": [
                        60
                    ]
                }
            ],
            "Loan_by_pk": [
                56,
                {
                    "id": [
                        217,
                        "String!"
                    ]
                }
            ],
            "Loan_stream": [
                56,
                {
                    "batch_size": [
                        54,
                        "Int!"
                    ],
                    "cursor": [
                        84,
                        "[Loan_stream_cursor_input]!"
                    ],
                    "where": [
                        76
                    ]
                }
            ],
            "Market": [
                90,
                {
                    "distinct_on": [
                        109,
                        "[Market_select_column!]"
                    ],
                    "limit": [
                        54
                    ],
                    "offset": [
                        54
                    ],
                    "order_by": [
                        108,
                        "[Market_order_by!]"
                    ],
                    "where": [
                        105
                    ]
                }
            ],
            "MarketRollingStats": [
                91,
                {
                    "distinct_on": [
                        94,
                        "[MarketRollingStats_select_column!]"
                    ],
                    "limit": [
                        54
                    ],
                    "offset": [
                        54
                    ],
                    "order_by": [
                        93,
                        "[MarketRollingStats_order_by!]"
                    ],
                    "where": [
                        92
                    ]
                }
            ],
            "MarketRollingStats_by_pk": [
                91,
                {
                    "id": [
                        217,
                        "String!"
                    ]
                }
            ],
            "MarketRollingStats_stream": [
                91,
                {
                    "batch_size": [
                        54,
                        "Int!"
                    ],
                    "cursor": [
                        95,
                        "[MarketRollingStats_stream_cursor_input]!"
                    ],
                    "where": [
                        92
                    ]
                }
            ],
            "MarketSnapshot": [
                97,
                {
                    "distinct_on": [
                        100,
                        "[MarketSnapshot_select_column!]"
                    ],
                    "limit": [
                        54
                    ],
                    "offset": [
                        54
                    ],
                    "order_by": [
                        99,
                        "[MarketSnapshot_order_by!]"
                    ],
                    "where": [
                        98
                    ]
                }
            ],
            "MarketSnapshot_by_pk": [
                97,
                {
                    "id": [
                        217,
                        "String!"
                    ]
                }
            ],
            "MarketSnapshot_stream": [
                97,
                {
                    "batch_size": [
                        54,
                        "Int!"
                    ],
                    "cursor": [
                        101,
                        "[MarketSnapshot_stream_cursor_input]!"
                    ],
                    "where": [
                        98
                    ]
                }
            ],
            "Market_by_pk": [
                90,
                {
                    "id": [
                        217,
                        "String!"
                    ]
                }
            ],
            "Market_stream": [
                90,
                {
                    "batch_size": [
                        54,
                        "Int!"
                    ],
                    "cursor": [
                        113,
                        "[Market_stream_cursor_input]!"
                    ],
                    "where": [
                        105
                    ]
                }
            ],
            "ModuleAddress": [
                119,
                {
                    "distinct_on": [
                        122,
                        "[ModuleAddress_select_column!]"
                    ],
                    "limit": [
                        54
                    ],
                    "offset": [
                        54
                    ],
                    "order_by": [
                        121,
                        "[ModuleAddress_order_by!]"
                    ],
                    "where": [
                        120
                    ]
                }
            ],
            "ModuleAddress_by_pk": [
                119,
                {
                    "id": [
                        217,
                        "String!"
                    ]
                }
            ],
            "ModuleAddress_stream": [
                119,
                {
                    "batch_size": [
                        54,
                        "Int!"
                    ],
                    "cursor": [
                        123,
                        "[ModuleAddress_stream_cursor_input]!"
                    ],
                    "where": [
                        120
                    ]
                }
            ],
            "ModuleRegistry": [
                125,
                {
                    "distinct_on": [
                        128,
                        "[ModuleRegistry_select_column!]"
                    ],
                    "limit": [
                        54
                    ],
                    "offset": [
                        54
                    ],
                    "order_by": [
                        127,
                        "[ModuleRegistry_order_by!]"
                    ],
                    "where": [
                        126
                    ]
                }
            ],
            "ModuleRegistry_by_pk": [
                125,
                {
                    "id": [
                        217,
                        "String!"
                    ]
                }
            ],
            "ModuleRegistry_stream": [
                125,
                {
                    "batch_size": [
                        54,
                        "Int!"
                    ],
                    "cursor": [
                        129,
                        "[ModuleRegistry_stream_cursor_input]!"
                    ],
                    "where": [
                        126
                    ]
                }
            ],
            "PreSaleContract": [
                131,
                {
                    "distinct_on": [
                        134,
                        "[PreSaleContract_select_column!]"
                    ],
                    "limit": [
                        54
                    ],
                    "offset": [
                        54
                    ],
                    "order_by": [
                        133,
                        "[PreSaleContract_order_by!]"
                    ],
                    "where": [
                        132
                    ]
                }
            ],
            "PreSaleContract_by_pk": [
                131,
                {
                    "id": [
                        217,
                        "String!"
                    ]
                }
            ],
            "PreSaleContract_stream": [
                131,
                {
                    "batch_size": [
                        54,
                        "Int!"
                    ],
                    "cursor": [
                        135,
                        "[PreSaleContract_stream_cursor_input]!"
                    ],
                    "where": [
                        132
                    ]
                }
            ],
            "PresaleClaim": [
                137,
                {
                    "distinct_on": [
                        144,
                        "[PresaleClaim_select_column!]"
                    ],
                    "limit": [
                        54
                    ],
                    "offset": [
                        54
                    ],
                    "order_by": [
                        143,
                        "[PresaleClaim_order_by!]"
                    ],
                    "where": [
                        140
                    ]
                }
            ],
            "PresaleClaim_by_pk": [
                137,
                {
                    "id": [
                        217,
                        "String!"
                    ]
                }
            ],
            "PresaleClaim_stream": [
                137,
                {
                    "batch_size": [
                        54,
                        "Int!"
                    ],
                    "cursor": [
                        148,
                        "[PresaleClaim_stream_cursor_input]!"
                    ],
                    "where": [
                        140
                    ]
                }
            ],
            "PresaleConfigEvent": [
                154,
                {
                    "distinct_on": [
                        161,
                        "[PresaleConfigEvent_select_column!]"
                    ],
                    "limit": [
                        54
                    ],
                    "offset": [
                        54
                    ],
                    "order_by": [
                        160,
                        "[PresaleConfigEvent_order_by!]"
                    ],
                    "where": [
                        157
                    ]
                }
            ],
            "PresaleConfigEvent_by_pk": [
                154,
                {
                    "id": [
                        217,
                        "String!"
                    ]
                }
            ],
            "PresaleConfigEvent_stream": [
                154,
                {
                    "batch_size": [
                        54,
                        "Int!"
                    ],
                    "cursor": [
                        165,
                        "[PresaleConfigEvent_stream_cursor_input]!"
                    ],
                    "where": [
                        157
                    ]
                }
            ],
            "PresaleParticipation": [
                171,
                {
                    "distinct_on": [
                        178,
                        "[PresaleParticipation_select_column!]"
                    ],
                    "limit": [
                        54
                    ],
                    "offset": [
                        54
                    ],
                    "order_by": [
                        177,
                        "[PresaleParticipation_order_by!]"
                    ],
                    "where": [
                        174
                    ]
                }
            ],
            "PresaleParticipation_by_pk": [
                171,
                {
                    "id": [
                        217,
                        "String!"
                    ]
                }
            ],
            "PresaleParticipation_stream": [
                171,
                {
                    "batch_size": [
                        54,
                        "Int!"
                    ],
                    "cursor": [
                        182,
                        "[PresaleParticipation_stream_cursor_input]!"
                    ],
                    "where": [
                        174
                    ]
                }
            ],
            "PriceCandle": [
                188,
                {
                    "distinct_on": [
                        191,
                        "[PriceCandle_select_column!]"
                    ],
                    "limit": [
                        54
                    ],
                    "offset": [
                        54
                    ],
                    "order_by": [
                        190,
                        "[PriceCandle_order_by!]"
                    ],
                    "where": [
                        189
                    ]
                }
            ],
            "PriceCandle_by_pk": [
                188,
                {
                    "id": [
                        217,
                        "String!"
                    ]
                }
            ],
            "PriceCandle_stream": [
                188,
                {
                    "batch_size": [
                        54,
                        "Int!"
                    ],
                    "cursor": [
                        192,
                        "[PriceCandle_stream_cursor_input]!"
                    ],
                    "where": [
                        189
                    ]
                }
            ],
            "Stake": [
                194,
                {
                    "distinct_on": [
                        201,
                        "[Stake_select_column!]"
                    ],
                    "limit": [
                        54
                    ],
                    "offset": [
                        54
                    ],
                    "order_by": [
                        200,
                        "[Stake_order_by!]"
                    ],
                    "where": [
                        197
                    ]
                }
            ],
            "Stake_by_pk": [
                194,
                {
                    "id": [
                        217,
                        "String!"
                    ]
                }
            ],
            "Stake_stream": [
                194,
                {
                    "batch_size": [
                        54,
                        "Int!"
                    ],
                    "cursor": [
                        205,
                        "[Stake_stream_cursor_input]!"
                    ],
                    "where": [
                        197
                    ]
                }
            ],
            "StakingContract": [
                211,
                {
                    "distinct_on": [
                        214,
                        "[StakingContract_select_column!]"
                    ],
                    "limit": [
                        54
                    ],
                    "offset": [
                        54
                    ],
                    "order_by": [
                        213,
                        "[StakingContract_order_by!]"
                    ],
                    "where": [
                        212
                    ]
                }
            ],
            "StakingContract_by_pk": [
                211,
                {
                    "id": [
                        217,
                        "String!"
                    ]
                }
            ],
            "StakingContract_stream": [
                211,
                {
                    "batch_size": [
                        54,
                        "Int!"
                    ],
                    "cursor": [
                        215,
                        "[StakingContract_stream_cursor_input]!"
                    ],
                    "where": [
                        212
                    ]
                }
            ],
            "Token": [
                219,
                {
                    "distinct_on": [
                        222,
                        "[Token_select_column!]"
                    ],
                    "limit": [
                        54
                    ],
                    "offset": [
                        54
                    ],
                    "order_by": [
                        221,
                        "[Token_order_by!]"
                    ],
                    "where": [
                        220
                    ]
                }
            ],
            "Token_by_pk": [
                219,
                {
                    "id": [
                        217,
                        "String!"
                    ]
                }
            ],
            "Token_stream": [
                219,
                {
                    "batch_size": [
                        54,
                        "Int!"
                    ],
                    "cursor": [
                        223,
                        "[Token_stream_cursor_input]!"
                    ],
                    "where": [
                        220
                    ]
                }
            ],
            "Trade": [
                225,
                {
                    "distinct_on": [
                        232,
                        "[Trade_select_column!]"
                    ],
                    "limit": [
                        54
                    ],
                    "offset": [
                        54
                    ],
                    "order_by": [
                        231,
                        "[Trade_order_by!]"
                    ],
                    "where": [
                        228
                    ]
                }
            ],
            "Trade_by_pk": [
                225,
                {
                    "id": [
                        217,
                        "String!"
                    ]
                }
            ],
            "Trade_stream": [
                225,
                {
                    "batch_size": [
                        54,
                        "Int!"
                    ],
                    "cursor": [
                        236,
                        "[Trade_stream_cursor_input]!"
                    ],
                    "where": [
                        228
                    ]
                }
            ],
            "UserMarketPosition": [
                242,
                {
                    "distinct_on": [
                        249,
                        "[UserMarketPosition_select_column!]"
                    ],
                    "limit": [
                        54
                    ],
                    "offset": [
                        54
                    ],
                    "order_by": [
                        248,
                        "[UserMarketPosition_order_by!]"
                    ],
                    "where": [
                        245
                    ]
                }
            ],
            "UserMarketPosition_by_pk": [
                242,
                {
                    "id": [
                        217,
                        "String!"
                    ]
                }
            ],
            "UserMarketPosition_stream": [
                242,
                {
                    "batch_size": [
                        54,
                        "Int!"
                    ],
                    "cursor": [
                        253,
                        "[UserMarketPosition_stream_cursor_input]!"
                    ],
                    "where": [
                        245
                    ]
                }
            ],
            "chain_metadata": [
                261,
                {
                    "distinct_on": [
                        264,
                        "[chain_metadata_select_column!]"
                    ],
                    "limit": [
                        54
                    ],
                    "offset": [
                        54
                    ],
                    "order_by": [
                        263,
                        "[chain_metadata_order_by!]"
                    ],
                    "where": [
                        262
                    ]
                }
            ],
            "chain_metadata_by_pk": [
                261,
                {
                    "chain_id": [
                        54,
                        "Int!"
                    ]
                }
            ],
            "chain_metadata_stream": [
                261,
                {
                    "batch_size": [
                        54,
                        "Int!"
                    ],
                    "cursor": [
                        265,
                        "[chain_metadata_stream_cursor_input]!"
                    ],
                    "where": [
                        262
                    ]
                }
            ],
            "dynamic_contract_registry": [
                270,
                {
                    "distinct_on": [
                        273,
                        "[dynamic_contract_registry_select_column!]"
                    ],
                    "limit": [
                        54
                    ],
                    "offset": [
                        54
                    ],
                    "order_by": [
                        272,
                        "[dynamic_contract_registry_order_by!]"
                    ],
                    "where": [
                        271
                    ]
                }
            ],
            "dynamic_contract_registry_by_pk": [
                270,
                {
                    "id": [
                        217,
                        "String!"
                    ]
                }
            ],
            "dynamic_contract_registry_stream": [
                270,
                {
                    "batch_size": [
                        54,
                        "Int!"
                    ],
                    "cursor": [
                        274,
                        "[dynamic_contract_registry_stream_cursor_input]!"
                    ],
                    "where": [
                        271
                    ]
                }
            ],
            "end_of_block_range_scanned_data": [
                276,
                {
                    "distinct_on": [
                        279,
                        "[end_of_block_range_scanned_data_select_column!]"
                    ],
                    "limit": [
                        54
                    ],
                    "offset": [
                        54
                    ],
                    "order_by": [
                        278,
                        "[end_of_block_range_scanned_data_order_by!]"
                    ],
                    "where": [
                        277
                    ]
                }
            ],
            "end_of_block_range_scanned_data_by_pk": [
                276,
                {
                    "block_number": [
                        54,
                        "Int!"
                    ],
                    "chain_id": [
                        54,
                        "Int!"
                    ]
                }
            ],
            "end_of_block_range_scanned_data_stream": [
                276,
                {
                    "batch_size": [
                        54,
                        "Int!"
                    ],
                    "cursor": [
                        280,
                        "[end_of_block_range_scanned_data_stream_cursor_input]!"
                    ],
                    "where": [
                        277
                    ]
                }
            ],
            "event_sync_state": [
                282,
                {
                    "distinct_on": [
                        285,
                        "[event_sync_state_select_column!]"
                    ],
                    "limit": [
                        54
                    ],
                    "offset": [
                        54
                    ],
                    "order_by": [
                        284,
                        "[event_sync_state_order_by!]"
                    ],
                    "where": [
                        283
                    ]
                }
            ],
            "event_sync_state_by_pk": [
                282,
                {
                    "chain_id": [
                        54,
                        "Int!"
                    ]
                }
            ],
            "event_sync_state_stream": [
                282,
                {
                    "batch_size": [
                        54,
                        "Int!"
                    ],
                    "cursor": [
                        286,
                        "[event_sync_state_stream_cursor_input]!"
                    ],
                    "where": [
                        283
                    ]
                }
            ],
            "persisted_state": [
                298,
                {
                    "distinct_on": [
                        301,
                        "[persisted_state_select_column!]"
                    ],
                    "limit": [
                        54
                    ],
                    "offset": [
                        54
                    ],
                    "order_by": [
                        300,
                        "[persisted_state_order_by!]"
                    ],
                    "where": [
                        299
                    ]
                }
            ],
            "persisted_state_by_pk": [
                298,
                {
                    "id": [
                        54,
                        "Int!"
                    ]
                }
            ],
            "persisted_state_stream": [
                298,
                {
                    "batch_size": [
                        54,
                        "Int!"
                    ],
                    "cursor": [
                        302,
                        "[persisted_state_stream_cursor_input]!"
                    ],
                    "where": [
                        299
                    ]
                }
            ],
            "raw_events": [
                308,
                {
                    "distinct_on": [
                        311,
                        "[raw_events_select_column!]"
                    ],
                    "limit": [
                        54
                    ],
                    "offset": [
                        54
                    ],
                    "order_by": [
                        310,
                        "[raw_events_order_by!]"
                    ],
                    "where": [
                        309
                    ]
                }
            ],
            "raw_events_by_pk": [
                308,
                {
                    "serial": [
                        54,
                        "Int!"
                    ]
                }
            ],
            "raw_events_stream": [
                308,
                {
                    "batch_size": [
                        54,
                        "Int!"
                    ],
                    "cursor": [
                        312,
                        "[raw_events_stream_cursor_input]!"
                    ],
                    "where": [
                        309
                    ]
                }
            ],
            "__typename": [
                217
            ]
        }
    }
}