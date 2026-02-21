export default {
    "scalars": [
        3,
        9,
        12,
        17,
        27,
        44,
        61,
        74,
        81,
        86,
        89,
        100,
        116,
        130,
        136,
        145,
        158,
        164,
        170,
        180,
        197,
        210,
        221,
        238,
        254,
        271,
        288,
        301,
        311,
        321,
        327,
        337,
        350,
        360,
        373,
        376,
        381,
        384,
        385,
        388,
        390,
        392,
        394,
        395,
        400,
        403,
        405,
        407,
        409,
        411
    ],
    "types": {
        "Account": {
            "id": [
                321
            ],
            "loans": [
                92,
                {
                    "distinct_on": [
                        116,
                        "[Loan_select_column!]"
                    ],
                    "limit": [
                        89
                    ],
                    "offset": [
                        89
                    ],
                    "order_by": [
                        115,
                        "[Loan_order_by!]"
                    ],
                    "where": [
                        112
                    ]
                }
            ],
            "marketsCreated": [
                126,
                {
                    "distinct_on": [
                        145,
                        "[Market_select_column!]"
                    ],
                    "limit": [
                        89
                    ],
                    "offset": [
                        89
                    ],
                    "order_by": [
                        144,
                        "[Market_order_by!]"
                    ],
                    "where": [
                        141
                    ]
                }
            ],
            "presaleParticipations": [
                190,
                {
                    "distinct_on": [
                        197,
                        "[PresaleParticipation_select_column!]"
                    ],
                    "limit": [
                        89
                    ],
                    "offset": [
                        89
                    ],
                    "order_by": [
                        196,
                        "[PresaleParticipation_order_by!]"
                    ],
                    "where": [
                        193
                    ]
                }
            ],
            "stakingPositions": [
                264,
                {
                    "distinct_on": [
                        271,
                        "[StakePosition_select_column!]"
                    ],
                    "limit": [
                        89
                    ],
                    "offset": [
                        89
                    ],
                    "order_by": [
                        270,
                        "[StakePosition_order_by!]"
                    ],
                    "where": [
                        267
                    ]
                }
            ],
            "trades": [
                330,
                {
                    "distinct_on": [
                        337,
                        "[Trade_select_column!]"
                    ],
                    "limit": [
                        89
                    ],
                    "offset": [
                        89
                    ],
                    "order_by": [
                        336,
                        "[Trade_order_by!]"
                    ],
                    "where": [
                        333
                    ]
                }
            ],
            "userMarketPositions": [
                353,
                {
                    "distinct_on": [
                        360,
                        "[UserMarketPosition_select_column!]"
                    ],
                    "limit": [
                        89
                    ],
                    "offset": [
                        89
                    ],
                    "order_by": [
                        359,
                        "[UserMarketPosition_order_by!]"
                    ],
                    "where": [
                        356
                    ]
                }
            ],
            "__typename": [
                321
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
                323
            ],
            "loans": [
                112
            ],
            "marketsCreated": [
                141
            ],
            "presaleParticipations": [
                193
            ],
            "stakingPositions": [
                267
            ],
            "trades": [
                333
            ],
            "userMarketPositions": [
                356
            ],
            "__typename": [
                321
            ]
        },
        "Account_order_by": {
            "id": [
                394
            ],
            "loans_aggregate": [
                110
            ],
            "marketsCreated_aggregate": [
                139
            ],
            "presaleParticipations_aggregate": [
                191
            ],
            "stakingPositions_aggregate": [
                265
            ],
            "trades_aggregate": [
                331
            ],
            "userMarketPositions_aggregate": [
                354
            ],
            "__typename": [
                321
            ]
        },
        "Account_select_column": {},
        "Account_stream_cursor_input": {
            "initial_value": [
                5
            ],
            "ordering": [
                384
            ],
            "__typename": [
                321
            ]
        },
        "Account_stream_cursor_value_input": {
            "id": [
                321
            ],
            "__typename": [
                321
            ]
        },
        "AuthorizerContract": {
            "createdAt": [
                392
            ],
            "floor": [
                321
            ],
            "id": [
                321
            ],
            "lastAssignedRoleId": [
                392
            ],
            "lastUpdatedAt": [
                392
            ],
            "roles": [
                213,
                {
                    "distinct_on": [
                        254,
                        "[Role_select_column!]"
                    ],
                    "limit": [
                        89
                    ],
                    "offset": [
                        89
                    ],
                    "order_by": [
                        253,
                        "[Role_order_by!]"
                    ],
                    "where": [
                        250
                    ]
                }
            ],
            "__typename": [
                321
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
                393
            ],
            "floor": [
                323
            ],
            "id": [
                323
            ],
            "lastAssignedRoleId": [
                393
            ],
            "lastUpdatedAt": [
                393
            ],
            "roles": [
                250
            ],
            "__typename": [
                321
            ]
        },
        "AuthorizerContract_order_by": {
            "createdAt": [
                394
            ],
            "floor": [
                394
            ],
            "id": [
                394
            ],
            "lastAssignedRoleId": [
                394
            ],
            "lastUpdatedAt": [
                394
            ],
            "roles_aggregate": [
                248
            ],
            "__typename": [
                321
            ]
        },
        "AuthorizerContract_select_column": {},
        "AuthorizerContract_stream_cursor_input": {
            "initial_value": [
                11
            ],
            "ordering": [
                384
            ],
            "__typename": [
                321
            ]
        },
        "AuthorizerContract_stream_cursor_value_input": {
            "createdAt": [
                392
            ],
            "floor": [
                321
            ],
            "id": [
                321
            ],
            "lastAssignedRoleId": [
                392
            ],
            "lastUpdatedAt": [
                392
            ],
            "__typename": [
                321
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
                321
            ]
        },
        "CreditFacilityContract": {
            "borrowToken_id": [
                321
            ],
            "borrowingFeeRate": [
                392
            ],
            "collateralToken_id": [
                321
            ],
            "createdAt": [
                392
            ],
            "id": [
                321
            ],
            "lastUpdatedAt": [
                392
            ],
            "loanToValueRatio": [
                392
            ],
            "loans": [
                92,
                {
                    "distinct_on": [
                        116,
                        "[Loan_select_column!]"
                    ],
                    "limit": [
                        89
                    ],
                    "offset": [
                        89
                    ],
                    "order_by": [
                        115,
                        "[Loan_order_by!]"
                    ],
                    "where": [
                        112
                    ]
                }
            ],
            "market_id": [
                321
            ],
            "maxLeverage": [
                392
            ],
            "totalDebtFormatted": [
                321
            ],
            "totalDebtRaw": [
                392
            ],
            "totalLoans": [
                392
            ],
            "totalLockedCollateralFormatted": [
                321
            ],
            "totalLockedCollateralRaw": [
                392
            ],
            "totalVolumeFormatted": [
                321
            ],
            "totalVolumeRaw": [
                392
            ],
            "__typename": [
                321
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
                323
            ],
            "borrowingFeeRate": [
                393
            ],
            "collateralToken_id": [
                323
            ],
            "createdAt": [
                393
            ],
            "id": [
                323
            ],
            "lastUpdatedAt": [
                393
            ],
            "loanToValueRatio": [
                393
            ],
            "loans": [
                112
            ],
            "market_id": [
                323
            ],
            "maxLeverage": [
                393
            ],
            "totalDebtFormatted": [
                323
            ],
            "totalDebtRaw": [
                393
            ],
            "totalLoans": [
                393
            ],
            "totalLockedCollateralFormatted": [
                323
            ],
            "totalLockedCollateralRaw": [
                393
            ],
            "totalVolumeFormatted": [
                323
            ],
            "totalVolumeRaw": [
                393
            ],
            "__typename": [
                321
            ]
        },
        "CreditFacilityContract_order_by": {
            "borrowToken_id": [
                394
            ],
            "borrowingFeeRate": [
                394
            ],
            "collateralToken_id": [
                394
            ],
            "createdAt": [
                394
            ],
            "id": [
                394
            ],
            "lastUpdatedAt": [
                394
            ],
            "loanToValueRatio": [
                394
            ],
            "loans_aggregate": [
                110
            ],
            "market_id": [
                394
            ],
            "maxLeverage": [
                394
            ],
            "totalDebtFormatted": [
                394
            ],
            "totalDebtRaw": [
                394
            ],
            "totalLoans": [
                394
            ],
            "totalLockedCollateralFormatted": [
                394
            ],
            "totalLockedCollateralRaw": [
                394
            ],
            "totalVolumeFormatted": [
                394
            ],
            "totalVolumeRaw": [
                394
            ],
            "__typename": [
                321
            ]
        },
        "CreditFacilityContract_select_column": {},
        "CreditFacilityContract_stream_cursor_input": {
            "initial_value": [
                19
            ],
            "ordering": [
                384
            ],
            "__typename": [
                321
            ]
        },
        "CreditFacilityContract_stream_cursor_value_input": {
            "borrowToken_id": [
                321
            ],
            "borrowingFeeRate": [
                392
            ],
            "collateralToken_id": [
                321
            ],
            "createdAt": [
                392
            ],
            "id": [
                321
            ],
            "lastUpdatedAt": [
                392
            ],
            "loanToValueRatio": [
                392
            ],
            "market_id": [
                321
            ],
            "maxLeverage": [
                392
            ],
            "totalDebtFormatted": [
                321
            ],
            "totalDebtRaw": [
                392
            ],
            "totalLoans": [
                392
            ],
            "totalLockedCollateralFormatted": [
                321
            ],
            "totalLockedCollateralRaw": [
                392
            ],
            "totalVolumeFormatted": [
                321
            ],
            "totalVolumeRaw": [
                392
            ],
            "__typename": [
                321
            ]
        },
        "FeeSplitterPayment": {
            "amountFormatted": [
                321
            ],
            "amountRaw": [
                392
            ],
            "id": [
                321
            ],
            "isFloorFee": [
                12
            ],
            "market_id": [
                321
            ],
            "recipient": [
                321
            ],
            "timestamp": [
                392
            ],
            "token_id": [
                321
            ],
            "transactionHash": [
                321
            ],
            "treasury_id": [
                321
            ],
            "__typename": [
                321
            ]
        },
        "FeeSplitterPayment_aggregate_order_by": {
            "avg": [
                22
            ],
            "count": [
                394
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
                321
            ]
        },
        "FeeSplitterPayment_avg_order_by": {
            "amountRaw": [
                394
            ],
            "timestamp": [
                394
            ],
            "__typename": [
                321
            ]
        },
        "FeeSplitterPayment_bool_exp": {
            "_and": [
                23
            ],
            "_not": [
                23
            ],
            "_or": [
                23
            ],
            "amountFormatted": [
                323
            ],
            "amountRaw": [
                393
            ],
            "id": [
                323
            ],
            "isFloorFee": [
                13
            ],
            "market_id": [
                323
            ],
            "recipient": [
                323
            ],
            "timestamp": [
                393
            ],
            "token_id": [
                323
            ],
            "transactionHash": [
                323
            ],
            "treasury_id": [
                323
            ],
            "__typename": [
                321
            ]
        },
        "FeeSplitterPayment_max_order_by": {
            "amountFormatted": [
                394
            ],
            "amountRaw": [
                394
            ],
            "id": [
                394
            ],
            "market_id": [
                394
            ],
            "recipient": [
                394
            ],
            "timestamp": [
                394
            ],
            "token_id": [
                394
            ],
            "transactionHash": [
                394
            ],
            "treasury_id": [
                394
            ],
            "__typename": [
                321
            ]
        },
        "FeeSplitterPayment_min_order_by": {
            "amountFormatted": [
                394
            ],
            "amountRaw": [
                394
            ],
            "id": [
                394
            ],
            "market_id": [
                394
            ],
            "recipient": [
                394
            ],
            "timestamp": [
                394
            ],
            "token_id": [
                394
            ],
            "transactionHash": [
                394
            ],
            "treasury_id": [
                394
            ],
            "__typename": [
                321
            ]
        },
        "FeeSplitterPayment_order_by": {
            "amountFormatted": [
                394
            ],
            "amountRaw": [
                394
            ],
            "id": [
                394
            ],
            "isFloorFee": [
                394
            ],
            "market_id": [
                394
            ],
            "recipient": [
                394
            ],
            "timestamp": [
                394
            ],
            "token_id": [
                394
            ],
            "transactionHash": [
                394
            ],
            "treasury_id": [
                394
            ],
            "__typename": [
                321
            ]
        },
        "FeeSplitterPayment_select_column": {},
        "FeeSplitterPayment_stddev_order_by": {
            "amountRaw": [
                394
            ],
            "timestamp": [
                394
            ],
            "__typename": [
                321
            ]
        },
        "FeeSplitterPayment_stddev_pop_order_by": {
            "amountRaw": [
                394
            ],
            "timestamp": [
                394
            ],
            "__typename": [
                321
            ]
        },
        "FeeSplitterPayment_stddev_samp_order_by": {
            "amountRaw": [
                394
            ],
            "timestamp": [
                394
            ],
            "__typename": [
                321
            ]
        },
        "FeeSplitterPayment_stream_cursor_input": {
            "initial_value": [
                32
            ],
            "ordering": [
                384
            ],
            "__typename": [
                321
            ]
        },
        "FeeSplitterPayment_stream_cursor_value_input": {
            "amountFormatted": [
                321
            ],
            "amountRaw": [
                392
            ],
            "id": [
                321
            ],
            "isFloorFee": [
                12
            ],
            "market_id": [
                321
            ],
            "recipient": [
                321
            ],
            "timestamp": [
                392
            ],
            "token_id": [
                321
            ],
            "transactionHash": [
                321
            ],
            "treasury_id": [
                321
            ],
            "__typename": [
                321
            ]
        },
        "FeeSplitterPayment_sum_order_by": {
            "amountRaw": [
                394
            ],
            "timestamp": [
                394
            ],
            "__typename": [
                321
            ]
        },
        "FeeSplitterPayment_var_pop_order_by": {
            "amountRaw": [
                394
            ],
            "timestamp": [
                394
            ],
            "__typename": [
                321
            ]
        },
        "FeeSplitterPayment_var_samp_order_by": {
            "amountRaw": [
                394
            ],
            "timestamp": [
                394
            ],
            "__typename": [
                321
            ]
        },
        "FeeSplitterPayment_variance_order_by": {
            "amountRaw": [
                394
            ],
            "timestamp": [
                394
            ],
            "__typename": [
                321
            ]
        },
        "FeeSplitterReceipt": {
            "amountFormatted": [
                321
            ],
            "amountRaw": [
                392
            ],
            "id": [
                321
            ],
            "market_id": [
                321
            ],
            "sender": [
                321
            ],
            "timestamp": [
                392
            ],
            "token_id": [
                321
            ],
            "transactionHash": [
                321
            ],
            "treasury_id": [
                321
            ],
            "__typename": [
                321
            ]
        },
        "FeeSplitterReceipt_aggregate_order_by": {
            "avg": [
                39
            ],
            "count": [
                394
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
                321
            ]
        },
        "FeeSplitterReceipt_avg_order_by": {
            "amountRaw": [
                394
            ],
            "timestamp": [
                394
            ],
            "__typename": [
                321
            ]
        },
        "FeeSplitterReceipt_bool_exp": {
            "_and": [
                40
            ],
            "_not": [
                40
            ],
            "_or": [
                40
            ],
            "amountFormatted": [
                323
            ],
            "amountRaw": [
                393
            ],
            "id": [
                323
            ],
            "market_id": [
                323
            ],
            "sender": [
                323
            ],
            "timestamp": [
                393
            ],
            "token_id": [
                323
            ],
            "transactionHash": [
                323
            ],
            "treasury_id": [
                323
            ],
            "__typename": [
                321
            ]
        },
        "FeeSplitterReceipt_max_order_by": {
            "amountFormatted": [
                394
            ],
            "amountRaw": [
                394
            ],
            "id": [
                394
            ],
            "market_id": [
                394
            ],
            "sender": [
                394
            ],
            "timestamp": [
                394
            ],
            "token_id": [
                394
            ],
            "transactionHash": [
                394
            ],
            "treasury_id": [
                394
            ],
            "__typename": [
                321
            ]
        },
        "FeeSplitterReceipt_min_order_by": {
            "amountFormatted": [
                394
            ],
            "amountRaw": [
                394
            ],
            "id": [
                394
            ],
            "market_id": [
                394
            ],
            "sender": [
                394
            ],
            "timestamp": [
                394
            ],
            "token_id": [
                394
            ],
            "transactionHash": [
                394
            ],
            "treasury_id": [
                394
            ],
            "__typename": [
                321
            ]
        },
        "FeeSplitterReceipt_order_by": {
            "amountFormatted": [
                394
            ],
            "amountRaw": [
                394
            ],
            "id": [
                394
            ],
            "market_id": [
                394
            ],
            "sender": [
                394
            ],
            "timestamp": [
                394
            ],
            "token_id": [
                394
            ],
            "transactionHash": [
                394
            ],
            "treasury_id": [
                394
            ],
            "__typename": [
                321
            ]
        },
        "FeeSplitterReceipt_select_column": {},
        "FeeSplitterReceipt_stddev_order_by": {
            "amountRaw": [
                394
            ],
            "timestamp": [
                394
            ],
            "__typename": [
                321
            ]
        },
        "FeeSplitterReceipt_stddev_pop_order_by": {
            "amountRaw": [
                394
            ],
            "timestamp": [
                394
            ],
            "__typename": [
                321
            ]
        },
        "FeeSplitterReceipt_stddev_samp_order_by": {
            "amountRaw": [
                394
            ],
            "timestamp": [
                394
            ],
            "__typename": [
                321
            ]
        },
        "FeeSplitterReceipt_stream_cursor_input": {
            "initial_value": [
                49
            ],
            "ordering": [
                384
            ],
            "__typename": [
                321
            ]
        },
        "FeeSplitterReceipt_stream_cursor_value_input": {
            "amountFormatted": [
                321
            ],
            "amountRaw": [
                392
            ],
            "id": [
                321
            ],
            "market_id": [
                321
            ],
            "sender": [
                321
            ],
            "timestamp": [
                392
            ],
            "token_id": [
                321
            ],
            "transactionHash": [
                321
            ],
            "treasury_id": [
                321
            ],
            "__typename": [
                321
            ]
        },
        "FeeSplitterReceipt_sum_order_by": {
            "amountRaw": [
                394
            ],
            "timestamp": [
                394
            ],
            "__typename": [
                321
            ]
        },
        "FeeSplitterReceipt_var_pop_order_by": {
            "amountRaw": [
                394
            ],
            "timestamp": [
                394
            ],
            "__typename": [
                321
            ]
        },
        "FeeSplitterReceipt_var_samp_order_by": {
            "amountRaw": [
                394
            ],
            "timestamp": [
                394
            ],
            "__typename": [
                321
            ]
        },
        "FeeSplitterReceipt_variance_order_by": {
            "amountRaw": [
                394
            ],
            "timestamp": [
                394
            ],
            "__typename": [
                321
            ]
        },
        "FloorElevation": {
            "deployedAmountFormatted": [
                321
            ],
            "deployedAmountRaw": [
                392
            ],
            "id": [
                321
            ],
            "market_id": [
                321
            ],
            "newFloorPriceFormatted": [
                321
            ],
            "newFloorPriceRaw": [
                392
            ],
            "oldFloorPriceFormatted": [
                321
            ],
            "oldFloorPriceRaw": [
                392
            ],
            "timestamp": [
                392
            ],
            "transactionHash": [
                321
            ],
            "__typename": [
                321
            ]
        },
        "FloorElevation_aggregate_order_by": {
            "avg": [
                56
            ],
            "count": [
                394
            ],
            "max": [
                58
            ],
            "min": [
                59
            ],
            "stddev": [
                62
            ],
            "stddev_pop": [
                63
            ],
            "stddev_samp": [
                64
            ],
            "sum": [
                67
            ],
            "var_pop": [
                68
            ],
            "var_samp": [
                69
            ],
            "variance": [
                70
            ],
            "__typename": [
                321
            ]
        },
        "FloorElevation_avg_order_by": {
            "deployedAmountRaw": [
                394
            ],
            "newFloorPriceRaw": [
                394
            ],
            "oldFloorPriceRaw": [
                394
            ],
            "timestamp": [
                394
            ],
            "__typename": [
                321
            ]
        },
        "FloorElevation_bool_exp": {
            "_and": [
                57
            ],
            "_not": [
                57
            ],
            "_or": [
                57
            ],
            "deployedAmountFormatted": [
                323
            ],
            "deployedAmountRaw": [
                393
            ],
            "id": [
                323
            ],
            "market_id": [
                323
            ],
            "newFloorPriceFormatted": [
                323
            ],
            "newFloorPriceRaw": [
                393
            ],
            "oldFloorPriceFormatted": [
                323
            ],
            "oldFloorPriceRaw": [
                393
            ],
            "timestamp": [
                393
            ],
            "transactionHash": [
                323
            ],
            "__typename": [
                321
            ]
        },
        "FloorElevation_max_order_by": {
            "deployedAmountFormatted": [
                394
            ],
            "deployedAmountRaw": [
                394
            ],
            "id": [
                394
            ],
            "market_id": [
                394
            ],
            "newFloorPriceFormatted": [
                394
            ],
            "newFloorPriceRaw": [
                394
            ],
            "oldFloorPriceFormatted": [
                394
            ],
            "oldFloorPriceRaw": [
                394
            ],
            "timestamp": [
                394
            ],
            "transactionHash": [
                394
            ],
            "__typename": [
                321
            ]
        },
        "FloorElevation_min_order_by": {
            "deployedAmountFormatted": [
                394
            ],
            "deployedAmountRaw": [
                394
            ],
            "id": [
                394
            ],
            "market_id": [
                394
            ],
            "newFloorPriceFormatted": [
                394
            ],
            "newFloorPriceRaw": [
                394
            ],
            "oldFloorPriceFormatted": [
                394
            ],
            "oldFloorPriceRaw": [
                394
            ],
            "timestamp": [
                394
            ],
            "transactionHash": [
                394
            ],
            "__typename": [
                321
            ]
        },
        "FloorElevation_order_by": {
            "deployedAmountFormatted": [
                394
            ],
            "deployedAmountRaw": [
                394
            ],
            "id": [
                394
            ],
            "market_id": [
                394
            ],
            "newFloorPriceFormatted": [
                394
            ],
            "newFloorPriceRaw": [
                394
            ],
            "oldFloorPriceFormatted": [
                394
            ],
            "oldFloorPriceRaw": [
                394
            ],
            "timestamp": [
                394
            ],
            "transactionHash": [
                394
            ],
            "__typename": [
                321
            ]
        },
        "FloorElevation_select_column": {},
        "FloorElevation_stddev_order_by": {
            "deployedAmountRaw": [
                394
            ],
            "newFloorPriceRaw": [
                394
            ],
            "oldFloorPriceRaw": [
                394
            ],
            "timestamp": [
                394
            ],
            "__typename": [
                321
            ]
        },
        "FloorElevation_stddev_pop_order_by": {
            "deployedAmountRaw": [
                394
            ],
            "newFloorPriceRaw": [
                394
            ],
            "oldFloorPriceRaw": [
                394
            ],
            "timestamp": [
                394
            ],
            "__typename": [
                321
            ]
        },
        "FloorElevation_stddev_samp_order_by": {
            "deployedAmountRaw": [
                394
            ],
            "newFloorPriceRaw": [
                394
            ],
            "oldFloorPriceRaw": [
                394
            ],
            "timestamp": [
                394
            ],
            "__typename": [
                321
            ]
        },
        "FloorElevation_stream_cursor_input": {
            "initial_value": [
                66
            ],
            "ordering": [
                384
            ],
            "__typename": [
                321
            ]
        },
        "FloorElevation_stream_cursor_value_input": {
            "deployedAmountFormatted": [
                321
            ],
            "deployedAmountRaw": [
                392
            ],
            "id": [
                321
            ],
            "market_id": [
                321
            ],
            "newFloorPriceFormatted": [
                321
            ],
            "newFloorPriceRaw": [
                392
            ],
            "oldFloorPriceFormatted": [
                321
            ],
            "oldFloorPriceRaw": [
                392
            ],
            "timestamp": [
                392
            ],
            "transactionHash": [
                321
            ],
            "__typename": [
                321
            ]
        },
        "FloorElevation_sum_order_by": {
            "deployedAmountRaw": [
                394
            ],
            "newFloorPriceRaw": [
                394
            ],
            "oldFloorPriceRaw": [
                394
            ],
            "timestamp": [
                394
            ],
            "__typename": [
                321
            ]
        },
        "FloorElevation_var_pop_order_by": {
            "deployedAmountRaw": [
                394
            ],
            "newFloorPriceRaw": [
                394
            ],
            "oldFloorPriceRaw": [
                394
            ],
            "timestamp": [
                394
            ],
            "__typename": [
                321
            ]
        },
        "FloorElevation_var_samp_order_by": {
            "deployedAmountRaw": [
                394
            ],
            "newFloorPriceRaw": [
                394
            ],
            "oldFloorPriceRaw": [
                394
            ],
            "timestamp": [
                394
            ],
            "__typename": [
                321
            ]
        },
        "FloorElevation_variance_order_by": {
            "deployedAmountRaw": [
                394
            ],
            "newFloorPriceRaw": [
                394
            ],
            "oldFloorPriceRaw": [
                394
            ],
            "timestamp": [
                394
            ],
            "__typename": [
                321
            ]
        },
        "GlobalRegistry": {
            "createdAt": [
                392
            ],
            "floorFactoryAddress": [
                321
            ],
            "governorAddress": [
                321
            ],
            "id": [
                321
            ],
            "lastUpdatedAt": [
                392
            ],
            "moduleFactoryAddress": [
                321
            ],
            "trustedForwarderAddress": [
                321
            ],
            "__typename": [
                321
            ]
        },
        "GlobalRegistry_bool_exp": {
            "_and": [
                72
            ],
            "_not": [
                72
            ],
            "_or": [
                72
            ],
            "createdAt": [
                393
            ],
            "floorFactoryAddress": [
                323
            ],
            "governorAddress": [
                323
            ],
            "id": [
                323
            ],
            "lastUpdatedAt": [
                393
            ],
            "moduleFactoryAddress": [
                323
            ],
            "trustedForwarderAddress": [
                323
            ],
            "__typename": [
                321
            ]
        },
        "GlobalRegistry_order_by": {
            "createdAt": [
                394
            ],
            "floorFactoryAddress": [
                394
            ],
            "governorAddress": [
                394
            ],
            "id": [
                394
            ],
            "lastUpdatedAt": [
                394
            ],
            "moduleFactoryAddress": [
                394
            ],
            "trustedForwarderAddress": [
                394
            ],
            "__typename": [
                321
            ]
        },
        "GlobalRegistry_select_column": {},
        "GlobalRegistry_stream_cursor_input": {
            "initial_value": [
                76
            ],
            "ordering": [
                384
            ],
            "__typename": [
                321
            ]
        },
        "GlobalRegistry_stream_cursor_value_input": {
            "createdAt": [
                392
            ],
            "floorFactoryAddress": [
                321
            ],
            "governorAddress": [
                321
            ],
            "id": [
                321
            ],
            "lastUpdatedAt": [
                392
            ],
            "moduleFactoryAddress": [
                321
            ],
            "trustedForwarderAddress": [
                321
            ],
            "__typename": [
                321
            ]
        },
        "GlobalStats": {
            "activeMarkets": [
                392
            ],
            "id": [
                321
            ],
            "lastUpdatedAt": [
                392
            ],
            "totalLockedCollateralFormatted": [
                321
            ],
            "totalLockedCollateralRaw": [
                392
            ],
            "totalMarkets": [
                392
            ],
            "totalOutstandingDebtFormatted": [
                321
            ],
            "totalOutstandingDebtRaw": [
                392
            ],
            "totalVolumeFormatted": [
                321
            ],
            "totalVolumeRaw": [
                392
            ],
            "__typename": [
                321
            ]
        },
        "GlobalStatsSnapshot": {
            "activeMarkets": [
                392
            ],
            "id": [
                321
            ],
            "period": [
                403
            ],
            "periodVolumeFormatted": [
                321
            ],
            "periodVolumeRaw": [
                392
            ],
            "timestamp": [
                392
            ],
            "totalMarketCapFormatted": [
                321
            ],
            "totalMarketCapRaw": [
                392
            ],
            "totalMarkets": [
                392
            ],
            "totalValueLockedFormatted": [
                321
            ],
            "totalValueLockedRaw": [
                392
            ],
            "__typename": [
                321
            ]
        },
        "GlobalStatsSnapshot_bool_exp": {
            "_and": [
                79
            ],
            "_not": [
                79
            ],
            "_or": [
                79
            ],
            "activeMarkets": [
                393
            ],
            "id": [
                323
            ],
            "period": [
                404
            ],
            "periodVolumeFormatted": [
                323
            ],
            "periodVolumeRaw": [
                393
            ],
            "timestamp": [
                393
            ],
            "totalMarketCapFormatted": [
                323
            ],
            "totalMarketCapRaw": [
                393
            ],
            "totalMarkets": [
                393
            ],
            "totalValueLockedFormatted": [
                323
            ],
            "totalValueLockedRaw": [
                393
            ],
            "__typename": [
                321
            ]
        },
        "GlobalStatsSnapshot_order_by": {
            "activeMarkets": [
                394
            ],
            "id": [
                394
            ],
            "period": [
                394
            ],
            "periodVolumeFormatted": [
                394
            ],
            "periodVolumeRaw": [
                394
            ],
            "timestamp": [
                394
            ],
            "totalMarketCapFormatted": [
                394
            ],
            "totalMarketCapRaw": [
                394
            ],
            "totalMarkets": [
                394
            ],
            "totalValueLockedFormatted": [
                394
            ],
            "totalValueLockedRaw": [
                394
            ],
            "__typename": [
                321
            ]
        },
        "GlobalStatsSnapshot_select_column": {},
        "GlobalStatsSnapshot_stream_cursor_input": {
            "initial_value": [
                83
            ],
            "ordering": [
                384
            ],
            "__typename": [
                321
            ]
        },
        "GlobalStatsSnapshot_stream_cursor_value_input": {
            "activeMarkets": [
                392
            ],
            "id": [
                321
            ],
            "period": [
                403
            ],
            "periodVolumeFormatted": [
                321
            ],
            "periodVolumeRaw": [
                392
            ],
            "timestamp": [
                392
            ],
            "totalMarketCapFormatted": [
                321
            ],
            "totalMarketCapRaw": [
                392
            ],
            "totalMarkets": [
                392
            ],
            "totalValueLockedFormatted": [
                321
            ],
            "totalValueLockedRaw": [
                392
            ],
            "__typename": [
                321
            ]
        },
        "GlobalStats_bool_exp": {
            "_and": [
                84
            ],
            "_not": [
                84
            ],
            "_or": [
                84
            ],
            "activeMarkets": [
                393
            ],
            "id": [
                323
            ],
            "lastUpdatedAt": [
                393
            ],
            "totalLockedCollateralFormatted": [
                323
            ],
            "totalLockedCollateralRaw": [
                393
            ],
            "totalMarkets": [
                393
            ],
            "totalOutstandingDebtFormatted": [
                323
            ],
            "totalOutstandingDebtRaw": [
                393
            ],
            "totalVolumeFormatted": [
                323
            ],
            "totalVolumeRaw": [
                393
            ],
            "__typename": [
                321
            ]
        },
        "GlobalStats_order_by": {
            "activeMarkets": [
                394
            ],
            "id": [
                394
            ],
            "lastUpdatedAt": [
                394
            ],
            "totalLockedCollateralFormatted": [
                394
            ],
            "totalLockedCollateralRaw": [
                394
            ],
            "totalMarkets": [
                394
            ],
            "totalOutstandingDebtFormatted": [
                394
            ],
            "totalOutstandingDebtRaw": [
                394
            ],
            "totalVolumeFormatted": [
                394
            ],
            "totalVolumeRaw": [
                394
            ],
            "__typename": [
                321
            ]
        },
        "GlobalStats_select_column": {},
        "GlobalStats_stream_cursor_input": {
            "initial_value": [
                88
            ],
            "ordering": [
                384
            ],
            "__typename": [
                321
            ]
        },
        "GlobalStats_stream_cursor_value_input": {
            "activeMarkets": [
                392
            ],
            "id": [
                321
            ],
            "lastUpdatedAt": [
                392
            ],
            "totalLockedCollateralFormatted": [
                321
            ],
            "totalLockedCollateralRaw": [
                392
            ],
            "totalMarkets": [
                392
            ],
            "totalOutstandingDebtFormatted": [
                321
            ],
            "totalOutstandingDebtRaw": [
                392
            ],
            "totalVolumeFormatted": [
                321
            ],
            "totalVolumeRaw": [
                392
            ],
            "__typename": [
                321
            ]
        },
        "Int": {},
        "Int_array_comparison_exp": {
            "_contained_in": [
                89
            ],
            "_contains": [
                89
            ],
            "_eq": [
                89
            ],
            "_gt": [
                89
            ],
            "_gte": [
                89
            ],
            "_in": [
                89
            ],
            "_is_null": [
                12
            ],
            "_lt": [
                89
            ],
            "_lte": [
                89
            ],
            "_neq": [
                89
            ],
            "_nin": [
                89
            ],
            "__typename": [
                321
            ]
        },
        "Int_comparison_exp": {
            "_eq": [
                89
            ],
            "_gt": [
                89
            ],
            "_gte": [
                89
            ],
            "_in": [
                89
            ],
            "_is_null": [
                12
            ],
            "_lt": [
                89
            ],
            "_lte": [
                89
            ],
            "_neq": [
                89
            ],
            "_nin": [
                89
            ],
            "__typename": [
                321
            ]
        },
        "Loan": {
            "borrowAmountFormatted": [
                321
            ],
            "borrowAmountRaw": [
                392
            ],
            "borrower_id": [
                321
            ],
            "closedAt": [
                392
            ],
            "facility_id": [
                321
            ],
            "floorPriceAtBorrowFormatted": [
                321
            ],
            "floorPriceAtBorrowRaw": [
                392
            ],
            "id": [
                321
            ],
            "lastUpdatedAt": [
                392
            ],
            "lockedCollateralFormatted": [
                321
            ],
            "lockedCollateralRaw": [
                392
            ],
            "market_id": [
                321
            ],
            "openedAt": [
                392
            ],
            "originationFeeFormatted": [
                321
            ],
            "originationFeeRaw": [
                392
            ],
            "remainingDebtFormatted": [
                321
            ],
            "remainingDebtRaw": [
                392
            ],
            "status": [
                388
            ],
            "statusHistory": [
                93,
                {
                    "distinct_on": [
                        100,
                        "[LoanStatusHistory_select_column!]"
                    ],
                    "limit": [
                        89
                    ],
                    "offset": [
                        89
                    ],
                    "order_by": [
                        99,
                        "[LoanStatusHistory_order_by!]"
                    ],
                    "where": [
                        96
                    ]
                }
            ],
            "transactionHash": [
                321
            ],
            "__typename": [
                321
            ]
        },
        "LoanStatusHistory": {
            "id": [
                321
            ],
            "loan_id": [
                321
            ],
            "lockedCollateralFormatted": [
                321
            ],
            "lockedCollateralRaw": [
                392
            ],
            "remainingDebtFormatted": [
                321
            ],
            "remainingDebtRaw": [
                392
            ],
            "status": [
                388
            ],
            "timestamp": [
                392
            ],
            "transactionHash": [
                321
            ],
            "__typename": [
                321
            ]
        },
        "LoanStatusHistory_aggregate_order_by": {
            "avg": [
                95
            ],
            "count": [
                394
            ],
            "max": [
                97
            ],
            "min": [
                98
            ],
            "stddev": [
                101
            ],
            "stddev_pop": [
                102
            ],
            "stddev_samp": [
                103
            ],
            "sum": [
                106
            ],
            "var_pop": [
                107
            ],
            "var_samp": [
                108
            ],
            "variance": [
                109
            ],
            "__typename": [
                321
            ]
        },
        "LoanStatusHistory_avg_order_by": {
            "lockedCollateralRaw": [
                394
            ],
            "remainingDebtRaw": [
                394
            ],
            "timestamp": [
                394
            ],
            "__typename": [
                321
            ]
        },
        "LoanStatusHistory_bool_exp": {
            "_and": [
                96
            ],
            "_not": [
                96
            ],
            "_or": [
                96
            ],
            "id": [
                323
            ],
            "loan_id": [
                323
            ],
            "lockedCollateralFormatted": [
                323
            ],
            "lockedCollateralRaw": [
                393
            ],
            "remainingDebtFormatted": [
                323
            ],
            "remainingDebtRaw": [
                393
            ],
            "status": [
                389
            ],
            "timestamp": [
                393
            ],
            "transactionHash": [
                323
            ],
            "__typename": [
                321
            ]
        },
        "LoanStatusHistory_max_order_by": {
            "id": [
                394
            ],
            "loan_id": [
                394
            ],
            "lockedCollateralFormatted": [
                394
            ],
            "lockedCollateralRaw": [
                394
            ],
            "remainingDebtFormatted": [
                394
            ],
            "remainingDebtRaw": [
                394
            ],
            "status": [
                394
            ],
            "timestamp": [
                394
            ],
            "transactionHash": [
                394
            ],
            "__typename": [
                321
            ]
        },
        "LoanStatusHistory_min_order_by": {
            "id": [
                394
            ],
            "loan_id": [
                394
            ],
            "lockedCollateralFormatted": [
                394
            ],
            "lockedCollateralRaw": [
                394
            ],
            "remainingDebtFormatted": [
                394
            ],
            "remainingDebtRaw": [
                394
            ],
            "status": [
                394
            ],
            "timestamp": [
                394
            ],
            "transactionHash": [
                394
            ],
            "__typename": [
                321
            ]
        },
        "LoanStatusHistory_order_by": {
            "id": [
                394
            ],
            "loan_id": [
                394
            ],
            "lockedCollateralFormatted": [
                394
            ],
            "lockedCollateralRaw": [
                394
            ],
            "remainingDebtFormatted": [
                394
            ],
            "remainingDebtRaw": [
                394
            ],
            "status": [
                394
            ],
            "timestamp": [
                394
            ],
            "transactionHash": [
                394
            ],
            "__typename": [
                321
            ]
        },
        "LoanStatusHistory_select_column": {},
        "LoanStatusHistory_stddev_order_by": {
            "lockedCollateralRaw": [
                394
            ],
            "remainingDebtRaw": [
                394
            ],
            "timestamp": [
                394
            ],
            "__typename": [
                321
            ]
        },
        "LoanStatusHistory_stddev_pop_order_by": {
            "lockedCollateralRaw": [
                394
            ],
            "remainingDebtRaw": [
                394
            ],
            "timestamp": [
                394
            ],
            "__typename": [
                321
            ]
        },
        "LoanStatusHistory_stddev_samp_order_by": {
            "lockedCollateralRaw": [
                394
            ],
            "remainingDebtRaw": [
                394
            ],
            "timestamp": [
                394
            ],
            "__typename": [
                321
            ]
        },
        "LoanStatusHistory_stream_cursor_input": {
            "initial_value": [
                105
            ],
            "ordering": [
                384
            ],
            "__typename": [
                321
            ]
        },
        "LoanStatusHistory_stream_cursor_value_input": {
            "id": [
                321
            ],
            "loan_id": [
                321
            ],
            "lockedCollateralFormatted": [
                321
            ],
            "lockedCollateralRaw": [
                392
            ],
            "remainingDebtFormatted": [
                321
            ],
            "remainingDebtRaw": [
                392
            ],
            "status": [
                388
            ],
            "timestamp": [
                392
            ],
            "transactionHash": [
                321
            ],
            "__typename": [
                321
            ]
        },
        "LoanStatusHistory_sum_order_by": {
            "lockedCollateralRaw": [
                394
            ],
            "remainingDebtRaw": [
                394
            ],
            "timestamp": [
                394
            ],
            "__typename": [
                321
            ]
        },
        "LoanStatusHistory_var_pop_order_by": {
            "lockedCollateralRaw": [
                394
            ],
            "remainingDebtRaw": [
                394
            ],
            "timestamp": [
                394
            ],
            "__typename": [
                321
            ]
        },
        "LoanStatusHistory_var_samp_order_by": {
            "lockedCollateralRaw": [
                394
            ],
            "remainingDebtRaw": [
                394
            ],
            "timestamp": [
                394
            ],
            "__typename": [
                321
            ]
        },
        "LoanStatusHistory_variance_order_by": {
            "lockedCollateralRaw": [
                394
            ],
            "remainingDebtRaw": [
                394
            ],
            "timestamp": [
                394
            ],
            "__typename": [
                321
            ]
        },
        "Loan_aggregate_order_by": {
            "avg": [
                111
            ],
            "count": [
                394
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
                321
            ]
        },
        "Loan_avg_order_by": {
            "borrowAmountRaw": [
                394
            ],
            "closedAt": [
                394
            ],
            "floorPriceAtBorrowRaw": [
                394
            ],
            "lastUpdatedAt": [
                394
            ],
            "lockedCollateralRaw": [
                394
            ],
            "openedAt": [
                394
            ],
            "originationFeeRaw": [
                394
            ],
            "remainingDebtRaw": [
                394
            ],
            "__typename": [
                321
            ]
        },
        "Loan_bool_exp": {
            "_and": [
                112
            ],
            "_not": [
                112
            ],
            "_or": [
                112
            ],
            "borrowAmountFormatted": [
                323
            ],
            "borrowAmountRaw": [
                393
            ],
            "borrower_id": [
                323
            ],
            "closedAt": [
                393
            ],
            "facility_id": [
                323
            ],
            "floorPriceAtBorrowFormatted": [
                323
            ],
            "floorPriceAtBorrowRaw": [
                393
            ],
            "id": [
                323
            ],
            "lastUpdatedAt": [
                393
            ],
            "lockedCollateralFormatted": [
                323
            ],
            "lockedCollateralRaw": [
                393
            ],
            "market_id": [
                323
            ],
            "openedAt": [
                393
            ],
            "originationFeeFormatted": [
                323
            ],
            "originationFeeRaw": [
                393
            ],
            "remainingDebtFormatted": [
                323
            ],
            "remainingDebtRaw": [
                393
            ],
            "status": [
                389
            ],
            "statusHistory": [
                96
            ],
            "transactionHash": [
                323
            ],
            "__typename": [
                321
            ]
        },
        "Loan_max_order_by": {
            "borrowAmountFormatted": [
                394
            ],
            "borrowAmountRaw": [
                394
            ],
            "borrower_id": [
                394
            ],
            "closedAt": [
                394
            ],
            "facility_id": [
                394
            ],
            "floorPriceAtBorrowFormatted": [
                394
            ],
            "floorPriceAtBorrowRaw": [
                394
            ],
            "id": [
                394
            ],
            "lastUpdatedAt": [
                394
            ],
            "lockedCollateralFormatted": [
                394
            ],
            "lockedCollateralRaw": [
                394
            ],
            "market_id": [
                394
            ],
            "openedAt": [
                394
            ],
            "originationFeeFormatted": [
                394
            ],
            "originationFeeRaw": [
                394
            ],
            "remainingDebtFormatted": [
                394
            ],
            "remainingDebtRaw": [
                394
            ],
            "status": [
                394
            ],
            "transactionHash": [
                394
            ],
            "__typename": [
                321
            ]
        },
        "Loan_min_order_by": {
            "borrowAmountFormatted": [
                394
            ],
            "borrowAmountRaw": [
                394
            ],
            "borrower_id": [
                394
            ],
            "closedAt": [
                394
            ],
            "facility_id": [
                394
            ],
            "floorPriceAtBorrowFormatted": [
                394
            ],
            "floorPriceAtBorrowRaw": [
                394
            ],
            "id": [
                394
            ],
            "lastUpdatedAt": [
                394
            ],
            "lockedCollateralFormatted": [
                394
            ],
            "lockedCollateralRaw": [
                394
            ],
            "market_id": [
                394
            ],
            "openedAt": [
                394
            ],
            "originationFeeFormatted": [
                394
            ],
            "originationFeeRaw": [
                394
            ],
            "remainingDebtFormatted": [
                394
            ],
            "remainingDebtRaw": [
                394
            ],
            "status": [
                394
            ],
            "transactionHash": [
                394
            ],
            "__typename": [
                321
            ]
        },
        "Loan_order_by": {
            "borrowAmountFormatted": [
                394
            ],
            "borrowAmountRaw": [
                394
            ],
            "borrower_id": [
                394
            ],
            "closedAt": [
                394
            ],
            "facility_id": [
                394
            ],
            "floorPriceAtBorrowFormatted": [
                394
            ],
            "floorPriceAtBorrowRaw": [
                394
            ],
            "id": [
                394
            ],
            "lastUpdatedAt": [
                394
            ],
            "lockedCollateralFormatted": [
                394
            ],
            "lockedCollateralRaw": [
                394
            ],
            "market_id": [
                394
            ],
            "openedAt": [
                394
            ],
            "originationFeeFormatted": [
                394
            ],
            "originationFeeRaw": [
                394
            ],
            "remainingDebtFormatted": [
                394
            ],
            "remainingDebtRaw": [
                394
            ],
            "status": [
                394
            ],
            "statusHistory_aggregate": [
                94
            ],
            "transactionHash": [
                394
            ],
            "__typename": [
                321
            ]
        },
        "Loan_select_column": {},
        "Loan_stddev_order_by": {
            "borrowAmountRaw": [
                394
            ],
            "closedAt": [
                394
            ],
            "floorPriceAtBorrowRaw": [
                394
            ],
            "lastUpdatedAt": [
                394
            ],
            "lockedCollateralRaw": [
                394
            ],
            "openedAt": [
                394
            ],
            "originationFeeRaw": [
                394
            ],
            "remainingDebtRaw": [
                394
            ],
            "__typename": [
                321
            ]
        },
        "Loan_stddev_pop_order_by": {
            "borrowAmountRaw": [
                394
            ],
            "closedAt": [
                394
            ],
            "floorPriceAtBorrowRaw": [
                394
            ],
            "lastUpdatedAt": [
                394
            ],
            "lockedCollateralRaw": [
                394
            ],
            "openedAt": [
                394
            ],
            "originationFeeRaw": [
                394
            ],
            "remainingDebtRaw": [
                394
            ],
            "__typename": [
                321
            ]
        },
        "Loan_stddev_samp_order_by": {
            "borrowAmountRaw": [
                394
            ],
            "closedAt": [
                394
            ],
            "floorPriceAtBorrowRaw": [
                394
            ],
            "lastUpdatedAt": [
                394
            ],
            "lockedCollateralRaw": [
                394
            ],
            "openedAt": [
                394
            ],
            "originationFeeRaw": [
                394
            ],
            "remainingDebtRaw": [
                394
            ],
            "__typename": [
                321
            ]
        },
        "Loan_stream_cursor_input": {
            "initial_value": [
                121
            ],
            "ordering": [
                384
            ],
            "__typename": [
                321
            ]
        },
        "Loan_stream_cursor_value_input": {
            "borrowAmountFormatted": [
                321
            ],
            "borrowAmountRaw": [
                392
            ],
            "borrower_id": [
                321
            ],
            "closedAt": [
                392
            ],
            "facility_id": [
                321
            ],
            "floorPriceAtBorrowFormatted": [
                321
            ],
            "floorPriceAtBorrowRaw": [
                392
            ],
            "id": [
                321
            ],
            "lastUpdatedAt": [
                392
            ],
            "lockedCollateralFormatted": [
                321
            ],
            "lockedCollateralRaw": [
                392
            ],
            "market_id": [
                321
            ],
            "openedAt": [
                392
            ],
            "originationFeeFormatted": [
                321
            ],
            "originationFeeRaw": [
                392
            ],
            "remainingDebtFormatted": [
                321
            ],
            "remainingDebtRaw": [
                392
            ],
            "status": [
                388
            ],
            "transactionHash": [
                321
            ],
            "__typename": [
                321
            ]
        },
        "Loan_sum_order_by": {
            "borrowAmountRaw": [
                394
            ],
            "closedAt": [
                394
            ],
            "floorPriceAtBorrowRaw": [
                394
            ],
            "lastUpdatedAt": [
                394
            ],
            "lockedCollateralRaw": [
                394
            ],
            "openedAt": [
                394
            ],
            "originationFeeRaw": [
                394
            ],
            "remainingDebtRaw": [
                394
            ],
            "__typename": [
                321
            ]
        },
        "Loan_var_pop_order_by": {
            "borrowAmountRaw": [
                394
            ],
            "closedAt": [
                394
            ],
            "floorPriceAtBorrowRaw": [
                394
            ],
            "lastUpdatedAt": [
                394
            ],
            "lockedCollateralRaw": [
                394
            ],
            "openedAt": [
                394
            ],
            "originationFeeRaw": [
                394
            ],
            "remainingDebtRaw": [
                394
            ],
            "__typename": [
                321
            ]
        },
        "Loan_var_samp_order_by": {
            "borrowAmountRaw": [
                394
            ],
            "closedAt": [
                394
            ],
            "floorPriceAtBorrowRaw": [
                394
            ],
            "lastUpdatedAt": [
                394
            ],
            "lockedCollateralRaw": [
                394
            ],
            "openedAt": [
                394
            ],
            "originationFeeRaw": [
                394
            ],
            "remainingDebtRaw": [
                394
            ],
            "__typename": [
                321
            ]
        },
        "Loan_variance_order_by": {
            "borrowAmountRaw": [
                394
            ],
            "closedAt": [
                394
            ],
            "floorPriceAtBorrowRaw": [
                394
            ],
            "lastUpdatedAt": [
                394
            ],
            "lockedCollateralRaw": [
                394
            ],
            "openedAt": [
                394
            ],
            "originationFeeRaw": [
                394
            ],
            "remainingDebtRaw": [
                394
            ],
            "__typename": [
                321
            ]
        },
        "Market": {
            "buyFeeBps": [
                392
            ],
            "createdAt": [
                392
            ],
            "creator_id": [
                321
            ],
            "currentPriceFormatted": [
                321
            ],
            "currentPriceRaw": [
                392
            ],
            "factory_id": [
                321
            ],
            "floorElevations": [
                54,
                {
                    "distinct_on": [
                        61,
                        "[FloorElevation_select_column!]"
                    ],
                    "limit": [
                        89
                    ],
                    "offset": [
                        89
                    ],
                    "order_by": [
                        60,
                        "[FloorElevation_order_by!]"
                    ],
                    "where": [
                        57
                    ]
                }
            ],
            "floorPriceFormatted": [
                321
            ],
            "floorPriceRaw": [
                392
            ],
            "floorSupplyFormatted": [
                321
            ],
            "floorSupplyRaw": [
                392
            ],
            "id": [
                321
            ],
            "initialFloorPriceFormatted": [
                321
            ],
            "initialFloorPriceRaw": [
                392
            ],
            "isBuyOpen": [
                12
            ],
            "isSellOpen": [
                12
            ],
            "issuanceToken": [
                324
            ],
            "issuanceToken_id": [
                321
            ],
            "lastElevationTimestamp": [
                392
            ],
            "lastTradeTimestamp": [
                392
            ],
            "lastUpdatedAt": [
                392
            ],
            "marketSupplyFormatted": [
                321
            ],
            "marketSupplyRaw": [
                392
            ],
            "maxLTV": [
                392
            ],
            "reserveToken": [
                324
            ],
            "reserveToken_id": [
                321
            ],
            "sellFeeBps": [
                392
            ],
            "status": [
                390
            ],
            "totalSupplyFormatted": [
                321
            ],
            "totalSupplyRaw": [
                392
            ],
            "trades": [
                330,
                {
                    "distinct_on": [
                        337,
                        "[Trade_select_column!]"
                    ],
                    "limit": [
                        89
                    ],
                    "offset": [
                        89
                    ],
                    "order_by": [
                        336,
                        "[Trade_order_by!]"
                    ],
                    "where": [
                        333
                    ]
                }
            ],
            "tradingFeeBps": [
                392
            ],
            "__typename": [
                321
            ]
        },
        "MarketRollingStats": {
            "averagePriceFormatted": [
                321
            ],
            "averagePriceRaw": [
                392
            ],
            "id": [
                321
            ],
            "lastUpdatedAt": [
                392
            ],
            "market_id": [
                321
            ],
            "tradeCount": [
                392
            ],
            "volumeFormatted": [
                321
            ],
            "volumeRaw": [
                392
            ],
            "windowSeconds": [
                89
            ],
            "__typename": [
                321
            ]
        },
        "MarketRollingStats_bool_exp": {
            "_and": [
                128
            ],
            "_not": [
                128
            ],
            "_or": [
                128
            ],
            "averagePriceFormatted": [
                323
            ],
            "averagePriceRaw": [
                393
            ],
            "id": [
                323
            ],
            "lastUpdatedAt": [
                393
            ],
            "market_id": [
                323
            ],
            "tradeCount": [
                393
            ],
            "volumeFormatted": [
                323
            ],
            "volumeRaw": [
                393
            ],
            "windowSeconds": [
                91
            ],
            "__typename": [
                321
            ]
        },
        "MarketRollingStats_order_by": {
            "averagePriceFormatted": [
                394
            ],
            "averagePriceRaw": [
                394
            ],
            "id": [
                394
            ],
            "lastUpdatedAt": [
                394
            ],
            "market_id": [
                394
            ],
            "tradeCount": [
                394
            ],
            "volumeFormatted": [
                394
            ],
            "volumeRaw": [
                394
            ],
            "windowSeconds": [
                394
            ],
            "__typename": [
                321
            ]
        },
        "MarketRollingStats_select_column": {},
        "MarketRollingStats_stream_cursor_input": {
            "initial_value": [
                132
            ],
            "ordering": [
                384
            ],
            "__typename": [
                321
            ]
        },
        "MarketRollingStats_stream_cursor_value_input": {
            "averagePriceFormatted": [
                321
            ],
            "averagePriceRaw": [
                392
            ],
            "id": [
                321
            ],
            "lastUpdatedAt": [
                392
            ],
            "market_id": [
                321
            ],
            "tradeCount": [
                392
            ],
            "volumeFormatted": [
                321
            ],
            "volumeRaw": [
                392
            ],
            "windowSeconds": [
                89
            ],
            "__typename": [
                321
            ]
        },
        "MarketSnapshot": {
            "floorPriceFormatted": [
                321
            ],
            "floorPriceRaw": [
                392
            ],
            "id": [
                321
            ],
            "marketSupplyFormatted": [
                321
            ],
            "marketSupplyRaw": [
                392
            ],
            "market_id": [
                321
            ],
            "priceFormatted": [
                321
            ],
            "priceRaw": [
                392
            ],
            "timestamp": [
                392
            ],
            "totalSupplyFormatted": [
                321
            ],
            "totalSupplyRaw": [
                392
            ],
            "trades24h": [
                392
            ],
            "volume24hFormatted": [
                321
            ],
            "volume24hRaw": [
                392
            ],
            "__typename": [
                321
            ]
        },
        "MarketSnapshot_bool_exp": {
            "_and": [
                134
            ],
            "_not": [
                134
            ],
            "_or": [
                134
            ],
            "floorPriceFormatted": [
                323
            ],
            "floorPriceRaw": [
                393
            ],
            "id": [
                323
            ],
            "marketSupplyFormatted": [
                323
            ],
            "marketSupplyRaw": [
                393
            ],
            "market_id": [
                323
            ],
            "priceFormatted": [
                323
            ],
            "priceRaw": [
                393
            ],
            "timestamp": [
                393
            ],
            "totalSupplyFormatted": [
                323
            ],
            "totalSupplyRaw": [
                393
            ],
            "trades24h": [
                393
            ],
            "volume24hFormatted": [
                323
            ],
            "volume24hRaw": [
                393
            ],
            "__typename": [
                321
            ]
        },
        "MarketSnapshot_order_by": {
            "floorPriceFormatted": [
                394
            ],
            "floorPriceRaw": [
                394
            ],
            "id": [
                394
            ],
            "marketSupplyFormatted": [
                394
            ],
            "marketSupplyRaw": [
                394
            ],
            "market_id": [
                394
            ],
            "priceFormatted": [
                394
            ],
            "priceRaw": [
                394
            ],
            "timestamp": [
                394
            ],
            "totalSupplyFormatted": [
                394
            ],
            "totalSupplyRaw": [
                394
            ],
            "trades24h": [
                394
            ],
            "volume24hFormatted": [
                394
            ],
            "volume24hRaw": [
                394
            ],
            "__typename": [
                321
            ]
        },
        "MarketSnapshot_select_column": {},
        "MarketSnapshot_stream_cursor_input": {
            "initial_value": [
                138
            ],
            "ordering": [
                384
            ],
            "__typename": [
                321
            ]
        },
        "MarketSnapshot_stream_cursor_value_input": {
            "floorPriceFormatted": [
                321
            ],
            "floorPriceRaw": [
                392
            ],
            "id": [
                321
            ],
            "marketSupplyFormatted": [
                321
            ],
            "marketSupplyRaw": [
                392
            ],
            "market_id": [
                321
            ],
            "priceFormatted": [
                321
            ],
            "priceRaw": [
                392
            ],
            "timestamp": [
                392
            ],
            "totalSupplyFormatted": [
                321
            ],
            "totalSupplyRaw": [
                392
            ],
            "trades24h": [
                392
            ],
            "volume24hFormatted": [
                321
            ],
            "volume24hRaw": [
                392
            ],
            "__typename": [
                321
            ]
        },
        "Market_aggregate_order_by": {
            "avg": [
                140
            ],
            "count": [
                394
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
                321
            ]
        },
        "Market_avg_order_by": {
            "buyFeeBps": [
                394
            ],
            "createdAt": [
                394
            ],
            "currentPriceRaw": [
                394
            ],
            "floorPriceRaw": [
                394
            ],
            "floorSupplyRaw": [
                394
            ],
            "initialFloorPriceRaw": [
                394
            ],
            "lastElevationTimestamp": [
                394
            ],
            "lastTradeTimestamp": [
                394
            ],
            "lastUpdatedAt": [
                394
            ],
            "marketSupplyRaw": [
                394
            ],
            "maxLTV": [
                394
            ],
            "sellFeeBps": [
                394
            ],
            "totalSupplyRaw": [
                394
            ],
            "tradingFeeBps": [
                394
            ],
            "__typename": [
                321
            ]
        },
        "Market_bool_exp": {
            "_and": [
                141
            ],
            "_not": [
                141
            ],
            "_or": [
                141
            ],
            "buyFeeBps": [
                393
            ],
            "createdAt": [
                393
            ],
            "creator_id": [
                323
            ],
            "currentPriceFormatted": [
                323
            ],
            "currentPriceRaw": [
                393
            ],
            "factory_id": [
                323
            ],
            "floorElevations": [
                57
            ],
            "floorPriceFormatted": [
                323
            ],
            "floorPriceRaw": [
                393
            ],
            "floorSupplyFormatted": [
                323
            ],
            "floorSupplyRaw": [
                393
            ],
            "id": [
                323
            ],
            "initialFloorPriceFormatted": [
                323
            ],
            "initialFloorPriceRaw": [
                393
            ],
            "isBuyOpen": [
                13
            ],
            "isSellOpen": [
                13
            ],
            "issuanceToken": [
                325
            ],
            "issuanceToken_id": [
                323
            ],
            "lastElevationTimestamp": [
                393
            ],
            "lastTradeTimestamp": [
                393
            ],
            "lastUpdatedAt": [
                393
            ],
            "marketSupplyFormatted": [
                323
            ],
            "marketSupplyRaw": [
                393
            ],
            "maxLTV": [
                393
            ],
            "reserveToken": [
                325
            ],
            "reserveToken_id": [
                323
            ],
            "sellFeeBps": [
                393
            ],
            "status": [
                391
            ],
            "totalSupplyFormatted": [
                323
            ],
            "totalSupplyRaw": [
                393
            ],
            "trades": [
                333
            ],
            "tradingFeeBps": [
                393
            ],
            "__typename": [
                321
            ]
        },
        "Market_max_order_by": {
            "buyFeeBps": [
                394
            ],
            "createdAt": [
                394
            ],
            "creator_id": [
                394
            ],
            "currentPriceFormatted": [
                394
            ],
            "currentPriceRaw": [
                394
            ],
            "factory_id": [
                394
            ],
            "floorPriceFormatted": [
                394
            ],
            "floorPriceRaw": [
                394
            ],
            "floorSupplyFormatted": [
                394
            ],
            "floorSupplyRaw": [
                394
            ],
            "id": [
                394
            ],
            "initialFloorPriceFormatted": [
                394
            ],
            "initialFloorPriceRaw": [
                394
            ],
            "issuanceToken_id": [
                394
            ],
            "lastElevationTimestamp": [
                394
            ],
            "lastTradeTimestamp": [
                394
            ],
            "lastUpdatedAt": [
                394
            ],
            "marketSupplyFormatted": [
                394
            ],
            "marketSupplyRaw": [
                394
            ],
            "maxLTV": [
                394
            ],
            "reserveToken_id": [
                394
            ],
            "sellFeeBps": [
                394
            ],
            "status": [
                394
            ],
            "totalSupplyFormatted": [
                394
            ],
            "totalSupplyRaw": [
                394
            ],
            "tradingFeeBps": [
                394
            ],
            "__typename": [
                321
            ]
        },
        "Market_min_order_by": {
            "buyFeeBps": [
                394
            ],
            "createdAt": [
                394
            ],
            "creator_id": [
                394
            ],
            "currentPriceFormatted": [
                394
            ],
            "currentPriceRaw": [
                394
            ],
            "factory_id": [
                394
            ],
            "floorPriceFormatted": [
                394
            ],
            "floorPriceRaw": [
                394
            ],
            "floorSupplyFormatted": [
                394
            ],
            "floorSupplyRaw": [
                394
            ],
            "id": [
                394
            ],
            "initialFloorPriceFormatted": [
                394
            ],
            "initialFloorPriceRaw": [
                394
            ],
            "issuanceToken_id": [
                394
            ],
            "lastElevationTimestamp": [
                394
            ],
            "lastTradeTimestamp": [
                394
            ],
            "lastUpdatedAt": [
                394
            ],
            "marketSupplyFormatted": [
                394
            ],
            "marketSupplyRaw": [
                394
            ],
            "maxLTV": [
                394
            ],
            "reserveToken_id": [
                394
            ],
            "sellFeeBps": [
                394
            ],
            "status": [
                394
            ],
            "totalSupplyFormatted": [
                394
            ],
            "totalSupplyRaw": [
                394
            ],
            "tradingFeeBps": [
                394
            ],
            "__typename": [
                321
            ]
        },
        "Market_order_by": {
            "buyFeeBps": [
                394
            ],
            "createdAt": [
                394
            ],
            "creator_id": [
                394
            ],
            "currentPriceFormatted": [
                394
            ],
            "currentPriceRaw": [
                394
            ],
            "factory_id": [
                394
            ],
            "floorElevations_aggregate": [
                55
            ],
            "floorPriceFormatted": [
                394
            ],
            "floorPriceRaw": [
                394
            ],
            "floorSupplyFormatted": [
                394
            ],
            "floorSupplyRaw": [
                394
            ],
            "id": [
                394
            ],
            "initialFloorPriceFormatted": [
                394
            ],
            "initialFloorPriceRaw": [
                394
            ],
            "isBuyOpen": [
                394
            ],
            "isSellOpen": [
                394
            ],
            "issuanceToken": [
                326
            ],
            "issuanceToken_id": [
                394
            ],
            "lastElevationTimestamp": [
                394
            ],
            "lastTradeTimestamp": [
                394
            ],
            "lastUpdatedAt": [
                394
            ],
            "marketSupplyFormatted": [
                394
            ],
            "marketSupplyRaw": [
                394
            ],
            "maxLTV": [
                394
            ],
            "reserveToken": [
                326
            ],
            "reserveToken_id": [
                394
            ],
            "sellFeeBps": [
                394
            ],
            "status": [
                394
            ],
            "totalSupplyFormatted": [
                394
            ],
            "totalSupplyRaw": [
                394
            ],
            "trades_aggregate": [
                331
            ],
            "tradingFeeBps": [
                394
            ],
            "__typename": [
                321
            ]
        },
        "Market_select_column": {},
        "Market_stddev_order_by": {
            "buyFeeBps": [
                394
            ],
            "createdAt": [
                394
            ],
            "currentPriceRaw": [
                394
            ],
            "floorPriceRaw": [
                394
            ],
            "floorSupplyRaw": [
                394
            ],
            "initialFloorPriceRaw": [
                394
            ],
            "lastElevationTimestamp": [
                394
            ],
            "lastTradeTimestamp": [
                394
            ],
            "lastUpdatedAt": [
                394
            ],
            "marketSupplyRaw": [
                394
            ],
            "maxLTV": [
                394
            ],
            "sellFeeBps": [
                394
            ],
            "totalSupplyRaw": [
                394
            ],
            "tradingFeeBps": [
                394
            ],
            "__typename": [
                321
            ]
        },
        "Market_stddev_pop_order_by": {
            "buyFeeBps": [
                394
            ],
            "createdAt": [
                394
            ],
            "currentPriceRaw": [
                394
            ],
            "floorPriceRaw": [
                394
            ],
            "floorSupplyRaw": [
                394
            ],
            "initialFloorPriceRaw": [
                394
            ],
            "lastElevationTimestamp": [
                394
            ],
            "lastTradeTimestamp": [
                394
            ],
            "lastUpdatedAt": [
                394
            ],
            "marketSupplyRaw": [
                394
            ],
            "maxLTV": [
                394
            ],
            "sellFeeBps": [
                394
            ],
            "totalSupplyRaw": [
                394
            ],
            "tradingFeeBps": [
                394
            ],
            "__typename": [
                321
            ]
        },
        "Market_stddev_samp_order_by": {
            "buyFeeBps": [
                394
            ],
            "createdAt": [
                394
            ],
            "currentPriceRaw": [
                394
            ],
            "floorPriceRaw": [
                394
            ],
            "floorSupplyRaw": [
                394
            ],
            "initialFloorPriceRaw": [
                394
            ],
            "lastElevationTimestamp": [
                394
            ],
            "lastTradeTimestamp": [
                394
            ],
            "lastUpdatedAt": [
                394
            ],
            "marketSupplyRaw": [
                394
            ],
            "maxLTV": [
                394
            ],
            "sellFeeBps": [
                394
            ],
            "totalSupplyRaw": [
                394
            ],
            "tradingFeeBps": [
                394
            ],
            "__typename": [
                321
            ]
        },
        "Market_stream_cursor_input": {
            "initial_value": [
                150
            ],
            "ordering": [
                384
            ],
            "__typename": [
                321
            ]
        },
        "Market_stream_cursor_value_input": {
            "buyFeeBps": [
                392
            ],
            "createdAt": [
                392
            ],
            "creator_id": [
                321
            ],
            "currentPriceFormatted": [
                321
            ],
            "currentPriceRaw": [
                392
            ],
            "factory_id": [
                321
            ],
            "floorPriceFormatted": [
                321
            ],
            "floorPriceRaw": [
                392
            ],
            "floorSupplyFormatted": [
                321
            ],
            "floorSupplyRaw": [
                392
            ],
            "id": [
                321
            ],
            "initialFloorPriceFormatted": [
                321
            ],
            "initialFloorPriceRaw": [
                392
            ],
            "isBuyOpen": [
                12
            ],
            "isSellOpen": [
                12
            ],
            "issuanceToken_id": [
                321
            ],
            "lastElevationTimestamp": [
                392
            ],
            "lastTradeTimestamp": [
                392
            ],
            "lastUpdatedAt": [
                392
            ],
            "marketSupplyFormatted": [
                321
            ],
            "marketSupplyRaw": [
                392
            ],
            "maxLTV": [
                392
            ],
            "reserveToken_id": [
                321
            ],
            "sellFeeBps": [
                392
            ],
            "status": [
                390
            ],
            "totalSupplyFormatted": [
                321
            ],
            "totalSupplyRaw": [
                392
            ],
            "tradingFeeBps": [
                392
            ],
            "__typename": [
                321
            ]
        },
        "Market_sum_order_by": {
            "buyFeeBps": [
                394
            ],
            "createdAt": [
                394
            ],
            "currentPriceRaw": [
                394
            ],
            "floorPriceRaw": [
                394
            ],
            "floorSupplyRaw": [
                394
            ],
            "initialFloorPriceRaw": [
                394
            ],
            "lastElevationTimestamp": [
                394
            ],
            "lastTradeTimestamp": [
                394
            ],
            "lastUpdatedAt": [
                394
            ],
            "marketSupplyRaw": [
                394
            ],
            "maxLTV": [
                394
            ],
            "sellFeeBps": [
                394
            ],
            "totalSupplyRaw": [
                394
            ],
            "tradingFeeBps": [
                394
            ],
            "__typename": [
                321
            ]
        },
        "Market_var_pop_order_by": {
            "buyFeeBps": [
                394
            ],
            "createdAt": [
                394
            ],
            "currentPriceRaw": [
                394
            ],
            "floorPriceRaw": [
                394
            ],
            "floorSupplyRaw": [
                394
            ],
            "initialFloorPriceRaw": [
                394
            ],
            "lastElevationTimestamp": [
                394
            ],
            "lastTradeTimestamp": [
                394
            ],
            "lastUpdatedAt": [
                394
            ],
            "marketSupplyRaw": [
                394
            ],
            "maxLTV": [
                394
            ],
            "sellFeeBps": [
                394
            ],
            "totalSupplyRaw": [
                394
            ],
            "tradingFeeBps": [
                394
            ],
            "__typename": [
                321
            ]
        },
        "Market_var_samp_order_by": {
            "buyFeeBps": [
                394
            ],
            "createdAt": [
                394
            ],
            "currentPriceRaw": [
                394
            ],
            "floorPriceRaw": [
                394
            ],
            "floorSupplyRaw": [
                394
            ],
            "initialFloorPriceRaw": [
                394
            ],
            "lastElevationTimestamp": [
                394
            ],
            "lastTradeTimestamp": [
                394
            ],
            "lastUpdatedAt": [
                394
            ],
            "marketSupplyRaw": [
                394
            ],
            "maxLTV": [
                394
            ],
            "sellFeeBps": [
                394
            ],
            "totalSupplyRaw": [
                394
            ],
            "tradingFeeBps": [
                394
            ],
            "__typename": [
                321
            ]
        },
        "Market_variance_order_by": {
            "buyFeeBps": [
                394
            ],
            "createdAt": [
                394
            ],
            "currentPriceRaw": [
                394
            ],
            "floorPriceRaw": [
                394
            ],
            "floorSupplyRaw": [
                394
            ],
            "initialFloorPriceRaw": [
                394
            ],
            "lastElevationTimestamp": [
                394
            ],
            "lastTradeTimestamp": [
                394
            ],
            "lastUpdatedAt": [
                394
            ],
            "marketSupplyRaw": [
                394
            ],
            "maxLTV": [
                394
            ],
            "sellFeeBps": [
                394
            ],
            "totalSupplyRaw": [
                394
            ],
            "tradingFeeBps": [
                394
            ],
            "__typename": [
                321
            ]
        },
        "ModuleAddress": {
            "createdAt": [
                392
            ],
            "id": [
                321
            ],
            "lastUpdatedAt": [
                392
            ],
            "market_id": [
                321
            ],
            "moduleType": [
                321
            ],
            "__typename": [
                321
            ]
        },
        "ModuleAddress_bool_exp": {
            "_and": [
                156
            ],
            "_not": [
                156
            ],
            "_or": [
                156
            ],
            "createdAt": [
                393
            ],
            "id": [
                323
            ],
            "lastUpdatedAt": [
                393
            ],
            "market_id": [
                323
            ],
            "moduleType": [
                323
            ],
            "__typename": [
                321
            ]
        },
        "ModuleAddress_order_by": {
            "createdAt": [
                394
            ],
            "id": [
                394
            ],
            "lastUpdatedAt": [
                394
            ],
            "market_id": [
                394
            ],
            "moduleType": [
                394
            ],
            "__typename": [
                321
            ]
        },
        "ModuleAddress_select_column": {},
        "ModuleAddress_stream_cursor_input": {
            "initial_value": [
                160
            ],
            "ordering": [
                384
            ],
            "__typename": [
                321
            ]
        },
        "ModuleAddress_stream_cursor_value_input": {
            "createdAt": [
                392
            ],
            "id": [
                321
            ],
            "lastUpdatedAt": [
                392
            ],
            "market_id": [
                321
            ],
            "moduleType": [
                321
            ],
            "__typename": [
                321
            ]
        },
        "ModuleRegistry": {
            "authorizer": [
                321
            ],
            "createdAt": [
                392
            ],
            "creditFacility": [
                321
            ],
            "feeTreasury": [
                321
            ],
            "floor": [
                321
            ],
            "id": [
                321
            ],
            "lastUpdatedAt": [
                392
            ],
            "presale": [
                321
            ],
            "staking": [
                321
            ],
            "__typename": [
                321
            ]
        },
        "ModuleRegistry_bool_exp": {
            "_and": [
                162
            ],
            "_not": [
                162
            ],
            "_or": [
                162
            ],
            "authorizer": [
                323
            ],
            "createdAt": [
                393
            ],
            "creditFacility": [
                323
            ],
            "feeTreasury": [
                323
            ],
            "floor": [
                323
            ],
            "id": [
                323
            ],
            "lastUpdatedAt": [
                393
            ],
            "presale": [
                323
            ],
            "staking": [
                323
            ],
            "__typename": [
                321
            ]
        },
        "ModuleRegistry_order_by": {
            "authorizer": [
                394
            ],
            "createdAt": [
                394
            ],
            "creditFacility": [
                394
            ],
            "feeTreasury": [
                394
            ],
            "floor": [
                394
            ],
            "id": [
                394
            ],
            "lastUpdatedAt": [
                394
            ],
            "presale": [
                394
            ],
            "staking": [
                394
            ],
            "__typename": [
                321
            ]
        },
        "ModuleRegistry_select_column": {},
        "ModuleRegistry_stream_cursor_input": {
            "initial_value": [
                166
            ],
            "ordering": [
                384
            ],
            "__typename": [
                321
            ]
        },
        "ModuleRegistry_stream_cursor_value_input": {
            "authorizer": [
                321
            ],
            "createdAt": [
                392
            ],
            "creditFacility": [
                321
            ],
            "feeTreasury": [
                321
            ],
            "floor": [
                321
            ],
            "id": [
                321
            ],
            "lastUpdatedAt": [
                392
            ],
            "presale": [
                321
            ],
            "staking": [
                321
            ],
            "__typename": [
                321
            ]
        },
        "PreSaleContract": {
            "authorizer": [
                321
            ],
            "claims": [
                173,
                {
                    "distinct_on": [
                        180,
                        "[PresaleClaim_select_column!]"
                    ],
                    "limit": [
                        89
                    ],
                    "offset": [
                        89
                    ],
                    "order_by": [
                        179,
                        "[PresaleClaim_order_by!]"
                    ],
                    "where": [
                        176
                    ]
                }
            ],
            "commissionBps": [
                321
            ],
            "createdAt": [
                392
            ],
            "currentState": [
                89
            ],
            "decayDuration": [
                392
            ],
            "decayStartTime": [
                392
            ],
            "endTime": [
                392
            ],
            "feeTreasury": [
                321
            ],
            "globalDepositCapFormatted": [
                321
            ],
            "globalDepositCapRaw": [
                392
            ],
            "id": [
                321
            ],
            "initialMultiplier": [
                392
            ],
            "lastUpdatedAt": [
                392
            ],
            "lendingFacility": [
                321
            ],
            "market_id": [
                321
            ],
            "maxLeverage": [
                392
            ],
            "merkleRoot": [
                321
            ],
            "participations": [
                190,
                {
                    "distinct_on": [
                        197,
                        "[PresaleParticipation_select_column!]"
                    ],
                    "limit": [
                        89
                    ],
                    "offset": [
                        89
                    ],
                    "order_by": [
                        196,
                        "[PresaleParticipation_order_by!]"
                    ],
                    "where": [
                        193
                    ]
                }
            ],
            "perAddressDepositCapFormatted": [
                321
            ],
            "perAddressDepositCapRaw": [
                392
            ],
            "priceBreakpointOffsets": [
                89
            ],
            "priceBreakpointsFlat": [
                321
            ],
            "purchaseToken": [
                324
            ],
            "purchaseToken_id": [
                321
            ],
            "saleToken": [
                324
            ],
            "saleToken_id": [
                321
            ],
            "startTime": [
                392
            ],
            "timeSafeguardTs": [
                392
            ],
            "totalParticipants": [
                392
            ],
            "totalRaisedFormatted": [
                321
            ],
            "totalRaisedRaw": [
                392
            ],
            "whitelistSize": [
                392
            ],
            "whitelistedAddresses": [
                321
            ],
            "__typename": [
                321
            ]
        },
        "PreSaleContract_bool_exp": {
            "_and": [
                168
            ],
            "_not": [
                168
            ],
            "_or": [
                168
            ],
            "authorizer": [
                323
            ],
            "claims": [
                176
            ],
            "commissionBps": [
                322
            ],
            "createdAt": [
                393
            ],
            "currentState": [
                91
            ],
            "decayDuration": [
                393
            ],
            "decayStartTime": [
                393
            ],
            "endTime": [
                393
            ],
            "feeTreasury": [
                323
            ],
            "globalDepositCapFormatted": [
                323
            ],
            "globalDepositCapRaw": [
                393
            ],
            "id": [
                323
            ],
            "initialMultiplier": [
                393
            ],
            "lastUpdatedAt": [
                393
            ],
            "lendingFacility": [
                323
            ],
            "market_id": [
                323
            ],
            "maxLeverage": [
                393
            ],
            "merkleRoot": [
                323
            ],
            "participations": [
                193
            ],
            "perAddressDepositCapFormatted": [
                323
            ],
            "perAddressDepositCapRaw": [
                393
            ],
            "priceBreakpointOffsets": [
                90
            ],
            "priceBreakpointsFlat": [
                322
            ],
            "purchaseToken": [
                325
            ],
            "purchaseToken_id": [
                323
            ],
            "saleToken": [
                325
            ],
            "saleToken_id": [
                323
            ],
            "startTime": [
                393
            ],
            "timeSafeguardTs": [
                393
            ],
            "totalParticipants": [
                393
            ],
            "totalRaisedFormatted": [
                323
            ],
            "totalRaisedRaw": [
                393
            ],
            "whitelistSize": [
                393
            ],
            "whitelistedAddresses": [
                322
            ],
            "__typename": [
                321
            ]
        },
        "PreSaleContract_order_by": {
            "authorizer": [
                394
            ],
            "claims_aggregate": [
                174
            ],
            "commissionBps": [
                394
            ],
            "createdAt": [
                394
            ],
            "currentState": [
                394
            ],
            "decayDuration": [
                394
            ],
            "decayStartTime": [
                394
            ],
            "endTime": [
                394
            ],
            "feeTreasury": [
                394
            ],
            "globalDepositCapFormatted": [
                394
            ],
            "globalDepositCapRaw": [
                394
            ],
            "id": [
                394
            ],
            "initialMultiplier": [
                394
            ],
            "lastUpdatedAt": [
                394
            ],
            "lendingFacility": [
                394
            ],
            "market_id": [
                394
            ],
            "maxLeverage": [
                394
            ],
            "merkleRoot": [
                394
            ],
            "participations_aggregate": [
                191
            ],
            "perAddressDepositCapFormatted": [
                394
            ],
            "perAddressDepositCapRaw": [
                394
            ],
            "priceBreakpointOffsets": [
                394
            ],
            "priceBreakpointsFlat": [
                394
            ],
            "purchaseToken": [
                326
            ],
            "purchaseToken_id": [
                394
            ],
            "saleToken": [
                326
            ],
            "saleToken_id": [
                394
            ],
            "startTime": [
                394
            ],
            "timeSafeguardTs": [
                394
            ],
            "totalParticipants": [
                394
            ],
            "totalRaisedFormatted": [
                394
            ],
            "totalRaisedRaw": [
                394
            ],
            "whitelistSize": [
                394
            ],
            "whitelistedAddresses": [
                394
            ],
            "__typename": [
                321
            ]
        },
        "PreSaleContract_select_column": {},
        "PreSaleContract_stream_cursor_input": {
            "initial_value": [
                172
            ],
            "ordering": [
                384
            ],
            "__typename": [
                321
            ]
        },
        "PreSaleContract_stream_cursor_value_input": {
            "authorizer": [
                321
            ],
            "commissionBps": [
                321
            ],
            "createdAt": [
                392
            ],
            "currentState": [
                89
            ],
            "decayDuration": [
                392
            ],
            "decayStartTime": [
                392
            ],
            "endTime": [
                392
            ],
            "feeTreasury": [
                321
            ],
            "globalDepositCapFormatted": [
                321
            ],
            "globalDepositCapRaw": [
                392
            ],
            "id": [
                321
            ],
            "initialMultiplier": [
                392
            ],
            "lastUpdatedAt": [
                392
            ],
            "lendingFacility": [
                321
            ],
            "market_id": [
                321
            ],
            "maxLeverage": [
                392
            ],
            "merkleRoot": [
                321
            ],
            "perAddressDepositCapFormatted": [
                321
            ],
            "perAddressDepositCapRaw": [
                392
            ],
            "priceBreakpointOffsets": [
                89
            ],
            "priceBreakpointsFlat": [
                321
            ],
            "purchaseToken_id": [
                321
            ],
            "saleToken_id": [
                321
            ],
            "startTime": [
                392
            ],
            "timeSafeguardTs": [
                392
            ],
            "totalParticipants": [
                392
            ],
            "totalRaisedFormatted": [
                321
            ],
            "totalRaisedRaw": [
                392
            ],
            "whitelistSize": [
                392
            ],
            "whitelistedAddresses": [
                321
            ],
            "__typename": [
                321
            ]
        },
        "PresaleClaim": {
            "amountFormatted": [
                321
            ],
            "amountRaw": [
                392
            ],
            "claimType": [
                395
            ],
            "id": [
                321
            ],
            "loanId": [
                392
            ],
            "positionId": [
                392
            ],
            "presale_id": [
                321
            ],
            "timestamp": [
                392
            ],
            "trancheIndex": [
                392
            ],
            "transactionHash": [
                321
            ],
            "__typename": [
                321
            ]
        },
        "PresaleClaim_aggregate_order_by": {
            "avg": [
                175
            ],
            "count": [
                394
            ],
            "max": [
                177
            ],
            "min": [
                178
            ],
            "stddev": [
                181
            ],
            "stddev_pop": [
                182
            ],
            "stddev_samp": [
                183
            ],
            "sum": [
                186
            ],
            "var_pop": [
                187
            ],
            "var_samp": [
                188
            ],
            "variance": [
                189
            ],
            "__typename": [
                321
            ]
        },
        "PresaleClaim_avg_order_by": {
            "amountRaw": [
                394
            ],
            "loanId": [
                394
            ],
            "positionId": [
                394
            ],
            "timestamp": [
                394
            ],
            "trancheIndex": [
                394
            ],
            "__typename": [
                321
            ]
        },
        "PresaleClaim_bool_exp": {
            "_and": [
                176
            ],
            "_not": [
                176
            ],
            "_or": [
                176
            ],
            "amountFormatted": [
                323
            ],
            "amountRaw": [
                393
            ],
            "claimType": [
                396
            ],
            "id": [
                323
            ],
            "loanId": [
                393
            ],
            "positionId": [
                393
            ],
            "presale_id": [
                323
            ],
            "timestamp": [
                393
            ],
            "trancheIndex": [
                393
            ],
            "transactionHash": [
                323
            ],
            "__typename": [
                321
            ]
        },
        "PresaleClaim_max_order_by": {
            "amountFormatted": [
                394
            ],
            "amountRaw": [
                394
            ],
            "claimType": [
                394
            ],
            "id": [
                394
            ],
            "loanId": [
                394
            ],
            "positionId": [
                394
            ],
            "presale_id": [
                394
            ],
            "timestamp": [
                394
            ],
            "trancheIndex": [
                394
            ],
            "transactionHash": [
                394
            ],
            "__typename": [
                321
            ]
        },
        "PresaleClaim_min_order_by": {
            "amountFormatted": [
                394
            ],
            "amountRaw": [
                394
            ],
            "claimType": [
                394
            ],
            "id": [
                394
            ],
            "loanId": [
                394
            ],
            "positionId": [
                394
            ],
            "presale_id": [
                394
            ],
            "timestamp": [
                394
            ],
            "trancheIndex": [
                394
            ],
            "transactionHash": [
                394
            ],
            "__typename": [
                321
            ]
        },
        "PresaleClaim_order_by": {
            "amountFormatted": [
                394
            ],
            "amountRaw": [
                394
            ],
            "claimType": [
                394
            ],
            "id": [
                394
            ],
            "loanId": [
                394
            ],
            "positionId": [
                394
            ],
            "presale_id": [
                394
            ],
            "timestamp": [
                394
            ],
            "trancheIndex": [
                394
            ],
            "transactionHash": [
                394
            ],
            "__typename": [
                321
            ]
        },
        "PresaleClaim_select_column": {},
        "PresaleClaim_stddev_order_by": {
            "amountRaw": [
                394
            ],
            "loanId": [
                394
            ],
            "positionId": [
                394
            ],
            "timestamp": [
                394
            ],
            "trancheIndex": [
                394
            ],
            "__typename": [
                321
            ]
        },
        "PresaleClaim_stddev_pop_order_by": {
            "amountRaw": [
                394
            ],
            "loanId": [
                394
            ],
            "positionId": [
                394
            ],
            "timestamp": [
                394
            ],
            "trancheIndex": [
                394
            ],
            "__typename": [
                321
            ]
        },
        "PresaleClaim_stddev_samp_order_by": {
            "amountRaw": [
                394
            ],
            "loanId": [
                394
            ],
            "positionId": [
                394
            ],
            "timestamp": [
                394
            ],
            "trancheIndex": [
                394
            ],
            "__typename": [
                321
            ]
        },
        "PresaleClaim_stream_cursor_input": {
            "initial_value": [
                185
            ],
            "ordering": [
                384
            ],
            "__typename": [
                321
            ]
        },
        "PresaleClaim_stream_cursor_value_input": {
            "amountFormatted": [
                321
            ],
            "amountRaw": [
                392
            ],
            "claimType": [
                395
            ],
            "id": [
                321
            ],
            "loanId": [
                392
            ],
            "positionId": [
                392
            ],
            "presale_id": [
                321
            ],
            "timestamp": [
                392
            ],
            "trancheIndex": [
                392
            ],
            "transactionHash": [
                321
            ],
            "__typename": [
                321
            ]
        },
        "PresaleClaim_sum_order_by": {
            "amountRaw": [
                394
            ],
            "loanId": [
                394
            ],
            "positionId": [
                394
            ],
            "timestamp": [
                394
            ],
            "trancheIndex": [
                394
            ],
            "__typename": [
                321
            ]
        },
        "PresaleClaim_var_pop_order_by": {
            "amountRaw": [
                394
            ],
            "loanId": [
                394
            ],
            "positionId": [
                394
            ],
            "timestamp": [
                394
            ],
            "trancheIndex": [
                394
            ],
            "__typename": [
                321
            ]
        },
        "PresaleClaim_var_samp_order_by": {
            "amountRaw": [
                394
            ],
            "loanId": [
                394
            ],
            "positionId": [
                394
            ],
            "timestamp": [
                394
            ],
            "trancheIndex": [
                394
            ],
            "__typename": [
                321
            ]
        },
        "PresaleClaim_variance_order_by": {
            "amountRaw": [
                394
            ],
            "loanId": [
                394
            ],
            "positionId": [
                394
            ],
            "timestamp": [
                394
            ],
            "trancheIndex": [
                394
            ],
            "__typename": [
                321
            ]
        },
        "PresaleParticipation": {
            "depositAmountFormatted": [
                321
            ],
            "depositAmountRaw": [
                392
            ],
            "id": [
                321
            ],
            "leverage": [
                392
            ],
            "loopCount": [
                392
            ],
            "mintedAmountFormatted": [
                321
            ],
            "mintedAmountRaw": [
                392
            ],
            "positionId": [
                392
            ],
            "presale_id": [
                321
            ],
            "timestamp": [
                392
            ],
            "transactionHash": [
                321
            ],
            "user_id": [
                321
            ],
            "__typename": [
                321
            ]
        },
        "PresaleParticipation_aggregate_order_by": {
            "avg": [
                192
            ],
            "count": [
                394
            ],
            "max": [
                194
            ],
            "min": [
                195
            ],
            "stddev": [
                198
            ],
            "stddev_pop": [
                199
            ],
            "stddev_samp": [
                200
            ],
            "sum": [
                203
            ],
            "var_pop": [
                204
            ],
            "var_samp": [
                205
            ],
            "variance": [
                206
            ],
            "__typename": [
                321
            ]
        },
        "PresaleParticipation_avg_order_by": {
            "depositAmountRaw": [
                394
            ],
            "leverage": [
                394
            ],
            "loopCount": [
                394
            ],
            "mintedAmountRaw": [
                394
            ],
            "positionId": [
                394
            ],
            "timestamp": [
                394
            ],
            "__typename": [
                321
            ]
        },
        "PresaleParticipation_bool_exp": {
            "_and": [
                193
            ],
            "_not": [
                193
            ],
            "_or": [
                193
            ],
            "depositAmountFormatted": [
                323
            ],
            "depositAmountRaw": [
                393
            ],
            "id": [
                323
            ],
            "leverage": [
                393
            ],
            "loopCount": [
                393
            ],
            "mintedAmountFormatted": [
                323
            ],
            "mintedAmountRaw": [
                393
            ],
            "positionId": [
                393
            ],
            "presale_id": [
                323
            ],
            "timestamp": [
                393
            ],
            "transactionHash": [
                323
            ],
            "user_id": [
                323
            ],
            "__typename": [
                321
            ]
        },
        "PresaleParticipation_max_order_by": {
            "depositAmountFormatted": [
                394
            ],
            "depositAmountRaw": [
                394
            ],
            "id": [
                394
            ],
            "leverage": [
                394
            ],
            "loopCount": [
                394
            ],
            "mintedAmountFormatted": [
                394
            ],
            "mintedAmountRaw": [
                394
            ],
            "positionId": [
                394
            ],
            "presale_id": [
                394
            ],
            "timestamp": [
                394
            ],
            "transactionHash": [
                394
            ],
            "user_id": [
                394
            ],
            "__typename": [
                321
            ]
        },
        "PresaleParticipation_min_order_by": {
            "depositAmountFormatted": [
                394
            ],
            "depositAmountRaw": [
                394
            ],
            "id": [
                394
            ],
            "leverage": [
                394
            ],
            "loopCount": [
                394
            ],
            "mintedAmountFormatted": [
                394
            ],
            "mintedAmountRaw": [
                394
            ],
            "positionId": [
                394
            ],
            "presale_id": [
                394
            ],
            "timestamp": [
                394
            ],
            "transactionHash": [
                394
            ],
            "user_id": [
                394
            ],
            "__typename": [
                321
            ]
        },
        "PresaleParticipation_order_by": {
            "depositAmountFormatted": [
                394
            ],
            "depositAmountRaw": [
                394
            ],
            "id": [
                394
            ],
            "leverage": [
                394
            ],
            "loopCount": [
                394
            ],
            "mintedAmountFormatted": [
                394
            ],
            "mintedAmountRaw": [
                394
            ],
            "positionId": [
                394
            ],
            "presale_id": [
                394
            ],
            "timestamp": [
                394
            ],
            "transactionHash": [
                394
            ],
            "user_id": [
                394
            ],
            "__typename": [
                321
            ]
        },
        "PresaleParticipation_select_column": {},
        "PresaleParticipation_stddev_order_by": {
            "depositAmountRaw": [
                394
            ],
            "leverage": [
                394
            ],
            "loopCount": [
                394
            ],
            "mintedAmountRaw": [
                394
            ],
            "positionId": [
                394
            ],
            "timestamp": [
                394
            ],
            "__typename": [
                321
            ]
        },
        "PresaleParticipation_stddev_pop_order_by": {
            "depositAmountRaw": [
                394
            ],
            "leverage": [
                394
            ],
            "loopCount": [
                394
            ],
            "mintedAmountRaw": [
                394
            ],
            "positionId": [
                394
            ],
            "timestamp": [
                394
            ],
            "__typename": [
                321
            ]
        },
        "PresaleParticipation_stddev_samp_order_by": {
            "depositAmountRaw": [
                394
            ],
            "leverage": [
                394
            ],
            "loopCount": [
                394
            ],
            "mintedAmountRaw": [
                394
            ],
            "positionId": [
                394
            ],
            "timestamp": [
                394
            ],
            "__typename": [
                321
            ]
        },
        "PresaleParticipation_stream_cursor_input": {
            "initial_value": [
                202
            ],
            "ordering": [
                384
            ],
            "__typename": [
                321
            ]
        },
        "PresaleParticipation_stream_cursor_value_input": {
            "depositAmountFormatted": [
                321
            ],
            "depositAmountRaw": [
                392
            ],
            "id": [
                321
            ],
            "leverage": [
                392
            ],
            "loopCount": [
                392
            ],
            "mintedAmountFormatted": [
                321
            ],
            "mintedAmountRaw": [
                392
            ],
            "positionId": [
                392
            ],
            "presale_id": [
                321
            ],
            "timestamp": [
                392
            ],
            "transactionHash": [
                321
            ],
            "user_id": [
                321
            ],
            "__typename": [
                321
            ]
        },
        "PresaleParticipation_sum_order_by": {
            "depositAmountRaw": [
                394
            ],
            "leverage": [
                394
            ],
            "loopCount": [
                394
            ],
            "mintedAmountRaw": [
                394
            ],
            "positionId": [
                394
            ],
            "timestamp": [
                394
            ],
            "__typename": [
                321
            ]
        },
        "PresaleParticipation_var_pop_order_by": {
            "depositAmountRaw": [
                394
            ],
            "leverage": [
                394
            ],
            "loopCount": [
                394
            ],
            "mintedAmountRaw": [
                394
            ],
            "positionId": [
                394
            ],
            "timestamp": [
                394
            ],
            "__typename": [
                321
            ]
        },
        "PresaleParticipation_var_samp_order_by": {
            "depositAmountRaw": [
                394
            ],
            "leverage": [
                394
            ],
            "loopCount": [
                394
            ],
            "mintedAmountRaw": [
                394
            ],
            "positionId": [
                394
            ],
            "timestamp": [
                394
            ],
            "__typename": [
                321
            ]
        },
        "PresaleParticipation_variance_order_by": {
            "depositAmountRaw": [
                394
            ],
            "leverage": [
                394
            ],
            "loopCount": [
                394
            ],
            "mintedAmountRaw": [
                394
            ],
            "positionId": [
                394
            ],
            "timestamp": [
                394
            ],
            "__typename": [
                321
            ]
        },
        "PriceCandle": {
            "closeFormatted": [
                321
            ],
            "closeRaw": [
                392
            ],
            "highFormatted": [
                321
            ],
            "highRaw": [
                392
            ],
            "id": [
                321
            ],
            "lowFormatted": [
                321
            ],
            "lowRaw": [
                392
            ],
            "market_id": [
                321
            ],
            "openFormatted": [
                321
            ],
            "openRaw": [
                392
            ],
            "period": [
                376
            ],
            "timestamp": [
                392
            ],
            "trades": [
                392
            ],
            "volumeFormatted": [
                321
            ],
            "volumeRaw": [
                392
            ],
            "__typename": [
                321
            ]
        },
        "PriceCandle_bool_exp": {
            "_and": [
                208
            ],
            "_not": [
                208
            ],
            "_or": [
                208
            ],
            "closeFormatted": [
                323
            ],
            "closeRaw": [
                393
            ],
            "highFormatted": [
                323
            ],
            "highRaw": [
                393
            ],
            "id": [
                323
            ],
            "lowFormatted": [
                323
            ],
            "lowRaw": [
                393
            ],
            "market_id": [
                323
            ],
            "openFormatted": [
                323
            ],
            "openRaw": [
                393
            ],
            "period": [
                377
            ],
            "timestamp": [
                393
            ],
            "trades": [
                393
            ],
            "volumeFormatted": [
                323
            ],
            "volumeRaw": [
                393
            ],
            "__typename": [
                321
            ]
        },
        "PriceCandle_order_by": {
            "closeFormatted": [
                394
            ],
            "closeRaw": [
                394
            ],
            "highFormatted": [
                394
            ],
            "highRaw": [
                394
            ],
            "id": [
                394
            ],
            "lowFormatted": [
                394
            ],
            "lowRaw": [
                394
            ],
            "market_id": [
                394
            ],
            "openFormatted": [
                394
            ],
            "openRaw": [
                394
            ],
            "period": [
                394
            ],
            "timestamp": [
                394
            ],
            "trades": [
                394
            ],
            "volumeFormatted": [
                394
            ],
            "volumeRaw": [
                394
            ],
            "__typename": [
                321
            ]
        },
        "PriceCandle_select_column": {},
        "PriceCandle_stream_cursor_input": {
            "initial_value": [
                212
            ],
            "ordering": [
                384
            ],
            "__typename": [
                321
            ]
        },
        "PriceCandle_stream_cursor_value_input": {
            "closeFormatted": [
                321
            ],
            "closeRaw": [
                392
            ],
            "highFormatted": [
                321
            ],
            "highRaw": [
                392
            ],
            "id": [
                321
            ],
            "lowFormatted": [
                321
            ],
            "lowRaw": [
                392
            ],
            "market_id": [
                321
            ],
            "openFormatted": [
                321
            ],
            "openRaw": [
                392
            ],
            "period": [
                376
            ],
            "timestamp": [
                392
            ],
            "trades": [
                392
            ],
            "volumeFormatted": [
                321
            ],
            "volumeRaw": [
                392
            ],
            "__typename": [
                321
            ]
        },
        "Role": {
            "adminRole": [
                321
            ],
            "adminRoleName": [
                321
            ],
            "authorizer_id": [
                321
            ],
            "createdAt": [
                392
            ],
            "id": [
                321
            ],
            "isAdminBurned": [
                12
            ],
            "lastUpdatedAt": [
                392
            ],
            "members": [
                214,
                {
                    "distinct_on": [
                        221,
                        "[RoleMember_select_column!]"
                    ],
                    "limit": [
                        89
                    ],
                    "offset": [
                        89
                    ],
                    "order_by": [
                        220,
                        "[RoleMember_order_by!]"
                    ],
                    "where": [
                        217
                    ]
                }
            ],
            "name": [
                321
            ],
            "permissions": [
                231,
                {
                    "distinct_on": [
                        238,
                        "[RolePermission_select_column!]"
                    ],
                    "limit": [
                        89
                    ],
                    "offset": [
                        89
                    ],
                    "order_by": [
                        237,
                        "[RolePermission_order_by!]"
                    ],
                    "where": [
                        234
                    ]
                }
            ],
            "roleId": [
                321
            ],
            "__typename": [
                321
            ]
        },
        "RoleMember": {
            "grantedAt": [
                392
            ],
            "grantedBy": [
                321
            ],
            "id": [
                321
            ],
            "member": [
                321
            ],
            "role_id": [
                321
            ],
            "transactionHash": [
                321
            ],
            "__typename": [
                321
            ]
        },
        "RoleMember_aggregate_order_by": {
            "avg": [
                216
            ],
            "count": [
                394
            ],
            "max": [
                218
            ],
            "min": [
                219
            ],
            "stddev": [
                222
            ],
            "stddev_pop": [
                223
            ],
            "stddev_samp": [
                224
            ],
            "sum": [
                227
            ],
            "var_pop": [
                228
            ],
            "var_samp": [
                229
            ],
            "variance": [
                230
            ],
            "__typename": [
                321
            ]
        },
        "RoleMember_avg_order_by": {
            "grantedAt": [
                394
            ],
            "__typename": [
                321
            ]
        },
        "RoleMember_bool_exp": {
            "_and": [
                217
            ],
            "_not": [
                217
            ],
            "_or": [
                217
            ],
            "grantedAt": [
                393
            ],
            "grantedBy": [
                323
            ],
            "id": [
                323
            ],
            "member": [
                323
            ],
            "role_id": [
                323
            ],
            "transactionHash": [
                323
            ],
            "__typename": [
                321
            ]
        },
        "RoleMember_max_order_by": {
            "grantedAt": [
                394
            ],
            "grantedBy": [
                394
            ],
            "id": [
                394
            ],
            "member": [
                394
            ],
            "role_id": [
                394
            ],
            "transactionHash": [
                394
            ],
            "__typename": [
                321
            ]
        },
        "RoleMember_min_order_by": {
            "grantedAt": [
                394
            ],
            "grantedBy": [
                394
            ],
            "id": [
                394
            ],
            "member": [
                394
            ],
            "role_id": [
                394
            ],
            "transactionHash": [
                394
            ],
            "__typename": [
                321
            ]
        },
        "RoleMember_order_by": {
            "grantedAt": [
                394
            ],
            "grantedBy": [
                394
            ],
            "id": [
                394
            ],
            "member": [
                394
            ],
            "role_id": [
                394
            ],
            "transactionHash": [
                394
            ],
            "__typename": [
                321
            ]
        },
        "RoleMember_select_column": {},
        "RoleMember_stddev_order_by": {
            "grantedAt": [
                394
            ],
            "__typename": [
                321
            ]
        },
        "RoleMember_stddev_pop_order_by": {
            "grantedAt": [
                394
            ],
            "__typename": [
                321
            ]
        },
        "RoleMember_stddev_samp_order_by": {
            "grantedAt": [
                394
            ],
            "__typename": [
                321
            ]
        },
        "RoleMember_stream_cursor_input": {
            "initial_value": [
                226
            ],
            "ordering": [
                384
            ],
            "__typename": [
                321
            ]
        },
        "RoleMember_stream_cursor_value_input": {
            "grantedAt": [
                392
            ],
            "grantedBy": [
                321
            ],
            "id": [
                321
            ],
            "member": [
                321
            ],
            "role_id": [
                321
            ],
            "transactionHash": [
                321
            ],
            "__typename": [
                321
            ]
        },
        "RoleMember_sum_order_by": {
            "grantedAt": [
                394
            ],
            "__typename": [
                321
            ]
        },
        "RoleMember_var_pop_order_by": {
            "grantedAt": [
                394
            ],
            "__typename": [
                321
            ]
        },
        "RoleMember_var_samp_order_by": {
            "grantedAt": [
                394
            ],
            "__typename": [
                321
            ]
        },
        "RoleMember_variance_order_by": {
            "grantedAt": [
                394
            ],
            "__typename": [
                321
            ]
        },
        "RolePermission": {
            "addedAt": [
                392
            ],
            "id": [
                321
            ],
            "role_id": [
                321
            ],
            "selector": [
                321
            ],
            "selectorName": [
                321
            ],
            "target": [
                321
            ],
            "transactionHash": [
                321
            ],
            "__typename": [
                321
            ]
        },
        "RolePermission_aggregate_order_by": {
            "avg": [
                233
            ],
            "count": [
                394
            ],
            "max": [
                235
            ],
            "min": [
                236
            ],
            "stddev": [
                239
            ],
            "stddev_pop": [
                240
            ],
            "stddev_samp": [
                241
            ],
            "sum": [
                244
            ],
            "var_pop": [
                245
            ],
            "var_samp": [
                246
            ],
            "variance": [
                247
            ],
            "__typename": [
                321
            ]
        },
        "RolePermission_avg_order_by": {
            "addedAt": [
                394
            ],
            "__typename": [
                321
            ]
        },
        "RolePermission_bool_exp": {
            "_and": [
                234
            ],
            "_not": [
                234
            ],
            "_or": [
                234
            ],
            "addedAt": [
                393
            ],
            "id": [
                323
            ],
            "role_id": [
                323
            ],
            "selector": [
                323
            ],
            "selectorName": [
                323
            ],
            "target": [
                323
            ],
            "transactionHash": [
                323
            ],
            "__typename": [
                321
            ]
        },
        "RolePermission_max_order_by": {
            "addedAt": [
                394
            ],
            "id": [
                394
            ],
            "role_id": [
                394
            ],
            "selector": [
                394
            ],
            "selectorName": [
                394
            ],
            "target": [
                394
            ],
            "transactionHash": [
                394
            ],
            "__typename": [
                321
            ]
        },
        "RolePermission_min_order_by": {
            "addedAt": [
                394
            ],
            "id": [
                394
            ],
            "role_id": [
                394
            ],
            "selector": [
                394
            ],
            "selectorName": [
                394
            ],
            "target": [
                394
            ],
            "transactionHash": [
                394
            ],
            "__typename": [
                321
            ]
        },
        "RolePermission_order_by": {
            "addedAt": [
                394
            ],
            "id": [
                394
            ],
            "role_id": [
                394
            ],
            "selector": [
                394
            ],
            "selectorName": [
                394
            ],
            "target": [
                394
            ],
            "transactionHash": [
                394
            ],
            "__typename": [
                321
            ]
        },
        "RolePermission_select_column": {},
        "RolePermission_stddev_order_by": {
            "addedAt": [
                394
            ],
            "__typename": [
                321
            ]
        },
        "RolePermission_stddev_pop_order_by": {
            "addedAt": [
                394
            ],
            "__typename": [
                321
            ]
        },
        "RolePermission_stddev_samp_order_by": {
            "addedAt": [
                394
            ],
            "__typename": [
                321
            ]
        },
        "RolePermission_stream_cursor_input": {
            "initial_value": [
                243
            ],
            "ordering": [
                384
            ],
            "__typename": [
                321
            ]
        },
        "RolePermission_stream_cursor_value_input": {
            "addedAt": [
                392
            ],
            "id": [
                321
            ],
            "role_id": [
                321
            ],
            "selector": [
                321
            ],
            "selectorName": [
                321
            ],
            "target": [
                321
            ],
            "transactionHash": [
                321
            ],
            "__typename": [
                321
            ]
        },
        "RolePermission_sum_order_by": {
            "addedAt": [
                394
            ],
            "__typename": [
                321
            ]
        },
        "RolePermission_var_pop_order_by": {
            "addedAt": [
                394
            ],
            "__typename": [
                321
            ]
        },
        "RolePermission_var_samp_order_by": {
            "addedAt": [
                394
            ],
            "__typename": [
                321
            ]
        },
        "RolePermission_variance_order_by": {
            "addedAt": [
                394
            ],
            "__typename": [
                321
            ]
        },
        "Role_aggregate_order_by": {
            "avg": [
                249
            ],
            "count": [
                394
            ],
            "max": [
                251
            ],
            "min": [
                252
            ],
            "stddev": [
                255
            ],
            "stddev_pop": [
                256
            ],
            "stddev_samp": [
                257
            ],
            "sum": [
                260
            ],
            "var_pop": [
                261
            ],
            "var_samp": [
                262
            ],
            "variance": [
                263
            ],
            "__typename": [
                321
            ]
        },
        "Role_avg_order_by": {
            "createdAt": [
                394
            ],
            "lastUpdatedAt": [
                394
            ],
            "__typename": [
                321
            ]
        },
        "Role_bool_exp": {
            "_and": [
                250
            ],
            "_not": [
                250
            ],
            "_or": [
                250
            ],
            "adminRole": [
                323
            ],
            "adminRoleName": [
                323
            ],
            "authorizer_id": [
                323
            ],
            "createdAt": [
                393
            ],
            "id": [
                323
            ],
            "isAdminBurned": [
                13
            ],
            "lastUpdatedAt": [
                393
            ],
            "members": [
                217
            ],
            "name": [
                323
            ],
            "permissions": [
                234
            ],
            "roleId": [
                323
            ],
            "__typename": [
                321
            ]
        },
        "Role_max_order_by": {
            "adminRole": [
                394
            ],
            "adminRoleName": [
                394
            ],
            "authorizer_id": [
                394
            ],
            "createdAt": [
                394
            ],
            "id": [
                394
            ],
            "lastUpdatedAt": [
                394
            ],
            "name": [
                394
            ],
            "roleId": [
                394
            ],
            "__typename": [
                321
            ]
        },
        "Role_min_order_by": {
            "adminRole": [
                394
            ],
            "adminRoleName": [
                394
            ],
            "authorizer_id": [
                394
            ],
            "createdAt": [
                394
            ],
            "id": [
                394
            ],
            "lastUpdatedAt": [
                394
            ],
            "name": [
                394
            ],
            "roleId": [
                394
            ],
            "__typename": [
                321
            ]
        },
        "Role_order_by": {
            "adminRole": [
                394
            ],
            "adminRoleName": [
                394
            ],
            "authorizer_id": [
                394
            ],
            "createdAt": [
                394
            ],
            "id": [
                394
            ],
            "isAdminBurned": [
                394
            ],
            "lastUpdatedAt": [
                394
            ],
            "members_aggregate": [
                215
            ],
            "name": [
                394
            ],
            "permissions_aggregate": [
                232
            ],
            "roleId": [
                394
            ],
            "__typename": [
                321
            ]
        },
        "Role_select_column": {},
        "Role_stddev_order_by": {
            "createdAt": [
                394
            ],
            "lastUpdatedAt": [
                394
            ],
            "__typename": [
                321
            ]
        },
        "Role_stddev_pop_order_by": {
            "createdAt": [
                394
            ],
            "lastUpdatedAt": [
                394
            ],
            "__typename": [
                321
            ]
        },
        "Role_stddev_samp_order_by": {
            "createdAt": [
                394
            ],
            "lastUpdatedAt": [
                394
            ],
            "__typename": [
                321
            ]
        },
        "Role_stream_cursor_input": {
            "initial_value": [
                259
            ],
            "ordering": [
                384
            ],
            "__typename": [
                321
            ]
        },
        "Role_stream_cursor_value_input": {
            "adminRole": [
                321
            ],
            "adminRoleName": [
                321
            ],
            "authorizer_id": [
                321
            ],
            "createdAt": [
                392
            ],
            "id": [
                321
            ],
            "isAdminBurned": [
                12
            ],
            "lastUpdatedAt": [
                392
            ],
            "name": [
                321
            ],
            "roleId": [
                321
            ],
            "__typename": [
                321
            ]
        },
        "Role_sum_order_by": {
            "createdAt": [
                394
            ],
            "lastUpdatedAt": [
                394
            ],
            "__typename": [
                321
            ]
        },
        "Role_var_pop_order_by": {
            "createdAt": [
                394
            ],
            "lastUpdatedAt": [
                394
            ],
            "__typename": [
                321
            ]
        },
        "Role_var_samp_order_by": {
            "createdAt": [
                394
            ],
            "lastUpdatedAt": [
                394
            ],
            "__typename": [
                321
            ]
        },
        "Role_variance_order_by": {
            "createdAt": [
                394
            ],
            "lastUpdatedAt": [
                394
            ],
            "__typename": [
                321
            ]
        },
        "StakePosition": {
            "activities": [
                281,
                {
                    "distinct_on": [
                        288,
                        "[StakingActivity_select_column!]"
                    ],
                    "limit": [
                        89
                    ],
                    "offset": [
                        89
                    ],
                    "order_by": [
                        287,
                        "[StakingActivity_order_by!]"
                    ],
                    "where": [
                        284
                    ]
                }
            ],
            "collateralDeployedFormatted": [
                321
            ],
            "collateralDeployedRaw": [
                392
            ],
            "createdAt": [
                392
            ],
            "floorPriceAtStakeFormatted": [
                321
            ],
            "floorPriceAtStakeRaw": [
                392
            ],
            "id": [
                321
            ],
            "issuanceTokenAmountFormatted": [
                321
            ],
            "issuanceTokenAmountRaw": [
                392
            ],
            "lastUpdatedAt": [
                392
            ],
            "stakingManager_id": [
                321
            ],
            "status": [
                405
            ],
            "strategy_id": [
                321
            ],
            "totalFeePaidFormatted": [
                321
            ],
            "totalFeePaidRaw": [
                392
            ],
            "totalYieldHarvestedFormatted": [
                321
            ],
            "totalYieldHarvestedRaw": [
                392
            ],
            "transactionHash": [
                321
            ],
            "user_id": [
                321
            ],
            "__typename": [
                321
            ]
        },
        "StakePosition_aggregate_order_by": {
            "avg": [
                266
            ],
            "count": [
                394
            ],
            "max": [
                268
            ],
            "min": [
                269
            ],
            "stddev": [
                272
            ],
            "stddev_pop": [
                273
            ],
            "stddev_samp": [
                274
            ],
            "sum": [
                277
            ],
            "var_pop": [
                278
            ],
            "var_samp": [
                279
            ],
            "variance": [
                280
            ],
            "__typename": [
                321
            ]
        },
        "StakePosition_avg_order_by": {
            "collateralDeployedRaw": [
                394
            ],
            "createdAt": [
                394
            ],
            "floorPriceAtStakeRaw": [
                394
            ],
            "issuanceTokenAmountRaw": [
                394
            ],
            "lastUpdatedAt": [
                394
            ],
            "totalFeePaidRaw": [
                394
            ],
            "totalYieldHarvestedRaw": [
                394
            ],
            "__typename": [
                321
            ]
        },
        "StakePosition_bool_exp": {
            "_and": [
                267
            ],
            "_not": [
                267
            ],
            "_or": [
                267
            ],
            "activities": [
                284
            ],
            "collateralDeployedFormatted": [
                323
            ],
            "collateralDeployedRaw": [
                393
            ],
            "createdAt": [
                393
            ],
            "floorPriceAtStakeFormatted": [
                323
            ],
            "floorPriceAtStakeRaw": [
                393
            ],
            "id": [
                323
            ],
            "issuanceTokenAmountFormatted": [
                323
            ],
            "issuanceTokenAmountRaw": [
                393
            ],
            "lastUpdatedAt": [
                393
            ],
            "stakingManager_id": [
                323
            ],
            "status": [
                406
            ],
            "strategy_id": [
                323
            ],
            "totalFeePaidFormatted": [
                323
            ],
            "totalFeePaidRaw": [
                393
            ],
            "totalYieldHarvestedFormatted": [
                323
            ],
            "totalYieldHarvestedRaw": [
                393
            ],
            "transactionHash": [
                323
            ],
            "user_id": [
                323
            ],
            "__typename": [
                321
            ]
        },
        "StakePosition_max_order_by": {
            "collateralDeployedFormatted": [
                394
            ],
            "collateralDeployedRaw": [
                394
            ],
            "createdAt": [
                394
            ],
            "floorPriceAtStakeFormatted": [
                394
            ],
            "floorPriceAtStakeRaw": [
                394
            ],
            "id": [
                394
            ],
            "issuanceTokenAmountFormatted": [
                394
            ],
            "issuanceTokenAmountRaw": [
                394
            ],
            "lastUpdatedAt": [
                394
            ],
            "stakingManager_id": [
                394
            ],
            "status": [
                394
            ],
            "strategy_id": [
                394
            ],
            "totalFeePaidFormatted": [
                394
            ],
            "totalFeePaidRaw": [
                394
            ],
            "totalYieldHarvestedFormatted": [
                394
            ],
            "totalYieldHarvestedRaw": [
                394
            ],
            "transactionHash": [
                394
            ],
            "user_id": [
                394
            ],
            "__typename": [
                321
            ]
        },
        "StakePosition_min_order_by": {
            "collateralDeployedFormatted": [
                394
            ],
            "collateralDeployedRaw": [
                394
            ],
            "createdAt": [
                394
            ],
            "floorPriceAtStakeFormatted": [
                394
            ],
            "floorPriceAtStakeRaw": [
                394
            ],
            "id": [
                394
            ],
            "issuanceTokenAmountFormatted": [
                394
            ],
            "issuanceTokenAmountRaw": [
                394
            ],
            "lastUpdatedAt": [
                394
            ],
            "stakingManager_id": [
                394
            ],
            "status": [
                394
            ],
            "strategy_id": [
                394
            ],
            "totalFeePaidFormatted": [
                394
            ],
            "totalFeePaidRaw": [
                394
            ],
            "totalYieldHarvestedFormatted": [
                394
            ],
            "totalYieldHarvestedRaw": [
                394
            ],
            "transactionHash": [
                394
            ],
            "user_id": [
                394
            ],
            "__typename": [
                321
            ]
        },
        "StakePosition_order_by": {
            "activities_aggregate": [
                282
            ],
            "collateralDeployedFormatted": [
                394
            ],
            "collateralDeployedRaw": [
                394
            ],
            "createdAt": [
                394
            ],
            "floorPriceAtStakeFormatted": [
                394
            ],
            "floorPriceAtStakeRaw": [
                394
            ],
            "id": [
                394
            ],
            "issuanceTokenAmountFormatted": [
                394
            ],
            "issuanceTokenAmountRaw": [
                394
            ],
            "lastUpdatedAt": [
                394
            ],
            "stakingManager_id": [
                394
            ],
            "status": [
                394
            ],
            "strategy_id": [
                394
            ],
            "totalFeePaidFormatted": [
                394
            ],
            "totalFeePaidRaw": [
                394
            ],
            "totalYieldHarvestedFormatted": [
                394
            ],
            "totalYieldHarvestedRaw": [
                394
            ],
            "transactionHash": [
                394
            ],
            "user_id": [
                394
            ],
            "__typename": [
                321
            ]
        },
        "StakePosition_select_column": {},
        "StakePosition_stddev_order_by": {
            "collateralDeployedRaw": [
                394
            ],
            "createdAt": [
                394
            ],
            "floorPriceAtStakeRaw": [
                394
            ],
            "issuanceTokenAmountRaw": [
                394
            ],
            "lastUpdatedAt": [
                394
            ],
            "totalFeePaidRaw": [
                394
            ],
            "totalYieldHarvestedRaw": [
                394
            ],
            "__typename": [
                321
            ]
        },
        "StakePosition_stddev_pop_order_by": {
            "collateralDeployedRaw": [
                394
            ],
            "createdAt": [
                394
            ],
            "floorPriceAtStakeRaw": [
                394
            ],
            "issuanceTokenAmountRaw": [
                394
            ],
            "lastUpdatedAt": [
                394
            ],
            "totalFeePaidRaw": [
                394
            ],
            "totalYieldHarvestedRaw": [
                394
            ],
            "__typename": [
                321
            ]
        },
        "StakePosition_stddev_samp_order_by": {
            "collateralDeployedRaw": [
                394
            ],
            "createdAt": [
                394
            ],
            "floorPriceAtStakeRaw": [
                394
            ],
            "issuanceTokenAmountRaw": [
                394
            ],
            "lastUpdatedAt": [
                394
            ],
            "totalFeePaidRaw": [
                394
            ],
            "totalYieldHarvestedRaw": [
                394
            ],
            "__typename": [
                321
            ]
        },
        "StakePosition_stream_cursor_input": {
            "initial_value": [
                276
            ],
            "ordering": [
                384
            ],
            "__typename": [
                321
            ]
        },
        "StakePosition_stream_cursor_value_input": {
            "collateralDeployedFormatted": [
                321
            ],
            "collateralDeployedRaw": [
                392
            ],
            "createdAt": [
                392
            ],
            "floorPriceAtStakeFormatted": [
                321
            ],
            "floorPriceAtStakeRaw": [
                392
            ],
            "id": [
                321
            ],
            "issuanceTokenAmountFormatted": [
                321
            ],
            "issuanceTokenAmountRaw": [
                392
            ],
            "lastUpdatedAt": [
                392
            ],
            "stakingManager_id": [
                321
            ],
            "status": [
                405
            ],
            "strategy_id": [
                321
            ],
            "totalFeePaidFormatted": [
                321
            ],
            "totalFeePaidRaw": [
                392
            ],
            "totalYieldHarvestedFormatted": [
                321
            ],
            "totalYieldHarvestedRaw": [
                392
            ],
            "transactionHash": [
                321
            ],
            "user_id": [
                321
            ],
            "__typename": [
                321
            ]
        },
        "StakePosition_sum_order_by": {
            "collateralDeployedRaw": [
                394
            ],
            "createdAt": [
                394
            ],
            "floorPriceAtStakeRaw": [
                394
            ],
            "issuanceTokenAmountRaw": [
                394
            ],
            "lastUpdatedAt": [
                394
            ],
            "totalFeePaidRaw": [
                394
            ],
            "totalYieldHarvestedRaw": [
                394
            ],
            "__typename": [
                321
            ]
        },
        "StakePosition_var_pop_order_by": {
            "collateralDeployedRaw": [
                394
            ],
            "createdAt": [
                394
            ],
            "floorPriceAtStakeRaw": [
                394
            ],
            "issuanceTokenAmountRaw": [
                394
            ],
            "lastUpdatedAt": [
                394
            ],
            "totalFeePaidRaw": [
                394
            ],
            "totalYieldHarvestedRaw": [
                394
            ],
            "__typename": [
                321
            ]
        },
        "StakePosition_var_samp_order_by": {
            "collateralDeployedRaw": [
                394
            ],
            "createdAt": [
                394
            ],
            "floorPriceAtStakeRaw": [
                394
            ],
            "issuanceTokenAmountRaw": [
                394
            ],
            "lastUpdatedAt": [
                394
            ],
            "totalFeePaidRaw": [
                394
            ],
            "totalYieldHarvestedRaw": [
                394
            ],
            "__typename": [
                321
            ]
        },
        "StakePosition_variance_order_by": {
            "collateralDeployedRaw": [
                394
            ],
            "createdAt": [
                394
            ],
            "floorPriceAtStakeRaw": [
                394
            ],
            "issuanceTokenAmountRaw": [
                394
            ],
            "lastUpdatedAt": [
                394
            ],
            "totalFeePaidRaw": [
                394
            ],
            "totalYieldHarvestedRaw": [
                394
            ],
            "__typename": [
                321
            ]
        },
        "StakingActivity": {
            "activityType": [
                407
            ],
            "collateralAmountFormatted": [
                321
            ],
            "collateralAmountRaw": [
                392
            ],
            "feeAmountFormatted": [
                321
            ],
            "feeAmountRaw": [
                392
            ],
            "id": [
                321
            ],
            "issuanceTokenAmountFormatted": [
                321
            ],
            "issuanceTokenAmountRaw": [
                392
            ],
            "position_id": [
                321
            ],
            "stakingManager_id": [
                321
            ],
            "timestamp": [
                392
            ],
            "transactionHash": [
                321
            ],
            "user_id": [
                321
            ],
            "yieldAmountFormatted": [
                321
            ],
            "yieldAmountRaw": [
                392
            ],
            "__typename": [
                321
            ]
        },
        "StakingActivity_aggregate_order_by": {
            "avg": [
                283
            ],
            "count": [
                394
            ],
            "max": [
                285
            ],
            "min": [
                286
            ],
            "stddev": [
                289
            ],
            "stddev_pop": [
                290
            ],
            "stddev_samp": [
                291
            ],
            "sum": [
                294
            ],
            "var_pop": [
                295
            ],
            "var_samp": [
                296
            ],
            "variance": [
                297
            ],
            "__typename": [
                321
            ]
        },
        "StakingActivity_avg_order_by": {
            "collateralAmountRaw": [
                394
            ],
            "feeAmountRaw": [
                394
            ],
            "issuanceTokenAmountRaw": [
                394
            ],
            "timestamp": [
                394
            ],
            "yieldAmountRaw": [
                394
            ],
            "__typename": [
                321
            ]
        },
        "StakingActivity_bool_exp": {
            "_and": [
                284
            ],
            "_not": [
                284
            ],
            "_or": [
                284
            ],
            "activityType": [
                408
            ],
            "collateralAmountFormatted": [
                323
            ],
            "collateralAmountRaw": [
                393
            ],
            "feeAmountFormatted": [
                323
            ],
            "feeAmountRaw": [
                393
            ],
            "id": [
                323
            ],
            "issuanceTokenAmountFormatted": [
                323
            ],
            "issuanceTokenAmountRaw": [
                393
            ],
            "position_id": [
                323
            ],
            "stakingManager_id": [
                323
            ],
            "timestamp": [
                393
            ],
            "transactionHash": [
                323
            ],
            "user_id": [
                323
            ],
            "yieldAmountFormatted": [
                323
            ],
            "yieldAmountRaw": [
                393
            ],
            "__typename": [
                321
            ]
        },
        "StakingActivity_max_order_by": {
            "activityType": [
                394
            ],
            "collateralAmountFormatted": [
                394
            ],
            "collateralAmountRaw": [
                394
            ],
            "feeAmountFormatted": [
                394
            ],
            "feeAmountRaw": [
                394
            ],
            "id": [
                394
            ],
            "issuanceTokenAmountFormatted": [
                394
            ],
            "issuanceTokenAmountRaw": [
                394
            ],
            "position_id": [
                394
            ],
            "stakingManager_id": [
                394
            ],
            "timestamp": [
                394
            ],
            "transactionHash": [
                394
            ],
            "user_id": [
                394
            ],
            "yieldAmountFormatted": [
                394
            ],
            "yieldAmountRaw": [
                394
            ],
            "__typename": [
                321
            ]
        },
        "StakingActivity_min_order_by": {
            "activityType": [
                394
            ],
            "collateralAmountFormatted": [
                394
            ],
            "collateralAmountRaw": [
                394
            ],
            "feeAmountFormatted": [
                394
            ],
            "feeAmountRaw": [
                394
            ],
            "id": [
                394
            ],
            "issuanceTokenAmountFormatted": [
                394
            ],
            "issuanceTokenAmountRaw": [
                394
            ],
            "position_id": [
                394
            ],
            "stakingManager_id": [
                394
            ],
            "timestamp": [
                394
            ],
            "transactionHash": [
                394
            ],
            "user_id": [
                394
            ],
            "yieldAmountFormatted": [
                394
            ],
            "yieldAmountRaw": [
                394
            ],
            "__typename": [
                321
            ]
        },
        "StakingActivity_order_by": {
            "activityType": [
                394
            ],
            "collateralAmountFormatted": [
                394
            ],
            "collateralAmountRaw": [
                394
            ],
            "feeAmountFormatted": [
                394
            ],
            "feeAmountRaw": [
                394
            ],
            "id": [
                394
            ],
            "issuanceTokenAmountFormatted": [
                394
            ],
            "issuanceTokenAmountRaw": [
                394
            ],
            "position_id": [
                394
            ],
            "stakingManager_id": [
                394
            ],
            "timestamp": [
                394
            ],
            "transactionHash": [
                394
            ],
            "user_id": [
                394
            ],
            "yieldAmountFormatted": [
                394
            ],
            "yieldAmountRaw": [
                394
            ],
            "__typename": [
                321
            ]
        },
        "StakingActivity_select_column": {},
        "StakingActivity_stddev_order_by": {
            "collateralAmountRaw": [
                394
            ],
            "feeAmountRaw": [
                394
            ],
            "issuanceTokenAmountRaw": [
                394
            ],
            "timestamp": [
                394
            ],
            "yieldAmountRaw": [
                394
            ],
            "__typename": [
                321
            ]
        },
        "StakingActivity_stddev_pop_order_by": {
            "collateralAmountRaw": [
                394
            ],
            "feeAmountRaw": [
                394
            ],
            "issuanceTokenAmountRaw": [
                394
            ],
            "timestamp": [
                394
            ],
            "yieldAmountRaw": [
                394
            ],
            "__typename": [
                321
            ]
        },
        "StakingActivity_stddev_samp_order_by": {
            "collateralAmountRaw": [
                394
            ],
            "feeAmountRaw": [
                394
            ],
            "issuanceTokenAmountRaw": [
                394
            ],
            "timestamp": [
                394
            ],
            "yieldAmountRaw": [
                394
            ],
            "__typename": [
                321
            ]
        },
        "StakingActivity_stream_cursor_input": {
            "initial_value": [
                293
            ],
            "ordering": [
                384
            ],
            "__typename": [
                321
            ]
        },
        "StakingActivity_stream_cursor_value_input": {
            "activityType": [
                407
            ],
            "collateralAmountFormatted": [
                321
            ],
            "collateralAmountRaw": [
                392
            ],
            "feeAmountFormatted": [
                321
            ],
            "feeAmountRaw": [
                392
            ],
            "id": [
                321
            ],
            "issuanceTokenAmountFormatted": [
                321
            ],
            "issuanceTokenAmountRaw": [
                392
            ],
            "position_id": [
                321
            ],
            "stakingManager_id": [
                321
            ],
            "timestamp": [
                392
            ],
            "transactionHash": [
                321
            ],
            "user_id": [
                321
            ],
            "yieldAmountFormatted": [
                321
            ],
            "yieldAmountRaw": [
                392
            ],
            "__typename": [
                321
            ]
        },
        "StakingActivity_sum_order_by": {
            "collateralAmountRaw": [
                394
            ],
            "feeAmountRaw": [
                394
            ],
            "issuanceTokenAmountRaw": [
                394
            ],
            "timestamp": [
                394
            ],
            "yieldAmountRaw": [
                394
            ],
            "__typename": [
                321
            ]
        },
        "StakingActivity_var_pop_order_by": {
            "collateralAmountRaw": [
                394
            ],
            "feeAmountRaw": [
                394
            ],
            "issuanceTokenAmountRaw": [
                394
            ],
            "timestamp": [
                394
            ],
            "yieldAmountRaw": [
                394
            ],
            "__typename": [
                321
            ]
        },
        "StakingActivity_var_samp_order_by": {
            "collateralAmountRaw": [
                394
            ],
            "feeAmountRaw": [
                394
            ],
            "issuanceTokenAmountRaw": [
                394
            ],
            "timestamp": [
                394
            ],
            "yieldAmountRaw": [
                394
            ],
            "__typename": [
                321
            ]
        },
        "StakingActivity_variance_order_by": {
            "collateralAmountRaw": [
                394
            ],
            "feeAmountRaw": [
                394
            ],
            "issuanceTokenAmountRaw": [
                394
            ],
            "timestamp": [
                394
            ],
            "yieldAmountRaw": [
                394
            ],
            "__typename": [
                321
            ]
        },
        "StakingManager": {
            "createdAt": [
                392
            ],
            "id": [
                321
            ],
            "lastUpdatedAt": [
                392
            ],
            "market_id": [
                321
            ],
            "performanceFeeBps": [
                392
            ],
            "positions": [
                264,
                {
                    "distinct_on": [
                        271,
                        "[StakePosition_select_column!]"
                    ],
                    "limit": [
                        89
                    ],
                    "offset": [
                        89
                    ],
                    "order_by": [
                        270,
                        "[StakePosition_order_by!]"
                    ],
                    "where": [
                        267
                    ]
                }
            ],
            "strategies": [
                304,
                {
                    "distinct_on": [
                        311,
                        "[Strategy_select_column!]"
                    ],
                    "limit": [
                        89
                    ],
                    "offset": [
                        89
                    ],
                    "order_by": [
                        310,
                        "[Strategy_order_by!]"
                    ],
                    "where": [
                        307
                    ]
                }
            ],
            "totalCollateralDeployedFormatted": [
                321
            ],
            "totalCollateralDeployedRaw": [
                392
            ],
            "totalFeesCapturedFormatted": [
                321
            ],
            "totalFeesCapturedRaw": [
                392
            ],
            "totalStakedIssuanceFormatted": [
                321
            ],
            "totalStakedIssuanceRaw": [
                392
            ],
            "totalYieldHarvestedFormatted": [
                321
            ],
            "totalYieldHarvestedRaw": [
                392
            ],
            "__typename": [
                321
            ]
        },
        "StakingManager_bool_exp": {
            "_and": [
                299
            ],
            "_not": [
                299
            ],
            "_or": [
                299
            ],
            "createdAt": [
                393
            ],
            "id": [
                323
            ],
            "lastUpdatedAt": [
                393
            ],
            "market_id": [
                323
            ],
            "performanceFeeBps": [
                393
            ],
            "positions": [
                267
            ],
            "strategies": [
                307
            ],
            "totalCollateralDeployedFormatted": [
                323
            ],
            "totalCollateralDeployedRaw": [
                393
            ],
            "totalFeesCapturedFormatted": [
                323
            ],
            "totalFeesCapturedRaw": [
                393
            ],
            "totalStakedIssuanceFormatted": [
                323
            ],
            "totalStakedIssuanceRaw": [
                393
            ],
            "totalYieldHarvestedFormatted": [
                323
            ],
            "totalYieldHarvestedRaw": [
                393
            ],
            "__typename": [
                321
            ]
        },
        "StakingManager_order_by": {
            "createdAt": [
                394
            ],
            "id": [
                394
            ],
            "lastUpdatedAt": [
                394
            ],
            "market_id": [
                394
            ],
            "performanceFeeBps": [
                394
            ],
            "positions_aggregate": [
                265
            ],
            "strategies_aggregate": [
                305
            ],
            "totalCollateralDeployedFormatted": [
                394
            ],
            "totalCollateralDeployedRaw": [
                394
            ],
            "totalFeesCapturedFormatted": [
                394
            ],
            "totalFeesCapturedRaw": [
                394
            ],
            "totalStakedIssuanceFormatted": [
                394
            ],
            "totalStakedIssuanceRaw": [
                394
            ],
            "totalYieldHarvestedFormatted": [
                394
            ],
            "totalYieldHarvestedRaw": [
                394
            ],
            "__typename": [
                321
            ]
        },
        "StakingManager_select_column": {},
        "StakingManager_stream_cursor_input": {
            "initial_value": [
                303
            ],
            "ordering": [
                384
            ],
            "__typename": [
                321
            ]
        },
        "StakingManager_stream_cursor_value_input": {
            "createdAt": [
                392
            ],
            "id": [
                321
            ],
            "lastUpdatedAt": [
                392
            ],
            "market_id": [
                321
            ],
            "performanceFeeBps": [
                392
            ],
            "totalCollateralDeployedFormatted": [
                321
            ],
            "totalCollateralDeployedRaw": [
                392
            ],
            "totalFeesCapturedFormatted": [
                321
            ],
            "totalFeesCapturedRaw": [
                392
            ],
            "totalStakedIssuanceFormatted": [
                321
            ],
            "totalStakedIssuanceRaw": [
                392
            ],
            "totalYieldHarvestedFormatted": [
                321
            ],
            "totalYieldHarvestedRaw": [
                392
            ],
            "__typename": [
                321
            ]
        },
        "Strategy": {
            "addedAt": [
                392
            ],
            "id": [
                321
            ],
            "isActive": [
                12
            ],
            "positions": [
                264,
                {
                    "distinct_on": [
                        271,
                        "[StakePosition_select_column!]"
                    ],
                    "limit": [
                        89
                    ],
                    "offset": [
                        89
                    ],
                    "order_by": [
                        270,
                        "[StakePosition_order_by!]"
                    ],
                    "where": [
                        267
                    ]
                }
            ],
            "removedAt": [
                392
            ],
            "stakingManager_id": [
                321
            ],
            "transactionHash": [
                321
            ],
            "__typename": [
                321
            ]
        },
        "Strategy_aggregate_order_by": {
            "avg": [
                306
            ],
            "count": [
                394
            ],
            "max": [
                308
            ],
            "min": [
                309
            ],
            "stddev": [
                312
            ],
            "stddev_pop": [
                313
            ],
            "stddev_samp": [
                314
            ],
            "sum": [
                317
            ],
            "var_pop": [
                318
            ],
            "var_samp": [
                319
            ],
            "variance": [
                320
            ],
            "__typename": [
                321
            ]
        },
        "Strategy_avg_order_by": {
            "addedAt": [
                394
            ],
            "removedAt": [
                394
            ],
            "__typename": [
                321
            ]
        },
        "Strategy_bool_exp": {
            "_and": [
                307
            ],
            "_not": [
                307
            ],
            "_or": [
                307
            ],
            "addedAt": [
                393
            ],
            "id": [
                323
            ],
            "isActive": [
                13
            ],
            "positions": [
                267
            ],
            "removedAt": [
                393
            ],
            "stakingManager_id": [
                323
            ],
            "transactionHash": [
                323
            ],
            "__typename": [
                321
            ]
        },
        "Strategy_max_order_by": {
            "addedAt": [
                394
            ],
            "id": [
                394
            ],
            "removedAt": [
                394
            ],
            "stakingManager_id": [
                394
            ],
            "transactionHash": [
                394
            ],
            "__typename": [
                321
            ]
        },
        "Strategy_min_order_by": {
            "addedAt": [
                394
            ],
            "id": [
                394
            ],
            "removedAt": [
                394
            ],
            "stakingManager_id": [
                394
            ],
            "transactionHash": [
                394
            ],
            "__typename": [
                321
            ]
        },
        "Strategy_order_by": {
            "addedAt": [
                394
            ],
            "id": [
                394
            ],
            "isActive": [
                394
            ],
            "positions_aggregate": [
                265
            ],
            "removedAt": [
                394
            ],
            "stakingManager_id": [
                394
            ],
            "transactionHash": [
                394
            ],
            "__typename": [
                321
            ]
        },
        "Strategy_select_column": {},
        "Strategy_stddev_order_by": {
            "addedAt": [
                394
            ],
            "removedAt": [
                394
            ],
            "__typename": [
                321
            ]
        },
        "Strategy_stddev_pop_order_by": {
            "addedAt": [
                394
            ],
            "removedAt": [
                394
            ],
            "__typename": [
                321
            ]
        },
        "Strategy_stddev_samp_order_by": {
            "addedAt": [
                394
            ],
            "removedAt": [
                394
            ],
            "__typename": [
                321
            ]
        },
        "Strategy_stream_cursor_input": {
            "initial_value": [
                316
            ],
            "ordering": [
                384
            ],
            "__typename": [
                321
            ]
        },
        "Strategy_stream_cursor_value_input": {
            "addedAt": [
                392
            ],
            "id": [
                321
            ],
            "isActive": [
                12
            ],
            "removedAt": [
                392
            ],
            "stakingManager_id": [
                321
            ],
            "transactionHash": [
                321
            ],
            "__typename": [
                321
            ]
        },
        "Strategy_sum_order_by": {
            "addedAt": [
                394
            ],
            "removedAt": [
                394
            ],
            "__typename": [
                321
            ]
        },
        "Strategy_var_pop_order_by": {
            "addedAt": [
                394
            ],
            "removedAt": [
                394
            ],
            "__typename": [
                321
            ]
        },
        "Strategy_var_samp_order_by": {
            "addedAt": [
                394
            ],
            "removedAt": [
                394
            ],
            "__typename": [
                321
            ]
        },
        "Strategy_variance_order_by": {
            "addedAt": [
                394
            ],
            "removedAt": [
                394
            ],
            "__typename": [
                321
            ]
        },
        "String": {},
        "String_array_comparison_exp": {
            "_contained_in": [
                321
            ],
            "_contains": [
                321
            ],
            "_eq": [
                321
            ],
            "_gt": [
                321
            ],
            "_gte": [
                321
            ],
            "_in": [
                321
            ],
            "_is_null": [
                12
            ],
            "_lt": [
                321
            ],
            "_lte": [
                321
            ],
            "_neq": [
                321
            ],
            "_nin": [
                321
            ],
            "__typename": [
                321
            ]
        },
        "String_comparison_exp": {
            "_eq": [
                321
            ],
            "_gt": [
                321
            ],
            "_gte": [
                321
            ],
            "_ilike": [
                321
            ],
            "_in": [
                321
            ],
            "_iregex": [
                321
            ],
            "_is_null": [
                12
            ],
            "_like": [
                321
            ],
            "_lt": [
                321
            ],
            "_lte": [
                321
            ],
            "_neq": [
                321
            ],
            "_nilike": [
                321
            ],
            "_nin": [
                321
            ],
            "_niregex": [
                321
            ],
            "_nlike": [
                321
            ],
            "_nregex": [
                321
            ],
            "_nsimilar": [
                321
            ],
            "_regex": [
                321
            ],
            "_similar": [
                321
            ],
            "__typename": [
                321
            ]
        },
        "Token": {
            "decimals": [
                89
            ],
            "id": [
                321
            ],
            "maxSupplyFormatted": [
                321
            ],
            "maxSupplyRaw": [
                392
            ],
            "name": [
                321
            ],
            "symbol": [
                321
            ],
            "__typename": [
                321
            ]
        },
        "Token_bool_exp": {
            "_and": [
                325
            ],
            "_not": [
                325
            ],
            "_or": [
                325
            ],
            "decimals": [
                91
            ],
            "id": [
                323
            ],
            "maxSupplyFormatted": [
                323
            ],
            "maxSupplyRaw": [
                393
            ],
            "name": [
                323
            ],
            "symbol": [
                323
            ],
            "__typename": [
                321
            ]
        },
        "Token_order_by": {
            "decimals": [
                394
            ],
            "id": [
                394
            ],
            "maxSupplyFormatted": [
                394
            ],
            "maxSupplyRaw": [
                394
            ],
            "name": [
                394
            ],
            "symbol": [
                394
            ],
            "__typename": [
                321
            ]
        },
        "Token_select_column": {},
        "Token_stream_cursor_input": {
            "initial_value": [
                329
            ],
            "ordering": [
                384
            ],
            "__typename": [
                321
            ]
        },
        "Token_stream_cursor_value_input": {
            "decimals": [
                89
            ],
            "id": [
                321
            ],
            "maxSupplyFormatted": [
                321
            ],
            "maxSupplyRaw": [
                392
            ],
            "name": [
                321
            ],
            "symbol": [
                321
            ],
            "__typename": [
                321
            ]
        },
        "Trade": {
            "feeFormatted": [
                321
            ],
            "feeRaw": [
                392
            ],
            "id": [
                321
            ],
            "market_id": [
                321
            ],
            "newPriceFormatted": [
                321
            ],
            "newPriceRaw": [
                392
            ],
            "reserveAmountFormatted": [
                321
            ],
            "reserveAmountRaw": [
                392
            ],
            "timestamp": [
                392
            ],
            "tokenAmountFormatted": [
                321
            ],
            "tokenAmountRaw": [
                392
            ],
            "tradeType": [
                411
            ],
            "transactionHash": [
                321
            ],
            "user_id": [
                321
            ],
            "__typename": [
                321
            ]
        },
        "Trade_aggregate_order_by": {
            "avg": [
                332
            ],
            "count": [
                394
            ],
            "max": [
                334
            ],
            "min": [
                335
            ],
            "stddev": [
                338
            ],
            "stddev_pop": [
                339
            ],
            "stddev_samp": [
                340
            ],
            "sum": [
                343
            ],
            "var_pop": [
                344
            ],
            "var_samp": [
                345
            ],
            "variance": [
                346
            ],
            "__typename": [
                321
            ]
        },
        "Trade_avg_order_by": {
            "feeRaw": [
                394
            ],
            "newPriceRaw": [
                394
            ],
            "reserveAmountRaw": [
                394
            ],
            "timestamp": [
                394
            ],
            "tokenAmountRaw": [
                394
            ],
            "__typename": [
                321
            ]
        },
        "Trade_bool_exp": {
            "_and": [
                333
            ],
            "_not": [
                333
            ],
            "_or": [
                333
            ],
            "feeFormatted": [
                323
            ],
            "feeRaw": [
                393
            ],
            "id": [
                323
            ],
            "market_id": [
                323
            ],
            "newPriceFormatted": [
                323
            ],
            "newPriceRaw": [
                393
            ],
            "reserveAmountFormatted": [
                323
            ],
            "reserveAmountRaw": [
                393
            ],
            "timestamp": [
                393
            ],
            "tokenAmountFormatted": [
                323
            ],
            "tokenAmountRaw": [
                393
            ],
            "tradeType": [
                412
            ],
            "transactionHash": [
                323
            ],
            "user_id": [
                323
            ],
            "__typename": [
                321
            ]
        },
        "Trade_max_order_by": {
            "feeFormatted": [
                394
            ],
            "feeRaw": [
                394
            ],
            "id": [
                394
            ],
            "market_id": [
                394
            ],
            "newPriceFormatted": [
                394
            ],
            "newPriceRaw": [
                394
            ],
            "reserveAmountFormatted": [
                394
            ],
            "reserveAmountRaw": [
                394
            ],
            "timestamp": [
                394
            ],
            "tokenAmountFormatted": [
                394
            ],
            "tokenAmountRaw": [
                394
            ],
            "tradeType": [
                394
            ],
            "transactionHash": [
                394
            ],
            "user_id": [
                394
            ],
            "__typename": [
                321
            ]
        },
        "Trade_min_order_by": {
            "feeFormatted": [
                394
            ],
            "feeRaw": [
                394
            ],
            "id": [
                394
            ],
            "market_id": [
                394
            ],
            "newPriceFormatted": [
                394
            ],
            "newPriceRaw": [
                394
            ],
            "reserveAmountFormatted": [
                394
            ],
            "reserveAmountRaw": [
                394
            ],
            "timestamp": [
                394
            ],
            "tokenAmountFormatted": [
                394
            ],
            "tokenAmountRaw": [
                394
            ],
            "tradeType": [
                394
            ],
            "transactionHash": [
                394
            ],
            "user_id": [
                394
            ],
            "__typename": [
                321
            ]
        },
        "Trade_order_by": {
            "feeFormatted": [
                394
            ],
            "feeRaw": [
                394
            ],
            "id": [
                394
            ],
            "market_id": [
                394
            ],
            "newPriceFormatted": [
                394
            ],
            "newPriceRaw": [
                394
            ],
            "reserveAmountFormatted": [
                394
            ],
            "reserveAmountRaw": [
                394
            ],
            "timestamp": [
                394
            ],
            "tokenAmountFormatted": [
                394
            ],
            "tokenAmountRaw": [
                394
            ],
            "tradeType": [
                394
            ],
            "transactionHash": [
                394
            ],
            "user_id": [
                394
            ],
            "__typename": [
                321
            ]
        },
        "Trade_select_column": {},
        "Trade_stddev_order_by": {
            "feeRaw": [
                394
            ],
            "newPriceRaw": [
                394
            ],
            "reserveAmountRaw": [
                394
            ],
            "timestamp": [
                394
            ],
            "tokenAmountRaw": [
                394
            ],
            "__typename": [
                321
            ]
        },
        "Trade_stddev_pop_order_by": {
            "feeRaw": [
                394
            ],
            "newPriceRaw": [
                394
            ],
            "reserveAmountRaw": [
                394
            ],
            "timestamp": [
                394
            ],
            "tokenAmountRaw": [
                394
            ],
            "__typename": [
                321
            ]
        },
        "Trade_stddev_samp_order_by": {
            "feeRaw": [
                394
            ],
            "newPriceRaw": [
                394
            ],
            "reserveAmountRaw": [
                394
            ],
            "timestamp": [
                394
            ],
            "tokenAmountRaw": [
                394
            ],
            "__typename": [
                321
            ]
        },
        "Trade_stream_cursor_input": {
            "initial_value": [
                342
            ],
            "ordering": [
                384
            ],
            "__typename": [
                321
            ]
        },
        "Trade_stream_cursor_value_input": {
            "feeFormatted": [
                321
            ],
            "feeRaw": [
                392
            ],
            "id": [
                321
            ],
            "market_id": [
                321
            ],
            "newPriceFormatted": [
                321
            ],
            "newPriceRaw": [
                392
            ],
            "reserveAmountFormatted": [
                321
            ],
            "reserveAmountRaw": [
                392
            ],
            "timestamp": [
                392
            ],
            "tokenAmountFormatted": [
                321
            ],
            "tokenAmountRaw": [
                392
            ],
            "tradeType": [
                411
            ],
            "transactionHash": [
                321
            ],
            "user_id": [
                321
            ],
            "__typename": [
                321
            ]
        },
        "Trade_sum_order_by": {
            "feeRaw": [
                394
            ],
            "newPriceRaw": [
                394
            ],
            "reserveAmountRaw": [
                394
            ],
            "timestamp": [
                394
            ],
            "tokenAmountRaw": [
                394
            ],
            "__typename": [
                321
            ]
        },
        "Trade_var_pop_order_by": {
            "feeRaw": [
                394
            ],
            "newPriceRaw": [
                394
            ],
            "reserveAmountRaw": [
                394
            ],
            "timestamp": [
                394
            ],
            "tokenAmountRaw": [
                394
            ],
            "__typename": [
                321
            ]
        },
        "Trade_var_samp_order_by": {
            "feeRaw": [
                394
            ],
            "newPriceRaw": [
                394
            ],
            "reserveAmountRaw": [
                394
            ],
            "timestamp": [
                394
            ],
            "tokenAmountRaw": [
                394
            ],
            "__typename": [
                321
            ]
        },
        "Trade_variance_order_by": {
            "feeRaw": [
                394
            ],
            "newPriceRaw": [
                394
            ],
            "reserveAmountRaw": [
                394
            ],
            "timestamp": [
                394
            ],
            "tokenAmountRaw": [
                394
            ],
            "__typename": [
                321
            ]
        },
        "Treasury": {
            "createdAt": [
                392
            ],
            "feeSplitterPayments": [
                20,
                {
                    "distinct_on": [
                        27,
                        "[FeeSplitterPayment_select_column!]"
                    ],
                    "limit": [
                        89
                    ],
                    "offset": [
                        89
                    ],
                    "order_by": [
                        26,
                        "[FeeSplitterPayment_order_by!]"
                    ],
                    "where": [
                        23
                    ]
                }
            ],
            "feeSplitterReceipts": [
                37,
                {
                    "distinct_on": [
                        44,
                        "[FeeSplitterReceipt_select_column!]"
                    ],
                    "limit": [
                        89
                    ],
                    "offset": [
                        89
                    ],
                    "order_by": [
                        43,
                        "[FeeSplitterReceipt_order_by!]"
                    ],
                    "where": [
                        40
                    ]
                }
            ],
            "id": [
                321
            ],
            "lastUpdatedAt": [
                392
            ],
            "market_id": [
                321
            ],
            "totalFeesDistributedFormatted": [
                321
            ],
            "totalFeesDistributedRaw": [
                392
            ],
            "totalFeesReceivedFormatted": [
                321
            ],
            "totalFeesReceivedRaw": [
                392
            ],
            "treasuryAddress": [
                321
            ],
            "__typename": [
                321
            ]
        },
        "Treasury_bool_exp": {
            "_and": [
                348
            ],
            "_not": [
                348
            ],
            "_or": [
                348
            ],
            "createdAt": [
                393
            ],
            "feeSplitterPayments": [
                23
            ],
            "feeSplitterReceipts": [
                40
            ],
            "id": [
                323
            ],
            "lastUpdatedAt": [
                393
            ],
            "market_id": [
                323
            ],
            "totalFeesDistributedFormatted": [
                323
            ],
            "totalFeesDistributedRaw": [
                393
            ],
            "totalFeesReceivedFormatted": [
                323
            ],
            "totalFeesReceivedRaw": [
                393
            ],
            "treasuryAddress": [
                323
            ],
            "__typename": [
                321
            ]
        },
        "Treasury_order_by": {
            "createdAt": [
                394
            ],
            "feeSplitterPayments_aggregate": [
                21
            ],
            "feeSplitterReceipts_aggregate": [
                38
            ],
            "id": [
                394
            ],
            "lastUpdatedAt": [
                394
            ],
            "market_id": [
                394
            ],
            "totalFeesDistributedFormatted": [
                394
            ],
            "totalFeesDistributedRaw": [
                394
            ],
            "totalFeesReceivedFormatted": [
                394
            ],
            "totalFeesReceivedRaw": [
                394
            ],
            "treasuryAddress": [
                394
            ],
            "__typename": [
                321
            ]
        },
        "Treasury_select_column": {},
        "Treasury_stream_cursor_input": {
            "initial_value": [
                352
            ],
            "ordering": [
                384
            ],
            "__typename": [
                321
            ]
        },
        "Treasury_stream_cursor_value_input": {
            "createdAt": [
                392
            ],
            "id": [
                321
            ],
            "lastUpdatedAt": [
                392
            ],
            "market_id": [
                321
            ],
            "totalFeesDistributedFormatted": [
                321
            ],
            "totalFeesDistributedRaw": [
                392
            ],
            "totalFeesReceivedFormatted": [
                321
            ],
            "totalFeesReceivedRaw": [
                392
            ],
            "treasuryAddress": [
                321
            ],
            "__typename": [
                321
            ]
        },
        "UserMarketPosition": {
            "claimableRewardsFormatted": [
                321
            ],
            "claimableRewardsRaw": [
                392
            ],
            "id": [
                321
            ],
            "lastUpdatedAt": [
                392
            ],
            "lockedCollateralFormatted": [
                321
            ],
            "lockedCollateralRaw": [
                392
            ],
            "market_id": [
                321
            ],
            "netFTokenChangeFormatted": [
                321
            ],
            "netFTokenChangeRaw": [
                392
            ],
            "presaleDepositFormatted": [
                321
            ],
            "presaleDepositRaw": [
                392
            ],
            "presaleLeverage": [
                392
            ],
            "stakedAmountFormatted": [
                321
            ],
            "stakedAmountRaw": [
                392
            ],
            "totalDebtFormatted": [
                321
            ],
            "totalDebtRaw": [
                392
            ],
            "user_id": [
                321
            ],
            "__typename": [
                321
            ]
        },
        "UserMarketPosition_aggregate_order_by": {
            "avg": [
                355
            ],
            "count": [
                394
            ],
            "max": [
                357
            ],
            "min": [
                358
            ],
            "stddev": [
                361
            ],
            "stddev_pop": [
                362
            ],
            "stddev_samp": [
                363
            ],
            "sum": [
                366
            ],
            "var_pop": [
                367
            ],
            "var_samp": [
                368
            ],
            "variance": [
                369
            ],
            "__typename": [
                321
            ]
        },
        "UserMarketPosition_avg_order_by": {
            "claimableRewardsRaw": [
                394
            ],
            "lastUpdatedAt": [
                394
            ],
            "lockedCollateralRaw": [
                394
            ],
            "netFTokenChangeRaw": [
                394
            ],
            "presaleDepositRaw": [
                394
            ],
            "presaleLeverage": [
                394
            ],
            "stakedAmountRaw": [
                394
            ],
            "totalDebtRaw": [
                394
            ],
            "__typename": [
                321
            ]
        },
        "UserMarketPosition_bool_exp": {
            "_and": [
                356
            ],
            "_not": [
                356
            ],
            "_or": [
                356
            ],
            "claimableRewardsFormatted": [
                323
            ],
            "claimableRewardsRaw": [
                393
            ],
            "id": [
                323
            ],
            "lastUpdatedAt": [
                393
            ],
            "lockedCollateralFormatted": [
                323
            ],
            "lockedCollateralRaw": [
                393
            ],
            "market_id": [
                323
            ],
            "netFTokenChangeFormatted": [
                323
            ],
            "netFTokenChangeRaw": [
                393
            ],
            "presaleDepositFormatted": [
                323
            ],
            "presaleDepositRaw": [
                393
            ],
            "presaleLeverage": [
                393
            ],
            "stakedAmountFormatted": [
                323
            ],
            "stakedAmountRaw": [
                393
            ],
            "totalDebtFormatted": [
                323
            ],
            "totalDebtRaw": [
                393
            ],
            "user_id": [
                323
            ],
            "__typename": [
                321
            ]
        },
        "UserMarketPosition_max_order_by": {
            "claimableRewardsFormatted": [
                394
            ],
            "claimableRewardsRaw": [
                394
            ],
            "id": [
                394
            ],
            "lastUpdatedAt": [
                394
            ],
            "lockedCollateralFormatted": [
                394
            ],
            "lockedCollateralRaw": [
                394
            ],
            "market_id": [
                394
            ],
            "netFTokenChangeFormatted": [
                394
            ],
            "netFTokenChangeRaw": [
                394
            ],
            "presaleDepositFormatted": [
                394
            ],
            "presaleDepositRaw": [
                394
            ],
            "presaleLeverage": [
                394
            ],
            "stakedAmountFormatted": [
                394
            ],
            "stakedAmountRaw": [
                394
            ],
            "totalDebtFormatted": [
                394
            ],
            "totalDebtRaw": [
                394
            ],
            "user_id": [
                394
            ],
            "__typename": [
                321
            ]
        },
        "UserMarketPosition_min_order_by": {
            "claimableRewardsFormatted": [
                394
            ],
            "claimableRewardsRaw": [
                394
            ],
            "id": [
                394
            ],
            "lastUpdatedAt": [
                394
            ],
            "lockedCollateralFormatted": [
                394
            ],
            "lockedCollateralRaw": [
                394
            ],
            "market_id": [
                394
            ],
            "netFTokenChangeFormatted": [
                394
            ],
            "netFTokenChangeRaw": [
                394
            ],
            "presaleDepositFormatted": [
                394
            ],
            "presaleDepositRaw": [
                394
            ],
            "presaleLeverage": [
                394
            ],
            "stakedAmountFormatted": [
                394
            ],
            "stakedAmountRaw": [
                394
            ],
            "totalDebtFormatted": [
                394
            ],
            "totalDebtRaw": [
                394
            ],
            "user_id": [
                394
            ],
            "__typename": [
                321
            ]
        },
        "UserMarketPosition_order_by": {
            "claimableRewardsFormatted": [
                394
            ],
            "claimableRewardsRaw": [
                394
            ],
            "id": [
                394
            ],
            "lastUpdatedAt": [
                394
            ],
            "lockedCollateralFormatted": [
                394
            ],
            "lockedCollateralRaw": [
                394
            ],
            "market_id": [
                394
            ],
            "netFTokenChangeFormatted": [
                394
            ],
            "netFTokenChangeRaw": [
                394
            ],
            "presaleDepositFormatted": [
                394
            ],
            "presaleDepositRaw": [
                394
            ],
            "presaleLeverage": [
                394
            ],
            "stakedAmountFormatted": [
                394
            ],
            "stakedAmountRaw": [
                394
            ],
            "totalDebtFormatted": [
                394
            ],
            "totalDebtRaw": [
                394
            ],
            "user_id": [
                394
            ],
            "__typename": [
                321
            ]
        },
        "UserMarketPosition_select_column": {},
        "UserMarketPosition_stddev_order_by": {
            "claimableRewardsRaw": [
                394
            ],
            "lastUpdatedAt": [
                394
            ],
            "lockedCollateralRaw": [
                394
            ],
            "netFTokenChangeRaw": [
                394
            ],
            "presaleDepositRaw": [
                394
            ],
            "presaleLeverage": [
                394
            ],
            "stakedAmountRaw": [
                394
            ],
            "totalDebtRaw": [
                394
            ],
            "__typename": [
                321
            ]
        },
        "UserMarketPosition_stddev_pop_order_by": {
            "claimableRewardsRaw": [
                394
            ],
            "lastUpdatedAt": [
                394
            ],
            "lockedCollateralRaw": [
                394
            ],
            "netFTokenChangeRaw": [
                394
            ],
            "presaleDepositRaw": [
                394
            ],
            "presaleLeverage": [
                394
            ],
            "stakedAmountRaw": [
                394
            ],
            "totalDebtRaw": [
                394
            ],
            "__typename": [
                321
            ]
        },
        "UserMarketPosition_stddev_samp_order_by": {
            "claimableRewardsRaw": [
                394
            ],
            "lastUpdatedAt": [
                394
            ],
            "lockedCollateralRaw": [
                394
            ],
            "netFTokenChangeRaw": [
                394
            ],
            "presaleDepositRaw": [
                394
            ],
            "presaleLeverage": [
                394
            ],
            "stakedAmountRaw": [
                394
            ],
            "totalDebtRaw": [
                394
            ],
            "__typename": [
                321
            ]
        },
        "UserMarketPosition_stream_cursor_input": {
            "initial_value": [
                365
            ],
            "ordering": [
                384
            ],
            "__typename": [
                321
            ]
        },
        "UserMarketPosition_stream_cursor_value_input": {
            "claimableRewardsFormatted": [
                321
            ],
            "claimableRewardsRaw": [
                392
            ],
            "id": [
                321
            ],
            "lastUpdatedAt": [
                392
            ],
            "lockedCollateralFormatted": [
                321
            ],
            "lockedCollateralRaw": [
                392
            ],
            "market_id": [
                321
            ],
            "netFTokenChangeFormatted": [
                321
            ],
            "netFTokenChangeRaw": [
                392
            ],
            "presaleDepositFormatted": [
                321
            ],
            "presaleDepositRaw": [
                392
            ],
            "presaleLeverage": [
                392
            ],
            "stakedAmountFormatted": [
                321
            ],
            "stakedAmountRaw": [
                392
            ],
            "totalDebtFormatted": [
                321
            ],
            "totalDebtRaw": [
                392
            ],
            "user_id": [
                321
            ],
            "__typename": [
                321
            ]
        },
        "UserMarketPosition_sum_order_by": {
            "claimableRewardsRaw": [
                394
            ],
            "lastUpdatedAt": [
                394
            ],
            "lockedCollateralRaw": [
                394
            ],
            "netFTokenChangeRaw": [
                394
            ],
            "presaleDepositRaw": [
                394
            ],
            "presaleLeverage": [
                394
            ],
            "stakedAmountRaw": [
                394
            ],
            "totalDebtRaw": [
                394
            ],
            "__typename": [
                321
            ]
        },
        "UserMarketPosition_var_pop_order_by": {
            "claimableRewardsRaw": [
                394
            ],
            "lastUpdatedAt": [
                394
            ],
            "lockedCollateralRaw": [
                394
            ],
            "netFTokenChangeRaw": [
                394
            ],
            "presaleDepositRaw": [
                394
            ],
            "presaleLeverage": [
                394
            ],
            "stakedAmountRaw": [
                394
            ],
            "totalDebtRaw": [
                394
            ],
            "__typename": [
                321
            ]
        },
        "UserMarketPosition_var_samp_order_by": {
            "claimableRewardsRaw": [
                394
            ],
            "lastUpdatedAt": [
                394
            ],
            "lockedCollateralRaw": [
                394
            ],
            "netFTokenChangeRaw": [
                394
            ],
            "presaleDepositRaw": [
                394
            ],
            "presaleLeverage": [
                394
            ],
            "stakedAmountRaw": [
                394
            ],
            "totalDebtRaw": [
                394
            ],
            "__typename": [
                321
            ]
        },
        "UserMarketPosition_variance_order_by": {
            "claimableRewardsRaw": [
                394
            ],
            "lastUpdatedAt": [
                394
            ],
            "lockedCollateralRaw": [
                394
            ],
            "netFTokenChangeRaw": [
                394
            ],
            "presaleDepositRaw": [
                394
            ],
            "presaleLeverage": [
                394
            ],
            "stakedAmountRaw": [
                394
            ],
            "totalDebtRaw": [
                394
            ],
            "__typename": [
                321
            ]
        },
        "_meta": {
            "bufferBlock": [
                89
            ],
            "chainId": [
                89
            ],
            "endBlock": [
                89
            ],
            "eventsProcessed": [
                89
            ],
            "firstEventBlock": [
                89
            ],
            "isReady": [
                12
            ],
            "progressBlock": [
                89
            ],
            "readyAt": [
                409
            ],
            "sourceBlock": [
                89
            ],
            "startBlock": [
                89
            ],
            "__typename": [
                321
            ]
        },
        "_meta_bool_exp": {
            "_and": [
                371
            ],
            "_not": [
                371
            ],
            "_or": [
                371
            ],
            "bufferBlock": [
                91
            ],
            "chainId": [
                91
            ],
            "endBlock": [
                91
            ],
            "eventsProcessed": [
                91
            ],
            "firstEventBlock": [
                91
            ],
            "isReady": [
                13
            ],
            "progressBlock": [
                91
            ],
            "readyAt": [
                410
            ],
            "sourceBlock": [
                91
            ],
            "startBlock": [
                91
            ],
            "__typename": [
                321
            ]
        },
        "_meta_order_by": {
            "bufferBlock": [
                394
            ],
            "chainId": [
                394
            ],
            "endBlock": [
                394
            ],
            "eventsProcessed": [
                394
            ],
            "firstEventBlock": [
                394
            ],
            "isReady": [
                394
            ],
            "progressBlock": [
                394
            ],
            "readyAt": [
                394
            ],
            "sourceBlock": [
                394
            ],
            "startBlock": [
                394
            ],
            "__typename": [
                321
            ]
        },
        "_meta_select_column": {},
        "_meta_stream_cursor_input": {
            "initial_value": [
                375
            ],
            "ordering": [
                384
            ],
            "__typename": [
                321
            ]
        },
        "_meta_stream_cursor_value_input": {
            "bufferBlock": [
                89
            ],
            "chainId": [
                89
            ],
            "endBlock": [
                89
            ],
            "eventsProcessed": [
                89
            ],
            "firstEventBlock": [
                89
            ],
            "isReady": [
                12
            ],
            "progressBlock": [
                89
            ],
            "readyAt": [
                409
            ],
            "sourceBlock": [
                89
            ],
            "startBlock": [
                89
            ],
            "__typename": [
                321
            ]
        },
        "candleperiod": {},
        "candleperiod_comparison_exp": {
            "_eq": [
                376
            ],
            "_gt": [
                376
            ],
            "_gte": [
                376
            ],
            "_in": [
                376
            ],
            "_is_null": [
                12
            ],
            "_lt": [
                376
            ],
            "_lte": [
                376
            ],
            "_neq": [
                376
            ],
            "_nin": [
                376
            ],
            "__typename": [
                321
            ]
        },
        "chain_metadata": {
            "block_height": [
                89
            ],
            "chain_id": [
                89
            ],
            "end_block": [
                89
            ],
            "first_event_block_number": [
                89
            ],
            "is_hyper_sync": [
                12
            ],
            "latest_fetched_block_number": [
                89
            ],
            "latest_processed_block": [
                89
            ],
            "num_batches_fetched": [
                89
            ],
            "num_events_processed": [
                89
            ],
            "start_block": [
                89
            ],
            "timestamp_caught_up_to_head_or_endblock": [
                409
            ],
            "__typename": [
                321
            ]
        },
        "chain_metadata_bool_exp": {
            "_and": [
                379
            ],
            "_not": [
                379
            ],
            "_or": [
                379
            ],
            "block_height": [
                91
            ],
            "chain_id": [
                91
            ],
            "end_block": [
                91
            ],
            "first_event_block_number": [
                91
            ],
            "is_hyper_sync": [
                13
            ],
            "latest_fetched_block_number": [
                91
            ],
            "latest_processed_block": [
                91
            ],
            "num_batches_fetched": [
                91
            ],
            "num_events_processed": [
                91
            ],
            "start_block": [
                91
            ],
            "timestamp_caught_up_to_head_or_endblock": [
                410
            ],
            "__typename": [
                321
            ]
        },
        "chain_metadata_order_by": {
            "block_height": [
                394
            ],
            "chain_id": [
                394
            ],
            "end_block": [
                394
            ],
            "first_event_block_number": [
                394
            ],
            "is_hyper_sync": [
                394
            ],
            "latest_fetched_block_number": [
                394
            ],
            "latest_processed_block": [
                394
            ],
            "num_batches_fetched": [
                394
            ],
            "num_events_processed": [
                394
            ],
            "start_block": [
                394
            ],
            "timestamp_caught_up_to_head_or_endblock": [
                394
            ],
            "__typename": [
                321
            ]
        },
        "chain_metadata_select_column": {},
        "chain_metadata_stream_cursor_input": {
            "initial_value": [
                383
            ],
            "ordering": [
                384
            ],
            "__typename": [
                321
            ]
        },
        "chain_metadata_stream_cursor_value_input": {
            "block_height": [
                89
            ],
            "chain_id": [
                89
            ],
            "end_block": [
                89
            ],
            "first_event_block_number": [
                89
            ],
            "is_hyper_sync": [
                12
            ],
            "latest_fetched_block_number": [
                89
            ],
            "latest_processed_block": [
                89
            ],
            "num_batches_fetched": [
                89
            ],
            "num_events_processed": [
                89
            ],
            "start_block": [
                89
            ],
            "timestamp_caught_up_to_head_or_endblock": [
                409
            ],
            "__typename": [
                321
            ]
        },
        "cursor_ordering": {},
        "jsonb": {},
        "jsonb_cast_exp": {
            "String": [
                323
            ],
            "__typename": [
                321
            ]
        },
        "jsonb_comparison_exp": {
            "_cast": [
                386
            ],
            "_contained_in": [
                385
            ],
            "_contains": [
                385
            ],
            "_eq": [
                385
            ],
            "_gt": [
                385
            ],
            "_gte": [
                385
            ],
            "_has_key": [
                321
            ],
            "_has_keys_all": [
                321
            ],
            "_has_keys_any": [
                321
            ],
            "_in": [
                385
            ],
            "_is_null": [
                12
            ],
            "_lt": [
                385
            ],
            "_lte": [
                385
            ],
            "_neq": [
                385
            ],
            "_nin": [
                385
            ],
            "__typename": [
                321
            ]
        },
        "loanstatus": {},
        "loanstatus_comparison_exp": {
            "_eq": [
                388
            ],
            "_gt": [
                388
            ],
            "_gte": [
                388
            ],
            "_in": [
                388
            ],
            "_is_null": [
                12
            ],
            "_lt": [
                388
            ],
            "_lte": [
                388
            ],
            "_neq": [
                388
            ],
            "_nin": [
                388
            ],
            "__typename": [
                321
            ]
        },
        "marketstatus": {},
        "marketstatus_comparison_exp": {
            "_eq": [
                390
            ],
            "_gt": [
                390
            ],
            "_gte": [
                390
            ],
            "_in": [
                390
            ],
            "_is_null": [
                12
            ],
            "_lt": [
                390
            ],
            "_lte": [
                390
            ],
            "_neq": [
                390
            ],
            "_nin": [
                390
            ],
            "__typename": [
                321
            ]
        },
        "numeric": {},
        "numeric_comparison_exp": {
            "_eq": [
                392
            ],
            "_gt": [
                392
            ],
            "_gte": [
                392
            ],
            "_in": [
                392
            ],
            "_is_null": [
                12
            ],
            "_lt": [
                392
            ],
            "_lte": [
                392
            ],
            "_neq": [
                392
            ],
            "_nin": [
                392
            ],
            "__typename": [
                321
            ]
        },
        "order_by": {},
        "presaleclaimtype": {},
        "presaleclaimtype_comparison_exp": {
            "_eq": [
                395
            ],
            "_gt": [
                395
            ],
            "_gte": [
                395
            ],
            "_in": [
                395
            ],
            "_is_null": [
                12
            ],
            "_lt": [
                395
            ],
            "_lte": [
                395
            ],
            "_neq": [
                395
            ],
            "_nin": [
                395
            ],
            "__typename": [
                321
            ]
        },
        "raw_events": {
            "block_fields": [
                385,
                {
                    "path": [
                        321
                    ]
                }
            ],
            "block_hash": [
                321
            ],
            "block_number": [
                89
            ],
            "block_timestamp": [
                89
            ],
            "chain_id": [
                89
            ],
            "contract_name": [
                321
            ],
            "event_id": [
                392
            ],
            "event_name": [
                321
            ],
            "log_index": [
                89
            ],
            "params": [
                385,
                {
                    "path": [
                        321
                    ]
                }
            ],
            "serial": [
                89
            ],
            "src_address": [
                321
            ],
            "transaction_fields": [
                385,
                {
                    "path": [
                        321
                    ]
                }
            ],
            "__typename": [
                321
            ]
        },
        "raw_events_bool_exp": {
            "_and": [
                398
            ],
            "_not": [
                398
            ],
            "_or": [
                398
            ],
            "block_fields": [
                387
            ],
            "block_hash": [
                323
            ],
            "block_number": [
                91
            ],
            "block_timestamp": [
                91
            ],
            "chain_id": [
                91
            ],
            "contract_name": [
                323
            ],
            "event_id": [
                393
            ],
            "event_name": [
                323
            ],
            "log_index": [
                91
            ],
            "params": [
                387
            ],
            "serial": [
                91
            ],
            "src_address": [
                323
            ],
            "transaction_fields": [
                387
            ],
            "__typename": [
                321
            ]
        },
        "raw_events_order_by": {
            "block_fields": [
                394
            ],
            "block_hash": [
                394
            ],
            "block_number": [
                394
            ],
            "block_timestamp": [
                394
            ],
            "chain_id": [
                394
            ],
            "contract_name": [
                394
            ],
            "event_id": [
                394
            ],
            "event_name": [
                394
            ],
            "log_index": [
                394
            ],
            "params": [
                394
            ],
            "serial": [
                394
            ],
            "src_address": [
                394
            ],
            "transaction_fields": [
                394
            ],
            "__typename": [
                321
            ]
        },
        "raw_events_select_column": {},
        "raw_events_stream_cursor_input": {
            "initial_value": [
                402
            ],
            "ordering": [
                384
            ],
            "__typename": [
                321
            ]
        },
        "raw_events_stream_cursor_value_input": {
            "block_fields": [
                385
            ],
            "block_hash": [
                321
            ],
            "block_number": [
                89
            ],
            "block_timestamp": [
                89
            ],
            "chain_id": [
                89
            ],
            "contract_name": [
                321
            ],
            "event_id": [
                392
            ],
            "event_name": [
                321
            ],
            "log_index": [
                89
            ],
            "params": [
                385
            ],
            "serial": [
                89
            ],
            "src_address": [
                321
            ],
            "transaction_fields": [
                385
            ],
            "__typename": [
                321
            ]
        },
        "snapshotperiod": {},
        "snapshotperiod_comparison_exp": {
            "_eq": [
                403
            ],
            "_gt": [
                403
            ],
            "_gte": [
                403
            ],
            "_in": [
                403
            ],
            "_is_null": [
                12
            ],
            "_lt": [
                403
            ],
            "_lte": [
                403
            ],
            "_neq": [
                403
            ],
            "_nin": [
                403
            ],
            "__typename": [
                321
            ]
        },
        "stakepositionstatus": {},
        "stakepositionstatus_comparison_exp": {
            "_eq": [
                405
            ],
            "_gt": [
                405
            ],
            "_gte": [
                405
            ],
            "_in": [
                405
            ],
            "_is_null": [
                12
            ],
            "_lt": [
                405
            ],
            "_lte": [
                405
            ],
            "_neq": [
                405
            ],
            "_nin": [
                405
            ],
            "__typename": [
                321
            ]
        },
        "stakingactivitytype": {},
        "stakingactivitytype_comparison_exp": {
            "_eq": [
                407
            ],
            "_gt": [
                407
            ],
            "_gte": [
                407
            ],
            "_in": [
                407
            ],
            "_is_null": [
                12
            ],
            "_lt": [
                407
            ],
            "_lte": [
                407
            ],
            "_neq": [
                407
            ],
            "_nin": [
                407
            ],
            "__typename": [
                321
            ]
        },
        "timestamptz": {},
        "timestamptz_comparison_exp": {
            "_eq": [
                409
            ],
            "_gt": [
                409
            ],
            "_gte": [
                409
            ],
            "_in": [
                409
            ],
            "_is_null": [
                12
            ],
            "_lt": [
                409
            ],
            "_lte": [
                409
            ],
            "_neq": [
                409
            ],
            "_nin": [
                409
            ],
            "__typename": [
                321
            ]
        },
        "tradetype": {},
        "tradetype_comparison_exp": {
            "_eq": [
                411
            ],
            "_gt": [
                411
            ],
            "_gte": [
                411
            ],
            "_in": [
                411
            ],
            "_is_null": [
                12
            ],
            "_lt": [
                411
            ],
            "_lte": [
                411
            ],
            "_neq": [
                411
            ],
            "_nin": [
                411
            ],
            "__typename": [
                321
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
                        89
                    ],
                    "offset": [
                        89
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
                        321,
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
                        89
                    ],
                    "offset": [
                        89
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
                        321,
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
                        89
                    ],
                    "offset": [
                        89
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
                        321,
                        "String!"
                    ]
                }
            ],
            "FeeSplitterPayment": [
                20,
                {
                    "distinct_on": [
                        27,
                        "[FeeSplitterPayment_select_column!]"
                    ],
                    "limit": [
                        89
                    ],
                    "offset": [
                        89
                    ],
                    "order_by": [
                        26,
                        "[FeeSplitterPayment_order_by!]"
                    ],
                    "where": [
                        23
                    ]
                }
            ],
            "FeeSplitterPayment_by_pk": [
                20,
                {
                    "id": [
                        321,
                        "String!"
                    ]
                }
            ],
            "FeeSplitterReceipt": [
                37,
                {
                    "distinct_on": [
                        44,
                        "[FeeSplitterReceipt_select_column!]"
                    ],
                    "limit": [
                        89
                    ],
                    "offset": [
                        89
                    ],
                    "order_by": [
                        43,
                        "[FeeSplitterReceipt_order_by!]"
                    ],
                    "where": [
                        40
                    ]
                }
            ],
            "FeeSplitterReceipt_by_pk": [
                37,
                {
                    "id": [
                        321,
                        "String!"
                    ]
                }
            ],
            "FloorElevation": [
                54,
                {
                    "distinct_on": [
                        61,
                        "[FloorElevation_select_column!]"
                    ],
                    "limit": [
                        89
                    ],
                    "offset": [
                        89
                    ],
                    "order_by": [
                        60,
                        "[FloorElevation_order_by!]"
                    ],
                    "where": [
                        57
                    ]
                }
            ],
            "FloorElevation_by_pk": [
                54,
                {
                    "id": [
                        321,
                        "String!"
                    ]
                }
            ],
            "GlobalRegistry": [
                71,
                {
                    "distinct_on": [
                        74,
                        "[GlobalRegistry_select_column!]"
                    ],
                    "limit": [
                        89
                    ],
                    "offset": [
                        89
                    ],
                    "order_by": [
                        73,
                        "[GlobalRegistry_order_by!]"
                    ],
                    "where": [
                        72
                    ]
                }
            ],
            "GlobalRegistry_by_pk": [
                71,
                {
                    "id": [
                        321,
                        "String!"
                    ]
                }
            ],
            "GlobalStats": [
                77,
                {
                    "distinct_on": [
                        86,
                        "[GlobalStats_select_column!]"
                    ],
                    "limit": [
                        89
                    ],
                    "offset": [
                        89
                    ],
                    "order_by": [
                        85,
                        "[GlobalStats_order_by!]"
                    ],
                    "where": [
                        84
                    ]
                }
            ],
            "GlobalStatsSnapshot": [
                78,
                {
                    "distinct_on": [
                        81,
                        "[GlobalStatsSnapshot_select_column!]"
                    ],
                    "limit": [
                        89
                    ],
                    "offset": [
                        89
                    ],
                    "order_by": [
                        80,
                        "[GlobalStatsSnapshot_order_by!]"
                    ],
                    "where": [
                        79
                    ]
                }
            ],
            "GlobalStatsSnapshot_by_pk": [
                78,
                {
                    "id": [
                        321,
                        "String!"
                    ]
                }
            ],
            "GlobalStats_by_pk": [
                77,
                {
                    "id": [
                        321,
                        "String!"
                    ]
                }
            ],
            "Loan": [
                92,
                {
                    "distinct_on": [
                        116,
                        "[Loan_select_column!]"
                    ],
                    "limit": [
                        89
                    ],
                    "offset": [
                        89
                    ],
                    "order_by": [
                        115,
                        "[Loan_order_by!]"
                    ],
                    "where": [
                        112
                    ]
                }
            ],
            "LoanStatusHistory": [
                93,
                {
                    "distinct_on": [
                        100,
                        "[LoanStatusHistory_select_column!]"
                    ],
                    "limit": [
                        89
                    ],
                    "offset": [
                        89
                    ],
                    "order_by": [
                        99,
                        "[LoanStatusHistory_order_by!]"
                    ],
                    "where": [
                        96
                    ]
                }
            ],
            "LoanStatusHistory_by_pk": [
                93,
                {
                    "id": [
                        321,
                        "String!"
                    ]
                }
            ],
            "Loan_by_pk": [
                92,
                {
                    "id": [
                        321,
                        "String!"
                    ]
                }
            ],
            "Market": [
                126,
                {
                    "distinct_on": [
                        145,
                        "[Market_select_column!]"
                    ],
                    "limit": [
                        89
                    ],
                    "offset": [
                        89
                    ],
                    "order_by": [
                        144,
                        "[Market_order_by!]"
                    ],
                    "where": [
                        141
                    ]
                }
            ],
            "MarketRollingStats": [
                127,
                {
                    "distinct_on": [
                        130,
                        "[MarketRollingStats_select_column!]"
                    ],
                    "limit": [
                        89
                    ],
                    "offset": [
                        89
                    ],
                    "order_by": [
                        129,
                        "[MarketRollingStats_order_by!]"
                    ],
                    "where": [
                        128
                    ]
                }
            ],
            "MarketRollingStats_by_pk": [
                127,
                {
                    "id": [
                        321,
                        "String!"
                    ]
                }
            ],
            "MarketSnapshot": [
                133,
                {
                    "distinct_on": [
                        136,
                        "[MarketSnapshot_select_column!]"
                    ],
                    "limit": [
                        89
                    ],
                    "offset": [
                        89
                    ],
                    "order_by": [
                        135,
                        "[MarketSnapshot_order_by!]"
                    ],
                    "where": [
                        134
                    ]
                }
            ],
            "MarketSnapshot_by_pk": [
                133,
                {
                    "id": [
                        321,
                        "String!"
                    ]
                }
            ],
            "Market_by_pk": [
                126,
                {
                    "id": [
                        321,
                        "String!"
                    ]
                }
            ],
            "ModuleAddress": [
                155,
                {
                    "distinct_on": [
                        158,
                        "[ModuleAddress_select_column!]"
                    ],
                    "limit": [
                        89
                    ],
                    "offset": [
                        89
                    ],
                    "order_by": [
                        157,
                        "[ModuleAddress_order_by!]"
                    ],
                    "where": [
                        156
                    ]
                }
            ],
            "ModuleAddress_by_pk": [
                155,
                {
                    "id": [
                        321,
                        "String!"
                    ]
                }
            ],
            "ModuleRegistry": [
                161,
                {
                    "distinct_on": [
                        164,
                        "[ModuleRegistry_select_column!]"
                    ],
                    "limit": [
                        89
                    ],
                    "offset": [
                        89
                    ],
                    "order_by": [
                        163,
                        "[ModuleRegistry_order_by!]"
                    ],
                    "where": [
                        162
                    ]
                }
            ],
            "ModuleRegistry_by_pk": [
                161,
                {
                    "id": [
                        321,
                        "String!"
                    ]
                }
            ],
            "PreSaleContract": [
                167,
                {
                    "distinct_on": [
                        170,
                        "[PreSaleContract_select_column!]"
                    ],
                    "limit": [
                        89
                    ],
                    "offset": [
                        89
                    ],
                    "order_by": [
                        169,
                        "[PreSaleContract_order_by!]"
                    ],
                    "where": [
                        168
                    ]
                }
            ],
            "PreSaleContract_by_pk": [
                167,
                {
                    "id": [
                        321,
                        "String!"
                    ]
                }
            ],
            "PresaleClaim": [
                173,
                {
                    "distinct_on": [
                        180,
                        "[PresaleClaim_select_column!]"
                    ],
                    "limit": [
                        89
                    ],
                    "offset": [
                        89
                    ],
                    "order_by": [
                        179,
                        "[PresaleClaim_order_by!]"
                    ],
                    "where": [
                        176
                    ]
                }
            ],
            "PresaleClaim_by_pk": [
                173,
                {
                    "id": [
                        321,
                        "String!"
                    ]
                }
            ],
            "PresaleParticipation": [
                190,
                {
                    "distinct_on": [
                        197,
                        "[PresaleParticipation_select_column!]"
                    ],
                    "limit": [
                        89
                    ],
                    "offset": [
                        89
                    ],
                    "order_by": [
                        196,
                        "[PresaleParticipation_order_by!]"
                    ],
                    "where": [
                        193
                    ]
                }
            ],
            "PresaleParticipation_by_pk": [
                190,
                {
                    "id": [
                        321,
                        "String!"
                    ]
                }
            ],
            "PriceCandle": [
                207,
                {
                    "distinct_on": [
                        210,
                        "[PriceCandle_select_column!]"
                    ],
                    "limit": [
                        89
                    ],
                    "offset": [
                        89
                    ],
                    "order_by": [
                        209,
                        "[PriceCandle_order_by!]"
                    ],
                    "where": [
                        208
                    ]
                }
            ],
            "PriceCandle_by_pk": [
                207,
                {
                    "id": [
                        321,
                        "String!"
                    ]
                }
            ],
            "Role": [
                213,
                {
                    "distinct_on": [
                        254,
                        "[Role_select_column!]"
                    ],
                    "limit": [
                        89
                    ],
                    "offset": [
                        89
                    ],
                    "order_by": [
                        253,
                        "[Role_order_by!]"
                    ],
                    "where": [
                        250
                    ]
                }
            ],
            "RoleMember": [
                214,
                {
                    "distinct_on": [
                        221,
                        "[RoleMember_select_column!]"
                    ],
                    "limit": [
                        89
                    ],
                    "offset": [
                        89
                    ],
                    "order_by": [
                        220,
                        "[RoleMember_order_by!]"
                    ],
                    "where": [
                        217
                    ]
                }
            ],
            "RoleMember_by_pk": [
                214,
                {
                    "id": [
                        321,
                        "String!"
                    ]
                }
            ],
            "RolePermission": [
                231,
                {
                    "distinct_on": [
                        238,
                        "[RolePermission_select_column!]"
                    ],
                    "limit": [
                        89
                    ],
                    "offset": [
                        89
                    ],
                    "order_by": [
                        237,
                        "[RolePermission_order_by!]"
                    ],
                    "where": [
                        234
                    ]
                }
            ],
            "RolePermission_by_pk": [
                231,
                {
                    "id": [
                        321,
                        "String!"
                    ]
                }
            ],
            "Role_by_pk": [
                213,
                {
                    "id": [
                        321,
                        "String!"
                    ]
                }
            ],
            "StakePosition": [
                264,
                {
                    "distinct_on": [
                        271,
                        "[StakePosition_select_column!]"
                    ],
                    "limit": [
                        89
                    ],
                    "offset": [
                        89
                    ],
                    "order_by": [
                        270,
                        "[StakePosition_order_by!]"
                    ],
                    "where": [
                        267
                    ]
                }
            ],
            "StakePosition_by_pk": [
                264,
                {
                    "id": [
                        321,
                        "String!"
                    ]
                }
            ],
            "StakingActivity": [
                281,
                {
                    "distinct_on": [
                        288,
                        "[StakingActivity_select_column!]"
                    ],
                    "limit": [
                        89
                    ],
                    "offset": [
                        89
                    ],
                    "order_by": [
                        287,
                        "[StakingActivity_order_by!]"
                    ],
                    "where": [
                        284
                    ]
                }
            ],
            "StakingActivity_by_pk": [
                281,
                {
                    "id": [
                        321,
                        "String!"
                    ]
                }
            ],
            "StakingManager": [
                298,
                {
                    "distinct_on": [
                        301,
                        "[StakingManager_select_column!]"
                    ],
                    "limit": [
                        89
                    ],
                    "offset": [
                        89
                    ],
                    "order_by": [
                        300,
                        "[StakingManager_order_by!]"
                    ],
                    "where": [
                        299
                    ]
                }
            ],
            "StakingManager_by_pk": [
                298,
                {
                    "id": [
                        321,
                        "String!"
                    ]
                }
            ],
            "Strategy": [
                304,
                {
                    "distinct_on": [
                        311,
                        "[Strategy_select_column!]"
                    ],
                    "limit": [
                        89
                    ],
                    "offset": [
                        89
                    ],
                    "order_by": [
                        310,
                        "[Strategy_order_by!]"
                    ],
                    "where": [
                        307
                    ]
                }
            ],
            "Strategy_by_pk": [
                304,
                {
                    "id": [
                        321,
                        "String!"
                    ]
                }
            ],
            "Token": [
                324,
                {
                    "distinct_on": [
                        327,
                        "[Token_select_column!]"
                    ],
                    "limit": [
                        89
                    ],
                    "offset": [
                        89
                    ],
                    "order_by": [
                        326,
                        "[Token_order_by!]"
                    ],
                    "where": [
                        325
                    ]
                }
            ],
            "Token_by_pk": [
                324,
                {
                    "id": [
                        321,
                        "String!"
                    ]
                }
            ],
            "Trade": [
                330,
                {
                    "distinct_on": [
                        337,
                        "[Trade_select_column!]"
                    ],
                    "limit": [
                        89
                    ],
                    "offset": [
                        89
                    ],
                    "order_by": [
                        336,
                        "[Trade_order_by!]"
                    ],
                    "where": [
                        333
                    ]
                }
            ],
            "Trade_by_pk": [
                330,
                {
                    "id": [
                        321,
                        "String!"
                    ]
                }
            ],
            "Treasury": [
                347,
                {
                    "distinct_on": [
                        350,
                        "[Treasury_select_column!]"
                    ],
                    "limit": [
                        89
                    ],
                    "offset": [
                        89
                    ],
                    "order_by": [
                        349,
                        "[Treasury_order_by!]"
                    ],
                    "where": [
                        348
                    ]
                }
            ],
            "Treasury_by_pk": [
                347,
                {
                    "id": [
                        321,
                        "String!"
                    ]
                }
            ],
            "UserMarketPosition": [
                353,
                {
                    "distinct_on": [
                        360,
                        "[UserMarketPosition_select_column!]"
                    ],
                    "limit": [
                        89
                    ],
                    "offset": [
                        89
                    ],
                    "order_by": [
                        359,
                        "[UserMarketPosition_order_by!]"
                    ],
                    "where": [
                        356
                    ]
                }
            ],
            "UserMarketPosition_by_pk": [
                353,
                {
                    "id": [
                        321,
                        "String!"
                    ]
                }
            ],
            "_meta": [
                370,
                {
                    "distinct_on": [
                        373,
                        "[_meta_select_column!]"
                    ],
                    "limit": [
                        89
                    ],
                    "offset": [
                        89
                    ],
                    "order_by": [
                        372,
                        "[_meta_order_by!]"
                    ],
                    "where": [
                        371
                    ]
                }
            ],
            "chain_metadata": [
                378,
                {
                    "distinct_on": [
                        381,
                        "[chain_metadata_select_column!]"
                    ],
                    "limit": [
                        89
                    ],
                    "offset": [
                        89
                    ],
                    "order_by": [
                        380,
                        "[chain_metadata_order_by!]"
                    ],
                    "where": [
                        379
                    ]
                }
            ],
            "raw_events": [
                397,
                {
                    "distinct_on": [
                        400,
                        "[raw_events_select_column!]"
                    ],
                    "limit": [
                        89
                    ],
                    "offset": [
                        89
                    ],
                    "order_by": [
                        399,
                        "[raw_events_order_by!]"
                    ],
                    "where": [
                        398
                    ]
                }
            ],
            "raw_events_by_pk": [
                397,
                {
                    "serial": [
                        89,
                        "Int!"
                    ]
                }
            ],
            "__typename": [
                321
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
                        89
                    ],
                    "offset": [
                        89
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
                        321,
                        "String!"
                    ]
                }
            ],
            "Account_stream": [
                0,
                {
                    "batch_size": [
                        89,
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
                        89
                    ],
                    "offset": [
                        89
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
                        321,
                        "String!"
                    ]
                }
            ],
            "AuthorizerContract_stream": [
                6,
                {
                    "batch_size": [
                        89,
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
                        89
                    ],
                    "offset": [
                        89
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
                        321,
                        "String!"
                    ]
                }
            ],
            "CreditFacilityContract_stream": [
                14,
                {
                    "batch_size": [
                        89,
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
            "FeeSplitterPayment": [
                20,
                {
                    "distinct_on": [
                        27,
                        "[FeeSplitterPayment_select_column!]"
                    ],
                    "limit": [
                        89
                    ],
                    "offset": [
                        89
                    ],
                    "order_by": [
                        26,
                        "[FeeSplitterPayment_order_by!]"
                    ],
                    "where": [
                        23
                    ]
                }
            ],
            "FeeSplitterPayment_by_pk": [
                20,
                {
                    "id": [
                        321,
                        "String!"
                    ]
                }
            ],
            "FeeSplitterPayment_stream": [
                20,
                {
                    "batch_size": [
                        89,
                        "Int!"
                    ],
                    "cursor": [
                        31,
                        "[FeeSplitterPayment_stream_cursor_input]!"
                    ],
                    "where": [
                        23
                    ]
                }
            ],
            "FeeSplitterReceipt": [
                37,
                {
                    "distinct_on": [
                        44,
                        "[FeeSplitterReceipt_select_column!]"
                    ],
                    "limit": [
                        89
                    ],
                    "offset": [
                        89
                    ],
                    "order_by": [
                        43,
                        "[FeeSplitterReceipt_order_by!]"
                    ],
                    "where": [
                        40
                    ]
                }
            ],
            "FeeSplitterReceipt_by_pk": [
                37,
                {
                    "id": [
                        321,
                        "String!"
                    ]
                }
            ],
            "FeeSplitterReceipt_stream": [
                37,
                {
                    "batch_size": [
                        89,
                        "Int!"
                    ],
                    "cursor": [
                        48,
                        "[FeeSplitterReceipt_stream_cursor_input]!"
                    ],
                    "where": [
                        40
                    ]
                }
            ],
            "FloorElevation": [
                54,
                {
                    "distinct_on": [
                        61,
                        "[FloorElevation_select_column!]"
                    ],
                    "limit": [
                        89
                    ],
                    "offset": [
                        89
                    ],
                    "order_by": [
                        60,
                        "[FloorElevation_order_by!]"
                    ],
                    "where": [
                        57
                    ]
                }
            ],
            "FloorElevation_by_pk": [
                54,
                {
                    "id": [
                        321,
                        "String!"
                    ]
                }
            ],
            "FloorElevation_stream": [
                54,
                {
                    "batch_size": [
                        89,
                        "Int!"
                    ],
                    "cursor": [
                        65,
                        "[FloorElevation_stream_cursor_input]!"
                    ],
                    "where": [
                        57
                    ]
                }
            ],
            "GlobalRegistry": [
                71,
                {
                    "distinct_on": [
                        74,
                        "[GlobalRegistry_select_column!]"
                    ],
                    "limit": [
                        89
                    ],
                    "offset": [
                        89
                    ],
                    "order_by": [
                        73,
                        "[GlobalRegistry_order_by!]"
                    ],
                    "where": [
                        72
                    ]
                }
            ],
            "GlobalRegistry_by_pk": [
                71,
                {
                    "id": [
                        321,
                        "String!"
                    ]
                }
            ],
            "GlobalRegistry_stream": [
                71,
                {
                    "batch_size": [
                        89,
                        "Int!"
                    ],
                    "cursor": [
                        75,
                        "[GlobalRegistry_stream_cursor_input]!"
                    ],
                    "where": [
                        72
                    ]
                }
            ],
            "GlobalStats": [
                77,
                {
                    "distinct_on": [
                        86,
                        "[GlobalStats_select_column!]"
                    ],
                    "limit": [
                        89
                    ],
                    "offset": [
                        89
                    ],
                    "order_by": [
                        85,
                        "[GlobalStats_order_by!]"
                    ],
                    "where": [
                        84
                    ]
                }
            ],
            "GlobalStatsSnapshot": [
                78,
                {
                    "distinct_on": [
                        81,
                        "[GlobalStatsSnapshot_select_column!]"
                    ],
                    "limit": [
                        89
                    ],
                    "offset": [
                        89
                    ],
                    "order_by": [
                        80,
                        "[GlobalStatsSnapshot_order_by!]"
                    ],
                    "where": [
                        79
                    ]
                }
            ],
            "GlobalStatsSnapshot_by_pk": [
                78,
                {
                    "id": [
                        321,
                        "String!"
                    ]
                }
            ],
            "GlobalStatsSnapshot_stream": [
                78,
                {
                    "batch_size": [
                        89,
                        "Int!"
                    ],
                    "cursor": [
                        82,
                        "[GlobalStatsSnapshot_stream_cursor_input]!"
                    ],
                    "where": [
                        79
                    ]
                }
            ],
            "GlobalStats_by_pk": [
                77,
                {
                    "id": [
                        321,
                        "String!"
                    ]
                }
            ],
            "GlobalStats_stream": [
                77,
                {
                    "batch_size": [
                        89,
                        "Int!"
                    ],
                    "cursor": [
                        87,
                        "[GlobalStats_stream_cursor_input]!"
                    ],
                    "where": [
                        84
                    ]
                }
            ],
            "Loan": [
                92,
                {
                    "distinct_on": [
                        116,
                        "[Loan_select_column!]"
                    ],
                    "limit": [
                        89
                    ],
                    "offset": [
                        89
                    ],
                    "order_by": [
                        115,
                        "[Loan_order_by!]"
                    ],
                    "where": [
                        112
                    ]
                }
            ],
            "LoanStatusHistory": [
                93,
                {
                    "distinct_on": [
                        100,
                        "[LoanStatusHistory_select_column!]"
                    ],
                    "limit": [
                        89
                    ],
                    "offset": [
                        89
                    ],
                    "order_by": [
                        99,
                        "[LoanStatusHistory_order_by!]"
                    ],
                    "where": [
                        96
                    ]
                }
            ],
            "LoanStatusHistory_by_pk": [
                93,
                {
                    "id": [
                        321,
                        "String!"
                    ]
                }
            ],
            "LoanStatusHistory_stream": [
                93,
                {
                    "batch_size": [
                        89,
                        "Int!"
                    ],
                    "cursor": [
                        104,
                        "[LoanStatusHistory_stream_cursor_input]!"
                    ],
                    "where": [
                        96
                    ]
                }
            ],
            "Loan_by_pk": [
                92,
                {
                    "id": [
                        321,
                        "String!"
                    ]
                }
            ],
            "Loan_stream": [
                92,
                {
                    "batch_size": [
                        89,
                        "Int!"
                    ],
                    "cursor": [
                        120,
                        "[Loan_stream_cursor_input]!"
                    ],
                    "where": [
                        112
                    ]
                }
            ],
            "Market": [
                126,
                {
                    "distinct_on": [
                        145,
                        "[Market_select_column!]"
                    ],
                    "limit": [
                        89
                    ],
                    "offset": [
                        89
                    ],
                    "order_by": [
                        144,
                        "[Market_order_by!]"
                    ],
                    "where": [
                        141
                    ]
                }
            ],
            "MarketRollingStats": [
                127,
                {
                    "distinct_on": [
                        130,
                        "[MarketRollingStats_select_column!]"
                    ],
                    "limit": [
                        89
                    ],
                    "offset": [
                        89
                    ],
                    "order_by": [
                        129,
                        "[MarketRollingStats_order_by!]"
                    ],
                    "where": [
                        128
                    ]
                }
            ],
            "MarketRollingStats_by_pk": [
                127,
                {
                    "id": [
                        321,
                        "String!"
                    ]
                }
            ],
            "MarketRollingStats_stream": [
                127,
                {
                    "batch_size": [
                        89,
                        "Int!"
                    ],
                    "cursor": [
                        131,
                        "[MarketRollingStats_stream_cursor_input]!"
                    ],
                    "where": [
                        128
                    ]
                }
            ],
            "MarketSnapshot": [
                133,
                {
                    "distinct_on": [
                        136,
                        "[MarketSnapshot_select_column!]"
                    ],
                    "limit": [
                        89
                    ],
                    "offset": [
                        89
                    ],
                    "order_by": [
                        135,
                        "[MarketSnapshot_order_by!]"
                    ],
                    "where": [
                        134
                    ]
                }
            ],
            "MarketSnapshot_by_pk": [
                133,
                {
                    "id": [
                        321,
                        "String!"
                    ]
                }
            ],
            "MarketSnapshot_stream": [
                133,
                {
                    "batch_size": [
                        89,
                        "Int!"
                    ],
                    "cursor": [
                        137,
                        "[MarketSnapshot_stream_cursor_input]!"
                    ],
                    "where": [
                        134
                    ]
                }
            ],
            "Market_by_pk": [
                126,
                {
                    "id": [
                        321,
                        "String!"
                    ]
                }
            ],
            "Market_stream": [
                126,
                {
                    "batch_size": [
                        89,
                        "Int!"
                    ],
                    "cursor": [
                        149,
                        "[Market_stream_cursor_input]!"
                    ],
                    "where": [
                        141
                    ]
                }
            ],
            "ModuleAddress": [
                155,
                {
                    "distinct_on": [
                        158,
                        "[ModuleAddress_select_column!]"
                    ],
                    "limit": [
                        89
                    ],
                    "offset": [
                        89
                    ],
                    "order_by": [
                        157,
                        "[ModuleAddress_order_by!]"
                    ],
                    "where": [
                        156
                    ]
                }
            ],
            "ModuleAddress_by_pk": [
                155,
                {
                    "id": [
                        321,
                        "String!"
                    ]
                }
            ],
            "ModuleAddress_stream": [
                155,
                {
                    "batch_size": [
                        89,
                        "Int!"
                    ],
                    "cursor": [
                        159,
                        "[ModuleAddress_stream_cursor_input]!"
                    ],
                    "where": [
                        156
                    ]
                }
            ],
            "ModuleRegistry": [
                161,
                {
                    "distinct_on": [
                        164,
                        "[ModuleRegistry_select_column!]"
                    ],
                    "limit": [
                        89
                    ],
                    "offset": [
                        89
                    ],
                    "order_by": [
                        163,
                        "[ModuleRegistry_order_by!]"
                    ],
                    "where": [
                        162
                    ]
                }
            ],
            "ModuleRegistry_by_pk": [
                161,
                {
                    "id": [
                        321,
                        "String!"
                    ]
                }
            ],
            "ModuleRegistry_stream": [
                161,
                {
                    "batch_size": [
                        89,
                        "Int!"
                    ],
                    "cursor": [
                        165,
                        "[ModuleRegistry_stream_cursor_input]!"
                    ],
                    "where": [
                        162
                    ]
                }
            ],
            "PreSaleContract": [
                167,
                {
                    "distinct_on": [
                        170,
                        "[PreSaleContract_select_column!]"
                    ],
                    "limit": [
                        89
                    ],
                    "offset": [
                        89
                    ],
                    "order_by": [
                        169,
                        "[PreSaleContract_order_by!]"
                    ],
                    "where": [
                        168
                    ]
                }
            ],
            "PreSaleContract_by_pk": [
                167,
                {
                    "id": [
                        321,
                        "String!"
                    ]
                }
            ],
            "PreSaleContract_stream": [
                167,
                {
                    "batch_size": [
                        89,
                        "Int!"
                    ],
                    "cursor": [
                        171,
                        "[PreSaleContract_stream_cursor_input]!"
                    ],
                    "where": [
                        168
                    ]
                }
            ],
            "PresaleClaim": [
                173,
                {
                    "distinct_on": [
                        180,
                        "[PresaleClaim_select_column!]"
                    ],
                    "limit": [
                        89
                    ],
                    "offset": [
                        89
                    ],
                    "order_by": [
                        179,
                        "[PresaleClaim_order_by!]"
                    ],
                    "where": [
                        176
                    ]
                }
            ],
            "PresaleClaim_by_pk": [
                173,
                {
                    "id": [
                        321,
                        "String!"
                    ]
                }
            ],
            "PresaleClaim_stream": [
                173,
                {
                    "batch_size": [
                        89,
                        "Int!"
                    ],
                    "cursor": [
                        184,
                        "[PresaleClaim_stream_cursor_input]!"
                    ],
                    "where": [
                        176
                    ]
                }
            ],
            "PresaleParticipation": [
                190,
                {
                    "distinct_on": [
                        197,
                        "[PresaleParticipation_select_column!]"
                    ],
                    "limit": [
                        89
                    ],
                    "offset": [
                        89
                    ],
                    "order_by": [
                        196,
                        "[PresaleParticipation_order_by!]"
                    ],
                    "where": [
                        193
                    ]
                }
            ],
            "PresaleParticipation_by_pk": [
                190,
                {
                    "id": [
                        321,
                        "String!"
                    ]
                }
            ],
            "PresaleParticipation_stream": [
                190,
                {
                    "batch_size": [
                        89,
                        "Int!"
                    ],
                    "cursor": [
                        201,
                        "[PresaleParticipation_stream_cursor_input]!"
                    ],
                    "where": [
                        193
                    ]
                }
            ],
            "PriceCandle": [
                207,
                {
                    "distinct_on": [
                        210,
                        "[PriceCandle_select_column!]"
                    ],
                    "limit": [
                        89
                    ],
                    "offset": [
                        89
                    ],
                    "order_by": [
                        209,
                        "[PriceCandle_order_by!]"
                    ],
                    "where": [
                        208
                    ]
                }
            ],
            "PriceCandle_by_pk": [
                207,
                {
                    "id": [
                        321,
                        "String!"
                    ]
                }
            ],
            "PriceCandle_stream": [
                207,
                {
                    "batch_size": [
                        89,
                        "Int!"
                    ],
                    "cursor": [
                        211,
                        "[PriceCandle_stream_cursor_input]!"
                    ],
                    "where": [
                        208
                    ]
                }
            ],
            "Role": [
                213,
                {
                    "distinct_on": [
                        254,
                        "[Role_select_column!]"
                    ],
                    "limit": [
                        89
                    ],
                    "offset": [
                        89
                    ],
                    "order_by": [
                        253,
                        "[Role_order_by!]"
                    ],
                    "where": [
                        250
                    ]
                }
            ],
            "RoleMember": [
                214,
                {
                    "distinct_on": [
                        221,
                        "[RoleMember_select_column!]"
                    ],
                    "limit": [
                        89
                    ],
                    "offset": [
                        89
                    ],
                    "order_by": [
                        220,
                        "[RoleMember_order_by!]"
                    ],
                    "where": [
                        217
                    ]
                }
            ],
            "RoleMember_by_pk": [
                214,
                {
                    "id": [
                        321,
                        "String!"
                    ]
                }
            ],
            "RoleMember_stream": [
                214,
                {
                    "batch_size": [
                        89,
                        "Int!"
                    ],
                    "cursor": [
                        225,
                        "[RoleMember_stream_cursor_input]!"
                    ],
                    "where": [
                        217
                    ]
                }
            ],
            "RolePermission": [
                231,
                {
                    "distinct_on": [
                        238,
                        "[RolePermission_select_column!]"
                    ],
                    "limit": [
                        89
                    ],
                    "offset": [
                        89
                    ],
                    "order_by": [
                        237,
                        "[RolePermission_order_by!]"
                    ],
                    "where": [
                        234
                    ]
                }
            ],
            "RolePermission_by_pk": [
                231,
                {
                    "id": [
                        321,
                        "String!"
                    ]
                }
            ],
            "RolePermission_stream": [
                231,
                {
                    "batch_size": [
                        89,
                        "Int!"
                    ],
                    "cursor": [
                        242,
                        "[RolePermission_stream_cursor_input]!"
                    ],
                    "where": [
                        234
                    ]
                }
            ],
            "Role_by_pk": [
                213,
                {
                    "id": [
                        321,
                        "String!"
                    ]
                }
            ],
            "Role_stream": [
                213,
                {
                    "batch_size": [
                        89,
                        "Int!"
                    ],
                    "cursor": [
                        258,
                        "[Role_stream_cursor_input]!"
                    ],
                    "where": [
                        250
                    ]
                }
            ],
            "StakePosition": [
                264,
                {
                    "distinct_on": [
                        271,
                        "[StakePosition_select_column!]"
                    ],
                    "limit": [
                        89
                    ],
                    "offset": [
                        89
                    ],
                    "order_by": [
                        270,
                        "[StakePosition_order_by!]"
                    ],
                    "where": [
                        267
                    ]
                }
            ],
            "StakePosition_by_pk": [
                264,
                {
                    "id": [
                        321,
                        "String!"
                    ]
                }
            ],
            "StakePosition_stream": [
                264,
                {
                    "batch_size": [
                        89,
                        "Int!"
                    ],
                    "cursor": [
                        275,
                        "[StakePosition_stream_cursor_input]!"
                    ],
                    "where": [
                        267
                    ]
                }
            ],
            "StakingActivity": [
                281,
                {
                    "distinct_on": [
                        288,
                        "[StakingActivity_select_column!]"
                    ],
                    "limit": [
                        89
                    ],
                    "offset": [
                        89
                    ],
                    "order_by": [
                        287,
                        "[StakingActivity_order_by!]"
                    ],
                    "where": [
                        284
                    ]
                }
            ],
            "StakingActivity_by_pk": [
                281,
                {
                    "id": [
                        321,
                        "String!"
                    ]
                }
            ],
            "StakingActivity_stream": [
                281,
                {
                    "batch_size": [
                        89,
                        "Int!"
                    ],
                    "cursor": [
                        292,
                        "[StakingActivity_stream_cursor_input]!"
                    ],
                    "where": [
                        284
                    ]
                }
            ],
            "StakingManager": [
                298,
                {
                    "distinct_on": [
                        301,
                        "[StakingManager_select_column!]"
                    ],
                    "limit": [
                        89
                    ],
                    "offset": [
                        89
                    ],
                    "order_by": [
                        300,
                        "[StakingManager_order_by!]"
                    ],
                    "where": [
                        299
                    ]
                }
            ],
            "StakingManager_by_pk": [
                298,
                {
                    "id": [
                        321,
                        "String!"
                    ]
                }
            ],
            "StakingManager_stream": [
                298,
                {
                    "batch_size": [
                        89,
                        "Int!"
                    ],
                    "cursor": [
                        302,
                        "[StakingManager_stream_cursor_input]!"
                    ],
                    "where": [
                        299
                    ]
                }
            ],
            "Strategy": [
                304,
                {
                    "distinct_on": [
                        311,
                        "[Strategy_select_column!]"
                    ],
                    "limit": [
                        89
                    ],
                    "offset": [
                        89
                    ],
                    "order_by": [
                        310,
                        "[Strategy_order_by!]"
                    ],
                    "where": [
                        307
                    ]
                }
            ],
            "Strategy_by_pk": [
                304,
                {
                    "id": [
                        321,
                        "String!"
                    ]
                }
            ],
            "Strategy_stream": [
                304,
                {
                    "batch_size": [
                        89,
                        "Int!"
                    ],
                    "cursor": [
                        315,
                        "[Strategy_stream_cursor_input]!"
                    ],
                    "where": [
                        307
                    ]
                }
            ],
            "Token": [
                324,
                {
                    "distinct_on": [
                        327,
                        "[Token_select_column!]"
                    ],
                    "limit": [
                        89
                    ],
                    "offset": [
                        89
                    ],
                    "order_by": [
                        326,
                        "[Token_order_by!]"
                    ],
                    "where": [
                        325
                    ]
                }
            ],
            "Token_by_pk": [
                324,
                {
                    "id": [
                        321,
                        "String!"
                    ]
                }
            ],
            "Token_stream": [
                324,
                {
                    "batch_size": [
                        89,
                        "Int!"
                    ],
                    "cursor": [
                        328,
                        "[Token_stream_cursor_input]!"
                    ],
                    "where": [
                        325
                    ]
                }
            ],
            "Trade": [
                330,
                {
                    "distinct_on": [
                        337,
                        "[Trade_select_column!]"
                    ],
                    "limit": [
                        89
                    ],
                    "offset": [
                        89
                    ],
                    "order_by": [
                        336,
                        "[Trade_order_by!]"
                    ],
                    "where": [
                        333
                    ]
                }
            ],
            "Trade_by_pk": [
                330,
                {
                    "id": [
                        321,
                        "String!"
                    ]
                }
            ],
            "Trade_stream": [
                330,
                {
                    "batch_size": [
                        89,
                        "Int!"
                    ],
                    "cursor": [
                        341,
                        "[Trade_stream_cursor_input]!"
                    ],
                    "where": [
                        333
                    ]
                }
            ],
            "Treasury": [
                347,
                {
                    "distinct_on": [
                        350,
                        "[Treasury_select_column!]"
                    ],
                    "limit": [
                        89
                    ],
                    "offset": [
                        89
                    ],
                    "order_by": [
                        349,
                        "[Treasury_order_by!]"
                    ],
                    "where": [
                        348
                    ]
                }
            ],
            "Treasury_by_pk": [
                347,
                {
                    "id": [
                        321,
                        "String!"
                    ]
                }
            ],
            "Treasury_stream": [
                347,
                {
                    "batch_size": [
                        89,
                        "Int!"
                    ],
                    "cursor": [
                        351,
                        "[Treasury_stream_cursor_input]!"
                    ],
                    "where": [
                        348
                    ]
                }
            ],
            "UserMarketPosition": [
                353,
                {
                    "distinct_on": [
                        360,
                        "[UserMarketPosition_select_column!]"
                    ],
                    "limit": [
                        89
                    ],
                    "offset": [
                        89
                    ],
                    "order_by": [
                        359,
                        "[UserMarketPosition_order_by!]"
                    ],
                    "where": [
                        356
                    ]
                }
            ],
            "UserMarketPosition_by_pk": [
                353,
                {
                    "id": [
                        321,
                        "String!"
                    ]
                }
            ],
            "UserMarketPosition_stream": [
                353,
                {
                    "batch_size": [
                        89,
                        "Int!"
                    ],
                    "cursor": [
                        364,
                        "[UserMarketPosition_stream_cursor_input]!"
                    ],
                    "where": [
                        356
                    ]
                }
            ],
            "_meta": [
                370,
                {
                    "distinct_on": [
                        373,
                        "[_meta_select_column!]"
                    ],
                    "limit": [
                        89
                    ],
                    "offset": [
                        89
                    ],
                    "order_by": [
                        372,
                        "[_meta_order_by!]"
                    ],
                    "where": [
                        371
                    ]
                }
            ],
            "_meta_stream": [
                370,
                {
                    "batch_size": [
                        89,
                        "Int!"
                    ],
                    "cursor": [
                        374,
                        "[_meta_stream_cursor_input]!"
                    ],
                    "where": [
                        371
                    ]
                }
            ],
            "chain_metadata": [
                378,
                {
                    "distinct_on": [
                        381,
                        "[chain_metadata_select_column!]"
                    ],
                    "limit": [
                        89
                    ],
                    "offset": [
                        89
                    ],
                    "order_by": [
                        380,
                        "[chain_metadata_order_by!]"
                    ],
                    "where": [
                        379
                    ]
                }
            ],
            "chain_metadata_stream": [
                378,
                {
                    "batch_size": [
                        89,
                        "Int!"
                    ],
                    "cursor": [
                        382,
                        "[chain_metadata_stream_cursor_input]!"
                    ],
                    "where": [
                        379
                    ]
                }
            ],
            "raw_events": [
                397,
                {
                    "distinct_on": [
                        400,
                        "[raw_events_select_column!]"
                    ],
                    "limit": [
                        89
                    ],
                    "offset": [
                        89
                    ],
                    "order_by": [
                        399,
                        "[raw_events_order_by!]"
                    ],
                    "where": [
                        398
                    ]
                }
            ],
            "raw_events_by_pk": [
                397,
                {
                    "serial": [
                        89,
                        "Int!"
                    ]
                }
            ],
            "raw_events_stream": [
                397,
                {
                    "batch_size": [
                        89,
                        "Int!"
                    ],
                    "cursor": [
                        401,
                        "[raw_events_stream_cursor_input]!"
                    ],
                    "where": [
                        398
                    ]
                }
            ],
            "__typename": [
                321
            ]
        }
    }
}