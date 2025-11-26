export default {
    "scalars": [
        3,
        6,
        11,
        21,
        38,
        51,
        54,
        65,
        81,
        95,
        101,
        110,
        123,
        129,
        135,
        145,
        162,
        175,
        185,
        198,
        201,
        207,
        217,
        234,
        244,
        249,
        252,
        254,
        258,
        264,
        270,
        273,
        276,
        278,
        280,
        283,
        287,
        290,
        295,
        298,
        300,
        302,
        304
    ],
    "types": {
        "Account": {
            "db_write_timestamp": [
                300
            ],
            "id": [
                201
            ],
            "loans": [
                57,
                {
                    "distinct_on": [
                        81,
                        "[Loan_select_column!]"
                    ],
                    "limit": [
                        54
                    ],
                    "offset": [
                        54
                    ],
                    "order_by": [
                        80,
                        "[Loan_order_by!]"
                    ],
                    "where": [
                        77
                    ]
                }
            ],
            "marketsCreated": [
                91,
                {
                    "distinct_on": [
                        110,
                        "[Market_select_column!]"
                    ],
                    "limit": [
                        54
                    ],
                    "offset": [
                        54
                    ],
                    "order_by": [
                        109,
                        "[Market_order_by!]"
                    ],
                    "where": [
                        106
                    ]
                }
            ],
            "presaleParticipations": [
                155,
                {
                    "distinct_on": [
                        162,
                        "[PresaleParticipation_select_column!]"
                    ],
                    "limit": [
                        54
                    ],
                    "offset": [
                        54
                    ],
                    "order_by": [
                        161,
                        "[PresaleParticipation_order_by!]"
                    ],
                    "where": [
                        158
                    ]
                }
            ],
            "stakes": [
                178,
                {
                    "distinct_on": [
                        185,
                        "[Stake_select_column!]"
                    ],
                    "limit": [
                        54
                    ],
                    "offset": [
                        54
                    ],
                    "order_by": [
                        184,
                        "[Stake_order_by!]"
                    ],
                    "where": [
                        181
                    ]
                }
            ],
            "trades": [
                210,
                {
                    "distinct_on": [
                        217,
                        "[Trade_select_column!]"
                    ],
                    "limit": [
                        54
                    ],
                    "offset": [
                        54
                    ],
                    "order_by": [
                        216,
                        "[Trade_order_by!]"
                    ],
                    "where": [
                        213
                    ]
                }
            ],
            "userMarketPositions": [
                227,
                {
                    "distinct_on": [
                        234,
                        "[UserMarketPosition_select_column!]"
                    ],
                    "limit": [
                        54
                    ],
                    "offset": [
                        54
                    ],
                    "order_by": [
                        233,
                        "[UserMarketPosition_order_by!]"
                    ],
                    "where": [
                        230
                    ]
                }
            ],
            "__typename": [
                201
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
                301
            ],
            "id": [
                203
            ],
            "loans": [
                77
            ],
            "marketsCreated": [
                106
            ],
            "presaleParticipations": [
                158
            ],
            "stakes": [
                181
            ],
            "trades": [
                213
            ],
            "userMarketPositions": [
                230
            ],
            "__typename": [
                201
            ]
        },
        "Account_order_by": {
            "db_write_timestamp": [
                283
            ],
            "id": [
                283
            ],
            "loans_aggregate": [
                75
            ],
            "marketsCreated_aggregate": [
                104
            ],
            "presaleParticipations_aggregate": [
                156
            ],
            "stakes_aggregate": [
                179
            ],
            "trades_aggregate": [
                211
            ],
            "userMarketPositions_aggregate": [
                228
            ],
            "__typename": [
                201
            ]
        },
        "Account_select_column": {},
        "Account_stream_cursor_input": {
            "initial_value": [
                5
            ],
            "ordering": [
                254
            ],
            "__typename": [
                201
            ]
        },
        "Account_stream_cursor_value_input": {
            "db_write_timestamp": [
                300
            ],
            "id": [
                201
            ],
            "__typename": [
                201
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
                201
            ]
        },
        "CreditFacilityContract": {
            "borrowToken_id": [
                201
            ],
            "collateralToken_id": [
                201
            ],
            "createdAt": [
                280
            ],
            "db_write_timestamp": [
                300
            ],
            "id": [
                201
            ],
            "lastUpdatedAt": [
                280
            ],
            "loans": [
                57,
                {
                    "distinct_on": [
                        81,
                        "[Loan_select_column!]"
                    ],
                    "limit": [
                        54
                    ],
                    "offset": [
                        54
                    ],
                    "order_by": [
                        80,
                        "[Loan_order_by!]"
                    ],
                    "where": [
                        77
                    ]
                }
            ],
            "market_id": [
                201
            ],
            "totalDebtFormatted": [
                201
            ],
            "totalDebtRaw": [
                280
            ],
            "totalLoans": [
                280
            ],
            "totalLockedCollateralFormatted": [
                201
            ],
            "totalLockedCollateralRaw": [
                280
            ],
            "totalVolumeFormatted": [
                201
            ],
            "totalVolumeRaw": [
                280
            ],
            "__typename": [
                201
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
                203
            ],
            "collateralToken_id": [
                203
            ],
            "createdAt": [
                282
            ],
            "db_write_timestamp": [
                301
            ],
            "id": [
                203
            ],
            "lastUpdatedAt": [
                282
            ],
            "loans": [
                77
            ],
            "market_id": [
                203
            ],
            "totalDebtFormatted": [
                203
            ],
            "totalDebtRaw": [
                282
            ],
            "totalLoans": [
                282
            ],
            "totalLockedCollateralFormatted": [
                203
            ],
            "totalLockedCollateralRaw": [
                282
            ],
            "totalVolumeFormatted": [
                203
            ],
            "totalVolumeRaw": [
                282
            ],
            "__typename": [
                201
            ]
        },
        "CreditFacilityContract_order_by": {
            "borrowToken_id": [
                283
            ],
            "collateralToken_id": [
                283
            ],
            "createdAt": [
                283
            ],
            "db_write_timestamp": [
                283
            ],
            "id": [
                283
            ],
            "lastUpdatedAt": [
                283
            ],
            "loans_aggregate": [
                75
            ],
            "market_id": [
                283
            ],
            "totalDebtFormatted": [
                283
            ],
            "totalDebtRaw": [
                283
            ],
            "totalLoans": [
                283
            ],
            "totalLockedCollateralFormatted": [
                283
            ],
            "totalLockedCollateralRaw": [
                283
            ],
            "totalVolumeFormatted": [
                283
            ],
            "totalVolumeRaw": [
                283
            ],
            "__typename": [
                201
            ]
        },
        "CreditFacilityContract_select_column": {},
        "CreditFacilityContract_stream_cursor_input": {
            "initial_value": [
                13
            ],
            "ordering": [
                254
            ],
            "__typename": [
                201
            ]
        },
        "CreditFacilityContract_stream_cursor_value_input": {
            "borrowToken_id": [
                201
            ],
            "collateralToken_id": [
                201
            ],
            "createdAt": [
                280
            ],
            "db_write_timestamp": [
                300
            ],
            "id": [
                201
            ],
            "lastUpdatedAt": [
                280
            ],
            "market_id": [
                201
            ],
            "totalDebtFormatted": [
                201
            ],
            "totalDebtRaw": [
                280
            ],
            "totalLoans": [
                280
            ],
            "totalLockedCollateralFormatted": [
                201
            ],
            "totalLockedCollateralRaw": [
                280
            ],
            "totalVolumeFormatted": [
                201
            ],
            "totalVolumeRaw": [
                280
            ],
            "__typename": [
                201
            ]
        },
        "FeeDistribution": {
            "db_write_timestamp": [
                300
            ],
            "floorAmountFormatted": [
                201
            ],
            "floorAmountRaw": [
                280
            ],
            "id": [
                201
            ],
            "market_id": [
                201
            ],
            "stakingAmountFormatted": [
                201
            ],
            "stakingAmountRaw": [
                280
            ],
            "timestamp": [
                280
            ],
            "transactionHash": [
                201
            ],
            "treasuryAmountFormatted": [
                201
            ],
            "treasuryAmountRaw": [
                280
            ],
            "__typename": [
                201
            ]
        },
        "FeeDistribution_aggregate_order_by": {
            "avg": [
                16
            ],
            "count": [
                283
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
                201
            ]
        },
        "FeeDistribution_avg_order_by": {
            "floorAmountRaw": [
                283
            ],
            "stakingAmountRaw": [
                283
            ],
            "timestamp": [
                283
            ],
            "treasuryAmountRaw": [
                283
            ],
            "__typename": [
                201
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
                301
            ],
            "floorAmountFormatted": [
                203
            ],
            "floorAmountRaw": [
                282
            ],
            "id": [
                203
            ],
            "market_id": [
                203
            ],
            "stakingAmountFormatted": [
                203
            ],
            "stakingAmountRaw": [
                282
            ],
            "timestamp": [
                282
            ],
            "transactionHash": [
                203
            ],
            "treasuryAmountFormatted": [
                203
            ],
            "treasuryAmountRaw": [
                282
            ],
            "__typename": [
                201
            ]
        },
        "FeeDistribution_max_order_by": {
            "db_write_timestamp": [
                283
            ],
            "floorAmountFormatted": [
                283
            ],
            "floorAmountRaw": [
                283
            ],
            "id": [
                283
            ],
            "market_id": [
                283
            ],
            "stakingAmountFormatted": [
                283
            ],
            "stakingAmountRaw": [
                283
            ],
            "timestamp": [
                283
            ],
            "transactionHash": [
                283
            ],
            "treasuryAmountFormatted": [
                283
            ],
            "treasuryAmountRaw": [
                283
            ],
            "__typename": [
                201
            ]
        },
        "FeeDistribution_min_order_by": {
            "db_write_timestamp": [
                283
            ],
            "floorAmountFormatted": [
                283
            ],
            "floorAmountRaw": [
                283
            ],
            "id": [
                283
            ],
            "market_id": [
                283
            ],
            "stakingAmountFormatted": [
                283
            ],
            "stakingAmountRaw": [
                283
            ],
            "timestamp": [
                283
            ],
            "transactionHash": [
                283
            ],
            "treasuryAmountFormatted": [
                283
            ],
            "treasuryAmountRaw": [
                283
            ],
            "__typename": [
                201
            ]
        },
        "FeeDistribution_order_by": {
            "db_write_timestamp": [
                283
            ],
            "floorAmountFormatted": [
                283
            ],
            "floorAmountRaw": [
                283
            ],
            "id": [
                283
            ],
            "market_id": [
                283
            ],
            "stakingAmountFormatted": [
                283
            ],
            "stakingAmountRaw": [
                283
            ],
            "timestamp": [
                283
            ],
            "transactionHash": [
                283
            ],
            "treasuryAmountFormatted": [
                283
            ],
            "treasuryAmountRaw": [
                283
            ],
            "__typename": [
                201
            ]
        },
        "FeeDistribution_select_column": {},
        "FeeDistribution_stddev_order_by": {
            "floorAmountRaw": [
                283
            ],
            "stakingAmountRaw": [
                283
            ],
            "timestamp": [
                283
            ],
            "treasuryAmountRaw": [
                283
            ],
            "__typename": [
                201
            ]
        },
        "FeeDistribution_stddev_pop_order_by": {
            "floorAmountRaw": [
                283
            ],
            "stakingAmountRaw": [
                283
            ],
            "timestamp": [
                283
            ],
            "treasuryAmountRaw": [
                283
            ],
            "__typename": [
                201
            ]
        },
        "FeeDistribution_stddev_samp_order_by": {
            "floorAmountRaw": [
                283
            ],
            "stakingAmountRaw": [
                283
            ],
            "timestamp": [
                283
            ],
            "treasuryAmountRaw": [
                283
            ],
            "__typename": [
                201
            ]
        },
        "FeeDistribution_stream_cursor_input": {
            "initial_value": [
                26
            ],
            "ordering": [
                254
            ],
            "__typename": [
                201
            ]
        },
        "FeeDistribution_stream_cursor_value_input": {
            "db_write_timestamp": [
                300
            ],
            "floorAmountFormatted": [
                201
            ],
            "floorAmountRaw": [
                280
            ],
            "id": [
                201
            ],
            "market_id": [
                201
            ],
            "stakingAmountFormatted": [
                201
            ],
            "stakingAmountRaw": [
                280
            ],
            "timestamp": [
                280
            ],
            "transactionHash": [
                201
            ],
            "treasuryAmountFormatted": [
                201
            ],
            "treasuryAmountRaw": [
                280
            ],
            "__typename": [
                201
            ]
        },
        "FeeDistribution_sum_order_by": {
            "floorAmountRaw": [
                283
            ],
            "stakingAmountRaw": [
                283
            ],
            "timestamp": [
                283
            ],
            "treasuryAmountRaw": [
                283
            ],
            "__typename": [
                201
            ]
        },
        "FeeDistribution_var_pop_order_by": {
            "floorAmountRaw": [
                283
            ],
            "stakingAmountRaw": [
                283
            ],
            "timestamp": [
                283
            ],
            "treasuryAmountRaw": [
                283
            ],
            "__typename": [
                201
            ]
        },
        "FeeDistribution_var_samp_order_by": {
            "floorAmountRaw": [
                283
            ],
            "stakingAmountRaw": [
                283
            ],
            "timestamp": [
                283
            ],
            "treasuryAmountRaw": [
                283
            ],
            "__typename": [
                201
            ]
        },
        "FeeDistribution_variance_order_by": {
            "floorAmountRaw": [
                283
            ],
            "stakingAmountRaw": [
                283
            ],
            "timestamp": [
                283
            ],
            "treasuryAmountRaw": [
                283
            ],
            "__typename": [
                201
            ]
        },
        "FloorElevation": {
            "db_write_timestamp": [
                300
            ],
            "deployedAmountFormatted": [
                201
            ],
            "deployedAmountRaw": [
                280
            ],
            "id": [
                201
            ],
            "market_id": [
                201
            ],
            "newFloorPriceFormatted": [
                201
            ],
            "newFloorPriceRaw": [
                280
            ],
            "oldFloorPriceFormatted": [
                201
            ],
            "oldFloorPriceRaw": [
                280
            ],
            "timestamp": [
                280
            ],
            "transactionHash": [
                201
            ],
            "__typename": [
                201
            ]
        },
        "FloorElevation_aggregate_order_by": {
            "avg": [
                33
            ],
            "count": [
                283
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
                201
            ]
        },
        "FloorElevation_avg_order_by": {
            "deployedAmountRaw": [
                283
            ],
            "newFloorPriceRaw": [
                283
            ],
            "oldFloorPriceRaw": [
                283
            ],
            "timestamp": [
                283
            ],
            "__typename": [
                201
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
                301
            ],
            "deployedAmountFormatted": [
                203
            ],
            "deployedAmountRaw": [
                282
            ],
            "id": [
                203
            ],
            "market_id": [
                203
            ],
            "newFloorPriceFormatted": [
                203
            ],
            "newFloorPriceRaw": [
                282
            ],
            "oldFloorPriceFormatted": [
                203
            ],
            "oldFloorPriceRaw": [
                282
            ],
            "timestamp": [
                282
            ],
            "transactionHash": [
                203
            ],
            "__typename": [
                201
            ]
        },
        "FloorElevation_max_order_by": {
            "db_write_timestamp": [
                283
            ],
            "deployedAmountFormatted": [
                283
            ],
            "deployedAmountRaw": [
                283
            ],
            "id": [
                283
            ],
            "market_id": [
                283
            ],
            "newFloorPriceFormatted": [
                283
            ],
            "newFloorPriceRaw": [
                283
            ],
            "oldFloorPriceFormatted": [
                283
            ],
            "oldFloorPriceRaw": [
                283
            ],
            "timestamp": [
                283
            ],
            "transactionHash": [
                283
            ],
            "__typename": [
                201
            ]
        },
        "FloorElevation_min_order_by": {
            "db_write_timestamp": [
                283
            ],
            "deployedAmountFormatted": [
                283
            ],
            "deployedAmountRaw": [
                283
            ],
            "id": [
                283
            ],
            "market_id": [
                283
            ],
            "newFloorPriceFormatted": [
                283
            ],
            "newFloorPriceRaw": [
                283
            ],
            "oldFloorPriceFormatted": [
                283
            ],
            "oldFloorPriceRaw": [
                283
            ],
            "timestamp": [
                283
            ],
            "transactionHash": [
                283
            ],
            "__typename": [
                201
            ]
        },
        "FloorElevation_order_by": {
            "db_write_timestamp": [
                283
            ],
            "deployedAmountFormatted": [
                283
            ],
            "deployedAmountRaw": [
                283
            ],
            "id": [
                283
            ],
            "market_id": [
                283
            ],
            "newFloorPriceFormatted": [
                283
            ],
            "newFloorPriceRaw": [
                283
            ],
            "oldFloorPriceFormatted": [
                283
            ],
            "oldFloorPriceRaw": [
                283
            ],
            "timestamp": [
                283
            ],
            "transactionHash": [
                283
            ],
            "__typename": [
                201
            ]
        },
        "FloorElevation_select_column": {},
        "FloorElevation_stddev_order_by": {
            "deployedAmountRaw": [
                283
            ],
            "newFloorPriceRaw": [
                283
            ],
            "oldFloorPriceRaw": [
                283
            ],
            "timestamp": [
                283
            ],
            "__typename": [
                201
            ]
        },
        "FloorElevation_stddev_pop_order_by": {
            "deployedAmountRaw": [
                283
            ],
            "newFloorPriceRaw": [
                283
            ],
            "oldFloorPriceRaw": [
                283
            ],
            "timestamp": [
                283
            ],
            "__typename": [
                201
            ]
        },
        "FloorElevation_stddev_samp_order_by": {
            "deployedAmountRaw": [
                283
            ],
            "newFloorPriceRaw": [
                283
            ],
            "oldFloorPriceRaw": [
                283
            ],
            "timestamp": [
                283
            ],
            "__typename": [
                201
            ]
        },
        "FloorElevation_stream_cursor_input": {
            "initial_value": [
                43
            ],
            "ordering": [
                254
            ],
            "__typename": [
                201
            ]
        },
        "FloorElevation_stream_cursor_value_input": {
            "db_write_timestamp": [
                300
            ],
            "deployedAmountFormatted": [
                201
            ],
            "deployedAmountRaw": [
                280
            ],
            "id": [
                201
            ],
            "market_id": [
                201
            ],
            "newFloorPriceFormatted": [
                201
            ],
            "newFloorPriceRaw": [
                280
            ],
            "oldFloorPriceFormatted": [
                201
            ],
            "oldFloorPriceRaw": [
                280
            ],
            "timestamp": [
                280
            ],
            "transactionHash": [
                201
            ],
            "__typename": [
                201
            ]
        },
        "FloorElevation_sum_order_by": {
            "deployedAmountRaw": [
                283
            ],
            "newFloorPriceRaw": [
                283
            ],
            "oldFloorPriceRaw": [
                283
            ],
            "timestamp": [
                283
            ],
            "__typename": [
                201
            ]
        },
        "FloorElevation_var_pop_order_by": {
            "deployedAmountRaw": [
                283
            ],
            "newFloorPriceRaw": [
                283
            ],
            "oldFloorPriceRaw": [
                283
            ],
            "timestamp": [
                283
            ],
            "__typename": [
                201
            ]
        },
        "FloorElevation_var_samp_order_by": {
            "deployedAmountRaw": [
                283
            ],
            "newFloorPriceRaw": [
                283
            ],
            "oldFloorPriceRaw": [
                283
            ],
            "timestamp": [
                283
            ],
            "__typename": [
                201
            ]
        },
        "FloorElevation_variance_order_by": {
            "deployedAmountRaw": [
                283
            ],
            "newFloorPriceRaw": [
                283
            ],
            "oldFloorPriceRaw": [
                283
            ],
            "timestamp": [
                283
            ],
            "__typename": [
                201
            ]
        },
        "GlobalStats": {
            "activeMarkets": [
                280
            ],
            "db_write_timestamp": [
                300
            ],
            "id": [
                201
            ],
            "lastUpdatedAt": [
                280
            ],
            "totalLockedCollateralFormatted": [
                201
            ],
            "totalLockedCollateralRaw": [
                280
            ],
            "totalMarkets": [
                280
            ],
            "totalOutstandingDebtFormatted": [
                201
            ],
            "totalOutstandingDebtRaw": [
                280
            ],
            "totalVolumeFormatted": [
                201
            ],
            "totalVolumeRaw": [
                280
            ],
            "__typename": [
                201
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
                282
            ],
            "db_write_timestamp": [
                301
            ],
            "id": [
                203
            ],
            "lastUpdatedAt": [
                282
            ],
            "totalLockedCollateralFormatted": [
                203
            ],
            "totalLockedCollateralRaw": [
                282
            ],
            "totalMarkets": [
                282
            ],
            "totalOutstandingDebtFormatted": [
                203
            ],
            "totalOutstandingDebtRaw": [
                282
            ],
            "totalVolumeFormatted": [
                203
            ],
            "totalVolumeRaw": [
                282
            ],
            "__typename": [
                201
            ]
        },
        "GlobalStats_order_by": {
            "activeMarkets": [
                283
            ],
            "db_write_timestamp": [
                283
            ],
            "id": [
                283
            ],
            "lastUpdatedAt": [
                283
            ],
            "totalLockedCollateralFormatted": [
                283
            ],
            "totalLockedCollateralRaw": [
                283
            ],
            "totalMarkets": [
                283
            ],
            "totalOutstandingDebtFormatted": [
                283
            ],
            "totalOutstandingDebtRaw": [
                283
            ],
            "totalVolumeFormatted": [
                283
            ],
            "totalVolumeRaw": [
                283
            ],
            "__typename": [
                201
            ]
        },
        "GlobalStats_select_column": {},
        "GlobalStats_stream_cursor_input": {
            "initial_value": [
                53
            ],
            "ordering": [
                254
            ],
            "__typename": [
                201
            ]
        },
        "GlobalStats_stream_cursor_value_input": {
            "activeMarkets": [
                280
            ],
            "db_write_timestamp": [
                300
            ],
            "id": [
                201
            ],
            "lastUpdatedAt": [
                280
            ],
            "totalLockedCollateralFormatted": [
                201
            ],
            "totalLockedCollateralRaw": [
                280
            ],
            "totalMarkets": [
                280
            ],
            "totalOutstandingDebtFormatted": [
                201
            ],
            "totalOutstandingDebtRaw": [
                280
            ],
            "totalVolumeFormatted": [
                201
            ],
            "totalVolumeRaw": [
                280
            ],
            "__typename": [
                201
            ]
        },
        "Int": {},
        "Int_array_comparison_exp": {
            "_contained_in": [
                54
            ],
            "_contains": [
                54
            ],
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
                201
            ]
        },
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
                201
            ]
        },
        "Loan": {
            "borrowAmountFormatted": [
                201
            ],
            "borrowAmountRaw": [
                280
            ],
            "borrower_id": [
                201
            ],
            "closedAt": [
                280
            ],
            "db_write_timestamp": [
                300
            ],
            "facility_id": [
                201
            ],
            "floorPriceAtBorrowFormatted": [
                201
            ],
            "floorPriceAtBorrowRaw": [
                280
            ],
            "id": [
                201
            ],
            "lastUpdatedAt": [
                280
            ],
            "lockedCollateralFormatted": [
                201
            ],
            "lockedCollateralRaw": [
                280
            ],
            "market_id": [
                201
            ],
            "openedAt": [
                280
            ],
            "originationFeeFormatted": [
                201
            ],
            "originationFeeRaw": [
                280
            ],
            "remainingDebtFormatted": [
                201
            ],
            "remainingDebtRaw": [
                280
            ],
            "status": [
                276
            ],
            "statusHistory": [
                58,
                {
                    "distinct_on": [
                        65,
                        "[LoanStatusHistory_select_column!]"
                    ],
                    "limit": [
                        54
                    ],
                    "offset": [
                        54
                    ],
                    "order_by": [
                        64,
                        "[LoanStatusHistory_order_by!]"
                    ],
                    "where": [
                        61
                    ]
                }
            ],
            "transactionHash": [
                201
            ],
            "__typename": [
                201
            ]
        },
        "LoanStatusHistory": {
            "db_write_timestamp": [
                300
            ],
            "id": [
                201
            ],
            "loan_id": [
                201
            ],
            "lockedCollateralFormatted": [
                201
            ],
            "lockedCollateralRaw": [
                280
            ],
            "remainingDebtFormatted": [
                201
            ],
            "remainingDebtRaw": [
                280
            ],
            "status": [
                276
            ],
            "timestamp": [
                280
            ],
            "transactionHash": [
                201
            ],
            "__typename": [
                201
            ]
        },
        "LoanStatusHistory_aggregate_order_by": {
            "avg": [
                60
            ],
            "count": [
                283
            ],
            "max": [
                62
            ],
            "min": [
                63
            ],
            "stddev": [
                66
            ],
            "stddev_pop": [
                67
            ],
            "stddev_samp": [
                68
            ],
            "sum": [
                71
            ],
            "var_pop": [
                72
            ],
            "var_samp": [
                73
            ],
            "variance": [
                74
            ],
            "__typename": [
                201
            ]
        },
        "LoanStatusHistory_avg_order_by": {
            "lockedCollateralRaw": [
                283
            ],
            "remainingDebtRaw": [
                283
            ],
            "timestamp": [
                283
            ],
            "__typename": [
                201
            ]
        },
        "LoanStatusHistory_bool_exp": {
            "_and": [
                61
            ],
            "_not": [
                61
            ],
            "_or": [
                61
            ],
            "db_write_timestamp": [
                301
            ],
            "id": [
                203
            ],
            "loan_id": [
                203
            ],
            "lockedCollateralFormatted": [
                203
            ],
            "lockedCollateralRaw": [
                282
            ],
            "remainingDebtFormatted": [
                203
            ],
            "remainingDebtRaw": [
                282
            ],
            "status": [
                277
            ],
            "timestamp": [
                282
            ],
            "transactionHash": [
                203
            ],
            "__typename": [
                201
            ]
        },
        "LoanStatusHistory_max_order_by": {
            "db_write_timestamp": [
                283
            ],
            "id": [
                283
            ],
            "loan_id": [
                283
            ],
            "lockedCollateralFormatted": [
                283
            ],
            "lockedCollateralRaw": [
                283
            ],
            "remainingDebtFormatted": [
                283
            ],
            "remainingDebtRaw": [
                283
            ],
            "status": [
                283
            ],
            "timestamp": [
                283
            ],
            "transactionHash": [
                283
            ],
            "__typename": [
                201
            ]
        },
        "LoanStatusHistory_min_order_by": {
            "db_write_timestamp": [
                283
            ],
            "id": [
                283
            ],
            "loan_id": [
                283
            ],
            "lockedCollateralFormatted": [
                283
            ],
            "lockedCollateralRaw": [
                283
            ],
            "remainingDebtFormatted": [
                283
            ],
            "remainingDebtRaw": [
                283
            ],
            "status": [
                283
            ],
            "timestamp": [
                283
            ],
            "transactionHash": [
                283
            ],
            "__typename": [
                201
            ]
        },
        "LoanStatusHistory_order_by": {
            "db_write_timestamp": [
                283
            ],
            "id": [
                283
            ],
            "loan_id": [
                283
            ],
            "lockedCollateralFormatted": [
                283
            ],
            "lockedCollateralRaw": [
                283
            ],
            "remainingDebtFormatted": [
                283
            ],
            "remainingDebtRaw": [
                283
            ],
            "status": [
                283
            ],
            "timestamp": [
                283
            ],
            "transactionHash": [
                283
            ],
            "__typename": [
                201
            ]
        },
        "LoanStatusHistory_select_column": {},
        "LoanStatusHistory_stddev_order_by": {
            "lockedCollateralRaw": [
                283
            ],
            "remainingDebtRaw": [
                283
            ],
            "timestamp": [
                283
            ],
            "__typename": [
                201
            ]
        },
        "LoanStatusHistory_stddev_pop_order_by": {
            "lockedCollateralRaw": [
                283
            ],
            "remainingDebtRaw": [
                283
            ],
            "timestamp": [
                283
            ],
            "__typename": [
                201
            ]
        },
        "LoanStatusHistory_stddev_samp_order_by": {
            "lockedCollateralRaw": [
                283
            ],
            "remainingDebtRaw": [
                283
            ],
            "timestamp": [
                283
            ],
            "__typename": [
                201
            ]
        },
        "LoanStatusHistory_stream_cursor_input": {
            "initial_value": [
                70
            ],
            "ordering": [
                254
            ],
            "__typename": [
                201
            ]
        },
        "LoanStatusHistory_stream_cursor_value_input": {
            "db_write_timestamp": [
                300
            ],
            "id": [
                201
            ],
            "loan_id": [
                201
            ],
            "lockedCollateralFormatted": [
                201
            ],
            "lockedCollateralRaw": [
                280
            ],
            "remainingDebtFormatted": [
                201
            ],
            "remainingDebtRaw": [
                280
            ],
            "status": [
                276
            ],
            "timestamp": [
                280
            ],
            "transactionHash": [
                201
            ],
            "__typename": [
                201
            ]
        },
        "LoanStatusHistory_sum_order_by": {
            "lockedCollateralRaw": [
                283
            ],
            "remainingDebtRaw": [
                283
            ],
            "timestamp": [
                283
            ],
            "__typename": [
                201
            ]
        },
        "LoanStatusHistory_var_pop_order_by": {
            "lockedCollateralRaw": [
                283
            ],
            "remainingDebtRaw": [
                283
            ],
            "timestamp": [
                283
            ],
            "__typename": [
                201
            ]
        },
        "LoanStatusHistory_var_samp_order_by": {
            "lockedCollateralRaw": [
                283
            ],
            "remainingDebtRaw": [
                283
            ],
            "timestamp": [
                283
            ],
            "__typename": [
                201
            ]
        },
        "LoanStatusHistory_variance_order_by": {
            "lockedCollateralRaw": [
                283
            ],
            "remainingDebtRaw": [
                283
            ],
            "timestamp": [
                283
            ],
            "__typename": [
                201
            ]
        },
        "Loan_aggregate_order_by": {
            "avg": [
                76
            ],
            "count": [
                283
            ],
            "max": [
                78
            ],
            "min": [
                79
            ],
            "stddev": [
                82
            ],
            "stddev_pop": [
                83
            ],
            "stddev_samp": [
                84
            ],
            "sum": [
                87
            ],
            "var_pop": [
                88
            ],
            "var_samp": [
                89
            ],
            "variance": [
                90
            ],
            "__typename": [
                201
            ]
        },
        "Loan_avg_order_by": {
            "borrowAmountRaw": [
                283
            ],
            "closedAt": [
                283
            ],
            "floorPriceAtBorrowRaw": [
                283
            ],
            "lastUpdatedAt": [
                283
            ],
            "lockedCollateralRaw": [
                283
            ],
            "openedAt": [
                283
            ],
            "originationFeeRaw": [
                283
            ],
            "remainingDebtRaw": [
                283
            ],
            "__typename": [
                201
            ]
        },
        "Loan_bool_exp": {
            "_and": [
                77
            ],
            "_not": [
                77
            ],
            "_or": [
                77
            ],
            "borrowAmountFormatted": [
                203
            ],
            "borrowAmountRaw": [
                282
            ],
            "borrower_id": [
                203
            ],
            "closedAt": [
                282
            ],
            "db_write_timestamp": [
                301
            ],
            "facility_id": [
                203
            ],
            "floorPriceAtBorrowFormatted": [
                203
            ],
            "floorPriceAtBorrowRaw": [
                282
            ],
            "id": [
                203
            ],
            "lastUpdatedAt": [
                282
            ],
            "lockedCollateralFormatted": [
                203
            ],
            "lockedCollateralRaw": [
                282
            ],
            "market_id": [
                203
            ],
            "openedAt": [
                282
            ],
            "originationFeeFormatted": [
                203
            ],
            "originationFeeRaw": [
                282
            ],
            "remainingDebtFormatted": [
                203
            ],
            "remainingDebtRaw": [
                282
            ],
            "status": [
                277
            ],
            "statusHistory": [
                61
            ],
            "transactionHash": [
                203
            ],
            "__typename": [
                201
            ]
        },
        "Loan_max_order_by": {
            "borrowAmountFormatted": [
                283
            ],
            "borrowAmountRaw": [
                283
            ],
            "borrower_id": [
                283
            ],
            "closedAt": [
                283
            ],
            "db_write_timestamp": [
                283
            ],
            "facility_id": [
                283
            ],
            "floorPriceAtBorrowFormatted": [
                283
            ],
            "floorPriceAtBorrowRaw": [
                283
            ],
            "id": [
                283
            ],
            "lastUpdatedAt": [
                283
            ],
            "lockedCollateralFormatted": [
                283
            ],
            "lockedCollateralRaw": [
                283
            ],
            "market_id": [
                283
            ],
            "openedAt": [
                283
            ],
            "originationFeeFormatted": [
                283
            ],
            "originationFeeRaw": [
                283
            ],
            "remainingDebtFormatted": [
                283
            ],
            "remainingDebtRaw": [
                283
            ],
            "status": [
                283
            ],
            "transactionHash": [
                283
            ],
            "__typename": [
                201
            ]
        },
        "Loan_min_order_by": {
            "borrowAmountFormatted": [
                283
            ],
            "borrowAmountRaw": [
                283
            ],
            "borrower_id": [
                283
            ],
            "closedAt": [
                283
            ],
            "db_write_timestamp": [
                283
            ],
            "facility_id": [
                283
            ],
            "floorPriceAtBorrowFormatted": [
                283
            ],
            "floorPriceAtBorrowRaw": [
                283
            ],
            "id": [
                283
            ],
            "lastUpdatedAt": [
                283
            ],
            "lockedCollateralFormatted": [
                283
            ],
            "lockedCollateralRaw": [
                283
            ],
            "market_id": [
                283
            ],
            "openedAt": [
                283
            ],
            "originationFeeFormatted": [
                283
            ],
            "originationFeeRaw": [
                283
            ],
            "remainingDebtFormatted": [
                283
            ],
            "remainingDebtRaw": [
                283
            ],
            "status": [
                283
            ],
            "transactionHash": [
                283
            ],
            "__typename": [
                201
            ]
        },
        "Loan_order_by": {
            "borrowAmountFormatted": [
                283
            ],
            "borrowAmountRaw": [
                283
            ],
            "borrower_id": [
                283
            ],
            "closedAt": [
                283
            ],
            "db_write_timestamp": [
                283
            ],
            "facility_id": [
                283
            ],
            "floorPriceAtBorrowFormatted": [
                283
            ],
            "floorPriceAtBorrowRaw": [
                283
            ],
            "id": [
                283
            ],
            "lastUpdatedAt": [
                283
            ],
            "lockedCollateralFormatted": [
                283
            ],
            "lockedCollateralRaw": [
                283
            ],
            "market_id": [
                283
            ],
            "openedAt": [
                283
            ],
            "originationFeeFormatted": [
                283
            ],
            "originationFeeRaw": [
                283
            ],
            "remainingDebtFormatted": [
                283
            ],
            "remainingDebtRaw": [
                283
            ],
            "status": [
                283
            ],
            "statusHistory_aggregate": [
                59
            ],
            "transactionHash": [
                283
            ],
            "__typename": [
                201
            ]
        },
        "Loan_select_column": {},
        "Loan_stddev_order_by": {
            "borrowAmountRaw": [
                283
            ],
            "closedAt": [
                283
            ],
            "floorPriceAtBorrowRaw": [
                283
            ],
            "lastUpdatedAt": [
                283
            ],
            "lockedCollateralRaw": [
                283
            ],
            "openedAt": [
                283
            ],
            "originationFeeRaw": [
                283
            ],
            "remainingDebtRaw": [
                283
            ],
            "__typename": [
                201
            ]
        },
        "Loan_stddev_pop_order_by": {
            "borrowAmountRaw": [
                283
            ],
            "closedAt": [
                283
            ],
            "floorPriceAtBorrowRaw": [
                283
            ],
            "lastUpdatedAt": [
                283
            ],
            "lockedCollateralRaw": [
                283
            ],
            "openedAt": [
                283
            ],
            "originationFeeRaw": [
                283
            ],
            "remainingDebtRaw": [
                283
            ],
            "__typename": [
                201
            ]
        },
        "Loan_stddev_samp_order_by": {
            "borrowAmountRaw": [
                283
            ],
            "closedAt": [
                283
            ],
            "floorPriceAtBorrowRaw": [
                283
            ],
            "lastUpdatedAt": [
                283
            ],
            "lockedCollateralRaw": [
                283
            ],
            "openedAt": [
                283
            ],
            "originationFeeRaw": [
                283
            ],
            "remainingDebtRaw": [
                283
            ],
            "__typename": [
                201
            ]
        },
        "Loan_stream_cursor_input": {
            "initial_value": [
                86
            ],
            "ordering": [
                254
            ],
            "__typename": [
                201
            ]
        },
        "Loan_stream_cursor_value_input": {
            "borrowAmountFormatted": [
                201
            ],
            "borrowAmountRaw": [
                280
            ],
            "borrower_id": [
                201
            ],
            "closedAt": [
                280
            ],
            "db_write_timestamp": [
                300
            ],
            "facility_id": [
                201
            ],
            "floorPriceAtBorrowFormatted": [
                201
            ],
            "floorPriceAtBorrowRaw": [
                280
            ],
            "id": [
                201
            ],
            "lastUpdatedAt": [
                280
            ],
            "lockedCollateralFormatted": [
                201
            ],
            "lockedCollateralRaw": [
                280
            ],
            "market_id": [
                201
            ],
            "openedAt": [
                280
            ],
            "originationFeeFormatted": [
                201
            ],
            "originationFeeRaw": [
                280
            ],
            "remainingDebtFormatted": [
                201
            ],
            "remainingDebtRaw": [
                280
            ],
            "status": [
                276
            ],
            "transactionHash": [
                201
            ],
            "__typename": [
                201
            ]
        },
        "Loan_sum_order_by": {
            "borrowAmountRaw": [
                283
            ],
            "closedAt": [
                283
            ],
            "floorPriceAtBorrowRaw": [
                283
            ],
            "lastUpdatedAt": [
                283
            ],
            "lockedCollateralRaw": [
                283
            ],
            "openedAt": [
                283
            ],
            "originationFeeRaw": [
                283
            ],
            "remainingDebtRaw": [
                283
            ],
            "__typename": [
                201
            ]
        },
        "Loan_var_pop_order_by": {
            "borrowAmountRaw": [
                283
            ],
            "closedAt": [
                283
            ],
            "floorPriceAtBorrowRaw": [
                283
            ],
            "lastUpdatedAt": [
                283
            ],
            "lockedCollateralRaw": [
                283
            ],
            "openedAt": [
                283
            ],
            "originationFeeRaw": [
                283
            ],
            "remainingDebtRaw": [
                283
            ],
            "__typename": [
                201
            ]
        },
        "Loan_var_samp_order_by": {
            "borrowAmountRaw": [
                283
            ],
            "closedAt": [
                283
            ],
            "floorPriceAtBorrowRaw": [
                283
            ],
            "lastUpdatedAt": [
                283
            ],
            "lockedCollateralRaw": [
                283
            ],
            "openedAt": [
                283
            ],
            "originationFeeRaw": [
                283
            ],
            "remainingDebtRaw": [
                283
            ],
            "__typename": [
                201
            ]
        },
        "Loan_variance_order_by": {
            "borrowAmountRaw": [
                283
            ],
            "closedAt": [
                283
            ],
            "floorPriceAtBorrowRaw": [
                283
            ],
            "lastUpdatedAt": [
                283
            ],
            "lockedCollateralRaw": [
                283
            ],
            "openedAt": [
                283
            ],
            "originationFeeRaw": [
                283
            ],
            "remainingDebtRaw": [
                283
            ],
            "__typename": [
                201
            ]
        },
        "Market": {
            "buyFeeBps": [
                280
            ],
            "createdAt": [
                280
            ],
            "creator_id": [
                201
            ],
            "currentPriceFormatted": [
                201
            ],
            "currentPriceRaw": [
                280
            ],
            "db_write_timestamp": [
                300
            ],
            "factory_id": [
                201
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
                201
            ],
            "floorPriceRaw": [
                280
            ],
            "floorSupplyFormatted": [
                201
            ],
            "floorSupplyRaw": [
                280
            ],
            "id": [
                201
            ],
            "initialFloorPriceFormatted": [
                201
            ],
            "initialFloorPriceRaw": [
                280
            ],
            "isBuyOpen": [
                6
            ],
            "isSellOpen": [
                6
            ],
            "issuanceToken": [
                204
            ],
            "issuanceToken_id": [
                201
            ],
            "lastElevationTimestamp": [
                280
            ],
            "lastTradeTimestamp": [
                280
            ],
            "lastUpdatedAt": [
                280
            ],
            "marketSupplyFormatted": [
                201
            ],
            "marketSupplyRaw": [
                280
            ],
            "maxLTV": [
                280
            ],
            "reserveToken": [
                204
            ],
            "reserveToken_id": [
                201
            ],
            "sellFeeBps": [
                280
            ],
            "status": [
                278
            ],
            "totalSupplyFormatted": [
                201
            ],
            "totalSupplyRaw": [
                280
            ],
            "trades": [
                210,
                {
                    "distinct_on": [
                        217,
                        "[Trade_select_column!]"
                    ],
                    "limit": [
                        54
                    ],
                    "offset": [
                        54
                    ],
                    "order_by": [
                        216,
                        "[Trade_order_by!]"
                    ],
                    "where": [
                        213
                    ]
                }
            ],
            "tradingFeeBps": [
                280
            ],
            "__typename": [
                201
            ]
        },
        "MarketRollingStats": {
            "averagePriceFormatted": [
                201
            ],
            "averagePriceRaw": [
                280
            ],
            "db_write_timestamp": [
                300
            ],
            "id": [
                201
            ],
            "lastUpdatedAt": [
                280
            ],
            "market_id": [
                201
            ],
            "tradeCount": [
                280
            ],
            "volumeFormatted": [
                201
            ],
            "volumeRaw": [
                280
            ],
            "windowSeconds": [
                54
            ],
            "__typename": [
                201
            ]
        },
        "MarketRollingStats_bool_exp": {
            "_and": [
                93
            ],
            "_not": [
                93
            ],
            "_or": [
                93
            ],
            "averagePriceFormatted": [
                203
            ],
            "averagePriceRaw": [
                282
            ],
            "db_write_timestamp": [
                301
            ],
            "id": [
                203
            ],
            "lastUpdatedAt": [
                282
            ],
            "market_id": [
                203
            ],
            "tradeCount": [
                282
            ],
            "volumeFormatted": [
                203
            ],
            "volumeRaw": [
                282
            ],
            "windowSeconds": [
                56
            ],
            "__typename": [
                201
            ]
        },
        "MarketRollingStats_order_by": {
            "averagePriceFormatted": [
                283
            ],
            "averagePriceRaw": [
                283
            ],
            "db_write_timestamp": [
                283
            ],
            "id": [
                283
            ],
            "lastUpdatedAt": [
                283
            ],
            "market_id": [
                283
            ],
            "tradeCount": [
                283
            ],
            "volumeFormatted": [
                283
            ],
            "volumeRaw": [
                283
            ],
            "windowSeconds": [
                283
            ],
            "__typename": [
                201
            ]
        },
        "MarketRollingStats_select_column": {},
        "MarketRollingStats_stream_cursor_input": {
            "initial_value": [
                97
            ],
            "ordering": [
                254
            ],
            "__typename": [
                201
            ]
        },
        "MarketRollingStats_stream_cursor_value_input": {
            "averagePriceFormatted": [
                201
            ],
            "averagePriceRaw": [
                280
            ],
            "db_write_timestamp": [
                300
            ],
            "id": [
                201
            ],
            "lastUpdatedAt": [
                280
            ],
            "market_id": [
                201
            ],
            "tradeCount": [
                280
            ],
            "volumeFormatted": [
                201
            ],
            "volumeRaw": [
                280
            ],
            "windowSeconds": [
                54
            ],
            "__typename": [
                201
            ]
        },
        "MarketSnapshot": {
            "db_write_timestamp": [
                300
            ],
            "floorPriceFormatted": [
                201
            ],
            "floorPriceRaw": [
                280
            ],
            "id": [
                201
            ],
            "marketSupplyFormatted": [
                201
            ],
            "marketSupplyRaw": [
                280
            ],
            "market_id": [
                201
            ],
            "priceFormatted": [
                201
            ],
            "priceRaw": [
                280
            ],
            "timestamp": [
                280
            ],
            "totalSupplyFormatted": [
                201
            ],
            "totalSupplyRaw": [
                280
            ],
            "trades24h": [
                280
            ],
            "volume24hFormatted": [
                201
            ],
            "volume24hRaw": [
                280
            ],
            "__typename": [
                201
            ]
        },
        "MarketSnapshot_bool_exp": {
            "_and": [
                99
            ],
            "_not": [
                99
            ],
            "_or": [
                99
            ],
            "db_write_timestamp": [
                301
            ],
            "floorPriceFormatted": [
                203
            ],
            "floorPriceRaw": [
                282
            ],
            "id": [
                203
            ],
            "marketSupplyFormatted": [
                203
            ],
            "marketSupplyRaw": [
                282
            ],
            "market_id": [
                203
            ],
            "priceFormatted": [
                203
            ],
            "priceRaw": [
                282
            ],
            "timestamp": [
                282
            ],
            "totalSupplyFormatted": [
                203
            ],
            "totalSupplyRaw": [
                282
            ],
            "trades24h": [
                282
            ],
            "volume24hFormatted": [
                203
            ],
            "volume24hRaw": [
                282
            ],
            "__typename": [
                201
            ]
        },
        "MarketSnapshot_order_by": {
            "db_write_timestamp": [
                283
            ],
            "floorPriceFormatted": [
                283
            ],
            "floorPriceRaw": [
                283
            ],
            "id": [
                283
            ],
            "marketSupplyFormatted": [
                283
            ],
            "marketSupplyRaw": [
                283
            ],
            "market_id": [
                283
            ],
            "priceFormatted": [
                283
            ],
            "priceRaw": [
                283
            ],
            "timestamp": [
                283
            ],
            "totalSupplyFormatted": [
                283
            ],
            "totalSupplyRaw": [
                283
            ],
            "trades24h": [
                283
            ],
            "volume24hFormatted": [
                283
            ],
            "volume24hRaw": [
                283
            ],
            "__typename": [
                201
            ]
        },
        "MarketSnapshot_select_column": {},
        "MarketSnapshot_stream_cursor_input": {
            "initial_value": [
                103
            ],
            "ordering": [
                254
            ],
            "__typename": [
                201
            ]
        },
        "MarketSnapshot_stream_cursor_value_input": {
            "db_write_timestamp": [
                300
            ],
            "floorPriceFormatted": [
                201
            ],
            "floorPriceRaw": [
                280
            ],
            "id": [
                201
            ],
            "marketSupplyFormatted": [
                201
            ],
            "marketSupplyRaw": [
                280
            ],
            "market_id": [
                201
            ],
            "priceFormatted": [
                201
            ],
            "priceRaw": [
                280
            ],
            "timestamp": [
                280
            ],
            "totalSupplyFormatted": [
                201
            ],
            "totalSupplyRaw": [
                280
            ],
            "trades24h": [
                280
            ],
            "volume24hFormatted": [
                201
            ],
            "volume24hRaw": [
                280
            ],
            "__typename": [
                201
            ]
        },
        "Market_aggregate_order_by": {
            "avg": [
                105
            ],
            "count": [
                283
            ],
            "max": [
                107
            ],
            "min": [
                108
            ],
            "stddev": [
                111
            ],
            "stddev_pop": [
                112
            ],
            "stddev_samp": [
                113
            ],
            "sum": [
                116
            ],
            "var_pop": [
                117
            ],
            "var_samp": [
                118
            ],
            "variance": [
                119
            ],
            "__typename": [
                201
            ]
        },
        "Market_avg_order_by": {
            "buyFeeBps": [
                283
            ],
            "createdAt": [
                283
            ],
            "currentPriceRaw": [
                283
            ],
            "floorPriceRaw": [
                283
            ],
            "floorSupplyRaw": [
                283
            ],
            "initialFloorPriceRaw": [
                283
            ],
            "lastElevationTimestamp": [
                283
            ],
            "lastTradeTimestamp": [
                283
            ],
            "lastUpdatedAt": [
                283
            ],
            "marketSupplyRaw": [
                283
            ],
            "maxLTV": [
                283
            ],
            "sellFeeBps": [
                283
            ],
            "totalSupplyRaw": [
                283
            ],
            "tradingFeeBps": [
                283
            ],
            "__typename": [
                201
            ]
        },
        "Market_bool_exp": {
            "_and": [
                106
            ],
            "_not": [
                106
            ],
            "_or": [
                106
            ],
            "buyFeeBps": [
                282
            ],
            "createdAt": [
                282
            ],
            "creator_id": [
                203
            ],
            "currentPriceFormatted": [
                203
            ],
            "currentPriceRaw": [
                282
            ],
            "db_write_timestamp": [
                301
            ],
            "factory_id": [
                203
            ],
            "feeDistributions": [
                17
            ],
            "floorElevations": [
                34
            ],
            "floorPriceFormatted": [
                203
            ],
            "floorPriceRaw": [
                282
            ],
            "floorSupplyFormatted": [
                203
            ],
            "floorSupplyRaw": [
                282
            ],
            "id": [
                203
            ],
            "initialFloorPriceFormatted": [
                203
            ],
            "initialFloorPriceRaw": [
                282
            ],
            "isBuyOpen": [
                7
            ],
            "isSellOpen": [
                7
            ],
            "issuanceToken": [
                205
            ],
            "issuanceToken_id": [
                203
            ],
            "lastElevationTimestamp": [
                282
            ],
            "lastTradeTimestamp": [
                282
            ],
            "lastUpdatedAt": [
                282
            ],
            "marketSupplyFormatted": [
                203
            ],
            "marketSupplyRaw": [
                282
            ],
            "maxLTV": [
                282
            ],
            "reserveToken": [
                205
            ],
            "reserveToken_id": [
                203
            ],
            "sellFeeBps": [
                282
            ],
            "status": [
                279
            ],
            "totalSupplyFormatted": [
                203
            ],
            "totalSupplyRaw": [
                282
            ],
            "trades": [
                213
            ],
            "tradingFeeBps": [
                282
            ],
            "__typename": [
                201
            ]
        },
        "Market_max_order_by": {
            "buyFeeBps": [
                283
            ],
            "createdAt": [
                283
            ],
            "creator_id": [
                283
            ],
            "currentPriceFormatted": [
                283
            ],
            "currentPriceRaw": [
                283
            ],
            "db_write_timestamp": [
                283
            ],
            "factory_id": [
                283
            ],
            "floorPriceFormatted": [
                283
            ],
            "floorPriceRaw": [
                283
            ],
            "floorSupplyFormatted": [
                283
            ],
            "floorSupplyRaw": [
                283
            ],
            "id": [
                283
            ],
            "initialFloorPriceFormatted": [
                283
            ],
            "initialFloorPriceRaw": [
                283
            ],
            "issuanceToken_id": [
                283
            ],
            "lastElevationTimestamp": [
                283
            ],
            "lastTradeTimestamp": [
                283
            ],
            "lastUpdatedAt": [
                283
            ],
            "marketSupplyFormatted": [
                283
            ],
            "marketSupplyRaw": [
                283
            ],
            "maxLTV": [
                283
            ],
            "reserveToken_id": [
                283
            ],
            "sellFeeBps": [
                283
            ],
            "status": [
                283
            ],
            "totalSupplyFormatted": [
                283
            ],
            "totalSupplyRaw": [
                283
            ],
            "tradingFeeBps": [
                283
            ],
            "__typename": [
                201
            ]
        },
        "Market_min_order_by": {
            "buyFeeBps": [
                283
            ],
            "createdAt": [
                283
            ],
            "creator_id": [
                283
            ],
            "currentPriceFormatted": [
                283
            ],
            "currentPriceRaw": [
                283
            ],
            "db_write_timestamp": [
                283
            ],
            "factory_id": [
                283
            ],
            "floorPriceFormatted": [
                283
            ],
            "floorPriceRaw": [
                283
            ],
            "floorSupplyFormatted": [
                283
            ],
            "floorSupplyRaw": [
                283
            ],
            "id": [
                283
            ],
            "initialFloorPriceFormatted": [
                283
            ],
            "initialFloorPriceRaw": [
                283
            ],
            "issuanceToken_id": [
                283
            ],
            "lastElevationTimestamp": [
                283
            ],
            "lastTradeTimestamp": [
                283
            ],
            "lastUpdatedAt": [
                283
            ],
            "marketSupplyFormatted": [
                283
            ],
            "marketSupplyRaw": [
                283
            ],
            "maxLTV": [
                283
            ],
            "reserveToken_id": [
                283
            ],
            "sellFeeBps": [
                283
            ],
            "status": [
                283
            ],
            "totalSupplyFormatted": [
                283
            ],
            "totalSupplyRaw": [
                283
            ],
            "tradingFeeBps": [
                283
            ],
            "__typename": [
                201
            ]
        },
        "Market_order_by": {
            "buyFeeBps": [
                283
            ],
            "createdAt": [
                283
            ],
            "creator_id": [
                283
            ],
            "currentPriceFormatted": [
                283
            ],
            "currentPriceRaw": [
                283
            ],
            "db_write_timestamp": [
                283
            ],
            "factory_id": [
                283
            ],
            "feeDistributions_aggregate": [
                15
            ],
            "floorElevations_aggregate": [
                32
            ],
            "floorPriceFormatted": [
                283
            ],
            "floorPriceRaw": [
                283
            ],
            "floorSupplyFormatted": [
                283
            ],
            "floorSupplyRaw": [
                283
            ],
            "id": [
                283
            ],
            "initialFloorPriceFormatted": [
                283
            ],
            "initialFloorPriceRaw": [
                283
            ],
            "isBuyOpen": [
                283
            ],
            "isSellOpen": [
                283
            ],
            "issuanceToken": [
                206
            ],
            "issuanceToken_id": [
                283
            ],
            "lastElevationTimestamp": [
                283
            ],
            "lastTradeTimestamp": [
                283
            ],
            "lastUpdatedAt": [
                283
            ],
            "marketSupplyFormatted": [
                283
            ],
            "marketSupplyRaw": [
                283
            ],
            "maxLTV": [
                283
            ],
            "reserveToken": [
                206
            ],
            "reserveToken_id": [
                283
            ],
            "sellFeeBps": [
                283
            ],
            "status": [
                283
            ],
            "totalSupplyFormatted": [
                283
            ],
            "totalSupplyRaw": [
                283
            ],
            "trades_aggregate": [
                211
            ],
            "tradingFeeBps": [
                283
            ],
            "__typename": [
                201
            ]
        },
        "Market_select_column": {},
        "Market_stddev_order_by": {
            "buyFeeBps": [
                283
            ],
            "createdAt": [
                283
            ],
            "currentPriceRaw": [
                283
            ],
            "floorPriceRaw": [
                283
            ],
            "floorSupplyRaw": [
                283
            ],
            "initialFloorPriceRaw": [
                283
            ],
            "lastElevationTimestamp": [
                283
            ],
            "lastTradeTimestamp": [
                283
            ],
            "lastUpdatedAt": [
                283
            ],
            "marketSupplyRaw": [
                283
            ],
            "maxLTV": [
                283
            ],
            "sellFeeBps": [
                283
            ],
            "totalSupplyRaw": [
                283
            ],
            "tradingFeeBps": [
                283
            ],
            "__typename": [
                201
            ]
        },
        "Market_stddev_pop_order_by": {
            "buyFeeBps": [
                283
            ],
            "createdAt": [
                283
            ],
            "currentPriceRaw": [
                283
            ],
            "floorPriceRaw": [
                283
            ],
            "floorSupplyRaw": [
                283
            ],
            "initialFloorPriceRaw": [
                283
            ],
            "lastElevationTimestamp": [
                283
            ],
            "lastTradeTimestamp": [
                283
            ],
            "lastUpdatedAt": [
                283
            ],
            "marketSupplyRaw": [
                283
            ],
            "maxLTV": [
                283
            ],
            "sellFeeBps": [
                283
            ],
            "totalSupplyRaw": [
                283
            ],
            "tradingFeeBps": [
                283
            ],
            "__typename": [
                201
            ]
        },
        "Market_stddev_samp_order_by": {
            "buyFeeBps": [
                283
            ],
            "createdAt": [
                283
            ],
            "currentPriceRaw": [
                283
            ],
            "floorPriceRaw": [
                283
            ],
            "floorSupplyRaw": [
                283
            ],
            "initialFloorPriceRaw": [
                283
            ],
            "lastElevationTimestamp": [
                283
            ],
            "lastTradeTimestamp": [
                283
            ],
            "lastUpdatedAt": [
                283
            ],
            "marketSupplyRaw": [
                283
            ],
            "maxLTV": [
                283
            ],
            "sellFeeBps": [
                283
            ],
            "totalSupplyRaw": [
                283
            ],
            "tradingFeeBps": [
                283
            ],
            "__typename": [
                201
            ]
        },
        "Market_stream_cursor_input": {
            "initial_value": [
                115
            ],
            "ordering": [
                254
            ],
            "__typename": [
                201
            ]
        },
        "Market_stream_cursor_value_input": {
            "buyFeeBps": [
                280
            ],
            "createdAt": [
                280
            ],
            "creator_id": [
                201
            ],
            "currentPriceFormatted": [
                201
            ],
            "currentPriceRaw": [
                280
            ],
            "db_write_timestamp": [
                300
            ],
            "factory_id": [
                201
            ],
            "floorPriceFormatted": [
                201
            ],
            "floorPriceRaw": [
                280
            ],
            "floorSupplyFormatted": [
                201
            ],
            "floorSupplyRaw": [
                280
            ],
            "id": [
                201
            ],
            "initialFloorPriceFormatted": [
                201
            ],
            "initialFloorPriceRaw": [
                280
            ],
            "isBuyOpen": [
                6
            ],
            "isSellOpen": [
                6
            ],
            "issuanceToken_id": [
                201
            ],
            "lastElevationTimestamp": [
                280
            ],
            "lastTradeTimestamp": [
                280
            ],
            "lastUpdatedAt": [
                280
            ],
            "marketSupplyFormatted": [
                201
            ],
            "marketSupplyRaw": [
                280
            ],
            "maxLTV": [
                280
            ],
            "reserveToken_id": [
                201
            ],
            "sellFeeBps": [
                280
            ],
            "status": [
                278
            ],
            "totalSupplyFormatted": [
                201
            ],
            "totalSupplyRaw": [
                280
            ],
            "tradingFeeBps": [
                280
            ],
            "__typename": [
                201
            ]
        },
        "Market_sum_order_by": {
            "buyFeeBps": [
                283
            ],
            "createdAt": [
                283
            ],
            "currentPriceRaw": [
                283
            ],
            "floorPriceRaw": [
                283
            ],
            "floorSupplyRaw": [
                283
            ],
            "initialFloorPriceRaw": [
                283
            ],
            "lastElevationTimestamp": [
                283
            ],
            "lastTradeTimestamp": [
                283
            ],
            "lastUpdatedAt": [
                283
            ],
            "marketSupplyRaw": [
                283
            ],
            "maxLTV": [
                283
            ],
            "sellFeeBps": [
                283
            ],
            "totalSupplyRaw": [
                283
            ],
            "tradingFeeBps": [
                283
            ],
            "__typename": [
                201
            ]
        },
        "Market_var_pop_order_by": {
            "buyFeeBps": [
                283
            ],
            "createdAt": [
                283
            ],
            "currentPriceRaw": [
                283
            ],
            "floorPriceRaw": [
                283
            ],
            "floorSupplyRaw": [
                283
            ],
            "initialFloorPriceRaw": [
                283
            ],
            "lastElevationTimestamp": [
                283
            ],
            "lastTradeTimestamp": [
                283
            ],
            "lastUpdatedAt": [
                283
            ],
            "marketSupplyRaw": [
                283
            ],
            "maxLTV": [
                283
            ],
            "sellFeeBps": [
                283
            ],
            "totalSupplyRaw": [
                283
            ],
            "tradingFeeBps": [
                283
            ],
            "__typename": [
                201
            ]
        },
        "Market_var_samp_order_by": {
            "buyFeeBps": [
                283
            ],
            "createdAt": [
                283
            ],
            "currentPriceRaw": [
                283
            ],
            "floorPriceRaw": [
                283
            ],
            "floorSupplyRaw": [
                283
            ],
            "initialFloorPriceRaw": [
                283
            ],
            "lastElevationTimestamp": [
                283
            ],
            "lastTradeTimestamp": [
                283
            ],
            "lastUpdatedAt": [
                283
            ],
            "marketSupplyRaw": [
                283
            ],
            "maxLTV": [
                283
            ],
            "sellFeeBps": [
                283
            ],
            "totalSupplyRaw": [
                283
            ],
            "tradingFeeBps": [
                283
            ],
            "__typename": [
                201
            ]
        },
        "Market_variance_order_by": {
            "buyFeeBps": [
                283
            ],
            "createdAt": [
                283
            ],
            "currentPriceRaw": [
                283
            ],
            "floorPriceRaw": [
                283
            ],
            "floorSupplyRaw": [
                283
            ],
            "initialFloorPriceRaw": [
                283
            ],
            "lastElevationTimestamp": [
                283
            ],
            "lastTradeTimestamp": [
                283
            ],
            "lastUpdatedAt": [
                283
            ],
            "marketSupplyRaw": [
                283
            ],
            "maxLTV": [
                283
            ],
            "sellFeeBps": [
                283
            ],
            "totalSupplyRaw": [
                283
            ],
            "tradingFeeBps": [
                283
            ],
            "__typename": [
                201
            ]
        },
        "ModuleAddress": {
            "createdAt": [
                280
            ],
            "db_write_timestamp": [
                300
            ],
            "id": [
                201
            ],
            "lastUpdatedAt": [
                280
            ],
            "market_id": [
                201
            ],
            "moduleType": [
                201
            ],
            "__typename": [
                201
            ]
        },
        "ModuleAddress_bool_exp": {
            "_and": [
                121
            ],
            "_not": [
                121
            ],
            "_or": [
                121
            ],
            "createdAt": [
                282
            ],
            "db_write_timestamp": [
                301
            ],
            "id": [
                203
            ],
            "lastUpdatedAt": [
                282
            ],
            "market_id": [
                203
            ],
            "moduleType": [
                203
            ],
            "__typename": [
                201
            ]
        },
        "ModuleAddress_order_by": {
            "createdAt": [
                283
            ],
            "db_write_timestamp": [
                283
            ],
            "id": [
                283
            ],
            "lastUpdatedAt": [
                283
            ],
            "market_id": [
                283
            ],
            "moduleType": [
                283
            ],
            "__typename": [
                201
            ]
        },
        "ModuleAddress_select_column": {},
        "ModuleAddress_stream_cursor_input": {
            "initial_value": [
                125
            ],
            "ordering": [
                254
            ],
            "__typename": [
                201
            ]
        },
        "ModuleAddress_stream_cursor_value_input": {
            "createdAt": [
                280
            ],
            "db_write_timestamp": [
                300
            ],
            "id": [
                201
            ],
            "lastUpdatedAt": [
                280
            ],
            "market_id": [
                201
            ],
            "moduleType": [
                201
            ],
            "__typename": [
                201
            ]
        },
        "ModuleRegistry": {
            "authorizer": [
                201
            ],
            "createdAt": [
                280
            ],
            "creditFacility": [
                201
            ],
            "db_write_timestamp": [
                300
            ],
            "feeTreasury": [
                201
            ],
            "floor": [
                201
            ],
            "id": [
                201
            ],
            "lastUpdatedAt": [
                280
            ],
            "presale": [
                201
            ],
            "staking": [
                201
            ],
            "__typename": [
                201
            ]
        },
        "ModuleRegistry_bool_exp": {
            "_and": [
                127
            ],
            "_not": [
                127
            ],
            "_or": [
                127
            ],
            "authorizer": [
                203
            ],
            "createdAt": [
                282
            ],
            "creditFacility": [
                203
            ],
            "db_write_timestamp": [
                301
            ],
            "feeTreasury": [
                203
            ],
            "floor": [
                203
            ],
            "id": [
                203
            ],
            "lastUpdatedAt": [
                282
            ],
            "presale": [
                203
            ],
            "staking": [
                203
            ],
            "__typename": [
                201
            ]
        },
        "ModuleRegistry_order_by": {
            "authorizer": [
                283
            ],
            "createdAt": [
                283
            ],
            "creditFacility": [
                283
            ],
            "db_write_timestamp": [
                283
            ],
            "feeTreasury": [
                283
            ],
            "floor": [
                283
            ],
            "id": [
                283
            ],
            "lastUpdatedAt": [
                283
            ],
            "presale": [
                283
            ],
            "staking": [
                283
            ],
            "__typename": [
                201
            ]
        },
        "ModuleRegistry_select_column": {},
        "ModuleRegistry_stream_cursor_input": {
            "initial_value": [
                131
            ],
            "ordering": [
                254
            ],
            "__typename": [
                201
            ]
        },
        "ModuleRegistry_stream_cursor_value_input": {
            "authorizer": [
                201
            ],
            "createdAt": [
                280
            ],
            "creditFacility": [
                201
            ],
            "db_write_timestamp": [
                300
            ],
            "feeTreasury": [
                201
            ],
            "floor": [
                201
            ],
            "id": [
                201
            ],
            "lastUpdatedAt": [
                280
            ],
            "presale": [
                201
            ],
            "staking": [
                201
            ],
            "__typename": [
                201
            ]
        },
        "PreSaleContract": {
            "authorizer": [
                201
            ],
            "claims": [
                138,
                {
                    "distinct_on": [
                        145,
                        "[PresaleClaim_select_column!]"
                    ],
                    "limit": [
                        54
                    ],
                    "offset": [
                        54
                    ],
                    "order_by": [
                        144,
                        "[PresaleClaim_order_by!]"
                    ],
                    "where": [
                        141
                    ]
                }
            ],
            "commissionBps": [
                280
            ],
            "createdAt": [
                280
            ],
            "currentState": [
                54
            ],
            "db_write_timestamp": [
                300
            ],
            "endTime": [
                280
            ],
            "feeTreasury": [
                201
            ],
            "globalDepositCapFormatted": [
                201
            ],
            "globalDepositCapRaw": [
                280
            ],
            "id": [
                201
            ],
            "lastUpdatedAt": [
                280
            ],
            "lendingFacility": [
                201
            ],
            "market_id": [
                201
            ],
            "maxLeverage": [
                280
            ],
            "participations": [
                155,
                {
                    "distinct_on": [
                        162,
                        "[PresaleParticipation_select_column!]"
                    ],
                    "limit": [
                        54
                    ],
                    "offset": [
                        54
                    ],
                    "order_by": [
                        161,
                        "[PresaleParticipation_order_by!]"
                    ],
                    "where": [
                        158
                    ]
                }
            ],
            "perAddressDepositCapFormatted": [
                201
            ],
            "perAddressDepositCapRaw": [
                280
            ],
            "priceBreakpointOffsets": [
                54
            ],
            "priceBreakpointsFlat": [
                280
            ],
            "purchaseToken": [
                204
            ],
            "purchaseToken_id": [
                201
            ],
            "saleToken": [
                204
            ],
            "saleToken_id": [
                201
            ],
            "startTime": [
                280
            ],
            "timeSafeguardTs": [
                280
            ],
            "totalParticipants": [
                280
            ],
            "totalRaisedFormatted": [
                201
            ],
            "totalRaisedRaw": [
                280
            ],
            "whitelistSize": [
                280
            ],
            "whitelistedAddresses": [
                201
            ],
            "__typename": [
                201
            ]
        },
        "PreSaleContract_bool_exp": {
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
                203
            ],
            "claims": [
                141
            ],
            "commissionBps": [
                281
            ],
            "createdAt": [
                282
            ],
            "currentState": [
                56
            ],
            "db_write_timestamp": [
                301
            ],
            "endTime": [
                282
            ],
            "feeTreasury": [
                203
            ],
            "globalDepositCapFormatted": [
                203
            ],
            "globalDepositCapRaw": [
                282
            ],
            "id": [
                203
            ],
            "lastUpdatedAt": [
                282
            ],
            "lendingFacility": [
                203
            ],
            "market_id": [
                203
            ],
            "maxLeverage": [
                282
            ],
            "participations": [
                158
            ],
            "perAddressDepositCapFormatted": [
                203
            ],
            "perAddressDepositCapRaw": [
                282
            ],
            "priceBreakpointOffsets": [
                55
            ],
            "priceBreakpointsFlat": [
                281
            ],
            "purchaseToken": [
                205
            ],
            "purchaseToken_id": [
                203
            ],
            "saleToken": [
                205
            ],
            "saleToken_id": [
                203
            ],
            "startTime": [
                282
            ],
            "timeSafeguardTs": [
                282
            ],
            "totalParticipants": [
                282
            ],
            "totalRaisedFormatted": [
                203
            ],
            "totalRaisedRaw": [
                282
            ],
            "whitelistSize": [
                282
            ],
            "whitelistedAddresses": [
                202
            ],
            "__typename": [
                201
            ]
        },
        "PreSaleContract_order_by": {
            "authorizer": [
                283
            ],
            "claims_aggregate": [
                139
            ],
            "commissionBps": [
                283
            ],
            "createdAt": [
                283
            ],
            "currentState": [
                283
            ],
            "db_write_timestamp": [
                283
            ],
            "endTime": [
                283
            ],
            "feeTreasury": [
                283
            ],
            "globalDepositCapFormatted": [
                283
            ],
            "globalDepositCapRaw": [
                283
            ],
            "id": [
                283
            ],
            "lastUpdatedAt": [
                283
            ],
            "lendingFacility": [
                283
            ],
            "market_id": [
                283
            ],
            "maxLeverage": [
                283
            ],
            "participations_aggregate": [
                156
            ],
            "perAddressDepositCapFormatted": [
                283
            ],
            "perAddressDepositCapRaw": [
                283
            ],
            "priceBreakpointOffsets": [
                283
            ],
            "priceBreakpointsFlat": [
                283
            ],
            "purchaseToken": [
                206
            ],
            "purchaseToken_id": [
                283
            ],
            "saleToken": [
                206
            ],
            "saleToken_id": [
                283
            ],
            "startTime": [
                283
            ],
            "timeSafeguardTs": [
                283
            ],
            "totalParticipants": [
                283
            ],
            "totalRaisedFormatted": [
                283
            ],
            "totalRaisedRaw": [
                283
            ],
            "whitelistSize": [
                283
            ],
            "whitelistedAddresses": [
                283
            ],
            "__typename": [
                201
            ]
        },
        "PreSaleContract_select_column": {},
        "PreSaleContract_stream_cursor_input": {
            "initial_value": [
                137
            ],
            "ordering": [
                254
            ],
            "__typename": [
                201
            ]
        },
        "PreSaleContract_stream_cursor_value_input": {
            "authorizer": [
                201
            ],
            "commissionBps": [
                280
            ],
            "createdAt": [
                280
            ],
            "currentState": [
                54
            ],
            "db_write_timestamp": [
                300
            ],
            "endTime": [
                280
            ],
            "feeTreasury": [
                201
            ],
            "globalDepositCapFormatted": [
                201
            ],
            "globalDepositCapRaw": [
                280
            ],
            "id": [
                201
            ],
            "lastUpdatedAt": [
                280
            ],
            "lendingFacility": [
                201
            ],
            "market_id": [
                201
            ],
            "maxLeverage": [
                280
            ],
            "perAddressDepositCapFormatted": [
                201
            ],
            "perAddressDepositCapRaw": [
                280
            ],
            "priceBreakpointOffsets": [
                54
            ],
            "priceBreakpointsFlat": [
                280
            ],
            "purchaseToken_id": [
                201
            ],
            "saleToken_id": [
                201
            ],
            "startTime": [
                280
            ],
            "timeSafeguardTs": [
                280
            ],
            "totalParticipants": [
                280
            ],
            "totalRaisedFormatted": [
                201
            ],
            "totalRaisedRaw": [
                280
            ],
            "whitelistSize": [
                280
            ],
            "whitelistedAddresses": [
                201
            ],
            "__typename": [
                201
            ]
        },
        "PresaleClaim": {
            "amountFormatted": [
                201
            ],
            "amountRaw": [
                280
            ],
            "claimType": [
                290
            ],
            "db_write_timestamp": [
                300
            ],
            "id": [
                201
            ],
            "loanId": [
                280
            ],
            "positionId": [
                280
            ],
            "presale_id": [
                201
            ],
            "timestamp": [
                280
            ],
            "trancheIndex": [
                280
            ],
            "transactionHash": [
                201
            ],
            "__typename": [
                201
            ]
        },
        "PresaleClaim_aggregate_order_by": {
            "avg": [
                140
            ],
            "count": [
                283
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
                201
            ]
        },
        "PresaleClaim_avg_order_by": {
            "amountRaw": [
                283
            ],
            "loanId": [
                283
            ],
            "positionId": [
                283
            ],
            "timestamp": [
                283
            ],
            "trancheIndex": [
                283
            ],
            "__typename": [
                201
            ]
        },
        "PresaleClaim_bool_exp": {
            "_and": [
                141
            ],
            "_not": [
                141
            ],
            "_or": [
                141
            ],
            "amountFormatted": [
                203
            ],
            "amountRaw": [
                282
            ],
            "claimType": [
                291
            ],
            "db_write_timestamp": [
                301
            ],
            "id": [
                203
            ],
            "loanId": [
                282
            ],
            "positionId": [
                282
            ],
            "presale_id": [
                203
            ],
            "timestamp": [
                282
            ],
            "trancheIndex": [
                282
            ],
            "transactionHash": [
                203
            ],
            "__typename": [
                201
            ]
        },
        "PresaleClaim_max_order_by": {
            "amountFormatted": [
                283
            ],
            "amountRaw": [
                283
            ],
            "claimType": [
                283
            ],
            "db_write_timestamp": [
                283
            ],
            "id": [
                283
            ],
            "loanId": [
                283
            ],
            "positionId": [
                283
            ],
            "presale_id": [
                283
            ],
            "timestamp": [
                283
            ],
            "trancheIndex": [
                283
            ],
            "transactionHash": [
                283
            ],
            "__typename": [
                201
            ]
        },
        "PresaleClaim_min_order_by": {
            "amountFormatted": [
                283
            ],
            "amountRaw": [
                283
            ],
            "claimType": [
                283
            ],
            "db_write_timestamp": [
                283
            ],
            "id": [
                283
            ],
            "loanId": [
                283
            ],
            "positionId": [
                283
            ],
            "presale_id": [
                283
            ],
            "timestamp": [
                283
            ],
            "trancheIndex": [
                283
            ],
            "transactionHash": [
                283
            ],
            "__typename": [
                201
            ]
        },
        "PresaleClaim_order_by": {
            "amountFormatted": [
                283
            ],
            "amountRaw": [
                283
            ],
            "claimType": [
                283
            ],
            "db_write_timestamp": [
                283
            ],
            "id": [
                283
            ],
            "loanId": [
                283
            ],
            "positionId": [
                283
            ],
            "presale_id": [
                283
            ],
            "timestamp": [
                283
            ],
            "trancheIndex": [
                283
            ],
            "transactionHash": [
                283
            ],
            "__typename": [
                201
            ]
        },
        "PresaleClaim_select_column": {},
        "PresaleClaim_stddev_order_by": {
            "amountRaw": [
                283
            ],
            "loanId": [
                283
            ],
            "positionId": [
                283
            ],
            "timestamp": [
                283
            ],
            "trancheIndex": [
                283
            ],
            "__typename": [
                201
            ]
        },
        "PresaleClaim_stddev_pop_order_by": {
            "amountRaw": [
                283
            ],
            "loanId": [
                283
            ],
            "positionId": [
                283
            ],
            "timestamp": [
                283
            ],
            "trancheIndex": [
                283
            ],
            "__typename": [
                201
            ]
        },
        "PresaleClaim_stddev_samp_order_by": {
            "amountRaw": [
                283
            ],
            "loanId": [
                283
            ],
            "positionId": [
                283
            ],
            "timestamp": [
                283
            ],
            "trancheIndex": [
                283
            ],
            "__typename": [
                201
            ]
        },
        "PresaleClaim_stream_cursor_input": {
            "initial_value": [
                150
            ],
            "ordering": [
                254
            ],
            "__typename": [
                201
            ]
        },
        "PresaleClaim_stream_cursor_value_input": {
            "amountFormatted": [
                201
            ],
            "amountRaw": [
                280
            ],
            "claimType": [
                290
            ],
            "db_write_timestamp": [
                300
            ],
            "id": [
                201
            ],
            "loanId": [
                280
            ],
            "positionId": [
                280
            ],
            "presale_id": [
                201
            ],
            "timestamp": [
                280
            ],
            "trancheIndex": [
                280
            ],
            "transactionHash": [
                201
            ],
            "__typename": [
                201
            ]
        },
        "PresaleClaim_sum_order_by": {
            "amountRaw": [
                283
            ],
            "loanId": [
                283
            ],
            "positionId": [
                283
            ],
            "timestamp": [
                283
            ],
            "trancheIndex": [
                283
            ],
            "__typename": [
                201
            ]
        },
        "PresaleClaim_var_pop_order_by": {
            "amountRaw": [
                283
            ],
            "loanId": [
                283
            ],
            "positionId": [
                283
            ],
            "timestamp": [
                283
            ],
            "trancheIndex": [
                283
            ],
            "__typename": [
                201
            ]
        },
        "PresaleClaim_var_samp_order_by": {
            "amountRaw": [
                283
            ],
            "loanId": [
                283
            ],
            "positionId": [
                283
            ],
            "timestamp": [
                283
            ],
            "trancheIndex": [
                283
            ],
            "__typename": [
                201
            ]
        },
        "PresaleClaim_variance_order_by": {
            "amountRaw": [
                283
            ],
            "loanId": [
                283
            ],
            "positionId": [
                283
            ],
            "timestamp": [
                283
            ],
            "trancheIndex": [
                283
            ],
            "__typename": [
                201
            ]
        },
        "PresaleParticipation": {
            "db_write_timestamp": [
                300
            ],
            "depositAmountFormatted": [
                201
            ],
            "depositAmountRaw": [
                280
            ],
            "id": [
                201
            ],
            "leverage": [
                280
            ],
            "loopCount": [
                280
            ],
            "mintedAmountFormatted": [
                201
            ],
            "mintedAmountRaw": [
                280
            ],
            "positionId": [
                280
            ],
            "presale_id": [
                201
            ],
            "timestamp": [
                280
            ],
            "transactionHash": [
                201
            ],
            "user_id": [
                201
            ],
            "__typename": [
                201
            ]
        },
        "PresaleParticipation_aggregate_order_by": {
            "avg": [
                157
            ],
            "count": [
                283
            ],
            "max": [
                159
            ],
            "min": [
                160
            ],
            "stddev": [
                163
            ],
            "stddev_pop": [
                164
            ],
            "stddev_samp": [
                165
            ],
            "sum": [
                168
            ],
            "var_pop": [
                169
            ],
            "var_samp": [
                170
            ],
            "variance": [
                171
            ],
            "__typename": [
                201
            ]
        },
        "PresaleParticipation_avg_order_by": {
            "depositAmountRaw": [
                283
            ],
            "leverage": [
                283
            ],
            "loopCount": [
                283
            ],
            "mintedAmountRaw": [
                283
            ],
            "positionId": [
                283
            ],
            "timestamp": [
                283
            ],
            "__typename": [
                201
            ]
        },
        "PresaleParticipation_bool_exp": {
            "_and": [
                158
            ],
            "_not": [
                158
            ],
            "_or": [
                158
            ],
            "db_write_timestamp": [
                301
            ],
            "depositAmountFormatted": [
                203
            ],
            "depositAmountRaw": [
                282
            ],
            "id": [
                203
            ],
            "leverage": [
                282
            ],
            "loopCount": [
                282
            ],
            "mintedAmountFormatted": [
                203
            ],
            "mintedAmountRaw": [
                282
            ],
            "positionId": [
                282
            ],
            "presale_id": [
                203
            ],
            "timestamp": [
                282
            ],
            "transactionHash": [
                203
            ],
            "user_id": [
                203
            ],
            "__typename": [
                201
            ]
        },
        "PresaleParticipation_max_order_by": {
            "db_write_timestamp": [
                283
            ],
            "depositAmountFormatted": [
                283
            ],
            "depositAmountRaw": [
                283
            ],
            "id": [
                283
            ],
            "leverage": [
                283
            ],
            "loopCount": [
                283
            ],
            "mintedAmountFormatted": [
                283
            ],
            "mintedAmountRaw": [
                283
            ],
            "positionId": [
                283
            ],
            "presale_id": [
                283
            ],
            "timestamp": [
                283
            ],
            "transactionHash": [
                283
            ],
            "user_id": [
                283
            ],
            "__typename": [
                201
            ]
        },
        "PresaleParticipation_min_order_by": {
            "db_write_timestamp": [
                283
            ],
            "depositAmountFormatted": [
                283
            ],
            "depositAmountRaw": [
                283
            ],
            "id": [
                283
            ],
            "leverage": [
                283
            ],
            "loopCount": [
                283
            ],
            "mintedAmountFormatted": [
                283
            ],
            "mintedAmountRaw": [
                283
            ],
            "positionId": [
                283
            ],
            "presale_id": [
                283
            ],
            "timestamp": [
                283
            ],
            "transactionHash": [
                283
            ],
            "user_id": [
                283
            ],
            "__typename": [
                201
            ]
        },
        "PresaleParticipation_order_by": {
            "db_write_timestamp": [
                283
            ],
            "depositAmountFormatted": [
                283
            ],
            "depositAmountRaw": [
                283
            ],
            "id": [
                283
            ],
            "leverage": [
                283
            ],
            "loopCount": [
                283
            ],
            "mintedAmountFormatted": [
                283
            ],
            "mintedAmountRaw": [
                283
            ],
            "positionId": [
                283
            ],
            "presale_id": [
                283
            ],
            "timestamp": [
                283
            ],
            "transactionHash": [
                283
            ],
            "user_id": [
                283
            ],
            "__typename": [
                201
            ]
        },
        "PresaleParticipation_select_column": {},
        "PresaleParticipation_stddev_order_by": {
            "depositAmountRaw": [
                283
            ],
            "leverage": [
                283
            ],
            "loopCount": [
                283
            ],
            "mintedAmountRaw": [
                283
            ],
            "positionId": [
                283
            ],
            "timestamp": [
                283
            ],
            "__typename": [
                201
            ]
        },
        "PresaleParticipation_stddev_pop_order_by": {
            "depositAmountRaw": [
                283
            ],
            "leverage": [
                283
            ],
            "loopCount": [
                283
            ],
            "mintedAmountRaw": [
                283
            ],
            "positionId": [
                283
            ],
            "timestamp": [
                283
            ],
            "__typename": [
                201
            ]
        },
        "PresaleParticipation_stddev_samp_order_by": {
            "depositAmountRaw": [
                283
            ],
            "leverage": [
                283
            ],
            "loopCount": [
                283
            ],
            "mintedAmountRaw": [
                283
            ],
            "positionId": [
                283
            ],
            "timestamp": [
                283
            ],
            "__typename": [
                201
            ]
        },
        "PresaleParticipation_stream_cursor_input": {
            "initial_value": [
                167
            ],
            "ordering": [
                254
            ],
            "__typename": [
                201
            ]
        },
        "PresaleParticipation_stream_cursor_value_input": {
            "db_write_timestamp": [
                300
            ],
            "depositAmountFormatted": [
                201
            ],
            "depositAmountRaw": [
                280
            ],
            "id": [
                201
            ],
            "leverage": [
                280
            ],
            "loopCount": [
                280
            ],
            "mintedAmountFormatted": [
                201
            ],
            "mintedAmountRaw": [
                280
            ],
            "positionId": [
                280
            ],
            "presale_id": [
                201
            ],
            "timestamp": [
                280
            ],
            "transactionHash": [
                201
            ],
            "user_id": [
                201
            ],
            "__typename": [
                201
            ]
        },
        "PresaleParticipation_sum_order_by": {
            "depositAmountRaw": [
                283
            ],
            "leverage": [
                283
            ],
            "loopCount": [
                283
            ],
            "mintedAmountRaw": [
                283
            ],
            "positionId": [
                283
            ],
            "timestamp": [
                283
            ],
            "__typename": [
                201
            ]
        },
        "PresaleParticipation_var_pop_order_by": {
            "depositAmountRaw": [
                283
            ],
            "leverage": [
                283
            ],
            "loopCount": [
                283
            ],
            "mintedAmountRaw": [
                283
            ],
            "positionId": [
                283
            ],
            "timestamp": [
                283
            ],
            "__typename": [
                201
            ]
        },
        "PresaleParticipation_var_samp_order_by": {
            "depositAmountRaw": [
                283
            ],
            "leverage": [
                283
            ],
            "loopCount": [
                283
            ],
            "mintedAmountRaw": [
                283
            ],
            "positionId": [
                283
            ],
            "timestamp": [
                283
            ],
            "__typename": [
                201
            ]
        },
        "PresaleParticipation_variance_order_by": {
            "depositAmountRaw": [
                283
            ],
            "leverage": [
                283
            ],
            "loopCount": [
                283
            ],
            "mintedAmountRaw": [
                283
            ],
            "positionId": [
                283
            ],
            "timestamp": [
                283
            ],
            "__typename": [
                201
            ]
        },
        "PriceCandle": {
            "closeFormatted": [
                201
            ],
            "closeRaw": [
                280
            ],
            "db_write_timestamp": [
                300
            ],
            "highFormatted": [
                201
            ],
            "highRaw": [
                280
            ],
            "id": [
                201
            ],
            "lowFormatted": [
                201
            ],
            "lowRaw": [
                280
            ],
            "market_id": [
                201
            ],
            "openFormatted": [
                201
            ],
            "openRaw": [
                280
            ],
            "period": [
                244
            ],
            "timestamp": [
                280
            ],
            "trades": [
                280
            ],
            "volumeFormatted": [
                201
            ],
            "volumeRaw": [
                280
            ],
            "__typename": [
                201
            ]
        },
        "PriceCandle_bool_exp": {
            "_and": [
                173
            ],
            "_not": [
                173
            ],
            "_or": [
                173
            ],
            "closeFormatted": [
                203
            ],
            "closeRaw": [
                282
            ],
            "db_write_timestamp": [
                301
            ],
            "highFormatted": [
                203
            ],
            "highRaw": [
                282
            ],
            "id": [
                203
            ],
            "lowFormatted": [
                203
            ],
            "lowRaw": [
                282
            ],
            "market_id": [
                203
            ],
            "openFormatted": [
                203
            ],
            "openRaw": [
                282
            ],
            "period": [
                245
            ],
            "timestamp": [
                282
            ],
            "trades": [
                282
            ],
            "volumeFormatted": [
                203
            ],
            "volumeRaw": [
                282
            ],
            "__typename": [
                201
            ]
        },
        "PriceCandle_order_by": {
            "closeFormatted": [
                283
            ],
            "closeRaw": [
                283
            ],
            "db_write_timestamp": [
                283
            ],
            "highFormatted": [
                283
            ],
            "highRaw": [
                283
            ],
            "id": [
                283
            ],
            "lowFormatted": [
                283
            ],
            "lowRaw": [
                283
            ],
            "market_id": [
                283
            ],
            "openFormatted": [
                283
            ],
            "openRaw": [
                283
            ],
            "period": [
                283
            ],
            "timestamp": [
                283
            ],
            "trades": [
                283
            ],
            "volumeFormatted": [
                283
            ],
            "volumeRaw": [
                283
            ],
            "__typename": [
                201
            ]
        },
        "PriceCandle_select_column": {},
        "PriceCandle_stream_cursor_input": {
            "initial_value": [
                177
            ],
            "ordering": [
                254
            ],
            "__typename": [
                201
            ]
        },
        "PriceCandle_stream_cursor_value_input": {
            "closeFormatted": [
                201
            ],
            "closeRaw": [
                280
            ],
            "db_write_timestamp": [
                300
            ],
            "highFormatted": [
                201
            ],
            "highRaw": [
                280
            ],
            "id": [
                201
            ],
            "lowFormatted": [
                201
            ],
            "lowRaw": [
                280
            ],
            "market_id": [
                201
            ],
            "openFormatted": [
                201
            ],
            "openRaw": [
                280
            ],
            "period": [
                244
            ],
            "timestamp": [
                280
            ],
            "trades": [
                280
            ],
            "volumeFormatted": [
                201
            ],
            "volumeRaw": [
                280
            ],
            "__typename": [
                201
            ]
        },
        "Stake": {
            "amountFormatted": [
                201
            ],
            "amountRaw": [
                280
            ],
            "contract_id": [
                201
            ],
            "db_write_timestamp": [
                300
            ],
            "id": [
                201
            ],
            "lockDuration": [
                280
            ],
            "status": [
                298
            ],
            "timestamp": [
                280
            ],
            "transactionHash": [
                201
            ],
            "user_id": [
                201
            ],
            "__typename": [
                201
            ]
        },
        "Stake_aggregate_order_by": {
            "avg": [
                180
            ],
            "count": [
                283
            ],
            "max": [
                182
            ],
            "min": [
                183
            ],
            "stddev": [
                186
            ],
            "stddev_pop": [
                187
            ],
            "stddev_samp": [
                188
            ],
            "sum": [
                191
            ],
            "var_pop": [
                192
            ],
            "var_samp": [
                193
            ],
            "variance": [
                194
            ],
            "__typename": [
                201
            ]
        },
        "Stake_avg_order_by": {
            "amountRaw": [
                283
            ],
            "lockDuration": [
                283
            ],
            "timestamp": [
                283
            ],
            "__typename": [
                201
            ]
        },
        "Stake_bool_exp": {
            "_and": [
                181
            ],
            "_not": [
                181
            ],
            "_or": [
                181
            ],
            "amountFormatted": [
                203
            ],
            "amountRaw": [
                282
            ],
            "contract_id": [
                203
            ],
            "db_write_timestamp": [
                301
            ],
            "id": [
                203
            ],
            "lockDuration": [
                282
            ],
            "status": [
                299
            ],
            "timestamp": [
                282
            ],
            "transactionHash": [
                203
            ],
            "user_id": [
                203
            ],
            "__typename": [
                201
            ]
        },
        "Stake_max_order_by": {
            "amountFormatted": [
                283
            ],
            "amountRaw": [
                283
            ],
            "contract_id": [
                283
            ],
            "db_write_timestamp": [
                283
            ],
            "id": [
                283
            ],
            "lockDuration": [
                283
            ],
            "status": [
                283
            ],
            "timestamp": [
                283
            ],
            "transactionHash": [
                283
            ],
            "user_id": [
                283
            ],
            "__typename": [
                201
            ]
        },
        "Stake_min_order_by": {
            "amountFormatted": [
                283
            ],
            "amountRaw": [
                283
            ],
            "contract_id": [
                283
            ],
            "db_write_timestamp": [
                283
            ],
            "id": [
                283
            ],
            "lockDuration": [
                283
            ],
            "status": [
                283
            ],
            "timestamp": [
                283
            ],
            "transactionHash": [
                283
            ],
            "user_id": [
                283
            ],
            "__typename": [
                201
            ]
        },
        "Stake_order_by": {
            "amountFormatted": [
                283
            ],
            "amountRaw": [
                283
            ],
            "contract_id": [
                283
            ],
            "db_write_timestamp": [
                283
            ],
            "id": [
                283
            ],
            "lockDuration": [
                283
            ],
            "status": [
                283
            ],
            "timestamp": [
                283
            ],
            "transactionHash": [
                283
            ],
            "user_id": [
                283
            ],
            "__typename": [
                201
            ]
        },
        "Stake_select_column": {},
        "Stake_stddev_order_by": {
            "amountRaw": [
                283
            ],
            "lockDuration": [
                283
            ],
            "timestamp": [
                283
            ],
            "__typename": [
                201
            ]
        },
        "Stake_stddev_pop_order_by": {
            "amountRaw": [
                283
            ],
            "lockDuration": [
                283
            ],
            "timestamp": [
                283
            ],
            "__typename": [
                201
            ]
        },
        "Stake_stddev_samp_order_by": {
            "amountRaw": [
                283
            ],
            "lockDuration": [
                283
            ],
            "timestamp": [
                283
            ],
            "__typename": [
                201
            ]
        },
        "Stake_stream_cursor_input": {
            "initial_value": [
                190
            ],
            "ordering": [
                254
            ],
            "__typename": [
                201
            ]
        },
        "Stake_stream_cursor_value_input": {
            "amountFormatted": [
                201
            ],
            "amountRaw": [
                280
            ],
            "contract_id": [
                201
            ],
            "db_write_timestamp": [
                300
            ],
            "id": [
                201
            ],
            "lockDuration": [
                280
            ],
            "status": [
                298
            ],
            "timestamp": [
                280
            ],
            "transactionHash": [
                201
            ],
            "user_id": [
                201
            ],
            "__typename": [
                201
            ]
        },
        "Stake_sum_order_by": {
            "amountRaw": [
                283
            ],
            "lockDuration": [
                283
            ],
            "timestamp": [
                283
            ],
            "__typename": [
                201
            ]
        },
        "Stake_var_pop_order_by": {
            "amountRaw": [
                283
            ],
            "lockDuration": [
                283
            ],
            "timestamp": [
                283
            ],
            "__typename": [
                201
            ]
        },
        "Stake_var_samp_order_by": {
            "amountRaw": [
                283
            ],
            "lockDuration": [
                283
            ],
            "timestamp": [
                283
            ],
            "__typename": [
                201
            ]
        },
        "Stake_variance_order_by": {
            "amountRaw": [
                283
            ],
            "lockDuration": [
                283
            ],
            "timestamp": [
                283
            ],
            "__typename": [
                201
            ]
        },
        "StakingContract": {
            "createdAt": [
                280
            ],
            "db_write_timestamp": [
                300
            ],
            "id": [
                201
            ],
            "rewardToken_id": [
                201
            ],
            "stakes": [
                178,
                {
                    "distinct_on": [
                        185,
                        "[Stake_select_column!]"
                    ],
                    "limit": [
                        54
                    ],
                    "offset": [
                        54
                    ],
                    "order_by": [
                        184,
                        "[Stake_order_by!]"
                    ],
                    "where": [
                        181
                    ]
                }
            ],
            "stakingToken_id": [
                201
            ],
            "totalRewardsFormatted": [
                201
            ],
            "totalRewardsRaw": [
                280
            ],
            "totalStakedFormatted": [
                201
            ],
            "totalStakedRaw": [
                280
            ],
            "__typename": [
                201
            ]
        },
        "StakingContract_bool_exp": {
            "_and": [
                196
            ],
            "_not": [
                196
            ],
            "_or": [
                196
            ],
            "createdAt": [
                282
            ],
            "db_write_timestamp": [
                301
            ],
            "id": [
                203
            ],
            "rewardToken_id": [
                203
            ],
            "stakes": [
                181
            ],
            "stakingToken_id": [
                203
            ],
            "totalRewardsFormatted": [
                203
            ],
            "totalRewardsRaw": [
                282
            ],
            "totalStakedFormatted": [
                203
            ],
            "totalStakedRaw": [
                282
            ],
            "__typename": [
                201
            ]
        },
        "StakingContract_order_by": {
            "createdAt": [
                283
            ],
            "db_write_timestamp": [
                283
            ],
            "id": [
                283
            ],
            "rewardToken_id": [
                283
            ],
            "stakes_aggregate": [
                179
            ],
            "stakingToken_id": [
                283
            ],
            "totalRewardsFormatted": [
                283
            ],
            "totalRewardsRaw": [
                283
            ],
            "totalStakedFormatted": [
                283
            ],
            "totalStakedRaw": [
                283
            ],
            "__typename": [
                201
            ]
        },
        "StakingContract_select_column": {},
        "StakingContract_stream_cursor_input": {
            "initial_value": [
                200
            ],
            "ordering": [
                254
            ],
            "__typename": [
                201
            ]
        },
        "StakingContract_stream_cursor_value_input": {
            "createdAt": [
                280
            ],
            "db_write_timestamp": [
                300
            ],
            "id": [
                201
            ],
            "rewardToken_id": [
                201
            ],
            "stakingToken_id": [
                201
            ],
            "totalRewardsFormatted": [
                201
            ],
            "totalRewardsRaw": [
                280
            ],
            "totalStakedFormatted": [
                201
            ],
            "totalStakedRaw": [
                280
            ],
            "__typename": [
                201
            ]
        },
        "String": {},
        "String_array_comparison_exp": {
            "_contained_in": [
                201
            ],
            "_contains": [
                201
            ],
            "_eq": [
                201
            ],
            "_gt": [
                201
            ],
            "_gte": [
                201
            ],
            "_in": [
                201
            ],
            "_is_null": [
                6
            ],
            "_lt": [
                201
            ],
            "_lte": [
                201
            ],
            "_neq": [
                201
            ],
            "_nin": [
                201
            ],
            "__typename": [
                201
            ]
        },
        "String_comparison_exp": {
            "_eq": [
                201
            ],
            "_gt": [
                201
            ],
            "_gte": [
                201
            ],
            "_ilike": [
                201
            ],
            "_in": [
                201
            ],
            "_iregex": [
                201
            ],
            "_is_null": [
                6
            ],
            "_like": [
                201
            ],
            "_lt": [
                201
            ],
            "_lte": [
                201
            ],
            "_neq": [
                201
            ],
            "_nilike": [
                201
            ],
            "_nin": [
                201
            ],
            "_niregex": [
                201
            ],
            "_nlike": [
                201
            ],
            "_nregex": [
                201
            ],
            "_nsimilar": [
                201
            ],
            "_regex": [
                201
            ],
            "_similar": [
                201
            ],
            "__typename": [
                201
            ]
        },
        "Token": {
            "db_write_timestamp": [
                300
            ],
            "decimals": [
                54
            ],
            "id": [
                201
            ],
            "maxSupplyFormatted": [
                201
            ],
            "maxSupplyRaw": [
                280
            ],
            "name": [
                201
            ],
            "symbol": [
                201
            ],
            "__typename": [
                201
            ]
        },
        "Token_bool_exp": {
            "_and": [
                205
            ],
            "_not": [
                205
            ],
            "_or": [
                205
            ],
            "db_write_timestamp": [
                301
            ],
            "decimals": [
                56
            ],
            "id": [
                203
            ],
            "maxSupplyFormatted": [
                203
            ],
            "maxSupplyRaw": [
                282
            ],
            "name": [
                203
            ],
            "symbol": [
                203
            ],
            "__typename": [
                201
            ]
        },
        "Token_order_by": {
            "db_write_timestamp": [
                283
            ],
            "decimals": [
                283
            ],
            "id": [
                283
            ],
            "maxSupplyFormatted": [
                283
            ],
            "maxSupplyRaw": [
                283
            ],
            "name": [
                283
            ],
            "symbol": [
                283
            ],
            "__typename": [
                201
            ]
        },
        "Token_select_column": {},
        "Token_stream_cursor_input": {
            "initial_value": [
                209
            ],
            "ordering": [
                254
            ],
            "__typename": [
                201
            ]
        },
        "Token_stream_cursor_value_input": {
            "db_write_timestamp": [
                300
            ],
            "decimals": [
                54
            ],
            "id": [
                201
            ],
            "maxSupplyFormatted": [
                201
            ],
            "maxSupplyRaw": [
                280
            ],
            "name": [
                201
            ],
            "symbol": [
                201
            ],
            "__typename": [
                201
            ]
        },
        "Trade": {
            "db_write_timestamp": [
                300
            ],
            "feeFormatted": [
                201
            ],
            "feeRaw": [
                280
            ],
            "id": [
                201
            ],
            "market_id": [
                201
            ],
            "newPriceFormatted": [
                201
            ],
            "newPriceRaw": [
                280
            ],
            "reserveAmountFormatted": [
                201
            ],
            "reserveAmountRaw": [
                280
            ],
            "timestamp": [
                280
            ],
            "tokenAmountFormatted": [
                201
            ],
            "tokenAmountRaw": [
                280
            ],
            "tradeType": [
                304
            ],
            "transactionHash": [
                201
            ],
            "user_id": [
                201
            ],
            "__typename": [
                201
            ]
        },
        "Trade_aggregate_order_by": {
            "avg": [
                212
            ],
            "count": [
                283
            ],
            "max": [
                214
            ],
            "min": [
                215
            ],
            "stddev": [
                218
            ],
            "stddev_pop": [
                219
            ],
            "stddev_samp": [
                220
            ],
            "sum": [
                223
            ],
            "var_pop": [
                224
            ],
            "var_samp": [
                225
            ],
            "variance": [
                226
            ],
            "__typename": [
                201
            ]
        },
        "Trade_avg_order_by": {
            "feeRaw": [
                283
            ],
            "newPriceRaw": [
                283
            ],
            "reserveAmountRaw": [
                283
            ],
            "timestamp": [
                283
            ],
            "tokenAmountRaw": [
                283
            ],
            "__typename": [
                201
            ]
        },
        "Trade_bool_exp": {
            "_and": [
                213
            ],
            "_not": [
                213
            ],
            "_or": [
                213
            ],
            "db_write_timestamp": [
                301
            ],
            "feeFormatted": [
                203
            ],
            "feeRaw": [
                282
            ],
            "id": [
                203
            ],
            "market_id": [
                203
            ],
            "newPriceFormatted": [
                203
            ],
            "newPriceRaw": [
                282
            ],
            "reserveAmountFormatted": [
                203
            ],
            "reserveAmountRaw": [
                282
            ],
            "timestamp": [
                282
            ],
            "tokenAmountFormatted": [
                203
            ],
            "tokenAmountRaw": [
                282
            ],
            "tradeType": [
                305
            ],
            "transactionHash": [
                203
            ],
            "user_id": [
                203
            ],
            "__typename": [
                201
            ]
        },
        "Trade_max_order_by": {
            "db_write_timestamp": [
                283
            ],
            "feeFormatted": [
                283
            ],
            "feeRaw": [
                283
            ],
            "id": [
                283
            ],
            "market_id": [
                283
            ],
            "newPriceFormatted": [
                283
            ],
            "newPriceRaw": [
                283
            ],
            "reserveAmountFormatted": [
                283
            ],
            "reserveAmountRaw": [
                283
            ],
            "timestamp": [
                283
            ],
            "tokenAmountFormatted": [
                283
            ],
            "tokenAmountRaw": [
                283
            ],
            "tradeType": [
                283
            ],
            "transactionHash": [
                283
            ],
            "user_id": [
                283
            ],
            "__typename": [
                201
            ]
        },
        "Trade_min_order_by": {
            "db_write_timestamp": [
                283
            ],
            "feeFormatted": [
                283
            ],
            "feeRaw": [
                283
            ],
            "id": [
                283
            ],
            "market_id": [
                283
            ],
            "newPriceFormatted": [
                283
            ],
            "newPriceRaw": [
                283
            ],
            "reserveAmountFormatted": [
                283
            ],
            "reserveAmountRaw": [
                283
            ],
            "timestamp": [
                283
            ],
            "tokenAmountFormatted": [
                283
            ],
            "tokenAmountRaw": [
                283
            ],
            "tradeType": [
                283
            ],
            "transactionHash": [
                283
            ],
            "user_id": [
                283
            ],
            "__typename": [
                201
            ]
        },
        "Trade_order_by": {
            "db_write_timestamp": [
                283
            ],
            "feeFormatted": [
                283
            ],
            "feeRaw": [
                283
            ],
            "id": [
                283
            ],
            "market_id": [
                283
            ],
            "newPriceFormatted": [
                283
            ],
            "newPriceRaw": [
                283
            ],
            "reserveAmountFormatted": [
                283
            ],
            "reserveAmountRaw": [
                283
            ],
            "timestamp": [
                283
            ],
            "tokenAmountFormatted": [
                283
            ],
            "tokenAmountRaw": [
                283
            ],
            "tradeType": [
                283
            ],
            "transactionHash": [
                283
            ],
            "user_id": [
                283
            ],
            "__typename": [
                201
            ]
        },
        "Trade_select_column": {},
        "Trade_stddev_order_by": {
            "feeRaw": [
                283
            ],
            "newPriceRaw": [
                283
            ],
            "reserveAmountRaw": [
                283
            ],
            "timestamp": [
                283
            ],
            "tokenAmountRaw": [
                283
            ],
            "__typename": [
                201
            ]
        },
        "Trade_stddev_pop_order_by": {
            "feeRaw": [
                283
            ],
            "newPriceRaw": [
                283
            ],
            "reserveAmountRaw": [
                283
            ],
            "timestamp": [
                283
            ],
            "tokenAmountRaw": [
                283
            ],
            "__typename": [
                201
            ]
        },
        "Trade_stddev_samp_order_by": {
            "feeRaw": [
                283
            ],
            "newPriceRaw": [
                283
            ],
            "reserveAmountRaw": [
                283
            ],
            "timestamp": [
                283
            ],
            "tokenAmountRaw": [
                283
            ],
            "__typename": [
                201
            ]
        },
        "Trade_stream_cursor_input": {
            "initial_value": [
                222
            ],
            "ordering": [
                254
            ],
            "__typename": [
                201
            ]
        },
        "Trade_stream_cursor_value_input": {
            "db_write_timestamp": [
                300
            ],
            "feeFormatted": [
                201
            ],
            "feeRaw": [
                280
            ],
            "id": [
                201
            ],
            "market_id": [
                201
            ],
            "newPriceFormatted": [
                201
            ],
            "newPriceRaw": [
                280
            ],
            "reserveAmountFormatted": [
                201
            ],
            "reserveAmountRaw": [
                280
            ],
            "timestamp": [
                280
            ],
            "tokenAmountFormatted": [
                201
            ],
            "tokenAmountRaw": [
                280
            ],
            "tradeType": [
                304
            ],
            "transactionHash": [
                201
            ],
            "user_id": [
                201
            ],
            "__typename": [
                201
            ]
        },
        "Trade_sum_order_by": {
            "feeRaw": [
                283
            ],
            "newPriceRaw": [
                283
            ],
            "reserveAmountRaw": [
                283
            ],
            "timestamp": [
                283
            ],
            "tokenAmountRaw": [
                283
            ],
            "__typename": [
                201
            ]
        },
        "Trade_var_pop_order_by": {
            "feeRaw": [
                283
            ],
            "newPriceRaw": [
                283
            ],
            "reserveAmountRaw": [
                283
            ],
            "timestamp": [
                283
            ],
            "tokenAmountRaw": [
                283
            ],
            "__typename": [
                201
            ]
        },
        "Trade_var_samp_order_by": {
            "feeRaw": [
                283
            ],
            "newPriceRaw": [
                283
            ],
            "reserveAmountRaw": [
                283
            ],
            "timestamp": [
                283
            ],
            "tokenAmountRaw": [
                283
            ],
            "__typename": [
                201
            ]
        },
        "Trade_variance_order_by": {
            "feeRaw": [
                283
            ],
            "newPriceRaw": [
                283
            ],
            "reserveAmountRaw": [
                283
            ],
            "timestamp": [
                283
            ],
            "tokenAmountRaw": [
                283
            ],
            "__typename": [
                201
            ]
        },
        "UserMarketPosition": {
            "claimableRewardsFormatted": [
                201
            ],
            "claimableRewardsRaw": [
                280
            ],
            "db_write_timestamp": [
                300
            ],
            "id": [
                201
            ],
            "lastUpdatedAt": [
                280
            ],
            "lockedCollateralFormatted": [
                201
            ],
            "lockedCollateralRaw": [
                280
            ],
            "market_id": [
                201
            ],
            "netFTokenChangeFormatted": [
                201
            ],
            "netFTokenChangeRaw": [
                280
            ],
            "presaleDepositFormatted": [
                201
            ],
            "presaleDepositRaw": [
                280
            ],
            "presaleLeverage": [
                280
            ],
            "stakedAmountFormatted": [
                201
            ],
            "stakedAmountRaw": [
                280
            ],
            "totalDebtFormatted": [
                201
            ],
            "totalDebtRaw": [
                280
            ],
            "user_id": [
                201
            ],
            "__typename": [
                201
            ]
        },
        "UserMarketPosition_aggregate_order_by": {
            "avg": [
                229
            ],
            "count": [
                283
            ],
            "max": [
                231
            ],
            "min": [
                232
            ],
            "stddev": [
                235
            ],
            "stddev_pop": [
                236
            ],
            "stddev_samp": [
                237
            ],
            "sum": [
                240
            ],
            "var_pop": [
                241
            ],
            "var_samp": [
                242
            ],
            "variance": [
                243
            ],
            "__typename": [
                201
            ]
        },
        "UserMarketPosition_avg_order_by": {
            "claimableRewardsRaw": [
                283
            ],
            "lastUpdatedAt": [
                283
            ],
            "lockedCollateralRaw": [
                283
            ],
            "netFTokenChangeRaw": [
                283
            ],
            "presaleDepositRaw": [
                283
            ],
            "presaleLeverage": [
                283
            ],
            "stakedAmountRaw": [
                283
            ],
            "totalDebtRaw": [
                283
            ],
            "__typename": [
                201
            ]
        },
        "UserMarketPosition_bool_exp": {
            "_and": [
                230
            ],
            "_not": [
                230
            ],
            "_or": [
                230
            ],
            "claimableRewardsFormatted": [
                203
            ],
            "claimableRewardsRaw": [
                282
            ],
            "db_write_timestamp": [
                301
            ],
            "id": [
                203
            ],
            "lastUpdatedAt": [
                282
            ],
            "lockedCollateralFormatted": [
                203
            ],
            "lockedCollateralRaw": [
                282
            ],
            "market_id": [
                203
            ],
            "netFTokenChangeFormatted": [
                203
            ],
            "netFTokenChangeRaw": [
                282
            ],
            "presaleDepositFormatted": [
                203
            ],
            "presaleDepositRaw": [
                282
            ],
            "presaleLeverage": [
                282
            ],
            "stakedAmountFormatted": [
                203
            ],
            "stakedAmountRaw": [
                282
            ],
            "totalDebtFormatted": [
                203
            ],
            "totalDebtRaw": [
                282
            ],
            "user_id": [
                203
            ],
            "__typename": [
                201
            ]
        },
        "UserMarketPosition_max_order_by": {
            "claimableRewardsFormatted": [
                283
            ],
            "claimableRewardsRaw": [
                283
            ],
            "db_write_timestamp": [
                283
            ],
            "id": [
                283
            ],
            "lastUpdatedAt": [
                283
            ],
            "lockedCollateralFormatted": [
                283
            ],
            "lockedCollateralRaw": [
                283
            ],
            "market_id": [
                283
            ],
            "netFTokenChangeFormatted": [
                283
            ],
            "netFTokenChangeRaw": [
                283
            ],
            "presaleDepositFormatted": [
                283
            ],
            "presaleDepositRaw": [
                283
            ],
            "presaleLeverage": [
                283
            ],
            "stakedAmountFormatted": [
                283
            ],
            "stakedAmountRaw": [
                283
            ],
            "totalDebtFormatted": [
                283
            ],
            "totalDebtRaw": [
                283
            ],
            "user_id": [
                283
            ],
            "__typename": [
                201
            ]
        },
        "UserMarketPosition_min_order_by": {
            "claimableRewardsFormatted": [
                283
            ],
            "claimableRewardsRaw": [
                283
            ],
            "db_write_timestamp": [
                283
            ],
            "id": [
                283
            ],
            "lastUpdatedAt": [
                283
            ],
            "lockedCollateralFormatted": [
                283
            ],
            "lockedCollateralRaw": [
                283
            ],
            "market_id": [
                283
            ],
            "netFTokenChangeFormatted": [
                283
            ],
            "netFTokenChangeRaw": [
                283
            ],
            "presaleDepositFormatted": [
                283
            ],
            "presaleDepositRaw": [
                283
            ],
            "presaleLeverage": [
                283
            ],
            "stakedAmountFormatted": [
                283
            ],
            "stakedAmountRaw": [
                283
            ],
            "totalDebtFormatted": [
                283
            ],
            "totalDebtRaw": [
                283
            ],
            "user_id": [
                283
            ],
            "__typename": [
                201
            ]
        },
        "UserMarketPosition_order_by": {
            "claimableRewardsFormatted": [
                283
            ],
            "claimableRewardsRaw": [
                283
            ],
            "db_write_timestamp": [
                283
            ],
            "id": [
                283
            ],
            "lastUpdatedAt": [
                283
            ],
            "lockedCollateralFormatted": [
                283
            ],
            "lockedCollateralRaw": [
                283
            ],
            "market_id": [
                283
            ],
            "netFTokenChangeFormatted": [
                283
            ],
            "netFTokenChangeRaw": [
                283
            ],
            "presaleDepositFormatted": [
                283
            ],
            "presaleDepositRaw": [
                283
            ],
            "presaleLeverage": [
                283
            ],
            "stakedAmountFormatted": [
                283
            ],
            "stakedAmountRaw": [
                283
            ],
            "totalDebtFormatted": [
                283
            ],
            "totalDebtRaw": [
                283
            ],
            "user_id": [
                283
            ],
            "__typename": [
                201
            ]
        },
        "UserMarketPosition_select_column": {},
        "UserMarketPosition_stddev_order_by": {
            "claimableRewardsRaw": [
                283
            ],
            "lastUpdatedAt": [
                283
            ],
            "lockedCollateralRaw": [
                283
            ],
            "netFTokenChangeRaw": [
                283
            ],
            "presaleDepositRaw": [
                283
            ],
            "presaleLeverage": [
                283
            ],
            "stakedAmountRaw": [
                283
            ],
            "totalDebtRaw": [
                283
            ],
            "__typename": [
                201
            ]
        },
        "UserMarketPosition_stddev_pop_order_by": {
            "claimableRewardsRaw": [
                283
            ],
            "lastUpdatedAt": [
                283
            ],
            "lockedCollateralRaw": [
                283
            ],
            "netFTokenChangeRaw": [
                283
            ],
            "presaleDepositRaw": [
                283
            ],
            "presaleLeverage": [
                283
            ],
            "stakedAmountRaw": [
                283
            ],
            "totalDebtRaw": [
                283
            ],
            "__typename": [
                201
            ]
        },
        "UserMarketPosition_stddev_samp_order_by": {
            "claimableRewardsRaw": [
                283
            ],
            "lastUpdatedAt": [
                283
            ],
            "lockedCollateralRaw": [
                283
            ],
            "netFTokenChangeRaw": [
                283
            ],
            "presaleDepositRaw": [
                283
            ],
            "presaleLeverage": [
                283
            ],
            "stakedAmountRaw": [
                283
            ],
            "totalDebtRaw": [
                283
            ],
            "__typename": [
                201
            ]
        },
        "UserMarketPosition_stream_cursor_input": {
            "initial_value": [
                239
            ],
            "ordering": [
                254
            ],
            "__typename": [
                201
            ]
        },
        "UserMarketPosition_stream_cursor_value_input": {
            "claimableRewardsFormatted": [
                201
            ],
            "claimableRewardsRaw": [
                280
            ],
            "db_write_timestamp": [
                300
            ],
            "id": [
                201
            ],
            "lastUpdatedAt": [
                280
            ],
            "lockedCollateralFormatted": [
                201
            ],
            "lockedCollateralRaw": [
                280
            ],
            "market_id": [
                201
            ],
            "netFTokenChangeFormatted": [
                201
            ],
            "netFTokenChangeRaw": [
                280
            ],
            "presaleDepositFormatted": [
                201
            ],
            "presaleDepositRaw": [
                280
            ],
            "presaleLeverage": [
                280
            ],
            "stakedAmountFormatted": [
                201
            ],
            "stakedAmountRaw": [
                280
            ],
            "totalDebtFormatted": [
                201
            ],
            "totalDebtRaw": [
                280
            ],
            "user_id": [
                201
            ],
            "__typename": [
                201
            ]
        },
        "UserMarketPosition_sum_order_by": {
            "claimableRewardsRaw": [
                283
            ],
            "lastUpdatedAt": [
                283
            ],
            "lockedCollateralRaw": [
                283
            ],
            "netFTokenChangeRaw": [
                283
            ],
            "presaleDepositRaw": [
                283
            ],
            "presaleLeverage": [
                283
            ],
            "stakedAmountRaw": [
                283
            ],
            "totalDebtRaw": [
                283
            ],
            "__typename": [
                201
            ]
        },
        "UserMarketPosition_var_pop_order_by": {
            "claimableRewardsRaw": [
                283
            ],
            "lastUpdatedAt": [
                283
            ],
            "lockedCollateralRaw": [
                283
            ],
            "netFTokenChangeRaw": [
                283
            ],
            "presaleDepositRaw": [
                283
            ],
            "presaleLeverage": [
                283
            ],
            "stakedAmountRaw": [
                283
            ],
            "totalDebtRaw": [
                283
            ],
            "__typename": [
                201
            ]
        },
        "UserMarketPosition_var_samp_order_by": {
            "claimableRewardsRaw": [
                283
            ],
            "lastUpdatedAt": [
                283
            ],
            "lockedCollateralRaw": [
                283
            ],
            "netFTokenChangeRaw": [
                283
            ],
            "presaleDepositRaw": [
                283
            ],
            "presaleLeverage": [
                283
            ],
            "stakedAmountRaw": [
                283
            ],
            "totalDebtRaw": [
                283
            ],
            "__typename": [
                201
            ]
        },
        "UserMarketPosition_variance_order_by": {
            "claimableRewardsRaw": [
                283
            ],
            "lastUpdatedAt": [
                283
            ],
            "lockedCollateralRaw": [
                283
            ],
            "netFTokenChangeRaw": [
                283
            ],
            "presaleDepositRaw": [
                283
            ],
            "presaleLeverage": [
                283
            ],
            "stakedAmountRaw": [
                283
            ],
            "totalDebtRaw": [
                283
            ],
            "__typename": [
                201
            ]
        },
        "candleperiod": {},
        "candleperiod_comparison_exp": {
            "_eq": [
                244
            ],
            "_gt": [
                244
            ],
            "_gte": [
                244
            ],
            "_in": [
                244
            ],
            "_is_null": [
                6
            ],
            "_lt": [
                244
            ],
            "_lte": [
                244
            ],
            "_neq": [
                244
            ],
            "_nin": [
                244
            ],
            "__typename": [
                201
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
                302
            ],
            "__typename": [
                201
            ]
        },
        "chain_metadata_bool_exp": {
            "_and": [
                247
            ],
            "_not": [
                247
            ],
            "_or": [
                247
            ],
            "block_height": [
                56
            ],
            "chain_id": [
                56
            ],
            "end_block": [
                56
            ],
            "first_event_block_number": [
                56
            ],
            "is_hyper_sync": [
                7
            ],
            "latest_fetched_block_number": [
                56
            ],
            "latest_processed_block": [
                56
            ],
            "num_batches_fetched": [
                56
            ],
            "num_events_processed": [
                56
            ],
            "start_block": [
                56
            ],
            "timestamp_caught_up_to_head_or_endblock": [
                303
            ],
            "__typename": [
                201
            ]
        },
        "chain_metadata_order_by": {
            "block_height": [
                283
            ],
            "chain_id": [
                283
            ],
            "end_block": [
                283
            ],
            "first_event_block_number": [
                283
            ],
            "is_hyper_sync": [
                283
            ],
            "latest_fetched_block_number": [
                283
            ],
            "latest_processed_block": [
                283
            ],
            "num_batches_fetched": [
                283
            ],
            "num_events_processed": [
                283
            ],
            "start_block": [
                283
            ],
            "timestamp_caught_up_to_head_or_endblock": [
                283
            ],
            "__typename": [
                201
            ]
        },
        "chain_metadata_select_column": {},
        "chain_metadata_stream_cursor_input": {
            "initial_value": [
                251
            ],
            "ordering": [
                254
            ],
            "__typename": [
                201
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
                302
            ],
            "__typename": [
                201
            ]
        },
        "contract_type": {},
        "contract_type_comparison_exp": {
            "_eq": [
                252
            ],
            "_gt": [
                252
            ],
            "_gte": [
                252
            ],
            "_in": [
                252
            ],
            "_is_null": [
                6
            ],
            "_lt": [
                252
            ],
            "_lte": [
                252
            ],
            "_neq": [
                252
            ],
            "_nin": [
                252
            ],
            "__typename": [
                201
            ]
        },
        "cursor_ordering": {},
        "dynamic_contract_registry": {
            "chain_id": [
                54
            ],
            "contract_address": [
                201
            ],
            "contract_type": [
                252
            ],
            "id": [
                201
            ],
            "registering_event_block_number": [
                54
            ],
            "registering_event_block_timestamp": [
                54
            ],
            "registering_event_contract_name": [
                201
            ],
            "registering_event_log_index": [
                54
            ],
            "registering_event_name": [
                201
            ],
            "registering_event_src_address": [
                201
            ],
            "__typename": [
                201
            ]
        },
        "dynamic_contract_registry_bool_exp": {
            "_and": [
                256
            ],
            "_not": [
                256
            ],
            "_or": [
                256
            ],
            "chain_id": [
                56
            ],
            "contract_address": [
                203
            ],
            "contract_type": [
                253
            ],
            "id": [
                203
            ],
            "registering_event_block_number": [
                56
            ],
            "registering_event_block_timestamp": [
                56
            ],
            "registering_event_contract_name": [
                203
            ],
            "registering_event_log_index": [
                56
            ],
            "registering_event_name": [
                203
            ],
            "registering_event_src_address": [
                203
            ],
            "__typename": [
                201
            ]
        },
        "dynamic_contract_registry_order_by": {
            "chain_id": [
                283
            ],
            "contract_address": [
                283
            ],
            "contract_type": [
                283
            ],
            "id": [
                283
            ],
            "registering_event_block_number": [
                283
            ],
            "registering_event_block_timestamp": [
                283
            ],
            "registering_event_contract_name": [
                283
            ],
            "registering_event_log_index": [
                283
            ],
            "registering_event_name": [
                283
            ],
            "registering_event_src_address": [
                283
            ],
            "__typename": [
                201
            ]
        },
        "dynamic_contract_registry_select_column": {},
        "dynamic_contract_registry_stream_cursor_input": {
            "initial_value": [
                260
            ],
            "ordering": [
                254
            ],
            "__typename": [
                201
            ]
        },
        "dynamic_contract_registry_stream_cursor_value_input": {
            "chain_id": [
                54
            ],
            "contract_address": [
                201
            ],
            "contract_type": [
                252
            ],
            "id": [
                201
            ],
            "registering_event_block_number": [
                54
            ],
            "registering_event_block_timestamp": [
                54
            ],
            "registering_event_contract_name": [
                201
            ],
            "registering_event_log_index": [
                54
            ],
            "registering_event_name": [
                201
            ],
            "registering_event_src_address": [
                201
            ],
            "__typename": [
                201
            ]
        },
        "end_of_block_range_scanned_data": {
            "block_hash": [
                201
            ],
            "block_number": [
                54
            ],
            "chain_id": [
                54
            ],
            "__typename": [
                201
            ]
        },
        "end_of_block_range_scanned_data_bool_exp": {
            "_and": [
                262
            ],
            "_not": [
                262
            ],
            "_or": [
                262
            ],
            "block_hash": [
                203
            ],
            "block_number": [
                56
            ],
            "chain_id": [
                56
            ],
            "__typename": [
                201
            ]
        },
        "end_of_block_range_scanned_data_order_by": {
            "block_hash": [
                283
            ],
            "block_number": [
                283
            ],
            "chain_id": [
                283
            ],
            "__typename": [
                201
            ]
        },
        "end_of_block_range_scanned_data_select_column": {},
        "end_of_block_range_scanned_data_stream_cursor_input": {
            "initial_value": [
                266
            ],
            "ordering": [
                254
            ],
            "__typename": [
                201
            ]
        },
        "end_of_block_range_scanned_data_stream_cursor_value_input": {
            "block_hash": [
                201
            ],
            "block_number": [
                54
            ],
            "chain_id": [
                54
            ],
            "__typename": [
                201
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
                201
            ]
        },
        "event_sync_state_bool_exp": {
            "_and": [
                268
            ],
            "_not": [
                268
            ],
            "_or": [
                268
            ],
            "block_number": [
                56
            ],
            "block_timestamp": [
                56
            ],
            "chain_id": [
                56
            ],
            "is_pre_registering_dynamic_contracts": [
                7
            ],
            "log_index": [
                56
            ],
            "__typename": [
                201
            ]
        },
        "event_sync_state_order_by": {
            "block_number": [
                283
            ],
            "block_timestamp": [
                283
            ],
            "chain_id": [
                283
            ],
            "is_pre_registering_dynamic_contracts": [
                283
            ],
            "log_index": [
                283
            ],
            "__typename": [
                201
            ]
        },
        "event_sync_state_select_column": {},
        "event_sync_state_stream_cursor_input": {
            "initial_value": [
                272
            ],
            "ordering": [
                254
            ],
            "__typename": [
                201
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
                201
            ]
        },
        "jsonb": {},
        "jsonb_cast_exp": {
            "String": [
                203
            ],
            "__typename": [
                201
            ]
        },
        "jsonb_comparison_exp": {
            "_cast": [
                274
            ],
            "_contained_in": [
                273
            ],
            "_contains": [
                273
            ],
            "_eq": [
                273
            ],
            "_gt": [
                273
            ],
            "_gte": [
                273
            ],
            "_has_key": [
                201
            ],
            "_has_keys_all": [
                201
            ],
            "_has_keys_any": [
                201
            ],
            "_in": [
                273
            ],
            "_is_null": [
                6
            ],
            "_lt": [
                273
            ],
            "_lte": [
                273
            ],
            "_neq": [
                273
            ],
            "_nin": [
                273
            ],
            "__typename": [
                201
            ]
        },
        "loanstatus": {},
        "loanstatus_comparison_exp": {
            "_eq": [
                276
            ],
            "_gt": [
                276
            ],
            "_gte": [
                276
            ],
            "_in": [
                276
            ],
            "_is_null": [
                6
            ],
            "_lt": [
                276
            ],
            "_lte": [
                276
            ],
            "_neq": [
                276
            ],
            "_nin": [
                276
            ],
            "__typename": [
                201
            ]
        },
        "marketstatus": {},
        "marketstatus_comparison_exp": {
            "_eq": [
                278
            ],
            "_gt": [
                278
            ],
            "_gte": [
                278
            ],
            "_in": [
                278
            ],
            "_is_null": [
                6
            ],
            "_lt": [
                278
            ],
            "_lte": [
                278
            ],
            "_neq": [
                278
            ],
            "_nin": [
                278
            ],
            "__typename": [
                201
            ]
        },
        "numeric": {},
        "numeric_array_comparison_exp": {
            "_contained_in": [
                280
            ],
            "_contains": [
                280
            ],
            "_eq": [
                280
            ],
            "_gt": [
                280
            ],
            "_gte": [
                280
            ],
            "_in": [
                280
            ],
            "_is_null": [
                6
            ],
            "_lt": [
                280
            ],
            "_lte": [
                280
            ],
            "_neq": [
                280
            ],
            "_nin": [
                280
            ],
            "__typename": [
                201
            ]
        },
        "numeric_comparison_exp": {
            "_eq": [
                280
            ],
            "_gt": [
                280
            ],
            "_gte": [
                280
            ],
            "_in": [
                280
            ],
            "_is_null": [
                6
            ],
            "_lt": [
                280
            ],
            "_lte": [
                280
            ],
            "_neq": [
                280
            ],
            "_nin": [
                280
            ],
            "__typename": [
                201
            ]
        },
        "order_by": {},
        "persisted_state": {
            "abi_files_hash": [
                201
            ],
            "config_hash": [
                201
            ],
            "envio_version": [
                201
            ],
            "handler_files_hash": [
                201
            ],
            "id": [
                54
            ],
            "schema_hash": [
                201
            ],
            "__typename": [
                201
            ]
        },
        "persisted_state_bool_exp": {
            "_and": [
                285
            ],
            "_not": [
                285
            ],
            "_or": [
                285
            ],
            "abi_files_hash": [
                203
            ],
            "config_hash": [
                203
            ],
            "envio_version": [
                203
            ],
            "handler_files_hash": [
                203
            ],
            "id": [
                56
            ],
            "schema_hash": [
                203
            ],
            "__typename": [
                201
            ]
        },
        "persisted_state_order_by": {
            "abi_files_hash": [
                283
            ],
            "config_hash": [
                283
            ],
            "envio_version": [
                283
            ],
            "handler_files_hash": [
                283
            ],
            "id": [
                283
            ],
            "schema_hash": [
                283
            ],
            "__typename": [
                201
            ]
        },
        "persisted_state_select_column": {},
        "persisted_state_stream_cursor_input": {
            "initial_value": [
                289
            ],
            "ordering": [
                254
            ],
            "__typename": [
                201
            ]
        },
        "persisted_state_stream_cursor_value_input": {
            "abi_files_hash": [
                201
            ],
            "config_hash": [
                201
            ],
            "envio_version": [
                201
            ],
            "handler_files_hash": [
                201
            ],
            "id": [
                54
            ],
            "schema_hash": [
                201
            ],
            "__typename": [
                201
            ]
        },
        "presaleclaimtype": {},
        "presaleclaimtype_comparison_exp": {
            "_eq": [
                290
            ],
            "_gt": [
                290
            ],
            "_gte": [
                290
            ],
            "_in": [
                290
            ],
            "_is_null": [
                6
            ],
            "_lt": [
                290
            ],
            "_lte": [
                290
            ],
            "_neq": [
                290
            ],
            "_nin": [
                290
            ],
            "__typename": [
                201
            ]
        },
        "raw_events": {
            "block_fields": [
                273,
                {
                    "path": [
                        201
                    ]
                }
            ],
            "block_hash": [
                201
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
                201
            ],
            "db_write_timestamp": [
                300
            ],
            "event_id": [
                280
            ],
            "event_name": [
                201
            ],
            "log_index": [
                54
            ],
            "params": [
                273,
                {
                    "path": [
                        201
                    ]
                }
            ],
            "serial": [
                54
            ],
            "src_address": [
                201
            ],
            "transaction_fields": [
                273,
                {
                    "path": [
                        201
                    ]
                }
            ],
            "__typename": [
                201
            ]
        },
        "raw_events_bool_exp": {
            "_and": [
                293
            ],
            "_not": [
                293
            ],
            "_or": [
                293
            ],
            "block_fields": [
                275
            ],
            "block_hash": [
                203
            ],
            "block_number": [
                56
            ],
            "block_timestamp": [
                56
            ],
            "chain_id": [
                56
            ],
            "contract_name": [
                203
            ],
            "db_write_timestamp": [
                301
            ],
            "event_id": [
                282
            ],
            "event_name": [
                203
            ],
            "log_index": [
                56
            ],
            "params": [
                275
            ],
            "serial": [
                56
            ],
            "src_address": [
                203
            ],
            "transaction_fields": [
                275
            ],
            "__typename": [
                201
            ]
        },
        "raw_events_order_by": {
            "block_fields": [
                283
            ],
            "block_hash": [
                283
            ],
            "block_number": [
                283
            ],
            "block_timestamp": [
                283
            ],
            "chain_id": [
                283
            ],
            "contract_name": [
                283
            ],
            "db_write_timestamp": [
                283
            ],
            "event_id": [
                283
            ],
            "event_name": [
                283
            ],
            "log_index": [
                283
            ],
            "params": [
                283
            ],
            "serial": [
                283
            ],
            "src_address": [
                283
            ],
            "transaction_fields": [
                283
            ],
            "__typename": [
                201
            ]
        },
        "raw_events_select_column": {},
        "raw_events_stream_cursor_input": {
            "initial_value": [
                297
            ],
            "ordering": [
                254
            ],
            "__typename": [
                201
            ]
        },
        "raw_events_stream_cursor_value_input": {
            "block_fields": [
                273
            ],
            "block_hash": [
                201
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
                201
            ],
            "db_write_timestamp": [
                300
            ],
            "event_id": [
                280
            ],
            "event_name": [
                201
            ],
            "log_index": [
                54
            ],
            "params": [
                273
            ],
            "serial": [
                54
            ],
            "src_address": [
                201
            ],
            "transaction_fields": [
                273
            ],
            "__typename": [
                201
            ]
        },
        "stakestatus": {},
        "stakestatus_comparison_exp": {
            "_eq": [
                298
            ],
            "_gt": [
                298
            ],
            "_gte": [
                298
            ],
            "_in": [
                298
            ],
            "_is_null": [
                6
            ],
            "_lt": [
                298
            ],
            "_lte": [
                298
            ],
            "_neq": [
                298
            ],
            "_nin": [
                298
            ],
            "__typename": [
                201
            ]
        },
        "timestamp": {},
        "timestamp_comparison_exp": {
            "_eq": [
                300
            ],
            "_gt": [
                300
            ],
            "_gte": [
                300
            ],
            "_in": [
                300
            ],
            "_is_null": [
                6
            ],
            "_lt": [
                300
            ],
            "_lte": [
                300
            ],
            "_neq": [
                300
            ],
            "_nin": [
                300
            ],
            "__typename": [
                201
            ]
        },
        "timestamptz": {},
        "timestamptz_comparison_exp": {
            "_eq": [
                302
            ],
            "_gt": [
                302
            ],
            "_gte": [
                302
            ],
            "_in": [
                302
            ],
            "_is_null": [
                6
            ],
            "_lt": [
                302
            ],
            "_lte": [
                302
            ],
            "_neq": [
                302
            ],
            "_nin": [
                302
            ],
            "__typename": [
                201
            ]
        },
        "tradetype": {},
        "tradetype_comparison_exp": {
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
                201
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
                        201,
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
                        201,
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
                        201,
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
                        201,
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
                        201,
                        "String!"
                    ]
                }
            ],
            "Loan": [
                57,
                {
                    "distinct_on": [
                        81,
                        "[Loan_select_column!]"
                    ],
                    "limit": [
                        54
                    ],
                    "offset": [
                        54
                    ],
                    "order_by": [
                        80,
                        "[Loan_order_by!]"
                    ],
                    "where": [
                        77
                    ]
                }
            ],
            "LoanStatusHistory": [
                58,
                {
                    "distinct_on": [
                        65,
                        "[LoanStatusHistory_select_column!]"
                    ],
                    "limit": [
                        54
                    ],
                    "offset": [
                        54
                    ],
                    "order_by": [
                        64,
                        "[LoanStatusHistory_order_by!]"
                    ],
                    "where": [
                        61
                    ]
                }
            ],
            "LoanStatusHistory_by_pk": [
                58,
                {
                    "id": [
                        201,
                        "String!"
                    ]
                }
            ],
            "Loan_by_pk": [
                57,
                {
                    "id": [
                        201,
                        "String!"
                    ]
                }
            ],
            "Market": [
                91,
                {
                    "distinct_on": [
                        110,
                        "[Market_select_column!]"
                    ],
                    "limit": [
                        54
                    ],
                    "offset": [
                        54
                    ],
                    "order_by": [
                        109,
                        "[Market_order_by!]"
                    ],
                    "where": [
                        106
                    ]
                }
            ],
            "MarketRollingStats": [
                92,
                {
                    "distinct_on": [
                        95,
                        "[MarketRollingStats_select_column!]"
                    ],
                    "limit": [
                        54
                    ],
                    "offset": [
                        54
                    ],
                    "order_by": [
                        94,
                        "[MarketRollingStats_order_by!]"
                    ],
                    "where": [
                        93
                    ]
                }
            ],
            "MarketRollingStats_by_pk": [
                92,
                {
                    "id": [
                        201,
                        "String!"
                    ]
                }
            ],
            "MarketSnapshot": [
                98,
                {
                    "distinct_on": [
                        101,
                        "[MarketSnapshot_select_column!]"
                    ],
                    "limit": [
                        54
                    ],
                    "offset": [
                        54
                    ],
                    "order_by": [
                        100,
                        "[MarketSnapshot_order_by!]"
                    ],
                    "where": [
                        99
                    ]
                }
            ],
            "MarketSnapshot_by_pk": [
                98,
                {
                    "id": [
                        201,
                        "String!"
                    ]
                }
            ],
            "Market_by_pk": [
                91,
                {
                    "id": [
                        201,
                        "String!"
                    ]
                }
            ],
            "ModuleAddress": [
                120,
                {
                    "distinct_on": [
                        123,
                        "[ModuleAddress_select_column!]"
                    ],
                    "limit": [
                        54
                    ],
                    "offset": [
                        54
                    ],
                    "order_by": [
                        122,
                        "[ModuleAddress_order_by!]"
                    ],
                    "where": [
                        121
                    ]
                }
            ],
            "ModuleAddress_by_pk": [
                120,
                {
                    "id": [
                        201,
                        "String!"
                    ]
                }
            ],
            "ModuleRegistry": [
                126,
                {
                    "distinct_on": [
                        129,
                        "[ModuleRegistry_select_column!]"
                    ],
                    "limit": [
                        54
                    ],
                    "offset": [
                        54
                    ],
                    "order_by": [
                        128,
                        "[ModuleRegistry_order_by!]"
                    ],
                    "where": [
                        127
                    ]
                }
            ],
            "ModuleRegistry_by_pk": [
                126,
                {
                    "id": [
                        201,
                        "String!"
                    ]
                }
            ],
            "PreSaleContract": [
                132,
                {
                    "distinct_on": [
                        135,
                        "[PreSaleContract_select_column!]"
                    ],
                    "limit": [
                        54
                    ],
                    "offset": [
                        54
                    ],
                    "order_by": [
                        134,
                        "[PreSaleContract_order_by!]"
                    ],
                    "where": [
                        133
                    ]
                }
            ],
            "PreSaleContract_by_pk": [
                132,
                {
                    "id": [
                        201,
                        "String!"
                    ]
                }
            ],
            "PresaleClaim": [
                138,
                {
                    "distinct_on": [
                        145,
                        "[PresaleClaim_select_column!]"
                    ],
                    "limit": [
                        54
                    ],
                    "offset": [
                        54
                    ],
                    "order_by": [
                        144,
                        "[PresaleClaim_order_by!]"
                    ],
                    "where": [
                        141
                    ]
                }
            ],
            "PresaleClaim_by_pk": [
                138,
                {
                    "id": [
                        201,
                        "String!"
                    ]
                }
            ],
            "PresaleParticipation": [
                155,
                {
                    "distinct_on": [
                        162,
                        "[PresaleParticipation_select_column!]"
                    ],
                    "limit": [
                        54
                    ],
                    "offset": [
                        54
                    ],
                    "order_by": [
                        161,
                        "[PresaleParticipation_order_by!]"
                    ],
                    "where": [
                        158
                    ]
                }
            ],
            "PresaleParticipation_by_pk": [
                155,
                {
                    "id": [
                        201,
                        "String!"
                    ]
                }
            ],
            "PriceCandle": [
                172,
                {
                    "distinct_on": [
                        175,
                        "[PriceCandle_select_column!]"
                    ],
                    "limit": [
                        54
                    ],
                    "offset": [
                        54
                    ],
                    "order_by": [
                        174,
                        "[PriceCandle_order_by!]"
                    ],
                    "where": [
                        173
                    ]
                }
            ],
            "PriceCandle_by_pk": [
                172,
                {
                    "id": [
                        201,
                        "String!"
                    ]
                }
            ],
            "Stake": [
                178,
                {
                    "distinct_on": [
                        185,
                        "[Stake_select_column!]"
                    ],
                    "limit": [
                        54
                    ],
                    "offset": [
                        54
                    ],
                    "order_by": [
                        184,
                        "[Stake_order_by!]"
                    ],
                    "where": [
                        181
                    ]
                }
            ],
            "Stake_by_pk": [
                178,
                {
                    "id": [
                        201,
                        "String!"
                    ]
                }
            ],
            "StakingContract": [
                195,
                {
                    "distinct_on": [
                        198,
                        "[StakingContract_select_column!]"
                    ],
                    "limit": [
                        54
                    ],
                    "offset": [
                        54
                    ],
                    "order_by": [
                        197,
                        "[StakingContract_order_by!]"
                    ],
                    "where": [
                        196
                    ]
                }
            ],
            "StakingContract_by_pk": [
                195,
                {
                    "id": [
                        201,
                        "String!"
                    ]
                }
            ],
            "Token": [
                204,
                {
                    "distinct_on": [
                        207,
                        "[Token_select_column!]"
                    ],
                    "limit": [
                        54
                    ],
                    "offset": [
                        54
                    ],
                    "order_by": [
                        206,
                        "[Token_order_by!]"
                    ],
                    "where": [
                        205
                    ]
                }
            ],
            "Token_by_pk": [
                204,
                {
                    "id": [
                        201,
                        "String!"
                    ]
                }
            ],
            "Trade": [
                210,
                {
                    "distinct_on": [
                        217,
                        "[Trade_select_column!]"
                    ],
                    "limit": [
                        54
                    ],
                    "offset": [
                        54
                    ],
                    "order_by": [
                        216,
                        "[Trade_order_by!]"
                    ],
                    "where": [
                        213
                    ]
                }
            ],
            "Trade_by_pk": [
                210,
                {
                    "id": [
                        201,
                        "String!"
                    ]
                }
            ],
            "UserMarketPosition": [
                227,
                {
                    "distinct_on": [
                        234,
                        "[UserMarketPosition_select_column!]"
                    ],
                    "limit": [
                        54
                    ],
                    "offset": [
                        54
                    ],
                    "order_by": [
                        233,
                        "[UserMarketPosition_order_by!]"
                    ],
                    "where": [
                        230
                    ]
                }
            ],
            "UserMarketPosition_by_pk": [
                227,
                {
                    "id": [
                        201,
                        "String!"
                    ]
                }
            ],
            "chain_metadata": [
                246,
                {
                    "distinct_on": [
                        249,
                        "[chain_metadata_select_column!]"
                    ],
                    "limit": [
                        54
                    ],
                    "offset": [
                        54
                    ],
                    "order_by": [
                        248,
                        "[chain_metadata_order_by!]"
                    ],
                    "where": [
                        247
                    ]
                }
            ],
            "chain_metadata_by_pk": [
                246,
                {
                    "chain_id": [
                        54,
                        "Int!"
                    ]
                }
            ],
            "dynamic_contract_registry": [
                255,
                {
                    "distinct_on": [
                        258,
                        "[dynamic_contract_registry_select_column!]"
                    ],
                    "limit": [
                        54
                    ],
                    "offset": [
                        54
                    ],
                    "order_by": [
                        257,
                        "[dynamic_contract_registry_order_by!]"
                    ],
                    "where": [
                        256
                    ]
                }
            ],
            "dynamic_contract_registry_by_pk": [
                255,
                {
                    "id": [
                        201,
                        "String!"
                    ]
                }
            ],
            "end_of_block_range_scanned_data": [
                261,
                {
                    "distinct_on": [
                        264,
                        "[end_of_block_range_scanned_data_select_column!]"
                    ],
                    "limit": [
                        54
                    ],
                    "offset": [
                        54
                    ],
                    "order_by": [
                        263,
                        "[end_of_block_range_scanned_data_order_by!]"
                    ],
                    "where": [
                        262
                    ]
                }
            ],
            "end_of_block_range_scanned_data_by_pk": [
                261,
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
                267,
                {
                    "distinct_on": [
                        270,
                        "[event_sync_state_select_column!]"
                    ],
                    "limit": [
                        54
                    ],
                    "offset": [
                        54
                    ],
                    "order_by": [
                        269,
                        "[event_sync_state_order_by!]"
                    ],
                    "where": [
                        268
                    ]
                }
            ],
            "event_sync_state_by_pk": [
                267,
                {
                    "chain_id": [
                        54,
                        "Int!"
                    ]
                }
            ],
            "persisted_state": [
                284,
                {
                    "distinct_on": [
                        287,
                        "[persisted_state_select_column!]"
                    ],
                    "limit": [
                        54
                    ],
                    "offset": [
                        54
                    ],
                    "order_by": [
                        286,
                        "[persisted_state_order_by!]"
                    ],
                    "where": [
                        285
                    ]
                }
            ],
            "persisted_state_by_pk": [
                284,
                {
                    "id": [
                        54,
                        "Int!"
                    ]
                }
            ],
            "raw_events": [
                292,
                {
                    "distinct_on": [
                        295,
                        "[raw_events_select_column!]"
                    ],
                    "limit": [
                        54
                    ],
                    "offset": [
                        54
                    ],
                    "order_by": [
                        294,
                        "[raw_events_order_by!]"
                    ],
                    "where": [
                        293
                    ]
                }
            ],
            "raw_events_by_pk": [
                292,
                {
                    "serial": [
                        54,
                        "Int!"
                    ]
                }
            ],
            "__typename": [
                201
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
                        201,
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
                        201,
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
                        201,
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
                        201,
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
                        201,
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
                57,
                {
                    "distinct_on": [
                        81,
                        "[Loan_select_column!]"
                    ],
                    "limit": [
                        54
                    ],
                    "offset": [
                        54
                    ],
                    "order_by": [
                        80,
                        "[Loan_order_by!]"
                    ],
                    "where": [
                        77
                    ]
                }
            ],
            "LoanStatusHistory": [
                58,
                {
                    "distinct_on": [
                        65,
                        "[LoanStatusHistory_select_column!]"
                    ],
                    "limit": [
                        54
                    ],
                    "offset": [
                        54
                    ],
                    "order_by": [
                        64,
                        "[LoanStatusHistory_order_by!]"
                    ],
                    "where": [
                        61
                    ]
                }
            ],
            "LoanStatusHistory_by_pk": [
                58,
                {
                    "id": [
                        201,
                        "String!"
                    ]
                }
            ],
            "LoanStatusHistory_stream": [
                58,
                {
                    "batch_size": [
                        54,
                        "Int!"
                    ],
                    "cursor": [
                        69,
                        "[LoanStatusHistory_stream_cursor_input]!"
                    ],
                    "where": [
                        61
                    ]
                }
            ],
            "Loan_by_pk": [
                57,
                {
                    "id": [
                        201,
                        "String!"
                    ]
                }
            ],
            "Loan_stream": [
                57,
                {
                    "batch_size": [
                        54,
                        "Int!"
                    ],
                    "cursor": [
                        85,
                        "[Loan_stream_cursor_input]!"
                    ],
                    "where": [
                        77
                    ]
                }
            ],
            "Market": [
                91,
                {
                    "distinct_on": [
                        110,
                        "[Market_select_column!]"
                    ],
                    "limit": [
                        54
                    ],
                    "offset": [
                        54
                    ],
                    "order_by": [
                        109,
                        "[Market_order_by!]"
                    ],
                    "where": [
                        106
                    ]
                }
            ],
            "MarketRollingStats": [
                92,
                {
                    "distinct_on": [
                        95,
                        "[MarketRollingStats_select_column!]"
                    ],
                    "limit": [
                        54
                    ],
                    "offset": [
                        54
                    ],
                    "order_by": [
                        94,
                        "[MarketRollingStats_order_by!]"
                    ],
                    "where": [
                        93
                    ]
                }
            ],
            "MarketRollingStats_by_pk": [
                92,
                {
                    "id": [
                        201,
                        "String!"
                    ]
                }
            ],
            "MarketRollingStats_stream": [
                92,
                {
                    "batch_size": [
                        54,
                        "Int!"
                    ],
                    "cursor": [
                        96,
                        "[MarketRollingStats_stream_cursor_input]!"
                    ],
                    "where": [
                        93
                    ]
                }
            ],
            "MarketSnapshot": [
                98,
                {
                    "distinct_on": [
                        101,
                        "[MarketSnapshot_select_column!]"
                    ],
                    "limit": [
                        54
                    ],
                    "offset": [
                        54
                    ],
                    "order_by": [
                        100,
                        "[MarketSnapshot_order_by!]"
                    ],
                    "where": [
                        99
                    ]
                }
            ],
            "MarketSnapshot_by_pk": [
                98,
                {
                    "id": [
                        201,
                        "String!"
                    ]
                }
            ],
            "MarketSnapshot_stream": [
                98,
                {
                    "batch_size": [
                        54,
                        "Int!"
                    ],
                    "cursor": [
                        102,
                        "[MarketSnapshot_stream_cursor_input]!"
                    ],
                    "where": [
                        99
                    ]
                }
            ],
            "Market_by_pk": [
                91,
                {
                    "id": [
                        201,
                        "String!"
                    ]
                }
            ],
            "Market_stream": [
                91,
                {
                    "batch_size": [
                        54,
                        "Int!"
                    ],
                    "cursor": [
                        114,
                        "[Market_stream_cursor_input]!"
                    ],
                    "where": [
                        106
                    ]
                }
            ],
            "ModuleAddress": [
                120,
                {
                    "distinct_on": [
                        123,
                        "[ModuleAddress_select_column!]"
                    ],
                    "limit": [
                        54
                    ],
                    "offset": [
                        54
                    ],
                    "order_by": [
                        122,
                        "[ModuleAddress_order_by!]"
                    ],
                    "where": [
                        121
                    ]
                }
            ],
            "ModuleAddress_by_pk": [
                120,
                {
                    "id": [
                        201,
                        "String!"
                    ]
                }
            ],
            "ModuleAddress_stream": [
                120,
                {
                    "batch_size": [
                        54,
                        "Int!"
                    ],
                    "cursor": [
                        124,
                        "[ModuleAddress_stream_cursor_input]!"
                    ],
                    "where": [
                        121
                    ]
                }
            ],
            "ModuleRegistry": [
                126,
                {
                    "distinct_on": [
                        129,
                        "[ModuleRegistry_select_column!]"
                    ],
                    "limit": [
                        54
                    ],
                    "offset": [
                        54
                    ],
                    "order_by": [
                        128,
                        "[ModuleRegistry_order_by!]"
                    ],
                    "where": [
                        127
                    ]
                }
            ],
            "ModuleRegistry_by_pk": [
                126,
                {
                    "id": [
                        201,
                        "String!"
                    ]
                }
            ],
            "ModuleRegistry_stream": [
                126,
                {
                    "batch_size": [
                        54,
                        "Int!"
                    ],
                    "cursor": [
                        130,
                        "[ModuleRegistry_stream_cursor_input]!"
                    ],
                    "where": [
                        127
                    ]
                }
            ],
            "PreSaleContract": [
                132,
                {
                    "distinct_on": [
                        135,
                        "[PreSaleContract_select_column!]"
                    ],
                    "limit": [
                        54
                    ],
                    "offset": [
                        54
                    ],
                    "order_by": [
                        134,
                        "[PreSaleContract_order_by!]"
                    ],
                    "where": [
                        133
                    ]
                }
            ],
            "PreSaleContract_by_pk": [
                132,
                {
                    "id": [
                        201,
                        "String!"
                    ]
                }
            ],
            "PreSaleContract_stream": [
                132,
                {
                    "batch_size": [
                        54,
                        "Int!"
                    ],
                    "cursor": [
                        136,
                        "[PreSaleContract_stream_cursor_input]!"
                    ],
                    "where": [
                        133
                    ]
                }
            ],
            "PresaleClaim": [
                138,
                {
                    "distinct_on": [
                        145,
                        "[PresaleClaim_select_column!]"
                    ],
                    "limit": [
                        54
                    ],
                    "offset": [
                        54
                    ],
                    "order_by": [
                        144,
                        "[PresaleClaim_order_by!]"
                    ],
                    "where": [
                        141
                    ]
                }
            ],
            "PresaleClaim_by_pk": [
                138,
                {
                    "id": [
                        201,
                        "String!"
                    ]
                }
            ],
            "PresaleClaim_stream": [
                138,
                {
                    "batch_size": [
                        54,
                        "Int!"
                    ],
                    "cursor": [
                        149,
                        "[PresaleClaim_stream_cursor_input]!"
                    ],
                    "where": [
                        141
                    ]
                }
            ],
            "PresaleParticipation": [
                155,
                {
                    "distinct_on": [
                        162,
                        "[PresaleParticipation_select_column!]"
                    ],
                    "limit": [
                        54
                    ],
                    "offset": [
                        54
                    ],
                    "order_by": [
                        161,
                        "[PresaleParticipation_order_by!]"
                    ],
                    "where": [
                        158
                    ]
                }
            ],
            "PresaleParticipation_by_pk": [
                155,
                {
                    "id": [
                        201,
                        "String!"
                    ]
                }
            ],
            "PresaleParticipation_stream": [
                155,
                {
                    "batch_size": [
                        54,
                        "Int!"
                    ],
                    "cursor": [
                        166,
                        "[PresaleParticipation_stream_cursor_input]!"
                    ],
                    "where": [
                        158
                    ]
                }
            ],
            "PriceCandle": [
                172,
                {
                    "distinct_on": [
                        175,
                        "[PriceCandle_select_column!]"
                    ],
                    "limit": [
                        54
                    ],
                    "offset": [
                        54
                    ],
                    "order_by": [
                        174,
                        "[PriceCandle_order_by!]"
                    ],
                    "where": [
                        173
                    ]
                }
            ],
            "PriceCandle_by_pk": [
                172,
                {
                    "id": [
                        201,
                        "String!"
                    ]
                }
            ],
            "PriceCandle_stream": [
                172,
                {
                    "batch_size": [
                        54,
                        "Int!"
                    ],
                    "cursor": [
                        176,
                        "[PriceCandle_stream_cursor_input]!"
                    ],
                    "where": [
                        173
                    ]
                }
            ],
            "Stake": [
                178,
                {
                    "distinct_on": [
                        185,
                        "[Stake_select_column!]"
                    ],
                    "limit": [
                        54
                    ],
                    "offset": [
                        54
                    ],
                    "order_by": [
                        184,
                        "[Stake_order_by!]"
                    ],
                    "where": [
                        181
                    ]
                }
            ],
            "Stake_by_pk": [
                178,
                {
                    "id": [
                        201,
                        "String!"
                    ]
                }
            ],
            "Stake_stream": [
                178,
                {
                    "batch_size": [
                        54,
                        "Int!"
                    ],
                    "cursor": [
                        189,
                        "[Stake_stream_cursor_input]!"
                    ],
                    "where": [
                        181
                    ]
                }
            ],
            "StakingContract": [
                195,
                {
                    "distinct_on": [
                        198,
                        "[StakingContract_select_column!]"
                    ],
                    "limit": [
                        54
                    ],
                    "offset": [
                        54
                    ],
                    "order_by": [
                        197,
                        "[StakingContract_order_by!]"
                    ],
                    "where": [
                        196
                    ]
                }
            ],
            "StakingContract_by_pk": [
                195,
                {
                    "id": [
                        201,
                        "String!"
                    ]
                }
            ],
            "StakingContract_stream": [
                195,
                {
                    "batch_size": [
                        54,
                        "Int!"
                    ],
                    "cursor": [
                        199,
                        "[StakingContract_stream_cursor_input]!"
                    ],
                    "where": [
                        196
                    ]
                }
            ],
            "Token": [
                204,
                {
                    "distinct_on": [
                        207,
                        "[Token_select_column!]"
                    ],
                    "limit": [
                        54
                    ],
                    "offset": [
                        54
                    ],
                    "order_by": [
                        206,
                        "[Token_order_by!]"
                    ],
                    "where": [
                        205
                    ]
                }
            ],
            "Token_by_pk": [
                204,
                {
                    "id": [
                        201,
                        "String!"
                    ]
                }
            ],
            "Token_stream": [
                204,
                {
                    "batch_size": [
                        54,
                        "Int!"
                    ],
                    "cursor": [
                        208,
                        "[Token_stream_cursor_input]!"
                    ],
                    "where": [
                        205
                    ]
                }
            ],
            "Trade": [
                210,
                {
                    "distinct_on": [
                        217,
                        "[Trade_select_column!]"
                    ],
                    "limit": [
                        54
                    ],
                    "offset": [
                        54
                    ],
                    "order_by": [
                        216,
                        "[Trade_order_by!]"
                    ],
                    "where": [
                        213
                    ]
                }
            ],
            "Trade_by_pk": [
                210,
                {
                    "id": [
                        201,
                        "String!"
                    ]
                }
            ],
            "Trade_stream": [
                210,
                {
                    "batch_size": [
                        54,
                        "Int!"
                    ],
                    "cursor": [
                        221,
                        "[Trade_stream_cursor_input]!"
                    ],
                    "where": [
                        213
                    ]
                }
            ],
            "UserMarketPosition": [
                227,
                {
                    "distinct_on": [
                        234,
                        "[UserMarketPosition_select_column!]"
                    ],
                    "limit": [
                        54
                    ],
                    "offset": [
                        54
                    ],
                    "order_by": [
                        233,
                        "[UserMarketPosition_order_by!]"
                    ],
                    "where": [
                        230
                    ]
                }
            ],
            "UserMarketPosition_by_pk": [
                227,
                {
                    "id": [
                        201,
                        "String!"
                    ]
                }
            ],
            "UserMarketPosition_stream": [
                227,
                {
                    "batch_size": [
                        54,
                        "Int!"
                    ],
                    "cursor": [
                        238,
                        "[UserMarketPosition_stream_cursor_input]!"
                    ],
                    "where": [
                        230
                    ]
                }
            ],
            "chain_metadata": [
                246,
                {
                    "distinct_on": [
                        249,
                        "[chain_metadata_select_column!]"
                    ],
                    "limit": [
                        54
                    ],
                    "offset": [
                        54
                    ],
                    "order_by": [
                        248,
                        "[chain_metadata_order_by!]"
                    ],
                    "where": [
                        247
                    ]
                }
            ],
            "chain_metadata_by_pk": [
                246,
                {
                    "chain_id": [
                        54,
                        "Int!"
                    ]
                }
            ],
            "chain_metadata_stream": [
                246,
                {
                    "batch_size": [
                        54,
                        "Int!"
                    ],
                    "cursor": [
                        250,
                        "[chain_metadata_stream_cursor_input]!"
                    ],
                    "where": [
                        247
                    ]
                }
            ],
            "dynamic_contract_registry": [
                255,
                {
                    "distinct_on": [
                        258,
                        "[dynamic_contract_registry_select_column!]"
                    ],
                    "limit": [
                        54
                    ],
                    "offset": [
                        54
                    ],
                    "order_by": [
                        257,
                        "[dynamic_contract_registry_order_by!]"
                    ],
                    "where": [
                        256
                    ]
                }
            ],
            "dynamic_contract_registry_by_pk": [
                255,
                {
                    "id": [
                        201,
                        "String!"
                    ]
                }
            ],
            "dynamic_contract_registry_stream": [
                255,
                {
                    "batch_size": [
                        54,
                        "Int!"
                    ],
                    "cursor": [
                        259,
                        "[dynamic_contract_registry_stream_cursor_input]!"
                    ],
                    "where": [
                        256
                    ]
                }
            ],
            "end_of_block_range_scanned_data": [
                261,
                {
                    "distinct_on": [
                        264,
                        "[end_of_block_range_scanned_data_select_column!]"
                    ],
                    "limit": [
                        54
                    ],
                    "offset": [
                        54
                    ],
                    "order_by": [
                        263,
                        "[end_of_block_range_scanned_data_order_by!]"
                    ],
                    "where": [
                        262
                    ]
                }
            ],
            "end_of_block_range_scanned_data_by_pk": [
                261,
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
                261,
                {
                    "batch_size": [
                        54,
                        "Int!"
                    ],
                    "cursor": [
                        265,
                        "[end_of_block_range_scanned_data_stream_cursor_input]!"
                    ],
                    "where": [
                        262
                    ]
                }
            ],
            "event_sync_state": [
                267,
                {
                    "distinct_on": [
                        270,
                        "[event_sync_state_select_column!]"
                    ],
                    "limit": [
                        54
                    ],
                    "offset": [
                        54
                    ],
                    "order_by": [
                        269,
                        "[event_sync_state_order_by!]"
                    ],
                    "where": [
                        268
                    ]
                }
            ],
            "event_sync_state_by_pk": [
                267,
                {
                    "chain_id": [
                        54,
                        "Int!"
                    ]
                }
            ],
            "event_sync_state_stream": [
                267,
                {
                    "batch_size": [
                        54,
                        "Int!"
                    ],
                    "cursor": [
                        271,
                        "[event_sync_state_stream_cursor_input]!"
                    ],
                    "where": [
                        268
                    ]
                }
            ],
            "persisted_state": [
                284,
                {
                    "distinct_on": [
                        287,
                        "[persisted_state_select_column!]"
                    ],
                    "limit": [
                        54
                    ],
                    "offset": [
                        54
                    ],
                    "order_by": [
                        286,
                        "[persisted_state_order_by!]"
                    ],
                    "where": [
                        285
                    ]
                }
            ],
            "persisted_state_by_pk": [
                284,
                {
                    "id": [
                        54,
                        "Int!"
                    ]
                }
            ],
            "persisted_state_stream": [
                284,
                {
                    "batch_size": [
                        54,
                        "Int!"
                    ],
                    "cursor": [
                        288,
                        "[persisted_state_stream_cursor_input]!"
                    ],
                    "where": [
                        285
                    ]
                }
            ],
            "raw_events": [
                292,
                {
                    "distinct_on": [
                        295,
                        "[raw_events_select_column!]"
                    ],
                    "limit": [
                        54
                    ],
                    "offset": [
                        54
                    ],
                    "order_by": [
                        294,
                        "[raw_events_order_by!]"
                    ],
                    "where": [
                        293
                    ]
                }
            ],
            "raw_events_by_pk": [
                292,
                {
                    "serial": [
                        54,
                        "Int!"
                    ]
                }
            ],
            "raw_events_stream": [
                292,
                {
                    "batch_size": [
                        54,
                        "Int!"
                    ],
                    "cursor": [
                        296,
                        "[raw_events_stream_cursor_input]!"
                    ],
                    "where": [
                        293
                    ]
                }
            ],
            "__typename": [
                201
            ]
        }
    }
}