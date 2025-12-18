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
        80,
        83,
        94,
        110,
        124,
        130,
        139,
        152,
        158,
        164,
        174,
        191,
        204,
        215,
        232,
        248,
        265,
        278,
        281,
        287,
        297,
        310,
        320,
        333,
        336,
        341,
        344,
        345,
        348,
        350,
        352,
        354,
        355,
        360,
        363,
        365,
        367
    ],
    "types": {
        "Account": {
            "id": [
                281
            ],
            "loans": [
                86,
                {
                    "distinct_on": [
                        110,
                        "[Loan_select_column!]"
                    ],
                    "limit": [
                        83
                    ],
                    "offset": [
                        83
                    ],
                    "order_by": [
                        109,
                        "[Loan_order_by!]"
                    ],
                    "where": [
                        106
                    ]
                }
            ],
            "marketsCreated": [
                120,
                {
                    "distinct_on": [
                        139,
                        "[Market_select_column!]"
                    ],
                    "limit": [
                        83
                    ],
                    "offset": [
                        83
                    ],
                    "order_by": [
                        138,
                        "[Market_order_by!]"
                    ],
                    "where": [
                        135
                    ]
                }
            ],
            "presaleParticipations": [
                184,
                {
                    "distinct_on": [
                        191,
                        "[PresaleParticipation_select_column!]"
                    ],
                    "limit": [
                        83
                    ],
                    "offset": [
                        83
                    ],
                    "order_by": [
                        190,
                        "[PresaleParticipation_order_by!]"
                    ],
                    "where": [
                        187
                    ]
                }
            ],
            "stakes": [
                258,
                {
                    "distinct_on": [
                        265,
                        "[Stake_select_column!]"
                    ],
                    "limit": [
                        83
                    ],
                    "offset": [
                        83
                    ],
                    "order_by": [
                        264,
                        "[Stake_order_by!]"
                    ],
                    "where": [
                        261
                    ]
                }
            ],
            "trades": [
                290,
                {
                    "distinct_on": [
                        297,
                        "[Trade_select_column!]"
                    ],
                    "limit": [
                        83
                    ],
                    "offset": [
                        83
                    ],
                    "order_by": [
                        296,
                        "[Trade_order_by!]"
                    ],
                    "where": [
                        293
                    ]
                }
            ],
            "userMarketPositions": [
                313,
                {
                    "distinct_on": [
                        320,
                        "[UserMarketPosition_select_column!]"
                    ],
                    "limit": [
                        83
                    ],
                    "offset": [
                        83
                    ],
                    "order_by": [
                        319,
                        "[UserMarketPosition_order_by!]"
                    ],
                    "where": [
                        316
                    ]
                }
            ],
            "__typename": [
                281
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
                283
            ],
            "loans": [
                106
            ],
            "marketsCreated": [
                135
            ],
            "presaleParticipations": [
                187
            ],
            "stakes": [
                261
            ],
            "trades": [
                293
            ],
            "userMarketPositions": [
                316
            ],
            "__typename": [
                281
            ]
        },
        "Account_order_by": {
            "id": [
                354
            ],
            "loans_aggregate": [
                104
            ],
            "marketsCreated_aggregate": [
                133
            ],
            "presaleParticipations_aggregate": [
                185
            ],
            "stakes_aggregate": [
                259
            ],
            "trades_aggregate": [
                291
            ],
            "userMarketPositions_aggregate": [
                314
            ],
            "__typename": [
                281
            ]
        },
        "Account_select_column": {},
        "Account_stream_cursor_input": {
            "initial_value": [
                5
            ],
            "ordering": [
                344
            ],
            "__typename": [
                281
            ]
        },
        "Account_stream_cursor_value_input": {
            "id": [
                281
            ],
            "__typename": [
                281
            ]
        },
        "AuthorizerContract": {
            "createdAt": [
                352
            ],
            "floor": [
                281
            ],
            "id": [
                281
            ],
            "lastAssignedRoleId": [
                352
            ],
            "lastUpdatedAt": [
                352
            ],
            "roles": [
                207,
                {
                    "distinct_on": [
                        248,
                        "[Role_select_column!]"
                    ],
                    "limit": [
                        83
                    ],
                    "offset": [
                        83
                    ],
                    "order_by": [
                        247,
                        "[Role_order_by!]"
                    ],
                    "where": [
                        244
                    ]
                }
            ],
            "__typename": [
                281
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
                353
            ],
            "floor": [
                283
            ],
            "id": [
                283
            ],
            "lastAssignedRoleId": [
                353
            ],
            "lastUpdatedAt": [
                353
            ],
            "roles": [
                244
            ],
            "__typename": [
                281
            ]
        },
        "AuthorizerContract_order_by": {
            "createdAt": [
                354
            ],
            "floor": [
                354
            ],
            "id": [
                354
            ],
            "lastAssignedRoleId": [
                354
            ],
            "lastUpdatedAt": [
                354
            ],
            "roles_aggregate": [
                242
            ],
            "__typename": [
                281
            ]
        },
        "AuthorizerContract_select_column": {},
        "AuthorizerContract_stream_cursor_input": {
            "initial_value": [
                11
            ],
            "ordering": [
                344
            ],
            "__typename": [
                281
            ]
        },
        "AuthorizerContract_stream_cursor_value_input": {
            "createdAt": [
                352
            ],
            "floor": [
                281
            ],
            "id": [
                281
            ],
            "lastAssignedRoleId": [
                352
            ],
            "lastUpdatedAt": [
                352
            ],
            "__typename": [
                281
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
                281
            ]
        },
        "CreditFacilityContract": {
            "borrowToken_id": [
                281
            ],
            "collateralToken_id": [
                281
            ],
            "createdAt": [
                352
            ],
            "id": [
                281
            ],
            "lastUpdatedAt": [
                352
            ],
            "loans": [
                86,
                {
                    "distinct_on": [
                        110,
                        "[Loan_select_column!]"
                    ],
                    "limit": [
                        83
                    ],
                    "offset": [
                        83
                    ],
                    "order_by": [
                        109,
                        "[Loan_order_by!]"
                    ],
                    "where": [
                        106
                    ]
                }
            ],
            "market_id": [
                281
            ],
            "totalDebtFormatted": [
                281
            ],
            "totalDebtRaw": [
                352
            ],
            "totalLoans": [
                352
            ],
            "totalLockedCollateralFormatted": [
                281
            ],
            "totalLockedCollateralRaw": [
                352
            ],
            "totalVolumeFormatted": [
                281
            ],
            "totalVolumeRaw": [
                352
            ],
            "__typename": [
                281
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
                283
            ],
            "collateralToken_id": [
                283
            ],
            "createdAt": [
                353
            ],
            "id": [
                283
            ],
            "lastUpdatedAt": [
                353
            ],
            "loans": [
                106
            ],
            "market_id": [
                283
            ],
            "totalDebtFormatted": [
                283
            ],
            "totalDebtRaw": [
                353
            ],
            "totalLoans": [
                353
            ],
            "totalLockedCollateralFormatted": [
                283
            ],
            "totalLockedCollateralRaw": [
                353
            ],
            "totalVolumeFormatted": [
                283
            ],
            "totalVolumeRaw": [
                353
            ],
            "__typename": [
                281
            ]
        },
        "CreditFacilityContract_order_by": {
            "borrowToken_id": [
                354
            ],
            "collateralToken_id": [
                354
            ],
            "createdAt": [
                354
            ],
            "id": [
                354
            ],
            "lastUpdatedAt": [
                354
            ],
            "loans_aggregate": [
                104
            ],
            "market_id": [
                354
            ],
            "totalDebtFormatted": [
                354
            ],
            "totalDebtRaw": [
                354
            ],
            "totalLoans": [
                354
            ],
            "totalLockedCollateralFormatted": [
                354
            ],
            "totalLockedCollateralRaw": [
                354
            ],
            "totalVolumeFormatted": [
                354
            ],
            "totalVolumeRaw": [
                354
            ],
            "__typename": [
                281
            ]
        },
        "CreditFacilityContract_select_column": {},
        "CreditFacilityContract_stream_cursor_input": {
            "initial_value": [
                19
            ],
            "ordering": [
                344
            ],
            "__typename": [
                281
            ]
        },
        "CreditFacilityContract_stream_cursor_value_input": {
            "borrowToken_id": [
                281
            ],
            "collateralToken_id": [
                281
            ],
            "createdAt": [
                352
            ],
            "id": [
                281
            ],
            "lastUpdatedAt": [
                352
            ],
            "market_id": [
                281
            ],
            "totalDebtFormatted": [
                281
            ],
            "totalDebtRaw": [
                352
            ],
            "totalLoans": [
                352
            ],
            "totalLockedCollateralFormatted": [
                281
            ],
            "totalLockedCollateralRaw": [
                352
            ],
            "totalVolumeFormatted": [
                281
            ],
            "totalVolumeRaw": [
                352
            ],
            "__typename": [
                281
            ]
        },
        "FeeSplitterPayment": {
            "amountFormatted": [
                281
            ],
            "amountRaw": [
                352
            ],
            "id": [
                281
            ],
            "isFloorFee": [
                12
            ],
            "market_id": [
                281
            ],
            "recipient": [
                281
            ],
            "timestamp": [
                352
            ],
            "token_id": [
                281
            ],
            "transactionHash": [
                281
            ],
            "treasury_id": [
                281
            ],
            "__typename": [
                281
            ]
        },
        "FeeSplitterPayment_aggregate_order_by": {
            "avg": [
                22
            ],
            "count": [
                354
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
                281
            ]
        },
        "FeeSplitterPayment_avg_order_by": {
            "amountRaw": [
                354
            ],
            "timestamp": [
                354
            ],
            "__typename": [
                281
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
                283
            ],
            "amountRaw": [
                353
            ],
            "id": [
                283
            ],
            "isFloorFee": [
                13
            ],
            "market_id": [
                283
            ],
            "recipient": [
                283
            ],
            "timestamp": [
                353
            ],
            "token_id": [
                283
            ],
            "transactionHash": [
                283
            ],
            "treasury_id": [
                283
            ],
            "__typename": [
                281
            ]
        },
        "FeeSplitterPayment_max_order_by": {
            "amountFormatted": [
                354
            ],
            "amountRaw": [
                354
            ],
            "id": [
                354
            ],
            "market_id": [
                354
            ],
            "recipient": [
                354
            ],
            "timestamp": [
                354
            ],
            "token_id": [
                354
            ],
            "transactionHash": [
                354
            ],
            "treasury_id": [
                354
            ],
            "__typename": [
                281
            ]
        },
        "FeeSplitterPayment_min_order_by": {
            "amountFormatted": [
                354
            ],
            "amountRaw": [
                354
            ],
            "id": [
                354
            ],
            "market_id": [
                354
            ],
            "recipient": [
                354
            ],
            "timestamp": [
                354
            ],
            "token_id": [
                354
            ],
            "transactionHash": [
                354
            ],
            "treasury_id": [
                354
            ],
            "__typename": [
                281
            ]
        },
        "FeeSplitterPayment_order_by": {
            "amountFormatted": [
                354
            ],
            "amountRaw": [
                354
            ],
            "id": [
                354
            ],
            "isFloorFee": [
                354
            ],
            "market_id": [
                354
            ],
            "recipient": [
                354
            ],
            "timestamp": [
                354
            ],
            "token_id": [
                354
            ],
            "transactionHash": [
                354
            ],
            "treasury_id": [
                354
            ],
            "__typename": [
                281
            ]
        },
        "FeeSplitterPayment_select_column": {},
        "FeeSplitterPayment_stddev_order_by": {
            "amountRaw": [
                354
            ],
            "timestamp": [
                354
            ],
            "__typename": [
                281
            ]
        },
        "FeeSplitterPayment_stddev_pop_order_by": {
            "amountRaw": [
                354
            ],
            "timestamp": [
                354
            ],
            "__typename": [
                281
            ]
        },
        "FeeSplitterPayment_stddev_samp_order_by": {
            "amountRaw": [
                354
            ],
            "timestamp": [
                354
            ],
            "__typename": [
                281
            ]
        },
        "FeeSplitterPayment_stream_cursor_input": {
            "initial_value": [
                32
            ],
            "ordering": [
                344
            ],
            "__typename": [
                281
            ]
        },
        "FeeSplitterPayment_stream_cursor_value_input": {
            "amountFormatted": [
                281
            ],
            "amountRaw": [
                352
            ],
            "id": [
                281
            ],
            "isFloorFee": [
                12
            ],
            "market_id": [
                281
            ],
            "recipient": [
                281
            ],
            "timestamp": [
                352
            ],
            "token_id": [
                281
            ],
            "transactionHash": [
                281
            ],
            "treasury_id": [
                281
            ],
            "__typename": [
                281
            ]
        },
        "FeeSplitterPayment_sum_order_by": {
            "amountRaw": [
                354
            ],
            "timestamp": [
                354
            ],
            "__typename": [
                281
            ]
        },
        "FeeSplitterPayment_var_pop_order_by": {
            "amountRaw": [
                354
            ],
            "timestamp": [
                354
            ],
            "__typename": [
                281
            ]
        },
        "FeeSplitterPayment_var_samp_order_by": {
            "amountRaw": [
                354
            ],
            "timestamp": [
                354
            ],
            "__typename": [
                281
            ]
        },
        "FeeSplitterPayment_variance_order_by": {
            "amountRaw": [
                354
            ],
            "timestamp": [
                354
            ],
            "__typename": [
                281
            ]
        },
        "FeeSplitterReceipt": {
            "amountFormatted": [
                281
            ],
            "amountRaw": [
                352
            ],
            "id": [
                281
            ],
            "market_id": [
                281
            ],
            "sender": [
                281
            ],
            "timestamp": [
                352
            ],
            "token_id": [
                281
            ],
            "transactionHash": [
                281
            ],
            "treasury_id": [
                281
            ],
            "__typename": [
                281
            ]
        },
        "FeeSplitterReceipt_aggregate_order_by": {
            "avg": [
                39
            ],
            "count": [
                354
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
                281
            ]
        },
        "FeeSplitterReceipt_avg_order_by": {
            "amountRaw": [
                354
            ],
            "timestamp": [
                354
            ],
            "__typename": [
                281
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
                283
            ],
            "amountRaw": [
                353
            ],
            "id": [
                283
            ],
            "market_id": [
                283
            ],
            "sender": [
                283
            ],
            "timestamp": [
                353
            ],
            "token_id": [
                283
            ],
            "transactionHash": [
                283
            ],
            "treasury_id": [
                283
            ],
            "__typename": [
                281
            ]
        },
        "FeeSplitterReceipt_max_order_by": {
            "amountFormatted": [
                354
            ],
            "amountRaw": [
                354
            ],
            "id": [
                354
            ],
            "market_id": [
                354
            ],
            "sender": [
                354
            ],
            "timestamp": [
                354
            ],
            "token_id": [
                354
            ],
            "transactionHash": [
                354
            ],
            "treasury_id": [
                354
            ],
            "__typename": [
                281
            ]
        },
        "FeeSplitterReceipt_min_order_by": {
            "amountFormatted": [
                354
            ],
            "amountRaw": [
                354
            ],
            "id": [
                354
            ],
            "market_id": [
                354
            ],
            "sender": [
                354
            ],
            "timestamp": [
                354
            ],
            "token_id": [
                354
            ],
            "transactionHash": [
                354
            ],
            "treasury_id": [
                354
            ],
            "__typename": [
                281
            ]
        },
        "FeeSplitterReceipt_order_by": {
            "amountFormatted": [
                354
            ],
            "amountRaw": [
                354
            ],
            "id": [
                354
            ],
            "market_id": [
                354
            ],
            "sender": [
                354
            ],
            "timestamp": [
                354
            ],
            "token_id": [
                354
            ],
            "transactionHash": [
                354
            ],
            "treasury_id": [
                354
            ],
            "__typename": [
                281
            ]
        },
        "FeeSplitterReceipt_select_column": {},
        "FeeSplitterReceipt_stddev_order_by": {
            "amountRaw": [
                354
            ],
            "timestamp": [
                354
            ],
            "__typename": [
                281
            ]
        },
        "FeeSplitterReceipt_stddev_pop_order_by": {
            "amountRaw": [
                354
            ],
            "timestamp": [
                354
            ],
            "__typename": [
                281
            ]
        },
        "FeeSplitterReceipt_stddev_samp_order_by": {
            "amountRaw": [
                354
            ],
            "timestamp": [
                354
            ],
            "__typename": [
                281
            ]
        },
        "FeeSplitterReceipt_stream_cursor_input": {
            "initial_value": [
                49
            ],
            "ordering": [
                344
            ],
            "__typename": [
                281
            ]
        },
        "FeeSplitterReceipt_stream_cursor_value_input": {
            "amountFormatted": [
                281
            ],
            "amountRaw": [
                352
            ],
            "id": [
                281
            ],
            "market_id": [
                281
            ],
            "sender": [
                281
            ],
            "timestamp": [
                352
            ],
            "token_id": [
                281
            ],
            "transactionHash": [
                281
            ],
            "treasury_id": [
                281
            ],
            "__typename": [
                281
            ]
        },
        "FeeSplitterReceipt_sum_order_by": {
            "amountRaw": [
                354
            ],
            "timestamp": [
                354
            ],
            "__typename": [
                281
            ]
        },
        "FeeSplitterReceipt_var_pop_order_by": {
            "amountRaw": [
                354
            ],
            "timestamp": [
                354
            ],
            "__typename": [
                281
            ]
        },
        "FeeSplitterReceipt_var_samp_order_by": {
            "amountRaw": [
                354
            ],
            "timestamp": [
                354
            ],
            "__typename": [
                281
            ]
        },
        "FeeSplitterReceipt_variance_order_by": {
            "amountRaw": [
                354
            ],
            "timestamp": [
                354
            ],
            "__typename": [
                281
            ]
        },
        "FloorElevation": {
            "deployedAmountFormatted": [
                281
            ],
            "deployedAmountRaw": [
                352
            ],
            "id": [
                281
            ],
            "market_id": [
                281
            ],
            "newFloorPriceFormatted": [
                281
            ],
            "newFloorPriceRaw": [
                352
            ],
            "oldFloorPriceFormatted": [
                281
            ],
            "oldFloorPriceRaw": [
                352
            ],
            "timestamp": [
                352
            ],
            "transactionHash": [
                281
            ],
            "__typename": [
                281
            ]
        },
        "FloorElevation_aggregate_order_by": {
            "avg": [
                56
            ],
            "count": [
                354
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
                281
            ]
        },
        "FloorElevation_avg_order_by": {
            "deployedAmountRaw": [
                354
            ],
            "newFloorPriceRaw": [
                354
            ],
            "oldFloorPriceRaw": [
                354
            ],
            "timestamp": [
                354
            ],
            "__typename": [
                281
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
                283
            ],
            "deployedAmountRaw": [
                353
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
                353
            ],
            "oldFloorPriceFormatted": [
                283
            ],
            "oldFloorPriceRaw": [
                353
            ],
            "timestamp": [
                353
            ],
            "transactionHash": [
                283
            ],
            "__typename": [
                281
            ]
        },
        "FloorElevation_max_order_by": {
            "deployedAmountFormatted": [
                354
            ],
            "deployedAmountRaw": [
                354
            ],
            "id": [
                354
            ],
            "market_id": [
                354
            ],
            "newFloorPriceFormatted": [
                354
            ],
            "newFloorPriceRaw": [
                354
            ],
            "oldFloorPriceFormatted": [
                354
            ],
            "oldFloorPriceRaw": [
                354
            ],
            "timestamp": [
                354
            ],
            "transactionHash": [
                354
            ],
            "__typename": [
                281
            ]
        },
        "FloorElevation_min_order_by": {
            "deployedAmountFormatted": [
                354
            ],
            "deployedAmountRaw": [
                354
            ],
            "id": [
                354
            ],
            "market_id": [
                354
            ],
            "newFloorPriceFormatted": [
                354
            ],
            "newFloorPriceRaw": [
                354
            ],
            "oldFloorPriceFormatted": [
                354
            ],
            "oldFloorPriceRaw": [
                354
            ],
            "timestamp": [
                354
            ],
            "transactionHash": [
                354
            ],
            "__typename": [
                281
            ]
        },
        "FloorElevation_order_by": {
            "deployedAmountFormatted": [
                354
            ],
            "deployedAmountRaw": [
                354
            ],
            "id": [
                354
            ],
            "market_id": [
                354
            ],
            "newFloorPriceFormatted": [
                354
            ],
            "newFloorPriceRaw": [
                354
            ],
            "oldFloorPriceFormatted": [
                354
            ],
            "oldFloorPriceRaw": [
                354
            ],
            "timestamp": [
                354
            ],
            "transactionHash": [
                354
            ],
            "__typename": [
                281
            ]
        },
        "FloorElevation_select_column": {},
        "FloorElevation_stddev_order_by": {
            "deployedAmountRaw": [
                354
            ],
            "newFloorPriceRaw": [
                354
            ],
            "oldFloorPriceRaw": [
                354
            ],
            "timestamp": [
                354
            ],
            "__typename": [
                281
            ]
        },
        "FloorElevation_stddev_pop_order_by": {
            "deployedAmountRaw": [
                354
            ],
            "newFloorPriceRaw": [
                354
            ],
            "oldFloorPriceRaw": [
                354
            ],
            "timestamp": [
                354
            ],
            "__typename": [
                281
            ]
        },
        "FloorElevation_stddev_samp_order_by": {
            "deployedAmountRaw": [
                354
            ],
            "newFloorPriceRaw": [
                354
            ],
            "oldFloorPriceRaw": [
                354
            ],
            "timestamp": [
                354
            ],
            "__typename": [
                281
            ]
        },
        "FloorElevation_stream_cursor_input": {
            "initial_value": [
                66
            ],
            "ordering": [
                344
            ],
            "__typename": [
                281
            ]
        },
        "FloorElevation_stream_cursor_value_input": {
            "deployedAmountFormatted": [
                281
            ],
            "deployedAmountRaw": [
                352
            ],
            "id": [
                281
            ],
            "market_id": [
                281
            ],
            "newFloorPriceFormatted": [
                281
            ],
            "newFloorPriceRaw": [
                352
            ],
            "oldFloorPriceFormatted": [
                281
            ],
            "oldFloorPriceRaw": [
                352
            ],
            "timestamp": [
                352
            ],
            "transactionHash": [
                281
            ],
            "__typename": [
                281
            ]
        },
        "FloorElevation_sum_order_by": {
            "deployedAmountRaw": [
                354
            ],
            "newFloorPriceRaw": [
                354
            ],
            "oldFloorPriceRaw": [
                354
            ],
            "timestamp": [
                354
            ],
            "__typename": [
                281
            ]
        },
        "FloorElevation_var_pop_order_by": {
            "deployedAmountRaw": [
                354
            ],
            "newFloorPriceRaw": [
                354
            ],
            "oldFloorPriceRaw": [
                354
            ],
            "timestamp": [
                354
            ],
            "__typename": [
                281
            ]
        },
        "FloorElevation_var_samp_order_by": {
            "deployedAmountRaw": [
                354
            ],
            "newFloorPriceRaw": [
                354
            ],
            "oldFloorPriceRaw": [
                354
            ],
            "timestamp": [
                354
            ],
            "__typename": [
                281
            ]
        },
        "FloorElevation_variance_order_by": {
            "deployedAmountRaw": [
                354
            ],
            "newFloorPriceRaw": [
                354
            ],
            "oldFloorPriceRaw": [
                354
            ],
            "timestamp": [
                354
            ],
            "__typename": [
                281
            ]
        },
        "GlobalRegistry": {
            "createdAt": [
                352
            ],
            "floorFactoryAddress": [
                281
            ],
            "id": [
                281
            ],
            "lastUpdatedAt": [
                352
            ],
            "moduleFactoryAddress": [
                281
            ],
            "__typename": [
                281
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
                353
            ],
            "floorFactoryAddress": [
                283
            ],
            "id": [
                283
            ],
            "lastUpdatedAt": [
                353
            ],
            "moduleFactoryAddress": [
                283
            ],
            "__typename": [
                281
            ]
        },
        "GlobalRegistry_order_by": {
            "createdAt": [
                354
            ],
            "floorFactoryAddress": [
                354
            ],
            "id": [
                354
            ],
            "lastUpdatedAt": [
                354
            ],
            "moduleFactoryAddress": [
                354
            ],
            "__typename": [
                281
            ]
        },
        "GlobalRegistry_select_column": {},
        "GlobalRegistry_stream_cursor_input": {
            "initial_value": [
                76
            ],
            "ordering": [
                344
            ],
            "__typename": [
                281
            ]
        },
        "GlobalRegistry_stream_cursor_value_input": {
            "createdAt": [
                352
            ],
            "floorFactoryAddress": [
                281
            ],
            "id": [
                281
            ],
            "lastUpdatedAt": [
                352
            ],
            "moduleFactoryAddress": [
                281
            ],
            "__typename": [
                281
            ]
        },
        "GlobalStats": {
            "activeMarkets": [
                352
            ],
            "id": [
                281
            ],
            "lastUpdatedAt": [
                352
            ],
            "totalLockedCollateralFormatted": [
                281
            ],
            "totalLockedCollateralRaw": [
                352
            ],
            "totalMarkets": [
                352
            ],
            "totalOutstandingDebtFormatted": [
                281
            ],
            "totalOutstandingDebtRaw": [
                352
            ],
            "totalVolumeFormatted": [
                281
            ],
            "totalVolumeRaw": [
                352
            ],
            "__typename": [
                281
            ]
        },
        "GlobalStats_bool_exp": {
            "_and": [
                78
            ],
            "_not": [
                78
            ],
            "_or": [
                78
            ],
            "activeMarkets": [
                353
            ],
            "id": [
                283
            ],
            "lastUpdatedAt": [
                353
            ],
            "totalLockedCollateralFormatted": [
                283
            ],
            "totalLockedCollateralRaw": [
                353
            ],
            "totalMarkets": [
                353
            ],
            "totalOutstandingDebtFormatted": [
                283
            ],
            "totalOutstandingDebtRaw": [
                353
            ],
            "totalVolumeFormatted": [
                283
            ],
            "totalVolumeRaw": [
                353
            ],
            "__typename": [
                281
            ]
        },
        "GlobalStats_order_by": {
            "activeMarkets": [
                354
            ],
            "id": [
                354
            ],
            "lastUpdatedAt": [
                354
            ],
            "totalLockedCollateralFormatted": [
                354
            ],
            "totalLockedCollateralRaw": [
                354
            ],
            "totalMarkets": [
                354
            ],
            "totalOutstandingDebtFormatted": [
                354
            ],
            "totalOutstandingDebtRaw": [
                354
            ],
            "totalVolumeFormatted": [
                354
            ],
            "totalVolumeRaw": [
                354
            ],
            "__typename": [
                281
            ]
        },
        "GlobalStats_select_column": {},
        "GlobalStats_stream_cursor_input": {
            "initial_value": [
                82
            ],
            "ordering": [
                344
            ],
            "__typename": [
                281
            ]
        },
        "GlobalStats_stream_cursor_value_input": {
            "activeMarkets": [
                352
            ],
            "id": [
                281
            ],
            "lastUpdatedAt": [
                352
            ],
            "totalLockedCollateralFormatted": [
                281
            ],
            "totalLockedCollateralRaw": [
                352
            ],
            "totalMarkets": [
                352
            ],
            "totalOutstandingDebtFormatted": [
                281
            ],
            "totalOutstandingDebtRaw": [
                352
            ],
            "totalVolumeFormatted": [
                281
            ],
            "totalVolumeRaw": [
                352
            ],
            "__typename": [
                281
            ]
        },
        "Int": {},
        "Int_array_comparison_exp": {
            "_contained_in": [
                83
            ],
            "_contains": [
                83
            ],
            "_eq": [
                83
            ],
            "_gt": [
                83
            ],
            "_gte": [
                83
            ],
            "_in": [
                83
            ],
            "_is_null": [
                12
            ],
            "_lt": [
                83
            ],
            "_lte": [
                83
            ],
            "_neq": [
                83
            ],
            "_nin": [
                83
            ],
            "__typename": [
                281
            ]
        },
        "Int_comparison_exp": {
            "_eq": [
                83
            ],
            "_gt": [
                83
            ],
            "_gte": [
                83
            ],
            "_in": [
                83
            ],
            "_is_null": [
                12
            ],
            "_lt": [
                83
            ],
            "_lte": [
                83
            ],
            "_neq": [
                83
            ],
            "_nin": [
                83
            ],
            "__typename": [
                281
            ]
        },
        "Loan": {
            "borrowAmountFormatted": [
                281
            ],
            "borrowAmountRaw": [
                352
            ],
            "borrower_id": [
                281
            ],
            "closedAt": [
                352
            ],
            "facility_id": [
                281
            ],
            "floorPriceAtBorrowFormatted": [
                281
            ],
            "floorPriceAtBorrowRaw": [
                352
            ],
            "id": [
                281
            ],
            "lastUpdatedAt": [
                352
            ],
            "lockedCollateralFormatted": [
                281
            ],
            "lockedCollateralRaw": [
                352
            ],
            "market_id": [
                281
            ],
            "openedAt": [
                352
            ],
            "originationFeeFormatted": [
                281
            ],
            "originationFeeRaw": [
                352
            ],
            "remainingDebtFormatted": [
                281
            ],
            "remainingDebtRaw": [
                352
            ],
            "status": [
                348
            ],
            "statusHistory": [
                87,
                {
                    "distinct_on": [
                        94,
                        "[LoanStatusHistory_select_column!]"
                    ],
                    "limit": [
                        83
                    ],
                    "offset": [
                        83
                    ],
                    "order_by": [
                        93,
                        "[LoanStatusHistory_order_by!]"
                    ],
                    "where": [
                        90
                    ]
                }
            ],
            "transactionHash": [
                281
            ],
            "__typename": [
                281
            ]
        },
        "LoanStatusHistory": {
            "id": [
                281
            ],
            "loan_id": [
                281
            ],
            "lockedCollateralFormatted": [
                281
            ],
            "lockedCollateralRaw": [
                352
            ],
            "remainingDebtFormatted": [
                281
            ],
            "remainingDebtRaw": [
                352
            ],
            "status": [
                348
            ],
            "timestamp": [
                352
            ],
            "transactionHash": [
                281
            ],
            "__typename": [
                281
            ]
        },
        "LoanStatusHistory_aggregate_order_by": {
            "avg": [
                89
            ],
            "count": [
                354
            ],
            "max": [
                91
            ],
            "min": [
                92
            ],
            "stddev": [
                95
            ],
            "stddev_pop": [
                96
            ],
            "stddev_samp": [
                97
            ],
            "sum": [
                100
            ],
            "var_pop": [
                101
            ],
            "var_samp": [
                102
            ],
            "variance": [
                103
            ],
            "__typename": [
                281
            ]
        },
        "LoanStatusHistory_avg_order_by": {
            "lockedCollateralRaw": [
                354
            ],
            "remainingDebtRaw": [
                354
            ],
            "timestamp": [
                354
            ],
            "__typename": [
                281
            ]
        },
        "LoanStatusHistory_bool_exp": {
            "_and": [
                90
            ],
            "_not": [
                90
            ],
            "_or": [
                90
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
                353
            ],
            "remainingDebtFormatted": [
                283
            ],
            "remainingDebtRaw": [
                353
            ],
            "status": [
                349
            ],
            "timestamp": [
                353
            ],
            "transactionHash": [
                283
            ],
            "__typename": [
                281
            ]
        },
        "LoanStatusHistory_max_order_by": {
            "id": [
                354
            ],
            "loan_id": [
                354
            ],
            "lockedCollateralFormatted": [
                354
            ],
            "lockedCollateralRaw": [
                354
            ],
            "remainingDebtFormatted": [
                354
            ],
            "remainingDebtRaw": [
                354
            ],
            "status": [
                354
            ],
            "timestamp": [
                354
            ],
            "transactionHash": [
                354
            ],
            "__typename": [
                281
            ]
        },
        "LoanStatusHistory_min_order_by": {
            "id": [
                354
            ],
            "loan_id": [
                354
            ],
            "lockedCollateralFormatted": [
                354
            ],
            "lockedCollateralRaw": [
                354
            ],
            "remainingDebtFormatted": [
                354
            ],
            "remainingDebtRaw": [
                354
            ],
            "status": [
                354
            ],
            "timestamp": [
                354
            ],
            "transactionHash": [
                354
            ],
            "__typename": [
                281
            ]
        },
        "LoanStatusHistory_order_by": {
            "id": [
                354
            ],
            "loan_id": [
                354
            ],
            "lockedCollateralFormatted": [
                354
            ],
            "lockedCollateralRaw": [
                354
            ],
            "remainingDebtFormatted": [
                354
            ],
            "remainingDebtRaw": [
                354
            ],
            "status": [
                354
            ],
            "timestamp": [
                354
            ],
            "transactionHash": [
                354
            ],
            "__typename": [
                281
            ]
        },
        "LoanStatusHistory_select_column": {},
        "LoanStatusHistory_stddev_order_by": {
            "lockedCollateralRaw": [
                354
            ],
            "remainingDebtRaw": [
                354
            ],
            "timestamp": [
                354
            ],
            "__typename": [
                281
            ]
        },
        "LoanStatusHistory_stddev_pop_order_by": {
            "lockedCollateralRaw": [
                354
            ],
            "remainingDebtRaw": [
                354
            ],
            "timestamp": [
                354
            ],
            "__typename": [
                281
            ]
        },
        "LoanStatusHistory_stddev_samp_order_by": {
            "lockedCollateralRaw": [
                354
            ],
            "remainingDebtRaw": [
                354
            ],
            "timestamp": [
                354
            ],
            "__typename": [
                281
            ]
        },
        "LoanStatusHistory_stream_cursor_input": {
            "initial_value": [
                99
            ],
            "ordering": [
                344
            ],
            "__typename": [
                281
            ]
        },
        "LoanStatusHistory_stream_cursor_value_input": {
            "id": [
                281
            ],
            "loan_id": [
                281
            ],
            "lockedCollateralFormatted": [
                281
            ],
            "lockedCollateralRaw": [
                352
            ],
            "remainingDebtFormatted": [
                281
            ],
            "remainingDebtRaw": [
                352
            ],
            "status": [
                348
            ],
            "timestamp": [
                352
            ],
            "transactionHash": [
                281
            ],
            "__typename": [
                281
            ]
        },
        "LoanStatusHistory_sum_order_by": {
            "lockedCollateralRaw": [
                354
            ],
            "remainingDebtRaw": [
                354
            ],
            "timestamp": [
                354
            ],
            "__typename": [
                281
            ]
        },
        "LoanStatusHistory_var_pop_order_by": {
            "lockedCollateralRaw": [
                354
            ],
            "remainingDebtRaw": [
                354
            ],
            "timestamp": [
                354
            ],
            "__typename": [
                281
            ]
        },
        "LoanStatusHistory_var_samp_order_by": {
            "lockedCollateralRaw": [
                354
            ],
            "remainingDebtRaw": [
                354
            ],
            "timestamp": [
                354
            ],
            "__typename": [
                281
            ]
        },
        "LoanStatusHistory_variance_order_by": {
            "lockedCollateralRaw": [
                354
            ],
            "remainingDebtRaw": [
                354
            ],
            "timestamp": [
                354
            ],
            "__typename": [
                281
            ]
        },
        "Loan_aggregate_order_by": {
            "avg": [
                105
            ],
            "count": [
                354
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
                281
            ]
        },
        "Loan_avg_order_by": {
            "borrowAmountRaw": [
                354
            ],
            "closedAt": [
                354
            ],
            "floorPriceAtBorrowRaw": [
                354
            ],
            "lastUpdatedAt": [
                354
            ],
            "lockedCollateralRaw": [
                354
            ],
            "openedAt": [
                354
            ],
            "originationFeeRaw": [
                354
            ],
            "remainingDebtRaw": [
                354
            ],
            "__typename": [
                281
            ]
        },
        "Loan_bool_exp": {
            "_and": [
                106
            ],
            "_not": [
                106
            ],
            "_or": [
                106
            ],
            "borrowAmountFormatted": [
                283
            ],
            "borrowAmountRaw": [
                353
            ],
            "borrower_id": [
                283
            ],
            "closedAt": [
                353
            ],
            "facility_id": [
                283
            ],
            "floorPriceAtBorrowFormatted": [
                283
            ],
            "floorPriceAtBorrowRaw": [
                353
            ],
            "id": [
                283
            ],
            "lastUpdatedAt": [
                353
            ],
            "lockedCollateralFormatted": [
                283
            ],
            "lockedCollateralRaw": [
                353
            ],
            "market_id": [
                283
            ],
            "openedAt": [
                353
            ],
            "originationFeeFormatted": [
                283
            ],
            "originationFeeRaw": [
                353
            ],
            "remainingDebtFormatted": [
                283
            ],
            "remainingDebtRaw": [
                353
            ],
            "status": [
                349
            ],
            "statusHistory": [
                90
            ],
            "transactionHash": [
                283
            ],
            "__typename": [
                281
            ]
        },
        "Loan_max_order_by": {
            "borrowAmountFormatted": [
                354
            ],
            "borrowAmountRaw": [
                354
            ],
            "borrower_id": [
                354
            ],
            "closedAt": [
                354
            ],
            "facility_id": [
                354
            ],
            "floorPriceAtBorrowFormatted": [
                354
            ],
            "floorPriceAtBorrowRaw": [
                354
            ],
            "id": [
                354
            ],
            "lastUpdatedAt": [
                354
            ],
            "lockedCollateralFormatted": [
                354
            ],
            "lockedCollateralRaw": [
                354
            ],
            "market_id": [
                354
            ],
            "openedAt": [
                354
            ],
            "originationFeeFormatted": [
                354
            ],
            "originationFeeRaw": [
                354
            ],
            "remainingDebtFormatted": [
                354
            ],
            "remainingDebtRaw": [
                354
            ],
            "status": [
                354
            ],
            "transactionHash": [
                354
            ],
            "__typename": [
                281
            ]
        },
        "Loan_min_order_by": {
            "borrowAmountFormatted": [
                354
            ],
            "borrowAmountRaw": [
                354
            ],
            "borrower_id": [
                354
            ],
            "closedAt": [
                354
            ],
            "facility_id": [
                354
            ],
            "floorPriceAtBorrowFormatted": [
                354
            ],
            "floorPriceAtBorrowRaw": [
                354
            ],
            "id": [
                354
            ],
            "lastUpdatedAt": [
                354
            ],
            "lockedCollateralFormatted": [
                354
            ],
            "lockedCollateralRaw": [
                354
            ],
            "market_id": [
                354
            ],
            "openedAt": [
                354
            ],
            "originationFeeFormatted": [
                354
            ],
            "originationFeeRaw": [
                354
            ],
            "remainingDebtFormatted": [
                354
            ],
            "remainingDebtRaw": [
                354
            ],
            "status": [
                354
            ],
            "transactionHash": [
                354
            ],
            "__typename": [
                281
            ]
        },
        "Loan_order_by": {
            "borrowAmountFormatted": [
                354
            ],
            "borrowAmountRaw": [
                354
            ],
            "borrower_id": [
                354
            ],
            "closedAt": [
                354
            ],
            "facility_id": [
                354
            ],
            "floorPriceAtBorrowFormatted": [
                354
            ],
            "floorPriceAtBorrowRaw": [
                354
            ],
            "id": [
                354
            ],
            "lastUpdatedAt": [
                354
            ],
            "lockedCollateralFormatted": [
                354
            ],
            "lockedCollateralRaw": [
                354
            ],
            "market_id": [
                354
            ],
            "openedAt": [
                354
            ],
            "originationFeeFormatted": [
                354
            ],
            "originationFeeRaw": [
                354
            ],
            "remainingDebtFormatted": [
                354
            ],
            "remainingDebtRaw": [
                354
            ],
            "status": [
                354
            ],
            "statusHistory_aggregate": [
                88
            ],
            "transactionHash": [
                354
            ],
            "__typename": [
                281
            ]
        },
        "Loan_select_column": {},
        "Loan_stddev_order_by": {
            "borrowAmountRaw": [
                354
            ],
            "closedAt": [
                354
            ],
            "floorPriceAtBorrowRaw": [
                354
            ],
            "lastUpdatedAt": [
                354
            ],
            "lockedCollateralRaw": [
                354
            ],
            "openedAt": [
                354
            ],
            "originationFeeRaw": [
                354
            ],
            "remainingDebtRaw": [
                354
            ],
            "__typename": [
                281
            ]
        },
        "Loan_stddev_pop_order_by": {
            "borrowAmountRaw": [
                354
            ],
            "closedAt": [
                354
            ],
            "floorPriceAtBorrowRaw": [
                354
            ],
            "lastUpdatedAt": [
                354
            ],
            "lockedCollateralRaw": [
                354
            ],
            "openedAt": [
                354
            ],
            "originationFeeRaw": [
                354
            ],
            "remainingDebtRaw": [
                354
            ],
            "__typename": [
                281
            ]
        },
        "Loan_stddev_samp_order_by": {
            "borrowAmountRaw": [
                354
            ],
            "closedAt": [
                354
            ],
            "floorPriceAtBorrowRaw": [
                354
            ],
            "lastUpdatedAt": [
                354
            ],
            "lockedCollateralRaw": [
                354
            ],
            "openedAt": [
                354
            ],
            "originationFeeRaw": [
                354
            ],
            "remainingDebtRaw": [
                354
            ],
            "__typename": [
                281
            ]
        },
        "Loan_stream_cursor_input": {
            "initial_value": [
                115
            ],
            "ordering": [
                344
            ],
            "__typename": [
                281
            ]
        },
        "Loan_stream_cursor_value_input": {
            "borrowAmountFormatted": [
                281
            ],
            "borrowAmountRaw": [
                352
            ],
            "borrower_id": [
                281
            ],
            "closedAt": [
                352
            ],
            "facility_id": [
                281
            ],
            "floorPriceAtBorrowFormatted": [
                281
            ],
            "floorPriceAtBorrowRaw": [
                352
            ],
            "id": [
                281
            ],
            "lastUpdatedAt": [
                352
            ],
            "lockedCollateralFormatted": [
                281
            ],
            "lockedCollateralRaw": [
                352
            ],
            "market_id": [
                281
            ],
            "openedAt": [
                352
            ],
            "originationFeeFormatted": [
                281
            ],
            "originationFeeRaw": [
                352
            ],
            "remainingDebtFormatted": [
                281
            ],
            "remainingDebtRaw": [
                352
            ],
            "status": [
                348
            ],
            "transactionHash": [
                281
            ],
            "__typename": [
                281
            ]
        },
        "Loan_sum_order_by": {
            "borrowAmountRaw": [
                354
            ],
            "closedAt": [
                354
            ],
            "floorPriceAtBorrowRaw": [
                354
            ],
            "lastUpdatedAt": [
                354
            ],
            "lockedCollateralRaw": [
                354
            ],
            "openedAt": [
                354
            ],
            "originationFeeRaw": [
                354
            ],
            "remainingDebtRaw": [
                354
            ],
            "__typename": [
                281
            ]
        },
        "Loan_var_pop_order_by": {
            "borrowAmountRaw": [
                354
            ],
            "closedAt": [
                354
            ],
            "floorPriceAtBorrowRaw": [
                354
            ],
            "lastUpdatedAt": [
                354
            ],
            "lockedCollateralRaw": [
                354
            ],
            "openedAt": [
                354
            ],
            "originationFeeRaw": [
                354
            ],
            "remainingDebtRaw": [
                354
            ],
            "__typename": [
                281
            ]
        },
        "Loan_var_samp_order_by": {
            "borrowAmountRaw": [
                354
            ],
            "closedAt": [
                354
            ],
            "floorPriceAtBorrowRaw": [
                354
            ],
            "lastUpdatedAt": [
                354
            ],
            "lockedCollateralRaw": [
                354
            ],
            "openedAt": [
                354
            ],
            "originationFeeRaw": [
                354
            ],
            "remainingDebtRaw": [
                354
            ],
            "__typename": [
                281
            ]
        },
        "Loan_variance_order_by": {
            "borrowAmountRaw": [
                354
            ],
            "closedAt": [
                354
            ],
            "floorPriceAtBorrowRaw": [
                354
            ],
            "lastUpdatedAt": [
                354
            ],
            "lockedCollateralRaw": [
                354
            ],
            "openedAt": [
                354
            ],
            "originationFeeRaw": [
                354
            ],
            "remainingDebtRaw": [
                354
            ],
            "__typename": [
                281
            ]
        },
        "Market": {
            "buyFeeBps": [
                352
            ],
            "createdAt": [
                352
            ],
            "creator_id": [
                281
            ],
            "currentPriceFormatted": [
                281
            ],
            "currentPriceRaw": [
                352
            ],
            "factory_id": [
                281
            ],
            "floorElevations": [
                54,
                {
                    "distinct_on": [
                        61,
                        "[FloorElevation_select_column!]"
                    ],
                    "limit": [
                        83
                    ],
                    "offset": [
                        83
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
                281
            ],
            "floorPriceRaw": [
                352
            ],
            "floorSupplyFormatted": [
                281
            ],
            "floorSupplyRaw": [
                352
            ],
            "id": [
                281
            ],
            "initialFloorPriceFormatted": [
                281
            ],
            "initialFloorPriceRaw": [
                352
            ],
            "isBuyOpen": [
                12
            ],
            "isSellOpen": [
                12
            ],
            "issuanceToken": [
                284
            ],
            "issuanceToken_id": [
                281
            ],
            "lastElevationTimestamp": [
                352
            ],
            "lastTradeTimestamp": [
                352
            ],
            "lastUpdatedAt": [
                352
            ],
            "marketSupplyFormatted": [
                281
            ],
            "marketSupplyRaw": [
                352
            ],
            "maxLTV": [
                352
            ],
            "reserveToken": [
                284
            ],
            "reserveToken_id": [
                281
            ],
            "sellFeeBps": [
                352
            ],
            "status": [
                350
            ],
            "totalSupplyFormatted": [
                281
            ],
            "totalSupplyRaw": [
                352
            ],
            "trades": [
                290,
                {
                    "distinct_on": [
                        297,
                        "[Trade_select_column!]"
                    ],
                    "limit": [
                        83
                    ],
                    "offset": [
                        83
                    ],
                    "order_by": [
                        296,
                        "[Trade_order_by!]"
                    ],
                    "where": [
                        293
                    ]
                }
            ],
            "tradingFeeBps": [
                352
            ],
            "__typename": [
                281
            ]
        },
        "MarketRollingStats": {
            "averagePriceFormatted": [
                281
            ],
            "averagePriceRaw": [
                352
            ],
            "id": [
                281
            ],
            "lastUpdatedAt": [
                352
            ],
            "market_id": [
                281
            ],
            "tradeCount": [
                352
            ],
            "volumeFormatted": [
                281
            ],
            "volumeRaw": [
                352
            ],
            "windowSeconds": [
                83
            ],
            "__typename": [
                281
            ]
        },
        "MarketRollingStats_bool_exp": {
            "_and": [
                122
            ],
            "_not": [
                122
            ],
            "_or": [
                122
            ],
            "averagePriceFormatted": [
                283
            ],
            "averagePriceRaw": [
                353
            ],
            "id": [
                283
            ],
            "lastUpdatedAt": [
                353
            ],
            "market_id": [
                283
            ],
            "tradeCount": [
                353
            ],
            "volumeFormatted": [
                283
            ],
            "volumeRaw": [
                353
            ],
            "windowSeconds": [
                85
            ],
            "__typename": [
                281
            ]
        },
        "MarketRollingStats_order_by": {
            "averagePriceFormatted": [
                354
            ],
            "averagePriceRaw": [
                354
            ],
            "id": [
                354
            ],
            "lastUpdatedAt": [
                354
            ],
            "market_id": [
                354
            ],
            "tradeCount": [
                354
            ],
            "volumeFormatted": [
                354
            ],
            "volumeRaw": [
                354
            ],
            "windowSeconds": [
                354
            ],
            "__typename": [
                281
            ]
        },
        "MarketRollingStats_select_column": {},
        "MarketRollingStats_stream_cursor_input": {
            "initial_value": [
                126
            ],
            "ordering": [
                344
            ],
            "__typename": [
                281
            ]
        },
        "MarketRollingStats_stream_cursor_value_input": {
            "averagePriceFormatted": [
                281
            ],
            "averagePriceRaw": [
                352
            ],
            "id": [
                281
            ],
            "lastUpdatedAt": [
                352
            ],
            "market_id": [
                281
            ],
            "tradeCount": [
                352
            ],
            "volumeFormatted": [
                281
            ],
            "volumeRaw": [
                352
            ],
            "windowSeconds": [
                83
            ],
            "__typename": [
                281
            ]
        },
        "MarketSnapshot": {
            "floorPriceFormatted": [
                281
            ],
            "floorPriceRaw": [
                352
            ],
            "id": [
                281
            ],
            "marketSupplyFormatted": [
                281
            ],
            "marketSupplyRaw": [
                352
            ],
            "market_id": [
                281
            ],
            "priceFormatted": [
                281
            ],
            "priceRaw": [
                352
            ],
            "timestamp": [
                352
            ],
            "totalSupplyFormatted": [
                281
            ],
            "totalSupplyRaw": [
                352
            ],
            "trades24h": [
                352
            ],
            "volume24hFormatted": [
                281
            ],
            "volume24hRaw": [
                352
            ],
            "__typename": [
                281
            ]
        },
        "MarketSnapshot_bool_exp": {
            "_and": [
                128
            ],
            "_not": [
                128
            ],
            "_or": [
                128
            ],
            "floorPriceFormatted": [
                283
            ],
            "floorPriceRaw": [
                353
            ],
            "id": [
                283
            ],
            "marketSupplyFormatted": [
                283
            ],
            "marketSupplyRaw": [
                353
            ],
            "market_id": [
                283
            ],
            "priceFormatted": [
                283
            ],
            "priceRaw": [
                353
            ],
            "timestamp": [
                353
            ],
            "totalSupplyFormatted": [
                283
            ],
            "totalSupplyRaw": [
                353
            ],
            "trades24h": [
                353
            ],
            "volume24hFormatted": [
                283
            ],
            "volume24hRaw": [
                353
            ],
            "__typename": [
                281
            ]
        },
        "MarketSnapshot_order_by": {
            "floorPriceFormatted": [
                354
            ],
            "floorPriceRaw": [
                354
            ],
            "id": [
                354
            ],
            "marketSupplyFormatted": [
                354
            ],
            "marketSupplyRaw": [
                354
            ],
            "market_id": [
                354
            ],
            "priceFormatted": [
                354
            ],
            "priceRaw": [
                354
            ],
            "timestamp": [
                354
            ],
            "totalSupplyFormatted": [
                354
            ],
            "totalSupplyRaw": [
                354
            ],
            "trades24h": [
                354
            ],
            "volume24hFormatted": [
                354
            ],
            "volume24hRaw": [
                354
            ],
            "__typename": [
                281
            ]
        },
        "MarketSnapshot_select_column": {},
        "MarketSnapshot_stream_cursor_input": {
            "initial_value": [
                132
            ],
            "ordering": [
                344
            ],
            "__typename": [
                281
            ]
        },
        "MarketSnapshot_stream_cursor_value_input": {
            "floorPriceFormatted": [
                281
            ],
            "floorPriceRaw": [
                352
            ],
            "id": [
                281
            ],
            "marketSupplyFormatted": [
                281
            ],
            "marketSupplyRaw": [
                352
            ],
            "market_id": [
                281
            ],
            "priceFormatted": [
                281
            ],
            "priceRaw": [
                352
            ],
            "timestamp": [
                352
            ],
            "totalSupplyFormatted": [
                281
            ],
            "totalSupplyRaw": [
                352
            ],
            "trades24h": [
                352
            ],
            "volume24hFormatted": [
                281
            ],
            "volume24hRaw": [
                352
            ],
            "__typename": [
                281
            ]
        },
        "Market_aggregate_order_by": {
            "avg": [
                134
            ],
            "count": [
                354
            ],
            "max": [
                136
            ],
            "min": [
                137
            ],
            "stddev": [
                140
            ],
            "stddev_pop": [
                141
            ],
            "stddev_samp": [
                142
            ],
            "sum": [
                145
            ],
            "var_pop": [
                146
            ],
            "var_samp": [
                147
            ],
            "variance": [
                148
            ],
            "__typename": [
                281
            ]
        },
        "Market_avg_order_by": {
            "buyFeeBps": [
                354
            ],
            "createdAt": [
                354
            ],
            "currentPriceRaw": [
                354
            ],
            "floorPriceRaw": [
                354
            ],
            "floorSupplyRaw": [
                354
            ],
            "initialFloorPriceRaw": [
                354
            ],
            "lastElevationTimestamp": [
                354
            ],
            "lastTradeTimestamp": [
                354
            ],
            "lastUpdatedAt": [
                354
            ],
            "marketSupplyRaw": [
                354
            ],
            "maxLTV": [
                354
            ],
            "sellFeeBps": [
                354
            ],
            "totalSupplyRaw": [
                354
            ],
            "tradingFeeBps": [
                354
            ],
            "__typename": [
                281
            ]
        },
        "Market_bool_exp": {
            "_and": [
                135
            ],
            "_not": [
                135
            ],
            "_or": [
                135
            ],
            "buyFeeBps": [
                353
            ],
            "createdAt": [
                353
            ],
            "creator_id": [
                283
            ],
            "currentPriceFormatted": [
                283
            ],
            "currentPriceRaw": [
                353
            ],
            "factory_id": [
                283
            ],
            "floorElevations": [
                57
            ],
            "floorPriceFormatted": [
                283
            ],
            "floorPriceRaw": [
                353
            ],
            "floorSupplyFormatted": [
                283
            ],
            "floorSupplyRaw": [
                353
            ],
            "id": [
                283
            ],
            "initialFloorPriceFormatted": [
                283
            ],
            "initialFloorPriceRaw": [
                353
            ],
            "isBuyOpen": [
                13
            ],
            "isSellOpen": [
                13
            ],
            "issuanceToken": [
                285
            ],
            "issuanceToken_id": [
                283
            ],
            "lastElevationTimestamp": [
                353
            ],
            "lastTradeTimestamp": [
                353
            ],
            "lastUpdatedAt": [
                353
            ],
            "marketSupplyFormatted": [
                283
            ],
            "marketSupplyRaw": [
                353
            ],
            "maxLTV": [
                353
            ],
            "reserveToken": [
                285
            ],
            "reserveToken_id": [
                283
            ],
            "sellFeeBps": [
                353
            ],
            "status": [
                351
            ],
            "totalSupplyFormatted": [
                283
            ],
            "totalSupplyRaw": [
                353
            ],
            "trades": [
                293
            ],
            "tradingFeeBps": [
                353
            ],
            "__typename": [
                281
            ]
        },
        "Market_max_order_by": {
            "buyFeeBps": [
                354
            ],
            "createdAt": [
                354
            ],
            "creator_id": [
                354
            ],
            "currentPriceFormatted": [
                354
            ],
            "currentPriceRaw": [
                354
            ],
            "factory_id": [
                354
            ],
            "floorPriceFormatted": [
                354
            ],
            "floorPriceRaw": [
                354
            ],
            "floorSupplyFormatted": [
                354
            ],
            "floorSupplyRaw": [
                354
            ],
            "id": [
                354
            ],
            "initialFloorPriceFormatted": [
                354
            ],
            "initialFloorPriceRaw": [
                354
            ],
            "issuanceToken_id": [
                354
            ],
            "lastElevationTimestamp": [
                354
            ],
            "lastTradeTimestamp": [
                354
            ],
            "lastUpdatedAt": [
                354
            ],
            "marketSupplyFormatted": [
                354
            ],
            "marketSupplyRaw": [
                354
            ],
            "maxLTV": [
                354
            ],
            "reserveToken_id": [
                354
            ],
            "sellFeeBps": [
                354
            ],
            "status": [
                354
            ],
            "totalSupplyFormatted": [
                354
            ],
            "totalSupplyRaw": [
                354
            ],
            "tradingFeeBps": [
                354
            ],
            "__typename": [
                281
            ]
        },
        "Market_min_order_by": {
            "buyFeeBps": [
                354
            ],
            "createdAt": [
                354
            ],
            "creator_id": [
                354
            ],
            "currentPriceFormatted": [
                354
            ],
            "currentPriceRaw": [
                354
            ],
            "factory_id": [
                354
            ],
            "floorPriceFormatted": [
                354
            ],
            "floorPriceRaw": [
                354
            ],
            "floorSupplyFormatted": [
                354
            ],
            "floorSupplyRaw": [
                354
            ],
            "id": [
                354
            ],
            "initialFloorPriceFormatted": [
                354
            ],
            "initialFloorPriceRaw": [
                354
            ],
            "issuanceToken_id": [
                354
            ],
            "lastElevationTimestamp": [
                354
            ],
            "lastTradeTimestamp": [
                354
            ],
            "lastUpdatedAt": [
                354
            ],
            "marketSupplyFormatted": [
                354
            ],
            "marketSupplyRaw": [
                354
            ],
            "maxLTV": [
                354
            ],
            "reserveToken_id": [
                354
            ],
            "sellFeeBps": [
                354
            ],
            "status": [
                354
            ],
            "totalSupplyFormatted": [
                354
            ],
            "totalSupplyRaw": [
                354
            ],
            "tradingFeeBps": [
                354
            ],
            "__typename": [
                281
            ]
        },
        "Market_order_by": {
            "buyFeeBps": [
                354
            ],
            "createdAt": [
                354
            ],
            "creator_id": [
                354
            ],
            "currentPriceFormatted": [
                354
            ],
            "currentPriceRaw": [
                354
            ],
            "factory_id": [
                354
            ],
            "floorElevations_aggregate": [
                55
            ],
            "floorPriceFormatted": [
                354
            ],
            "floorPriceRaw": [
                354
            ],
            "floorSupplyFormatted": [
                354
            ],
            "floorSupplyRaw": [
                354
            ],
            "id": [
                354
            ],
            "initialFloorPriceFormatted": [
                354
            ],
            "initialFloorPriceRaw": [
                354
            ],
            "isBuyOpen": [
                354
            ],
            "isSellOpen": [
                354
            ],
            "issuanceToken": [
                286
            ],
            "issuanceToken_id": [
                354
            ],
            "lastElevationTimestamp": [
                354
            ],
            "lastTradeTimestamp": [
                354
            ],
            "lastUpdatedAt": [
                354
            ],
            "marketSupplyFormatted": [
                354
            ],
            "marketSupplyRaw": [
                354
            ],
            "maxLTV": [
                354
            ],
            "reserveToken": [
                286
            ],
            "reserveToken_id": [
                354
            ],
            "sellFeeBps": [
                354
            ],
            "status": [
                354
            ],
            "totalSupplyFormatted": [
                354
            ],
            "totalSupplyRaw": [
                354
            ],
            "trades_aggregate": [
                291
            ],
            "tradingFeeBps": [
                354
            ],
            "__typename": [
                281
            ]
        },
        "Market_select_column": {},
        "Market_stddev_order_by": {
            "buyFeeBps": [
                354
            ],
            "createdAt": [
                354
            ],
            "currentPriceRaw": [
                354
            ],
            "floorPriceRaw": [
                354
            ],
            "floorSupplyRaw": [
                354
            ],
            "initialFloorPriceRaw": [
                354
            ],
            "lastElevationTimestamp": [
                354
            ],
            "lastTradeTimestamp": [
                354
            ],
            "lastUpdatedAt": [
                354
            ],
            "marketSupplyRaw": [
                354
            ],
            "maxLTV": [
                354
            ],
            "sellFeeBps": [
                354
            ],
            "totalSupplyRaw": [
                354
            ],
            "tradingFeeBps": [
                354
            ],
            "__typename": [
                281
            ]
        },
        "Market_stddev_pop_order_by": {
            "buyFeeBps": [
                354
            ],
            "createdAt": [
                354
            ],
            "currentPriceRaw": [
                354
            ],
            "floorPriceRaw": [
                354
            ],
            "floorSupplyRaw": [
                354
            ],
            "initialFloorPriceRaw": [
                354
            ],
            "lastElevationTimestamp": [
                354
            ],
            "lastTradeTimestamp": [
                354
            ],
            "lastUpdatedAt": [
                354
            ],
            "marketSupplyRaw": [
                354
            ],
            "maxLTV": [
                354
            ],
            "sellFeeBps": [
                354
            ],
            "totalSupplyRaw": [
                354
            ],
            "tradingFeeBps": [
                354
            ],
            "__typename": [
                281
            ]
        },
        "Market_stddev_samp_order_by": {
            "buyFeeBps": [
                354
            ],
            "createdAt": [
                354
            ],
            "currentPriceRaw": [
                354
            ],
            "floorPriceRaw": [
                354
            ],
            "floorSupplyRaw": [
                354
            ],
            "initialFloorPriceRaw": [
                354
            ],
            "lastElevationTimestamp": [
                354
            ],
            "lastTradeTimestamp": [
                354
            ],
            "lastUpdatedAt": [
                354
            ],
            "marketSupplyRaw": [
                354
            ],
            "maxLTV": [
                354
            ],
            "sellFeeBps": [
                354
            ],
            "totalSupplyRaw": [
                354
            ],
            "tradingFeeBps": [
                354
            ],
            "__typename": [
                281
            ]
        },
        "Market_stream_cursor_input": {
            "initial_value": [
                144
            ],
            "ordering": [
                344
            ],
            "__typename": [
                281
            ]
        },
        "Market_stream_cursor_value_input": {
            "buyFeeBps": [
                352
            ],
            "createdAt": [
                352
            ],
            "creator_id": [
                281
            ],
            "currentPriceFormatted": [
                281
            ],
            "currentPriceRaw": [
                352
            ],
            "factory_id": [
                281
            ],
            "floorPriceFormatted": [
                281
            ],
            "floorPriceRaw": [
                352
            ],
            "floorSupplyFormatted": [
                281
            ],
            "floorSupplyRaw": [
                352
            ],
            "id": [
                281
            ],
            "initialFloorPriceFormatted": [
                281
            ],
            "initialFloorPriceRaw": [
                352
            ],
            "isBuyOpen": [
                12
            ],
            "isSellOpen": [
                12
            ],
            "issuanceToken_id": [
                281
            ],
            "lastElevationTimestamp": [
                352
            ],
            "lastTradeTimestamp": [
                352
            ],
            "lastUpdatedAt": [
                352
            ],
            "marketSupplyFormatted": [
                281
            ],
            "marketSupplyRaw": [
                352
            ],
            "maxLTV": [
                352
            ],
            "reserveToken_id": [
                281
            ],
            "sellFeeBps": [
                352
            ],
            "status": [
                350
            ],
            "totalSupplyFormatted": [
                281
            ],
            "totalSupplyRaw": [
                352
            ],
            "tradingFeeBps": [
                352
            ],
            "__typename": [
                281
            ]
        },
        "Market_sum_order_by": {
            "buyFeeBps": [
                354
            ],
            "createdAt": [
                354
            ],
            "currentPriceRaw": [
                354
            ],
            "floorPriceRaw": [
                354
            ],
            "floorSupplyRaw": [
                354
            ],
            "initialFloorPriceRaw": [
                354
            ],
            "lastElevationTimestamp": [
                354
            ],
            "lastTradeTimestamp": [
                354
            ],
            "lastUpdatedAt": [
                354
            ],
            "marketSupplyRaw": [
                354
            ],
            "maxLTV": [
                354
            ],
            "sellFeeBps": [
                354
            ],
            "totalSupplyRaw": [
                354
            ],
            "tradingFeeBps": [
                354
            ],
            "__typename": [
                281
            ]
        },
        "Market_var_pop_order_by": {
            "buyFeeBps": [
                354
            ],
            "createdAt": [
                354
            ],
            "currentPriceRaw": [
                354
            ],
            "floorPriceRaw": [
                354
            ],
            "floorSupplyRaw": [
                354
            ],
            "initialFloorPriceRaw": [
                354
            ],
            "lastElevationTimestamp": [
                354
            ],
            "lastTradeTimestamp": [
                354
            ],
            "lastUpdatedAt": [
                354
            ],
            "marketSupplyRaw": [
                354
            ],
            "maxLTV": [
                354
            ],
            "sellFeeBps": [
                354
            ],
            "totalSupplyRaw": [
                354
            ],
            "tradingFeeBps": [
                354
            ],
            "__typename": [
                281
            ]
        },
        "Market_var_samp_order_by": {
            "buyFeeBps": [
                354
            ],
            "createdAt": [
                354
            ],
            "currentPriceRaw": [
                354
            ],
            "floorPriceRaw": [
                354
            ],
            "floorSupplyRaw": [
                354
            ],
            "initialFloorPriceRaw": [
                354
            ],
            "lastElevationTimestamp": [
                354
            ],
            "lastTradeTimestamp": [
                354
            ],
            "lastUpdatedAt": [
                354
            ],
            "marketSupplyRaw": [
                354
            ],
            "maxLTV": [
                354
            ],
            "sellFeeBps": [
                354
            ],
            "totalSupplyRaw": [
                354
            ],
            "tradingFeeBps": [
                354
            ],
            "__typename": [
                281
            ]
        },
        "Market_variance_order_by": {
            "buyFeeBps": [
                354
            ],
            "createdAt": [
                354
            ],
            "currentPriceRaw": [
                354
            ],
            "floorPriceRaw": [
                354
            ],
            "floorSupplyRaw": [
                354
            ],
            "initialFloorPriceRaw": [
                354
            ],
            "lastElevationTimestamp": [
                354
            ],
            "lastTradeTimestamp": [
                354
            ],
            "lastUpdatedAt": [
                354
            ],
            "marketSupplyRaw": [
                354
            ],
            "maxLTV": [
                354
            ],
            "sellFeeBps": [
                354
            ],
            "totalSupplyRaw": [
                354
            ],
            "tradingFeeBps": [
                354
            ],
            "__typename": [
                281
            ]
        },
        "ModuleAddress": {
            "createdAt": [
                352
            ],
            "id": [
                281
            ],
            "lastUpdatedAt": [
                352
            ],
            "market_id": [
                281
            ],
            "moduleType": [
                281
            ],
            "__typename": [
                281
            ]
        },
        "ModuleAddress_bool_exp": {
            "_and": [
                150
            ],
            "_not": [
                150
            ],
            "_or": [
                150
            ],
            "createdAt": [
                353
            ],
            "id": [
                283
            ],
            "lastUpdatedAt": [
                353
            ],
            "market_id": [
                283
            ],
            "moduleType": [
                283
            ],
            "__typename": [
                281
            ]
        },
        "ModuleAddress_order_by": {
            "createdAt": [
                354
            ],
            "id": [
                354
            ],
            "lastUpdatedAt": [
                354
            ],
            "market_id": [
                354
            ],
            "moduleType": [
                354
            ],
            "__typename": [
                281
            ]
        },
        "ModuleAddress_select_column": {},
        "ModuleAddress_stream_cursor_input": {
            "initial_value": [
                154
            ],
            "ordering": [
                344
            ],
            "__typename": [
                281
            ]
        },
        "ModuleAddress_stream_cursor_value_input": {
            "createdAt": [
                352
            ],
            "id": [
                281
            ],
            "lastUpdatedAt": [
                352
            ],
            "market_id": [
                281
            ],
            "moduleType": [
                281
            ],
            "__typename": [
                281
            ]
        },
        "ModuleRegistry": {
            "authorizer": [
                281
            ],
            "createdAt": [
                352
            ],
            "creditFacility": [
                281
            ],
            "feeTreasury": [
                281
            ],
            "floor": [
                281
            ],
            "id": [
                281
            ],
            "lastUpdatedAt": [
                352
            ],
            "presale": [
                281
            ],
            "staking": [
                281
            ],
            "__typename": [
                281
            ]
        },
        "ModuleRegistry_bool_exp": {
            "_and": [
                156
            ],
            "_not": [
                156
            ],
            "_or": [
                156
            ],
            "authorizer": [
                283
            ],
            "createdAt": [
                353
            ],
            "creditFacility": [
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
                353
            ],
            "presale": [
                283
            ],
            "staking": [
                283
            ],
            "__typename": [
                281
            ]
        },
        "ModuleRegistry_order_by": {
            "authorizer": [
                354
            ],
            "createdAt": [
                354
            ],
            "creditFacility": [
                354
            ],
            "feeTreasury": [
                354
            ],
            "floor": [
                354
            ],
            "id": [
                354
            ],
            "lastUpdatedAt": [
                354
            ],
            "presale": [
                354
            ],
            "staking": [
                354
            ],
            "__typename": [
                281
            ]
        },
        "ModuleRegistry_select_column": {},
        "ModuleRegistry_stream_cursor_input": {
            "initial_value": [
                160
            ],
            "ordering": [
                344
            ],
            "__typename": [
                281
            ]
        },
        "ModuleRegistry_stream_cursor_value_input": {
            "authorizer": [
                281
            ],
            "createdAt": [
                352
            ],
            "creditFacility": [
                281
            ],
            "feeTreasury": [
                281
            ],
            "floor": [
                281
            ],
            "id": [
                281
            ],
            "lastUpdatedAt": [
                352
            ],
            "presale": [
                281
            ],
            "staking": [
                281
            ],
            "__typename": [
                281
            ]
        },
        "PreSaleContract": {
            "authorizer": [
                281
            ],
            "claims": [
                167,
                {
                    "distinct_on": [
                        174,
                        "[PresaleClaim_select_column!]"
                    ],
                    "limit": [
                        83
                    ],
                    "offset": [
                        83
                    ],
                    "order_by": [
                        173,
                        "[PresaleClaim_order_by!]"
                    ],
                    "where": [
                        170
                    ]
                }
            ],
            "commissionBps": [
                281
            ],
            "createdAt": [
                352
            ],
            "currentState": [
                83
            ],
            "endTime": [
                352
            ],
            "feeTreasury": [
                281
            ],
            "globalDepositCapFormatted": [
                281
            ],
            "globalDepositCapRaw": [
                352
            ],
            "id": [
                281
            ],
            "lastUpdatedAt": [
                352
            ],
            "lendingFacility": [
                281
            ],
            "market_id": [
                281
            ],
            "maxLeverage": [
                352
            ],
            "participations": [
                184,
                {
                    "distinct_on": [
                        191,
                        "[PresaleParticipation_select_column!]"
                    ],
                    "limit": [
                        83
                    ],
                    "offset": [
                        83
                    ],
                    "order_by": [
                        190,
                        "[PresaleParticipation_order_by!]"
                    ],
                    "where": [
                        187
                    ]
                }
            ],
            "perAddressDepositCapFormatted": [
                281
            ],
            "perAddressDepositCapRaw": [
                352
            ],
            "priceBreakpointOffsets": [
                83
            ],
            "priceBreakpointsFlat": [
                281
            ],
            "purchaseToken": [
                284
            ],
            "purchaseToken_id": [
                281
            ],
            "saleToken": [
                284
            ],
            "saleToken_id": [
                281
            ],
            "startTime": [
                352
            ],
            "timeSafeguardTs": [
                352
            ],
            "totalParticipants": [
                352
            ],
            "totalRaisedFormatted": [
                281
            ],
            "totalRaisedRaw": [
                352
            ],
            "whitelistSize": [
                352
            ],
            "whitelistedAddresses": [
                281
            ],
            "__typename": [
                281
            ]
        },
        "PreSaleContract_bool_exp": {
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
                283
            ],
            "claims": [
                170
            ],
            "commissionBps": [
                282
            ],
            "createdAt": [
                353
            ],
            "currentState": [
                85
            ],
            "endTime": [
                353
            ],
            "feeTreasury": [
                283
            ],
            "globalDepositCapFormatted": [
                283
            ],
            "globalDepositCapRaw": [
                353
            ],
            "id": [
                283
            ],
            "lastUpdatedAt": [
                353
            ],
            "lendingFacility": [
                283
            ],
            "market_id": [
                283
            ],
            "maxLeverage": [
                353
            ],
            "participations": [
                187
            ],
            "perAddressDepositCapFormatted": [
                283
            ],
            "perAddressDepositCapRaw": [
                353
            ],
            "priceBreakpointOffsets": [
                84
            ],
            "priceBreakpointsFlat": [
                282
            ],
            "purchaseToken": [
                285
            ],
            "purchaseToken_id": [
                283
            ],
            "saleToken": [
                285
            ],
            "saleToken_id": [
                283
            ],
            "startTime": [
                353
            ],
            "timeSafeguardTs": [
                353
            ],
            "totalParticipants": [
                353
            ],
            "totalRaisedFormatted": [
                283
            ],
            "totalRaisedRaw": [
                353
            ],
            "whitelistSize": [
                353
            ],
            "whitelistedAddresses": [
                282
            ],
            "__typename": [
                281
            ]
        },
        "PreSaleContract_order_by": {
            "authorizer": [
                354
            ],
            "claims_aggregate": [
                168
            ],
            "commissionBps": [
                354
            ],
            "createdAt": [
                354
            ],
            "currentState": [
                354
            ],
            "endTime": [
                354
            ],
            "feeTreasury": [
                354
            ],
            "globalDepositCapFormatted": [
                354
            ],
            "globalDepositCapRaw": [
                354
            ],
            "id": [
                354
            ],
            "lastUpdatedAt": [
                354
            ],
            "lendingFacility": [
                354
            ],
            "market_id": [
                354
            ],
            "maxLeverage": [
                354
            ],
            "participations_aggregate": [
                185
            ],
            "perAddressDepositCapFormatted": [
                354
            ],
            "perAddressDepositCapRaw": [
                354
            ],
            "priceBreakpointOffsets": [
                354
            ],
            "priceBreakpointsFlat": [
                354
            ],
            "purchaseToken": [
                286
            ],
            "purchaseToken_id": [
                354
            ],
            "saleToken": [
                286
            ],
            "saleToken_id": [
                354
            ],
            "startTime": [
                354
            ],
            "timeSafeguardTs": [
                354
            ],
            "totalParticipants": [
                354
            ],
            "totalRaisedFormatted": [
                354
            ],
            "totalRaisedRaw": [
                354
            ],
            "whitelistSize": [
                354
            ],
            "whitelistedAddresses": [
                354
            ],
            "__typename": [
                281
            ]
        },
        "PreSaleContract_select_column": {},
        "PreSaleContract_stream_cursor_input": {
            "initial_value": [
                166
            ],
            "ordering": [
                344
            ],
            "__typename": [
                281
            ]
        },
        "PreSaleContract_stream_cursor_value_input": {
            "authorizer": [
                281
            ],
            "commissionBps": [
                281
            ],
            "createdAt": [
                352
            ],
            "currentState": [
                83
            ],
            "endTime": [
                352
            ],
            "feeTreasury": [
                281
            ],
            "globalDepositCapFormatted": [
                281
            ],
            "globalDepositCapRaw": [
                352
            ],
            "id": [
                281
            ],
            "lastUpdatedAt": [
                352
            ],
            "lendingFacility": [
                281
            ],
            "market_id": [
                281
            ],
            "maxLeverage": [
                352
            ],
            "perAddressDepositCapFormatted": [
                281
            ],
            "perAddressDepositCapRaw": [
                352
            ],
            "priceBreakpointOffsets": [
                83
            ],
            "priceBreakpointsFlat": [
                281
            ],
            "purchaseToken_id": [
                281
            ],
            "saleToken_id": [
                281
            ],
            "startTime": [
                352
            ],
            "timeSafeguardTs": [
                352
            ],
            "totalParticipants": [
                352
            ],
            "totalRaisedFormatted": [
                281
            ],
            "totalRaisedRaw": [
                352
            ],
            "whitelistSize": [
                352
            ],
            "whitelistedAddresses": [
                281
            ],
            "__typename": [
                281
            ]
        },
        "PresaleClaim": {
            "amountFormatted": [
                281
            ],
            "amountRaw": [
                352
            ],
            "claimType": [
                355
            ],
            "id": [
                281
            ],
            "loanId": [
                352
            ],
            "positionId": [
                352
            ],
            "presale_id": [
                281
            ],
            "timestamp": [
                352
            ],
            "trancheIndex": [
                352
            ],
            "transactionHash": [
                281
            ],
            "__typename": [
                281
            ]
        },
        "PresaleClaim_aggregate_order_by": {
            "avg": [
                169
            ],
            "count": [
                354
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
                281
            ]
        },
        "PresaleClaim_avg_order_by": {
            "amountRaw": [
                354
            ],
            "loanId": [
                354
            ],
            "positionId": [
                354
            ],
            "timestamp": [
                354
            ],
            "trancheIndex": [
                354
            ],
            "__typename": [
                281
            ]
        },
        "PresaleClaim_bool_exp": {
            "_and": [
                170
            ],
            "_not": [
                170
            ],
            "_or": [
                170
            ],
            "amountFormatted": [
                283
            ],
            "amountRaw": [
                353
            ],
            "claimType": [
                356
            ],
            "id": [
                283
            ],
            "loanId": [
                353
            ],
            "positionId": [
                353
            ],
            "presale_id": [
                283
            ],
            "timestamp": [
                353
            ],
            "trancheIndex": [
                353
            ],
            "transactionHash": [
                283
            ],
            "__typename": [
                281
            ]
        },
        "PresaleClaim_max_order_by": {
            "amountFormatted": [
                354
            ],
            "amountRaw": [
                354
            ],
            "claimType": [
                354
            ],
            "id": [
                354
            ],
            "loanId": [
                354
            ],
            "positionId": [
                354
            ],
            "presale_id": [
                354
            ],
            "timestamp": [
                354
            ],
            "trancheIndex": [
                354
            ],
            "transactionHash": [
                354
            ],
            "__typename": [
                281
            ]
        },
        "PresaleClaim_min_order_by": {
            "amountFormatted": [
                354
            ],
            "amountRaw": [
                354
            ],
            "claimType": [
                354
            ],
            "id": [
                354
            ],
            "loanId": [
                354
            ],
            "positionId": [
                354
            ],
            "presale_id": [
                354
            ],
            "timestamp": [
                354
            ],
            "trancheIndex": [
                354
            ],
            "transactionHash": [
                354
            ],
            "__typename": [
                281
            ]
        },
        "PresaleClaim_order_by": {
            "amountFormatted": [
                354
            ],
            "amountRaw": [
                354
            ],
            "claimType": [
                354
            ],
            "id": [
                354
            ],
            "loanId": [
                354
            ],
            "positionId": [
                354
            ],
            "presale_id": [
                354
            ],
            "timestamp": [
                354
            ],
            "trancheIndex": [
                354
            ],
            "transactionHash": [
                354
            ],
            "__typename": [
                281
            ]
        },
        "PresaleClaim_select_column": {},
        "PresaleClaim_stddev_order_by": {
            "amountRaw": [
                354
            ],
            "loanId": [
                354
            ],
            "positionId": [
                354
            ],
            "timestamp": [
                354
            ],
            "trancheIndex": [
                354
            ],
            "__typename": [
                281
            ]
        },
        "PresaleClaim_stddev_pop_order_by": {
            "amountRaw": [
                354
            ],
            "loanId": [
                354
            ],
            "positionId": [
                354
            ],
            "timestamp": [
                354
            ],
            "trancheIndex": [
                354
            ],
            "__typename": [
                281
            ]
        },
        "PresaleClaim_stddev_samp_order_by": {
            "amountRaw": [
                354
            ],
            "loanId": [
                354
            ],
            "positionId": [
                354
            ],
            "timestamp": [
                354
            ],
            "trancheIndex": [
                354
            ],
            "__typename": [
                281
            ]
        },
        "PresaleClaim_stream_cursor_input": {
            "initial_value": [
                179
            ],
            "ordering": [
                344
            ],
            "__typename": [
                281
            ]
        },
        "PresaleClaim_stream_cursor_value_input": {
            "amountFormatted": [
                281
            ],
            "amountRaw": [
                352
            ],
            "claimType": [
                355
            ],
            "id": [
                281
            ],
            "loanId": [
                352
            ],
            "positionId": [
                352
            ],
            "presale_id": [
                281
            ],
            "timestamp": [
                352
            ],
            "trancheIndex": [
                352
            ],
            "transactionHash": [
                281
            ],
            "__typename": [
                281
            ]
        },
        "PresaleClaim_sum_order_by": {
            "amountRaw": [
                354
            ],
            "loanId": [
                354
            ],
            "positionId": [
                354
            ],
            "timestamp": [
                354
            ],
            "trancheIndex": [
                354
            ],
            "__typename": [
                281
            ]
        },
        "PresaleClaim_var_pop_order_by": {
            "amountRaw": [
                354
            ],
            "loanId": [
                354
            ],
            "positionId": [
                354
            ],
            "timestamp": [
                354
            ],
            "trancheIndex": [
                354
            ],
            "__typename": [
                281
            ]
        },
        "PresaleClaim_var_samp_order_by": {
            "amountRaw": [
                354
            ],
            "loanId": [
                354
            ],
            "positionId": [
                354
            ],
            "timestamp": [
                354
            ],
            "trancheIndex": [
                354
            ],
            "__typename": [
                281
            ]
        },
        "PresaleClaim_variance_order_by": {
            "amountRaw": [
                354
            ],
            "loanId": [
                354
            ],
            "positionId": [
                354
            ],
            "timestamp": [
                354
            ],
            "trancheIndex": [
                354
            ],
            "__typename": [
                281
            ]
        },
        "PresaleParticipation": {
            "depositAmountFormatted": [
                281
            ],
            "depositAmountRaw": [
                352
            ],
            "id": [
                281
            ],
            "leverage": [
                352
            ],
            "loopCount": [
                352
            ],
            "mintedAmountFormatted": [
                281
            ],
            "mintedAmountRaw": [
                352
            ],
            "positionId": [
                352
            ],
            "presale_id": [
                281
            ],
            "timestamp": [
                352
            ],
            "transactionHash": [
                281
            ],
            "user_id": [
                281
            ],
            "__typename": [
                281
            ]
        },
        "PresaleParticipation_aggregate_order_by": {
            "avg": [
                186
            ],
            "count": [
                354
            ],
            "max": [
                188
            ],
            "min": [
                189
            ],
            "stddev": [
                192
            ],
            "stddev_pop": [
                193
            ],
            "stddev_samp": [
                194
            ],
            "sum": [
                197
            ],
            "var_pop": [
                198
            ],
            "var_samp": [
                199
            ],
            "variance": [
                200
            ],
            "__typename": [
                281
            ]
        },
        "PresaleParticipation_avg_order_by": {
            "depositAmountRaw": [
                354
            ],
            "leverage": [
                354
            ],
            "loopCount": [
                354
            ],
            "mintedAmountRaw": [
                354
            ],
            "positionId": [
                354
            ],
            "timestamp": [
                354
            ],
            "__typename": [
                281
            ]
        },
        "PresaleParticipation_bool_exp": {
            "_and": [
                187
            ],
            "_not": [
                187
            ],
            "_or": [
                187
            ],
            "depositAmountFormatted": [
                283
            ],
            "depositAmountRaw": [
                353
            ],
            "id": [
                283
            ],
            "leverage": [
                353
            ],
            "loopCount": [
                353
            ],
            "mintedAmountFormatted": [
                283
            ],
            "mintedAmountRaw": [
                353
            ],
            "positionId": [
                353
            ],
            "presale_id": [
                283
            ],
            "timestamp": [
                353
            ],
            "transactionHash": [
                283
            ],
            "user_id": [
                283
            ],
            "__typename": [
                281
            ]
        },
        "PresaleParticipation_max_order_by": {
            "depositAmountFormatted": [
                354
            ],
            "depositAmountRaw": [
                354
            ],
            "id": [
                354
            ],
            "leverage": [
                354
            ],
            "loopCount": [
                354
            ],
            "mintedAmountFormatted": [
                354
            ],
            "mintedAmountRaw": [
                354
            ],
            "positionId": [
                354
            ],
            "presale_id": [
                354
            ],
            "timestamp": [
                354
            ],
            "transactionHash": [
                354
            ],
            "user_id": [
                354
            ],
            "__typename": [
                281
            ]
        },
        "PresaleParticipation_min_order_by": {
            "depositAmountFormatted": [
                354
            ],
            "depositAmountRaw": [
                354
            ],
            "id": [
                354
            ],
            "leverage": [
                354
            ],
            "loopCount": [
                354
            ],
            "mintedAmountFormatted": [
                354
            ],
            "mintedAmountRaw": [
                354
            ],
            "positionId": [
                354
            ],
            "presale_id": [
                354
            ],
            "timestamp": [
                354
            ],
            "transactionHash": [
                354
            ],
            "user_id": [
                354
            ],
            "__typename": [
                281
            ]
        },
        "PresaleParticipation_order_by": {
            "depositAmountFormatted": [
                354
            ],
            "depositAmountRaw": [
                354
            ],
            "id": [
                354
            ],
            "leverage": [
                354
            ],
            "loopCount": [
                354
            ],
            "mintedAmountFormatted": [
                354
            ],
            "mintedAmountRaw": [
                354
            ],
            "positionId": [
                354
            ],
            "presale_id": [
                354
            ],
            "timestamp": [
                354
            ],
            "transactionHash": [
                354
            ],
            "user_id": [
                354
            ],
            "__typename": [
                281
            ]
        },
        "PresaleParticipation_select_column": {},
        "PresaleParticipation_stddev_order_by": {
            "depositAmountRaw": [
                354
            ],
            "leverage": [
                354
            ],
            "loopCount": [
                354
            ],
            "mintedAmountRaw": [
                354
            ],
            "positionId": [
                354
            ],
            "timestamp": [
                354
            ],
            "__typename": [
                281
            ]
        },
        "PresaleParticipation_stddev_pop_order_by": {
            "depositAmountRaw": [
                354
            ],
            "leverage": [
                354
            ],
            "loopCount": [
                354
            ],
            "mintedAmountRaw": [
                354
            ],
            "positionId": [
                354
            ],
            "timestamp": [
                354
            ],
            "__typename": [
                281
            ]
        },
        "PresaleParticipation_stddev_samp_order_by": {
            "depositAmountRaw": [
                354
            ],
            "leverage": [
                354
            ],
            "loopCount": [
                354
            ],
            "mintedAmountRaw": [
                354
            ],
            "positionId": [
                354
            ],
            "timestamp": [
                354
            ],
            "__typename": [
                281
            ]
        },
        "PresaleParticipation_stream_cursor_input": {
            "initial_value": [
                196
            ],
            "ordering": [
                344
            ],
            "__typename": [
                281
            ]
        },
        "PresaleParticipation_stream_cursor_value_input": {
            "depositAmountFormatted": [
                281
            ],
            "depositAmountRaw": [
                352
            ],
            "id": [
                281
            ],
            "leverage": [
                352
            ],
            "loopCount": [
                352
            ],
            "mintedAmountFormatted": [
                281
            ],
            "mintedAmountRaw": [
                352
            ],
            "positionId": [
                352
            ],
            "presale_id": [
                281
            ],
            "timestamp": [
                352
            ],
            "transactionHash": [
                281
            ],
            "user_id": [
                281
            ],
            "__typename": [
                281
            ]
        },
        "PresaleParticipation_sum_order_by": {
            "depositAmountRaw": [
                354
            ],
            "leverage": [
                354
            ],
            "loopCount": [
                354
            ],
            "mintedAmountRaw": [
                354
            ],
            "positionId": [
                354
            ],
            "timestamp": [
                354
            ],
            "__typename": [
                281
            ]
        },
        "PresaleParticipation_var_pop_order_by": {
            "depositAmountRaw": [
                354
            ],
            "leverage": [
                354
            ],
            "loopCount": [
                354
            ],
            "mintedAmountRaw": [
                354
            ],
            "positionId": [
                354
            ],
            "timestamp": [
                354
            ],
            "__typename": [
                281
            ]
        },
        "PresaleParticipation_var_samp_order_by": {
            "depositAmountRaw": [
                354
            ],
            "leverage": [
                354
            ],
            "loopCount": [
                354
            ],
            "mintedAmountRaw": [
                354
            ],
            "positionId": [
                354
            ],
            "timestamp": [
                354
            ],
            "__typename": [
                281
            ]
        },
        "PresaleParticipation_variance_order_by": {
            "depositAmountRaw": [
                354
            ],
            "leverage": [
                354
            ],
            "loopCount": [
                354
            ],
            "mintedAmountRaw": [
                354
            ],
            "positionId": [
                354
            ],
            "timestamp": [
                354
            ],
            "__typename": [
                281
            ]
        },
        "PriceCandle": {
            "closeFormatted": [
                281
            ],
            "closeRaw": [
                352
            ],
            "highFormatted": [
                281
            ],
            "highRaw": [
                352
            ],
            "id": [
                281
            ],
            "lowFormatted": [
                281
            ],
            "lowRaw": [
                352
            ],
            "market_id": [
                281
            ],
            "openFormatted": [
                281
            ],
            "openRaw": [
                352
            ],
            "period": [
                336
            ],
            "timestamp": [
                352
            ],
            "trades": [
                352
            ],
            "volumeFormatted": [
                281
            ],
            "volumeRaw": [
                352
            ],
            "__typename": [
                281
            ]
        },
        "PriceCandle_bool_exp": {
            "_and": [
                202
            ],
            "_not": [
                202
            ],
            "_or": [
                202
            ],
            "closeFormatted": [
                283
            ],
            "closeRaw": [
                353
            ],
            "highFormatted": [
                283
            ],
            "highRaw": [
                353
            ],
            "id": [
                283
            ],
            "lowFormatted": [
                283
            ],
            "lowRaw": [
                353
            ],
            "market_id": [
                283
            ],
            "openFormatted": [
                283
            ],
            "openRaw": [
                353
            ],
            "period": [
                337
            ],
            "timestamp": [
                353
            ],
            "trades": [
                353
            ],
            "volumeFormatted": [
                283
            ],
            "volumeRaw": [
                353
            ],
            "__typename": [
                281
            ]
        },
        "PriceCandle_order_by": {
            "closeFormatted": [
                354
            ],
            "closeRaw": [
                354
            ],
            "highFormatted": [
                354
            ],
            "highRaw": [
                354
            ],
            "id": [
                354
            ],
            "lowFormatted": [
                354
            ],
            "lowRaw": [
                354
            ],
            "market_id": [
                354
            ],
            "openFormatted": [
                354
            ],
            "openRaw": [
                354
            ],
            "period": [
                354
            ],
            "timestamp": [
                354
            ],
            "trades": [
                354
            ],
            "volumeFormatted": [
                354
            ],
            "volumeRaw": [
                354
            ],
            "__typename": [
                281
            ]
        },
        "PriceCandle_select_column": {},
        "PriceCandle_stream_cursor_input": {
            "initial_value": [
                206
            ],
            "ordering": [
                344
            ],
            "__typename": [
                281
            ]
        },
        "PriceCandle_stream_cursor_value_input": {
            "closeFormatted": [
                281
            ],
            "closeRaw": [
                352
            ],
            "highFormatted": [
                281
            ],
            "highRaw": [
                352
            ],
            "id": [
                281
            ],
            "lowFormatted": [
                281
            ],
            "lowRaw": [
                352
            ],
            "market_id": [
                281
            ],
            "openFormatted": [
                281
            ],
            "openRaw": [
                352
            ],
            "period": [
                336
            ],
            "timestamp": [
                352
            ],
            "trades": [
                352
            ],
            "volumeFormatted": [
                281
            ],
            "volumeRaw": [
                352
            ],
            "__typename": [
                281
            ]
        },
        "Role": {
            "adminRole": [
                281
            ],
            "adminRoleName": [
                281
            ],
            "authorizer_id": [
                281
            ],
            "createdAt": [
                352
            ],
            "id": [
                281
            ],
            "isAdminBurned": [
                12
            ],
            "lastUpdatedAt": [
                352
            ],
            "members": [
                208,
                {
                    "distinct_on": [
                        215,
                        "[RoleMember_select_column!]"
                    ],
                    "limit": [
                        83
                    ],
                    "offset": [
                        83
                    ],
                    "order_by": [
                        214,
                        "[RoleMember_order_by!]"
                    ],
                    "where": [
                        211
                    ]
                }
            ],
            "name": [
                281
            ],
            "permissions": [
                225,
                {
                    "distinct_on": [
                        232,
                        "[RolePermission_select_column!]"
                    ],
                    "limit": [
                        83
                    ],
                    "offset": [
                        83
                    ],
                    "order_by": [
                        231,
                        "[RolePermission_order_by!]"
                    ],
                    "where": [
                        228
                    ]
                }
            ],
            "roleId": [
                281
            ],
            "__typename": [
                281
            ]
        },
        "RoleMember": {
            "grantedAt": [
                352
            ],
            "grantedBy": [
                281
            ],
            "id": [
                281
            ],
            "member": [
                281
            ],
            "role_id": [
                281
            ],
            "transactionHash": [
                281
            ],
            "__typename": [
                281
            ]
        },
        "RoleMember_aggregate_order_by": {
            "avg": [
                210
            ],
            "count": [
                354
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
                281
            ]
        },
        "RoleMember_avg_order_by": {
            "grantedAt": [
                354
            ],
            "__typename": [
                281
            ]
        },
        "RoleMember_bool_exp": {
            "_and": [
                211
            ],
            "_not": [
                211
            ],
            "_or": [
                211
            ],
            "grantedAt": [
                353
            ],
            "grantedBy": [
                283
            ],
            "id": [
                283
            ],
            "member": [
                283
            ],
            "role_id": [
                283
            ],
            "transactionHash": [
                283
            ],
            "__typename": [
                281
            ]
        },
        "RoleMember_max_order_by": {
            "grantedAt": [
                354
            ],
            "grantedBy": [
                354
            ],
            "id": [
                354
            ],
            "member": [
                354
            ],
            "role_id": [
                354
            ],
            "transactionHash": [
                354
            ],
            "__typename": [
                281
            ]
        },
        "RoleMember_min_order_by": {
            "grantedAt": [
                354
            ],
            "grantedBy": [
                354
            ],
            "id": [
                354
            ],
            "member": [
                354
            ],
            "role_id": [
                354
            ],
            "transactionHash": [
                354
            ],
            "__typename": [
                281
            ]
        },
        "RoleMember_order_by": {
            "grantedAt": [
                354
            ],
            "grantedBy": [
                354
            ],
            "id": [
                354
            ],
            "member": [
                354
            ],
            "role_id": [
                354
            ],
            "transactionHash": [
                354
            ],
            "__typename": [
                281
            ]
        },
        "RoleMember_select_column": {},
        "RoleMember_stddev_order_by": {
            "grantedAt": [
                354
            ],
            "__typename": [
                281
            ]
        },
        "RoleMember_stddev_pop_order_by": {
            "grantedAt": [
                354
            ],
            "__typename": [
                281
            ]
        },
        "RoleMember_stddev_samp_order_by": {
            "grantedAt": [
                354
            ],
            "__typename": [
                281
            ]
        },
        "RoleMember_stream_cursor_input": {
            "initial_value": [
                220
            ],
            "ordering": [
                344
            ],
            "__typename": [
                281
            ]
        },
        "RoleMember_stream_cursor_value_input": {
            "grantedAt": [
                352
            ],
            "grantedBy": [
                281
            ],
            "id": [
                281
            ],
            "member": [
                281
            ],
            "role_id": [
                281
            ],
            "transactionHash": [
                281
            ],
            "__typename": [
                281
            ]
        },
        "RoleMember_sum_order_by": {
            "grantedAt": [
                354
            ],
            "__typename": [
                281
            ]
        },
        "RoleMember_var_pop_order_by": {
            "grantedAt": [
                354
            ],
            "__typename": [
                281
            ]
        },
        "RoleMember_var_samp_order_by": {
            "grantedAt": [
                354
            ],
            "__typename": [
                281
            ]
        },
        "RoleMember_variance_order_by": {
            "grantedAt": [
                354
            ],
            "__typename": [
                281
            ]
        },
        "RolePermission": {
            "addedAt": [
                352
            ],
            "id": [
                281
            ],
            "role_id": [
                281
            ],
            "selector": [
                281
            ],
            "selectorName": [
                281
            ],
            "target": [
                281
            ],
            "transactionHash": [
                281
            ],
            "__typename": [
                281
            ]
        },
        "RolePermission_aggregate_order_by": {
            "avg": [
                227
            ],
            "count": [
                354
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
                281
            ]
        },
        "RolePermission_avg_order_by": {
            "addedAt": [
                354
            ],
            "__typename": [
                281
            ]
        },
        "RolePermission_bool_exp": {
            "_and": [
                228
            ],
            "_not": [
                228
            ],
            "_or": [
                228
            ],
            "addedAt": [
                353
            ],
            "id": [
                283
            ],
            "role_id": [
                283
            ],
            "selector": [
                283
            ],
            "selectorName": [
                283
            ],
            "target": [
                283
            ],
            "transactionHash": [
                283
            ],
            "__typename": [
                281
            ]
        },
        "RolePermission_max_order_by": {
            "addedAt": [
                354
            ],
            "id": [
                354
            ],
            "role_id": [
                354
            ],
            "selector": [
                354
            ],
            "selectorName": [
                354
            ],
            "target": [
                354
            ],
            "transactionHash": [
                354
            ],
            "__typename": [
                281
            ]
        },
        "RolePermission_min_order_by": {
            "addedAt": [
                354
            ],
            "id": [
                354
            ],
            "role_id": [
                354
            ],
            "selector": [
                354
            ],
            "selectorName": [
                354
            ],
            "target": [
                354
            ],
            "transactionHash": [
                354
            ],
            "__typename": [
                281
            ]
        },
        "RolePermission_order_by": {
            "addedAt": [
                354
            ],
            "id": [
                354
            ],
            "role_id": [
                354
            ],
            "selector": [
                354
            ],
            "selectorName": [
                354
            ],
            "target": [
                354
            ],
            "transactionHash": [
                354
            ],
            "__typename": [
                281
            ]
        },
        "RolePermission_select_column": {},
        "RolePermission_stddev_order_by": {
            "addedAt": [
                354
            ],
            "__typename": [
                281
            ]
        },
        "RolePermission_stddev_pop_order_by": {
            "addedAt": [
                354
            ],
            "__typename": [
                281
            ]
        },
        "RolePermission_stddev_samp_order_by": {
            "addedAt": [
                354
            ],
            "__typename": [
                281
            ]
        },
        "RolePermission_stream_cursor_input": {
            "initial_value": [
                237
            ],
            "ordering": [
                344
            ],
            "__typename": [
                281
            ]
        },
        "RolePermission_stream_cursor_value_input": {
            "addedAt": [
                352
            ],
            "id": [
                281
            ],
            "role_id": [
                281
            ],
            "selector": [
                281
            ],
            "selectorName": [
                281
            ],
            "target": [
                281
            ],
            "transactionHash": [
                281
            ],
            "__typename": [
                281
            ]
        },
        "RolePermission_sum_order_by": {
            "addedAt": [
                354
            ],
            "__typename": [
                281
            ]
        },
        "RolePermission_var_pop_order_by": {
            "addedAt": [
                354
            ],
            "__typename": [
                281
            ]
        },
        "RolePermission_var_samp_order_by": {
            "addedAt": [
                354
            ],
            "__typename": [
                281
            ]
        },
        "RolePermission_variance_order_by": {
            "addedAt": [
                354
            ],
            "__typename": [
                281
            ]
        },
        "Role_aggregate_order_by": {
            "avg": [
                243
            ],
            "count": [
                354
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
                281
            ]
        },
        "Role_avg_order_by": {
            "createdAt": [
                354
            ],
            "lastUpdatedAt": [
                354
            ],
            "__typename": [
                281
            ]
        },
        "Role_bool_exp": {
            "_and": [
                244
            ],
            "_not": [
                244
            ],
            "_or": [
                244
            ],
            "adminRole": [
                283
            ],
            "adminRoleName": [
                283
            ],
            "authorizer_id": [
                283
            ],
            "createdAt": [
                353
            ],
            "id": [
                283
            ],
            "isAdminBurned": [
                13
            ],
            "lastUpdatedAt": [
                353
            ],
            "members": [
                211
            ],
            "name": [
                283
            ],
            "permissions": [
                228
            ],
            "roleId": [
                283
            ],
            "__typename": [
                281
            ]
        },
        "Role_max_order_by": {
            "adminRole": [
                354
            ],
            "adminRoleName": [
                354
            ],
            "authorizer_id": [
                354
            ],
            "createdAt": [
                354
            ],
            "id": [
                354
            ],
            "lastUpdatedAt": [
                354
            ],
            "name": [
                354
            ],
            "roleId": [
                354
            ],
            "__typename": [
                281
            ]
        },
        "Role_min_order_by": {
            "adminRole": [
                354
            ],
            "adminRoleName": [
                354
            ],
            "authorizer_id": [
                354
            ],
            "createdAt": [
                354
            ],
            "id": [
                354
            ],
            "lastUpdatedAt": [
                354
            ],
            "name": [
                354
            ],
            "roleId": [
                354
            ],
            "__typename": [
                281
            ]
        },
        "Role_order_by": {
            "adminRole": [
                354
            ],
            "adminRoleName": [
                354
            ],
            "authorizer_id": [
                354
            ],
            "createdAt": [
                354
            ],
            "id": [
                354
            ],
            "isAdminBurned": [
                354
            ],
            "lastUpdatedAt": [
                354
            ],
            "members_aggregate": [
                209
            ],
            "name": [
                354
            ],
            "permissions_aggregate": [
                226
            ],
            "roleId": [
                354
            ],
            "__typename": [
                281
            ]
        },
        "Role_select_column": {},
        "Role_stddev_order_by": {
            "createdAt": [
                354
            ],
            "lastUpdatedAt": [
                354
            ],
            "__typename": [
                281
            ]
        },
        "Role_stddev_pop_order_by": {
            "createdAt": [
                354
            ],
            "lastUpdatedAt": [
                354
            ],
            "__typename": [
                281
            ]
        },
        "Role_stddev_samp_order_by": {
            "createdAt": [
                354
            ],
            "lastUpdatedAt": [
                354
            ],
            "__typename": [
                281
            ]
        },
        "Role_stream_cursor_input": {
            "initial_value": [
                253
            ],
            "ordering": [
                344
            ],
            "__typename": [
                281
            ]
        },
        "Role_stream_cursor_value_input": {
            "adminRole": [
                281
            ],
            "adminRoleName": [
                281
            ],
            "authorizer_id": [
                281
            ],
            "createdAt": [
                352
            ],
            "id": [
                281
            ],
            "isAdminBurned": [
                12
            ],
            "lastUpdatedAt": [
                352
            ],
            "name": [
                281
            ],
            "roleId": [
                281
            ],
            "__typename": [
                281
            ]
        },
        "Role_sum_order_by": {
            "createdAt": [
                354
            ],
            "lastUpdatedAt": [
                354
            ],
            "__typename": [
                281
            ]
        },
        "Role_var_pop_order_by": {
            "createdAt": [
                354
            ],
            "lastUpdatedAt": [
                354
            ],
            "__typename": [
                281
            ]
        },
        "Role_var_samp_order_by": {
            "createdAt": [
                354
            ],
            "lastUpdatedAt": [
                354
            ],
            "__typename": [
                281
            ]
        },
        "Role_variance_order_by": {
            "createdAt": [
                354
            ],
            "lastUpdatedAt": [
                354
            ],
            "__typename": [
                281
            ]
        },
        "Stake": {
            "amountFormatted": [
                281
            ],
            "amountRaw": [
                352
            ],
            "contract_id": [
                281
            ],
            "id": [
                281
            ],
            "lockDuration": [
                352
            ],
            "status": [
                363
            ],
            "timestamp": [
                352
            ],
            "transactionHash": [
                281
            ],
            "user_id": [
                281
            ],
            "__typename": [
                281
            ]
        },
        "Stake_aggregate_order_by": {
            "avg": [
                260
            ],
            "count": [
                354
            ],
            "max": [
                262
            ],
            "min": [
                263
            ],
            "stddev": [
                266
            ],
            "stddev_pop": [
                267
            ],
            "stddev_samp": [
                268
            ],
            "sum": [
                271
            ],
            "var_pop": [
                272
            ],
            "var_samp": [
                273
            ],
            "variance": [
                274
            ],
            "__typename": [
                281
            ]
        },
        "Stake_avg_order_by": {
            "amountRaw": [
                354
            ],
            "lockDuration": [
                354
            ],
            "timestamp": [
                354
            ],
            "__typename": [
                281
            ]
        },
        "Stake_bool_exp": {
            "_and": [
                261
            ],
            "_not": [
                261
            ],
            "_or": [
                261
            ],
            "amountFormatted": [
                283
            ],
            "amountRaw": [
                353
            ],
            "contract_id": [
                283
            ],
            "id": [
                283
            ],
            "lockDuration": [
                353
            ],
            "status": [
                364
            ],
            "timestamp": [
                353
            ],
            "transactionHash": [
                283
            ],
            "user_id": [
                283
            ],
            "__typename": [
                281
            ]
        },
        "Stake_max_order_by": {
            "amountFormatted": [
                354
            ],
            "amountRaw": [
                354
            ],
            "contract_id": [
                354
            ],
            "id": [
                354
            ],
            "lockDuration": [
                354
            ],
            "status": [
                354
            ],
            "timestamp": [
                354
            ],
            "transactionHash": [
                354
            ],
            "user_id": [
                354
            ],
            "__typename": [
                281
            ]
        },
        "Stake_min_order_by": {
            "amountFormatted": [
                354
            ],
            "amountRaw": [
                354
            ],
            "contract_id": [
                354
            ],
            "id": [
                354
            ],
            "lockDuration": [
                354
            ],
            "status": [
                354
            ],
            "timestamp": [
                354
            ],
            "transactionHash": [
                354
            ],
            "user_id": [
                354
            ],
            "__typename": [
                281
            ]
        },
        "Stake_order_by": {
            "amountFormatted": [
                354
            ],
            "amountRaw": [
                354
            ],
            "contract_id": [
                354
            ],
            "id": [
                354
            ],
            "lockDuration": [
                354
            ],
            "status": [
                354
            ],
            "timestamp": [
                354
            ],
            "transactionHash": [
                354
            ],
            "user_id": [
                354
            ],
            "__typename": [
                281
            ]
        },
        "Stake_select_column": {},
        "Stake_stddev_order_by": {
            "amountRaw": [
                354
            ],
            "lockDuration": [
                354
            ],
            "timestamp": [
                354
            ],
            "__typename": [
                281
            ]
        },
        "Stake_stddev_pop_order_by": {
            "amountRaw": [
                354
            ],
            "lockDuration": [
                354
            ],
            "timestamp": [
                354
            ],
            "__typename": [
                281
            ]
        },
        "Stake_stddev_samp_order_by": {
            "amountRaw": [
                354
            ],
            "lockDuration": [
                354
            ],
            "timestamp": [
                354
            ],
            "__typename": [
                281
            ]
        },
        "Stake_stream_cursor_input": {
            "initial_value": [
                270
            ],
            "ordering": [
                344
            ],
            "__typename": [
                281
            ]
        },
        "Stake_stream_cursor_value_input": {
            "amountFormatted": [
                281
            ],
            "amountRaw": [
                352
            ],
            "contract_id": [
                281
            ],
            "id": [
                281
            ],
            "lockDuration": [
                352
            ],
            "status": [
                363
            ],
            "timestamp": [
                352
            ],
            "transactionHash": [
                281
            ],
            "user_id": [
                281
            ],
            "__typename": [
                281
            ]
        },
        "Stake_sum_order_by": {
            "amountRaw": [
                354
            ],
            "lockDuration": [
                354
            ],
            "timestamp": [
                354
            ],
            "__typename": [
                281
            ]
        },
        "Stake_var_pop_order_by": {
            "amountRaw": [
                354
            ],
            "lockDuration": [
                354
            ],
            "timestamp": [
                354
            ],
            "__typename": [
                281
            ]
        },
        "Stake_var_samp_order_by": {
            "amountRaw": [
                354
            ],
            "lockDuration": [
                354
            ],
            "timestamp": [
                354
            ],
            "__typename": [
                281
            ]
        },
        "Stake_variance_order_by": {
            "amountRaw": [
                354
            ],
            "lockDuration": [
                354
            ],
            "timestamp": [
                354
            ],
            "__typename": [
                281
            ]
        },
        "StakingContract": {
            "createdAt": [
                352
            ],
            "id": [
                281
            ],
            "rewardToken_id": [
                281
            ],
            "stakes": [
                258,
                {
                    "distinct_on": [
                        265,
                        "[Stake_select_column!]"
                    ],
                    "limit": [
                        83
                    ],
                    "offset": [
                        83
                    ],
                    "order_by": [
                        264,
                        "[Stake_order_by!]"
                    ],
                    "where": [
                        261
                    ]
                }
            ],
            "stakingToken_id": [
                281
            ],
            "totalRewardsFormatted": [
                281
            ],
            "totalRewardsRaw": [
                352
            ],
            "totalStakedFormatted": [
                281
            ],
            "totalStakedRaw": [
                352
            ],
            "__typename": [
                281
            ]
        },
        "StakingContract_bool_exp": {
            "_and": [
                276
            ],
            "_not": [
                276
            ],
            "_or": [
                276
            ],
            "createdAt": [
                353
            ],
            "id": [
                283
            ],
            "rewardToken_id": [
                283
            ],
            "stakes": [
                261
            ],
            "stakingToken_id": [
                283
            ],
            "totalRewardsFormatted": [
                283
            ],
            "totalRewardsRaw": [
                353
            ],
            "totalStakedFormatted": [
                283
            ],
            "totalStakedRaw": [
                353
            ],
            "__typename": [
                281
            ]
        },
        "StakingContract_order_by": {
            "createdAt": [
                354
            ],
            "id": [
                354
            ],
            "rewardToken_id": [
                354
            ],
            "stakes_aggregate": [
                259
            ],
            "stakingToken_id": [
                354
            ],
            "totalRewardsFormatted": [
                354
            ],
            "totalRewardsRaw": [
                354
            ],
            "totalStakedFormatted": [
                354
            ],
            "totalStakedRaw": [
                354
            ],
            "__typename": [
                281
            ]
        },
        "StakingContract_select_column": {},
        "StakingContract_stream_cursor_input": {
            "initial_value": [
                280
            ],
            "ordering": [
                344
            ],
            "__typename": [
                281
            ]
        },
        "StakingContract_stream_cursor_value_input": {
            "createdAt": [
                352
            ],
            "id": [
                281
            ],
            "rewardToken_id": [
                281
            ],
            "stakingToken_id": [
                281
            ],
            "totalRewardsFormatted": [
                281
            ],
            "totalRewardsRaw": [
                352
            ],
            "totalStakedFormatted": [
                281
            ],
            "totalStakedRaw": [
                352
            ],
            "__typename": [
                281
            ]
        },
        "String": {},
        "String_array_comparison_exp": {
            "_contained_in": [
                281
            ],
            "_contains": [
                281
            ],
            "_eq": [
                281
            ],
            "_gt": [
                281
            ],
            "_gte": [
                281
            ],
            "_in": [
                281
            ],
            "_is_null": [
                12
            ],
            "_lt": [
                281
            ],
            "_lte": [
                281
            ],
            "_neq": [
                281
            ],
            "_nin": [
                281
            ],
            "__typename": [
                281
            ]
        },
        "String_comparison_exp": {
            "_eq": [
                281
            ],
            "_gt": [
                281
            ],
            "_gte": [
                281
            ],
            "_ilike": [
                281
            ],
            "_in": [
                281
            ],
            "_iregex": [
                281
            ],
            "_is_null": [
                12
            ],
            "_like": [
                281
            ],
            "_lt": [
                281
            ],
            "_lte": [
                281
            ],
            "_neq": [
                281
            ],
            "_nilike": [
                281
            ],
            "_nin": [
                281
            ],
            "_niregex": [
                281
            ],
            "_nlike": [
                281
            ],
            "_nregex": [
                281
            ],
            "_nsimilar": [
                281
            ],
            "_regex": [
                281
            ],
            "_similar": [
                281
            ],
            "__typename": [
                281
            ]
        },
        "Token": {
            "decimals": [
                83
            ],
            "id": [
                281
            ],
            "maxSupplyFormatted": [
                281
            ],
            "maxSupplyRaw": [
                352
            ],
            "name": [
                281
            ],
            "symbol": [
                281
            ],
            "__typename": [
                281
            ]
        },
        "Token_bool_exp": {
            "_and": [
                285
            ],
            "_not": [
                285
            ],
            "_or": [
                285
            ],
            "decimals": [
                85
            ],
            "id": [
                283
            ],
            "maxSupplyFormatted": [
                283
            ],
            "maxSupplyRaw": [
                353
            ],
            "name": [
                283
            ],
            "symbol": [
                283
            ],
            "__typename": [
                281
            ]
        },
        "Token_order_by": {
            "decimals": [
                354
            ],
            "id": [
                354
            ],
            "maxSupplyFormatted": [
                354
            ],
            "maxSupplyRaw": [
                354
            ],
            "name": [
                354
            ],
            "symbol": [
                354
            ],
            "__typename": [
                281
            ]
        },
        "Token_select_column": {},
        "Token_stream_cursor_input": {
            "initial_value": [
                289
            ],
            "ordering": [
                344
            ],
            "__typename": [
                281
            ]
        },
        "Token_stream_cursor_value_input": {
            "decimals": [
                83
            ],
            "id": [
                281
            ],
            "maxSupplyFormatted": [
                281
            ],
            "maxSupplyRaw": [
                352
            ],
            "name": [
                281
            ],
            "symbol": [
                281
            ],
            "__typename": [
                281
            ]
        },
        "Trade": {
            "feeFormatted": [
                281
            ],
            "feeRaw": [
                352
            ],
            "id": [
                281
            ],
            "market_id": [
                281
            ],
            "newPriceFormatted": [
                281
            ],
            "newPriceRaw": [
                352
            ],
            "reserveAmountFormatted": [
                281
            ],
            "reserveAmountRaw": [
                352
            ],
            "timestamp": [
                352
            ],
            "tokenAmountFormatted": [
                281
            ],
            "tokenAmountRaw": [
                352
            ],
            "tradeType": [
                367
            ],
            "transactionHash": [
                281
            ],
            "user_id": [
                281
            ],
            "__typename": [
                281
            ]
        },
        "Trade_aggregate_order_by": {
            "avg": [
                292
            ],
            "count": [
                354
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
                281
            ]
        },
        "Trade_avg_order_by": {
            "feeRaw": [
                354
            ],
            "newPriceRaw": [
                354
            ],
            "reserveAmountRaw": [
                354
            ],
            "timestamp": [
                354
            ],
            "tokenAmountRaw": [
                354
            ],
            "__typename": [
                281
            ]
        },
        "Trade_bool_exp": {
            "_and": [
                293
            ],
            "_not": [
                293
            ],
            "_or": [
                293
            ],
            "feeFormatted": [
                283
            ],
            "feeRaw": [
                353
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
                353
            ],
            "reserveAmountFormatted": [
                283
            ],
            "reserveAmountRaw": [
                353
            ],
            "timestamp": [
                353
            ],
            "tokenAmountFormatted": [
                283
            ],
            "tokenAmountRaw": [
                353
            ],
            "tradeType": [
                368
            ],
            "transactionHash": [
                283
            ],
            "user_id": [
                283
            ],
            "__typename": [
                281
            ]
        },
        "Trade_max_order_by": {
            "feeFormatted": [
                354
            ],
            "feeRaw": [
                354
            ],
            "id": [
                354
            ],
            "market_id": [
                354
            ],
            "newPriceFormatted": [
                354
            ],
            "newPriceRaw": [
                354
            ],
            "reserveAmountFormatted": [
                354
            ],
            "reserveAmountRaw": [
                354
            ],
            "timestamp": [
                354
            ],
            "tokenAmountFormatted": [
                354
            ],
            "tokenAmountRaw": [
                354
            ],
            "tradeType": [
                354
            ],
            "transactionHash": [
                354
            ],
            "user_id": [
                354
            ],
            "__typename": [
                281
            ]
        },
        "Trade_min_order_by": {
            "feeFormatted": [
                354
            ],
            "feeRaw": [
                354
            ],
            "id": [
                354
            ],
            "market_id": [
                354
            ],
            "newPriceFormatted": [
                354
            ],
            "newPriceRaw": [
                354
            ],
            "reserveAmountFormatted": [
                354
            ],
            "reserveAmountRaw": [
                354
            ],
            "timestamp": [
                354
            ],
            "tokenAmountFormatted": [
                354
            ],
            "tokenAmountRaw": [
                354
            ],
            "tradeType": [
                354
            ],
            "transactionHash": [
                354
            ],
            "user_id": [
                354
            ],
            "__typename": [
                281
            ]
        },
        "Trade_order_by": {
            "feeFormatted": [
                354
            ],
            "feeRaw": [
                354
            ],
            "id": [
                354
            ],
            "market_id": [
                354
            ],
            "newPriceFormatted": [
                354
            ],
            "newPriceRaw": [
                354
            ],
            "reserveAmountFormatted": [
                354
            ],
            "reserveAmountRaw": [
                354
            ],
            "timestamp": [
                354
            ],
            "tokenAmountFormatted": [
                354
            ],
            "tokenAmountRaw": [
                354
            ],
            "tradeType": [
                354
            ],
            "transactionHash": [
                354
            ],
            "user_id": [
                354
            ],
            "__typename": [
                281
            ]
        },
        "Trade_select_column": {},
        "Trade_stddev_order_by": {
            "feeRaw": [
                354
            ],
            "newPriceRaw": [
                354
            ],
            "reserveAmountRaw": [
                354
            ],
            "timestamp": [
                354
            ],
            "tokenAmountRaw": [
                354
            ],
            "__typename": [
                281
            ]
        },
        "Trade_stddev_pop_order_by": {
            "feeRaw": [
                354
            ],
            "newPriceRaw": [
                354
            ],
            "reserveAmountRaw": [
                354
            ],
            "timestamp": [
                354
            ],
            "tokenAmountRaw": [
                354
            ],
            "__typename": [
                281
            ]
        },
        "Trade_stddev_samp_order_by": {
            "feeRaw": [
                354
            ],
            "newPriceRaw": [
                354
            ],
            "reserveAmountRaw": [
                354
            ],
            "timestamp": [
                354
            ],
            "tokenAmountRaw": [
                354
            ],
            "__typename": [
                281
            ]
        },
        "Trade_stream_cursor_input": {
            "initial_value": [
                302
            ],
            "ordering": [
                344
            ],
            "__typename": [
                281
            ]
        },
        "Trade_stream_cursor_value_input": {
            "feeFormatted": [
                281
            ],
            "feeRaw": [
                352
            ],
            "id": [
                281
            ],
            "market_id": [
                281
            ],
            "newPriceFormatted": [
                281
            ],
            "newPriceRaw": [
                352
            ],
            "reserveAmountFormatted": [
                281
            ],
            "reserveAmountRaw": [
                352
            ],
            "timestamp": [
                352
            ],
            "tokenAmountFormatted": [
                281
            ],
            "tokenAmountRaw": [
                352
            ],
            "tradeType": [
                367
            ],
            "transactionHash": [
                281
            ],
            "user_id": [
                281
            ],
            "__typename": [
                281
            ]
        },
        "Trade_sum_order_by": {
            "feeRaw": [
                354
            ],
            "newPriceRaw": [
                354
            ],
            "reserveAmountRaw": [
                354
            ],
            "timestamp": [
                354
            ],
            "tokenAmountRaw": [
                354
            ],
            "__typename": [
                281
            ]
        },
        "Trade_var_pop_order_by": {
            "feeRaw": [
                354
            ],
            "newPriceRaw": [
                354
            ],
            "reserveAmountRaw": [
                354
            ],
            "timestamp": [
                354
            ],
            "tokenAmountRaw": [
                354
            ],
            "__typename": [
                281
            ]
        },
        "Trade_var_samp_order_by": {
            "feeRaw": [
                354
            ],
            "newPriceRaw": [
                354
            ],
            "reserveAmountRaw": [
                354
            ],
            "timestamp": [
                354
            ],
            "tokenAmountRaw": [
                354
            ],
            "__typename": [
                281
            ]
        },
        "Trade_variance_order_by": {
            "feeRaw": [
                354
            ],
            "newPriceRaw": [
                354
            ],
            "reserveAmountRaw": [
                354
            ],
            "timestamp": [
                354
            ],
            "tokenAmountRaw": [
                354
            ],
            "__typename": [
                281
            ]
        },
        "Treasury": {
            "createdAt": [
                352
            ],
            "feeSplitterPayments": [
                20,
                {
                    "distinct_on": [
                        27,
                        "[FeeSplitterPayment_select_column!]"
                    ],
                    "limit": [
                        83
                    ],
                    "offset": [
                        83
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
                        83
                    ],
                    "offset": [
                        83
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
                281
            ],
            "lastUpdatedAt": [
                352
            ],
            "market_id": [
                281
            ],
            "totalFeesDistributedFormatted": [
                281
            ],
            "totalFeesDistributedRaw": [
                352
            ],
            "totalFeesReceivedFormatted": [
                281
            ],
            "totalFeesReceivedRaw": [
                352
            ],
            "treasuryAddress": [
                281
            ],
            "__typename": [
                281
            ]
        },
        "Treasury_bool_exp": {
            "_and": [
                308
            ],
            "_not": [
                308
            ],
            "_or": [
                308
            ],
            "createdAt": [
                353
            ],
            "feeSplitterPayments": [
                23
            ],
            "feeSplitterReceipts": [
                40
            ],
            "id": [
                283
            ],
            "lastUpdatedAt": [
                353
            ],
            "market_id": [
                283
            ],
            "totalFeesDistributedFormatted": [
                283
            ],
            "totalFeesDistributedRaw": [
                353
            ],
            "totalFeesReceivedFormatted": [
                283
            ],
            "totalFeesReceivedRaw": [
                353
            ],
            "treasuryAddress": [
                283
            ],
            "__typename": [
                281
            ]
        },
        "Treasury_order_by": {
            "createdAt": [
                354
            ],
            "feeSplitterPayments_aggregate": [
                21
            ],
            "feeSplitterReceipts_aggregate": [
                38
            ],
            "id": [
                354
            ],
            "lastUpdatedAt": [
                354
            ],
            "market_id": [
                354
            ],
            "totalFeesDistributedFormatted": [
                354
            ],
            "totalFeesDistributedRaw": [
                354
            ],
            "totalFeesReceivedFormatted": [
                354
            ],
            "totalFeesReceivedRaw": [
                354
            ],
            "treasuryAddress": [
                354
            ],
            "__typename": [
                281
            ]
        },
        "Treasury_select_column": {},
        "Treasury_stream_cursor_input": {
            "initial_value": [
                312
            ],
            "ordering": [
                344
            ],
            "__typename": [
                281
            ]
        },
        "Treasury_stream_cursor_value_input": {
            "createdAt": [
                352
            ],
            "id": [
                281
            ],
            "lastUpdatedAt": [
                352
            ],
            "market_id": [
                281
            ],
            "totalFeesDistributedFormatted": [
                281
            ],
            "totalFeesDistributedRaw": [
                352
            ],
            "totalFeesReceivedFormatted": [
                281
            ],
            "totalFeesReceivedRaw": [
                352
            ],
            "treasuryAddress": [
                281
            ],
            "__typename": [
                281
            ]
        },
        "UserMarketPosition": {
            "claimableRewardsFormatted": [
                281
            ],
            "claimableRewardsRaw": [
                352
            ],
            "id": [
                281
            ],
            "lastUpdatedAt": [
                352
            ],
            "lockedCollateralFormatted": [
                281
            ],
            "lockedCollateralRaw": [
                352
            ],
            "market_id": [
                281
            ],
            "netFTokenChangeFormatted": [
                281
            ],
            "netFTokenChangeRaw": [
                352
            ],
            "presaleDepositFormatted": [
                281
            ],
            "presaleDepositRaw": [
                352
            ],
            "presaleLeverage": [
                352
            ],
            "stakedAmountFormatted": [
                281
            ],
            "stakedAmountRaw": [
                352
            ],
            "totalDebtFormatted": [
                281
            ],
            "totalDebtRaw": [
                352
            ],
            "user_id": [
                281
            ],
            "__typename": [
                281
            ]
        },
        "UserMarketPosition_aggregate_order_by": {
            "avg": [
                315
            ],
            "count": [
                354
            ],
            "max": [
                317
            ],
            "min": [
                318
            ],
            "stddev": [
                321
            ],
            "stddev_pop": [
                322
            ],
            "stddev_samp": [
                323
            ],
            "sum": [
                326
            ],
            "var_pop": [
                327
            ],
            "var_samp": [
                328
            ],
            "variance": [
                329
            ],
            "__typename": [
                281
            ]
        },
        "UserMarketPosition_avg_order_by": {
            "claimableRewardsRaw": [
                354
            ],
            "lastUpdatedAt": [
                354
            ],
            "lockedCollateralRaw": [
                354
            ],
            "netFTokenChangeRaw": [
                354
            ],
            "presaleDepositRaw": [
                354
            ],
            "presaleLeverage": [
                354
            ],
            "stakedAmountRaw": [
                354
            ],
            "totalDebtRaw": [
                354
            ],
            "__typename": [
                281
            ]
        },
        "UserMarketPosition_bool_exp": {
            "_and": [
                316
            ],
            "_not": [
                316
            ],
            "_or": [
                316
            ],
            "claimableRewardsFormatted": [
                283
            ],
            "claimableRewardsRaw": [
                353
            ],
            "id": [
                283
            ],
            "lastUpdatedAt": [
                353
            ],
            "lockedCollateralFormatted": [
                283
            ],
            "lockedCollateralRaw": [
                353
            ],
            "market_id": [
                283
            ],
            "netFTokenChangeFormatted": [
                283
            ],
            "netFTokenChangeRaw": [
                353
            ],
            "presaleDepositFormatted": [
                283
            ],
            "presaleDepositRaw": [
                353
            ],
            "presaleLeverage": [
                353
            ],
            "stakedAmountFormatted": [
                283
            ],
            "stakedAmountRaw": [
                353
            ],
            "totalDebtFormatted": [
                283
            ],
            "totalDebtRaw": [
                353
            ],
            "user_id": [
                283
            ],
            "__typename": [
                281
            ]
        },
        "UserMarketPosition_max_order_by": {
            "claimableRewardsFormatted": [
                354
            ],
            "claimableRewardsRaw": [
                354
            ],
            "id": [
                354
            ],
            "lastUpdatedAt": [
                354
            ],
            "lockedCollateralFormatted": [
                354
            ],
            "lockedCollateralRaw": [
                354
            ],
            "market_id": [
                354
            ],
            "netFTokenChangeFormatted": [
                354
            ],
            "netFTokenChangeRaw": [
                354
            ],
            "presaleDepositFormatted": [
                354
            ],
            "presaleDepositRaw": [
                354
            ],
            "presaleLeverage": [
                354
            ],
            "stakedAmountFormatted": [
                354
            ],
            "stakedAmountRaw": [
                354
            ],
            "totalDebtFormatted": [
                354
            ],
            "totalDebtRaw": [
                354
            ],
            "user_id": [
                354
            ],
            "__typename": [
                281
            ]
        },
        "UserMarketPosition_min_order_by": {
            "claimableRewardsFormatted": [
                354
            ],
            "claimableRewardsRaw": [
                354
            ],
            "id": [
                354
            ],
            "lastUpdatedAt": [
                354
            ],
            "lockedCollateralFormatted": [
                354
            ],
            "lockedCollateralRaw": [
                354
            ],
            "market_id": [
                354
            ],
            "netFTokenChangeFormatted": [
                354
            ],
            "netFTokenChangeRaw": [
                354
            ],
            "presaleDepositFormatted": [
                354
            ],
            "presaleDepositRaw": [
                354
            ],
            "presaleLeverage": [
                354
            ],
            "stakedAmountFormatted": [
                354
            ],
            "stakedAmountRaw": [
                354
            ],
            "totalDebtFormatted": [
                354
            ],
            "totalDebtRaw": [
                354
            ],
            "user_id": [
                354
            ],
            "__typename": [
                281
            ]
        },
        "UserMarketPosition_order_by": {
            "claimableRewardsFormatted": [
                354
            ],
            "claimableRewardsRaw": [
                354
            ],
            "id": [
                354
            ],
            "lastUpdatedAt": [
                354
            ],
            "lockedCollateralFormatted": [
                354
            ],
            "lockedCollateralRaw": [
                354
            ],
            "market_id": [
                354
            ],
            "netFTokenChangeFormatted": [
                354
            ],
            "netFTokenChangeRaw": [
                354
            ],
            "presaleDepositFormatted": [
                354
            ],
            "presaleDepositRaw": [
                354
            ],
            "presaleLeverage": [
                354
            ],
            "stakedAmountFormatted": [
                354
            ],
            "stakedAmountRaw": [
                354
            ],
            "totalDebtFormatted": [
                354
            ],
            "totalDebtRaw": [
                354
            ],
            "user_id": [
                354
            ],
            "__typename": [
                281
            ]
        },
        "UserMarketPosition_select_column": {},
        "UserMarketPosition_stddev_order_by": {
            "claimableRewardsRaw": [
                354
            ],
            "lastUpdatedAt": [
                354
            ],
            "lockedCollateralRaw": [
                354
            ],
            "netFTokenChangeRaw": [
                354
            ],
            "presaleDepositRaw": [
                354
            ],
            "presaleLeverage": [
                354
            ],
            "stakedAmountRaw": [
                354
            ],
            "totalDebtRaw": [
                354
            ],
            "__typename": [
                281
            ]
        },
        "UserMarketPosition_stddev_pop_order_by": {
            "claimableRewardsRaw": [
                354
            ],
            "lastUpdatedAt": [
                354
            ],
            "lockedCollateralRaw": [
                354
            ],
            "netFTokenChangeRaw": [
                354
            ],
            "presaleDepositRaw": [
                354
            ],
            "presaleLeverage": [
                354
            ],
            "stakedAmountRaw": [
                354
            ],
            "totalDebtRaw": [
                354
            ],
            "__typename": [
                281
            ]
        },
        "UserMarketPosition_stddev_samp_order_by": {
            "claimableRewardsRaw": [
                354
            ],
            "lastUpdatedAt": [
                354
            ],
            "lockedCollateralRaw": [
                354
            ],
            "netFTokenChangeRaw": [
                354
            ],
            "presaleDepositRaw": [
                354
            ],
            "presaleLeverage": [
                354
            ],
            "stakedAmountRaw": [
                354
            ],
            "totalDebtRaw": [
                354
            ],
            "__typename": [
                281
            ]
        },
        "UserMarketPosition_stream_cursor_input": {
            "initial_value": [
                325
            ],
            "ordering": [
                344
            ],
            "__typename": [
                281
            ]
        },
        "UserMarketPosition_stream_cursor_value_input": {
            "claimableRewardsFormatted": [
                281
            ],
            "claimableRewardsRaw": [
                352
            ],
            "id": [
                281
            ],
            "lastUpdatedAt": [
                352
            ],
            "lockedCollateralFormatted": [
                281
            ],
            "lockedCollateralRaw": [
                352
            ],
            "market_id": [
                281
            ],
            "netFTokenChangeFormatted": [
                281
            ],
            "netFTokenChangeRaw": [
                352
            ],
            "presaleDepositFormatted": [
                281
            ],
            "presaleDepositRaw": [
                352
            ],
            "presaleLeverage": [
                352
            ],
            "stakedAmountFormatted": [
                281
            ],
            "stakedAmountRaw": [
                352
            ],
            "totalDebtFormatted": [
                281
            ],
            "totalDebtRaw": [
                352
            ],
            "user_id": [
                281
            ],
            "__typename": [
                281
            ]
        },
        "UserMarketPosition_sum_order_by": {
            "claimableRewardsRaw": [
                354
            ],
            "lastUpdatedAt": [
                354
            ],
            "lockedCollateralRaw": [
                354
            ],
            "netFTokenChangeRaw": [
                354
            ],
            "presaleDepositRaw": [
                354
            ],
            "presaleLeverage": [
                354
            ],
            "stakedAmountRaw": [
                354
            ],
            "totalDebtRaw": [
                354
            ],
            "__typename": [
                281
            ]
        },
        "UserMarketPosition_var_pop_order_by": {
            "claimableRewardsRaw": [
                354
            ],
            "lastUpdatedAt": [
                354
            ],
            "lockedCollateralRaw": [
                354
            ],
            "netFTokenChangeRaw": [
                354
            ],
            "presaleDepositRaw": [
                354
            ],
            "presaleLeverage": [
                354
            ],
            "stakedAmountRaw": [
                354
            ],
            "totalDebtRaw": [
                354
            ],
            "__typename": [
                281
            ]
        },
        "UserMarketPosition_var_samp_order_by": {
            "claimableRewardsRaw": [
                354
            ],
            "lastUpdatedAt": [
                354
            ],
            "lockedCollateralRaw": [
                354
            ],
            "netFTokenChangeRaw": [
                354
            ],
            "presaleDepositRaw": [
                354
            ],
            "presaleLeverage": [
                354
            ],
            "stakedAmountRaw": [
                354
            ],
            "totalDebtRaw": [
                354
            ],
            "__typename": [
                281
            ]
        },
        "UserMarketPosition_variance_order_by": {
            "claimableRewardsRaw": [
                354
            ],
            "lastUpdatedAt": [
                354
            ],
            "lockedCollateralRaw": [
                354
            ],
            "netFTokenChangeRaw": [
                354
            ],
            "presaleDepositRaw": [
                354
            ],
            "presaleLeverage": [
                354
            ],
            "stakedAmountRaw": [
                354
            ],
            "totalDebtRaw": [
                354
            ],
            "__typename": [
                281
            ]
        },
        "_meta": {
            "bufferBlock": [
                83
            ],
            "chainId": [
                83
            ],
            "endBlock": [
                83
            ],
            "eventsProcessed": [
                83
            ],
            "firstEventBlock": [
                83
            ],
            "isReady": [
                12
            ],
            "progressBlock": [
                83
            ],
            "readyAt": [
                365
            ],
            "sourceBlock": [
                83
            ],
            "startBlock": [
                83
            ],
            "__typename": [
                281
            ]
        },
        "_meta_bool_exp": {
            "_and": [
                331
            ],
            "_not": [
                331
            ],
            "_or": [
                331
            ],
            "bufferBlock": [
                85
            ],
            "chainId": [
                85
            ],
            "endBlock": [
                85
            ],
            "eventsProcessed": [
                85
            ],
            "firstEventBlock": [
                85
            ],
            "isReady": [
                13
            ],
            "progressBlock": [
                85
            ],
            "readyAt": [
                366
            ],
            "sourceBlock": [
                85
            ],
            "startBlock": [
                85
            ],
            "__typename": [
                281
            ]
        },
        "_meta_order_by": {
            "bufferBlock": [
                354
            ],
            "chainId": [
                354
            ],
            "endBlock": [
                354
            ],
            "eventsProcessed": [
                354
            ],
            "firstEventBlock": [
                354
            ],
            "isReady": [
                354
            ],
            "progressBlock": [
                354
            ],
            "readyAt": [
                354
            ],
            "sourceBlock": [
                354
            ],
            "startBlock": [
                354
            ],
            "__typename": [
                281
            ]
        },
        "_meta_select_column": {},
        "_meta_stream_cursor_input": {
            "initial_value": [
                335
            ],
            "ordering": [
                344
            ],
            "__typename": [
                281
            ]
        },
        "_meta_stream_cursor_value_input": {
            "bufferBlock": [
                83
            ],
            "chainId": [
                83
            ],
            "endBlock": [
                83
            ],
            "eventsProcessed": [
                83
            ],
            "firstEventBlock": [
                83
            ],
            "isReady": [
                12
            ],
            "progressBlock": [
                83
            ],
            "readyAt": [
                365
            ],
            "sourceBlock": [
                83
            ],
            "startBlock": [
                83
            ],
            "__typename": [
                281
            ]
        },
        "candleperiod": {},
        "candleperiod_comparison_exp": {
            "_eq": [
                336
            ],
            "_gt": [
                336
            ],
            "_gte": [
                336
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
                281
            ]
        },
        "chain_metadata": {
            "block_height": [
                83
            ],
            "chain_id": [
                83
            ],
            "end_block": [
                83
            ],
            "first_event_block_number": [
                83
            ],
            "is_hyper_sync": [
                12
            ],
            "latest_fetched_block_number": [
                83
            ],
            "latest_processed_block": [
                83
            ],
            "num_batches_fetched": [
                83
            ],
            "num_events_processed": [
                83
            ],
            "start_block": [
                83
            ],
            "timestamp_caught_up_to_head_or_endblock": [
                365
            ],
            "__typename": [
                281
            ]
        },
        "chain_metadata_bool_exp": {
            "_and": [
                339
            ],
            "_not": [
                339
            ],
            "_or": [
                339
            ],
            "block_height": [
                85
            ],
            "chain_id": [
                85
            ],
            "end_block": [
                85
            ],
            "first_event_block_number": [
                85
            ],
            "is_hyper_sync": [
                13
            ],
            "latest_fetched_block_number": [
                85
            ],
            "latest_processed_block": [
                85
            ],
            "num_batches_fetched": [
                85
            ],
            "num_events_processed": [
                85
            ],
            "start_block": [
                85
            ],
            "timestamp_caught_up_to_head_or_endblock": [
                366
            ],
            "__typename": [
                281
            ]
        },
        "chain_metadata_order_by": {
            "block_height": [
                354
            ],
            "chain_id": [
                354
            ],
            "end_block": [
                354
            ],
            "first_event_block_number": [
                354
            ],
            "is_hyper_sync": [
                354
            ],
            "latest_fetched_block_number": [
                354
            ],
            "latest_processed_block": [
                354
            ],
            "num_batches_fetched": [
                354
            ],
            "num_events_processed": [
                354
            ],
            "start_block": [
                354
            ],
            "timestamp_caught_up_to_head_or_endblock": [
                354
            ],
            "__typename": [
                281
            ]
        },
        "chain_metadata_select_column": {},
        "chain_metadata_stream_cursor_input": {
            "initial_value": [
                343
            ],
            "ordering": [
                344
            ],
            "__typename": [
                281
            ]
        },
        "chain_metadata_stream_cursor_value_input": {
            "block_height": [
                83
            ],
            "chain_id": [
                83
            ],
            "end_block": [
                83
            ],
            "first_event_block_number": [
                83
            ],
            "is_hyper_sync": [
                12
            ],
            "latest_fetched_block_number": [
                83
            ],
            "latest_processed_block": [
                83
            ],
            "num_batches_fetched": [
                83
            ],
            "num_events_processed": [
                83
            ],
            "start_block": [
                83
            ],
            "timestamp_caught_up_to_head_or_endblock": [
                365
            ],
            "__typename": [
                281
            ]
        },
        "cursor_ordering": {},
        "jsonb": {},
        "jsonb_cast_exp": {
            "String": [
                283
            ],
            "__typename": [
                281
            ]
        },
        "jsonb_comparison_exp": {
            "_cast": [
                346
            ],
            "_contained_in": [
                345
            ],
            "_contains": [
                345
            ],
            "_eq": [
                345
            ],
            "_gt": [
                345
            ],
            "_gte": [
                345
            ],
            "_has_key": [
                281
            ],
            "_has_keys_all": [
                281
            ],
            "_has_keys_any": [
                281
            ],
            "_in": [
                345
            ],
            "_is_null": [
                12
            ],
            "_lt": [
                345
            ],
            "_lte": [
                345
            ],
            "_neq": [
                345
            ],
            "_nin": [
                345
            ],
            "__typename": [
                281
            ]
        },
        "loanstatus": {},
        "loanstatus_comparison_exp": {
            "_eq": [
                348
            ],
            "_gt": [
                348
            ],
            "_gte": [
                348
            ],
            "_in": [
                348
            ],
            "_is_null": [
                12
            ],
            "_lt": [
                348
            ],
            "_lte": [
                348
            ],
            "_neq": [
                348
            ],
            "_nin": [
                348
            ],
            "__typename": [
                281
            ]
        },
        "marketstatus": {},
        "marketstatus_comparison_exp": {
            "_eq": [
                350
            ],
            "_gt": [
                350
            ],
            "_gte": [
                350
            ],
            "_in": [
                350
            ],
            "_is_null": [
                12
            ],
            "_lt": [
                350
            ],
            "_lte": [
                350
            ],
            "_neq": [
                350
            ],
            "_nin": [
                350
            ],
            "__typename": [
                281
            ]
        },
        "numeric": {},
        "numeric_comparison_exp": {
            "_eq": [
                352
            ],
            "_gt": [
                352
            ],
            "_gte": [
                352
            ],
            "_in": [
                352
            ],
            "_is_null": [
                12
            ],
            "_lt": [
                352
            ],
            "_lte": [
                352
            ],
            "_neq": [
                352
            ],
            "_nin": [
                352
            ],
            "__typename": [
                281
            ]
        },
        "order_by": {},
        "presaleclaimtype": {},
        "presaleclaimtype_comparison_exp": {
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
                281
            ]
        },
        "raw_events": {
            "block_fields": [
                345,
                {
                    "path": [
                        281
                    ]
                }
            ],
            "block_hash": [
                281
            ],
            "block_number": [
                83
            ],
            "block_timestamp": [
                83
            ],
            "chain_id": [
                83
            ],
            "contract_name": [
                281
            ],
            "event_id": [
                352
            ],
            "event_name": [
                281
            ],
            "log_index": [
                83
            ],
            "params": [
                345,
                {
                    "path": [
                        281
                    ]
                }
            ],
            "serial": [
                83
            ],
            "src_address": [
                281
            ],
            "transaction_fields": [
                345,
                {
                    "path": [
                        281
                    ]
                }
            ],
            "__typename": [
                281
            ]
        },
        "raw_events_bool_exp": {
            "_and": [
                358
            ],
            "_not": [
                358
            ],
            "_or": [
                358
            ],
            "block_fields": [
                347
            ],
            "block_hash": [
                283
            ],
            "block_number": [
                85
            ],
            "block_timestamp": [
                85
            ],
            "chain_id": [
                85
            ],
            "contract_name": [
                283
            ],
            "event_id": [
                353
            ],
            "event_name": [
                283
            ],
            "log_index": [
                85
            ],
            "params": [
                347
            ],
            "serial": [
                85
            ],
            "src_address": [
                283
            ],
            "transaction_fields": [
                347
            ],
            "__typename": [
                281
            ]
        },
        "raw_events_order_by": {
            "block_fields": [
                354
            ],
            "block_hash": [
                354
            ],
            "block_number": [
                354
            ],
            "block_timestamp": [
                354
            ],
            "chain_id": [
                354
            ],
            "contract_name": [
                354
            ],
            "event_id": [
                354
            ],
            "event_name": [
                354
            ],
            "log_index": [
                354
            ],
            "params": [
                354
            ],
            "serial": [
                354
            ],
            "src_address": [
                354
            ],
            "transaction_fields": [
                354
            ],
            "__typename": [
                281
            ]
        },
        "raw_events_select_column": {},
        "raw_events_stream_cursor_input": {
            "initial_value": [
                362
            ],
            "ordering": [
                344
            ],
            "__typename": [
                281
            ]
        },
        "raw_events_stream_cursor_value_input": {
            "block_fields": [
                345
            ],
            "block_hash": [
                281
            ],
            "block_number": [
                83
            ],
            "block_timestamp": [
                83
            ],
            "chain_id": [
                83
            ],
            "contract_name": [
                281
            ],
            "event_id": [
                352
            ],
            "event_name": [
                281
            ],
            "log_index": [
                83
            ],
            "params": [
                345
            ],
            "serial": [
                83
            ],
            "src_address": [
                281
            ],
            "transaction_fields": [
                345
            ],
            "__typename": [
                281
            ]
        },
        "stakestatus": {},
        "stakestatus_comparison_exp": {
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
                281
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
                281
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
                281
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
                        83
                    ],
                    "offset": [
                        83
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
                        281,
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
                        83
                    ],
                    "offset": [
                        83
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
                        281,
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
                        83
                    ],
                    "offset": [
                        83
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
                        281,
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
                        83
                    ],
                    "offset": [
                        83
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
                        281,
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
                        83
                    ],
                    "offset": [
                        83
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
                        281,
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
                        83
                    ],
                    "offset": [
                        83
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
                        281,
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
                        83
                    ],
                    "offset": [
                        83
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
                        281,
                        "String!"
                    ]
                }
            ],
            "GlobalStats": [
                77,
                {
                    "distinct_on": [
                        80,
                        "[GlobalStats_select_column!]"
                    ],
                    "limit": [
                        83
                    ],
                    "offset": [
                        83
                    ],
                    "order_by": [
                        79,
                        "[GlobalStats_order_by!]"
                    ],
                    "where": [
                        78
                    ]
                }
            ],
            "GlobalStats_by_pk": [
                77,
                {
                    "id": [
                        281,
                        "String!"
                    ]
                }
            ],
            "Loan": [
                86,
                {
                    "distinct_on": [
                        110,
                        "[Loan_select_column!]"
                    ],
                    "limit": [
                        83
                    ],
                    "offset": [
                        83
                    ],
                    "order_by": [
                        109,
                        "[Loan_order_by!]"
                    ],
                    "where": [
                        106
                    ]
                }
            ],
            "LoanStatusHistory": [
                87,
                {
                    "distinct_on": [
                        94,
                        "[LoanStatusHistory_select_column!]"
                    ],
                    "limit": [
                        83
                    ],
                    "offset": [
                        83
                    ],
                    "order_by": [
                        93,
                        "[LoanStatusHistory_order_by!]"
                    ],
                    "where": [
                        90
                    ]
                }
            ],
            "LoanStatusHistory_by_pk": [
                87,
                {
                    "id": [
                        281,
                        "String!"
                    ]
                }
            ],
            "Loan_by_pk": [
                86,
                {
                    "id": [
                        281,
                        "String!"
                    ]
                }
            ],
            "Market": [
                120,
                {
                    "distinct_on": [
                        139,
                        "[Market_select_column!]"
                    ],
                    "limit": [
                        83
                    ],
                    "offset": [
                        83
                    ],
                    "order_by": [
                        138,
                        "[Market_order_by!]"
                    ],
                    "where": [
                        135
                    ]
                }
            ],
            "MarketRollingStats": [
                121,
                {
                    "distinct_on": [
                        124,
                        "[MarketRollingStats_select_column!]"
                    ],
                    "limit": [
                        83
                    ],
                    "offset": [
                        83
                    ],
                    "order_by": [
                        123,
                        "[MarketRollingStats_order_by!]"
                    ],
                    "where": [
                        122
                    ]
                }
            ],
            "MarketRollingStats_by_pk": [
                121,
                {
                    "id": [
                        281,
                        "String!"
                    ]
                }
            ],
            "MarketSnapshot": [
                127,
                {
                    "distinct_on": [
                        130,
                        "[MarketSnapshot_select_column!]"
                    ],
                    "limit": [
                        83
                    ],
                    "offset": [
                        83
                    ],
                    "order_by": [
                        129,
                        "[MarketSnapshot_order_by!]"
                    ],
                    "where": [
                        128
                    ]
                }
            ],
            "MarketSnapshot_by_pk": [
                127,
                {
                    "id": [
                        281,
                        "String!"
                    ]
                }
            ],
            "Market_by_pk": [
                120,
                {
                    "id": [
                        281,
                        "String!"
                    ]
                }
            ],
            "ModuleAddress": [
                149,
                {
                    "distinct_on": [
                        152,
                        "[ModuleAddress_select_column!]"
                    ],
                    "limit": [
                        83
                    ],
                    "offset": [
                        83
                    ],
                    "order_by": [
                        151,
                        "[ModuleAddress_order_by!]"
                    ],
                    "where": [
                        150
                    ]
                }
            ],
            "ModuleAddress_by_pk": [
                149,
                {
                    "id": [
                        281,
                        "String!"
                    ]
                }
            ],
            "ModuleRegistry": [
                155,
                {
                    "distinct_on": [
                        158,
                        "[ModuleRegistry_select_column!]"
                    ],
                    "limit": [
                        83
                    ],
                    "offset": [
                        83
                    ],
                    "order_by": [
                        157,
                        "[ModuleRegistry_order_by!]"
                    ],
                    "where": [
                        156
                    ]
                }
            ],
            "ModuleRegistry_by_pk": [
                155,
                {
                    "id": [
                        281,
                        "String!"
                    ]
                }
            ],
            "PreSaleContract": [
                161,
                {
                    "distinct_on": [
                        164,
                        "[PreSaleContract_select_column!]"
                    ],
                    "limit": [
                        83
                    ],
                    "offset": [
                        83
                    ],
                    "order_by": [
                        163,
                        "[PreSaleContract_order_by!]"
                    ],
                    "where": [
                        162
                    ]
                }
            ],
            "PreSaleContract_by_pk": [
                161,
                {
                    "id": [
                        281,
                        "String!"
                    ]
                }
            ],
            "PresaleClaim": [
                167,
                {
                    "distinct_on": [
                        174,
                        "[PresaleClaim_select_column!]"
                    ],
                    "limit": [
                        83
                    ],
                    "offset": [
                        83
                    ],
                    "order_by": [
                        173,
                        "[PresaleClaim_order_by!]"
                    ],
                    "where": [
                        170
                    ]
                }
            ],
            "PresaleClaim_by_pk": [
                167,
                {
                    "id": [
                        281,
                        "String!"
                    ]
                }
            ],
            "PresaleParticipation": [
                184,
                {
                    "distinct_on": [
                        191,
                        "[PresaleParticipation_select_column!]"
                    ],
                    "limit": [
                        83
                    ],
                    "offset": [
                        83
                    ],
                    "order_by": [
                        190,
                        "[PresaleParticipation_order_by!]"
                    ],
                    "where": [
                        187
                    ]
                }
            ],
            "PresaleParticipation_by_pk": [
                184,
                {
                    "id": [
                        281,
                        "String!"
                    ]
                }
            ],
            "PriceCandle": [
                201,
                {
                    "distinct_on": [
                        204,
                        "[PriceCandle_select_column!]"
                    ],
                    "limit": [
                        83
                    ],
                    "offset": [
                        83
                    ],
                    "order_by": [
                        203,
                        "[PriceCandle_order_by!]"
                    ],
                    "where": [
                        202
                    ]
                }
            ],
            "PriceCandle_by_pk": [
                201,
                {
                    "id": [
                        281,
                        "String!"
                    ]
                }
            ],
            "Role": [
                207,
                {
                    "distinct_on": [
                        248,
                        "[Role_select_column!]"
                    ],
                    "limit": [
                        83
                    ],
                    "offset": [
                        83
                    ],
                    "order_by": [
                        247,
                        "[Role_order_by!]"
                    ],
                    "where": [
                        244
                    ]
                }
            ],
            "RoleMember": [
                208,
                {
                    "distinct_on": [
                        215,
                        "[RoleMember_select_column!]"
                    ],
                    "limit": [
                        83
                    ],
                    "offset": [
                        83
                    ],
                    "order_by": [
                        214,
                        "[RoleMember_order_by!]"
                    ],
                    "where": [
                        211
                    ]
                }
            ],
            "RoleMember_by_pk": [
                208,
                {
                    "id": [
                        281,
                        "String!"
                    ]
                }
            ],
            "RolePermission": [
                225,
                {
                    "distinct_on": [
                        232,
                        "[RolePermission_select_column!]"
                    ],
                    "limit": [
                        83
                    ],
                    "offset": [
                        83
                    ],
                    "order_by": [
                        231,
                        "[RolePermission_order_by!]"
                    ],
                    "where": [
                        228
                    ]
                }
            ],
            "RolePermission_by_pk": [
                225,
                {
                    "id": [
                        281,
                        "String!"
                    ]
                }
            ],
            "Role_by_pk": [
                207,
                {
                    "id": [
                        281,
                        "String!"
                    ]
                }
            ],
            "Stake": [
                258,
                {
                    "distinct_on": [
                        265,
                        "[Stake_select_column!]"
                    ],
                    "limit": [
                        83
                    ],
                    "offset": [
                        83
                    ],
                    "order_by": [
                        264,
                        "[Stake_order_by!]"
                    ],
                    "where": [
                        261
                    ]
                }
            ],
            "Stake_by_pk": [
                258,
                {
                    "id": [
                        281,
                        "String!"
                    ]
                }
            ],
            "StakingContract": [
                275,
                {
                    "distinct_on": [
                        278,
                        "[StakingContract_select_column!]"
                    ],
                    "limit": [
                        83
                    ],
                    "offset": [
                        83
                    ],
                    "order_by": [
                        277,
                        "[StakingContract_order_by!]"
                    ],
                    "where": [
                        276
                    ]
                }
            ],
            "StakingContract_by_pk": [
                275,
                {
                    "id": [
                        281,
                        "String!"
                    ]
                }
            ],
            "Token": [
                284,
                {
                    "distinct_on": [
                        287,
                        "[Token_select_column!]"
                    ],
                    "limit": [
                        83
                    ],
                    "offset": [
                        83
                    ],
                    "order_by": [
                        286,
                        "[Token_order_by!]"
                    ],
                    "where": [
                        285
                    ]
                }
            ],
            "Token_by_pk": [
                284,
                {
                    "id": [
                        281,
                        "String!"
                    ]
                }
            ],
            "Trade": [
                290,
                {
                    "distinct_on": [
                        297,
                        "[Trade_select_column!]"
                    ],
                    "limit": [
                        83
                    ],
                    "offset": [
                        83
                    ],
                    "order_by": [
                        296,
                        "[Trade_order_by!]"
                    ],
                    "where": [
                        293
                    ]
                }
            ],
            "Trade_by_pk": [
                290,
                {
                    "id": [
                        281,
                        "String!"
                    ]
                }
            ],
            "Treasury": [
                307,
                {
                    "distinct_on": [
                        310,
                        "[Treasury_select_column!]"
                    ],
                    "limit": [
                        83
                    ],
                    "offset": [
                        83
                    ],
                    "order_by": [
                        309,
                        "[Treasury_order_by!]"
                    ],
                    "where": [
                        308
                    ]
                }
            ],
            "Treasury_by_pk": [
                307,
                {
                    "id": [
                        281,
                        "String!"
                    ]
                }
            ],
            "UserMarketPosition": [
                313,
                {
                    "distinct_on": [
                        320,
                        "[UserMarketPosition_select_column!]"
                    ],
                    "limit": [
                        83
                    ],
                    "offset": [
                        83
                    ],
                    "order_by": [
                        319,
                        "[UserMarketPosition_order_by!]"
                    ],
                    "where": [
                        316
                    ]
                }
            ],
            "UserMarketPosition_by_pk": [
                313,
                {
                    "id": [
                        281,
                        "String!"
                    ]
                }
            ],
            "_meta": [
                330,
                {
                    "distinct_on": [
                        333,
                        "[_meta_select_column!]"
                    ],
                    "limit": [
                        83
                    ],
                    "offset": [
                        83
                    ],
                    "order_by": [
                        332,
                        "[_meta_order_by!]"
                    ],
                    "where": [
                        331
                    ]
                }
            ],
            "chain_metadata": [
                338,
                {
                    "distinct_on": [
                        341,
                        "[chain_metadata_select_column!]"
                    ],
                    "limit": [
                        83
                    ],
                    "offset": [
                        83
                    ],
                    "order_by": [
                        340,
                        "[chain_metadata_order_by!]"
                    ],
                    "where": [
                        339
                    ]
                }
            ],
            "raw_events": [
                357,
                {
                    "distinct_on": [
                        360,
                        "[raw_events_select_column!]"
                    ],
                    "limit": [
                        83
                    ],
                    "offset": [
                        83
                    ],
                    "order_by": [
                        359,
                        "[raw_events_order_by!]"
                    ],
                    "where": [
                        358
                    ]
                }
            ],
            "raw_events_by_pk": [
                357,
                {
                    "serial": [
                        83,
                        "Int!"
                    ]
                }
            ],
            "__typename": [
                281
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
                        83
                    ],
                    "offset": [
                        83
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
                        281,
                        "String!"
                    ]
                }
            ],
            "Account_stream": [
                0,
                {
                    "batch_size": [
                        83,
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
                        83
                    ],
                    "offset": [
                        83
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
                        281,
                        "String!"
                    ]
                }
            ],
            "AuthorizerContract_stream": [
                6,
                {
                    "batch_size": [
                        83,
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
                        83
                    ],
                    "offset": [
                        83
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
                        281,
                        "String!"
                    ]
                }
            ],
            "CreditFacilityContract_stream": [
                14,
                {
                    "batch_size": [
                        83,
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
                        83
                    ],
                    "offset": [
                        83
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
                        281,
                        "String!"
                    ]
                }
            ],
            "FeeSplitterPayment_stream": [
                20,
                {
                    "batch_size": [
                        83,
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
                        83
                    ],
                    "offset": [
                        83
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
                        281,
                        "String!"
                    ]
                }
            ],
            "FeeSplitterReceipt_stream": [
                37,
                {
                    "batch_size": [
                        83,
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
                        83
                    ],
                    "offset": [
                        83
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
                        281,
                        "String!"
                    ]
                }
            ],
            "FloorElevation_stream": [
                54,
                {
                    "batch_size": [
                        83,
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
                        83
                    ],
                    "offset": [
                        83
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
                        281,
                        "String!"
                    ]
                }
            ],
            "GlobalRegistry_stream": [
                71,
                {
                    "batch_size": [
                        83,
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
                        80,
                        "[GlobalStats_select_column!]"
                    ],
                    "limit": [
                        83
                    ],
                    "offset": [
                        83
                    ],
                    "order_by": [
                        79,
                        "[GlobalStats_order_by!]"
                    ],
                    "where": [
                        78
                    ]
                }
            ],
            "GlobalStats_by_pk": [
                77,
                {
                    "id": [
                        281,
                        "String!"
                    ]
                }
            ],
            "GlobalStats_stream": [
                77,
                {
                    "batch_size": [
                        83,
                        "Int!"
                    ],
                    "cursor": [
                        81,
                        "[GlobalStats_stream_cursor_input]!"
                    ],
                    "where": [
                        78
                    ]
                }
            ],
            "Loan": [
                86,
                {
                    "distinct_on": [
                        110,
                        "[Loan_select_column!]"
                    ],
                    "limit": [
                        83
                    ],
                    "offset": [
                        83
                    ],
                    "order_by": [
                        109,
                        "[Loan_order_by!]"
                    ],
                    "where": [
                        106
                    ]
                }
            ],
            "LoanStatusHistory": [
                87,
                {
                    "distinct_on": [
                        94,
                        "[LoanStatusHistory_select_column!]"
                    ],
                    "limit": [
                        83
                    ],
                    "offset": [
                        83
                    ],
                    "order_by": [
                        93,
                        "[LoanStatusHistory_order_by!]"
                    ],
                    "where": [
                        90
                    ]
                }
            ],
            "LoanStatusHistory_by_pk": [
                87,
                {
                    "id": [
                        281,
                        "String!"
                    ]
                }
            ],
            "LoanStatusHistory_stream": [
                87,
                {
                    "batch_size": [
                        83,
                        "Int!"
                    ],
                    "cursor": [
                        98,
                        "[LoanStatusHistory_stream_cursor_input]!"
                    ],
                    "where": [
                        90
                    ]
                }
            ],
            "Loan_by_pk": [
                86,
                {
                    "id": [
                        281,
                        "String!"
                    ]
                }
            ],
            "Loan_stream": [
                86,
                {
                    "batch_size": [
                        83,
                        "Int!"
                    ],
                    "cursor": [
                        114,
                        "[Loan_stream_cursor_input]!"
                    ],
                    "where": [
                        106
                    ]
                }
            ],
            "Market": [
                120,
                {
                    "distinct_on": [
                        139,
                        "[Market_select_column!]"
                    ],
                    "limit": [
                        83
                    ],
                    "offset": [
                        83
                    ],
                    "order_by": [
                        138,
                        "[Market_order_by!]"
                    ],
                    "where": [
                        135
                    ]
                }
            ],
            "MarketRollingStats": [
                121,
                {
                    "distinct_on": [
                        124,
                        "[MarketRollingStats_select_column!]"
                    ],
                    "limit": [
                        83
                    ],
                    "offset": [
                        83
                    ],
                    "order_by": [
                        123,
                        "[MarketRollingStats_order_by!]"
                    ],
                    "where": [
                        122
                    ]
                }
            ],
            "MarketRollingStats_by_pk": [
                121,
                {
                    "id": [
                        281,
                        "String!"
                    ]
                }
            ],
            "MarketRollingStats_stream": [
                121,
                {
                    "batch_size": [
                        83,
                        "Int!"
                    ],
                    "cursor": [
                        125,
                        "[MarketRollingStats_stream_cursor_input]!"
                    ],
                    "where": [
                        122
                    ]
                }
            ],
            "MarketSnapshot": [
                127,
                {
                    "distinct_on": [
                        130,
                        "[MarketSnapshot_select_column!]"
                    ],
                    "limit": [
                        83
                    ],
                    "offset": [
                        83
                    ],
                    "order_by": [
                        129,
                        "[MarketSnapshot_order_by!]"
                    ],
                    "where": [
                        128
                    ]
                }
            ],
            "MarketSnapshot_by_pk": [
                127,
                {
                    "id": [
                        281,
                        "String!"
                    ]
                }
            ],
            "MarketSnapshot_stream": [
                127,
                {
                    "batch_size": [
                        83,
                        "Int!"
                    ],
                    "cursor": [
                        131,
                        "[MarketSnapshot_stream_cursor_input]!"
                    ],
                    "where": [
                        128
                    ]
                }
            ],
            "Market_by_pk": [
                120,
                {
                    "id": [
                        281,
                        "String!"
                    ]
                }
            ],
            "Market_stream": [
                120,
                {
                    "batch_size": [
                        83,
                        "Int!"
                    ],
                    "cursor": [
                        143,
                        "[Market_stream_cursor_input]!"
                    ],
                    "where": [
                        135
                    ]
                }
            ],
            "ModuleAddress": [
                149,
                {
                    "distinct_on": [
                        152,
                        "[ModuleAddress_select_column!]"
                    ],
                    "limit": [
                        83
                    ],
                    "offset": [
                        83
                    ],
                    "order_by": [
                        151,
                        "[ModuleAddress_order_by!]"
                    ],
                    "where": [
                        150
                    ]
                }
            ],
            "ModuleAddress_by_pk": [
                149,
                {
                    "id": [
                        281,
                        "String!"
                    ]
                }
            ],
            "ModuleAddress_stream": [
                149,
                {
                    "batch_size": [
                        83,
                        "Int!"
                    ],
                    "cursor": [
                        153,
                        "[ModuleAddress_stream_cursor_input]!"
                    ],
                    "where": [
                        150
                    ]
                }
            ],
            "ModuleRegistry": [
                155,
                {
                    "distinct_on": [
                        158,
                        "[ModuleRegistry_select_column!]"
                    ],
                    "limit": [
                        83
                    ],
                    "offset": [
                        83
                    ],
                    "order_by": [
                        157,
                        "[ModuleRegistry_order_by!]"
                    ],
                    "where": [
                        156
                    ]
                }
            ],
            "ModuleRegistry_by_pk": [
                155,
                {
                    "id": [
                        281,
                        "String!"
                    ]
                }
            ],
            "ModuleRegistry_stream": [
                155,
                {
                    "batch_size": [
                        83,
                        "Int!"
                    ],
                    "cursor": [
                        159,
                        "[ModuleRegistry_stream_cursor_input]!"
                    ],
                    "where": [
                        156
                    ]
                }
            ],
            "PreSaleContract": [
                161,
                {
                    "distinct_on": [
                        164,
                        "[PreSaleContract_select_column!]"
                    ],
                    "limit": [
                        83
                    ],
                    "offset": [
                        83
                    ],
                    "order_by": [
                        163,
                        "[PreSaleContract_order_by!]"
                    ],
                    "where": [
                        162
                    ]
                }
            ],
            "PreSaleContract_by_pk": [
                161,
                {
                    "id": [
                        281,
                        "String!"
                    ]
                }
            ],
            "PreSaleContract_stream": [
                161,
                {
                    "batch_size": [
                        83,
                        "Int!"
                    ],
                    "cursor": [
                        165,
                        "[PreSaleContract_stream_cursor_input]!"
                    ],
                    "where": [
                        162
                    ]
                }
            ],
            "PresaleClaim": [
                167,
                {
                    "distinct_on": [
                        174,
                        "[PresaleClaim_select_column!]"
                    ],
                    "limit": [
                        83
                    ],
                    "offset": [
                        83
                    ],
                    "order_by": [
                        173,
                        "[PresaleClaim_order_by!]"
                    ],
                    "where": [
                        170
                    ]
                }
            ],
            "PresaleClaim_by_pk": [
                167,
                {
                    "id": [
                        281,
                        "String!"
                    ]
                }
            ],
            "PresaleClaim_stream": [
                167,
                {
                    "batch_size": [
                        83,
                        "Int!"
                    ],
                    "cursor": [
                        178,
                        "[PresaleClaim_stream_cursor_input]!"
                    ],
                    "where": [
                        170
                    ]
                }
            ],
            "PresaleParticipation": [
                184,
                {
                    "distinct_on": [
                        191,
                        "[PresaleParticipation_select_column!]"
                    ],
                    "limit": [
                        83
                    ],
                    "offset": [
                        83
                    ],
                    "order_by": [
                        190,
                        "[PresaleParticipation_order_by!]"
                    ],
                    "where": [
                        187
                    ]
                }
            ],
            "PresaleParticipation_by_pk": [
                184,
                {
                    "id": [
                        281,
                        "String!"
                    ]
                }
            ],
            "PresaleParticipation_stream": [
                184,
                {
                    "batch_size": [
                        83,
                        "Int!"
                    ],
                    "cursor": [
                        195,
                        "[PresaleParticipation_stream_cursor_input]!"
                    ],
                    "where": [
                        187
                    ]
                }
            ],
            "PriceCandle": [
                201,
                {
                    "distinct_on": [
                        204,
                        "[PriceCandle_select_column!]"
                    ],
                    "limit": [
                        83
                    ],
                    "offset": [
                        83
                    ],
                    "order_by": [
                        203,
                        "[PriceCandle_order_by!]"
                    ],
                    "where": [
                        202
                    ]
                }
            ],
            "PriceCandle_by_pk": [
                201,
                {
                    "id": [
                        281,
                        "String!"
                    ]
                }
            ],
            "PriceCandle_stream": [
                201,
                {
                    "batch_size": [
                        83,
                        "Int!"
                    ],
                    "cursor": [
                        205,
                        "[PriceCandle_stream_cursor_input]!"
                    ],
                    "where": [
                        202
                    ]
                }
            ],
            "Role": [
                207,
                {
                    "distinct_on": [
                        248,
                        "[Role_select_column!]"
                    ],
                    "limit": [
                        83
                    ],
                    "offset": [
                        83
                    ],
                    "order_by": [
                        247,
                        "[Role_order_by!]"
                    ],
                    "where": [
                        244
                    ]
                }
            ],
            "RoleMember": [
                208,
                {
                    "distinct_on": [
                        215,
                        "[RoleMember_select_column!]"
                    ],
                    "limit": [
                        83
                    ],
                    "offset": [
                        83
                    ],
                    "order_by": [
                        214,
                        "[RoleMember_order_by!]"
                    ],
                    "where": [
                        211
                    ]
                }
            ],
            "RoleMember_by_pk": [
                208,
                {
                    "id": [
                        281,
                        "String!"
                    ]
                }
            ],
            "RoleMember_stream": [
                208,
                {
                    "batch_size": [
                        83,
                        "Int!"
                    ],
                    "cursor": [
                        219,
                        "[RoleMember_stream_cursor_input]!"
                    ],
                    "where": [
                        211
                    ]
                }
            ],
            "RolePermission": [
                225,
                {
                    "distinct_on": [
                        232,
                        "[RolePermission_select_column!]"
                    ],
                    "limit": [
                        83
                    ],
                    "offset": [
                        83
                    ],
                    "order_by": [
                        231,
                        "[RolePermission_order_by!]"
                    ],
                    "where": [
                        228
                    ]
                }
            ],
            "RolePermission_by_pk": [
                225,
                {
                    "id": [
                        281,
                        "String!"
                    ]
                }
            ],
            "RolePermission_stream": [
                225,
                {
                    "batch_size": [
                        83,
                        "Int!"
                    ],
                    "cursor": [
                        236,
                        "[RolePermission_stream_cursor_input]!"
                    ],
                    "where": [
                        228
                    ]
                }
            ],
            "Role_by_pk": [
                207,
                {
                    "id": [
                        281,
                        "String!"
                    ]
                }
            ],
            "Role_stream": [
                207,
                {
                    "batch_size": [
                        83,
                        "Int!"
                    ],
                    "cursor": [
                        252,
                        "[Role_stream_cursor_input]!"
                    ],
                    "where": [
                        244
                    ]
                }
            ],
            "Stake": [
                258,
                {
                    "distinct_on": [
                        265,
                        "[Stake_select_column!]"
                    ],
                    "limit": [
                        83
                    ],
                    "offset": [
                        83
                    ],
                    "order_by": [
                        264,
                        "[Stake_order_by!]"
                    ],
                    "where": [
                        261
                    ]
                }
            ],
            "Stake_by_pk": [
                258,
                {
                    "id": [
                        281,
                        "String!"
                    ]
                }
            ],
            "Stake_stream": [
                258,
                {
                    "batch_size": [
                        83,
                        "Int!"
                    ],
                    "cursor": [
                        269,
                        "[Stake_stream_cursor_input]!"
                    ],
                    "where": [
                        261
                    ]
                }
            ],
            "StakingContract": [
                275,
                {
                    "distinct_on": [
                        278,
                        "[StakingContract_select_column!]"
                    ],
                    "limit": [
                        83
                    ],
                    "offset": [
                        83
                    ],
                    "order_by": [
                        277,
                        "[StakingContract_order_by!]"
                    ],
                    "where": [
                        276
                    ]
                }
            ],
            "StakingContract_by_pk": [
                275,
                {
                    "id": [
                        281,
                        "String!"
                    ]
                }
            ],
            "StakingContract_stream": [
                275,
                {
                    "batch_size": [
                        83,
                        "Int!"
                    ],
                    "cursor": [
                        279,
                        "[StakingContract_stream_cursor_input]!"
                    ],
                    "where": [
                        276
                    ]
                }
            ],
            "Token": [
                284,
                {
                    "distinct_on": [
                        287,
                        "[Token_select_column!]"
                    ],
                    "limit": [
                        83
                    ],
                    "offset": [
                        83
                    ],
                    "order_by": [
                        286,
                        "[Token_order_by!]"
                    ],
                    "where": [
                        285
                    ]
                }
            ],
            "Token_by_pk": [
                284,
                {
                    "id": [
                        281,
                        "String!"
                    ]
                }
            ],
            "Token_stream": [
                284,
                {
                    "batch_size": [
                        83,
                        "Int!"
                    ],
                    "cursor": [
                        288,
                        "[Token_stream_cursor_input]!"
                    ],
                    "where": [
                        285
                    ]
                }
            ],
            "Trade": [
                290,
                {
                    "distinct_on": [
                        297,
                        "[Trade_select_column!]"
                    ],
                    "limit": [
                        83
                    ],
                    "offset": [
                        83
                    ],
                    "order_by": [
                        296,
                        "[Trade_order_by!]"
                    ],
                    "where": [
                        293
                    ]
                }
            ],
            "Trade_by_pk": [
                290,
                {
                    "id": [
                        281,
                        "String!"
                    ]
                }
            ],
            "Trade_stream": [
                290,
                {
                    "batch_size": [
                        83,
                        "Int!"
                    ],
                    "cursor": [
                        301,
                        "[Trade_stream_cursor_input]!"
                    ],
                    "where": [
                        293
                    ]
                }
            ],
            "Treasury": [
                307,
                {
                    "distinct_on": [
                        310,
                        "[Treasury_select_column!]"
                    ],
                    "limit": [
                        83
                    ],
                    "offset": [
                        83
                    ],
                    "order_by": [
                        309,
                        "[Treasury_order_by!]"
                    ],
                    "where": [
                        308
                    ]
                }
            ],
            "Treasury_by_pk": [
                307,
                {
                    "id": [
                        281,
                        "String!"
                    ]
                }
            ],
            "Treasury_stream": [
                307,
                {
                    "batch_size": [
                        83,
                        "Int!"
                    ],
                    "cursor": [
                        311,
                        "[Treasury_stream_cursor_input]!"
                    ],
                    "where": [
                        308
                    ]
                }
            ],
            "UserMarketPosition": [
                313,
                {
                    "distinct_on": [
                        320,
                        "[UserMarketPosition_select_column!]"
                    ],
                    "limit": [
                        83
                    ],
                    "offset": [
                        83
                    ],
                    "order_by": [
                        319,
                        "[UserMarketPosition_order_by!]"
                    ],
                    "where": [
                        316
                    ]
                }
            ],
            "UserMarketPosition_by_pk": [
                313,
                {
                    "id": [
                        281,
                        "String!"
                    ]
                }
            ],
            "UserMarketPosition_stream": [
                313,
                {
                    "batch_size": [
                        83,
                        "Int!"
                    ],
                    "cursor": [
                        324,
                        "[UserMarketPosition_stream_cursor_input]!"
                    ],
                    "where": [
                        316
                    ]
                }
            ],
            "_meta": [
                330,
                {
                    "distinct_on": [
                        333,
                        "[_meta_select_column!]"
                    ],
                    "limit": [
                        83
                    ],
                    "offset": [
                        83
                    ],
                    "order_by": [
                        332,
                        "[_meta_order_by!]"
                    ],
                    "where": [
                        331
                    ]
                }
            ],
            "_meta_stream": [
                330,
                {
                    "batch_size": [
                        83,
                        "Int!"
                    ],
                    "cursor": [
                        334,
                        "[_meta_stream_cursor_input]!"
                    ],
                    "where": [
                        331
                    ]
                }
            ],
            "chain_metadata": [
                338,
                {
                    "distinct_on": [
                        341,
                        "[chain_metadata_select_column!]"
                    ],
                    "limit": [
                        83
                    ],
                    "offset": [
                        83
                    ],
                    "order_by": [
                        340,
                        "[chain_metadata_order_by!]"
                    ],
                    "where": [
                        339
                    ]
                }
            ],
            "chain_metadata_stream": [
                338,
                {
                    "batch_size": [
                        83,
                        "Int!"
                    ],
                    "cursor": [
                        342,
                        "[chain_metadata_stream_cursor_input]!"
                    ],
                    "where": [
                        339
                    ]
                }
            ],
            "raw_events": [
                357,
                {
                    "distinct_on": [
                        360,
                        "[raw_events_select_column!]"
                    ],
                    "limit": [
                        83
                    ],
                    "offset": [
                        83
                    ],
                    "order_by": [
                        359,
                        "[raw_events_order_by!]"
                    ],
                    "where": [
                        358
                    ]
                }
            ],
            "raw_events_by_pk": [
                357,
                {
                    "serial": [
                        83,
                        "Int!"
                    ]
                }
            ],
            "raw_events_stream": [
                357,
                {
                    "batch_size": [
                        83,
                        "Int!"
                    ],
                    "cursor": [
                        361,
                        "[raw_events_stream_cursor_input]!"
                    ],
                    "where": [
                        358
                    ]
                }
            ],
            "__typename": [
                281
            ]
        }
    }
}