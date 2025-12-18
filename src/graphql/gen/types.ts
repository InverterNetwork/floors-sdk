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
        330,
        335,
        338,
        340,
        344,
        350,
        356,
        359,
        362,
        364,
        366,
        369,
        373,
        376,
        381,
        384,
        386,
        388,
        390
    ],
    "types": {
        "Account": {
            "db_write_timestamp": [
                386
            ],
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
            "db_write_timestamp": [
                387
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
            "db_write_timestamp": [
                369
            ],
            "id": [
                369
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
                340
            ],
            "__typename": [
                281
            ]
        },
        "Account_stream_cursor_value_input": {
            "db_write_timestamp": [
                386
            ],
            "id": [
                281
            ],
            "__typename": [
                281
            ]
        },
        "AuthorizerContract": {
            "createdAt": [
                366
            ],
            "db_write_timestamp": [
                386
            ],
            "floor": [
                281
            ],
            "id": [
                281
            ],
            "lastAssignedRoleId": [
                366
            ],
            "lastUpdatedAt": [
                366
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
                368
            ],
            "db_write_timestamp": [
                387
            ],
            "floor": [
                283
            ],
            "id": [
                283
            ],
            "lastAssignedRoleId": [
                368
            ],
            "lastUpdatedAt": [
                368
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
                369
            ],
            "db_write_timestamp": [
                369
            ],
            "floor": [
                369
            ],
            "id": [
                369
            ],
            "lastAssignedRoleId": [
                369
            ],
            "lastUpdatedAt": [
                369
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
                340
            ],
            "__typename": [
                281
            ]
        },
        "AuthorizerContract_stream_cursor_value_input": {
            "createdAt": [
                366
            ],
            "db_write_timestamp": [
                386
            ],
            "floor": [
                281
            ],
            "id": [
                281
            ],
            "lastAssignedRoleId": [
                366
            ],
            "lastUpdatedAt": [
                366
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
                366
            ],
            "db_write_timestamp": [
                386
            ],
            "id": [
                281
            ],
            "lastUpdatedAt": [
                366
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
                366
            ],
            "totalLoans": [
                366
            ],
            "totalLockedCollateralFormatted": [
                281
            ],
            "totalLockedCollateralRaw": [
                366
            ],
            "totalVolumeFormatted": [
                281
            ],
            "totalVolumeRaw": [
                366
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
                368
            ],
            "db_write_timestamp": [
                387
            ],
            "id": [
                283
            ],
            "lastUpdatedAt": [
                368
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
                368
            ],
            "totalLoans": [
                368
            ],
            "totalLockedCollateralFormatted": [
                283
            ],
            "totalLockedCollateralRaw": [
                368
            ],
            "totalVolumeFormatted": [
                283
            ],
            "totalVolumeRaw": [
                368
            ],
            "__typename": [
                281
            ]
        },
        "CreditFacilityContract_order_by": {
            "borrowToken_id": [
                369
            ],
            "collateralToken_id": [
                369
            ],
            "createdAt": [
                369
            ],
            "db_write_timestamp": [
                369
            ],
            "id": [
                369
            ],
            "lastUpdatedAt": [
                369
            ],
            "loans_aggregate": [
                104
            ],
            "market_id": [
                369
            ],
            "totalDebtFormatted": [
                369
            ],
            "totalDebtRaw": [
                369
            ],
            "totalLoans": [
                369
            ],
            "totalLockedCollateralFormatted": [
                369
            ],
            "totalLockedCollateralRaw": [
                369
            ],
            "totalVolumeFormatted": [
                369
            ],
            "totalVolumeRaw": [
                369
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
                340
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
                366
            ],
            "db_write_timestamp": [
                386
            ],
            "id": [
                281
            ],
            "lastUpdatedAt": [
                366
            ],
            "market_id": [
                281
            ],
            "totalDebtFormatted": [
                281
            ],
            "totalDebtRaw": [
                366
            ],
            "totalLoans": [
                366
            ],
            "totalLockedCollateralFormatted": [
                281
            ],
            "totalLockedCollateralRaw": [
                366
            ],
            "totalVolumeFormatted": [
                281
            ],
            "totalVolumeRaw": [
                366
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
                366
            ],
            "db_write_timestamp": [
                386
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
                366
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
                369
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
                369
            ],
            "timestamp": [
                369
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
                368
            ],
            "db_write_timestamp": [
                387
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
                368
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
                369
            ],
            "amountRaw": [
                369
            ],
            "db_write_timestamp": [
                369
            ],
            "id": [
                369
            ],
            "market_id": [
                369
            ],
            "recipient": [
                369
            ],
            "timestamp": [
                369
            ],
            "token_id": [
                369
            ],
            "transactionHash": [
                369
            ],
            "treasury_id": [
                369
            ],
            "__typename": [
                281
            ]
        },
        "FeeSplitterPayment_min_order_by": {
            "amountFormatted": [
                369
            ],
            "amountRaw": [
                369
            ],
            "db_write_timestamp": [
                369
            ],
            "id": [
                369
            ],
            "market_id": [
                369
            ],
            "recipient": [
                369
            ],
            "timestamp": [
                369
            ],
            "token_id": [
                369
            ],
            "transactionHash": [
                369
            ],
            "treasury_id": [
                369
            ],
            "__typename": [
                281
            ]
        },
        "FeeSplitterPayment_order_by": {
            "amountFormatted": [
                369
            ],
            "amountRaw": [
                369
            ],
            "db_write_timestamp": [
                369
            ],
            "id": [
                369
            ],
            "isFloorFee": [
                369
            ],
            "market_id": [
                369
            ],
            "recipient": [
                369
            ],
            "timestamp": [
                369
            ],
            "token_id": [
                369
            ],
            "transactionHash": [
                369
            ],
            "treasury_id": [
                369
            ],
            "__typename": [
                281
            ]
        },
        "FeeSplitterPayment_select_column": {},
        "FeeSplitterPayment_stddev_order_by": {
            "amountRaw": [
                369
            ],
            "timestamp": [
                369
            ],
            "__typename": [
                281
            ]
        },
        "FeeSplitterPayment_stddev_pop_order_by": {
            "amountRaw": [
                369
            ],
            "timestamp": [
                369
            ],
            "__typename": [
                281
            ]
        },
        "FeeSplitterPayment_stddev_samp_order_by": {
            "amountRaw": [
                369
            ],
            "timestamp": [
                369
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
                340
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
                366
            ],
            "db_write_timestamp": [
                386
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
                366
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
                369
            ],
            "timestamp": [
                369
            ],
            "__typename": [
                281
            ]
        },
        "FeeSplitterPayment_var_pop_order_by": {
            "amountRaw": [
                369
            ],
            "timestamp": [
                369
            ],
            "__typename": [
                281
            ]
        },
        "FeeSplitterPayment_var_samp_order_by": {
            "amountRaw": [
                369
            ],
            "timestamp": [
                369
            ],
            "__typename": [
                281
            ]
        },
        "FeeSplitterPayment_variance_order_by": {
            "amountRaw": [
                369
            ],
            "timestamp": [
                369
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
                366
            ],
            "db_write_timestamp": [
                386
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
                366
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
                369
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
                369
            ],
            "timestamp": [
                369
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
                368
            ],
            "db_write_timestamp": [
                387
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
                368
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
                369
            ],
            "amountRaw": [
                369
            ],
            "db_write_timestamp": [
                369
            ],
            "id": [
                369
            ],
            "market_id": [
                369
            ],
            "sender": [
                369
            ],
            "timestamp": [
                369
            ],
            "token_id": [
                369
            ],
            "transactionHash": [
                369
            ],
            "treasury_id": [
                369
            ],
            "__typename": [
                281
            ]
        },
        "FeeSplitterReceipt_min_order_by": {
            "amountFormatted": [
                369
            ],
            "amountRaw": [
                369
            ],
            "db_write_timestamp": [
                369
            ],
            "id": [
                369
            ],
            "market_id": [
                369
            ],
            "sender": [
                369
            ],
            "timestamp": [
                369
            ],
            "token_id": [
                369
            ],
            "transactionHash": [
                369
            ],
            "treasury_id": [
                369
            ],
            "__typename": [
                281
            ]
        },
        "FeeSplitterReceipt_order_by": {
            "amountFormatted": [
                369
            ],
            "amountRaw": [
                369
            ],
            "db_write_timestamp": [
                369
            ],
            "id": [
                369
            ],
            "market_id": [
                369
            ],
            "sender": [
                369
            ],
            "timestamp": [
                369
            ],
            "token_id": [
                369
            ],
            "transactionHash": [
                369
            ],
            "treasury_id": [
                369
            ],
            "__typename": [
                281
            ]
        },
        "FeeSplitterReceipt_select_column": {},
        "FeeSplitterReceipt_stddev_order_by": {
            "amountRaw": [
                369
            ],
            "timestamp": [
                369
            ],
            "__typename": [
                281
            ]
        },
        "FeeSplitterReceipt_stddev_pop_order_by": {
            "amountRaw": [
                369
            ],
            "timestamp": [
                369
            ],
            "__typename": [
                281
            ]
        },
        "FeeSplitterReceipt_stddev_samp_order_by": {
            "amountRaw": [
                369
            ],
            "timestamp": [
                369
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
                340
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
                366
            ],
            "db_write_timestamp": [
                386
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
                366
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
                369
            ],
            "timestamp": [
                369
            ],
            "__typename": [
                281
            ]
        },
        "FeeSplitterReceipt_var_pop_order_by": {
            "amountRaw": [
                369
            ],
            "timestamp": [
                369
            ],
            "__typename": [
                281
            ]
        },
        "FeeSplitterReceipt_var_samp_order_by": {
            "amountRaw": [
                369
            ],
            "timestamp": [
                369
            ],
            "__typename": [
                281
            ]
        },
        "FeeSplitterReceipt_variance_order_by": {
            "amountRaw": [
                369
            ],
            "timestamp": [
                369
            ],
            "__typename": [
                281
            ]
        },
        "FloorElevation": {
            "db_write_timestamp": [
                386
            ],
            "deployedAmountFormatted": [
                281
            ],
            "deployedAmountRaw": [
                366
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
                366
            ],
            "oldFloorPriceFormatted": [
                281
            ],
            "oldFloorPriceRaw": [
                366
            ],
            "timestamp": [
                366
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
                369
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
                369
            ],
            "newFloorPriceRaw": [
                369
            ],
            "oldFloorPriceRaw": [
                369
            ],
            "timestamp": [
                369
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
            "db_write_timestamp": [
                387
            ],
            "deployedAmountFormatted": [
                283
            ],
            "deployedAmountRaw": [
                368
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
                368
            ],
            "oldFloorPriceFormatted": [
                283
            ],
            "oldFloorPriceRaw": [
                368
            ],
            "timestamp": [
                368
            ],
            "transactionHash": [
                283
            ],
            "__typename": [
                281
            ]
        },
        "FloorElevation_max_order_by": {
            "db_write_timestamp": [
                369
            ],
            "deployedAmountFormatted": [
                369
            ],
            "deployedAmountRaw": [
                369
            ],
            "id": [
                369
            ],
            "market_id": [
                369
            ],
            "newFloorPriceFormatted": [
                369
            ],
            "newFloorPriceRaw": [
                369
            ],
            "oldFloorPriceFormatted": [
                369
            ],
            "oldFloorPriceRaw": [
                369
            ],
            "timestamp": [
                369
            ],
            "transactionHash": [
                369
            ],
            "__typename": [
                281
            ]
        },
        "FloorElevation_min_order_by": {
            "db_write_timestamp": [
                369
            ],
            "deployedAmountFormatted": [
                369
            ],
            "deployedAmountRaw": [
                369
            ],
            "id": [
                369
            ],
            "market_id": [
                369
            ],
            "newFloorPriceFormatted": [
                369
            ],
            "newFloorPriceRaw": [
                369
            ],
            "oldFloorPriceFormatted": [
                369
            ],
            "oldFloorPriceRaw": [
                369
            ],
            "timestamp": [
                369
            ],
            "transactionHash": [
                369
            ],
            "__typename": [
                281
            ]
        },
        "FloorElevation_order_by": {
            "db_write_timestamp": [
                369
            ],
            "deployedAmountFormatted": [
                369
            ],
            "deployedAmountRaw": [
                369
            ],
            "id": [
                369
            ],
            "market_id": [
                369
            ],
            "newFloorPriceFormatted": [
                369
            ],
            "newFloorPriceRaw": [
                369
            ],
            "oldFloorPriceFormatted": [
                369
            ],
            "oldFloorPriceRaw": [
                369
            ],
            "timestamp": [
                369
            ],
            "transactionHash": [
                369
            ],
            "__typename": [
                281
            ]
        },
        "FloorElevation_select_column": {},
        "FloorElevation_stddev_order_by": {
            "deployedAmountRaw": [
                369
            ],
            "newFloorPriceRaw": [
                369
            ],
            "oldFloorPriceRaw": [
                369
            ],
            "timestamp": [
                369
            ],
            "__typename": [
                281
            ]
        },
        "FloorElevation_stddev_pop_order_by": {
            "deployedAmountRaw": [
                369
            ],
            "newFloorPriceRaw": [
                369
            ],
            "oldFloorPriceRaw": [
                369
            ],
            "timestamp": [
                369
            ],
            "__typename": [
                281
            ]
        },
        "FloorElevation_stddev_samp_order_by": {
            "deployedAmountRaw": [
                369
            ],
            "newFloorPriceRaw": [
                369
            ],
            "oldFloorPriceRaw": [
                369
            ],
            "timestamp": [
                369
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
                340
            ],
            "__typename": [
                281
            ]
        },
        "FloorElevation_stream_cursor_value_input": {
            "db_write_timestamp": [
                386
            ],
            "deployedAmountFormatted": [
                281
            ],
            "deployedAmountRaw": [
                366
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
                366
            ],
            "oldFloorPriceFormatted": [
                281
            ],
            "oldFloorPriceRaw": [
                366
            ],
            "timestamp": [
                366
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
                369
            ],
            "newFloorPriceRaw": [
                369
            ],
            "oldFloorPriceRaw": [
                369
            ],
            "timestamp": [
                369
            ],
            "__typename": [
                281
            ]
        },
        "FloorElevation_var_pop_order_by": {
            "deployedAmountRaw": [
                369
            ],
            "newFloorPriceRaw": [
                369
            ],
            "oldFloorPriceRaw": [
                369
            ],
            "timestamp": [
                369
            ],
            "__typename": [
                281
            ]
        },
        "FloorElevation_var_samp_order_by": {
            "deployedAmountRaw": [
                369
            ],
            "newFloorPriceRaw": [
                369
            ],
            "oldFloorPriceRaw": [
                369
            ],
            "timestamp": [
                369
            ],
            "__typename": [
                281
            ]
        },
        "FloorElevation_variance_order_by": {
            "deployedAmountRaw": [
                369
            ],
            "newFloorPriceRaw": [
                369
            ],
            "oldFloorPriceRaw": [
                369
            ],
            "timestamp": [
                369
            ],
            "__typename": [
                281
            ]
        },
        "GlobalRegistry": {
            "createdAt": [
                366
            ],
            "db_write_timestamp": [
                386
            ],
            "floorFactoryAddress": [
                281
            ],
            "id": [
                281
            ],
            "lastUpdatedAt": [
                366
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
                368
            ],
            "db_write_timestamp": [
                387
            ],
            "floorFactoryAddress": [
                283
            ],
            "id": [
                283
            ],
            "lastUpdatedAt": [
                368
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
                369
            ],
            "db_write_timestamp": [
                369
            ],
            "floorFactoryAddress": [
                369
            ],
            "id": [
                369
            ],
            "lastUpdatedAt": [
                369
            ],
            "moduleFactoryAddress": [
                369
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
                340
            ],
            "__typename": [
                281
            ]
        },
        "GlobalRegistry_stream_cursor_value_input": {
            "createdAt": [
                366
            ],
            "db_write_timestamp": [
                386
            ],
            "floorFactoryAddress": [
                281
            ],
            "id": [
                281
            ],
            "lastUpdatedAt": [
                366
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
                366
            ],
            "db_write_timestamp": [
                386
            ],
            "id": [
                281
            ],
            "lastUpdatedAt": [
                366
            ],
            "totalLockedCollateralFormatted": [
                281
            ],
            "totalLockedCollateralRaw": [
                366
            ],
            "totalMarkets": [
                366
            ],
            "totalOutstandingDebtFormatted": [
                281
            ],
            "totalOutstandingDebtRaw": [
                366
            ],
            "totalVolumeFormatted": [
                281
            ],
            "totalVolumeRaw": [
                366
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
                368
            ],
            "db_write_timestamp": [
                387
            ],
            "id": [
                283
            ],
            "lastUpdatedAt": [
                368
            ],
            "totalLockedCollateralFormatted": [
                283
            ],
            "totalLockedCollateralRaw": [
                368
            ],
            "totalMarkets": [
                368
            ],
            "totalOutstandingDebtFormatted": [
                283
            ],
            "totalOutstandingDebtRaw": [
                368
            ],
            "totalVolumeFormatted": [
                283
            ],
            "totalVolumeRaw": [
                368
            ],
            "__typename": [
                281
            ]
        },
        "GlobalStats_order_by": {
            "activeMarkets": [
                369
            ],
            "db_write_timestamp": [
                369
            ],
            "id": [
                369
            ],
            "lastUpdatedAt": [
                369
            ],
            "totalLockedCollateralFormatted": [
                369
            ],
            "totalLockedCollateralRaw": [
                369
            ],
            "totalMarkets": [
                369
            ],
            "totalOutstandingDebtFormatted": [
                369
            ],
            "totalOutstandingDebtRaw": [
                369
            ],
            "totalVolumeFormatted": [
                369
            ],
            "totalVolumeRaw": [
                369
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
                340
            ],
            "__typename": [
                281
            ]
        },
        "GlobalStats_stream_cursor_value_input": {
            "activeMarkets": [
                366
            ],
            "db_write_timestamp": [
                386
            ],
            "id": [
                281
            ],
            "lastUpdatedAt": [
                366
            ],
            "totalLockedCollateralFormatted": [
                281
            ],
            "totalLockedCollateralRaw": [
                366
            ],
            "totalMarkets": [
                366
            ],
            "totalOutstandingDebtFormatted": [
                281
            ],
            "totalOutstandingDebtRaw": [
                366
            ],
            "totalVolumeFormatted": [
                281
            ],
            "totalVolumeRaw": [
                366
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
                366
            ],
            "borrower_id": [
                281
            ],
            "closedAt": [
                366
            ],
            "db_write_timestamp": [
                386
            ],
            "facility_id": [
                281
            ],
            "floorPriceAtBorrowFormatted": [
                281
            ],
            "floorPriceAtBorrowRaw": [
                366
            ],
            "id": [
                281
            ],
            "lastUpdatedAt": [
                366
            ],
            "lockedCollateralFormatted": [
                281
            ],
            "lockedCollateralRaw": [
                366
            ],
            "market_id": [
                281
            ],
            "openedAt": [
                366
            ],
            "originationFeeFormatted": [
                281
            ],
            "originationFeeRaw": [
                366
            ],
            "remainingDebtFormatted": [
                281
            ],
            "remainingDebtRaw": [
                366
            ],
            "status": [
                362
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
            "db_write_timestamp": [
                386
            ],
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
                366
            ],
            "remainingDebtFormatted": [
                281
            ],
            "remainingDebtRaw": [
                366
            ],
            "status": [
                362
            ],
            "timestamp": [
                366
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
                369
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
                369
            ],
            "remainingDebtRaw": [
                369
            ],
            "timestamp": [
                369
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
            "db_write_timestamp": [
                387
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
                368
            ],
            "remainingDebtFormatted": [
                283
            ],
            "remainingDebtRaw": [
                368
            ],
            "status": [
                363
            ],
            "timestamp": [
                368
            ],
            "transactionHash": [
                283
            ],
            "__typename": [
                281
            ]
        },
        "LoanStatusHistory_max_order_by": {
            "db_write_timestamp": [
                369
            ],
            "id": [
                369
            ],
            "loan_id": [
                369
            ],
            "lockedCollateralFormatted": [
                369
            ],
            "lockedCollateralRaw": [
                369
            ],
            "remainingDebtFormatted": [
                369
            ],
            "remainingDebtRaw": [
                369
            ],
            "status": [
                369
            ],
            "timestamp": [
                369
            ],
            "transactionHash": [
                369
            ],
            "__typename": [
                281
            ]
        },
        "LoanStatusHistory_min_order_by": {
            "db_write_timestamp": [
                369
            ],
            "id": [
                369
            ],
            "loan_id": [
                369
            ],
            "lockedCollateralFormatted": [
                369
            ],
            "lockedCollateralRaw": [
                369
            ],
            "remainingDebtFormatted": [
                369
            ],
            "remainingDebtRaw": [
                369
            ],
            "status": [
                369
            ],
            "timestamp": [
                369
            ],
            "transactionHash": [
                369
            ],
            "__typename": [
                281
            ]
        },
        "LoanStatusHistory_order_by": {
            "db_write_timestamp": [
                369
            ],
            "id": [
                369
            ],
            "loan_id": [
                369
            ],
            "lockedCollateralFormatted": [
                369
            ],
            "lockedCollateralRaw": [
                369
            ],
            "remainingDebtFormatted": [
                369
            ],
            "remainingDebtRaw": [
                369
            ],
            "status": [
                369
            ],
            "timestamp": [
                369
            ],
            "transactionHash": [
                369
            ],
            "__typename": [
                281
            ]
        },
        "LoanStatusHistory_select_column": {},
        "LoanStatusHistory_stddev_order_by": {
            "lockedCollateralRaw": [
                369
            ],
            "remainingDebtRaw": [
                369
            ],
            "timestamp": [
                369
            ],
            "__typename": [
                281
            ]
        },
        "LoanStatusHistory_stddev_pop_order_by": {
            "lockedCollateralRaw": [
                369
            ],
            "remainingDebtRaw": [
                369
            ],
            "timestamp": [
                369
            ],
            "__typename": [
                281
            ]
        },
        "LoanStatusHistory_stddev_samp_order_by": {
            "lockedCollateralRaw": [
                369
            ],
            "remainingDebtRaw": [
                369
            ],
            "timestamp": [
                369
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
                340
            ],
            "__typename": [
                281
            ]
        },
        "LoanStatusHistory_stream_cursor_value_input": {
            "db_write_timestamp": [
                386
            ],
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
                366
            ],
            "remainingDebtFormatted": [
                281
            ],
            "remainingDebtRaw": [
                366
            ],
            "status": [
                362
            ],
            "timestamp": [
                366
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
                369
            ],
            "remainingDebtRaw": [
                369
            ],
            "timestamp": [
                369
            ],
            "__typename": [
                281
            ]
        },
        "LoanStatusHistory_var_pop_order_by": {
            "lockedCollateralRaw": [
                369
            ],
            "remainingDebtRaw": [
                369
            ],
            "timestamp": [
                369
            ],
            "__typename": [
                281
            ]
        },
        "LoanStatusHistory_var_samp_order_by": {
            "lockedCollateralRaw": [
                369
            ],
            "remainingDebtRaw": [
                369
            ],
            "timestamp": [
                369
            ],
            "__typename": [
                281
            ]
        },
        "LoanStatusHistory_variance_order_by": {
            "lockedCollateralRaw": [
                369
            ],
            "remainingDebtRaw": [
                369
            ],
            "timestamp": [
                369
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
                369
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
                369
            ],
            "closedAt": [
                369
            ],
            "floorPriceAtBorrowRaw": [
                369
            ],
            "lastUpdatedAt": [
                369
            ],
            "lockedCollateralRaw": [
                369
            ],
            "openedAt": [
                369
            ],
            "originationFeeRaw": [
                369
            ],
            "remainingDebtRaw": [
                369
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
                368
            ],
            "borrower_id": [
                283
            ],
            "closedAt": [
                368
            ],
            "db_write_timestamp": [
                387
            ],
            "facility_id": [
                283
            ],
            "floorPriceAtBorrowFormatted": [
                283
            ],
            "floorPriceAtBorrowRaw": [
                368
            ],
            "id": [
                283
            ],
            "lastUpdatedAt": [
                368
            ],
            "lockedCollateralFormatted": [
                283
            ],
            "lockedCollateralRaw": [
                368
            ],
            "market_id": [
                283
            ],
            "openedAt": [
                368
            ],
            "originationFeeFormatted": [
                283
            ],
            "originationFeeRaw": [
                368
            ],
            "remainingDebtFormatted": [
                283
            ],
            "remainingDebtRaw": [
                368
            ],
            "status": [
                363
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
                369
            ],
            "borrowAmountRaw": [
                369
            ],
            "borrower_id": [
                369
            ],
            "closedAt": [
                369
            ],
            "db_write_timestamp": [
                369
            ],
            "facility_id": [
                369
            ],
            "floorPriceAtBorrowFormatted": [
                369
            ],
            "floorPriceAtBorrowRaw": [
                369
            ],
            "id": [
                369
            ],
            "lastUpdatedAt": [
                369
            ],
            "lockedCollateralFormatted": [
                369
            ],
            "lockedCollateralRaw": [
                369
            ],
            "market_id": [
                369
            ],
            "openedAt": [
                369
            ],
            "originationFeeFormatted": [
                369
            ],
            "originationFeeRaw": [
                369
            ],
            "remainingDebtFormatted": [
                369
            ],
            "remainingDebtRaw": [
                369
            ],
            "status": [
                369
            ],
            "transactionHash": [
                369
            ],
            "__typename": [
                281
            ]
        },
        "Loan_min_order_by": {
            "borrowAmountFormatted": [
                369
            ],
            "borrowAmountRaw": [
                369
            ],
            "borrower_id": [
                369
            ],
            "closedAt": [
                369
            ],
            "db_write_timestamp": [
                369
            ],
            "facility_id": [
                369
            ],
            "floorPriceAtBorrowFormatted": [
                369
            ],
            "floorPriceAtBorrowRaw": [
                369
            ],
            "id": [
                369
            ],
            "lastUpdatedAt": [
                369
            ],
            "lockedCollateralFormatted": [
                369
            ],
            "lockedCollateralRaw": [
                369
            ],
            "market_id": [
                369
            ],
            "openedAt": [
                369
            ],
            "originationFeeFormatted": [
                369
            ],
            "originationFeeRaw": [
                369
            ],
            "remainingDebtFormatted": [
                369
            ],
            "remainingDebtRaw": [
                369
            ],
            "status": [
                369
            ],
            "transactionHash": [
                369
            ],
            "__typename": [
                281
            ]
        },
        "Loan_order_by": {
            "borrowAmountFormatted": [
                369
            ],
            "borrowAmountRaw": [
                369
            ],
            "borrower_id": [
                369
            ],
            "closedAt": [
                369
            ],
            "db_write_timestamp": [
                369
            ],
            "facility_id": [
                369
            ],
            "floorPriceAtBorrowFormatted": [
                369
            ],
            "floorPriceAtBorrowRaw": [
                369
            ],
            "id": [
                369
            ],
            "lastUpdatedAt": [
                369
            ],
            "lockedCollateralFormatted": [
                369
            ],
            "lockedCollateralRaw": [
                369
            ],
            "market_id": [
                369
            ],
            "openedAt": [
                369
            ],
            "originationFeeFormatted": [
                369
            ],
            "originationFeeRaw": [
                369
            ],
            "remainingDebtFormatted": [
                369
            ],
            "remainingDebtRaw": [
                369
            ],
            "status": [
                369
            ],
            "statusHistory_aggregate": [
                88
            ],
            "transactionHash": [
                369
            ],
            "__typename": [
                281
            ]
        },
        "Loan_select_column": {},
        "Loan_stddev_order_by": {
            "borrowAmountRaw": [
                369
            ],
            "closedAt": [
                369
            ],
            "floorPriceAtBorrowRaw": [
                369
            ],
            "lastUpdatedAt": [
                369
            ],
            "lockedCollateralRaw": [
                369
            ],
            "openedAt": [
                369
            ],
            "originationFeeRaw": [
                369
            ],
            "remainingDebtRaw": [
                369
            ],
            "__typename": [
                281
            ]
        },
        "Loan_stddev_pop_order_by": {
            "borrowAmountRaw": [
                369
            ],
            "closedAt": [
                369
            ],
            "floorPriceAtBorrowRaw": [
                369
            ],
            "lastUpdatedAt": [
                369
            ],
            "lockedCollateralRaw": [
                369
            ],
            "openedAt": [
                369
            ],
            "originationFeeRaw": [
                369
            ],
            "remainingDebtRaw": [
                369
            ],
            "__typename": [
                281
            ]
        },
        "Loan_stddev_samp_order_by": {
            "borrowAmountRaw": [
                369
            ],
            "closedAt": [
                369
            ],
            "floorPriceAtBorrowRaw": [
                369
            ],
            "lastUpdatedAt": [
                369
            ],
            "lockedCollateralRaw": [
                369
            ],
            "openedAt": [
                369
            ],
            "originationFeeRaw": [
                369
            ],
            "remainingDebtRaw": [
                369
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
                340
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
                366
            ],
            "borrower_id": [
                281
            ],
            "closedAt": [
                366
            ],
            "db_write_timestamp": [
                386
            ],
            "facility_id": [
                281
            ],
            "floorPriceAtBorrowFormatted": [
                281
            ],
            "floorPriceAtBorrowRaw": [
                366
            ],
            "id": [
                281
            ],
            "lastUpdatedAt": [
                366
            ],
            "lockedCollateralFormatted": [
                281
            ],
            "lockedCollateralRaw": [
                366
            ],
            "market_id": [
                281
            ],
            "openedAt": [
                366
            ],
            "originationFeeFormatted": [
                281
            ],
            "originationFeeRaw": [
                366
            ],
            "remainingDebtFormatted": [
                281
            ],
            "remainingDebtRaw": [
                366
            ],
            "status": [
                362
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
                369
            ],
            "closedAt": [
                369
            ],
            "floorPriceAtBorrowRaw": [
                369
            ],
            "lastUpdatedAt": [
                369
            ],
            "lockedCollateralRaw": [
                369
            ],
            "openedAt": [
                369
            ],
            "originationFeeRaw": [
                369
            ],
            "remainingDebtRaw": [
                369
            ],
            "__typename": [
                281
            ]
        },
        "Loan_var_pop_order_by": {
            "borrowAmountRaw": [
                369
            ],
            "closedAt": [
                369
            ],
            "floorPriceAtBorrowRaw": [
                369
            ],
            "lastUpdatedAt": [
                369
            ],
            "lockedCollateralRaw": [
                369
            ],
            "openedAt": [
                369
            ],
            "originationFeeRaw": [
                369
            ],
            "remainingDebtRaw": [
                369
            ],
            "__typename": [
                281
            ]
        },
        "Loan_var_samp_order_by": {
            "borrowAmountRaw": [
                369
            ],
            "closedAt": [
                369
            ],
            "floorPriceAtBorrowRaw": [
                369
            ],
            "lastUpdatedAt": [
                369
            ],
            "lockedCollateralRaw": [
                369
            ],
            "openedAt": [
                369
            ],
            "originationFeeRaw": [
                369
            ],
            "remainingDebtRaw": [
                369
            ],
            "__typename": [
                281
            ]
        },
        "Loan_variance_order_by": {
            "borrowAmountRaw": [
                369
            ],
            "closedAt": [
                369
            ],
            "floorPriceAtBorrowRaw": [
                369
            ],
            "lastUpdatedAt": [
                369
            ],
            "lockedCollateralRaw": [
                369
            ],
            "openedAt": [
                369
            ],
            "originationFeeRaw": [
                369
            ],
            "remainingDebtRaw": [
                369
            ],
            "__typename": [
                281
            ]
        },
        "Market": {
            "buyFeeBps": [
                366
            ],
            "createdAt": [
                366
            ],
            "creator_id": [
                281
            ],
            "currentPriceFormatted": [
                281
            ],
            "currentPriceRaw": [
                366
            ],
            "db_write_timestamp": [
                386
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
                366
            ],
            "floorSupplyFormatted": [
                281
            ],
            "floorSupplyRaw": [
                366
            ],
            "id": [
                281
            ],
            "initialFloorPriceFormatted": [
                281
            ],
            "initialFloorPriceRaw": [
                366
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
                366
            ],
            "lastTradeTimestamp": [
                366
            ],
            "lastUpdatedAt": [
                366
            ],
            "marketSupplyFormatted": [
                281
            ],
            "marketSupplyRaw": [
                366
            ],
            "maxLTV": [
                366
            ],
            "reserveToken": [
                284
            ],
            "reserveToken_id": [
                281
            ],
            "sellFeeBps": [
                366
            ],
            "status": [
                364
            ],
            "totalSupplyFormatted": [
                281
            ],
            "totalSupplyRaw": [
                366
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
                366
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
                366
            ],
            "db_write_timestamp": [
                386
            ],
            "id": [
                281
            ],
            "lastUpdatedAt": [
                366
            ],
            "market_id": [
                281
            ],
            "tradeCount": [
                366
            ],
            "volumeFormatted": [
                281
            ],
            "volumeRaw": [
                366
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
                368
            ],
            "db_write_timestamp": [
                387
            ],
            "id": [
                283
            ],
            "lastUpdatedAt": [
                368
            ],
            "market_id": [
                283
            ],
            "tradeCount": [
                368
            ],
            "volumeFormatted": [
                283
            ],
            "volumeRaw": [
                368
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
                369
            ],
            "averagePriceRaw": [
                369
            ],
            "db_write_timestamp": [
                369
            ],
            "id": [
                369
            ],
            "lastUpdatedAt": [
                369
            ],
            "market_id": [
                369
            ],
            "tradeCount": [
                369
            ],
            "volumeFormatted": [
                369
            ],
            "volumeRaw": [
                369
            ],
            "windowSeconds": [
                369
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
                340
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
                366
            ],
            "db_write_timestamp": [
                386
            ],
            "id": [
                281
            ],
            "lastUpdatedAt": [
                366
            ],
            "market_id": [
                281
            ],
            "tradeCount": [
                366
            ],
            "volumeFormatted": [
                281
            ],
            "volumeRaw": [
                366
            ],
            "windowSeconds": [
                83
            ],
            "__typename": [
                281
            ]
        },
        "MarketSnapshot": {
            "db_write_timestamp": [
                386
            ],
            "floorPriceFormatted": [
                281
            ],
            "floorPriceRaw": [
                366
            ],
            "id": [
                281
            ],
            "marketSupplyFormatted": [
                281
            ],
            "marketSupplyRaw": [
                366
            ],
            "market_id": [
                281
            ],
            "priceFormatted": [
                281
            ],
            "priceRaw": [
                366
            ],
            "timestamp": [
                366
            ],
            "totalSupplyFormatted": [
                281
            ],
            "totalSupplyRaw": [
                366
            ],
            "trades24h": [
                366
            ],
            "volume24hFormatted": [
                281
            ],
            "volume24hRaw": [
                366
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
            "db_write_timestamp": [
                387
            ],
            "floorPriceFormatted": [
                283
            ],
            "floorPriceRaw": [
                368
            ],
            "id": [
                283
            ],
            "marketSupplyFormatted": [
                283
            ],
            "marketSupplyRaw": [
                368
            ],
            "market_id": [
                283
            ],
            "priceFormatted": [
                283
            ],
            "priceRaw": [
                368
            ],
            "timestamp": [
                368
            ],
            "totalSupplyFormatted": [
                283
            ],
            "totalSupplyRaw": [
                368
            ],
            "trades24h": [
                368
            ],
            "volume24hFormatted": [
                283
            ],
            "volume24hRaw": [
                368
            ],
            "__typename": [
                281
            ]
        },
        "MarketSnapshot_order_by": {
            "db_write_timestamp": [
                369
            ],
            "floorPriceFormatted": [
                369
            ],
            "floorPriceRaw": [
                369
            ],
            "id": [
                369
            ],
            "marketSupplyFormatted": [
                369
            ],
            "marketSupplyRaw": [
                369
            ],
            "market_id": [
                369
            ],
            "priceFormatted": [
                369
            ],
            "priceRaw": [
                369
            ],
            "timestamp": [
                369
            ],
            "totalSupplyFormatted": [
                369
            ],
            "totalSupplyRaw": [
                369
            ],
            "trades24h": [
                369
            ],
            "volume24hFormatted": [
                369
            ],
            "volume24hRaw": [
                369
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
                340
            ],
            "__typename": [
                281
            ]
        },
        "MarketSnapshot_stream_cursor_value_input": {
            "db_write_timestamp": [
                386
            ],
            "floorPriceFormatted": [
                281
            ],
            "floorPriceRaw": [
                366
            ],
            "id": [
                281
            ],
            "marketSupplyFormatted": [
                281
            ],
            "marketSupplyRaw": [
                366
            ],
            "market_id": [
                281
            ],
            "priceFormatted": [
                281
            ],
            "priceRaw": [
                366
            ],
            "timestamp": [
                366
            ],
            "totalSupplyFormatted": [
                281
            ],
            "totalSupplyRaw": [
                366
            ],
            "trades24h": [
                366
            ],
            "volume24hFormatted": [
                281
            ],
            "volume24hRaw": [
                366
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
                369
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
                369
            ],
            "createdAt": [
                369
            ],
            "currentPriceRaw": [
                369
            ],
            "floorPriceRaw": [
                369
            ],
            "floorSupplyRaw": [
                369
            ],
            "initialFloorPriceRaw": [
                369
            ],
            "lastElevationTimestamp": [
                369
            ],
            "lastTradeTimestamp": [
                369
            ],
            "lastUpdatedAt": [
                369
            ],
            "marketSupplyRaw": [
                369
            ],
            "maxLTV": [
                369
            ],
            "sellFeeBps": [
                369
            ],
            "totalSupplyRaw": [
                369
            ],
            "tradingFeeBps": [
                369
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
                368
            ],
            "createdAt": [
                368
            ],
            "creator_id": [
                283
            ],
            "currentPriceFormatted": [
                283
            ],
            "currentPriceRaw": [
                368
            ],
            "db_write_timestamp": [
                387
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
                368
            ],
            "floorSupplyFormatted": [
                283
            ],
            "floorSupplyRaw": [
                368
            ],
            "id": [
                283
            ],
            "initialFloorPriceFormatted": [
                283
            ],
            "initialFloorPriceRaw": [
                368
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
                368
            ],
            "lastTradeTimestamp": [
                368
            ],
            "lastUpdatedAt": [
                368
            ],
            "marketSupplyFormatted": [
                283
            ],
            "marketSupplyRaw": [
                368
            ],
            "maxLTV": [
                368
            ],
            "reserveToken": [
                285
            ],
            "reserveToken_id": [
                283
            ],
            "sellFeeBps": [
                368
            ],
            "status": [
                365
            ],
            "totalSupplyFormatted": [
                283
            ],
            "totalSupplyRaw": [
                368
            ],
            "trades": [
                293
            ],
            "tradingFeeBps": [
                368
            ],
            "__typename": [
                281
            ]
        },
        "Market_max_order_by": {
            "buyFeeBps": [
                369
            ],
            "createdAt": [
                369
            ],
            "creator_id": [
                369
            ],
            "currentPriceFormatted": [
                369
            ],
            "currentPriceRaw": [
                369
            ],
            "db_write_timestamp": [
                369
            ],
            "factory_id": [
                369
            ],
            "floorPriceFormatted": [
                369
            ],
            "floorPriceRaw": [
                369
            ],
            "floorSupplyFormatted": [
                369
            ],
            "floorSupplyRaw": [
                369
            ],
            "id": [
                369
            ],
            "initialFloorPriceFormatted": [
                369
            ],
            "initialFloorPriceRaw": [
                369
            ],
            "issuanceToken_id": [
                369
            ],
            "lastElevationTimestamp": [
                369
            ],
            "lastTradeTimestamp": [
                369
            ],
            "lastUpdatedAt": [
                369
            ],
            "marketSupplyFormatted": [
                369
            ],
            "marketSupplyRaw": [
                369
            ],
            "maxLTV": [
                369
            ],
            "reserveToken_id": [
                369
            ],
            "sellFeeBps": [
                369
            ],
            "status": [
                369
            ],
            "totalSupplyFormatted": [
                369
            ],
            "totalSupplyRaw": [
                369
            ],
            "tradingFeeBps": [
                369
            ],
            "__typename": [
                281
            ]
        },
        "Market_min_order_by": {
            "buyFeeBps": [
                369
            ],
            "createdAt": [
                369
            ],
            "creator_id": [
                369
            ],
            "currentPriceFormatted": [
                369
            ],
            "currentPriceRaw": [
                369
            ],
            "db_write_timestamp": [
                369
            ],
            "factory_id": [
                369
            ],
            "floorPriceFormatted": [
                369
            ],
            "floorPriceRaw": [
                369
            ],
            "floorSupplyFormatted": [
                369
            ],
            "floorSupplyRaw": [
                369
            ],
            "id": [
                369
            ],
            "initialFloorPriceFormatted": [
                369
            ],
            "initialFloorPriceRaw": [
                369
            ],
            "issuanceToken_id": [
                369
            ],
            "lastElevationTimestamp": [
                369
            ],
            "lastTradeTimestamp": [
                369
            ],
            "lastUpdatedAt": [
                369
            ],
            "marketSupplyFormatted": [
                369
            ],
            "marketSupplyRaw": [
                369
            ],
            "maxLTV": [
                369
            ],
            "reserveToken_id": [
                369
            ],
            "sellFeeBps": [
                369
            ],
            "status": [
                369
            ],
            "totalSupplyFormatted": [
                369
            ],
            "totalSupplyRaw": [
                369
            ],
            "tradingFeeBps": [
                369
            ],
            "__typename": [
                281
            ]
        },
        "Market_order_by": {
            "buyFeeBps": [
                369
            ],
            "createdAt": [
                369
            ],
            "creator_id": [
                369
            ],
            "currentPriceFormatted": [
                369
            ],
            "currentPriceRaw": [
                369
            ],
            "db_write_timestamp": [
                369
            ],
            "factory_id": [
                369
            ],
            "floorElevations_aggregate": [
                55
            ],
            "floorPriceFormatted": [
                369
            ],
            "floorPriceRaw": [
                369
            ],
            "floorSupplyFormatted": [
                369
            ],
            "floorSupplyRaw": [
                369
            ],
            "id": [
                369
            ],
            "initialFloorPriceFormatted": [
                369
            ],
            "initialFloorPriceRaw": [
                369
            ],
            "isBuyOpen": [
                369
            ],
            "isSellOpen": [
                369
            ],
            "issuanceToken": [
                286
            ],
            "issuanceToken_id": [
                369
            ],
            "lastElevationTimestamp": [
                369
            ],
            "lastTradeTimestamp": [
                369
            ],
            "lastUpdatedAt": [
                369
            ],
            "marketSupplyFormatted": [
                369
            ],
            "marketSupplyRaw": [
                369
            ],
            "maxLTV": [
                369
            ],
            "reserveToken": [
                286
            ],
            "reserveToken_id": [
                369
            ],
            "sellFeeBps": [
                369
            ],
            "status": [
                369
            ],
            "totalSupplyFormatted": [
                369
            ],
            "totalSupplyRaw": [
                369
            ],
            "trades_aggregate": [
                291
            ],
            "tradingFeeBps": [
                369
            ],
            "__typename": [
                281
            ]
        },
        "Market_select_column": {},
        "Market_stddev_order_by": {
            "buyFeeBps": [
                369
            ],
            "createdAt": [
                369
            ],
            "currentPriceRaw": [
                369
            ],
            "floorPriceRaw": [
                369
            ],
            "floorSupplyRaw": [
                369
            ],
            "initialFloorPriceRaw": [
                369
            ],
            "lastElevationTimestamp": [
                369
            ],
            "lastTradeTimestamp": [
                369
            ],
            "lastUpdatedAt": [
                369
            ],
            "marketSupplyRaw": [
                369
            ],
            "maxLTV": [
                369
            ],
            "sellFeeBps": [
                369
            ],
            "totalSupplyRaw": [
                369
            ],
            "tradingFeeBps": [
                369
            ],
            "__typename": [
                281
            ]
        },
        "Market_stddev_pop_order_by": {
            "buyFeeBps": [
                369
            ],
            "createdAt": [
                369
            ],
            "currentPriceRaw": [
                369
            ],
            "floorPriceRaw": [
                369
            ],
            "floorSupplyRaw": [
                369
            ],
            "initialFloorPriceRaw": [
                369
            ],
            "lastElevationTimestamp": [
                369
            ],
            "lastTradeTimestamp": [
                369
            ],
            "lastUpdatedAt": [
                369
            ],
            "marketSupplyRaw": [
                369
            ],
            "maxLTV": [
                369
            ],
            "sellFeeBps": [
                369
            ],
            "totalSupplyRaw": [
                369
            ],
            "tradingFeeBps": [
                369
            ],
            "__typename": [
                281
            ]
        },
        "Market_stddev_samp_order_by": {
            "buyFeeBps": [
                369
            ],
            "createdAt": [
                369
            ],
            "currentPriceRaw": [
                369
            ],
            "floorPriceRaw": [
                369
            ],
            "floorSupplyRaw": [
                369
            ],
            "initialFloorPriceRaw": [
                369
            ],
            "lastElevationTimestamp": [
                369
            ],
            "lastTradeTimestamp": [
                369
            ],
            "lastUpdatedAt": [
                369
            ],
            "marketSupplyRaw": [
                369
            ],
            "maxLTV": [
                369
            ],
            "sellFeeBps": [
                369
            ],
            "totalSupplyRaw": [
                369
            ],
            "tradingFeeBps": [
                369
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
                340
            ],
            "__typename": [
                281
            ]
        },
        "Market_stream_cursor_value_input": {
            "buyFeeBps": [
                366
            ],
            "createdAt": [
                366
            ],
            "creator_id": [
                281
            ],
            "currentPriceFormatted": [
                281
            ],
            "currentPriceRaw": [
                366
            ],
            "db_write_timestamp": [
                386
            ],
            "factory_id": [
                281
            ],
            "floorPriceFormatted": [
                281
            ],
            "floorPriceRaw": [
                366
            ],
            "floorSupplyFormatted": [
                281
            ],
            "floorSupplyRaw": [
                366
            ],
            "id": [
                281
            ],
            "initialFloorPriceFormatted": [
                281
            ],
            "initialFloorPriceRaw": [
                366
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
                366
            ],
            "lastTradeTimestamp": [
                366
            ],
            "lastUpdatedAt": [
                366
            ],
            "marketSupplyFormatted": [
                281
            ],
            "marketSupplyRaw": [
                366
            ],
            "maxLTV": [
                366
            ],
            "reserveToken_id": [
                281
            ],
            "sellFeeBps": [
                366
            ],
            "status": [
                364
            ],
            "totalSupplyFormatted": [
                281
            ],
            "totalSupplyRaw": [
                366
            ],
            "tradingFeeBps": [
                366
            ],
            "__typename": [
                281
            ]
        },
        "Market_sum_order_by": {
            "buyFeeBps": [
                369
            ],
            "createdAt": [
                369
            ],
            "currentPriceRaw": [
                369
            ],
            "floorPriceRaw": [
                369
            ],
            "floorSupplyRaw": [
                369
            ],
            "initialFloorPriceRaw": [
                369
            ],
            "lastElevationTimestamp": [
                369
            ],
            "lastTradeTimestamp": [
                369
            ],
            "lastUpdatedAt": [
                369
            ],
            "marketSupplyRaw": [
                369
            ],
            "maxLTV": [
                369
            ],
            "sellFeeBps": [
                369
            ],
            "totalSupplyRaw": [
                369
            ],
            "tradingFeeBps": [
                369
            ],
            "__typename": [
                281
            ]
        },
        "Market_var_pop_order_by": {
            "buyFeeBps": [
                369
            ],
            "createdAt": [
                369
            ],
            "currentPriceRaw": [
                369
            ],
            "floorPriceRaw": [
                369
            ],
            "floorSupplyRaw": [
                369
            ],
            "initialFloorPriceRaw": [
                369
            ],
            "lastElevationTimestamp": [
                369
            ],
            "lastTradeTimestamp": [
                369
            ],
            "lastUpdatedAt": [
                369
            ],
            "marketSupplyRaw": [
                369
            ],
            "maxLTV": [
                369
            ],
            "sellFeeBps": [
                369
            ],
            "totalSupplyRaw": [
                369
            ],
            "tradingFeeBps": [
                369
            ],
            "__typename": [
                281
            ]
        },
        "Market_var_samp_order_by": {
            "buyFeeBps": [
                369
            ],
            "createdAt": [
                369
            ],
            "currentPriceRaw": [
                369
            ],
            "floorPriceRaw": [
                369
            ],
            "floorSupplyRaw": [
                369
            ],
            "initialFloorPriceRaw": [
                369
            ],
            "lastElevationTimestamp": [
                369
            ],
            "lastTradeTimestamp": [
                369
            ],
            "lastUpdatedAt": [
                369
            ],
            "marketSupplyRaw": [
                369
            ],
            "maxLTV": [
                369
            ],
            "sellFeeBps": [
                369
            ],
            "totalSupplyRaw": [
                369
            ],
            "tradingFeeBps": [
                369
            ],
            "__typename": [
                281
            ]
        },
        "Market_variance_order_by": {
            "buyFeeBps": [
                369
            ],
            "createdAt": [
                369
            ],
            "currentPriceRaw": [
                369
            ],
            "floorPriceRaw": [
                369
            ],
            "floorSupplyRaw": [
                369
            ],
            "initialFloorPriceRaw": [
                369
            ],
            "lastElevationTimestamp": [
                369
            ],
            "lastTradeTimestamp": [
                369
            ],
            "lastUpdatedAt": [
                369
            ],
            "marketSupplyRaw": [
                369
            ],
            "maxLTV": [
                369
            ],
            "sellFeeBps": [
                369
            ],
            "totalSupplyRaw": [
                369
            ],
            "tradingFeeBps": [
                369
            ],
            "__typename": [
                281
            ]
        },
        "ModuleAddress": {
            "createdAt": [
                366
            ],
            "db_write_timestamp": [
                386
            ],
            "id": [
                281
            ],
            "lastUpdatedAt": [
                366
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
                368
            ],
            "db_write_timestamp": [
                387
            ],
            "id": [
                283
            ],
            "lastUpdatedAt": [
                368
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
                369
            ],
            "db_write_timestamp": [
                369
            ],
            "id": [
                369
            ],
            "lastUpdatedAt": [
                369
            ],
            "market_id": [
                369
            ],
            "moduleType": [
                369
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
                340
            ],
            "__typename": [
                281
            ]
        },
        "ModuleAddress_stream_cursor_value_input": {
            "createdAt": [
                366
            ],
            "db_write_timestamp": [
                386
            ],
            "id": [
                281
            ],
            "lastUpdatedAt": [
                366
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
                366
            ],
            "creditFacility": [
                281
            ],
            "db_write_timestamp": [
                386
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
                366
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
                368
            ],
            "creditFacility": [
                283
            ],
            "db_write_timestamp": [
                387
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
                368
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
                369
            ],
            "createdAt": [
                369
            ],
            "creditFacility": [
                369
            ],
            "db_write_timestamp": [
                369
            ],
            "feeTreasury": [
                369
            ],
            "floor": [
                369
            ],
            "id": [
                369
            ],
            "lastUpdatedAt": [
                369
            ],
            "presale": [
                369
            ],
            "staking": [
                369
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
                340
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
                366
            ],
            "creditFacility": [
                281
            ],
            "db_write_timestamp": [
                386
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
                366
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
                366
            ],
            "createdAt": [
                366
            ],
            "currentState": [
                83
            ],
            "db_write_timestamp": [
                386
            ],
            "endTime": [
                366
            ],
            "feeTreasury": [
                281
            ],
            "globalDepositCapFormatted": [
                281
            ],
            "globalDepositCapRaw": [
                366
            ],
            "id": [
                281
            ],
            "lastUpdatedAt": [
                366
            ],
            "lendingFacility": [
                281
            ],
            "market_id": [
                281
            ],
            "maxLeverage": [
                366
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
                366
            ],
            "priceBreakpointOffsets": [
                83
            ],
            "priceBreakpointsFlat": [
                366
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
                366
            ],
            "timeSafeguardTs": [
                366
            ],
            "totalParticipants": [
                366
            ],
            "totalRaisedFormatted": [
                281
            ],
            "totalRaisedRaw": [
                366
            ],
            "whitelistSize": [
                366
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
                367
            ],
            "createdAt": [
                368
            ],
            "currentState": [
                85
            ],
            "db_write_timestamp": [
                387
            ],
            "endTime": [
                368
            ],
            "feeTreasury": [
                283
            ],
            "globalDepositCapFormatted": [
                283
            ],
            "globalDepositCapRaw": [
                368
            ],
            "id": [
                283
            ],
            "lastUpdatedAt": [
                368
            ],
            "lendingFacility": [
                283
            ],
            "market_id": [
                283
            ],
            "maxLeverage": [
                368
            ],
            "participations": [
                187
            ],
            "perAddressDepositCapFormatted": [
                283
            ],
            "perAddressDepositCapRaw": [
                368
            ],
            "priceBreakpointOffsets": [
                84
            ],
            "priceBreakpointsFlat": [
                367
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
                368
            ],
            "timeSafeguardTs": [
                368
            ],
            "totalParticipants": [
                368
            ],
            "totalRaisedFormatted": [
                283
            ],
            "totalRaisedRaw": [
                368
            ],
            "whitelistSize": [
                368
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
                369
            ],
            "claims_aggregate": [
                168
            ],
            "commissionBps": [
                369
            ],
            "createdAt": [
                369
            ],
            "currentState": [
                369
            ],
            "db_write_timestamp": [
                369
            ],
            "endTime": [
                369
            ],
            "feeTreasury": [
                369
            ],
            "globalDepositCapFormatted": [
                369
            ],
            "globalDepositCapRaw": [
                369
            ],
            "id": [
                369
            ],
            "lastUpdatedAt": [
                369
            ],
            "lendingFacility": [
                369
            ],
            "market_id": [
                369
            ],
            "maxLeverage": [
                369
            ],
            "participations_aggregate": [
                185
            ],
            "perAddressDepositCapFormatted": [
                369
            ],
            "perAddressDepositCapRaw": [
                369
            ],
            "priceBreakpointOffsets": [
                369
            ],
            "priceBreakpointsFlat": [
                369
            ],
            "purchaseToken": [
                286
            ],
            "purchaseToken_id": [
                369
            ],
            "saleToken": [
                286
            ],
            "saleToken_id": [
                369
            ],
            "startTime": [
                369
            ],
            "timeSafeguardTs": [
                369
            ],
            "totalParticipants": [
                369
            ],
            "totalRaisedFormatted": [
                369
            ],
            "totalRaisedRaw": [
                369
            ],
            "whitelistSize": [
                369
            ],
            "whitelistedAddresses": [
                369
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
                340
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
                366
            ],
            "createdAt": [
                366
            ],
            "currentState": [
                83
            ],
            "db_write_timestamp": [
                386
            ],
            "endTime": [
                366
            ],
            "feeTreasury": [
                281
            ],
            "globalDepositCapFormatted": [
                281
            ],
            "globalDepositCapRaw": [
                366
            ],
            "id": [
                281
            ],
            "lastUpdatedAt": [
                366
            ],
            "lendingFacility": [
                281
            ],
            "market_id": [
                281
            ],
            "maxLeverage": [
                366
            ],
            "perAddressDepositCapFormatted": [
                281
            ],
            "perAddressDepositCapRaw": [
                366
            ],
            "priceBreakpointOffsets": [
                83
            ],
            "priceBreakpointsFlat": [
                366
            ],
            "purchaseToken_id": [
                281
            ],
            "saleToken_id": [
                281
            ],
            "startTime": [
                366
            ],
            "timeSafeguardTs": [
                366
            ],
            "totalParticipants": [
                366
            ],
            "totalRaisedFormatted": [
                281
            ],
            "totalRaisedRaw": [
                366
            ],
            "whitelistSize": [
                366
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
                366
            ],
            "claimType": [
                376
            ],
            "db_write_timestamp": [
                386
            ],
            "id": [
                281
            ],
            "loanId": [
                366
            ],
            "positionId": [
                366
            ],
            "presale_id": [
                281
            ],
            "timestamp": [
                366
            ],
            "trancheIndex": [
                366
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
                369
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
                369
            ],
            "loanId": [
                369
            ],
            "positionId": [
                369
            ],
            "timestamp": [
                369
            ],
            "trancheIndex": [
                369
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
                368
            ],
            "claimType": [
                377
            ],
            "db_write_timestamp": [
                387
            ],
            "id": [
                283
            ],
            "loanId": [
                368
            ],
            "positionId": [
                368
            ],
            "presale_id": [
                283
            ],
            "timestamp": [
                368
            ],
            "trancheIndex": [
                368
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
                369
            ],
            "amountRaw": [
                369
            ],
            "claimType": [
                369
            ],
            "db_write_timestamp": [
                369
            ],
            "id": [
                369
            ],
            "loanId": [
                369
            ],
            "positionId": [
                369
            ],
            "presale_id": [
                369
            ],
            "timestamp": [
                369
            ],
            "trancheIndex": [
                369
            ],
            "transactionHash": [
                369
            ],
            "__typename": [
                281
            ]
        },
        "PresaleClaim_min_order_by": {
            "amountFormatted": [
                369
            ],
            "amountRaw": [
                369
            ],
            "claimType": [
                369
            ],
            "db_write_timestamp": [
                369
            ],
            "id": [
                369
            ],
            "loanId": [
                369
            ],
            "positionId": [
                369
            ],
            "presale_id": [
                369
            ],
            "timestamp": [
                369
            ],
            "trancheIndex": [
                369
            ],
            "transactionHash": [
                369
            ],
            "__typename": [
                281
            ]
        },
        "PresaleClaim_order_by": {
            "amountFormatted": [
                369
            ],
            "amountRaw": [
                369
            ],
            "claimType": [
                369
            ],
            "db_write_timestamp": [
                369
            ],
            "id": [
                369
            ],
            "loanId": [
                369
            ],
            "positionId": [
                369
            ],
            "presale_id": [
                369
            ],
            "timestamp": [
                369
            ],
            "trancheIndex": [
                369
            ],
            "transactionHash": [
                369
            ],
            "__typename": [
                281
            ]
        },
        "PresaleClaim_select_column": {},
        "PresaleClaim_stddev_order_by": {
            "amountRaw": [
                369
            ],
            "loanId": [
                369
            ],
            "positionId": [
                369
            ],
            "timestamp": [
                369
            ],
            "trancheIndex": [
                369
            ],
            "__typename": [
                281
            ]
        },
        "PresaleClaim_stddev_pop_order_by": {
            "amountRaw": [
                369
            ],
            "loanId": [
                369
            ],
            "positionId": [
                369
            ],
            "timestamp": [
                369
            ],
            "trancheIndex": [
                369
            ],
            "__typename": [
                281
            ]
        },
        "PresaleClaim_stddev_samp_order_by": {
            "amountRaw": [
                369
            ],
            "loanId": [
                369
            ],
            "positionId": [
                369
            ],
            "timestamp": [
                369
            ],
            "trancheIndex": [
                369
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
                340
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
                366
            ],
            "claimType": [
                376
            ],
            "db_write_timestamp": [
                386
            ],
            "id": [
                281
            ],
            "loanId": [
                366
            ],
            "positionId": [
                366
            ],
            "presale_id": [
                281
            ],
            "timestamp": [
                366
            ],
            "trancheIndex": [
                366
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
                369
            ],
            "loanId": [
                369
            ],
            "positionId": [
                369
            ],
            "timestamp": [
                369
            ],
            "trancheIndex": [
                369
            ],
            "__typename": [
                281
            ]
        },
        "PresaleClaim_var_pop_order_by": {
            "amountRaw": [
                369
            ],
            "loanId": [
                369
            ],
            "positionId": [
                369
            ],
            "timestamp": [
                369
            ],
            "trancheIndex": [
                369
            ],
            "__typename": [
                281
            ]
        },
        "PresaleClaim_var_samp_order_by": {
            "amountRaw": [
                369
            ],
            "loanId": [
                369
            ],
            "positionId": [
                369
            ],
            "timestamp": [
                369
            ],
            "trancheIndex": [
                369
            ],
            "__typename": [
                281
            ]
        },
        "PresaleClaim_variance_order_by": {
            "amountRaw": [
                369
            ],
            "loanId": [
                369
            ],
            "positionId": [
                369
            ],
            "timestamp": [
                369
            ],
            "trancheIndex": [
                369
            ],
            "__typename": [
                281
            ]
        },
        "PresaleParticipation": {
            "db_write_timestamp": [
                386
            ],
            "depositAmountFormatted": [
                281
            ],
            "depositAmountRaw": [
                366
            ],
            "id": [
                281
            ],
            "leverage": [
                366
            ],
            "loopCount": [
                366
            ],
            "mintedAmountFormatted": [
                281
            ],
            "mintedAmountRaw": [
                366
            ],
            "positionId": [
                366
            ],
            "presale_id": [
                281
            ],
            "timestamp": [
                366
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
                369
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
                369
            ],
            "leverage": [
                369
            ],
            "loopCount": [
                369
            ],
            "mintedAmountRaw": [
                369
            ],
            "positionId": [
                369
            ],
            "timestamp": [
                369
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
            "db_write_timestamp": [
                387
            ],
            "depositAmountFormatted": [
                283
            ],
            "depositAmountRaw": [
                368
            ],
            "id": [
                283
            ],
            "leverage": [
                368
            ],
            "loopCount": [
                368
            ],
            "mintedAmountFormatted": [
                283
            ],
            "mintedAmountRaw": [
                368
            ],
            "positionId": [
                368
            ],
            "presale_id": [
                283
            ],
            "timestamp": [
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
        "PresaleParticipation_max_order_by": {
            "db_write_timestamp": [
                369
            ],
            "depositAmountFormatted": [
                369
            ],
            "depositAmountRaw": [
                369
            ],
            "id": [
                369
            ],
            "leverage": [
                369
            ],
            "loopCount": [
                369
            ],
            "mintedAmountFormatted": [
                369
            ],
            "mintedAmountRaw": [
                369
            ],
            "positionId": [
                369
            ],
            "presale_id": [
                369
            ],
            "timestamp": [
                369
            ],
            "transactionHash": [
                369
            ],
            "user_id": [
                369
            ],
            "__typename": [
                281
            ]
        },
        "PresaleParticipation_min_order_by": {
            "db_write_timestamp": [
                369
            ],
            "depositAmountFormatted": [
                369
            ],
            "depositAmountRaw": [
                369
            ],
            "id": [
                369
            ],
            "leverage": [
                369
            ],
            "loopCount": [
                369
            ],
            "mintedAmountFormatted": [
                369
            ],
            "mintedAmountRaw": [
                369
            ],
            "positionId": [
                369
            ],
            "presale_id": [
                369
            ],
            "timestamp": [
                369
            ],
            "transactionHash": [
                369
            ],
            "user_id": [
                369
            ],
            "__typename": [
                281
            ]
        },
        "PresaleParticipation_order_by": {
            "db_write_timestamp": [
                369
            ],
            "depositAmountFormatted": [
                369
            ],
            "depositAmountRaw": [
                369
            ],
            "id": [
                369
            ],
            "leverage": [
                369
            ],
            "loopCount": [
                369
            ],
            "mintedAmountFormatted": [
                369
            ],
            "mintedAmountRaw": [
                369
            ],
            "positionId": [
                369
            ],
            "presale_id": [
                369
            ],
            "timestamp": [
                369
            ],
            "transactionHash": [
                369
            ],
            "user_id": [
                369
            ],
            "__typename": [
                281
            ]
        },
        "PresaleParticipation_select_column": {},
        "PresaleParticipation_stddev_order_by": {
            "depositAmountRaw": [
                369
            ],
            "leverage": [
                369
            ],
            "loopCount": [
                369
            ],
            "mintedAmountRaw": [
                369
            ],
            "positionId": [
                369
            ],
            "timestamp": [
                369
            ],
            "__typename": [
                281
            ]
        },
        "PresaleParticipation_stddev_pop_order_by": {
            "depositAmountRaw": [
                369
            ],
            "leverage": [
                369
            ],
            "loopCount": [
                369
            ],
            "mintedAmountRaw": [
                369
            ],
            "positionId": [
                369
            ],
            "timestamp": [
                369
            ],
            "__typename": [
                281
            ]
        },
        "PresaleParticipation_stddev_samp_order_by": {
            "depositAmountRaw": [
                369
            ],
            "leverage": [
                369
            ],
            "loopCount": [
                369
            ],
            "mintedAmountRaw": [
                369
            ],
            "positionId": [
                369
            ],
            "timestamp": [
                369
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
                340
            ],
            "__typename": [
                281
            ]
        },
        "PresaleParticipation_stream_cursor_value_input": {
            "db_write_timestamp": [
                386
            ],
            "depositAmountFormatted": [
                281
            ],
            "depositAmountRaw": [
                366
            ],
            "id": [
                281
            ],
            "leverage": [
                366
            ],
            "loopCount": [
                366
            ],
            "mintedAmountFormatted": [
                281
            ],
            "mintedAmountRaw": [
                366
            ],
            "positionId": [
                366
            ],
            "presale_id": [
                281
            ],
            "timestamp": [
                366
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
                369
            ],
            "leverage": [
                369
            ],
            "loopCount": [
                369
            ],
            "mintedAmountRaw": [
                369
            ],
            "positionId": [
                369
            ],
            "timestamp": [
                369
            ],
            "__typename": [
                281
            ]
        },
        "PresaleParticipation_var_pop_order_by": {
            "depositAmountRaw": [
                369
            ],
            "leverage": [
                369
            ],
            "loopCount": [
                369
            ],
            "mintedAmountRaw": [
                369
            ],
            "positionId": [
                369
            ],
            "timestamp": [
                369
            ],
            "__typename": [
                281
            ]
        },
        "PresaleParticipation_var_samp_order_by": {
            "depositAmountRaw": [
                369
            ],
            "leverage": [
                369
            ],
            "loopCount": [
                369
            ],
            "mintedAmountRaw": [
                369
            ],
            "positionId": [
                369
            ],
            "timestamp": [
                369
            ],
            "__typename": [
                281
            ]
        },
        "PresaleParticipation_variance_order_by": {
            "depositAmountRaw": [
                369
            ],
            "leverage": [
                369
            ],
            "loopCount": [
                369
            ],
            "mintedAmountRaw": [
                369
            ],
            "positionId": [
                369
            ],
            "timestamp": [
                369
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
                366
            ],
            "db_write_timestamp": [
                386
            ],
            "highFormatted": [
                281
            ],
            "highRaw": [
                366
            ],
            "id": [
                281
            ],
            "lowFormatted": [
                281
            ],
            "lowRaw": [
                366
            ],
            "market_id": [
                281
            ],
            "openFormatted": [
                281
            ],
            "openRaw": [
                366
            ],
            "period": [
                330
            ],
            "timestamp": [
                366
            ],
            "trades": [
                366
            ],
            "volumeFormatted": [
                281
            ],
            "volumeRaw": [
                366
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
                368
            ],
            "db_write_timestamp": [
                387
            ],
            "highFormatted": [
                283
            ],
            "highRaw": [
                368
            ],
            "id": [
                283
            ],
            "lowFormatted": [
                283
            ],
            "lowRaw": [
                368
            ],
            "market_id": [
                283
            ],
            "openFormatted": [
                283
            ],
            "openRaw": [
                368
            ],
            "period": [
                331
            ],
            "timestamp": [
                368
            ],
            "trades": [
                368
            ],
            "volumeFormatted": [
                283
            ],
            "volumeRaw": [
                368
            ],
            "__typename": [
                281
            ]
        },
        "PriceCandle_order_by": {
            "closeFormatted": [
                369
            ],
            "closeRaw": [
                369
            ],
            "db_write_timestamp": [
                369
            ],
            "highFormatted": [
                369
            ],
            "highRaw": [
                369
            ],
            "id": [
                369
            ],
            "lowFormatted": [
                369
            ],
            "lowRaw": [
                369
            ],
            "market_id": [
                369
            ],
            "openFormatted": [
                369
            ],
            "openRaw": [
                369
            ],
            "period": [
                369
            ],
            "timestamp": [
                369
            ],
            "trades": [
                369
            ],
            "volumeFormatted": [
                369
            ],
            "volumeRaw": [
                369
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
                340
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
                366
            ],
            "db_write_timestamp": [
                386
            ],
            "highFormatted": [
                281
            ],
            "highRaw": [
                366
            ],
            "id": [
                281
            ],
            "lowFormatted": [
                281
            ],
            "lowRaw": [
                366
            ],
            "market_id": [
                281
            ],
            "openFormatted": [
                281
            ],
            "openRaw": [
                366
            ],
            "period": [
                330
            ],
            "timestamp": [
                366
            ],
            "trades": [
                366
            ],
            "volumeFormatted": [
                281
            ],
            "volumeRaw": [
                366
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
                366
            ],
            "db_write_timestamp": [
                386
            ],
            "id": [
                281
            ],
            "isAdminBurned": [
                12
            ],
            "lastUpdatedAt": [
                366
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
            "db_write_timestamp": [
                386
            ],
            "grantedAt": [
                366
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
                369
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
                369
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
            "db_write_timestamp": [
                387
            ],
            "grantedAt": [
                368
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
            "db_write_timestamp": [
                369
            ],
            "grantedAt": [
                369
            ],
            "grantedBy": [
                369
            ],
            "id": [
                369
            ],
            "member": [
                369
            ],
            "role_id": [
                369
            ],
            "transactionHash": [
                369
            ],
            "__typename": [
                281
            ]
        },
        "RoleMember_min_order_by": {
            "db_write_timestamp": [
                369
            ],
            "grantedAt": [
                369
            ],
            "grantedBy": [
                369
            ],
            "id": [
                369
            ],
            "member": [
                369
            ],
            "role_id": [
                369
            ],
            "transactionHash": [
                369
            ],
            "__typename": [
                281
            ]
        },
        "RoleMember_order_by": {
            "db_write_timestamp": [
                369
            ],
            "grantedAt": [
                369
            ],
            "grantedBy": [
                369
            ],
            "id": [
                369
            ],
            "member": [
                369
            ],
            "role_id": [
                369
            ],
            "transactionHash": [
                369
            ],
            "__typename": [
                281
            ]
        },
        "RoleMember_select_column": {},
        "RoleMember_stddev_order_by": {
            "grantedAt": [
                369
            ],
            "__typename": [
                281
            ]
        },
        "RoleMember_stddev_pop_order_by": {
            "grantedAt": [
                369
            ],
            "__typename": [
                281
            ]
        },
        "RoleMember_stddev_samp_order_by": {
            "grantedAt": [
                369
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
                340
            ],
            "__typename": [
                281
            ]
        },
        "RoleMember_stream_cursor_value_input": {
            "db_write_timestamp": [
                386
            ],
            "grantedAt": [
                366
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
                369
            ],
            "__typename": [
                281
            ]
        },
        "RoleMember_var_pop_order_by": {
            "grantedAt": [
                369
            ],
            "__typename": [
                281
            ]
        },
        "RoleMember_var_samp_order_by": {
            "grantedAt": [
                369
            ],
            "__typename": [
                281
            ]
        },
        "RoleMember_variance_order_by": {
            "grantedAt": [
                369
            ],
            "__typename": [
                281
            ]
        },
        "RolePermission": {
            "addedAt": [
                366
            ],
            "db_write_timestamp": [
                386
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
                369
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
                369
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
                368
            ],
            "db_write_timestamp": [
                387
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
                369
            ],
            "db_write_timestamp": [
                369
            ],
            "id": [
                369
            ],
            "role_id": [
                369
            ],
            "selector": [
                369
            ],
            "selectorName": [
                369
            ],
            "target": [
                369
            ],
            "transactionHash": [
                369
            ],
            "__typename": [
                281
            ]
        },
        "RolePermission_min_order_by": {
            "addedAt": [
                369
            ],
            "db_write_timestamp": [
                369
            ],
            "id": [
                369
            ],
            "role_id": [
                369
            ],
            "selector": [
                369
            ],
            "selectorName": [
                369
            ],
            "target": [
                369
            ],
            "transactionHash": [
                369
            ],
            "__typename": [
                281
            ]
        },
        "RolePermission_order_by": {
            "addedAt": [
                369
            ],
            "db_write_timestamp": [
                369
            ],
            "id": [
                369
            ],
            "role_id": [
                369
            ],
            "selector": [
                369
            ],
            "selectorName": [
                369
            ],
            "target": [
                369
            ],
            "transactionHash": [
                369
            ],
            "__typename": [
                281
            ]
        },
        "RolePermission_select_column": {},
        "RolePermission_stddev_order_by": {
            "addedAt": [
                369
            ],
            "__typename": [
                281
            ]
        },
        "RolePermission_stddev_pop_order_by": {
            "addedAt": [
                369
            ],
            "__typename": [
                281
            ]
        },
        "RolePermission_stddev_samp_order_by": {
            "addedAt": [
                369
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
                340
            ],
            "__typename": [
                281
            ]
        },
        "RolePermission_stream_cursor_value_input": {
            "addedAt": [
                366
            ],
            "db_write_timestamp": [
                386
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
                369
            ],
            "__typename": [
                281
            ]
        },
        "RolePermission_var_pop_order_by": {
            "addedAt": [
                369
            ],
            "__typename": [
                281
            ]
        },
        "RolePermission_var_samp_order_by": {
            "addedAt": [
                369
            ],
            "__typename": [
                281
            ]
        },
        "RolePermission_variance_order_by": {
            "addedAt": [
                369
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
                369
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
                369
            ],
            "lastUpdatedAt": [
                369
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
                368
            ],
            "db_write_timestamp": [
                387
            ],
            "id": [
                283
            ],
            "isAdminBurned": [
                13
            ],
            "lastUpdatedAt": [
                368
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
                369
            ],
            "adminRoleName": [
                369
            ],
            "authorizer_id": [
                369
            ],
            "createdAt": [
                369
            ],
            "db_write_timestamp": [
                369
            ],
            "id": [
                369
            ],
            "lastUpdatedAt": [
                369
            ],
            "name": [
                369
            ],
            "roleId": [
                369
            ],
            "__typename": [
                281
            ]
        },
        "Role_min_order_by": {
            "adminRole": [
                369
            ],
            "adminRoleName": [
                369
            ],
            "authorizer_id": [
                369
            ],
            "createdAt": [
                369
            ],
            "db_write_timestamp": [
                369
            ],
            "id": [
                369
            ],
            "lastUpdatedAt": [
                369
            ],
            "name": [
                369
            ],
            "roleId": [
                369
            ],
            "__typename": [
                281
            ]
        },
        "Role_order_by": {
            "adminRole": [
                369
            ],
            "adminRoleName": [
                369
            ],
            "authorizer_id": [
                369
            ],
            "createdAt": [
                369
            ],
            "db_write_timestamp": [
                369
            ],
            "id": [
                369
            ],
            "isAdminBurned": [
                369
            ],
            "lastUpdatedAt": [
                369
            ],
            "members_aggregate": [
                209
            ],
            "name": [
                369
            ],
            "permissions_aggregate": [
                226
            ],
            "roleId": [
                369
            ],
            "__typename": [
                281
            ]
        },
        "Role_select_column": {},
        "Role_stddev_order_by": {
            "createdAt": [
                369
            ],
            "lastUpdatedAt": [
                369
            ],
            "__typename": [
                281
            ]
        },
        "Role_stddev_pop_order_by": {
            "createdAt": [
                369
            ],
            "lastUpdatedAt": [
                369
            ],
            "__typename": [
                281
            ]
        },
        "Role_stddev_samp_order_by": {
            "createdAt": [
                369
            ],
            "lastUpdatedAt": [
                369
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
                340
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
                366
            ],
            "db_write_timestamp": [
                386
            ],
            "id": [
                281
            ],
            "isAdminBurned": [
                12
            ],
            "lastUpdatedAt": [
                366
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
                369
            ],
            "lastUpdatedAt": [
                369
            ],
            "__typename": [
                281
            ]
        },
        "Role_var_pop_order_by": {
            "createdAt": [
                369
            ],
            "lastUpdatedAt": [
                369
            ],
            "__typename": [
                281
            ]
        },
        "Role_var_samp_order_by": {
            "createdAt": [
                369
            ],
            "lastUpdatedAt": [
                369
            ],
            "__typename": [
                281
            ]
        },
        "Role_variance_order_by": {
            "createdAt": [
                369
            ],
            "lastUpdatedAt": [
                369
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
                366
            ],
            "contract_id": [
                281
            ],
            "db_write_timestamp": [
                386
            ],
            "id": [
                281
            ],
            "lockDuration": [
                366
            ],
            "status": [
                384
            ],
            "timestamp": [
                366
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
                369
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
                369
            ],
            "lockDuration": [
                369
            ],
            "timestamp": [
                369
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
                368
            ],
            "contract_id": [
                283
            ],
            "db_write_timestamp": [
                387
            ],
            "id": [
                283
            ],
            "lockDuration": [
                368
            ],
            "status": [
                385
            ],
            "timestamp": [
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
        "Stake_max_order_by": {
            "amountFormatted": [
                369
            ],
            "amountRaw": [
                369
            ],
            "contract_id": [
                369
            ],
            "db_write_timestamp": [
                369
            ],
            "id": [
                369
            ],
            "lockDuration": [
                369
            ],
            "status": [
                369
            ],
            "timestamp": [
                369
            ],
            "transactionHash": [
                369
            ],
            "user_id": [
                369
            ],
            "__typename": [
                281
            ]
        },
        "Stake_min_order_by": {
            "amountFormatted": [
                369
            ],
            "amountRaw": [
                369
            ],
            "contract_id": [
                369
            ],
            "db_write_timestamp": [
                369
            ],
            "id": [
                369
            ],
            "lockDuration": [
                369
            ],
            "status": [
                369
            ],
            "timestamp": [
                369
            ],
            "transactionHash": [
                369
            ],
            "user_id": [
                369
            ],
            "__typename": [
                281
            ]
        },
        "Stake_order_by": {
            "amountFormatted": [
                369
            ],
            "amountRaw": [
                369
            ],
            "contract_id": [
                369
            ],
            "db_write_timestamp": [
                369
            ],
            "id": [
                369
            ],
            "lockDuration": [
                369
            ],
            "status": [
                369
            ],
            "timestamp": [
                369
            ],
            "transactionHash": [
                369
            ],
            "user_id": [
                369
            ],
            "__typename": [
                281
            ]
        },
        "Stake_select_column": {},
        "Stake_stddev_order_by": {
            "amountRaw": [
                369
            ],
            "lockDuration": [
                369
            ],
            "timestamp": [
                369
            ],
            "__typename": [
                281
            ]
        },
        "Stake_stddev_pop_order_by": {
            "amountRaw": [
                369
            ],
            "lockDuration": [
                369
            ],
            "timestamp": [
                369
            ],
            "__typename": [
                281
            ]
        },
        "Stake_stddev_samp_order_by": {
            "amountRaw": [
                369
            ],
            "lockDuration": [
                369
            ],
            "timestamp": [
                369
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
                340
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
                366
            ],
            "contract_id": [
                281
            ],
            "db_write_timestamp": [
                386
            ],
            "id": [
                281
            ],
            "lockDuration": [
                366
            ],
            "status": [
                384
            ],
            "timestamp": [
                366
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
                369
            ],
            "lockDuration": [
                369
            ],
            "timestamp": [
                369
            ],
            "__typename": [
                281
            ]
        },
        "Stake_var_pop_order_by": {
            "amountRaw": [
                369
            ],
            "lockDuration": [
                369
            ],
            "timestamp": [
                369
            ],
            "__typename": [
                281
            ]
        },
        "Stake_var_samp_order_by": {
            "amountRaw": [
                369
            ],
            "lockDuration": [
                369
            ],
            "timestamp": [
                369
            ],
            "__typename": [
                281
            ]
        },
        "Stake_variance_order_by": {
            "amountRaw": [
                369
            ],
            "lockDuration": [
                369
            ],
            "timestamp": [
                369
            ],
            "__typename": [
                281
            ]
        },
        "StakingContract": {
            "createdAt": [
                366
            ],
            "db_write_timestamp": [
                386
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
                366
            ],
            "totalStakedFormatted": [
                281
            ],
            "totalStakedRaw": [
                366
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
                368
            ],
            "db_write_timestamp": [
                387
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
                368
            ],
            "totalStakedFormatted": [
                283
            ],
            "totalStakedRaw": [
                368
            ],
            "__typename": [
                281
            ]
        },
        "StakingContract_order_by": {
            "createdAt": [
                369
            ],
            "db_write_timestamp": [
                369
            ],
            "id": [
                369
            ],
            "rewardToken_id": [
                369
            ],
            "stakes_aggregate": [
                259
            ],
            "stakingToken_id": [
                369
            ],
            "totalRewardsFormatted": [
                369
            ],
            "totalRewardsRaw": [
                369
            ],
            "totalStakedFormatted": [
                369
            ],
            "totalStakedRaw": [
                369
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
                340
            ],
            "__typename": [
                281
            ]
        },
        "StakingContract_stream_cursor_value_input": {
            "createdAt": [
                366
            ],
            "db_write_timestamp": [
                386
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
                366
            ],
            "totalStakedFormatted": [
                281
            ],
            "totalStakedRaw": [
                366
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
            "db_write_timestamp": [
                386
            ],
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
                366
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
            "db_write_timestamp": [
                387
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
                368
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
            "db_write_timestamp": [
                369
            ],
            "decimals": [
                369
            ],
            "id": [
                369
            ],
            "maxSupplyFormatted": [
                369
            ],
            "maxSupplyRaw": [
                369
            ],
            "name": [
                369
            ],
            "symbol": [
                369
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
                340
            ],
            "__typename": [
                281
            ]
        },
        "Token_stream_cursor_value_input": {
            "db_write_timestamp": [
                386
            ],
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
                366
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
            "db_write_timestamp": [
                386
            ],
            "feeFormatted": [
                281
            ],
            "feeRaw": [
                366
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
                366
            ],
            "reserveAmountFormatted": [
                281
            ],
            "reserveAmountRaw": [
                366
            ],
            "timestamp": [
                366
            ],
            "tokenAmountFormatted": [
                281
            ],
            "tokenAmountRaw": [
                366
            ],
            "tradeType": [
                390
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
                369
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
                369
            ],
            "newPriceRaw": [
                369
            ],
            "reserveAmountRaw": [
                369
            ],
            "timestamp": [
                369
            ],
            "tokenAmountRaw": [
                369
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
            "db_write_timestamp": [
                387
            ],
            "feeFormatted": [
                283
            ],
            "feeRaw": [
                368
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
                368
            ],
            "reserveAmountFormatted": [
                283
            ],
            "reserveAmountRaw": [
                368
            ],
            "timestamp": [
                368
            ],
            "tokenAmountFormatted": [
                283
            ],
            "tokenAmountRaw": [
                368
            ],
            "tradeType": [
                391
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
            "db_write_timestamp": [
                369
            ],
            "feeFormatted": [
                369
            ],
            "feeRaw": [
                369
            ],
            "id": [
                369
            ],
            "market_id": [
                369
            ],
            "newPriceFormatted": [
                369
            ],
            "newPriceRaw": [
                369
            ],
            "reserveAmountFormatted": [
                369
            ],
            "reserveAmountRaw": [
                369
            ],
            "timestamp": [
                369
            ],
            "tokenAmountFormatted": [
                369
            ],
            "tokenAmountRaw": [
                369
            ],
            "tradeType": [
                369
            ],
            "transactionHash": [
                369
            ],
            "user_id": [
                369
            ],
            "__typename": [
                281
            ]
        },
        "Trade_min_order_by": {
            "db_write_timestamp": [
                369
            ],
            "feeFormatted": [
                369
            ],
            "feeRaw": [
                369
            ],
            "id": [
                369
            ],
            "market_id": [
                369
            ],
            "newPriceFormatted": [
                369
            ],
            "newPriceRaw": [
                369
            ],
            "reserveAmountFormatted": [
                369
            ],
            "reserveAmountRaw": [
                369
            ],
            "timestamp": [
                369
            ],
            "tokenAmountFormatted": [
                369
            ],
            "tokenAmountRaw": [
                369
            ],
            "tradeType": [
                369
            ],
            "transactionHash": [
                369
            ],
            "user_id": [
                369
            ],
            "__typename": [
                281
            ]
        },
        "Trade_order_by": {
            "db_write_timestamp": [
                369
            ],
            "feeFormatted": [
                369
            ],
            "feeRaw": [
                369
            ],
            "id": [
                369
            ],
            "market_id": [
                369
            ],
            "newPriceFormatted": [
                369
            ],
            "newPriceRaw": [
                369
            ],
            "reserveAmountFormatted": [
                369
            ],
            "reserveAmountRaw": [
                369
            ],
            "timestamp": [
                369
            ],
            "tokenAmountFormatted": [
                369
            ],
            "tokenAmountRaw": [
                369
            ],
            "tradeType": [
                369
            ],
            "transactionHash": [
                369
            ],
            "user_id": [
                369
            ],
            "__typename": [
                281
            ]
        },
        "Trade_select_column": {},
        "Trade_stddev_order_by": {
            "feeRaw": [
                369
            ],
            "newPriceRaw": [
                369
            ],
            "reserveAmountRaw": [
                369
            ],
            "timestamp": [
                369
            ],
            "tokenAmountRaw": [
                369
            ],
            "__typename": [
                281
            ]
        },
        "Trade_stddev_pop_order_by": {
            "feeRaw": [
                369
            ],
            "newPriceRaw": [
                369
            ],
            "reserveAmountRaw": [
                369
            ],
            "timestamp": [
                369
            ],
            "tokenAmountRaw": [
                369
            ],
            "__typename": [
                281
            ]
        },
        "Trade_stddev_samp_order_by": {
            "feeRaw": [
                369
            ],
            "newPriceRaw": [
                369
            ],
            "reserveAmountRaw": [
                369
            ],
            "timestamp": [
                369
            ],
            "tokenAmountRaw": [
                369
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
                340
            ],
            "__typename": [
                281
            ]
        },
        "Trade_stream_cursor_value_input": {
            "db_write_timestamp": [
                386
            ],
            "feeFormatted": [
                281
            ],
            "feeRaw": [
                366
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
                366
            ],
            "reserveAmountFormatted": [
                281
            ],
            "reserveAmountRaw": [
                366
            ],
            "timestamp": [
                366
            ],
            "tokenAmountFormatted": [
                281
            ],
            "tokenAmountRaw": [
                366
            ],
            "tradeType": [
                390
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
                369
            ],
            "newPriceRaw": [
                369
            ],
            "reserveAmountRaw": [
                369
            ],
            "timestamp": [
                369
            ],
            "tokenAmountRaw": [
                369
            ],
            "__typename": [
                281
            ]
        },
        "Trade_var_pop_order_by": {
            "feeRaw": [
                369
            ],
            "newPriceRaw": [
                369
            ],
            "reserveAmountRaw": [
                369
            ],
            "timestamp": [
                369
            ],
            "tokenAmountRaw": [
                369
            ],
            "__typename": [
                281
            ]
        },
        "Trade_var_samp_order_by": {
            "feeRaw": [
                369
            ],
            "newPriceRaw": [
                369
            ],
            "reserveAmountRaw": [
                369
            ],
            "timestamp": [
                369
            ],
            "tokenAmountRaw": [
                369
            ],
            "__typename": [
                281
            ]
        },
        "Trade_variance_order_by": {
            "feeRaw": [
                369
            ],
            "newPriceRaw": [
                369
            ],
            "reserveAmountRaw": [
                369
            ],
            "timestamp": [
                369
            ],
            "tokenAmountRaw": [
                369
            ],
            "__typename": [
                281
            ]
        },
        "Treasury": {
            "createdAt": [
                366
            ],
            "db_write_timestamp": [
                386
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
                366
            ],
            "market_id": [
                281
            ],
            "totalFeesDistributedFormatted": [
                281
            ],
            "totalFeesDistributedRaw": [
                366
            ],
            "totalFeesReceivedFormatted": [
                281
            ],
            "totalFeesReceivedRaw": [
                366
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
                368
            ],
            "db_write_timestamp": [
                387
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
                368
            ],
            "market_id": [
                283
            ],
            "totalFeesDistributedFormatted": [
                283
            ],
            "totalFeesDistributedRaw": [
                368
            ],
            "totalFeesReceivedFormatted": [
                283
            ],
            "totalFeesReceivedRaw": [
                368
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
                369
            ],
            "db_write_timestamp": [
                369
            ],
            "feeSplitterPayments_aggregate": [
                21
            ],
            "feeSplitterReceipts_aggregate": [
                38
            ],
            "id": [
                369
            ],
            "lastUpdatedAt": [
                369
            ],
            "market_id": [
                369
            ],
            "totalFeesDistributedFormatted": [
                369
            ],
            "totalFeesDistributedRaw": [
                369
            ],
            "totalFeesReceivedFormatted": [
                369
            ],
            "totalFeesReceivedRaw": [
                369
            ],
            "treasuryAddress": [
                369
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
                340
            ],
            "__typename": [
                281
            ]
        },
        "Treasury_stream_cursor_value_input": {
            "createdAt": [
                366
            ],
            "db_write_timestamp": [
                386
            ],
            "id": [
                281
            ],
            "lastUpdatedAt": [
                366
            ],
            "market_id": [
                281
            ],
            "totalFeesDistributedFormatted": [
                281
            ],
            "totalFeesDistributedRaw": [
                366
            ],
            "totalFeesReceivedFormatted": [
                281
            ],
            "totalFeesReceivedRaw": [
                366
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
                366
            ],
            "db_write_timestamp": [
                386
            ],
            "id": [
                281
            ],
            "lastUpdatedAt": [
                366
            ],
            "lockedCollateralFormatted": [
                281
            ],
            "lockedCollateralRaw": [
                366
            ],
            "market_id": [
                281
            ],
            "netFTokenChangeFormatted": [
                281
            ],
            "netFTokenChangeRaw": [
                366
            ],
            "presaleDepositFormatted": [
                281
            ],
            "presaleDepositRaw": [
                366
            ],
            "presaleLeverage": [
                366
            ],
            "stakedAmountFormatted": [
                281
            ],
            "stakedAmountRaw": [
                366
            ],
            "totalDebtFormatted": [
                281
            ],
            "totalDebtRaw": [
                366
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
                369
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
                369
            ],
            "lastUpdatedAt": [
                369
            ],
            "lockedCollateralRaw": [
                369
            ],
            "netFTokenChangeRaw": [
                369
            ],
            "presaleDepositRaw": [
                369
            ],
            "presaleLeverage": [
                369
            ],
            "stakedAmountRaw": [
                369
            ],
            "totalDebtRaw": [
                369
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
                368
            ],
            "db_write_timestamp": [
                387
            ],
            "id": [
                283
            ],
            "lastUpdatedAt": [
                368
            ],
            "lockedCollateralFormatted": [
                283
            ],
            "lockedCollateralRaw": [
                368
            ],
            "market_id": [
                283
            ],
            "netFTokenChangeFormatted": [
                283
            ],
            "netFTokenChangeRaw": [
                368
            ],
            "presaleDepositFormatted": [
                283
            ],
            "presaleDepositRaw": [
                368
            ],
            "presaleLeverage": [
                368
            ],
            "stakedAmountFormatted": [
                283
            ],
            "stakedAmountRaw": [
                368
            ],
            "totalDebtFormatted": [
                283
            ],
            "totalDebtRaw": [
                368
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
                369
            ],
            "claimableRewardsRaw": [
                369
            ],
            "db_write_timestamp": [
                369
            ],
            "id": [
                369
            ],
            "lastUpdatedAt": [
                369
            ],
            "lockedCollateralFormatted": [
                369
            ],
            "lockedCollateralRaw": [
                369
            ],
            "market_id": [
                369
            ],
            "netFTokenChangeFormatted": [
                369
            ],
            "netFTokenChangeRaw": [
                369
            ],
            "presaleDepositFormatted": [
                369
            ],
            "presaleDepositRaw": [
                369
            ],
            "presaleLeverage": [
                369
            ],
            "stakedAmountFormatted": [
                369
            ],
            "stakedAmountRaw": [
                369
            ],
            "totalDebtFormatted": [
                369
            ],
            "totalDebtRaw": [
                369
            ],
            "user_id": [
                369
            ],
            "__typename": [
                281
            ]
        },
        "UserMarketPosition_min_order_by": {
            "claimableRewardsFormatted": [
                369
            ],
            "claimableRewardsRaw": [
                369
            ],
            "db_write_timestamp": [
                369
            ],
            "id": [
                369
            ],
            "lastUpdatedAt": [
                369
            ],
            "lockedCollateralFormatted": [
                369
            ],
            "lockedCollateralRaw": [
                369
            ],
            "market_id": [
                369
            ],
            "netFTokenChangeFormatted": [
                369
            ],
            "netFTokenChangeRaw": [
                369
            ],
            "presaleDepositFormatted": [
                369
            ],
            "presaleDepositRaw": [
                369
            ],
            "presaleLeverage": [
                369
            ],
            "stakedAmountFormatted": [
                369
            ],
            "stakedAmountRaw": [
                369
            ],
            "totalDebtFormatted": [
                369
            ],
            "totalDebtRaw": [
                369
            ],
            "user_id": [
                369
            ],
            "__typename": [
                281
            ]
        },
        "UserMarketPosition_order_by": {
            "claimableRewardsFormatted": [
                369
            ],
            "claimableRewardsRaw": [
                369
            ],
            "db_write_timestamp": [
                369
            ],
            "id": [
                369
            ],
            "lastUpdatedAt": [
                369
            ],
            "lockedCollateralFormatted": [
                369
            ],
            "lockedCollateralRaw": [
                369
            ],
            "market_id": [
                369
            ],
            "netFTokenChangeFormatted": [
                369
            ],
            "netFTokenChangeRaw": [
                369
            ],
            "presaleDepositFormatted": [
                369
            ],
            "presaleDepositRaw": [
                369
            ],
            "presaleLeverage": [
                369
            ],
            "stakedAmountFormatted": [
                369
            ],
            "stakedAmountRaw": [
                369
            ],
            "totalDebtFormatted": [
                369
            ],
            "totalDebtRaw": [
                369
            ],
            "user_id": [
                369
            ],
            "__typename": [
                281
            ]
        },
        "UserMarketPosition_select_column": {},
        "UserMarketPosition_stddev_order_by": {
            "claimableRewardsRaw": [
                369
            ],
            "lastUpdatedAt": [
                369
            ],
            "lockedCollateralRaw": [
                369
            ],
            "netFTokenChangeRaw": [
                369
            ],
            "presaleDepositRaw": [
                369
            ],
            "presaleLeverage": [
                369
            ],
            "stakedAmountRaw": [
                369
            ],
            "totalDebtRaw": [
                369
            ],
            "__typename": [
                281
            ]
        },
        "UserMarketPosition_stddev_pop_order_by": {
            "claimableRewardsRaw": [
                369
            ],
            "lastUpdatedAt": [
                369
            ],
            "lockedCollateralRaw": [
                369
            ],
            "netFTokenChangeRaw": [
                369
            ],
            "presaleDepositRaw": [
                369
            ],
            "presaleLeverage": [
                369
            ],
            "stakedAmountRaw": [
                369
            ],
            "totalDebtRaw": [
                369
            ],
            "__typename": [
                281
            ]
        },
        "UserMarketPosition_stddev_samp_order_by": {
            "claimableRewardsRaw": [
                369
            ],
            "lastUpdatedAt": [
                369
            ],
            "lockedCollateralRaw": [
                369
            ],
            "netFTokenChangeRaw": [
                369
            ],
            "presaleDepositRaw": [
                369
            ],
            "presaleLeverage": [
                369
            ],
            "stakedAmountRaw": [
                369
            ],
            "totalDebtRaw": [
                369
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
                340
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
                366
            ],
            "db_write_timestamp": [
                386
            ],
            "id": [
                281
            ],
            "lastUpdatedAt": [
                366
            ],
            "lockedCollateralFormatted": [
                281
            ],
            "lockedCollateralRaw": [
                366
            ],
            "market_id": [
                281
            ],
            "netFTokenChangeFormatted": [
                281
            ],
            "netFTokenChangeRaw": [
                366
            ],
            "presaleDepositFormatted": [
                281
            ],
            "presaleDepositRaw": [
                366
            ],
            "presaleLeverage": [
                366
            ],
            "stakedAmountFormatted": [
                281
            ],
            "stakedAmountRaw": [
                366
            ],
            "totalDebtFormatted": [
                281
            ],
            "totalDebtRaw": [
                366
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
                369
            ],
            "lastUpdatedAt": [
                369
            ],
            "lockedCollateralRaw": [
                369
            ],
            "netFTokenChangeRaw": [
                369
            ],
            "presaleDepositRaw": [
                369
            ],
            "presaleLeverage": [
                369
            ],
            "stakedAmountRaw": [
                369
            ],
            "totalDebtRaw": [
                369
            ],
            "__typename": [
                281
            ]
        },
        "UserMarketPosition_var_pop_order_by": {
            "claimableRewardsRaw": [
                369
            ],
            "lastUpdatedAt": [
                369
            ],
            "lockedCollateralRaw": [
                369
            ],
            "netFTokenChangeRaw": [
                369
            ],
            "presaleDepositRaw": [
                369
            ],
            "presaleLeverage": [
                369
            ],
            "stakedAmountRaw": [
                369
            ],
            "totalDebtRaw": [
                369
            ],
            "__typename": [
                281
            ]
        },
        "UserMarketPosition_var_samp_order_by": {
            "claimableRewardsRaw": [
                369
            ],
            "lastUpdatedAt": [
                369
            ],
            "lockedCollateralRaw": [
                369
            ],
            "netFTokenChangeRaw": [
                369
            ],
            "presaleDepositRaw": [
                369
            ],
            "presaleLeverage": [
                369
            ],
            "stakedAmountRaw": [
                369
            ],
            "totalDebtRaw": [
                369
            ],
            "__typename": [
                281
            ]
        },
        "UserMarketPosition_variance_order_by": {
            "claimableRewardsRaw": [
                369
            ],
            "lastUpdatedAt": [
                369
            ],
            "lockedCollateralRaw": [
                369
            ],
            "netFTokenChangeRaw": [
                369
            ],
            "presaleDepositRaw": [
                369
            ],
            "presaleLeverage": [
                369
            ],
            "stakedAmountRaw": [
                369
            ],
            "totalDebtRaw": [
                369
            ],
            "__typename": [
                281
            ]
        },
        "candleperiod": {},
        "candleperiod_comparison_exp": {
            "_eq": [
                330
            ],
            "_gt": [
                330
            ],
            "_gte": [
                330
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
                388
            ],
            "__typename": [
                281
            ]
        },
        "chain_metadata_bool_exp": {
            "_and": [
                333
            ],
            "_not": [
                333
            ],
            "_or": [
                333
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
                389
            ],
            "__typename": [
                281
            ]
        },
        "chain_metadata_order_by": {
            "block_height": [
                369
            ],
            "chain_id": [
                369
            ],
            "end_block": [
                369
            ],
            "first_event_block_number": [
                369
            ],
            "is_hyper_sync": [
                369
            ],
            "latest_fetched_block_number": [
                369
            ],
            "latest_processed_block": [
                369
            ],
            "num_batches_fetched": [
                369
            ],
            "num_events_processed": [
                369
            ],
            "start_block": [
                369
            ],
            "timestamp_caught_up_to_head_or_endblock": [
                369
            ],
            "__typename": [
                281
            ]
        },
        "chain_metadata_select_column": {},
        "chain_metadata_stream_cursor_input": {
            "initial_value": [
                337
            ],
            "ordering": [
                340
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
                388
            ],
            "__typename": [
                281
            ]
        },
        "contract_type": {},
        "contract_type_comparison_exp": {
            "_eq": [
                338
            ],
            "_gt": [
                338
            ],
            "_gte": [
                338
            ],
            "_in": [
                338
            ],
            "_is_null": [
                12
            ],
            "_lt": [
                338
            ],
            "_lte": [
                338
            ],
            "_neq": [
                338
            ],
            "_nin": [
                338
            ],
            "__typename": [
                281
            ]
        },
        "cursor_ordering": {},
        "dynamic_contract_registry": {
            "chain_id": [
                83
            ],
            "contract_address": [
                281
            ],
            "contract_type": [
                338
            ],
            "id": [
                281
            ],
            "registering_event_block_number": [
                83
            ],
            "registering_event_block_timestamp": [
                83
            ],
            "registering_event_contract_name": [
                281
            ],
            "registering_event_log_index": [
                83
            ],
            "registering_event_name": [
                281
            ],
            "registering_event_src_address": [
                281
            ],
            "__typename": [
                281
            ]
        },
        "dynamic_contract_registry_bool_exp": {
            "_and": [
                342
            ],
            "_not": [
                342
            ],
            "_or": [
                342
            ],
            "chain_id": [
                85
            ],
            "contract_address": [
                283
            ],
            "contract_type": [
                339
            ],
            "id": [
                283
            ],
            "registering_event_block_number": [
                85
            ],
            "registering_event_block_timestamp": [
                85
            ],
            "registering_event_contract_name": [
                283
            ],
            "registering_event_log_index": [
                85
            ],
            "registering_event_name": [
                283
            ],
            "registering_event_src_address": [
                283
            ],
            "__typename": [
                281
            ]
        },
        "dynamic_contract_registry_order_by": {
            "chain_id": [
                369
            ],
            "contract_address": [
                369
            ],
            "contract_type": [
                369
            ],
            "id": [
                369
            ],
            "registering_event_block_number": [
                369
            ],
            "registering_event_block_timestamp": [
                369
            ],
            "registering_event_contract_name": [
                369
            ],
            "registering_event_log_index": [
                369
            ],
            "registering_event_name": [
                369
            ],
            "registering_event_src_address": [
                369
            ],
            "__typename": [
                281
            ]
        },
        "dynamic_contract_registry_select_column": {},
        "dynamic_contract_registry_stream_cursor_input": {
            "initial_value": [
                346
            ],
            "ordering": [
                340
            ],
            "__typename": [
                281
            ]
        },
        "dynamic_contract_registry_stream_cursor_value_input": {
            "chain_id": [
                83
            ],
            "contract_address": [
                281
            ],
            "contract_type": [
                338
            ],
            "id": [
                281
            ],
            "registering_event_block_number": [
                83
            ],
            "registering_event_block_timestamp": [
                83
            ],
            "registering_event_contract_name": [
                281
            ],
            "registering_event_log_index": [
                83
            ],
            "registering_event_name": [
                281
            ],
            "registering_event_src_address": [
                281
            ],
            "__typename": [
                281
            ]
        },
        "end_of_block_range_scanned_data": {
            "block_hash": [
                281
            ],
            "block_number": [
                83
            ],
            "chain_id": [
                83
            ],
            "__typename": [
                281
            ]
        },
        "end_of_block_range_scanned_data_bool_exp": {
            "_and": [
                348
            ],
            "_not": [
                348
            ],
            "_or": [
                348
            ],
            "block_hash": [
                283
            ],
            "block_number": [
                85
            ],
            "chain_id": [
                85
            ],
            "__typename": [
                281
            ]
        },
        "end_of_block_range_scanned_data_order_by": {
            "block_hash": [
                369
            ],
            "block_number": [
                369
            ],
            "chain_id": [
                369
            ],
            "__typename": [
                281
            ]
        },
        "end_of_block_range_scanned_data_select_column": {},
        "end_of_block_range_scanned_data_stream_cursor_input": {
            "initial_value": [
                352
            ],
            "ordering": [
                340
            ],
            "__typename": [
                281
            ]
        },
        "end_of_block_range_scanned_data_stream_cursor_value_input": {
            "block_hash": [
                281
            ],
            "block_number": [
                83
            ],
            "chain_id": [
                83
            ],
            "__typename": [
                281
            ]
        },
        "event_sync_state": {
            "block_number": [
                83
            ],
            "block_timestamp": [
                83
            ],
            "chain_id": [
                83
            ],
            "is_pre_registering_dynamic_contracts": [
                12
            ],
            "log_index": [
                83
            ],
            "__typename": [
                281
            ]
        },
        "event_sync_state_bool_exp": {
            "_and": [
                354
            ],
            "_not": [
                354
            ],
            "_or": [
                354
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
            "is_pre_registering_dynamic_contracts": [
                13
            ],
            "log_index": [
                85
            ],
            "__typename": [
                281
            ]
        },
        "event_sync_state_order_by": {
            "block_number": [
                369
            ],
            "block_timestamp": [
                369
            ],
            "chain_id": [
                369
            ],
            "is_pre_registering_dynamic_contracts": [
                369
            ],
            "log_index": [
                369
            ],
            "__typename": [
                281
            ]
        },
        "event_sync_state_select_column": {},
        "event_sync_state_stream_cursor_input": {
            "initial_value": [
                358
            ],
            "ordering": [
                340
            ],
            "__typename": [
                281
            ]
        },
        "event_sync_state_stream_cursor_value_input": {
            "block_number": [
                83
            ],
            "block_timestamp": [
                83
            ],
            "chain_id": [
                83
            ],
            "is_pre_registering_dynamic_contracts": [
                12
            ],
            "log_index": [
                83
            ],
            "__typename": [
                281
            ]
        },
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
                360
            ],
            "_contained_in": [
                359
            ],
            "_contains": [
                359
            ],
            "_eq": [
                359
            ],
            "_gt": [
                359
            ],
            "_gte": [
                359
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
                281
            ]
        },
        "loanstatus": {},
        "loanstatus_comparison_exp": {
            "_eq": [
                362
            ],
            "_gt": [
                362
            ],
            "_gte": [
                362
            ],
            "_in": [
                362
            ],
            "_is_null": [
                12
            ],
            "_lt": [
                362
            ],
            "_lte": [
                362
            ],
            "_neq": [
                362
            ],
            "_nin": [
                362
            ],
            "__typename": [
                281
            ]
        },
        "marketstatus": {},
        "marketstatus_comparison_exp": {
            "_eq": [
                364
            ],
            "_gt": [
                364
            ],
            "_gte": [
                364
            ],
            "_in": [
                364
            ],
            "_is_null": [
                12
            ],
            "_lt": [
                364
            ],
            "_lte": [
                364
            ],
            "_neq": [
                364
            ],
            "_nin": [
                364
            ],
            "__typename": [
                281
            ]
        },
        "numeric": {},
        "numeric_array_comparison_exp": {
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
                281
            ]
        },
        "numeric_comparison_exp": {
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
                281
            ]
        },
        "order_by": {},
        "persisted_state": {
            "abi_files_hash": [
                281
            ],
            "config_hash": [
                281
            ],
            "envio_version": [
                281
            ],
            "handler_files_hash": [
                281
            ],
            "id": [
                83
            ],
            "schema_hash": [
                281
            ],
            "__typename": [
                281
            ]
        },
        "persisted_state_bool_exp": {
            "_and": [
                371
            ],
            "_not": [
                371
            ],
            "_or": [
                371
            ],
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
                85
            ],
            "schema_hash": [
                283
            ],
            "__typename": [
                281
            ]
        },
        "persisted_state_order_by": {
            "abi_files_hash": [
                369
            ],
            "config_hash": [
                369
            ],
            "envio_version": [
                369
            ],
            "handler_files_hash": [
                369
            ],
            "id": [
                369
            ],
            "schema_hash": [
                369
            ],
            "__typename": [
                281
            ]
        },
        "persisted_state_select_column": {},
        "persisted_state_stream_cursor_input": {
            "initial_value": [
                375
            ],
            "ordering": [
                340
            ],
            "__typename": [
                281
            ]
        },
        "persisted_state_stream_cursor_value_input": {
            "abi_files_hash": [
                281
            ],
            "config_hash": [
                281
            ],
            "envio_version": [
                281
            ],
            "handler_files_hash": [
                281
            ],
            "id": [
                83
            ],
            "schema_hash": [
                281
            ],
            "__typename": [
                281
            ]
        },
        "presaleclaimtype": {},
        "presaleclaimtype_comparison_exp": {
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
                281
            ]
        },
        "raw_events": {
            "block_fields": [
                359,
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
            "db_write_timestamp": [
                386
            ],
            "event_id": [
                366
            ],
            "event_name": [
                281
            ],
            "log_index": [
                83
            ],
            "params": [
                359,
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
                359,
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
                379
            ],
            "_not": [
                379
            ],
            "_or": [
                379
            ],
            "block_fields": [
                361
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
            "db_write_timestamp": [
                387
            ],
            "event_id": [
                368
            ],
            "event_name": [
                283
            ],
            "log_index": [
                85
            ],
            "params": [
                361
            ],
            "serial": [
                85
            ],
            "src_address": [
                283
            ],
            "transaction_fields": [
                361
            ],
            "__typename": [
                281
            ]
        },
        "raw_events_order_by": {
            "block_fields": [
                369
            ],
            "block_hash": [
                369
            ],
            "block_number": [
                369
            ],
            "block_timestamp": [
                369
            ],
            "chain_id": [
                369
            ],
            "contract_name": [
                369
            ],
            "db_write_timestamp": [
                369
            ],
            "event_id": [
                369
            ],
            "event_name": [
                369
            ],
            "log_index": [
                369
            ],
            "params": [
                369
            ],
            "serial": [
                369
            ],
            "src_address": [
                369
            ],
            "transaction_fields": [
                369
            ],
            "__typename": [
                281
            ]
        },
        "raw_events_select_column": {},
        "raw_events_stream_cursor_input": {
            "initial_value": [
                383
            ],
            "ordering": [
                340
            ],
            "__typename": [
                281
            ]
        },
        "raw_events_stream_cursor_value_input": {
            "block_fields": [
                359
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
            "db_write_timestamp": [
                386
            ],
            "event_id": [
                366
            ],
            "event_name": [
                281
            ],
            "log_index": [
                83
            ],
            "params": [
                359
            ],
            "serial": [
                83
            ],
            "src_address": [
                281
            ],
            "transaction_fields": [
                359
            ],
            "__typename": [
                281
            ]
        },
        "stakestatus": {},
        "stakestatus_comparison_exp": {
            "_eq": [
                384
            ],
            "_gt": [
                384
            ],
            "_gte": [
                384
            ],
            "_in": [
                384
            ],
            "_is_null": [
                12
            ],
            "_lt": [
                384
            ],
            "_lte": [
                384
            ],
            "_neq": [
                384
            ],
            "_nin": [
                384
            ],
            "__typename": [
                281
            ]
        },
        "timestamp": {},
        "timestamp_comparison_exp": {
            "_eq": [
                386
            ],
            "_gt": [
                386
            ],
            "_gte": [
                386
            ],
            "_in": [
                386
            ],
            "_is_null": [
                12
            ],
            "_lt": [
                386
            ],
            "_lte": [
                386
            ],
            "_neq": [
                386
            ],
            "_nin": [
                386
            ],
            "__typename": [
                281
            ]
        },
        "timestamptz": {},
        "timestamptz_comparison_exp": {
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
                281
            ]
        },
        "tradetype": {},
        "tradetype_comparison_exp": {
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
            "chain_metadata": [
                332,
                {
                    "distinct_on": [
                        335,
                        "[chain_metadata_select_column!]"
                    ],
                    "limit": [
                        83
                    ],
                    "offset": [
                        83
                    ],
                    "order_by": [
                        334,
                        "[chain_metadata_order_by!]"
                    ],
                    "where": [
                        333
                    ]
                }
            ],
            "chain_metadata_by_pk": [
                332,
                {
                    "chain_id": [
                        83,
                        "Int!"
                    ]
                }
            ],
            "dynamic_contract_registry": [
                341,
                {
                    "distinct_on": [
                        344,
                        "[dynamic_contract_registry_select_column!]"
                    ],
                    "limit": [
                        83
                    ],
                    "offset": [
                        83
                    ],
                    "order_by": [
                        343,
                        "[dynamic_contract_registry_order_by!]"
                    ],
                    "where": [
                        342
                    ]
                }
            ],
            "dynamic_contract_registry_by_pk": [
                341,
                {
                    "id": [
                        281,
                        "String!"
                    ]
                }
            ],
            "end_of_block_range_scanned_data": [
                347,
                {
                    "distinct_on": [
                        350,
                        "[end_of_block_range_scanned_data_select_column!]"
                    ],
                    "limit": [
                        83
                    ],
                    "offset": [
                        83
                    ],
                    "order_by": [
                        349,
                        "[end_of_block_range_scanned_data_order_by!]"
                    ],
                    "where": [
                        348
                    ]
                }
            ],
            "end_of_block_range_scanned_data_by_pk": [
                347,
                {
                    "block_number": [
                        83,
                        "Int!"
                    ],
                    "chain_id": [
                        83,
                        "Int!"
                    ]
                }
            ],
            "event_sync_state": [
                353,
                {
                    "distinct_on": [
                        356,
                        "[event_sync_state_select_column!]"
                    ],
                    "limit": [
                        83
                    ],
                    "offset": [
                        83
                    ],
                    "order_by": [
                        355,
                        "[event_sync_state_order_by!]"
                    ],
                    "where": [
                        354
                    ]
                }
            ],
            "event_sync_state_by_pk": [
                353,
                {
                    "chain_id": [
                        83,
                        "Int!"
                    ]
                }
            ],
            "persisted_state": [
                370,
                {
                    "distinct_on": [
                        373,
                        "[persisted_state_select_column!]"
                    ],
                    "limit": [
                        83
                    ],
                    "offset": [
                        83
                    ],
                    "order_by": [
                        372,
                        "[persisted_state_order_by!]"
                    ],
                    "where": [
                        371
                    ]
                }
            ],
            "persisted_state_by_pk": [
                370,
                {
                    "id": [
                        83,
                        "Int!"
                    ]
                }
            ],
            "raw_events": [
                378,
                {
                    "distinct_on": [
                        381,
                        "[raw_events_select_column!]"
                    ],
                    "limit": [
                        83
                    ],
                    "offset": [
                        83
                    ],
                    "order_by": [
                        380,
                        "[raw_events_order_by!]"
                    ],
                    "where": [
                        379
                    ]
                }
            ],
            "raw_events_by_pk": [
                378,
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
            "chain_metadata": [
                332,
                {
                    "distinct_on": [
                        335,
                        "[chain_metadata_select_column!]"
                    ],
                    "limit": [
                        83
                    ],
                    "offset": [
                        83
                    ],
                    "order_by": [
                        334,
                        "[chain_metadata_order_by!]"
                    ],
                    "where": [
                        333
                    ]
                }
            ],
            "chain_metadata_by_pk": [
                332,
                {
                    "chain_id": [
                        83,
                        "Int!"
                    ]
                }
            ],
            "chain_metadata_stream": [
                332,
                {
                    "batch_size": [
                        83,
                        "Int!"
                    ],
                    "cursor": [
                        336,
                        "[chain_metadata_stream_cursor_input]!"
                    ],
                    "where": [
                        333
                    ]
                }
            ],
            "dynamic_contract_registry": [
                341,
                {
                    "distinct_on": [
                        344,
                        "[dynamic_contract_registry_select_column!]"
                    ],
                    "limit": [
                        83
                    ],
                    "offset": [
                        83
                    ],
                    "order_by": [
                        343,
                        "[dynamic_contract_registry_order_by!]"
                    ],
                    "where": [
                        342
                    ]
                }
            ],
            "dynamic_contract_registry_by_pk": [
                341,
                {
                    "id": [
                        281,
                        "String!"
                    ]
                }
            ],
            "dynamic_contract_registry_stream": [
                341,
                {
                    "batch_size": [
                        83,
                        "Int!"
                    ],
                    "cursor": [
                        345,
                        "[dynamic_contract_registry_stream_cursor_input]!"
                    ],
                    "where": [
                        342
                    ]
                }
            ],
            "end_of_block_range_scanned_data": [
                347,
                {
                    "distinct_on": [
                        350,
                        "[end_of_block_range_scanned_data_select_column!]"
                    ],
                    "limit": [
                        83
                    ],
                    "offset": [
                        83
                    ],
                    "order_by": [
                        349,
                        "[end_of_block_range_scanned_data_order_by!]"
                    ],
                    "where": [
                        348
                    ]
                }
            ],
            "end_of_block_range_scanned_data_by_pk": [
                347,
                {
                    "block_number": [
                        83,
                        "Int!"
                    ],
                    "chain_id": [
                        83,
                        "Int!"
                    ]
                }
            ],
            "end_of_block_range_scanned_data_stream": [
                347,
                {
                    "batch_size": [
                        83,
                        "Int!"
                    ],
                    "cursor": [
                        351,
                        "[end_of_block_range_scanned_data_stream_cursor_input]!"
                    ],
                    "where": [
                        348
                    ]
                }
            ],
            "event_sync_state": [
                353,
                {
                    "distinct_on": [
                        356,
                        "[event_sync_state_select_column!]"
                    ],
                    "limit": [
                        83
                    ],
                    "offset": [
                        83
                    ],
                    "order_by": [
                        355,
                        "[event_sync_state_order_by!]"
                    ],
                    "where": [
                        354
                    ]
                }
            ],
            "event_sync_state_by_pk": [
                353,
                {
                    "chain_id": [
                        83,
                        "Int!"
                    ]
                }
            ],
            "event_sync_state_stream": [
                353,
                {
                    "batch_size": [
                        83,
                        "Int!"
                    ],
                    "cursor": [
                        357,
                        "[event_sync_state_stream_cursor_input]!"
                    ],
                    "where": [
                        354
                    ]
                }
            ],
            "persisted_state": [
                370,
                {
                    "distinct_on": [
                        373,
                        "[persisted_state_select_column!]"
                    ],
                    "limit": [
                        83
                    ],
                    "offset": [
                        83
                    ],
                    "order_by": [
                        372,
                        "[persisted_state_order_by!]"
                    ],
                    "where": [
                        371
                    ]
                }
            ],
            "persisted_state_by_pk": [
                370,
                {
                    "id": [
                        83,
                        "Int!"
                    ]
                }
            ],
            "persisted_state_stream": [
                370,
                {
                    "batch_size": [
                        83,
                        "Int!"
                    ],
                    "cursor": [
                        374,
                        "[persisted_state_stream_cursor_input]!"
                    ],
                    "where": [
                        371
                    ]
                }
            ],
            "raw_events": [
                378,
                {
                    "distinct_on": [
                        381,
                        "[raw_events_select_column!]"
                    ],
                    "limit": [
                        83
                    ],
                    "offset": [
                        83
                    ],
                    "order_by": [
                        380,
                        "[raw_events_order_by!]"
                    ],
                    "where": [
                        379
                    ]
                }
            ],
            "raw_events_by_pk": [
                378,
                {
                    "serial": [
                        83,
                        "Int!"
                    ]
                }
            ],
            "raw_events_stream": [
                378,
                {
                    "batch_size": [
                        83,
                        "Int!"
                    ],
                    "cursor": [
                        382,
                        "[raw_events_stream_cursor_input]!"
                    ],
                    "where": [
                        379
                    ]
                }
            ],
            "__typename": [
                281
            ]
        }
    }
}