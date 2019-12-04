var Master = require('../models/master.model');
var Subcategory = require('../models/subcategory.model');
var Subsubcategory = require('../models/subsubcategory.model');
var Currencies = require('../models/currency.model');
var Settings = require('../models/settings.model');
var Notification=require('../models/notification.model');
var Sequelize = require('sequelize');

const Op = Sequelize.Op;

exports.addcategory = async function (params, uploading) {
    var data = Master.build({
        category_name: params.category_name,
        description: params.description,
        status: params.status,
        category_image: uploading.file.originalname
    })
    try {
        var savedRecord = await data.save();
        return savedRecord;
    } catch (e) {
        throw Error(e)
    }

}

exports.addsubcategory = async function (params, uploading) {
    var subcategoryList = await Subcategory.findAll({

        where: {
            category_id: params.category_id,
            subcategory_name: {
                [Op.like]: '%' + params.subcategory_name + '%'
            }
        }

    });
    var data = Subcategory.build({
        category_id: params.category_id,
        subcategory_name: params.subcategory_name,
        description: params.description,
        status: params.status,
        subcategory_image: uploading.file.originalname
    })
    try {
        if (subcategoryList.length == 0) {
            var savedRecord = await data.save();
            return savedRecord;

        } else {
            return "Category already exists";
        }
    } catch (e) {
        throw Error(e)
    }
}
exports.addsubsubcategoryservice = async function (params, uploading) {
    var subsubcategoryList = await Subsubcategory.findAll({

        where: {
            subcategory_id: params.subcategory_id,
            subsubcategory_name: params.subsubcategory_name

        }

    });
    var data = Subsubcategory.build({
        category_id: params.category_id,
        subcategory_id: params.subcategory_id,
        subsubcategory_name: params.subsubcategory_name,
        description: params.description,
        status: params.status,
        subsubcategory_image: uploading.file.originalname
    })
    try {
        if (subsubcategoryList.length == 0) {
            var savedRecord = await data.save();
            return savedRecord;
        } else {
            return "Category already exists";
        }
    } catch (e) {
        throw Error(e)
    }
}
exports.editcategoryservice = async function (params, uploading) {
    try {
        if (uploading.file != undefined) {
            originalimage = uploading.file.originalname;
        } else {
            originalimage = params.category_image;
        }
        var category = await Master.update({
            category_name: params.category_name,
            description: params.description,
            status: params.status,
            category_image: originalimage,
        }, {
            where: {
                category_id: params.category_id
            }

        });

        return category;
    } catch (e) {
        console.log(e);
        throw Error('Server Error');

    }
}
exports.editsubcategorysservice = async function (params, uploading) {
    // console.log(uploading.file)
    // var subcategoryList = await Subcategory.findAll({

    //     where: {
    //         category_id:params.category_id,
    //         subcategory_name:{ [Op.like]: '%'+params.subcategory_name+'%'  }
    //     }

    // });
    try {
        // if(subcategoryList.length <= 1){ 
        if (uploading.file != undefined) {
            originalimage = uploading.file.originalname;
        } else {
            originalimage = params.subcategory_image;
        }
        var subcategory = await Subcategory.update({
            category_id: params.category_id,
            subcategory_name: params.subcategory_name,
            description: params.description,
            status: params.status,
            subcategory_image: originalimage
        }, {
            where: {
                id: params.id
            }

        });

        return subcategory;
        // }
        // else{
        //     return "category already exists"
        // }
    } catch (e) {
        console.log(e);
        throw Error('Server Error');

    }
}
exports.editsubsubcategoryservice = async function (params, uploading) {
    // var subsubcategoryList = await Subsubcategory.findAll({

    //     where: {
    //         subcategory_id: params.subcategory_id,
    //         subsubcategory_name: params.subsubcategory_name

    //     }

    // });
    try {
        // if(subsubcategoryList.length <= 1){
        if (uploading.file != undefined) {
            originalimage = uploading.file.originalname;
        } else {
            originalimage = params.subsubcategory_image;
        }
        var subsubcategory = await Subsubcategory.update({
            category_id: params.category_id,
            subcategory_id: params.subcategory_id,
            subsubcategory_name: params.subsubcategory_name,
            description: params.description,
            status: params.status,
            subsubcategory_image: originalimage
        }, {
            where: {
                id: params.id
            }

        });

        return subsubcategory;
        // }
        // else{
        //     return "category already exists"
        // }
    } catch (e) {
        console.log(e);
        throw Error('Server Error');

    }
}
exports.deletecategoryservice = async function (params) {

    try {
        var removecategory = Master.destroy({

            where: {
                category_id: params.category_id
            },

        })

        return removecategory;

    } catch (e) {
        console.log(e);
        throw Error(e);

    }
}
exports.deletesubcategoryservice = async function (params) {

    try {
        var removesubcategory = Subcategory.destroy({

            where: {
                id: params.id
            },

        })

        return removesubcategory;

    } catch (e) {
        console.log(e);
        throw Error(e);

    }
}
exports.deletesubsubcategoryservice = async function (params) {

    try {
        var removesubsubcategory = Subsubcategory.destroy({

            where: {
                id: params.id
            },

        })

        return removesubsubcategory;

    } catch (e) {
        console.log(e);
        throw Error(e);

    }
}

exports.getcategory = async function () {
    console.log("categoryList")
    try {
        var categoryList = await Master.findAll({

            order: [
                ['category_id', 'DESC']
            ],
            include: [{
                model: Subcategory,
                required: false,
                include: [{
                    model: Subsubcategory
                }]
            }]

        });
        return categoryList;
    } catch (e) {
        throw Error(e);

    }
}
exports.getnotifications = async function (params) {
    try {
        var notifications = await Notification.findAll({
            where:{
                receiver_id:params.user_id
            },
            order: [
                ['id', 'DESC']
            ],
            

        });
        return notifications;
    } catch (e) {
        throw Error(e);

    }
}
exports.getsinglecategoryservice = async function (params) {
    try {
        var categoryList = await Master.findOne({

            where: {
                category_id: params.category_id
            }

        });

        return categoryList;
    } catch (e) {
        console.log(e);
        throw Error('Server Error');

    }
}
exports.getsinglesubcategoryservice = async function (params) {
    try {
        var subcategoryList = await Subcategory.findOne({

            where: {
                id: params.id
            }

        });

        return subcategoryList;
    } catch (e) {
        console.log(e);
        throw Error('Server Error');

    }
}
exports.getsinglesubsubcategoryservice = async function (params) {
    try {
        var subsubcategoryList = await Subsubcategory.findOne({

            where: {
                id: params.id
            }

        });

        return subsubcategoryList;
    } catch (e) {
        console.log(e);
        throw Error('Server Error');

    }
}
exports.getcategorysearchservice = async function (params) {
    try {
        var categoryList = await Master.findAll({
            where: {
                category_name: {
                    [Op.like]: '%' + params.search + '%'
                }
            },
            order: [
                ['category_id', 'DESC']
            ]

        });

        return categoryList;
    } catch (e) {
        console.log(e);
        throw Error(e);

    }
}
exports.getsubcategory = async function (params) {
    try {
        if (params.category_id) {
            var subcategoryList = await Subcategory.findAll({

                where: {
                    category_id: params.category_id
                },
                order: [
                    ['id', 'DESC']
                ]

            });

            return subcategoryList;
        } else {
            var subcategoryList = await Subcategory.findAll({
                order: [
                    ['id', 'DESC']
                ]
            });

            return subcategoryList;
        }
    } catch (e) {
        console.log(e);
        throw Error('Server Error');

    }
}
exports.getsubcategorysearchservice = async function (params) {
    try {
        if (params.category_id) {
            var subcategoryList = await Subcategory.findAll({
                where: {
                    category_id: params.category_id,
                    subcategory_name: {
                        [Op.like]: '%' + params.search + '%'
                    }
                },
                order: [
                    ['id', 'DESC']
                ]

            });

            return subcategoryList;
        } else {
            var subcategoryList = await Subcategory.findAll({
                where: {
                    subcategory_name: {
                        [Op.like]: '%' + params.search + '%'
                    }
                },
                order: [
                    ['id', 'DESC']
                ]

            });

            return subcategoryList;
        }
    } catch (e) {
        console.log(e);
        throw Error(e);

    }

}
exports.getsubsubcategorysearchservice = async function (params) {
    try {
        if (params.subcategory_id && params.category_id && params.search) {
            var subsubcategoryList = await Subsubcategory.findAll({
                where: {
                    category_id: params.category_id,
                    subcategory_id: params.subcategory_id,
                    subsubcategory_name: {
                        [Op.like]: '%' + params.search + '%'
                    },
                    order: [
                        ['id', 'DESC']
                    ]
                    // [Op.or]: {
                    //     category_id:params.category_id,
                    //     subcategory_id:params.subcategory_id,
                    // }
                },

            });

            return subsubcategoryList;
        } else if (params.category_id && params.search) {
            var subsubcategoryList = await Subsubcategory.findAll({
                where: {
                    category_id: params.category_id,
                    subsubcategory_name: {
                        [Op.like]: '%' + params.search + '%'
                    },
                },
                order: [
                    ['id', 'DESC']
                ]

            });

            return subsubcategoryList;
        } else if (params.subcategory_id && params.search) {
            var subsubcategoryList = await Subsubcategory.findAll({
                where: {
                    subcategory_id: params.subcategory_id,
                    subsubcategory_name: {
                        [Op.like]: '%' + params.search + '%'
                    },
                },
                order: [
                    ['id', 'DESC']
                ]

            });

            return subsubcategoryList;
        } else if (params.subcategory_id && params.category_id) {
            var subsubcategoryList = await Subsubcategory.findAll({
                where: {
                    category_id: params.category_id,
                    subcategory_id: params.subcategory_id,
                },
                order: [
                    ['id', 'DESC']
                ]

            });

            return subsubcategoryList;
        } else if (params.category_id) {
            var subsubcategoryList = await Subsubcategory.findAll({
                where: {
                    category_id: params.category_id,
                },
                order: [
                    ['id', 'DESC']
                ]

            });

            return subsubcategoryList;
        } else if (params.subcategory_id) {
            var subsubcategoryList = await Subsubcategory.findAll({
                where: {
                    subcategory_id: params.subcategory_id,
                },
                order: [
                    ['id', 'DESC']
                ]

            });

            return subsubcategoryList;
        } else if (params.search) {
            console.log("sdfaf")
            var subsubcategoryLists = await Subsubcategory.findAll({
                where: {
                    subsubcategory_name: {
                        [Op.like]: '%' + params.search + '%'
                    }
                },
                order: [
                    ['id', 'DESC']
                ]

            });

            return subsubcategoryLists;
        } else {
            var subsubcategoryLists = await Subsubcategory.findAll({
                order: [
                    ['id', 'DESC']
                ]
            });

            return subsubcategoryLists;
        }
    } catch (e) {
        console.log(e);
        throw Error(e);

    }
}
exports.getsubsubcategory = async function (params) {
    try {
        if (params.subcategory_id) {
            var subsubcategoryList = await Subsubcategory.findAll({
                where: {
                    subcategory_id: params.subcategory_id
                },
                order: [
                    ['id', 'DESC']
                ]

            });

            return subsubcategoryList;
        } else {
            var subsubcategoryList = await Subsubcategory.findAll({
                order: [
                    ['id', 'DESC']
                ]
            });

            return subsubcategoryList;
        }

    } catch (e) {
        console.log(e);
        throw Error('Server Error');

    }
}
exports.getCurrencySearchByKey = async function (params) {
    try {
        var currencyList = await Currencies.findAll({
            where: {
                currency_name: {
                    [Op.like]: '%' + params.search + '%'
                }
            },
            order: [
                ['id', 'DESC']
            ]

        });

        return currencyList;
    } catch (e) {
        console.log(e);
        throw Error(e);

    }
}
exports.getSingleCurrencybyId = async function (params) {
    try {
        var currencyList = await Currencies.findOne({

            where: {
                id: params.id
            }

        });

        return currencyList;
    } catch (e) {
        console.log(e);
        throw Error('Server Error');

    }
}
exports.updateCurrencyById = async function (params) {
    try {

        var currency = await Currencies.update({
            currency_name: params.currency_name,
            currency_icon: params.currency_icon,
            status: params.status,
        }, {
            where: {
                id: params.id
            }

        });

        return currency;
    } catch (e) {
        console.log(e);
        throw Error('Server Error');

    }
}
exports.deleteCurrencyById = async function (params) {

    try {
        var removecategory = Currencies.destroy({

            where: {
                id: params.id
            },

        })

        return removecategory;

    } catch (e) {
        console.log(e);
        throw Error(e);

    }
}
exports.addcurrencyService = async function (params) {
    var data = Currencies.build({
        currency_name: params.currency_name,
        currency_icon: params.currency_icon,
        status: params.status,
    })
    try {
        var savedRecord = await data.save();
        return savedRecord;
    } catch (e) {
        console.log(e)
        throw Error(e)
    }
}
exports.getCurrencyListService = async function (params) {
    try {

        var data = Currencies.findAll({
            where: {
                status: '1'
            },
            order: [
                ['id', 'DESC']
            ],
        });
        return data;
    } catch (e) {
        throw Error(e);
    }
}
exports.addStockSettingsService = async function (params) {
    
        var finddata = await  Settings.findAll({
            where: {
                'name': params.name
            }
        });
        console.log("Stock Settings");
        console.log(finddata.length);
        console.log(params.name);
        try {
        if (finddata.length == 0) {


            var data = Settings.build({
                name: params.name,
                stock_status: params.stock_status,
                status: params.status,
            })

            var savedRecord = await data.save();
        } else {
            var data = Settings.update({
                name: params.name,
                stock_status: params.stock_status,
                status: params.status
            }, {
                where: {
                    'name':params.name,
                }
            })
        }
        return savedRecord;
    } catch (e) {
        console.log(e)
        throw Error(e)
    }
}
exports.addCurrencySettingsService = async function (params) {

    var finddata = await  Settings.findAll({
        where: {
            'name': params.name
        }
    });
    try {
    if (finddata.length == 0) {


        var data = Settings.build({
            name: params.name,
            currency_id: params.currency_id,
            status: params.status,
        })

        var savedRecord = await data.save();
    } else {
        var data = Settings.update({
            name: params.name,
            currency_id: params.currency_id,
            status: params.status
        }, {
            where: {
                'name':params.name,
            }
        })
    }
    return savedRecord;
} catch (e) {
    console.log(e)
    throw Error(e)
}
}
exports.getSettingsService = async function (params) {

    try {

        var data = await Settings.findOne({
            where: {
                'name': params.name,
            }
        })
        if(params.name=='currencysetting'){
            var currency_id=data.currency_id;
            var getdetails=await Currencies.findOne({
                where:{
                    'id':currency_id
                }
            })
            data.dataValues.currency_name=getdetails.currency_name;
            data.dataValues.currency_icon=getdetails.currency_icon;
        }
       
        return data;
    } catch (e) {
        console.log(e)
        throw Error(e)
    }
}