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
        284,
        287,
        293,
        303,
        316,
        326,
        339,
        342,
        347,
        350,
        351,
        354,
        356,
        358,
        360,
        361,
        366,
        369,
        371,
        373,
        375
    ],
    "types": {
        "Account": {
            "id": [
                287
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
            "stakes": [
                264,
                {
                    "distinct_on": [
                        271,
                        "[Stake_select_column!]"
                    ],
                    "limit": [
                        89
                    ],
                    "offset": [
                        89
                    ],
                    "order_by": [
                        270,
                        "[Stake_order_by!]"
                    ],
                    "where": [
                        267
                    ]
                }
            ],
            "trades": [
                296,
                {
                    "distinct_on": [
                        303,
                        "[Trade_select_column!]"
                    ],
                    "limit": [
                        89
                    ],
                    "offset": [
                        89
                    ],
                    "order_by": [
                        302,
                        "[Trade_order_by!]"
                    ],
                    "where": [
                        299
                    ]
                }
            ],
            "userMarketPositions": [
                319,
                {
                    "distinct_on": [
                        326,
                        "[UserMarketPosition_select_column!]"
                    ],
                    "limit": [
                        89
                    ],
                    "offset": [
                        89
                    ],
                    "order_by": [
                        325,
                        "[UserMarketPosition_order_by!]"
                    ],
                    "where": [
                        322
                    ]
                }
            ],
            "__typename": [
                287
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
                289
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
            "stakes": [
                267
            ],
            "trades": [
                299
            ],
            "userMarketPositions": [
                322
            ],
            "__typename": [
                287
            ]
        },
        "Account_order_by": {
            "id": [
                360
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
            "stakes_aggregate": [
                265
            ],
            "trades_aggregate": [
                297
            ],
            "userMarketPositions_aggregate": [
                320
            ],
            "__typename": [
                287
            ]
        },
        "Account_select_column": {},
        "Account_stream_cursor_input": {
            "initial_value": [
                5
            ],
            "ordering": [
                350
            ],
            "__typename": [
                287
            ]
        },
        "Account_stream_cursor_value_input": {
            "id": [
                287
            ],
            "__typename": [
                287
            ]
        },
        "AuthorizerContract": {
            "createdAt": [
                358
            ],
            "floor": [
                287
            ],
            "id": [
                287
            ],
            "lastAssignedRoleId": [
                358
            ],
            "lastUpdatedAt": [
                358
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
                287
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
                359
            ],
            "floor": [
                289
            ],
            "id": [
                289
            ],
            "lastAssignedRoleId": [
                359
            ],
            "lastUpdatedAt": [
                359
            ],
            "roles": [
                250
            ],
            "__typename": [
                287
            ]
        },
        "AuthorizerContract_order_by": {
            "createdAt": [
                360
            ],
            "floor": [
                360
            ],
            "id": [
                360
            ],
            "lastAssignedRoleId": [
                360
            ],
            "lastUpdatedAt": [
                360
            ],
            "roles_aggregate": [
                248
            ],
            "__typename": [
                287
            ]
        },
        "AuthorizerContract_select_column": {},
        "AuthorizerContract_stream_cursor_input": {
            "initial_value": [
                11
            ],
            "ordering": [
                350
            ],
            "__typename": [
                287
            ]
        },
        "AuthorizerContract_stream_cursor_value_input": {
            "createdAt": [
                358
            ],
            "floor": [
                287
            ],
            "id": [
                287
            ],
            "lastAssignedRoleId": [
                358
            ],
            "lastUpdatedAt": [
                358
            ],
            "__typename": [
                287
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
                287
            ]
        },
        "CreditFacilityContract": {
            "borrowToken_id": [
                287
            ],
            "collateralToken_id": [
                287
            ],
            "createdAt": [
                358
            ],
            "id": [
                287
            ],
            "lastUpdatedAt": [
                358
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
                287
            ],
            "totalDebtFormatted": [
                287
            ],
            "totalDebtRaw": [
                358
            ],
            "totalLoans": [
                358
            ],
            "totalLockedCollateralFormatted": [
                287
            ],
            "totalLockedCollateralRaw": [
                358
            ],
            "totalVolumeFormatted": [
                287
            ],
            "totalVolumeRaw": [
                358
            ],
            "__typename": [
                287
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
                289
            ],
            "collateralToken_id": [
                289
            ],
            "createdAt": [
                359
            ],
            "id": [
                289
            ],
            "lastUpdatedAt": [
                359
            ],
            "loans": [
                112
            ],
            "market_id": [
                289
            ],
            "totalDebtFormatted": [
                289
            ],
            "totalDebtRaw": [
                359
            ],
            "totalLoans": [
                359
            ],
            "totalLockedCollateralFormatted": [
                289
            ],
            "totalLockedCollateralRaw": [
                359
            ],
            "totalVolumeFormatted": [
                289
            ],
            "totalVolumeRaw": [
                359
            ],
            "__typename": [
                287
            ]
        },
        "CreditFacilityContract_order_by": {
            "borrowToken_id": [
                360
            ],
            "collateralToken_id": [
                360
            ],
            "createdAt": [
                360
            ],
            "id": [
                360
            ],
            "lastUpdatedAt": [
                360
            ],
            "loans_aggregate": [
                110
            ],
            "market_id": [
                360
            ],
            "totalDebtFormatted": [
                360
            ],
            "totalDebtRaw": [
                360
            ],
            "totalLoans": [
                360
            ],
            "totalLockedCollateralFormatted": [
                360
            ],
            "totalLockedCollateralRaw": [
                360
            ],
            "totalVolumeFormatted": [
                360
            ],
            "totalVolumeRaw": [
                360
            ],
            "__typename": [
                287
            ]
        },
        "CreditFacilityContract_select_column": {},
        "CreditFacilityContract_stream_cursor_input": {
            "initial_value": [
                19
            ],
            "ordering": [
                350
            ],
            "__typename": [
                287
            ]
        },
        "CreditFacilityContract_stream_cursor_value_input": {
            "borrowToken_id": [
                287
            ],
            "collateralToken_id": [
                287
            ],
            "createdAt": [
                358
            ],
            "id": [
                287
            ],
            "lastUpdatedAt": [
                358
            ],
            "market_id": [
                287
            ],
            "totalDebtFormatted": [
                287
            ],
            "totalDebtRaw": [
                358
            ],
            "totalLoans": [
                358
            ],
            "totalLockedCollateralFormatted": [
                287
            ],
            "totalLockedCollateralRaw": [
                358
            ],
            "totalVolumeFormatted": [
                287
            ],
            "totalVolumeRaw": [
                358
            ],
            "__typename": [
                287
            ]
        },
        "FeeSplitterPayment": {
            "amountFormatted": [
                287
            ],
            "amountRaw": [
                358
            ],
            "id": [
                287
            ],
            "isFloorFee": [
                12
            ],
            "market_id": [
                287
            ],
            "recipient": [
                287
            ],
            "timestamp": [
                358
            ],
            "token_id": [
                287
            ],
            "transactionHash": [
                287
            ],
            "treasury_id": [
                287
            ],
            "__typename": [
                287
            ]
        },
        "FeeSplitterPayment_aggregate_order_by": {
            "avg": [
                22
            ],
            "count": [
                360
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
                287
            ]
        },
        "FeeSplitterPayment_avg_order_by": {
            "amountRaw": [
                360
            ],
            "timestamp": [
                360
            ],
            "__typename": [
                287
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
                289
            ],
            "amountRaw": [
                359
            ],
            "id": [
                289
            ],
            "isFloorFee": [
                13
            ],
            "market_id": [
                289
            ],
            "recipient": [
                289
            ],
            "timestamp": [
                359
            ],
            "token_id": [
                289
            ],
            "transactionHash": [
                289
            ],
            "treasury_id": [
                289
            ],
            "__typename": [
                287
            ]
        },
        "FeeSplitterPayment_max_order_by": {
            "amountFormatted": [
                360
            ],
            "amountRaw": [
                360
            ],
            "id": [
                360
            ],
            "market_id": [
                360
            ],
            "recipient": [
                360
            ],
            "timestamp": [
                360
            ],
            "token_id": [
                360
            ],
            "transactionHash": [
                360
            ],
            "treasury_id": [
                360
            ],
            "__typename": [
                287
            ]
        },
        "FeeSplitterPayment_min_order_by": {
            "amountFormatted": [
                360
            ],
            "amountRaw": [
                360
            ],
            "id": [
                360
            ],
            "market_id": [
                360
            ],
            "recipient": [
                360
            ],
            "timestamp": [
                360
            ],
            "token_id": [
                360
            ],
            "transactionHash": [
                360
            ],
            "treasury_id": [
                360
            ],
            "__typename": [
                287
            ]
        },
        "FeeSplitterPayment_order_by": {
            "amountFormatted": [
                360
            ],
            "amountRaw": [
                360
            ],
            "id": [
                360
            ],
            "isFloorFee": [
                360
            ],
            "market_id": [
                360
            ],
            "recipient": [
                360
            ],
            "timestamp": [
                360
            ],
            "token_id": [
                360
            ],
            "transactionHash": [
                360
            ],
            "treasury_id": [
                360
            ],
            "__typename": [
                287
            ]
        },
        "FeeSplitterPayment_select_column": {},
        "FeeSplitterPayment_stddev_order_by": {
            "amountRaw": [
                360
            ],
            "timestamp": [
                360
            ],
            "__typename": [
                287
            ]
        },
        "FeeSplitterPayment_stddev_pop_order_by": {
            "amountRaw": [
                360
            ],
            "timestamp": [
                360
            ],
            "__typename": [
                287
            ]
        },
        "FeeSplitterPayment_stddev_samp_order_by": {
            "amountRaw": [
                360
            ],
            "timestamp": [
                360
            ],
            "__typename": [
                287
            ]
        },
        "FeeSplitterPayment_stream_cursor_input": {
            "initial_value": [
                32
            ],
            "ordering": [
                350
            ],
            "__typename": [
                287
            ]
        },
        "FeeSplitterPayment_stream_cursor_value_input": {
            "amountFormatted": [
                287
            ],
            "amountRaw": [
                358
            ],
            "id": [
                287
            ],
            "isFloorFee": [
                12
            ],
            "market_id": [
                287
            ],
            "recipient": [
                287
            ],
            "timestamp": [
                358
            ],
            "token_id": [
                287
            ],
            "transactionHash": [
                287
            ],
            "treasury_id": [
                287
            ],
            "__typename": [
                287
            ]
        },
        "FeeSplitterPayment_sum_order_by": {
            "amountRaw": [
                360
            ],
            "timestamp": [
                360
            ],
            "__typename": [
                287
            ]
        },
        "FeeSplitterPayment_var_pop_order_by": {
            "amountRaw": [
                360
            ],
            "timestamp": [
                360
            ],
            "__typename": [
                287
            ]
        },
        "FeeSplitterPayment_var_samp_order_by": {
            "amountRaw": [
                360
            ],
            "timestamp": [
                360
            ],
            "__typename": [
                287
            ]
        },
        "FeeSplitterPayment_variance_order_by": {
            "amountRaw": [
                360
            ],
            "timestamp": [
                360
            ],
            "__typename": [
                287
            ]
        },
        "FeeSplitterReceipt": {
            "amountFormatted": [
                287
            ],
            "amountRaw": [
                358
            ],
            "id": [
                287
            ],
            "market_id": [
                287
            ],
            "sender": [
                287
            ],
            "timestamp": [
                358
            ],
            "token_id": [
                287
            ],
            "transactionHash": [
                287
            ],
            "treasury_id": [
                287
            ],
            "__typename": [
                287
            ]
        },
        "FeeSplitterReceipt_aggregate_order_by": {
            "avg": [
                39
            ],
            "count": [
                360
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
                287
            ]
        },
        "FeeSplitterReceipt_avg_order_by": {
            "amountRaw": [
                360
            ],
            "timestamp": [
                360
            ],
            "__typename": [
                287
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
                289
            ],
            "amountRaw": [
                359
            ],
            "id": [
                289
            ],
            "market_id": [
                289
            ],
            "sender": [
                289
            ],
            "timestamp": [
                359
            ],
            "token_id": [
                289
            ],
            "transactionHash": [
                289
            ],
            "treasury_id": [
                289
            ],
            "__typename": [
                287
            ]
        },
        "FeeSplitterReceipt_max_order_by": {
            "amountFormatted": [
                360
            ],
            "amountRaw": [
                360
            ],
            "id": [
                360
            ],
            "market_id": [
                360
            ],
            "sender": [
                360
            ],
            "timestamp": [
                360
            ],
            "token_id": [
                360
            ],
            "transactionHash": [
                360
            ],
            "treasury_id": [
                360
            ],
            "__typename": [
                287
            ]
        },
        "FeeSplitterReceipt_min_order_by": {
            "amountFormatted": [
                360
            ],
            "amountRaw": [
                360
            ],
            "id": [
                360
            ],
            "market_id": [
                360
            ],
            "sender": [
                360
            ],
            "timestamp": [
                360
            ],
            "token_id": [
                360
            ],
            "transactionHash": [
                360
            ],
            "treasury_id": [
                360
            ],
            "__typename": [
                287
            ]
        },
        "FeeSplitterReceipt_order_by": {
            "amountFormatted": [
                360
            ],
            "amountRaw": [
                360
            ],
            "id": [
                360
            ],
            "market_id": [
                360
            ],
            "sender": [
                360
            ],
            "timestamp": [
                360
            ],
            "token_id": [
                360
            ],
            "transactionHash": [
                360
            ],
            "treasury_id": [
                360
            ],
            "__typename": [
                287
            ]
        },
        "FeeSplitterReceipt_select_column": {},
        "FeeSplitterReceipt_stddev_order_by": {
            "amountRaw": [
                360
            ],
            "timestamp": [
                360
            ],
            "__typename": [
                287
            ]
        },
        "FeeSplitterReceipt_stddev_pop_order_by": {
            "amountRaw": [
                360
            ],
            "timestamp": [
                360
            ],
            "__typename": [
                287
            ]
        },
        "FeeSplitterReceipt_stddev_samp_order_by": {
            "amountRaw": [
                360
            ],
            "timestamp": [
                360
            ],
            "__typename": [
                287
            ]
        },
        "FeeSplitterReceipt_stream_cursor_input": {
            "initial_value": [
                49
            ],
            "ordering": [
                350
            ],
            "__typename": [
                287
            ]
        },
        "FeeSplitterReceipt_stream_cursor_value_input": {
            "amountFormatted": [
                287
            ],
            "amountRaw": [
                358
            ],
            "id": [
                287
            ],
            "market_id": [
                287
            ],
            "sender": [
                287
            ],
            "timestamp": [
                358
            ],
            "token_id": [
                287
            ],
            "transactionHash": [
                287
            ],
            "treasury_id": [
                287
            ],
            "__typename": [
                287
            ]
        },
        "FeeSplitterReceipt_sum_order_by": {
            "amountRaw": [
                360
            ],
            "timestamp": [
                360
            ],
            "__typename": [
                287
            ]
        },
        "FeeSplitterReceipt_var_pop_order_by": {
            "amountRaw": [
                360
            ],
            "timestamp": [
                360
            ],
            "__typename": [
                287
            ]
        },
        "FeeSplitterReceipt_var_samp_order_by": {
            "amountRaw": [
                360
            ],
            "timestamp": [
                360
            ],
            "__typename": [
                287
            ]
        },
        "FeeSplitterReceipt_variance_order_by": {
            "amountRaw": [
                360
            ],
            "timestamp": [
                360
            ],
            "__typename": [
                287
            ]
        },
        "FloorElevation": {
            "deployedAmountFormatted": [
                287
            ],
            "deployedAmountRaw": [
                358
            ],
            "id": [
                287
            ],
            "market_id": [
                287
            ],
            "newFloorPriceFormatted": [
                287
            ],
            "newFloorPriceRaw": [
                358
            ],
            "oldFloorPriceFormatted": [
                287
            ],
            "oldFloorPriceRaw": [
                358
            ],
            "timestamp": [
                358
            ],
            "transactionHash": [
                287
            ],
            "__typename": [
                287
            ]
        },
        "FloorElevation_aggregate_order_by": {
            "avg": [
                56
            ],
            "count": [
                360
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
                287
            ]
        },
        "FloorElevation_avg_order_by": {
            "deployedAmountRaw": [
                360
            ],
            "newFloorPriceRaw": [
                360
            ],
            "oldFloorPriceRaw": [
                360
            ],
            "timestamp": [
                360
            ],
            "__typename": [
                287
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
                289
            ],
            "deployedAmountRaw": [
                359
            ],
            "id": [
                289
            ],
            "market_id": [
                289
            ],
            "newFloorPriceFormatted": [
                289
            ],
            "newFloorPriceRaw": [
                359
            ],
            "oldFloorPriceFormatted": [
                289
            ],
            "oldFloorPriceRaw": [
                359
            ],
            "timestamp": [
                359
            ],
            "transactionHash": [
                289
            ],
            "__typename": [
                287
            ]
        },
        "FloorElevation_max_order_by": {
            "deployedAmountFormatted": [
                360
            ],
            "deployedAmountRaw": [
                360
            ],
            "id": [
                360
            ],
            "market_id": [
                360
            ],
            "newFloorPriceFormatted": [
                360
            ],
            "newFloorPriceRaw": [
                360
            ],
            "oldFloorPriceFormatted": [
                360
            ],
            "oldFloorPriceRaw": [
                360
            ],
            "timestamp": [
                360
            ],
            "transactionHash": [
                360
            ],
            "__typename": [
                287
            ]
        },
        "FloorElevation_min_order_by": {
            "deployedAmountFormatted": [
                360
            ],
            "deployedAmountRaw": [
                360
            ],
            "id": [
                360
            ],
            "market_id": [
                360
            ],
            "newFloorPriceFormatted": [
                360
            ],
            "newFloorPriceRaw": [
                360
            ],
            "oldFloorPriceFormatted": [
                360
            ],
            "oldFloorPriceRaw": [
                360
            ],
            "timestamp": [
                360
            ],
            "transactionHash": [
                360
            ],
            "__typename": [
                287
            ]
        },
        "FloorElevation_order_by": {
            "deployedAmountFormatted": [
                360
            ],
            "deployedAmountRaw": [
                360
            ],
            "id": [
                360
            ],
            "market_id": [
                360
            ],
            "newFloorPriceFormatted": [
                360
            ],
            "newFloorPriceRaw": [
                360
            ],
            "oldFloorPriceFormatted": [
                360
            ],
            "oldFloorPriceRaw": [
                360
            ],
            "timestamp": [
                360
            ],
            "transactionHash": [
                360
            ],
            "__typename": [
                287
            ]
        },
        "FloorElevation_select_column": {},
        "FloorElevation_stddev_order_by": {
            "deployedAmountRaw": [
                360
            ],
            "newFloorPriceRaw": [
                360
            ],
            "oldFloorPriceRaw": [
                360
            ],
            "timestamp": [
                360
            ],
            "__typename": [
                287
            ]
        },
        "FloorElevation_stddev_pop_order_by": {
            "deployedAmountRaw": [
                360
            ],
            "newFloorPriceRaw": [
                360
            ],
            "oldFloorPriceRaw": [
                360
            ],
            "timestamp": [
                360
            ],
            "__typename": [
                287
            ]
        },
        "FloorElevation_stddev_samp_order_by": {
            "deployedAmountRaw": [
                360
            ],
            "newFloorPriceRaw": [
                360
            ],
            "oldFloorPriceRaw": [
                360
            ],
            "timestamp": [
                360
            ],
            "__typename": [
                287
            ]
        },
        "FloorElevation_stream_cursor_input": {
            "initial_value": [
                66
            ],
            "ordering": [
                350
            ],
            "__typename": [
                287
            ]
        },
        "FloorElevation_stream_cursor_value_input": {
            "deployedAmountFormatted": [
                287
            ],
            "deployedAmountRaw": [
                358
            ],
            "id": [
                287
            ],
            "market_id": [
                287
            ],
            "newFloorPriceFormatted": [
                287
            ],
            "newFloorPriceRaw": [
                358
            ],
            "oldFloorPriceFormatted": [
                287
            ],
            "oldFloorPriceRaw": [
                358
            ],
            "timestamp": [
                358
            ],
            "transactionHash": [
                287
            ],
            "__typename": [
                287
            ]
        },
        "FloorElevation_sum_order_by": {
            "deployedAmountRaw": [
                360
            ],
            "newFloorPriceRaw": [
                360
            ],
            "oldFloorPriceRaw": [
                360
            ],
            "timestamp": [
                360
            ],
            "__typename": [
                287
            ]
        },
        "FloorElevation_var_pop_order_by": {
            "deployedAmountRaw": [
                360
            ],
            "newFloorPriceRaw": [
                360
            ],
            "oldFloorPriceRaw": [
                360
            ],
            "timestamp": [
                360
            ],
            "__typename": [
                287
            ]
        },
        "FloorElevation_var_samp_order_by": {
            "deployedAmountRaw": [
                360
            ],
            "newFloorPriceRaw": [
                360
            ],
            "oldFloorPriceRaw": [
                360
            ],
            "timestamp": [
                360
            ],
            "__typename": [
                287
            ]
        },
        "FloorElevation_variance_order_by": {
            "deployedAmountRaw": [
                360
            ],
            "newFloorPriceRaw": [
                360
            ],
            "oldFloorPriceRaw": [
                360
            ],
            "timestamp": [
                360
            ],
            "__typename": [
                287
            ]
        },
        "GlobalRegistry": {
            "createdAt": [
                358
            ],
            "floorFactoryAddress": [
                287
            ],
            "id": [
                287
            ],
            "lastUpdatedAt": [
                358
            ],
            "moduleFactoryAddress": [
                287
            ],
            "__typename": [
                287
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
                359
            ],
            "floorFactoryAddress": [
                289
            ],
            "id": [
                289
            ],
            "lastUpdatedAt": [
                359
            ],
            "moduleFactoryAddress": [
                289
            ],
            "__typename": [
                287
            ]
        },
        "GlobalRegistry_order_by": {
            "createdAt": [
                360
            ],
            "floorFactoryAddress": [
                360
            ],
            "id": [
                360
            ],
            "lastUpdatedAt": [
                360
            ],
            "moduleFactoryAddress": [
                360
            ],
            "__typename": [
                287
            ]
        },
        "GlobalRegistry_select_column": {},
        "GlobalRegistry_stream_cursor_input": {
            "initial_value": [
                76
            ],
            "ordering": [
                350
            ],
            "__typename": [
                287
            ]
        },
        "GlobalRegistry_stream_cursor_value_input": {
            "createdAt": [
                358
            ],
            "floorFactoryAddress": [
                287
            ],
            "id": [
                287
            ],
            "lastUpdatedAt": [
                358
            ],
            "moduleFactoryAddress": [
                287
            ],
            "__typename": [
                287
            ]
        },
        "GlobalStats": {
            "activeMarkets": [
                358
            ],
            "id": [
                287
            ],
            "lastUpdatedAt": [
                358
            ],
            "totalLockedCollateralFormatted": [
                287
            ],
            "totalLockedCollateralRaw": [
                358
            ],
            "totalMarkets": [
                358
            ],
            "totalOutstandingDebtFormatted": [
                287
            ],
            "totalOutstandingDebtRaw": [
                358
            ],
            "totalVolumeFormatted": [
                287
            ],
            "totalVolumeRaw": [
                358
            ],
            "__typename": [
                287
            ]
        },
        "GlobalStatsSnapshot": {
            "activeMarkets": [
                358
            ],
            "id": [
                287
            ],
            "period": [
                369
            ],
            "periodVolumeFormatted": [
                287
            ],
            "periodVolumeRaw": [
                358
            ],
            "timestamp": [
                358
            ],
            "totalMarketCapFormatted": [
                287
            ],
            "totalMarketCapRaw": [
                358
            ],
            "totalMarkets": [
                358
            ],
            "totalValueLockedFormatted": [
                287
            ],
            "totalValueLockedRaw": [
                358
            ],
            "__typename": [
                287
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
                359
            ],
            "id": [
                289
            ],
            "period": [
                370
            ],
            "periodVolumeFormatted": [
                289
            ],
            "periodVolumeRaw": [
                359
            ],
            "timestamp": [
                359
            ],
            "totalMarketCapFormatted": [
                289
            ],
            "totalMarketCapRaw": [
                359
            ],
            "totalMarkets": [
                359
            ],
            "totalValueLockedFormatted": [
                289
            ],
            "totalValueLockedRaw": [
                359
            ],
            "__typename": [
                287
            ]
        },
        "GlobalStatsSnapshot_order_by": {
            "activeMarkets": [
                360
            ],
            "id": [
                360
            ],
            "period": [
                360
            ],
            "periodVolumeFormatted": [
                360
            ],
            "periodVolumeRaw": [
                360
            ],
            "timestamp": [
                360
            ],
            "totalMarketCapFormatted": [
                360
            ],
            "totalMarketCapRaw": [
                360
            ],
            "totalMarkets": [
                360
            ],
            "totalValueLockedFormatted": [
                360
            ],
            "totalValueLockedRaw": [
                360
            ],
            "__typename": [
                287
            ]
        },
        "GlobalStatsSnapshot_select_column": {},
        "GlobalStatsSnapshot_stream_cursor_input": {
            "initial_value": [
                83
            ],
            "ordering": [
                350
            ],
            "__typename": [
                287
            ]
        },
        "GlobalStatsSnapshot_stream_cursor_value_input": {
            "activeMarkets": [
                358
            ],
            "id": [
                287
            ],
            "period": [
                369
            ],
            "periodVolumeFormatted": [
                287
            ],
            "periodVolumeRaw": [
                358
            ],
            "timestamp": [
                358
            ],
            "totalMarketCapFormatted": [
                287
            ],
            "totalMarketCapRaw": [
                358
            ],
            "totalMarkets": [
                358
            ],
            "totalValueLockedFormatted": [
                287
            ],
            "totalValueLockedRaw": [
                358
            ],
            "__typename": [
                287
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
                359
            ],
            "id": [
                289
            ],
            "lastUpdatedAt": [
                359
            ],
            "totalLockedCollateralFormatted": [
                289
            ],
            "totalLockedCollateralRaw": [
                359
            ],
            "totalMarkets": [
                359
            ],
            "totalOutstandingDebtFormatted": [
                289
            ],
            "totalOutstandingDebtRaw": [
                359
            ],
            "totalVolumeFormatted": [
                289
            ],
            "totalVolumeRaw": [
                359
            ],
            "__typename": [
                287
            ]
        },
        "GlobalStats_order_by": {
            "activeMarkets": [
                360
            ],
            "id": [
                360
            ],
            "lastUpdatedAt": [
                360
            ],
            "totalLockedCollateralFormatted": [
                360
            ],
            "totalLockedCollateralRaw": [
                360
            ],
            "totalMarkets": [
                360
            ],
            "totalOutstandingDebtFormatted": [
                360
            ],
            "totalOutstandingDebtRaw": [
                360
            ],
            "totalVolumeFormatted": [
                360
            ],
            "totalVolumeRaw": [
                360
            ],
            "__typename": [
                287
            ]
        },
        "GlobalStats_select_column": {},
        "GlobalStats_stream_cursor_input": {
            "initial_value": [
                88
            ],
            "ordering": [
                350
            ],
            "__typename": [
                287
            ]
        },
        "GlobalStats_stream_cursor_value_input": {
            "activeMarkets": [
                358
            ],
            "id": [
                287
            ],
            "lastUpdatedAt": [
                358
            ],
            "totalLockedCollateralFormatted": [
                287
            ],
            "totalLockedCollateralRaw": [
                358
            ],
            "totalMarkets": [
                358
            ],
            "totalOutstandingDebtFormatted": [
                287
            ],
            "totalOutstandingDebtRaw": [
                358
            ],
            "totalVolumeFormatted": [
                287
            ],
            "totalVolumeRaw": [
                358
            ],
            "__typename": [
                287
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
                287
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
                287
            ]
        },
        "Loan": {
            "borrowAmountFormatted": [
                287
            ],
            "borrowAmountRaw": [
                358
            ],
            "borrower_id": [
                287
            ],
            "closedAt": [
                358
            ],
            "facility_id": [
                287
            ],
            "floorPriceAtBorrowFormatted": [
                287
            ],
            "floorPriceAtBorrowRaw": [
                358
            ],
            "id": [
                287
            ],
            "lastUpdatedAt": [
                358
            ],
            "lockedCollateralFormatted": [
                287
            ],
            "lockedCollateralRaw": [
                358
            ],
            "market_id": [
                287
            ],
            "openedAt": [
                358
            ],
            "originationFeeFormatted": [
                287
            ],
            "originationFeeRaw": [
                358
            ],
            "remainingDebtFormatted": [
                287
            ],
            "remainingDebtRaw": [
                358
            ],
            "status": [
                354
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
                287
            ],
            "__typename": [
                287
            ]
        },
        "LoanStatusHistory": {
            "id": [
                287
            ],
            "loan_id": [
                287
            ],
            "lockedCollateralFormatted": [
                287
            ],
            "lockedCollateralRaw": [
                358
            ],
            "remainingDebtFormatted": [
                287
            ],
            "remainingDebtRaw": [
                358
            ],
            "status": [
                354
            ],
            "timestamp": [
                358
            ],
            "transactionHash": [
                287
            ],
            "__typename": [
                287
            ]
        },
        "LoanStatusHistory_aggregate_order_by": {
            "avg": [
                95
            ],
            "count": [
                360
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
                287
            ]
        },
        "LoanStatusHistory_avg_order_by": {
            "lockedCollateralRaw": [
                360
            ],
            "remainingDebtRaw": [
                360
            ],
            "timestamp": [
                360
            ],
            "__typename": [
                287
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
                289
            ],
            "loan_id": [
                289
            ],
            "lockedCollateralFormatted": [
                289
            ],
            "lockedCollateralRaw": [
                359
            ],
            "remainingDebtFormatted": [
                289
            ],
            "remainingDebtRaw": [
                359
            ],
            "status": [
                355
            ],
            "timestamp": [
                359
            ],
            "transactionHash": [
                289
            ],
            "__typename": [
                287
            ]
        },
        "LoanStatusHistory_max_order_by": {
            "id": [
                360
            ],
            "loan_id": [
                360
            ],
            "lockedCollateralFormatted": [
                360
            ],
            "lockedCollateralRaw": [
                360
            ],
            "remainingDebtFormatted": [
                360
            ],
            "remainingDebtRaw": [
                360
            ],
            "status": [
                360
            ],
            "timestamp": [
                360
            ],
            "transactionHash": [
                360
            ],
            "__typename": [
                287
            ]
        },
        "LoanStatusHistory_min_order_by": {
            "id": [
                360
            ],
            "loan_id": [
                360
            ],
            "lockedCollateralFormatted": [
                360
            ],
            "lockedCollateralRaw": [
                360
            ],
            "remainingDebtFormatted": [
                360
            ],
            "remainingDebtRaw": [
                360
            ],
            "status": [
                360
            ],
            "timestamp": [
                360
            ],
            "transactionHash": [
                360
            ],
            "__typename": [
                287
            ]
        },
        "LoanStatusHistory_order_by": {
            "id": [
                360
            ],
            "loan_id": [
                360
            ],
            "lockedCollateralFormatted": [
                360
            ],
            "lockedCollateralRaw": [
                360
            ],
            "remainingDebtFormatted": [
                360
            ],
            "remainingDebtRaw": [
                360
            ],
            "status": [
                360
            ],
            "timestamp": [
                360
            ],
            "transactionHash": [
                360
            ],
            "__typename": [
                287
            ]
        },
        "LoanStatusHistory_select_column": {},
        "LoanStatusHistory_stddev_order_by": {
            "lockedCollateralRaw": [
                360
            ],
            "remainingDebtRaw": [
                360
            ],
            "timestamp": [
                360
            ],
            "__typename": [
                287
            ]
        },
        "LoanStatusHistory_stddev_pop_order_by": {
            "lockedCollateralRaw": [
                360
            ],
            "remainingDebtRaw": [
                360
            ],
            "timestamp": [
                360
            ],
            "__typename": [
                287
            ]
        },
        "LoanStatusHistory_stddev_samp_order_by": {
            "lockedCollateralRaw": [
                360
            ],
            "remainingDebtRaw": [
                360
            ],
            "timestamp": [
                360
            ],
            "__typename": [
                287
            ]
        },
        "LoanStatusHistory_stream_cursor_input": {
            "initial_value": [
                105
            ],
            "ordering": [
                350
            ],
            "__typename": [
                287
            ]
        },
        "LoanStatusHistory_stream_cursor_value_input": {
            "id": [
                287
            ],
            "loan_id": [
                287
            ],
            "lockedCollateralFormatted": [
                287
            ],
            "lockedCollateralRaw": [
                358
            ],
            "remainingDebtFormatted": [
                287
            ],
            "remainingDebtRaw": [
                358
            ],
            "status": [
                354
            ],
            "timestamp": [
                358
            ],
            "transactionHash": [
                287
            ],
            "__typename": [
                287
            ]
        },
        "LoanStatusHistory_sum_order_by": {
            "lockedCollateralRaw": [
                360
            ],
            "remainingDebtRaw": [
                360
            ],
            "timestamp": [
                360
            ],
            "__typename": [
                287
            ]
        },
        "LoanStatusHistory_var_pop_order_by": {
            "lockedCollateralRaw": [
                360
            ],
            "remainingDebtRaw": [
                360
            ],
            "timestamp": [
                360
            ],
            "__typename": [
                287
            ]
        },
        "LoanStatusHistory_var_samp_order_by": {
            "lockedCollateralRaw": [
                360
            ],
            "remainingDebtRaw": [
                360
            ],
            "timestamp": [
                360
            ],
            "__typename": [
                287
            ]
        },
        "LoanStatusHistory_variance_order_by": {
            "lockedCollateralRaw": [
                360
            ],
            "remainingDebtRaw": [
                360
            ],
            "timestamp": [
                360
            ],
            "__typename": [
                287
            ]
        },
        "Loan_aggregate_order_by": {
            "avg": [
                111
            ],
            "count": [
                360
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
                287
            ]
        },
        "Loan_avg_order_by": {
            "borrowAmountRaw": [
                360
            ],
            "closedAt": [
                360
            ],
            "floorPriceAtBorrowRaw": [
                360
            ],
            "lastUpdatedAt": [
                360
            ],
            "lockedCollateralRaw": [
                360
            ],
            "openedAt": [
                360
            ],
            "originationFeeRaw": [
                360
            ],
            "remainingDebtRaw": [
                360
            ],
            "__typename": [
                287
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
                289
            ],
            "borrowAmountRaw": [
                359
            ],
            "borrower_id": [
                289
            ],
            "closedAt": [
                359
            ],
            "facility_id": [
                289
            ],
            "floorPriceAtBorrowFormatted": [
                289
            ],
            "floorPriceAtBorrowRaw": [
                359
            ],
            "id": [
                289
            ],
            "lastUpdatedAt": [
                359
            ],
            "lockedCollateralFormatted": [
                289
            ],
            "lockedCollateralRaw": [
                359
            ],
            "market_id": [
                289
            ],
            "openedAt": [
                359
            ],
            "originationFeeFormatted": [
                289
            ],
            "originationFeeRaw": [
                359
            ],
            "remainingDebtFormatted": [
                289
            ],
            "remainingDebtRaw": [
                359
            ],
            "status": [
                355
            ],
            "statusHistory": [
                96
            ],
            "transactionHash": [
                289
            ],
            "__typename": [
                287
            ]
        },
        "Loan_max_order_by": {
            "borrowAmountFormatted": [
                360
            ],
            "borrowAmountRaw": [
                360
            ],
            "borrower_id": [
                360
            ],
            "closedAt": [
                360
            ],
            "facility_id": [
                360
            ],
            "floorPriceAtBorrowFormatted": [
                360
            ],
            "floorPriceAtBorrowRaw": [
                360
            ],
            "id": [
                360
            ],
            "lastUpdatedAt": [
                360
            ],
            "lockedCollateralFormatted": [
                360
            ],
            "lockedCollateralRaw": [
                360
            ],
            "market_id": [
                360
            ],
            "openedAt": [
                360
            ],
            "originationFeeFormatted": [
                360
            ],
            "originationFeeRaw": [
                360
            ],
            "remainingDebtFormatted": [
                360
            ],
            "remainingDebtRaw": [
                360
            ],
            "status": [
                360
            ],
            "transactionHash": [
                360
            ],
            "__typename": [
                287
            ]
        },
        "Loan_min_order_by": {
            "borrowAmountFormatted": [
                360
            ],
            "borrowAmountRaw": [
                360
            ],
            "borrower_id": [
                360
            ],
            "closedAt": [
                360
            ],
            "facility_id": [
                360
            ],
            "floorPriceAtBorrowFormatted": [
                360
            ],
            "floorPriceAtBorrowRaw": [
                360
            ],
            "id": [
                360
            ],
            "lastUpdatedAt": [
                360
            ],
            "lockedCollateralFormatted": [
                360
            ],
            "lockedCollateralRaw": [
                360
            ],
            "market_id": [
                360
            ],
            "openedAt": [
                360
            ],
            "originationFeeFormatted": [
                360
            ],
            "originationFeeRaw": [
                360
            ],
            "remainingDebtFormatted": [
                360
            ],
            "remainingDebtRaw": [
                360
            ],
            "status": [
                360
            ],
            "transactionHash": [
                360
            ],
            "__typename": [
                287
            ]
        },
        "Loan_order_by": {
            "borrowAmountFormatted": [
                360
            ],
            "borrowAmountRaw": [
                360
            ],
            "borrower_id": [
                360
            ],
            "closedAt": [
                360
            ],
            "facility_id": [
                360
            ],
            "floorPriceAtBorrowFormatted": [
                360
            ],
            "floorPriceAtBorrowRaw": [
                360
            ],
            "id": [
                360
            ],
            "lastUpdatedAt": [
                360
            ],
            "lockedCollateralFormatted": [
                360
            ],
            "lockedCollateralRaw": [
                360
            ],
            "market_id": [
                360
            ],
            "openedAt": [
                360
            ],
            "originationFeeFormatted": [
                360
            ],
            "originationFeeRaw": [
                360
            ],
            "remainingDebtFormatted": [
                360
            ],
            "remainingDebtRaw": [
                360
            ],
            "status": [
                360
            ],
            "statusHistory_aggregate": [
                94
            ],
            "transactionHash": [
                360
            ],
            "__typename": [
                287
            ]
        },
        "Loan_select_column": {},
        "Loan_stddev_order_by": {
            "borrowAmountRaw": [
                360
            ],
            "closedAt": [
                360
            ],
            "floorPriceAtBorrowRaw": [
                360
            ],
            "lastUpdatedAt": [
                360
            ],
            "lockedCollateralRaw": [
                360
            ],
            "openedAt": [
                360
            ],
            "originationFeeRaw": [
                360
            ],
            "remainingDebtRaw": [
                360
            ],
            "__typename": [
                287
            ]
        },
        "Loan_stddev_pop_order_by": {
            "borrowAmountRaw": [
                360
            ],
            "closedAt": [
                360
            ],
            "floorPriceAtBorrowRaw": [
                360
            ],
            "lastUpdatedAt": [
                360
            ],
            "lockedCollateralRaw": [
                360
            ],
            "openedAt": [
                360
            ],
            "originationFeeRaw": [
                360
            ],
            "remainingDebtRaw": [
                360
            ],
            "__typename": [
                287
            ]
        },
        "Loan_stddev_samp_order_by": {
            "borrowAmountRaw": [
                360
            ],
            "closedAt": [
                360
            ],
            "floorPriceAtBorrowRaw": [
                360
            ],
            "lastUpdatedAt": [
                360
            ],
            "lockedCollateralRaw": [
                360
            ],
            "openedAt": [
                360
            ],
            "originationFeeRaw": [
                360
            ],
            "remainingDebtRaw": [
                360
            ],
            "__typename": [
                287
            ]
        },
        "Loan_stream_cursor_input": {
            "initial_value": [
                121
            ],
            "ordering": [
                350
            ],
            "__typename": [
                287
            ]
        },
        "Loan_stream_cursor_value_input": {
            "borrowAmountFormatted": [
                287
            ],
            "borrowAmountRaw": [
                358
            ],
            "borrower_id": [
                287
            ],
            "closedAt": [
                358
            ],
            "facility_id": [
                287
            ],
            "floorPriceAtBorrowFormatted": [
                287
            ],
            "floorPriceAtBorrowRaw": [
                358
            ],
            "id": [
                287
            ],
            "lastUpdatedAt": [
                358
            ],
            "lockedCollateralFormatted": [
                287
            ],
            "lockedCollateralRaw": [
                358
            ],
            "market_id": [
                287
            ],
            "openedAt": [
                358
            ],
            "originationFeeFormatted": [
                287
            ],
            "originationFeeRaw": [
                358
            ],
            "remainingDebtFormatted": [
                287
            ],
            "remainingDebtRaw": [
                358
            ],
            "status": [
                354
            ],
            "transactionHash": [
                287
            ],
            "__typename": [
                287
            ]
        },
        "Loan_sum_order_by": {
            "borrowAmountRaw": [
                360
            ],
            "closedAt": [
                360
            ],
            "floorPriceAtBorrowRaw": [
                360
            ],
            "lastUpdatedAt": [
                360
            ],
            "lockedCollateralRaw": [
                360
            ],
            "openedAt": [
                360
            ],
            "originationFeeRaw": [
                360
            ],
            "remainingDebtRaw": [
                360
            ],
            "__typename": [
                287
            ]
        },
        "Loan_var_pop_order_by": {
            "borrowAmountRaw": [
                360
            ],
            "closedAt": [
                360
            ],
            "floorPriceAtBorrowRaw": [
                360
            ],
            "lastUpdatedAt": [
                360
            ],
            "lockedCollateralRaw": [
                360
            ],
            "openedAt": [
                360
            ],
            "originationFeeRaw": [
                360
            ],
            "remainingDebtRaw": [
                360
            ],
            "__typename": [
                287
            ]
        },
        "Loan_var_samp_order_by": {
            "borrowAmountRaw": [
                360
            ],
            "closedAt": [
                360
            ],
            "floorPriceAtBorrowRaw": [
                360
            ],
            "lastUpdatedAt": [
                360
            ],
            "lockedCollateralRaw": [
                360
            ],
            "openedAt": [
                360
            ],
            "originationFeeRaw": [
                360
            ],
            "remainingDebtRaw": [
                360
            ],
            "__typename": [
                287
            ]
        },
        "Loan_variance_order_by": {
            "borrowAmountRaw": [
                360
            ],
            "closedAt": [
                360
            ],
            "floorPriceAtBorrowRaw": [
                360
            ],
            "lastUpdatedAt": [
                360
            ],
            "lockedCollateralRaw": [
                360
            ],
            "openedAt": [
                360
            ],
            "originationFeeRaw": [
                360
            ],
            "remainingDebtRaw": [
                360
            ],
            "__typename": [
                287
            ]
        },
        "Market": {
            "buyFeeBps": [
                358
            ],
            "createdAt": [
                358
            ],
            "creator_id": [
                287
            ],
            "currentPriceFormatted": [
                287
            ],
            "currentPriceRaw": [
                358
            ],
            "factory_id": [
                287
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
                287
            ],
            "floorPriceRaw": [
                358
            ],
            "floorSupplyFormatted": [
                287
            ],
            "floorSupplyRaw": [
                358
            ],
            "id": [
                287
            ],
            "initialFloorPriceFormatted": [
                287
            ],
            "initialFloorPriceRaw": [
                358
            ],
            "isBuyOpen": [
                12
            ],
            "isSellOpen": [
                12
            ],
            "issuanceToken": [
                290
            ],
            "issuanceToken_id": [
                287
            ],
            "lastElevationTimestamp": [
                358
            ],
            "lastTradeTimestamp": [
                358
            ],
            "lastUpdatedAt": [
                358
            ],
            "marketSupplyFormatted": [
                287
            ],
            "marketSupplyRaw": [
                358
            ],
            "maxLTV": [
                358
            ],
            "reserveToken": [
                290
            ],
            "reserveToken_id": [
                287
            ],
            "sellFeeBps": [
                358
            ],
            "status": [
                356
            ],
            "totalSupplyFormatted": [
                287
            ],
            "totalSupplyRaw": [
                358
            ],
            "trades": [
                296,
                {
                    "distinct_on": [
                        303,
                        "[Trade_select_column!]"
                    ],
                    "limit": [
                        89
                    ],
                    "offset": [
                        89
                    ],
                    "order_by": [
                        302,
                        "[Trade_order_by!]"
                    ],
                    "where": [
                        299
                    ]
                }
            ],
            "tradingFeeBps": [
                358
            ],
            "__typename": [
                287
            ]
        },
        "MarketRollingStats": {
            "averagePriceFormatted": [
                287
            ],
            "averagePriceRaw": [
                358
            ],
            "id": [
                287
            ],
            "lastUpdatedAt": [
                358
            ],
            "market_id": [
                287
            ],
            "tradeCount": [
                358
            ],
            "volumeFormatted": [
                287
            ],
            "volumeRaw": [
                358
            ],
            "windowSeconds": [
                89
            ],
            "__typename": [
                287
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
                289
            ],
            "averagePriceRaw": [
                359
            ],
            "id": [
                289
            ],
            "lastUpdatedAt": [
                359
            ],
            "market_id": [
                289
            ],
            "tradeCount": [
                359
            ],
            "volumeFormatted": [
                289
            ],
            "volumeRaw": [
                359
            ],
            "windowSeconds": [
                91
            ],
            "__typename": [
                287
            ]
        },
        "MarketRollingStats_order_by": {
            "averagePriceFormatted": [
                360
            ],
            "averagePriceRaw": [
                360
            ],
            "id": [
                360
            ],
            "lastUpdatedAt": [
                360
            ],
            "market_id": [
                360
            ],
            "tradeCount": [
                360
            ],
            "volumeFormatted": [
                360
            ],
            "volumeRaw": [
                360
            ],
            "windowSeconds": [
                360
            ],
            "__typename": [
                287
            ]
        },
        "MarketRollingStats_select_column": {},
        "MarketRollingStats_stream_cursor_input": {
            "initial_value": [
                132
            ],
            "ordering": [
                350
            ],
            "__typename": [
                287
            ]
        },
        "MarketRollingStats_stream_cursor_value_input": {
            "averagePriceFormatted": [
                287
            ],
            "averagePriceRaw": [
                358
            ],
            "id": [
                287
            ],
            "lastUpdatedAt": [
                358
            ],
            "market_id": [
                287
            ],
            "tradeCount": [
                358
            ],
            "volumeFormatted": [
                287
            ],
            "volumeRaw": [
                358
            ],
            "windowSeconds": [
                89
            ],
            "__typename": [
                287
            ]
        },
        "MarketSnapshot": {
            "floorPriceFormatted": [
                287
            ],
            "floorPriceRaw": [
                358
            ],
            "id": [
                287
            ],
            "marketSupplyFormatted": [
                287
            ],
            "marketSupplyRaw": [
                358
            ],
            "market_id": [
                287
            ],
            "priceFormatted": [
                287
            ],
            "priceRaw": [
                358
            ],
            "timestamp": [
                358
            ],
            "totalSupplyFormatted": [
                287
            ],
            "totalSupplyRaw": [
                358
            ],
            "trades24h": [
                358
            ],
            "volume24hFormatted": [
                287
            ],
            "volume24hRaw": [
                358
            ],
            "__typename": [
                287
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
                289
            ],
            "floorPriceRaw": [
                359
            ],
            "id": [
                289
            ],
            "marketSupplyFormatted": [
                289
            ],
            "marketSupplyRaw": [
                359
            ],
            "market_id": [
                289
            ],
            "priceFormatted": [
                289
            ],
            "priceRaw": [
                359
            ],
            "timestamp": [
                359
            ],
            "totalSupplyFormatted": [
                289
            ],
            "totalSupplyRaw": [
                359
            ],
            "trades24h": [
                359
            ],
            "volume24hFormatted": [
                289
            ],
            "volume24hRaw": [
                359
            ],
            "__typename": [
                287
            ]
        },
        "MarketSnapshot_order_by": {
            "floorPriceFormatted": [
                360
            ],
            "floorPriceRaw": [
                360
            ],
            "id": [
                360
            ],
            "marketSupplyFormatted": [
                360
            ],
            "marketSupplyRaw": [
                360
            ],
            "market_id": [
                360
            ],
            "priceFormatted": [
                360
            ],
            "priceRaw": [
                360
            ],
            "timestamp": [
                360
            ],
            "totalSupplyFormatted": [
                360
            ],
            "totalSupplyRaw": [
                360
            ],
            "trades24h": [
                360
            ],
            "volume24hFormatted": [
                360
            ],
            "volume24hRaw": [
                360
            ],
            "__typename": [
                287
            ]
        },
        "MarketSnapshot_select_column": {},
        "MarketSnapshot_stream_cursor_input": {
            "initial_value": [
                138
            ],
            "ordering": [
                350
            ],
            "__typename": [
                287
            ]
        },
        "MarketSnapshot_stream_cursor_value_input": {
            "floorPriceFormatted": [
                287
            ],
            "floorPriceRaw": [
                358
            ],
            "id": [
                287
            ],
            "marketSupplyFormatted": [
                287
            ],
            "marketSupplyRaw": [
                358
            ],
            "market_id": [
                287
            ],
            "priceFormatted": [
                287
            ],
            "priceRaw": [
                358
            ],
            "timestamp": [
                358
            ],
            "totalSupplyFormatted": [
                287
            ],
            "totalSupplyRaw": [
                358
            ],
            "trades24h": [
                358
            ],
            "volume24hFormatted": [
                287
            ],
            "volume24hRaw": [
                358
            ],
            "__typename": [
                287
            ]
        },
        "Market_aggregate_order_by": {
            "avg": [
                140
            ],
            "count": [
                360
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
                287
            ]
        },
        "Market_avg_order_by": {
            "buyFeeBps": [
                360
            ],
            "createdAt": [
                360
            ],
            "currentPriceRaw": [
                360
            ],
            "floorPriceRaw": [
                360
            ],
            "floorSupplyRaw": [
                360
            ],
            "initialFloorPriceRaw": [
                360
            ],
            "lastElevationTimestamp": [
                360
            ],
            "lastTradeTimestamp": [
                360
            ],
            "lastUpdatedAt": [
                360
            ],
            "marketSupplyRaw": [
                360
            ],
            "maxLTV": [
                360
            ],
            "sellFeeBps": [
                360
            ],
            "totalSupplyRaw": [
                360
            ],
            "tradingFeeBps": [
                360
            ],
            "__typename": [
                287
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
                359
            ],
            "createdAt": [
                359
            ],
            "creator_id": [
                289
            ],
            "currentPriceFormatted": [
                289
            ],
            "currentPriceRaw": [
                359
            ],
            "factory_id": [
                289
            ],
            "floorElevations": [
                57
            ],
            "floorPriceFormatted": [
                289
            ],
            "floorPriceRaw": [
                359
            ],
            "floorSupplyFormatted": [
                289
            ],
            "floorSupplyRaw": [
                359
            ],
            "id": [
                289
            ],
            "initialFloorPriceFormatted": [
                289
            ],
            "initialFloorPriceRaw": [
                359
            ],
            "isBuyOpen": [
                13
            ],
            "isSellOpen": [
                13
            ],
            "issuanceToken": [
                291
            ],
            "issuanceToken_id": [
                289
            ],
            "lastElevationTimestamp": [
                359
            ],
            "lastTradeTimestamp": [
                359
            ],
            "lastUpdatedAt": [
                359
            ],
            "marketSupplyFormatted": [
                289
            ],
            "marketSupplyRaw": [
                359
            ],
            "maxLTV": [
                359
            ],
            "reserveToken": [
                291
            ],
            "reserveToken_id": [
                289
            ],
            "sellFeeBps": [
                359
            ],
            "status": [
                357
            ],
            "totalSupplyFormatted": [
                289
            ],
            "totalSupplyRaw": [
                359
            ],
            "trades": [
                299
            ],
            "tradingFeeBps": [
                359
            ],
            "__typename": [
                287
            ]
        },
        "Market_max_order_by": {
            "buyFeeBps": [
                360
            ],
            "createdAt": [
                360
            ],
            "creator_id": [
                360
            ],
            "currentPriceFormatted": [
                360
            ],
            "currentPriceRaw": [
                360
            ],
            "factory_id": [
                360
            ],
            "floorPriceFormatted": [
                360
            ],
            "floorPriceRaw": [
                360
            ],
            "floorSupplyFormatted": [
                360
            ],
            "floorSupplyRaw": [
                360
            ],
            "id": [
                360
            ],
            "initialFloorPriceFormatted": [
                360
            ],
            "initialFloorPriceRaw": [
                360
            ],
            "issuanceToken_id": [
                360
            ],
            "lastElevationTimestamp": [
                360
            ],
            "lastTradeTimestamp": [
                360
            ],
            "lastUpdatedAt": [
                360
            ],
            "marketSupplyFormatted": [
                360
            ],
            "marketSupplyRaw": [
                360
            ],
            "maxLTV": [
                360
            ],
            "reserveToken_id": [
                360
            ],
            "sellFeeBps": [
                360
            ],
            "status": [
                360
            ],
            "totalSupplyFormatted": [
                360
            ],
            "totalSupplyRaw": [
                360
            ],
            "tradingFeeBps": [
                360
            ],
            "__typename": [
                287
            ]
        },
        "Market_min_order_by": {
            "buyFeeBps": [
                360
            ],
            "createdAt": [
                360
            ],
            "creator_id": [
                360
            ],
            "currentPriceFormatted": [
                360
            ],
            "currentPriceRaw": [
                360
            ],
            "factory_id": [
                360
            ],
            "floorPriceFormatted": [
                360
            ],
            "floorPriceRaw": [
                360
            ],
            "floorSupplyFormatted": [
                360
            ],
            "floorSupplyRaw": [
                360
            ],
            "id": [
                360
            ],
            "initialFloorPriceFormatted": [
                360
            ],
            "initialFloorPriceRaw": [
                360
            ],
            "issuanceToken_id": [
                360
            ],
            "lastElevationTimestamp": [
                360
            ],
            "lastTradeTimestamp": [
                360
            ],
            "lastUpdatedAt": [
                360
            ],
            "marketSupplyFormatted": [
                360
            ],
            "marketSupplyRaw": [
                360
            ],
            "maxLTV": [
                360
            ],
            "reserveToken_id": [
                360
            ],
            "sellFeeBps": [
                360
            ],
            "status": [
                360
            ],
            "totalSupplyFormatted": [
                360
            ],
            "totalSupplyRaw": [
                360
            ],
            "tradingFeeBps": [
                360
            ],
            "__typename": [
                287
            ]
        },
        "Market_order_by": {
            "buyFeeBps": [
                360
            ],
            "createdAt": [
                360
            ],
            "creator_id": [
                360
            ],
            "currentPriceFormatted": [
                360
            ],
            "currentPriceRaw": [
                360
            ],
            "factory_id": [
                360
            ],
            "floorElevations_aggregate": [
                55
            ],
            "floorPriceFormatted": [
                360
            ],
            "floorPriceRaw": [
                360
            ],
            "floorSupplyFormatted": [
                360
            ],
            "floorSupplyRaw": [
                360
            ],
            "id": [
                360
            ],
            "initialFloorPriceFormatted": [
                360
            ],
            "initialFloorPriceRaw": [
                360
            ],
            "isBuyOpen": [
                360
            ],
            "isSellOpen": [
                360
            ],
            "issuanceToken": [
                292
            ],
            "issuanceToken_id": [
                360
            ],
            "lastElevationTimestamp": [
                360
            ],
            "lastTradeTimestamp": [
                360
            ],
            "lastUpdatedAt": [
                360
            ],
            "marketSupplyFormatted": [
                360
            ],
            "marketSupplyRaw": [
                360
            ],
            "maxLTV": [
                360
            ],
            "reserveToken": [
                292
            ],
            "reserveToken_id": [
                360
            ],
            "sellFeeBps": [
                360
            ],
            "status": [
                360
            ],
            "totalSupplyFormatted": [
                360
            ],
            "totalSupplyRaw": [
                360
            ],
            "trades_aggregate": [
                297
            ],
            "tradingFeeBps": [
                360
            ],
            "__typename": [
                287
            ]
        },
        "Market_select_column": {},
        "Market_stddev_order_by": {
            "buyFeeBps": [
                360
            ],
            "createdAt": [
                360
            ],
            "currentPriceRaw": [
                360
            ],
            "floorPriceRaw": [
                360
            ],
            "floorSupplyRaw": [
                360
            ],
            "initialFloorPriceRaw": [
                360
            ],
            "lastElevationTimestamp": [
                360
            ],
            "lastTradeTimestamp": [
                360
            ],
            "lastUpdatedAt": [
                360
            ],
            "marketSupplyRaw": [
                360
            ],
            "maxLTV": [
                360
            ],
            "sellFeeBps": [
                360
            ],
            "totalSupplyRaw": [
                360
            ],
            "tradingFeeBps": [
                360
            ],
            "__typename": [
                287
            ]
        },
        "Market_stddev_pop_order_by": {
            "buyFeeBps": [
                360
            ],
            "createdAt": [
                360
            ],
            "currentPriceRaw": [
                360
            ],
            "floorPriceRaw": [
                360
            ],
            "floorSupplyRaw": [
                360
            ],
            "initialFloorPriceRaw": [
                360
            ],
            "lastElevationTimestamp": [
                360
            ],
            "lastTradeTimestamp": [
                360
            ],
            "lastUpdatedAt": [
                360
            ],
            "marketSupplyRaw": [
                360
            ],
            "maxLTV": [
                360
            ],
            "sellFeeBps": [
                360
            ],
            "totalSupplyRaw": [
                360
            ],
            "tradingFeeBps": [
                360
            ],
            "__typename": [
                287
            ]
        },
        "Market_stddev_samp_order_by": {
            "buyFeeBps": [
                360
            ],
            "createdAt": [
                360
            ],
            "currentPriceRaw": [
                360
            ],
            "floorPriceRaw": [
                360
            ],
            "floorSupplyRaw": [
                360
            ],
            "initialFloorPriceRaw": [
                360
            ],
            "lastElevationTimestamp": [
                360
            ],
            "lastTradeTimestamp": [
                360
            ],
            "lastUpdatedAt": [
                360
            ],
            "marketSupplyRaw": [
                360
            ],
            "maxLTV": [
                360
            ],
            "sellFeeBps": [
                360
            ],
            "totalSupplyRaw": [
                360
            ],
            "tradingFeeBps": [
                360
            ],
            "__typename": [
                287
            ]
        },
        "Market_stream_cursor_input": {
            "initial_value": [
                150
            ],
            "ordering": [
                350
            ],
            "__typename": [
                287
            ]
        },
        "Market_stream_cursor_value_input": {
            "buyFeeBps": [
                358
            ],
            "createdAt": [
                358
            ],
            "creator_id": [
                287
            ],
            "currentPriceFormatted": [
                287
            ],
            "currentPriceRaw": [
                358
            ],
            "factory_id": [
                287
            ],
            "floorPriceFormatted": [
                287
            ],
            "floorPriceRaw": [
                358
            ],
            "floorSupplyFormatted": [
                287
            ],
            "floorSupplyRaw": [
                358
            ],
            "id": [
                287
            ],
            "initialFloorPriceFormatted": [
                287
            ],
            "initialFloorPriceRaw": [
                358
            ],
            "isBuyOpen": [
                12
            ],
            "isSellOpen": [
                12
            ],
            "issuanceToken_id": [
                287
            ],
            "lastElevationTimestamp": [
                358
            ],
            "lastTradeTimestamp": [
                358
            ],
            "lastUpdatedAt": [
                358
            ],
            "marketSupplyFormatted": [
                287
            ],
            "marketSupplyRaw": [
                358
            ],
            "maxLTV": [
                358
            ],
            "reserveToken_id": [
                287
            ],
            "sellFeeBps": [
                358
            ],
            "status": [
                356
            ],
            "totalSupplyFormatted": [
                287
            ],
            "totalSupplyRaw": [
                358
            ],
            "tradingFeeBps": [
                358
            ],
            "__typename": [
                287
            ]
        },
        "Market_sum_order_by": {
            "buyFeeBps": [
                360
            ],
            "createdAt": [
                360
            ],
            "currentPriceRaw": [
                360
            ],
            "floorPriceRaw": [
                360
            ],
            "floorSupplyRaw": [
                360
            ],
            "initialFloorPriceRaw": [
                360
            ],
            "lastElevationTimestamp": [
                360
            ],
            "lastTradeTimestamp": [
                360
            ],
            "lastUpdatedAt": [
                360
            ],
            "marketSupplyRaw": [
                360
            ],
            "maxLTV": [
                360
            ],
            "sellFeeBps": [
                360
            ],
            "totalSupplyRaw": [
                360
            ],
            "tradingFeeBps": [
                360
            ],
            "__typename": [
                287
            ]
        },
        "Market_var_pop_order_by": {
            "buyFeeBps": [
                360
            ],
            "createdAt": [
                360
            ],
            "currentPriceRaw": [
                360
            ],
            "floorPriceRaw": [
                360
            ],
            "floorSupplyRaw": [
                360
            ],
            "initialFloorPriceRaw": [
                360
            ],
            "lastElevationTimestamp": [
                360
            ],
            "lastTradeTimestamp": [
                360
            ],
            "lastUpdatedAt": [
                360
            ],
            "marketSupplyRaw": [
                360
            ],
            "maxLTV": [
                360
            ],
            "sellFeeBps": [
                360
            ],
            "totalSupplyRaw": [
                360
            ],
            "tradingFeeBps": [
                360
            ],
            "__typename": [
                287
            ]
        },
        "Market_var_samp_order_by": {
            "buyFeeBps": [
                360
            ],
            "createdAt": [
                360
            ],
            "currentPriceRaw": [
                360
            ],
            "floorPriceRaw": [
                360
            ],
            "floorSupplyRaw": [
                360
            ],
            "initialFloorPriceRaw": [
                360
            ],
            "lastElevationTimestamp": [
                360
            ],
            "lastTradeTimestamp": [
                360
            ],
            "lastUpdatedAt": [
                360
            ],
            "marketSupplyRaw": [
                360
            ],
            "maxLTV": [
                360
            ],
            "sellFeeBps": [
                360
            ],
            "totalSupplyRaw": [
                360
            ],
            "tradingFeeBps": [
                360
            ],
            "__typename": [
                287
            ]
        },
        "Market_variance_order_by": {
            "buyFeeBps": [
                360
            ],
            "createdAt": [
                360
            ],
            "currentPriceRaw": [
                360
            ],
            "floorPriceRaw": [
                360
            ],
            "floorSupplyRaw": [
                360
            ],
            "initialFloorPriceRaw": [
                360
            ],
            "lastElevationTimestamp": [
                360
            ],
            "lastTradeTimestamp": [
                360
            ],
            "lastUpdatedAt": [
                360
            ],
            "marketSupplyRaw": [
                360
            ],
            "maxLTV": [
                360
            ],
            "sellFeeBps": [
                360
            ],
            "totalSupplyRaw": [
                360
            ],
            "tradingFeeBps": [
                360
            ],
            "__typename": [
                287
            ]
        },
        "ModuleAddress": {
            "createdAt": [
                358
            ],
            "id": [
                287
            ],
            "lastUpdatedAt": [
                358
            ],
            "market_id": [
                287
            ],
            "moduleType": [
                287
            ],
            "__typename": [
                287
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
                359
            ],
            "id": [
                289
            ],
            "lastUpdatedAt": [
                359
            ],
            "market_id": [
                289
            ],
            "moduleType": [
                289
            ],
            "__typename": [
                287
            ]
        },
        "ModuleAddress_order_by": {
            "createdAt": [
                360
            ],
            "id": [
                360
            ],
            "lastUpdatedAt": [
                360
            ],
            "market_id": [
                360
            ],
            "moduleType": [
                360
            ],
            "__typename": [
                287
            ]
        },
        "ModuleAddress_select_column": {},
        "ModuleAddress_stream_cursor_input": {
            "initial_value": [
                160
            ],
            "ordering": [
                350
            ],
            "__typename": [
                287
            ]
        },
        "ModuleAddress_stream_cursor_value_input": {
            "createdAt": [
                358
            ],
            "id": [
                287
            ],
            "lastUpdatedAt": [
                358
            ],
            "market_id": [
                287
            ],
            "moduleType": [
                287
            ],
            "__typename": [
                287
            ]
        },
        "ModuleRegistry": {
            "authorizer": [
                287
            ],
            "createdAt": [
                358
            ],
            "creditFacility": [
                287
            ],
            "feeTreasury": [
                287
            ],
            "floor": [
                287
            ],
            "id": [
                287
            ],
            "lastUpdatedAt": [
                358
            ],
            "presale": [
                287
            ],
            "staking": [
                287
            ],
            "__typename": [
                287
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
                289
            ],
            "createdAt": [
                359
            ],
            "creditFacility": [
                289
            ],
            "feeTreasury": [
                289
            ],
            "floor": [
                289
            ],
            "id": [
                289
            ],
            "lastUpdatedAt": [
                359
            ],
            "presale": [
                289
            ],
            "staking": [
                289
            ],
            "__typename": [
                287
            ]
        },
        "ModuleRegistry_order_by": {
            "authorizer": [
                360
            ],
            "createdAt": [
                360
            ],
            "creditFacility": [
                360
            ],
            "feeTreasury": [
                360
            ],
            "floor": [
                360
            ],
            "id": [
                360
            ],
            "lastUpdatedAt": [
                360
            ],
            "presale": [
                360
            ],
            "staking": [
                360
            ],
            "__typename": [
                287
            ]
        },
        "ModuleRegistry_select_column": {},
        "ModuleRegistry_stream_cursor_input": {
            "initial_value": [
                166
            ],
            "ordering": [
                350
            ],
            "__typename": [
                287
            ]
        },
        "ModuleRegistry_stream_cursor_value_input": {
            "authorizer": [
                287
            ],
            "createdAt": [
                358
            ],
            "creditFacility": [
                287
            ],
            "feeTreasury": [
                287
            ],
            "floor": [
                287
            ],
            "id": [
                287
            ],
            "lastUpdatedAt": [
                358
            ],
            "presale": [
                287
            ],
            "staking": [
                287
            ],
            "__typename": [
                287
            ]
        },
        "PreSaleContract": {
            "authorizer": [
                287
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
                287
            ],
            "createdAt": [
                358
            ],
            "currentState": [
                89
            ],
            "endTime": [
                358
            ],
            "feeTreasury": [
                287
            ],
            "globalDepositCapFormatted": [
                287
            ],
            "globalDepositCapRaw": [
                358
            ],
            "id": [
                287
            ],
            "lastUpdatedAt": [
                358
            ],
            "lendingFacility": [
                287
            ],
            "market_id": [
                287
            ],
            "maxLeverage": [
                358
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
                287
            ],
            "perAddressDepositCapRaw": [
                358
            ],
            "priceBreakpointOffsets": [
                89
            ],
            "priceBreakpointsFlat": [
                287
            ],
            "purchaseToken": [
                290
            ],
            "purchaseToken_id": [
                287
            ],
            "saleToken": [
                290
            ],
            "saleToken_id": [
                287
            ],
            "startTime": [
                358
            ],
            "timeSafeguardTs": [
                358
            ],
            "totalParticipants": [
                358
            ],
            "totalRaisedFormatted": [
                287
            ],
            "totalRaisedRaw": [
                358
            ],
            "whitelistSize": [
                358
            ],
            "whitelistedAddresses": [
                287
            ],
            "__typename": [
                287
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
                289
            ],
            "claims": [
                176
            ],
            "commissionBps": [
                288
            ],
            "createdAt": [
                359
            ],
            "currentState": [
                91
            ],
            "endTime": [
                359
            ],
            "feeTreasury": [
                289
            ],
            "globalDepositCapFormatted": [
                289
            ],
            "globalDepositCapRaw": [
                359
            ],
            "id": [
                289
            ],
            "lastUpdatedAt": [
                359
            ],
            "lendingFacility": [
                289
            ],
            "market_id": [
                289
            ],
            "maxLeverage": [
                359
            ],
            "participations": [
                193
            ],
            "perAddressDepositCapFormatted": [
                289
            ],
            "perAddressDepositCapRaw": [
                359
            ],
            "priceBreakpointOffsets": [
                90
            ],
            "priceBreakpointsFlat": [
                288
            ],
            "purchaseToken": [
                291
            ],
            "purchaseToken_id": [
                289
            ],
            "saleToken": [
                291
            ],
            "saleToken_id": [
                289
            ],
            "startTime": [
                359
            ],
            "timeSafeguardTs": [
                359
            ],
            "totalParticipants": [
                359
            ],
            "totalRaisedFormatted": [
                289
            ],
            "totalRaisedRaw": [
                359
            ],
            "whitelistSize": [
                359
            ],
            "whitelistedAddresses": [
                288
            ],
            "__typename": [
                287
            ]
        },
        "PreSaleContract_order_by": {
            "authorizer": [
                360
            ],
            "claims_aggregate": [
                174
            ],
            "commissionBps": [
                360
            ],
            "createdAt": [
                360
            ],
            "currentState": [
                360
            ],
            "endTime": [
                360
            ],
            "feeTreasury": [
                360
            ],
            "globalDepositCapFormatted": [
                360
            ],
            "globalDepositCapRaw": [
                360
            ],
            "id": [
                360
            ],
            "lastUpdatedAt": [
                360
            ],
            "lendingFacility": [
                360
            ],
            "market_id": [
                360
            ],
            "maxLeverage": [
                360
            ],
            "participations_aggregate": [
                191
            ],
            "perAddressDepositCapFormatted": [
                360
            ],
            "perAddressDepositCapRaw": [
                360
            ],
            "priceBreakpointOffsets": [
                360
            ],
            "priceBreakpointsFlat": [
                360
            ],
            "purchaseToken": [
                292
            ],
            "purchaseToken_id": [
                360
            ],
            "saleToken": [
                292
            ],
            "saleToken_id": [
                360
            ],
            "startTime": [
                360
            ],
            "timeSafeguardTs": [
                360
            ],
            "totalParticipants": [
                360
            ],
            "totalRaisedFormatted": [
                360
            ],
            "totalRaisedRaw": [
                360
            ],
            "whitelistSize": [
                360
            ],
            "whitelistedAddresses": [
                360
            ],
            "__typename": [
                287
            ]
        },
        "PreSaleContract_select_column": {},
        "PreSaleContract_stream_cursor_input": {
            "initial_value": [
                172
            ],
            "ordering": [
                350
            ],
            "__typename": [
                287
            ]
        },
        "PreSaleContract_stream_cursor_value_input": {
            "authorizer": [
                287
            ],
            "commissionBps": [
                287
            ],
            "createdAt": [
                358
            ],
            "currentState": [
                89
            ],
            "endTime": [
                358
            ],
            "feeTreasury": [
                287
            ],
            "globalDepositCapFormatted": [
                287
            ],
            "globalDepositCapRaw": [
                358
            ],
            "id": [
                287
            ],
            "lastUpdatedAt": [
                358
            ],
            "lendingFacility": [
                287
            ],
            "market_id": [
                287
            ],
            "maxLeverage": [
                358
            ],
            "perAddressDepositCapFormatted": [
                287
            ],
            "perAddressDepositCapRaw": [
                358
            ],
            "priceBreakpointOffsets": [
                89
            ],
            "priceBreakpointsFlat": [
                287
            ],
            "purchaseToken_id": [
                287
            ],
            "saleToken_id": [
                287
            ],
            "startTime": [
                358
            ],
            "timeSafeguardTs": [
                358
            ],
            "totalParticipants": [
                358
            ],
            "totalRaisedFormatted": [
                287
            ],
            "totalRaisedRaw": [
                358
            ],
            "whitelistSize": [
                358
            ],
            "whitelistedAddresses": [
                287
            ],
            "__typename": [
                287
            ]
        },
        "PresaleClaim": {
            "amountFormatted": [
                287
            ],
            "amountRaw": [
                358
            ],
            "claimType": [
                361
            ],
            "id": [
                287
            ],
            "loanId": [
                358
            ],
            "positionId": [
                358
            ],
            "presale_id": [
                287
            ],
            "timestamp": [
                358
            ],
            "trancheIndex": [
                358
            ],
            "transactionHash": [
                287
            ],
            "__typename": [
                287
            ]
        },
        "PresaleClaim_aggregate_order_by": {
            "avg": [
                175
            ],
            "count": [
                360
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
                287
            ]
        },
        "PresaleClaim_avg_order_by": {
            "amountRaw": [
                360
            ],
            "loanId": [
                360
            ],
            "positionId": [
                360
            ],
            "timestamp": [
                360
            ],
            "trancheIndex": [
                360
            ],
            "__typename": [
                287
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
                289
            ],
            "amountRaw": [
                359
            ],
            "claimType": [
                362
            ],
            "id": [
                289
            ],
            "loanId": [
                359
            ],
            "positionId": [
                359
            ],
            "presale_id": [
                289
            ],
            "timestamp": [
                359
            ],
            "trancheIndex": [
                359
            ],
            "transactionHash": [
                289
            ],
            "__typename": [
                287
            ]
        },
        "PresaleClaim_max_order_by": {
            "amountFormatted": [
                360
            ],
            "amountRaw": [
                360
            ],
            "claimType": [
                360
            ],
            "id": [
                360
            ],
            "loanId": [
                360
            ],
            "positionId": [
                360
            ],
            "presale_id": [
                360
            ],
            "timestamp": [
                360
            ],
            "trancheIndex": [
                360
            ],
            "transactionHash": [
                360
            ],
            "__typename": [
                287
            ]
        },
        "PresaleClaim_min_order_by": {
            "amountFormatted": [
                360
            ],
            "amountRaw": [
                360
            ],
            "claimType": [
                360
            ],
            "id": [
                360
            ],
            "loanId": [
                360
            ],
            "positionId": [
                360
            ],
            "presale_id": [
                360
            ],
            "timestamp": [
                360
            ],
            "trancheIndex": [
                360
            ],
            "transactionHash": [
                360
            ],
            "__typename": [
                287
            ]
        },
        "PresaleClaim_order_by": {
            "amountFormatted": [
                360
            ],
            "amountRaw": [
                360
            ],
            "claimType": [
                360
            ],
            "id": [
                360
            ],
            "loanId": [
                360
            ],
            "positionId": [
                360
            ],
            "presale_id": [
                360
            ],
            "timestamp": [
                360
            ],
            "trancheIndex": [
                360
            ],
            "transactionHash": [
                360
            ],
            "__typename": [
                287
            ]
        },
        "PresaleClaim_select_column": {},
        "PresaleClaim_stddev_order_by": {
            "amountRaw": [
                360
            ],
            "loanId": [
                360
            ],
            "positionId": [
                360
            ],
            "timestamp": [
                360
            ],
            "trancheIndex": [
                360
            ],
            "__typename": [
                287
            ]
        },
        "PresaleClaim_stddev_pop_order_by": {
            "amountRaw": [
                360
            ],
            "loanId": [
                360
            ],
            "positionId": [
                360
            ],
            "timestamp": [
                360
            ],
            "trancheIndex": [
                360
            ],
            "__typename": [
                287
            ]
        },
        "PresaleClaim_stddev_samp_order_by": {
            "amountRaw": [
                360
            ],
            "loanId": [
                360
            ],
            "positionId": [
                360
            ],
            "timestamp": [
                360
            ],
            "trancheIndex": [
                360
            ],
            "__typename": [
                287
            ]
        },
        "PresaleClaim_stream_cursor_input": {
            "initial_value": [
                185
            ],
            "ordering": [
                350
            ],
            "__typename": [
                287
            ]
        },
        "PresaleClaim_stream_cursor_value_input": {
            "amountFormatted": [
                287
            ],
            "amountRaw": [
                358
            ],
            "claimType": [
                361
            ],
            "id": [
                287
            ],
            "loanId": [
                358
            ],
            "positionId": [
                358
            ],
            "presale_id": [
                287
            ],
            "timestamp": [
                358
            ],
            "trancheIndex": [
                358
            ],
            "transactionHash": [
                287
            ],
            "__typename": [
                287
            ]
        },
        "PresaleClaim_sum_order_by": {
            "amountRaw": [
                360
            ],
            "loanId": [
                360
            ],
            "positionId": [
                360
            ],
            "timestamp": [
                360
            ],
            "trancheIndex": [
                360
            ],
            "__typename": [
                287
            ]
        },
        "PresaleClaim_var_pop_order_by": {
            "amountRaw": [
                360
            ],
            "loanId": [
                360
            ],
            "positionId": [
                360
            ],
            "timestamp": [
                360
            ],
            "trancheIndex": [
                360
            ],
            "__typename": [
                287
            ]
        },
        "PresaleClaim_var_samp_order_by": {
            "amountRaw": [
                360
            ],
            "loanId": [
                360
            ],
            "positionId": [
                360
            ],
            "timestamp": [
                360
            ],
            "trancheIndex": [
                360
            ],
            "__typename": [
                287
            ]
        },
        "PresaleClaim_variance_order_by": {
            "amountRaw": [
                360
            ],
            "loanId": [
                360
            ],
            "positionId": [
                360
            ],
            "timestamp": [
                360
            ],
            "trancheIndex": [
                360
            ],
            "__typename": [
                287
            ]
        },
        "PresaleParticipation": {
            "depositAmountFormatted": [
                287
            ],
            "depositAmountRaw": [
                358
            ],
            "id": [
                287
            ],
            "leverage": [
                358
            ],
            "loopCount": [
                358
            ],
            "mintedAmountFormatted": [
                287
            ],
            "mintedAmountRaw": [
                358
            ],
            "positionId": [
                358
            ],
            "presale_id": [
                287
            ],
            "timestamp": [
                358
            ],
            "transactionHash": [
                287
            ],
            "user_id": [
                287
            ],
            "__typename": [
                287
            ]
        },
        "PresaleParticipation_aggregate_order_by": {
            "avg": [
                192
            ],
            "count": [
                360
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
                287
            ]
        },
        "PresaleParticipation_avg_order_by": {
            "depositAmountRaw": [
                360
            ],
            "leverage": [
                360
            ],
            "loopCount": [
                360
            ],
            "mintedAmountRaw": [
                360
            ],
            "positionId": [
                360
            ],
            "timestamp": [
                360
            ],
            "__typename": [
                287
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
                289
            ],
            "depositAmountRaw": [
                359
            ],
            "id": [
                289
            ],
            "leverage": [
                359
            ],
            "loopCount": [
                359
            ],
            "mintedAmountFormatted": [
                289
            ],
            "mintedAmountRaw": [
                359
            ],
            "positionId": [
                359
            ],
            "presale_id": [
                289
            ],
            "timestamp": [
                359
            ],
            "transactionHash": [
                289
            ],
            "user_id": [
                289
            ],
            "__typename": [
                287
            ]
        },
        "PresaleParticipation_max_order_by": {
            "depositAmountFormatted": [
                360
            ],
            "depositAmountRaw": [
                360
            ],
            "id": [
                360
            ],
            "leverage": [
                360
            ],
            "loopCount": [
                360
            ],
            "mintedAmountFormatted": [
                360
            ],
            "mintedAmountRaw": [
                360
            ],
            "positionId": [
                360
            ],
            "presale_id": [
                360
            ],
            "timestamp": [
                360
            ],
            "transactionHash": [
                360
            ],
            "user_id": [
                360
            ],
            "__typename": [
                287
            ]
        },
        "PresaleParticipation_min_order_by": {
            "depositAmountFormatted": [
                360
            ],
            "depositAmountRaw": [
                360
            ],
            "id": [
                360
            ],
            "leverage": [
                360
            ],
            "loopCount": [
                360
            ],
            "mintedAmountFormatted": [
                360
            ],
            "mintedAmountRaw": [
                360
            ],
            "positionId": [
                360
            ],
            "presale_id": [
                360
            ],
            "timestamp": [
                360
            ],
            "transactionHash": [
                360
            ],
            "user_id": [
                360
            ],
            "__typename": [
                287
            ]
        },
        "PresaleParticipation_order_by": {
            "depositAmountFormatted": [
                360
            ],
            "depositAmountRaw": [
                360
            ],
            "id": [
                360
            ],
            "leverage": [
                360
            ],
            "loopCount": [
                360
            ],
            "mintedAmountFormatted": [
                360
            ],
            "mintedAmountRaw": [
                360
            ],
            "positionId": [
                360
            ],
            "presale_id": [
                360
            ],
            "timestamp": [
                360
            ],
            "transactionHash": [
                360
            ],
            "user_id": [
                360
            ],
            "__typename": [
                287
            ]
        },
        "PresaleParticipation_select_column": {},
        "PresaleParticipation_stddev_order_by": {
            "depositAmountRaw": [
                360
            ],
            "leverage": [
                360
            ],
            "loopCount": [
                360
            ],
            "mintedAmountRaw": [
                360
            ],
            "positionId": [
                360
            ],
            "timestamp": [
                360
            ],
            "__typename": [
                287
            ]
        },
        "PresaleParticipation_stddev_pop_order_by": {
            "depositAmountRaw": [
                360
            ],
            "leverage": [
                360
            ],
            "loopCount": [
                360
            ],
            "mintedAmountRaw": [
                360
            ],
            "positionId": [
                360
            ],
            "timestamp": [
                360
            ],
            "__typename": [
                287
            ]
        },
        "PresaleParticipation_stddev_samp_order_by": {
            "depositAmountRaw": [
                360
            ],
            "leverage": [
                360
            ],
            "loopCount": [
                360
            ],
            "mintedAmountRaw": [
                360
            ],
            "positionId": [
                360
            ],
            "timestamp": [
                360
            ],
            "__typename": [
                287
            ]
        },
        "PresaleParticipation_stream_cursor_input": {
            "initial_value": [
                202
            ],
            "ordering": [
                350
            ],
            "__typename": [
                287
            ]
        },
        "PresaleParticipation_stream_cursor_value_input": {
            "depositAmountFormatted": [
                287
            ],
            "depositAmountRaw": [
                358
            ],
            "id": [
                287
            ],
            "leverage": [
                358
            ],
            "loopCount": [
                358
            ],
            "mintedAmountFormatted": [
                287
            ],
            "mintedAmountRaw": [
                358
            ],
            "positionId": [
                358
            ],
            "presale_id": [
                287
            ],
            "timestamp": [
                358
            ],
            "transactionHash": [
                287
            ],
            "user_id": [
                287
            ],
            "__typename": [
                287
            ]
        },
        "PresaleParticipation_sum_order_by": {
            "depositAmountRaw": [
                360
            ],
            "leverage": [
                360
            ],
            "loopCount": [
                360
            ],
            "mintedAmountRaw": [
                360
            ],
            "positionId": [
                360
            ],
            "timestamp": [
                360
            ],
            "__typename": [
                287
            ]
        },
        "PresaleParticipation_var_pop_order_by": {
            "depositAmountRaw": [
                360
            ],
            "leverage": [
                360
            ],
            "loopCount": [
                360
            ],
            "mintedAmountRaw": [
                360
            ],
            "positionId": [
                360
            ],
            "timestamp": [
                360
            ],
            "__typename": [
                287
            ]
        },
        "PresaleParticipation_var_samp_order_by": {
            "depositAmountRaw": [
                360
            ],
            "leverage": [
                360
            ],
            "loopCount": [
                360
            ],
            "mintedAmountRaw": [
                360
            ],
            "positionId": [
                360
            ],
            "timestamp": [
                360
            ],
            "__typename": [
                287
            ]
        },
        "PresaleParticipation_variance_order_by": {
            "depositAmountRaw": [
                360
            ],
            "leverage": [
                360
            ],
            "loopCount": [
                360
            ],
            "mintedAmountRaw": [
                360
            ],
            "positionId": [
                360
            ],
            "timestamp": [
                360
            ],
            "__typename": [
                287
            ]
        },
        "PriceCandle": {
            "closeFormatted": [
                287
            ],
            "closeRaw": [
                358
            ],
            "highFormatted": [
                287
            ],
            "highRaw": [
                358
            ],
            "id": [
                287
            ],
            "lowFormatted": [
                287
            ],
            "lowRaw": [
                358
            ],
            "market_id": [
                287
            ],
            "openFormatted": [
                287
            ],
            "openRaw": [
                358
            ],
            "period": [
                342
            ],
            "timestamp": [
                358
            ],
            "trades": [
                358
            ],
            "volumeFormatted": [
                287
            ],
            "volumeRaw": [
                358
            ],
            "__typename": [
                287
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
                289
            ],
            "closeRaw": [
                359
            ],
            "highFormatted": [
                289
            ],
            "highRaw": [
                359
            ],
            "id": [
                289
            ],
            "lowFormatted": [
                289
            ],
            "lowRaw": [
                359
            ],
            "market_id": [
                289
            ],
            "openFormatted": [
                289
            ],
            "openRaw": [
                359
            ],
            "period": [
                343
            ],
            "timestamp": [
                359
            ],
            "trades": [
                359
            ],
            "volumeFormatted": [
                289
            ],
            "volumeRaw": [
                359
            ],
            "__typename": [
                287
            ]
        },
        "PriceCandle_order_by": {
            "closeFormatted": [
                360
            ],
            "closeRaw": [
                360
            ],
            "highFormatted": [
                360
            ],
            "highRaw": [
                360
            ],
            "id": [
                360
            ],
            "lowFormatted": [
                360
            ],
            "lowRaw": [
                360
            ],
            "market_id": [
                360
            ],
            "openFormatted": [
                360
            ],
            "openRaw": [
                360
            ],
            "period": [
                360
            ],
            "timestamp": [
                360
            ],
            "trades": [
                360
            ],
            "volumeFormatted": [
                360
            ],
            "volumeRaw": [
                360
            ],
            "__typename": [
                287
            ]
        },
        "PriceCandle_select_column": {},
        "PriceCandle_stream_cursor_input": {
            "initial_value": [
                212
            ],
            "ordering": [
                350
            ],
            "__typename": [
                287
            ]
        },
        "PriceCandle_stream_cursor_value_input": {
            "closeFormatted": [
                287
            ],
            "closeRaw": [
                358
            ],
            "highFormatted": [
                287
            ],
            "highRaw": [
                358
            ],
            "id": [
                287
            ],
            "lowFormatted": [
                287
            ],
            "lowRaw": [
                358
            ],
            "market_id": [
                287
            ],
            "openFormatted": [
                287
            ],
            "openRaw": [
                358
            ],
            "period": [
                342
            ],
            "timestamp": [
                358
            ],
            "trades": [
                358
            ],
            "volumeFormatted": [
                287
            ],
            "volumeRaw": [
                358
            ],
            "__typename": [
                287
            ]
        },
        "Role": {
            "adminRole": [
                287
            ],
            "adminRoleName": [
                287
            ],
            "authorizer_id": [
                287
            ],
            "createdAt": [
                358
            ],
            "id": [
                287
            ],
            "isAdminBurned": [
                12
            ],
            "lastUpdatedAt": [
                358
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
                287
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
                287
            ],
            "__typename": [
                287
            ]
        },
        "RoleMember": {
            "grantedAt": [
                358
            ],
            "grantedBy": [
                287
            ],
            "id": [
                287
            ],
            "member": [
                287
            ],
            "role_id": [
                287
            ],
            "transactionHash": [
                287
            ],
            "__typename": [
                287
            ]
        },
        "RoleMember_aggregate_order_by": {
            "avg": [
                216
            ],
            "count": [
                360
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
                287
            ]
        },
        "RoleMember_avg_order_by": {
            "grantedAt": [
                360
            ],
            "__typename": [
                287
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
                359
            ],
            "grantedBy": [
                289
            ],
            "id": [
                289
            ],
            "member": [
                289
            ],
            "role_id": [
                289
            ],
            "transactionHash": [
                289
            ],
            "__typename": [
                287
            ]
        },
        "RoleMember_max_order_by": {
            "grantedAt": [
                360
            ],
            "grantedBy": [
                360
            ],
            "id": [
                360
            ],
            "member": [
                360
            ],
            "role_id": [
                360
            ],
            "transactionHash": [
                360
            ],
            "__typename": [
                287
            ]
        },
        "RoleMember_min_order_by": {
            "grantedAt": [
                360
            ],
            "grantedBy": [
                360
            ],
            "id": [
                360
            ],
            "member": [
                360
            ],
            "role_id": [
                360
            ],
            "transactionHash": [
                360
            ],
            "__typename": [
                287
            ]
        },
        "RoleMember_order_by": {
            "grantedAt": [
                360
            ],
            "grantedBy": [
                360
            ],
            "id": [
                360
            ],
            "member": [
                360
            ],
            "role_id": [
                360
            ],
            "transactionHash": [
                360
            ],
            "__typename": [
                287
            ]
        },
        "RoleMember_select_column": {},
        "RoleMember_stddev_order_by": {
            "grantedAt": [
                360
            ],
            "__typename": [
                287
            ]
        },
        "RoleMember_stddev_pop_order_by": {
            "grantedAt": [
                360
            ],
            "__typename": [
                287
            ]
        },
        "RoleMember_stddev_samp_order_by": {
            "grantedAt": [
                360
            ],
            "__typename": [
                287
            ]
        },
        "RoleMember_stream_cursor_input": {
            "initial_value": [
                226
            ],
            "ordering": [
                350
            ],
            "__typename": [
                287
            ]
        },
        "RoleMember_stream_cursor_value_input": {
            "grantedAt": [
                358
            ],
            "grantedBy": [
                287
            ],
            "id": [
                287
            ],
            "member": [
                287
            ],
            "role_id": [
                287
            ],
            "transactionHash": [
                287
            ],
            "__typename": [
                287
            ]
        },
        "RoleMember_sum_order_by": {
            "grantedAt": [
                360
            ],
            "__typename": [
                287
            ]
        },
        "RoleMember_var_pop_order_by": {
            "grantedAt": [
                360
            ],
            "__typename": [
                287
            ]
        },
        "RoleMember_var_samp_order_by": {
            "grantedAt": [
                360
            ],
            "__typename": [
                287
            ]
        },
        "RoleMember_variance_order_by": {
            "grantedAt": [
                360
            ],
            "__typename": [
                287
            ]
        },
        "RolePermission": {
            "addedAt": [
                358
            ],
            "id": [
                287
            ],
            "role_id": [
                287
            ],
            "selector": [
                287
            ],
            "selectorName": [
                287
            ],
            "target": [
                287
            ],
            "transactionHash": [
                287
            ],
            "__typename": [
                287
            ]
        },
        "RolePermission_aggregate_order_by": {
            "avg": [
                233
            ],
            "count": [
                360
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
                287
            ]
        },
        "RolePermission_avg_order_by": {
            "addedAt": [
                360
            ],
            "__typename": [
                287
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
                359
            ],
            "id": [
                289
            ],
            "role_id": [
                289
            ],
            "selector": [
                289
            ],
            "selectorName": [
                289
            ],
            "target": [
                289
            ],
            "transactionHash": [
                289
            ],
            "__typename": [
                287
            ]
        },
        "RolePermission_max_order_by": {
            "addedAt": [
                360
            ],
            "id": [
                360
            ],
            "role_id": [
                360
            ],
            "selector": [
                360
            ],
            "selectorName": [
                360
            ],
            "target": [
                360
            ],
            "transactionHash": [
                360
            ],
            "__typename": [
                287
            ]
        },
        "RolePermission_min_order_by": {
            "addedAt": [
                360
            ],
            "id": [
                360
            ],
            "role_id": [
                360
            ],
            "selector": [
                360
            ],
            "selectorName": [
                360
            ],
            "target": [
                360
            ],
            "transactionHash": [
                360
            ],
            "__typename": [
                287
            ]
        },
        "RolePermission_order_by": {
            "addedAt": [
                360
            ],
            "id": [
                360
            ],
            "role_id": [
                360
            ],
            "selector": [
                360
            ],
            "selectorName": [
                360
            ],
            "target": [
                360
            ],
            "transactionHash": [
                360
            ],
            "__typename": [
                287
            ]
        },
        "RolePermission_select_column": {},
        "RolePermission_stddev_order_by": {
            "addedAt": [
                360
            ],
            "__typename": [
                287
            ]
        },
        "RolePermission_stddev_pop_order_by": {
            "addedAt": [
                360
            ],
            "__typename": [
                287
            ]
        },
        "RolePermission_stddev_samp_order_by": {
            "addedAt": [
                360
            ],
            "__typename": [
                287
            ]
        },
        "RolePermission_stream_cursor_input": {
            "initial_value": [
                243
            ],
            "ordering": [
                350
            ],
            "__typename": [
                287
            ]
        },
        "RolePermission_stream_cursor_value_input": {
            "addedAt": [
                358
            ],
            "id": [
                287
            ],
            "role_id": [
                287
            ],
            "selector": [
                287
            ],
            "selectorName": [
                287
            ],
            "target": [
                287
            ],
            "transactionHash": [
                287
            ],
            "__typename": [
                287
            ]
        },
        "RolePermission_sum_order_by": {
            "addedAt": [
                360
            ],
            "__typename": [
                287
            ]
        },
        "RolePermission_var_pop_order_by": {
            "addedAt": [
                360
            ],
            "__typename": [
                287
            ]
        },
        "RolePermission_var_samp_order_by": {
            "addedAt": [
                360
            ],
            "__typename": [
                287
            ]
        },
        "RolePermission_variance_order_by": {
            "addedAt": [
                360
            ],
            "__typename": [
                287
            ]
        },
        "Role_aggregate_order_by": {
            "avg": [
                249
            ],
            "count": [
                360
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
                287
            ]
        },
        "Role_avg_order_by": {
            "createdAt": [
                360
            ],
            "lastUpdatedAt": [
                360
            ],
            "__typename": [
                287
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
                289
            ],
            "adminRoleName": [
                289
            ],
            "authorizer_id": [
                289
            ],
            "createdAt": [
                359
            ],
            "id": [
                289
            ],
            "isAdminBurned": [
                13
            ],
            "lastUpdatedAt": [
                359
            ],
            "members": [
                217
            ],
            "name": [
                289
            ],
            "permissions": [
                234
            ],
            "roleId": [
                289
            ],
            "__typename": [
                287
            ]
        },
        "Role_max_order_by": {
            "adminRole": [
                360
            ],
            "adminRoleName": [
                360
            ],
            "authorizer_id": [
                360
            ],
            "createdAt": [
                360
            ],
            "id": [
                360
            ],
            "lastUpdatedAt": [
                360
            ],
            "name": [
                360
            ],
            "roleId": [
                360
            ],
            "__typename": [
                287
            ]
        },
        "Role_min_order_by": {
            "adminRole": [
                360
            ],
            "adminRoleName": [
                360
            ],
            "authorizer_id": [
                360
            ],
            "createdAt": [
                360
            ],
            "id": [
                360
            ],
            "lastUpdatedAt": [
                360
            ],
            "name": [
                360
            ],
            "roleId": [
                360
            ],
            "__typename": [
                287
            ]
        },
        "Role_order_by": {
            "adminRole": [
                360
            ],
            "adminRoleName": [
                360
            ],
            "authorizer_id": [
                360
            ],
            "createdAt": [
                360
            ],
            "id": [
                360
            ],
            "isAdminBurned": [
                360
            ],
            "lastUpdatedAt": [
                360
            ],
            "members_aggregate": [
                215
            ],
            "name": [
                360
            ],
            "permissions_aggregate": [
                232
            ],
            "roleId": [
                360
            ],
            "__typename": [
                287
            ]
        },
        "Role_select_column": {},
        "Role_stddev_order_by": {
            "createdAt": [
                360
            ],
            "lastUpdatedAt": [
                360
            ],
            "__typename": [
                287
            ]
        },
        "Role_stddev_pop_order_by": {
            "createdAt": [
                360
            ],
            "lastUpdatedAt": [
                360
            ],
            "__typename": [
                287
            ]
        },
        "Role_stddev_samp_order_by": {
            "createdAt": [
                360
            ],
            "lastUpdatedAt": [
                360
            ],
            "__typename": [
                287
            ]
        },
        "Role_stream_cursor_input": {
            "initial_value": [
                259
            ],
            "ordering": [
                350
            ],
            "__typename": [
                287
            ]
        },
        "Role_stream_cursor_value_input": {
            "adminRole": [
                287
            ],
            "adminRoleName": [
                287
            ],
            "authorizer_id": [
                287
            ],
            "createdAt": [
                358
            ],
            "id": [
                287
            ],
            "isAdminBurned": [
                12
            ],
            "lastUpdatedAt": [
                358
            ],
            "name": [
                287
            ],
            "roleId": [
                287
            ],
            "__typename": [
                287
            ]
        },
        "Role_sum_order_by": {
            "createdAt": [
                360
            ],
            "lastUpdatedAt": [
                360
            ],
            "__typename": [
                287
            ]
        },
        "Role_var_pop_order_by": {
            "createdAt": [
                360
            ],
            "lastUpdatedAt": [
                360
            ],
            "__typename": [
                287
            ]
        },
        "Role_var_samp_order_by": {
            "createdAt": [
                360
            ],
            "lastUpdatedAt": [
                360
            ],
            "__typename": [
                287
            ]
        },
        "Role_variance_order_by": {
            "createdAt": [
                360
            ],
            "lastUpdatedAt": [
                360
            ],
            "__typename": [
                287
            ]
        },
        "Stake": {
            "amountFormatted": [
                287
            ],
            "amountRaw": [
                358
            ],
            "contract_id": [
                287
            ],
            "id": [
                287
            ],
            "lockDuration": [
                358
            ],
            "status": [
                371
            ],
            "timestamp": [
                358
            ],
            "transactionHash": [
                287
            ],
            "user_id": [
                287
            ],
            "__typename": [
                287
            ]
        },
        "Stake_aggregate_order_by": {
            "avg": [
                266
            ],
            "count": [
                360
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
                287
            ]
        },
        "Stake_avg_order_by": {
            "amountRaw": [
                360
            ],
            "lockDuration": [
                360
            ],
            "timestamp": [
                360
            ],
            "__typename": [
                287
            ]
        },
        "Stake_bool_exp": {
            "_and": [
                267
            ],
            "_not": [
                267
            ],
            "_or": [
                267
            ],
            "amountFormatted": [
                289
            ],
            "amountRaw": [
                359
            ],
            "contract_id": [
                289
            ],
            "id": [
                289
            ],
            "lockDuration": [
                359
            ],
            "status": [
                372
            ],
            "timestamp": [
                359
            ],
            "transactionHash": [
                289
            ],
            "user_id": [
                289
            ],
            "__typename": [
                287
            ]
        },
        "Stake_max_order_by": {
            "amountFormatted": [
                360
            ],
            "amountRaw": [
                360
            ],
            "contract_id": [
                360
            ],
            "id": [
                360
            ],
            "lockDuration": [
                360
            ],
            "status": [
                360
            ],
            "timestamp": [
                360
            ],
            "transactionHash": [
                360
            ],
            "user_id": [
                360
            ],
            "__typename": [
                287
            ]
        },
        "Stake_min_order_by": {
            "amountFormatted": [
                360
            ],
            "amountRaw": [
                360
            ],
            "contract_id": [
                360
            ],
            "id": [
                360
            ],
            "lockDuration": [
                360
            ],
            "status": [
                360
            ],
            "timestamp": [
                360
            ],
            "transactionHash": [
                360
            ],
            "user_id": [
                360
            ],
            "__typename": [
                287
            ]
        },
        "Stake_order_by": {
            "amountFormatted": [
                360
            ],
            "amountRaw": [
                360
            ],
            "contract_id": [
                360
            ],
            "id": [
                360
            ],
            "lockDuration": [
                360
            ],
            "status": [
                360
            ],
            "timestamp": [
                360
            ],
            "transactionHash": [
                360
            ],
            "user_id": [
                360
            ],
            "__typename": [
                287
            ]
        },
        "Stake_select_column": {},
        "Stake_stddev_order_by": {
            "amountRaw": [
                360
            ],
            "lockDuration": [
                360
            ],
            "timestamp": [
                360
            ],
            "__typename": [
                287
            ]
        },
        "Stake_stddev_pop_order_by": {
            "amountRaw": [
                360
            ],
            "lockDuration": [
                360
            ],
            "timestamp": [
                360
            ],
            "__typename": [
                287
            ]
        },
        "Stake_stddev_samp_order_by": {
            "amountRaw": [
                360
            ],
            "lockDuration": [
                360
            ],
            "timestamp": [
                360
            ],
            "__typename": [
                287
            ]
        },
        "Stake_stream_cursor_input": {
            "initial_value": [
                276
            ],
            "ordering": [
                350
            ],
            "__typename": [
                287
            ]
        },
        "Stake_stream_cursor_value_input": {
            "amountFormatted": [
                287
            ],
            "amountRaw": [
                358
            ],
            "contract_id": [
                287
            ],
            "id": [
                287
            ],
            "lockDuration": [
                358
            ],
            "status": [
                371
            ],
            "timestamp": [
                358
            ],
            "transactionHash": [
                287
            ],
            "user_id": [
                287
            ],
            "__typename": [
                287
            ]
        },
        "Stake_sum_order_by": {
            "amountRaw": [
                360
            ],
            "lockDuration": [
                360
            ],
            "timestamp": [
                360
            ],
            "__typename": [
                287
            ]
        },
        "Stake_var_pop_order_by": {
            "amountRaw": [
                360
            ],
            "lockDuration": [
                360
            ],
            "timestamp": [
                360
            ],
            "__typename": [
                287
            ]
        },
        "Stake_var_samp_order_by": {
            "amountRaw": [
                360
            ],
            "lockDuration": [
                360
            ],
            "timestamp": [
                360
            ],
            "__typename": [
                287
            ]
        },
        "Stake_variance_order_by": {
            "amountRaw": [
                360
            ],
            "lockDuration": [
                360
            ],
            "timestamp": [
                360
            ],
            "__typename": [
                287
            ]
        },
        "StakingContract": {
            "createdAt": [
                358
            ],
            "id": [
                287
            ],
            "rewardToken_id": [
                287
            ],
            "stakes": [
                264,
                {
                    "distinct_on": [
                        271,
                        "[Stake_select_column!]"
                    ],
                    "limit": [
                        89
                    ],
                    "offset": [
                        89
                    ],
                    "order_by": [
                        270,
                        "[Stake_order_by!]"
                    ],
                    "where": [
                        267
                    ]
                }
            ],
            "stakingToken_id": [
                287
            ],
            "totalRewardsFormatted": [
                287
            ],
            "totalRewardsRaw": [
                358
            ],
            "totalStakedFormatted": [
                287
            ],
            "totalStakedRaw": [
                358
            ],
            "__typename": [
                287
            ]
        },
        "StakingContract_bool_exp": {
            "_and": [
                282
            ],
            "_not": [
                282
            ],
            "_or": [
                282
            ],
            "createdAt": [
                359
            ],
            "id": [
                289
            ],
            "rewardToken_id": [
                289
            ],
            "stakes": [
                267
            ],
            "stakingToken_id": [
                289
            ],
            "totalRewardsFormatted": [
                289
            ],
            "totalRewardsRaw": [
                359
            ],
            "totalStakedFormatted": [
                289
            ],
            "totalStakedRaw": [
                359
            ],
            "__typename": [
                287
            ]
        },
        "StakingContract_order_by": {
            "createdAt": [
                360
            ],
            "id": [
                360
            ],
            "rewardToken_id": [
                360
            ],
            "stakes_aggregate": [
                265
            ],
            "stakingToken_id": [
                360
            ],
            "totalRewardsFormatted": [
                360
            ],
            "totalRewardsRaw": [
                360
            ],
            "totalStakedFormatted": [
                360
            ],
            "totalStakedRaw": [
                360
            ],
            "__typename": [
                287
            ]
        },
        "StakingContract_select_column": {},
        "StakingContract_stream_cursor_input": {
            "initial_value": [
                286
            ],
            "ordering": [
                350
            ],
            "__typename": [
                287
            ]
        },
        "StakingContract_stream_cursor_value_input": {
            "createdAt": [
                358
            ],
            "id": [
                287
            ],
            "rewardToken_id": [
                287
            ],
            "stakingToken_id": [
                287
            ],
            "totalRewardsFormatted": [
                287
            ],
            "totalRewardsRaw": [
                358
            ],
            "totalStakedFormatted": [
                287
            ],
            "totalStakedRaw": [
                358
            ],
            "__typename": [
                287
            ]
        },
        "String": {},
        "String_array_comparison_exp": {
            "_contained_in": [
                287
            ],
            "_contains": [
                287
            ],
            "_eq": [
                287
            ],
            "_gt": [
                287
            ],
            "_gte": [
                287
            ],
            "_in": [
                287
            ],
            "_is_null": [
                12
            ],
            "_lt": [
                287
            ],
            "_lte": [
                287
            ],
            "_neq": [
                287
            ],
            "_nin": [
                287
            ],
            "__typename": [
                287
            ]
        },
        "String_comparison_exp": {
            "_eq": [
                287
            ],
            "_gt": [
                287
            ],
            "_gte": [
                287
            ],
            "_ilike": [
                287
            ],
            "_in": [
                287
            ],
            "_iregex": [
                287
            ],
            "_is_null": [
                12
            ],
            "_like": [
                287
            ],
            "_lt": [
                287
            ],
            "_lte": [
                287
            ],
            "_neq": [
                287
            ],
            "_nilike": [
                287
            ],
            "_nin": [
                287
            ],
            "_niregex": [
                287
            ],
            "_nlike": [
                287
            ],
            "_nregex": [
                287
            ],
            "_nsimilar": [
                287
            ],
            "_regex": [
                287
            ],
            "_similar": [
                287
            ],
            "__typename": [
                287
            ]
        },
        "Token": {
            "decimals": [
                89
            ],
            "id": [
                287
            ],
            "maxSupplyFormatted": [
                287
            ],
            "maxSupplyRaw": [
                358
            ],
            "name": [
                287
            ],
            "symbol": [
                287
            ],
            "__typename": [
                287
            ]
        },
        "Token_bool_exp": {
            "_and": [
                291
            ],
            "_not": [
                291
            ],
            "_or": [
                291
            ],
            "decimals": [
                91
            ],
            "id": [
                289
            ],
            "maxSupplyFormatted": [
                289
            ],
            "maxSupplyRaw": [
                359
            ],
            "name": [
                289
            ],
            "symbol": [
                289
            ],
            "__typename": [
                287
            ]
        },
        "Token_order_by": {
            "decimals": [
                360
            ],
            "id": [
                360
            ],
            "maxSupplyFormatted": [
                360
            ],
            "maxSupplyRaw": [
                360
            ],
            "name": [
                360
            ],
            "symbol": [
                360
            ],
            "__typename": [
                287
            ]
        },
        "Token_select_column": {},
        "Token_stream_cursor_input": {
            "initial_value": [
                295
            ],
            "ordering": [
                350
            ],
            "__typename": [
                287
            ]
        },
        "Token_stream_cursor_value_input": {
            "decimals": [
                89
            ],
            "id": [
                287
            ],
            "maxSupplyFormatted": [
                287
            ],
            "maxSupplyRaw": [
                358
            ],
            "name": [
                287
            ],
            "symbol": [
                287
            ],
            "__typename": [
                287
            ]
        },
        "Trade": {
            "feeFormatted": [
                287
            ],
            "feeRaw": [
                358
            ],
            "id": [
                287
            ],
            "market_id": [
                287
            ],
            "newPriceFormatted": [
                287
            ],
            "newPriceRaw": [
                358
            ],
            "reserveAmountFormatted": [
                287
            ],
            "reserveAmountRaw": [
                358
            ],
            "timestamp": [
                358
            ],
            "tokenAmountFormatted": [
                287
            ],
            "tokenAmountRaw": [
                358
            ],
            "tradeType": [
                375
            ],
            "transactionHash": [
                287
            ],
            "user_id": [
                287
            ],
            "__typename": [
                287
            ]
        },
        "Trade_aggregate_order_by": {
            "avg": [
                298
            ],
            "count": [
                360
            ],
            "max": [
                300
            ],
            "min": [
                301
            ],
            "stddev": [
                304
            ],
            "stddev_pop": [
                305
            ],
            "stddev_samp": [
                306
            ],
            "sum": [
                309
            ],
            "var_pop": [
                310
            ],
            "var_samp": [
                311
            ],
            "variance": [
                312
            ],
            "__typename": [
                287
            ]
        },
        "Trade_avg_order_by": {
            "feeRaw": [
                360
            ],
            "newPriceRaw": [
                360
            ],
            "reserveAmountRaw": [
                360
            ],
            "timestamp": [
                360
            ],
            "tokenAmountRaw": [
                360
            ],
            "__typename": [
                287
            ]
        },
        "Trade_bool_exp": {
            "_and": [
                299
            ],
            "_not": [
                299
            ],
            "_or": [
                299
            ],
            "feeFormatted": [
                289
            ],
            "feeRaw": [
                359
            ],
            "id": [
                289
            ],
            "market_id": [
                289
            ],
            "newPriceFormatted": [
                289
            ],
            "newPriceRaw": [
                359
            ],
            "reserveAmountFormatted": [
                289
            ],
            "reserveAmountRaw": [
                359
            ],
            "timestamp": [
                359
            ],
            "tokenAmountFormatted": [
                289
            ],
            "tokenAmountRaw": [
                359
            ],
            "tradeType": [
                376
            ],
            "transactionHash": [
                289
            ],
            "user_id": [
                289
            ],
            "__typename": [
                287
            ]
        },
        "Trade_max_order_by": {
            "feeFormatted": [
                360
            ],
            "feeRaw": [
                360
            ],
            "id": [
                360
            ],
            "market_id": [
                360
            ],
            "newPriceFormatted": [
                360
            ],
            "newPriceRaw": [
                360
            ],
            "reserveAmountFormatted": [
                360
            ],
            "reserveAmountRaw": [
                360
            ],
            "timestamp": [
                360
            ],
            "tokenAmountFormatted": [
                360
            ],
            "tokenAmountRaw": [
                360
            ],
            "tradeType": [
                360
            ],
            "transactionHash": [
                360
            ],
            "user_id": [
                360
            ],
            "__typename": [
                287
            ]
        },
        "Trade_min_order_by": {
            "feeFormatted": [
                360
            ],
            "feeRaw": [
                360
            ],
            "id": [
                360
            ],
            "market_id": [
                360
            ],
            "newPriceFormatted": [
                360
            ],
            "newPriceRaw": [
                360
            ],
            "reserveAmountFormatted": [
                360
            ],
            "reserveAmountRaw": [
                360
            ],
            "timestamp": [
                360
            ],
            "tokenAmountFormatted": [
                360
            ],
            "tokenAmountRaw": [
                360
            ],
            "tradeType": [
                360
            ],
            "transactionHash": [
                360
            ],
            "user_id": [
                360
            ],
            "__typename": [
                287
            ]
        },
        "Trade_order_by": {
            "feeFormatted": [
                360
            ],
            "feeRaw": [
                360
            ],
            "id": [
                360
            ],
            "market_id": [
                360
            ],
            "newPriceFormatted": [
                360
            ],
            "newPriceRaw": [
                360
            ],
            "reserveAmountFormatted": [
                360
            ],
            "reserveAmountRaw": [
                360
            ],
            "timestamp": [
                360
            ],
            "tokenAmountFormatted": [
                360
            ],
            "tokenAmountRaw": [
                360
            ],
            "tradeType": [
                360
            ],
            "transactionHash": [
                360
            ],
            "user_id": [
                360
            ],
            "__typename": [
                287
            ]
        },
        "Trade_select_column": {},
        "Trade_stddev_order_by": {
            "feeRaw": [
                360
            ],
            "newPriceRaw": [
                360
            ],
            "reserveAmountRaw": [
                360
            ],
            "timestamp": [
                360
            ],
            "tokenAmountRaw": [
                360
            ],
            "__typename": [
                287
            ]
        },
        "Trade_stddev_pop_order_by": {
            "feeRaw": [
                360
            ],
            "newPriceRaw": [
                360
            ],
            "reserveAmountRaw": [
                360
            ],
            "timestamp": [
                360
            ],
            "tokenAmountRaw": [
                360
            ],
            "__typename": [
                287
            ]
        },
        "Trade_stddev_samp_order_by": {
            "feeRaw": [
                360
            ],
            "newPriceRaw": [
                360
            ],
            "reserveAmountRaw": [
                360
            ],
            "timestamp": [
                360
            ],
            "tokenAmountRaw": [
                360
            ],
            "__typename": [
                287
            ]
        },
        "Trade_stream_cursor_input": {
            "initial_value": [
                308
            ],
            "ordering": [
                350
            ],
            "__typename": [
                287
            ]
        },
        "Trade_stream_cursor_value_input": {
            "feeFormatted": [
                287
            ],
            "feeRaw": [
                358
            ],
            "id": [
                287
            ],
            "market_id": [
                287
            ],
            "newPriceFormatted": [
                287
            ],
            "newPriceRaw": [
                358
            ],
            "reserveAmountFormatted": [
                287
            ],
            "reserveAmountRaw": [
                358
            ],
            "timestamp": [
                358
            ],
            "tokenAmountFormatted": [
                287
            ],
            "tokenAmountRaw": [
                358
            ],
            "tradeType": [
                375
            ],
            "transactionHash": [
                287
            ],
            "user_id": [
                287
            ],
            "__typename": [
                287
            ]
        },
        "Trade_sum_order_by": {
            "feeRaw": [
                360
            ],
            "newPriceRaw": [
                360
            ],
            "reserveAmountRaw": [
                360
            ],
            "timestamp": [
                360
            ],
            "tokenAmountRaw": [
                360
            ],
            "__typename": [
                287
            ]
        },
        "Trade_var_pop_order_by": {
            "feeRaw": [
                360
            ],
            "newPriceRaw": [
                360
            ],
            "reserveAmountRaw": [
                360
            ],
            "timestamp": [
                360
            ],
            "tokenAmountRaw": [
                360
            ],
            "__typename": [
                287
            ]
        },
        "Trade_var_samp_order_by": {
            "feeRaw": [
                360
            ],
            "newPriceRaw": [
                360
            ],
            "reserveAmountRaw": [
                360
            ],
            "timestamp": [
                360
            ],
            "tokenAmountRaw": [
                360
            ],
            "__typename": [
                287
            ]
        },
        "Trade_variance_order_by": {
            "feeRaw": [
                360
            ],
            "newPriceRaw": [
                360
            ],
            "reserveAmountRaw": [
                360
            ],
            "timestamp": [
                360
            ],
            "tokenAmountRaw": [
                360
            ],
            "__typename": [
                287
            ]
        },
        "Treasury": {
            "createdAt": [
                358
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
                287
            ],
            "lastUpdatedAt": [
                358
            ],
            "market_id": [
                287
            ],
            "totalFeesDistributedFormatted": [
                287
            ],
            "totalFeesDistributedRaw": [
                358
            ],
            "totalFeesReceivedFormatted": [
                287
            ],
            "totalFeesReceivedRaw": [
                358
            ],
            "treasuryAddress": [
                287
            ],
            "__typename": [
                287
            ]
        },
        "Treasury_bool_exp": {
            "_and": [
                314
            ],
            "_not": [
                314
            ],
            "_or": [
                314
            ],
            "createdAt": [
                359
            ],
            "feeSplitterPayments": [
                23
            ],
            "feeSplitterReceipts": [
                40
            ],
            "id": [
                289
            ],
            "lastUpdatedAt": [
                359
            ],
            "market_id": [
                289
            ],
            "totalFeesDistributedFormatted": [
                289
            ],
            "totalFeesDistributedRaw": [
                359
            ],
            "totalFeesReceivedFormatted": [
                289
            ],
            "totalFeesReceivedRaw": [
                359
            ],
            "treasuryAddress": [
                289
            ],
            "__typename": [
                287
            ]
        },
        "Treasury_order_by": {
            "createdAt": [
                360
            ],
            "feeSplitterPayments_aggregate": [
                21
            ],
            "feeSplitterReceipts_aggregate": [
                38
            ],
            "id": [
                360
            ],
            "lastUpdatedAt": [
                360
            ],
            "market_id": [
                360
            ],
            "totalFeesDistributedFormatted": [
                360
            ],
            "totalFeesDistributedRaw": [
                360
            ],
            "totalFeesReceivedFormatted": [
                360
            ],
            "totalFeesReceivedRaw": [
                360
            ],
            "treasuryAddress": [
                360
            ],
            "__typename": [
                287
            ]
        },
        "Treasury_select_column": {},
        "Treasury_stream_cursor_input": {
            "initial_value": [
                318
            ],
            "ordering": [
                350
            ],
            "__typename": [
                287
            ]
        },
        "Treasury_stream_cursor_value_input": {
            "createdAt": [
                358
            ],
            "id": [
                287
            ],
            "lastUpdatedAt": [
                358
            ],
            "market_id": [
                287
            ],
            "totalFeesDistributedFormatted": [
                287
            ],
            "totalFeesDistributedRaw": [
                358
            ],
            "totalFeesReceivedFormatted": [
                287
            ],
            "totalFeesReceivedRaw": [
                358
            ],
            "treasuryAddress": [
                287
            ],
            "__typename": [
                287
            ]
        },
        "UserMarketPosition": {
            "claimableRewardsFormatted": [
                287
            ],
            "claimableRewardsRaw": [
                358
            ],
            "id": [
                287
            ],
            "lastUpdatedAt": [
                358
            ],
            "lockedCollateralFormatted": [
                287
            ],
            "lockedCollateralRaw": [
                358
            ],
            "market_id": [
                287
            ],
            "netFTokenChangeFormatted": [
                287
            ],
            "netFTokenChangeRaw": [
                358
            ],
            "presaleDepositFormatted": [
                287
            ],
            "presaleDepositRaw": [
                358
            ],
            "presaleLeverage": [
                358
            ],
            "stakedAmountFormatted": [
                287
            ],
            "stakedAmountRaw": [
                358
            ],
            "totalDebtFormatted": [
                287
            ],
            "totalDebtRaw": [
                358
            ],
            "user_id": [
                287
            ],
            "__typename": [
                287
            ]
        },
        "UserMarketPosition_aggregate_order_by": {
            "avg": [
                321
            ],
            "count": [
                360
            ],
            "max": [
                323
            ],
            "min": [
                324
            ],
            "stddev": [
                327
            ],
            "stddev_pop": [
                328
            ],
            "stddev_samp": [
                329
            ],
            "sum": [
                332
            ],
            "var_pop": [
                333
            ],
            "var_samp": [
                334
            ],
            "variance": [
                335
            ],
            "__typename": [
                287
            ]
        },
        "UserMarketPosition_avg_order_by": {
            "claimableRewardsRaw": [
                360
            ],
            "lastUpdatedAt": [
                360
            ],
            "lockedCollateralRaw": [
                360
            ],
            "netFTokenChangeRaw": [
                360
            ],
            "presaleDepositRaw": [
                360
            ],
            "presaleLeverage": [
                360
            ],
            "stakedAmountRaw": [
                360
            ],
            "totalDebtRaw": [
                360
            ],
            "__typename": [
                287
            ]
        },
        "UserMarketPosition_bool_exp": {
            "_and": [
                322
            ],
            "_not": [
                322
            ],
            "_or": [
                322
            ],
            "claimableRewardsFormatted": [
                289
            ],
            "claimableRewardsRaw": [
                359
            ],
            "id": [
                289
            ],
            "lastUpdatedAt": [
                359
            ],
            "lockedCollateralFormatted": [
                289
            ],
            "lockedCollateralRaw": [
                359
            ],
            "market_id": [
                289
            ],
            "netFTokenChangeFormatted": [
                289
            ],
            "netFTokenChangeRaw": [
                359
            ],
            "presaleDepositFormatted": [
                289
            ],
            "presaleDepositRaw": [
                359
            ],
            "presaleLeverage": [
                359
            ],
            "stakedAmountFormatted": [
                289
            ],
            "stakedAmountRaw": [
                359
            ],
            "totalDebtFormatted": [
                289
            ],
            "totalDebtRaw": [
                359
            ],
            "user_id": [
                289
            ],
            "__typename": [
                287
            ]
        },
        "UserMarketPosition_max_order_by": {
            "claimableRewardsFormatted": [
                360
            ],
            "claimableRewardsRaw": [
                360
            ],
            "id": [
                360
            ],
            "lastUpdatedAt": [
                360
            ],
            "lockedCollateralFormatted": [
                360
            ],
            "lockedCollateralRaw": [
                360
            ],
            "market_id": [
                360
            ],
            "netFTokenChangeFormatted": [
                360
            ],
            "netFTokenChangeRaw": [
                360
            ],
            "presaleDepositFormatted": [
                360
            ],
            "presaleDepositRaw": [
                360
            ],
            "presaleLeverage": [
                360
            ],
            "stakedAmountFormatted": [
                360
            ],
            "stakedAmountRaw": [
                360
            ],
            "totalDebtFormatted": [
                360
            ],
            "totalDebtRaw": [
                360
            ],
            "user_id": [
                360
            ],
            "__typename": [
                287
            ]
        },
        "UserMarketPosition_min_order_by": {
            "claimableRewardsFormatted": [
                360
            ],
            "claimableRewardsRaw": [
                360
            ],
            "id": [
                360
            ],
            "lastUpdatedAt": [
                360
            ],
            "lockedCollateralFormatted": [
                360
            ],
            "lockedCollateralRaw": [
                360
            ],
            "market_id": [
                360
            ],
            "netFTokenChangeFormatted": [
                360
            ],
            "netFTokenChangeRaw": [
                360
            ],
            "presaleDepositFormatted": [
                360
            ],
            "presaleDepositRaw": [
                360
            ],
            "presaleLeverage": [
                360
            ],
            "stakedAmountFormatted": [
                360
            ],
            "stakedAmountRaw": [
                360
            ],
            "totalDebtFormatted": [
                360
            ],
            "totalDebtRaw": [
                360
            ],
            "user_id": [
                360
            ],
            "__typename": [
                287
            ]
        },
        "UserMarketPosition_order_by": {
            "claimableRewardsFormatted": [
                360
            ],
            "claimableRewardsRaw": [
                360
            ],
            "id": [
                360
            ],
            "lastUpdatedAt": [
                360
            ],
            "lockedCollateralFormatted": [
                360
            ],
            "lockedCollateralRaw": [
                360
            ],
            "market_id": [
                360
            ],
            "netFTokenChangeFormatted": [
                360
            ],
            "netFTokenChangeRaw": [
                360
            ],
            "presaleDepositFormatted": [
                360
            ],
            "presaleDepositRaw": [
                360
            ],
            "presaleLeverage": [
                360
            ],
            "stakedAmountFormatted": [
                360
            ],
            "stakedAmountRaw": [
                360
            ],
            "totalDebtFormatted": [
                360
            ],
            "totalDebtRaw": [
                360
            ],
            "user_id": [
                360
            ],
            "__typename": [
                287
            ]
        },
        "UserMarketPosition_select_column": {},
        "UserMarketPosition_stddev_order_by": {
            "claimableRewardsRaw": [
                360
            ],
            "lastUpdatedAt": [
                360
            ],
            "lockedCollateralRaw": [
                360
            ],
            "netFTokenChangeRaw": [
                360
            ],
            "presaleDepositRaw": [
                360
            ],
            "presaleLeverage": [
                360
            ],
            "stakedAmountRaw": [
                360
            ],
            "totalDebtRaw": [
                360
            ],
            "__typename": [
                287
            ]
        },
        "UserMarketPosition_stddev_pop_order_by": {
            "claimableRewardsRaw": [
                360
            ],
            "lastUpdatedAt": [
                360
            ],
            "lockedCollateralRaw": [
                360
            ],
            "netFTokenChangeRaw": [
                360
            ],
            "presaleDepositRaw": [
                360
            ],
            "presaleLeverage": [
                360
            ],
            "stakedAmountRaw": [
                360
            ],
            "totalDebtRaw": [
                360
            ],
            "__typename": [
                287
            ]
        },
        "UserMarketPosition_stddev_samp_order_by": {
            "claimableRewardsRaw": [
                360
            ],
            "lastUpdatedAt": [
                360
            ],
            "lockedCollateralRaw": [
                360
            ],
            "netFTokenChangeRaw": [
                360
            ],
            "presaleDepositRaw": [
                360
            ],
            "presaleLeverage": [
                360
            ],
            "stakedAmountRaw": [
                360
            ],
            "totalDebtRaw": [
                360
            ],
            "__typename": [
                287
            ]
        },
        "UserMarketPosition_stream_cursor_input": {
            "initial_value": [
                331
            ],
            "ordering": [
                350
            ],
            "__typename": [
                287
            ]
        },
        "UserMarketPosition_stream_cursor_value_input": {
            "claimableRewardsFormatted": [
                287
            ],
            "claimableRewardsRaw": [
                358
            ],
            "id": [
                287
            ],
            "lastUpdatedAt": [
                358
            ],
            "lockedCollateralFormatted": [
                287
            ],
            "lockedCollateralRaw": [
                358
            ],
            "market_id": [
                287
            ],
            "netFTokenChangeFormatted": [
                287
            ],
            "netFTokenChangeRaw": [
                358
            ],
            "presaleDepositFormatted": [
                287
            ],
            "presaleDepositRaw": [
                358
            ],
            "presaleLeverage": [
                358
            ],
            "stakedAmountFormatted": [
                287
            ],
            "stakedAmountRaw": [
                358
            ],
            "totalDebtFormatted": [
                287
            ],
            "totalDebtRaw": [
                358
            ],
            "user_id": [
                287
            ],
            "__typename": [
                287
            ]
        },
        "UserMarketPosition_sum_order_by": {
            "claimableRewardsRaw": [
                360
            ],
            "lastUpdatedAt": [
                360
            ],
            "lockedCollateralRaw": [
                360
            ],
            "netFTokenChangeRaw": [
                360
            ],
            "presaleDepositRaw": [
                360
            ],
            "presaleLeverage": [
                360
            ],
            "stakedAmountRaw": [
                360
            ],
            "totalDebtRaw": [
                360
            ],
            "__typename": [
                287
            ]
        },
        "UserMarketPosition_var_pop_order_by": {
            "claimableRewardsRaw": [
                360
            ],
            "lastUpdatedAt": [
                360
            ],
            "lockedCollateralRaw": [
                360
            ],
            "netFTokenChangeRaw": [
                360
            ],
            "presaleDepositRaw": [
                360
            ],
            "presaleLeverage": [
                360
            ],
            "stakedAmountRaw": [
                360
            ],
            "totalDebtRaw": [
                360
            ],
            "__typename": [
                287
            ]
        },
        "UserMarketPosition_var_samp_order_by": {
            "claimableRewardsRaw": [
                360
            ],
            "lastUpdatedAt": [
                360
            ],
            "lockedCollateralRaw": [
                360
            ],
            "netFTokenChangeRaw": [
                360
            ],
            "presaleDepositRaw": [
                360
            ],
            "presaleLeverage": [
                360
            ],
            "stakedAmountRaw": [
                360
            ],
            "totalDebtRaw": [
                360
            ],
            "__typename": [
                287
            ]
        },
        "UserMarketPosition_variance_order_by": {
            "claimableRewardsRaw": [
                360
            ],
            "lastUpdatedAt": [
                360
            ],
            "lockedCollateralRaw": [
                360
            ],
            "netFTokenChangeRaw": [
                360
            ],
            "presaleDepositRaw": [
                360
            ],
            "presaleLeverage": [
                360
            ],
            "stakedAmountRaw": [
                360
            ],
            "totalDebtRaw": [
                360
            ],
            "__typename": [
                287
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
                373
            ],
            "sourceBlock": [
                89
            ],
            "startBlock": [
                89
            ],
            "__typename": [
                287
            ]
        },
        "_meta_bool_exp": {
            "_and": [
                337
            ],
            "_not": [
                337
            ],
            "_or": [
                337
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
                374
            ],
            "sourceBlock": [
                91
            ],
            "startBlock": [
                91
            ],
            "__typename": [
                287
            ]
        },
        "_meta_order_by": {
            "bufferBlock": [
                360
            ],
            "chainId": [
                360
            ],
            "endBlock": [
                360
            ],
            "eventsProcessed": [
                360
            ],
            "firstEventBlock": [
                360
            ],
            "isReady": [
                360
            ],
            "progressBlock": [
                360
            ],
            "readyAt": [
                360
            ],
            "sourceBlock": [
                360
            ],
            "startBlock": [
                360
            ],
            "__typename": [
                287
            ]
        },
        "_meta_select_column": {},
        "_meta_stream_cursor_input": {
            "initial_value": [
                341
            ],
            "ordering": [
                350
            ],
            "__typename": [
                287
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
                373
            ],
            "sourceBlock": [
                89
            ],
            "startBlock": [
                89
            ],
            "__typename": [
                287
            ]
        },
        "candleperiod": {},
        "candleperiod_comparison_exp": {
            "_eq": [
                342
            ],
            "_gt": [
                342
            ],
            "_gte": [
                342
            ],
            "_in": [
                342
            ],
            "_is_null": [
                12
            ],
            "_lt": [
                342
            ],
            "_lte": [
                342
            ],
            "_neq": [
                342
            ],
            "_nin": [
                342
            ],
            "__typename": [
                287
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
                373
            ],
            "__typename": [
                287
            ]
        },
        "chain_metadata_bool_exp": {
            "_and": [
                345
            ],
            "_not": [
                345
            ],
            "_or": [
                345
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
                374
            ],
            "__typename": [
                287
            ]
        },
        "chain_metadata_order_by": {
            "block_height": [
                360
            ],
            "chain_id": [
                360
            ],
            "end_block": [
                360
            ],
            "first_event_block_number": [
                360
            ],
            "is_hyper_sync": [
                360
            ],
            "latest_fetched_block_number": [
                360
            ],
            "latest_processed_block": [
                360
            ],
            "num_batches_fetched": [
                360
            ],
            "num_events_processed": [
                360
            ],
            "start_block": [
                360
            ],
            "timestamp_caught_up_to_head_or_endblock": [
                360
            ],
            "__typename": [
                287
            ]
        },
        "chain_metadata_select_column": {},
        "chain_metadata_stream_cursor_input": {
            "initial_value": [
                349
            ],
            "ordering": [
                350
            ],
            "__typename": [
                287
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
                373
            ],
            "__typename": [
                287
            ]
        },
        "cursor_ordering": {},
        "jsonb": {},
        "jsonb_cast_exp": {
            "String": [
                289
            ],
            "__typename": [
                287
            ]
        },
        "jsonb_comparison_exp": {
            "_cast": [
                352
            ],
            "_contained_in": [
                351
            ],
            "_contains": [
                351
            ],
            "_eq": [
                351
            ],
            "_gt": [
                351
            ],
            "_gte": [
                351
            ],
            "_has_key": [
                287
            ],
            "_has_keys_all": [
                287
            ],
            "_has_keys_any": [
                287
            ],
            "_in": [
                351
            ],
            "_is_null": [
                12
            ],
            "_lt": [
                351
            ],
            "_lte": [
                351
            ],
            "_neq": [
                351
            ],
            "_nin": [
                351
            ],
            "__typename": [
                287
            ]
        },
        "loanstatus": {},
        "loanstatus_comparison_exp": {
            "_eq": [
                354
            ],
            "_gt": [
                354
            ],
            "_gte": [
                354
            ],
            "_in": [
                354
            ],
            "_is_null": [
                12
            ],
            "_lt": [
                354
            ],
            "_lte": [
                354
            ],
            "_neq": [
                354
            ],
            "_nin": [
                354
            ],
            "__typename": [
                287
            ]
        },
        "marketstatus": {},
        "marketstatus_comparison_exp": {
            "_eq": [
                356
            ],
            "_gt": [
                356
            ],
            "_gte": [
                356
            ],
            "_in": [
                356
            ],
            "_is_null": [
                12
            ],
            "_lt": [
                356
            ],
            "_lte": [
                356
            ],
            "_neq": [
                356
            ],
            "_nin": [
                356
            ],
            "__typename": [
                287
            ]
        },
        "numeric": {},
        "numeric_comparison_exp": {
            "_eq": [
                358
            ],
            "_gt": [
                358
            ],
            "_gte": [
                358
            ],
            "_in": [
                358
            ],
            "_is_null": [
                12
            ],
            "_lt": [
                358
            ],
            "_lte": [
                358
            ],
            "_neq": [
                358
            ],
            "_nin": [
                358
            ],
            "__typename": [
                287
            ]
        },
        "order_by": {},
        "presaleclaimtype": {},
        "presaleclaimtype_comparison_exp": {
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
                287
            ]
        },
        "raw_events": {
            "block_fields": [
                351,
                {
                    "path": [
                        287
                    ]
                }
            ],
            "block_hash": [
                287
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
                287
            ],
            "event_id": [
                358
            ],
            "event_name": [
                287
            ],
            "log_index": [
                89
            ],
            "params": [
                351,
                {
                    "path": [
                        287
                    ]
                }
            ],
            "serial": [
                89
            ],
            "src_address": [
                287
            ],
            "transaction_fields": [
                351,
                {
                    "path": [
                        287
                    ]
                }
            ],
            "__typename": [
                287
            ]
        },
        "raw_events_bool_exp": {
            "_and": [
                364
            ],
            "_not": [
                364
            ],
            "_or": [
                364
            ],
            "block_fields": [
                353
            ],
            "block_hash": [
                289
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
                289
            ],
            "event_id": [
                359
            ],
            "event_name": [
                289
            ],
            "log_index": [
                91
            ],
            "params": [
                353
            ],
            "serial": [
                91
            ],
            "src_address": [
                289
            ],
            "transaction_fields": [
                353
            ],
            "__typename": [
                287
            ]
        },
        "raw_events_order_by": {
            "block_fields": [
                360
            ],
            "block_hash": [
                360
            ],
            "block_number": [
                360
            ],
            "block_timestamp": [
                360
            ],
            "chain_id": [
                360
            ],
            "contract_name": [
                360
            ],
            "event_id": [
                360
            ],
            "event_name": [
                360
            ],
            "log_index": [
                360
            ],
            "params": [
                360
            ],
            "serial": [
                360
            ],
            "src_address": [
                360
            ],
            "transaction_fields": [
                360
            ],
            "__typename": [
                287
            ]
        },
        "raw_events_select_column": {},
        "raw_events_stream_cursor_input": {
            "initial_value": [
                368
            ],
            "ordering": [
                350
            ],
            "__typename": [
                287
            ]
        },
        "raw_events_stream_cursor_value_input": {
            "block_fields": [
                351
            ],
            "block_hash": [
                287
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
                287
            ],
            "event_id": [
                358
            ],
            "event_name": [
                287
            ],
            "log_index": [
                89
            ],
            "params": [
                351
            ],
            "serial": [
                89
            ],
            "src_address": [
                287
            ],
            "transaction_fields": [
                351
            ],
            "__typename": [
                287
            ]
        },
        "snapshotperiod": {},
        "snapshotperiod_comparison_exp": {
            "_eq": [
                369
            ],
            "_gt": [
                369
            ],
            "_gte": [
                369
            ],
            "_in": [
                369
            ],
            "_is_null": [
                12
            ],
            "_lt": [
                369
            ],
            "_lte": [
                369
            ],
            "_neq": [
                369
            ],
            "_nin": [
                369
            ],
            "__typename": [
                287
            ]
        },
        "stakestatus": {},
        "stakestatus_comparison_exp": {
            "_eq": [
                371
            ],
            "_gt": [
                371
            ],
            "_gte": [
                371
            ],
            "_in": [
                371
            ],
            "_is_null": [
                12
            ],
            "_lt": [
                371
            ],
            "_lte": [
                371
            ],
            "_neq": [
                371
            ],
            "_nin": [
                371
            ],
            "__typename": [
                287
            ]
        },
        "timestamptz": {},
        "timestamptz_comparison_exp": {
            "_eq": [
                373
            ],
            "_gt": [
                373
            ],
            "_gte": [
                373
            ],
            "_in": [
                373
            ],
            "_is_null": [
                12
            ],
            "_lt": [
                373
            ],
            "_lte": [
                373
            ],
            "_neq": [
                373
            ],
            "_nin": [
                373
            ],
            "__typename": [
                287
            ]
        },
        "tradetype": {},
        "tradetype_comparison_exp": {
            "_eq": [
                375
            ],
            "_gt": [
                375
            ],
            "_gte": [
                375
            ],
            "_in": [
                375
            ],
            "_is_null": [
                12
            ],
            "_lt": [
                375
            ],
            "_lte": [
                375
            ],
            "_neq": [
                375
            ],
            "_nin": [
                375
            ],
            "__typename": [
                287
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
                        287,
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
                        287,
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
                        287,
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
                        287,
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
                        287,
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
                        287,
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
                        287,
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
                        287,
                        "String!"
                    ]
                }
            ],
            "GlobalStats_by_pk": [
                77,
                {
                    "id": [
                        287,
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
                        287,
                        "String!"
                    ]
                }
            ],
            "Loan_by_pk": [
                92,
                {
                    "id": [
                        287,
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
                        287,
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
                        287,
                        "String!"
                    ]
                }
            ],
            "Market_by_pk": [
                126,
                {
                    "id": [
                        287,
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
                        287,
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
                        287,
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
                        287,
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
                        287,
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
                        287,
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
                        287,
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
                        287,
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
                        287,
                        "String!"
                    ]
                }
            ],
            "Role_by_pk": [
                213,
                {
                    "id": [
                        287,
                        "String!"
                    ]
                }
            ],
            "Stake": [
                264,
                {
                    "distinct_on": [
                        271,
                        "[Stake_select_column!]"
                    ],
                    "limit": [
                        89
                    ],
                    "offset": [
                        89
                    ],
                    "order_by": [
                        270,
                        "[Stake_order_by!]"
                    ],
                    "where": [
                        267
                    ]
                }
            ],
            "Stake_by_pk": [
                264,
                {
                    "id": [
                        287,
                        "String!"
                    ]
                }
            ],
            "StakingContract": [
                281,
                {
                    "distinct_on": [
                        284,
                        "[StakingContract_select_column!]"
                    ],
                    "limit": [
                        89
                    ],
                    "offset": [
                        89
                    ],
                    "order_by": [
                        283,
                        "[StakingContract_order_by!]"
                    ],
                    "where": [
                        282
                    ]
                }
            ],
            "StakingContract_by_pk": [
                281,
                {
                    "id": [
                        287,
                        "String!"
                    ]
                }
            ],
            "Token": [
                290,
                {
                    "distinct_on": [
                        293,
                        "[Token_select_column!]"
                    ],
                    "limit": [
                        89
                    ],
                    "offset": [
                        89
                    ],
                    "order_by": [
                        292,
                        "[Token_order_by!]"
                    ],
                    "where": [
                        291
                    ]
                }
            ],
            "Token_by_pk": [
                290,
                {
                    "id": [
                        287,
                        "String!"
                    ]
                }
            ],
            "Trade": [
                296,
                {
                    "distinct_on": [
                        303,
                        "[Trade_select_column!]"
                    ],
                    "limit": [
                        89
                    ],
                    "offset": [
                        89
                    ],
                    "order_by": [
                        302,
                        "[Trade_order_by!]"
                    ],
                    "where": [
                        299
                    ]
                }
            ],
            "Trade_by_pk": [
                296,
                {
                    "id": [
                        287,
                        "String!"
                    ]
                }
            ],
            "Treasury": [
                313,
                {
                    "distinct_on": [
                        316,
                        "[Treasury_select_column!]"
                    ],
                    "limit": [
                        89
                    ],
                    "offset": [
                        89
                    ],
                    "order_by": [
                        315,
                        "[Treasury_order_by!]"
                    ],
                    "where": [
                        314
                    ]
                }
            ],
            "Treasury_by_pk": [
                313,
                {
                    "id": [
                        287,
                        "String!"
                    ]
                }
            ],
            "UserMarketPosition": [
                319,
                {
                    "distinct_on": [
                        326,
                        "[UserMarketPosition_select_column!]"
                    ],
                    "limit": [
                        89
                    ],
                    "offset": [
                        89
                    ],
                    "order_by": [
                        325,
                        "[UserMarketPosition_order_by!]"
                    ],
                    "where": [
                        322
                    ]
                }
            ],
            "UserMarketPosition_by_pk": [
                319,
                {
                    "id": [
                        287,
                        "String!"
                    ]
                }
            ],
            "_meta": [
                336,
                {
                    "distinct_on": [
                        339,
                        "[_meta_select_column!]"
                    ],
                    "limit": [
                        89
                    ],
                    "offset": [
                        89
                    ],
                    "order_by": [
                        338,
                        "[_meta_order_by!]"
                    ],
                    "where": [
                        337
                    ]
                }
            ],
            "chain_metadata": [
                344,
                {
                    "distinct_on": [
                        347,
                        "[chain_metadata_select_column!]"
                    ],
                    "limit": [
                        89
                    ],
                    "offset": [
                        89
                    ],
                    "order_by": [
                        346,
                        "[chain_metadata_order_by!]"
                    ],
                    "where": [
                        345
                    ]
                }
            ],
            "raw_events": [
                363,
                {
                    "distinct_on": [
                        366,
                        "[raw_events_select_column!]"
                    ],
                    "limit": [
                        89
                    ],
                    "offset": [
                        89
                    ],
                    "order_by": [
                        365,
                        "[raw_events_order_by!]"
                    ],
                    "where": [
                        364
                    ]
                }
            ],
            "raw_events_by_pk": [
                363,
                {
                    "serial": [
                        89,
                        "Int!"
                    ]
                }
            ],
            "__typename": [
                287
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
                        287,
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
                        287,
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
                        287,
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
                        287,
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
                        287,
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
                        287,
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
                        287,
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
                        287,
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
                        287,
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
                        287,
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
                        287,
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
                        287,
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
                        287,
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
                        287,
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
                        287,
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
                        287,
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
                        287,
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
                        287,
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
                        287,
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
                        287,
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
                        287,
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
                        287,
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
                        287,
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
            "Stake": [
                264,
                {
                    "distinct_on": [
                        271,
                        "[Stake_select_column!]"
                    ],
                    "limit": [
                        89
                    ],
                    "offset": [
                        89
                    ],
                    "order_by": [
                        270,
                        "[Stake_order_by!]"
                    ],
                    "where": [
                        267
                    ]
                }
            ],
            "Stake_by_pk": [
                264,
                {
                    "id": [
                        287,
                        "String!"
                    ]
                }
            ],
            "Stake_stream": [
                264,
                {
                    "batch_size": [
                        89,
                        "Int!"
                    ],
                    "cursor": [
                        275,
                        "[Stake_stream_cursor_input]!"
                    ],
                    "where": [
                        267
                    ]
                }
            ],
            "StakingContract": [
                281,
                {
                    "distinct_on": [
                        284,
                        "[StakingContract_select_column!]"
                    ],
                    "limit": [
                        89
                    ],
                    "offset": [
                        89
                    ],
                    "order_by": [
                        283,
                        "[StakingContract_order_by!]"
                    ],
                    "where": [
                        282
                    ]
                }
            ],
            "StakingContract_by_pk": [
                281,
                {
                    "id": [
                        287,
                        "String!"
                    ]
                }
            ],
            "StakingContract_stream": [
                281,
                {
                    "batch_size": [
                        89,
                        "Int!"
                    ],
                    "cursor": [
                        285,
                        "[StakingContract_stream_cursor_input]!"
                    ],
                    "where": [
                        282
                    ]
                }
            ],
            "Token": [
                290,
                {
                    "distinct_on": [
                        293,
                        "[Token_select_column!]"
                    ],
                    "limit": [
                        89
                    ],
                    "offset": [
                        89
                    ],
                    "order_by": [
                        292,
                        "[Token_order_by!]"
                    ],
                    "where": [
                        291
                    ]
                }
            ],
            "Token_by_pk": [
                290,
                {
                    "id": [
                        287,
                        "String!"
                    ]
                }
            ],
            "Token_stream": [
                290,
                {
                    "batch_size": [
                        89,
                        "Int!"
                    ],
                    "cursor": [
                        294,
                        "[Token_stream_cursor_input]!"
                    ],
                    "where": [
                        291
                    ]
                }
            ],
            "Trade": [
                296,
                {
                    "distinct_on": [
                        303,
                        "[Trade_select_column!]"
                    ],
                    "limit": [
                        89
                    ],
                    "offset": [
                        89
                    ],
                    "order_by": [
                        302,
                        "[Trade_order_by!]"
                    ],
                    "where": [
                        299
                    ]
                }
            ],
            "Trade_by_pk": [
                296,
                {
                    "id": [
                        287,
                        "String!"
                    ]
                }
            ],
            "Trade_stream": [
                296,
                {
                    "batch_size": [
                        89,
                        "Int!"
                    ],
                    "cursor": [
                        307,
                        "[Trade_stream_cursor_input]!"
                    ],
                    "where": [
                        299
                    ]
                }
            ],
            "Treasury": [
                313,
                {
                    "distinct_on": [
                        316,
                        "[Treasury_select_column!]"
                    ],
                    "limit": [
                        89
                    ],
                    "offset": [
                        89
                    ],
                    "order_by": [
                        315,
                        "[Treasury_order_by!]"
                    ],
                    "where": [
                        314
                    ]
                }
            ],
            "Treasury_by_pk": [
                313,
                {
                    "id": [
                        287,
                        "String!"
                    ]
                }
            ],
            "Treasury_stream": [
                313,
                {
                    "batch_size": [
                        89,
                        "Int!"
                    ],
                    "cursor": [
                        317,
                        "[Treasury_stream_cursor_input]!"
                    ],
                    "where": [
                        314
                    ]
                }
            ],
            "UserMarketPosition": [
                319,
                {
                    "distinct_on": [
                        326,
                        "[UserMarketPosition_select_column!]"
                    ],
                    "limit": [
                        89
                    ],
                    "offset": [
                        89
                    ],
                    "order_by": [
                        325,
                        "[UserMarketPosition_order_by!]"
                    ],
                    "where": [
                        322
                    ]
                }
            ],
            "UserMarketPosition_by_pk": [
                319,
                {
                    "id": [
                        287,
                        "String!"
                    ]
                }
            ],
            "UserMarketPosition_stream": [
                319,
                {
                    "batch_size": [
                        89,
                        "Int!"
                    ],
                    "cursor": [
                        330,
                        "[UserMarketPosition_stream_cursor_input]!"
                    ],
                    "where": [
                        322
                    ]
                }
            ],
            "_meta": [
                336,
                {
                    "distinct_on": [
                        339,
                        "[_meta_select_column!]"
                    ],
                    "limit": [
                        89
                    ],
                    "offset": [
                        89
                    ],
                    "order_by": [
                        338,
                        "[_meta_order_by!]"
                    ],
                    "where": [
                        337
                    ]
                }
            ],
            "_meta_stream": [
                336,
                {
                    "batch_size": [
                        89,
                        "Int!"
                    ],
                    "cursor": [
                        340,
                        "[_meta_stream_cursor_input]!"
                    ],
                    "where": [
                        337
                    ]
                }
            ],
            "chain_metadata": [
                344,
                {
                    "distinct_on": [
                        347,
                        "[chain_metadata_select_column!]"
                    ],
                    "limit": [
                        89
                    ],
                    "offset": [
                        89
                    ],
                    "order_by": [
                        346,
                        "[chain_metadata_order_by!]"
                    ],
                    "where": [
                        345
                    ]
                }
            ],
            "chain_metadata_stream": [
                344,
                {
                    "batch_size": [
                        89,
                        "Int!"
                    ],
                    "cursor": [
                        348,
                        "[chain_metadata_stream_cursor_input]!"
                    ],
                    "where": [
                        345
                    ]
                }
            ],
            "raw_events": [
                363,
                {
                    "distinct_on": [
                        366,
                        "[raw_events_select_column!]"
                    ],
                    "limit": [
                        89
                    ],
                    "offset": [
                        89
                    ],
                    "order_by": [
                        365,
                        "[raw_events_order_by!]"
                    ],
                    "where": [
                        364
                    ]
                }
            ],
            "raw_events_by_pk": [
                363,
                {
                    "serial": [
                        89,
                        "Int!"
                    ]
                }
            ],
            "raw_events_stream": [
                363,
                {
                    "batch_size": [
                        89,
                        "Int!"
                    ],
                    "cursor": [
                        367,
                        "[raw_events_stream_cursor_input]!"
                    ],
                    "where": [
                        364
                    ]
                }
            ],
            "__typename": [
                287
            ]
        }
    }
}