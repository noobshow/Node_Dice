﻿/**
 * Copyright 2017 Node Dice
 *
 * Created by Neo on 2017/02/24.
 */

import dbConnect from './dbConnect';
// import config from '../../config';

const mongoose = dbConnect.mongoose;
//const db = dbConnect.db;
/*bet schema*/
const betSchema = new mongoose.Schema({
    userid: String,
    userName: String,
    clientSalt: String,
    serverSalt: String,
    nonce: Number,
    amount: Number,
    selNum: Number,
    coinName: String,
    betTime: { type: Date, index: true },
    rollNum: Number,
    profit: Number,
    payout: Number
});
//Static methods
betSchema.statics = {
    getBetsByUser: async (userid) => {
        return await betModel.find({ userid }, 'userid userName rollNum nonce betTime selNum amount coinName profit payout')
            .sort({ betTime: -1 }).limit(100);

    },
    getAllBets: async () => {
        return await betModel.find({}, '_id userid userName rollNum nonce betTime selNum amount coinName profit payout')
            .sort({ betTime: -1 }).limit(100);
    },
    getPayout: function (selNum) {
        return selNum <= 49.5 ? 99 / selNum : 99 / (99.99 - selNum);
    }

};

const betModel = mongoose.model('Bet', betSchema);

export default betModel;