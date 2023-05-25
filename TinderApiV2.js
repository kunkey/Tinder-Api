const axios = require('axios'); // use v1.12
const config = require('./configV2');
const helper = require('./helper');

let loginWithAuthToken = async (accessToken) => {
    try {
        let login = await axios({
            method: 'post',
            url: 'https://api.gotinder.com/v3/auth/login?locale=vi',
            headers: {
                'authority': 'api.gotinder.com',
                'accept': 'application/json',
                'accept-language': 'vi,vi-VN,en-US,en,zh-CN',
                'app-version': '1035502',
                'content-type': 'application/x-google-protobuf',
                'is-created-as-guest': 'false',
                'origin': 'https://tinder.com',
                'persistent-device-id': 'bf6cc320-06d2-408f-a9ea-40beb7dbd5e7',
                'platform': 'web',
                'referer': 'https://tinder.com/',
                'sec-ch-ua': '"Not?A_Brand";v="8", "Chromium";v="108", "Google Chrome";v="108"',
                'sec-ch-ua-mobile': '?0',
                'sec-ch-ua-platform': '"macOS"',
                'sec-fetch-dest': 'empty',
                'sec-fetch-mode': 'cors',
                'sec-fetch-site': 'cross-site',
                'tinder-version': '3.55.2',
                'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36',
                'x-supported-image-formats': 'webp,jpeg'
            },
            data: `R_\n]${accessToken}`
        });
        login = login.data;
        const removeBefore = login.split("]");
        const removeAfter = removeBefore[1].split(`"`);
        const token = removeAfter[0].split(`\x12$`);
        helper.saveContentData('refreshToken.log', token[0], 'w');
        return {
            'refreshToken': token[0],
            'tokenApi': token[1]
        }
    } catch (e) {
        console.log(e);
        return null;
    }
}

let updateLocation = async (lat, long) => {
    try {
        let update = await axios({
            method: 'post',
            url: 'https://api.gotinder.com/v2/meta?locale=vi',
            headers: {
                'authority': 'api.gotinder.com',
                'accept': 'application/json',
                'accept-language': 'vi,vi-VN,en-US,en,zh-CN',
                'app-version': '1035502',
                'content-type': 'application/json',
                'origin': 'https://tinder.com',
                'platform': 'web',
                'referer': 'https://tinder.com/',
                'sec-ch-ua': '"Not?A_Brand";v="8", "Chromium";v="108", "Google Chrome";v="108"',
                'sec-ch-ua-mobile': '?0',
                'sec-ch-ua-platform': '"macOS"',
                'sec-fetch-dest': 'empty',
                'sec-fetch-mode': 'cors',
                'sec-fetch-site': 'cross-site',
                'tinder-version': '3.55.2',
                'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36',
                'x-auth-token': config["x-auth-token"],
                'x-supported-image-formats': 'webp,jpeg',
                'x-tinder-start-id': 'x100'
            },
            data: JSON.stringify({
                "lat": lat,
                "lon": long,
                "force_fetch_resources": true
            })
        });
        update = update.data;
        return update;
    } catch (e) {
        console.log(e);
        return null;
    }
}

let getMyProfile = async () => {
    try {
        let profile = await axios({
            method: 'get',
            url: `https://api.gotinder.com/v2/profile?locale=${config["locale"]}&include=account%2Cavailable_descriptors%2Cboost%2Cbouncerbypass%2Ccontact_cards%2Cemail_settings%2Cfeature_access%2Cinstagram%2Clikes%2Cprofile_meter%2Cnotifications%2Cmisc_merchandising%2Cofferings%2Conboarding%2Cplus_control%2Cpurchase%2Creadreceipts%2Cspotify%2Csuper_likes%2Ctinder_u%2Ctravel%2Ctutorials%2Cuser`,
            headers: {
                'authority': 'api.gotinder.com',
                'accept': 'application/json',
                'accept-language': 'vi,vi-VN,en-US,en,zh-CN',
                'app-version': '1035502',
                'origin': 'https://tinder.com',
                'platform': 'web',
                'referer': 'https://tinder.com/',
                'sec-ch-ua': '"Not?A_Brand";v="8", "Chromium";v="108", "Google Chrome";v="108"',
                'sec-ch-ua-mobile': '?0',
                'sec-ch-ua-platform': '"macOS"',
                'sec-fetch-dest': 'empty',
                'sec-fetch-mode': 'cors',
                'sec-fetch-site': 'cross-site',
                'tinder-version': '3.55.2',
                'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36',
                'x-supported-image-formats': 'webp,jpeg',
                'x-auth-token': config["x-auth-token"],
            }
        });
        profile = profile.data;
        return profile;
    } catch (e) {
        console.log(e);
        return null;
    }
}

let getRandomUser = async () => {
    try {
        let getData = await axios({
            method: 'get',
            url: `https://api.gotinder.com/v2/recs/core?locale=${config["locale"]}`,
            headers: {
                'authority': 'api.gotinder.com',
                'accept': 'application/json',
                'accept-language': 'vi,vi-VN,en-US,en',
                'app-version': '1032800',
                'origin': 'https://tinder.com',
                'platform': 'web',
                'referer': 'https://tinder.com/',
                'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="101", "Google Chrome";v="101"',
                'sec-ch-ua-mobile': '?0',
                'sec-ch-ua-platform': '"Linux"',
                'sec-fetch-dest': 'empty',
                'sec-fetch-mode': 'cors',
                'sec-fetch-site': 'cross-site',
                'tinder-version': '3.28.0',
                'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.64 Safari/537.36',
                'x-auth-token': config["x-auth-token"],
                'x-supported-image-formats': 'webp,jpeg'
            }
        });
        getData = getData.data;
        return getData;
    } catch (e) {
        return null;
        console.log(e);
    }
}

let likeUser = async (userID, sNumber) => {
    try {
        let likeData = await axios({
            method: 'post',
            url: `https://api.gotinder.com/like/${userID}?locale=${config["locale"]}`,
            headers: {
                'authority': 'api.gotinder.com',
                'accept': 'application/json',
                'accept-language': 'vi,vi-VN,en-US,en',
                'app-version': '1032800',
                'content-type': 'application/json',
                'origin': 'https://tinder.com',
                'platform': 'web',
                'referer': 'https://tinder.com/',
                'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="101", "Google Chrome";v="101"',
                'sec-ch-ua-mobile': '?0',
                'sec-ch-ua-platform': '"Linux"',
                'sec-fetch-dest': 'empty',
                'sec-fetch-mode': 'cors',
                'sec-fetch-site': 'cross-site',
                'tinder-version': '3.28.0',
                'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.64 Safari/537.36',
                'x-auth-token': config["x-auth-token"],
                'x-supported-image-formats': 'webp,jpeg'
            },
            data: JSON.stringify({
                "s_number": sNumber,
                "user_traveling": 1
            })
        });

        likeData = likeData.data;
        return likeData;
    } catch (e) {
        console.log(e);
        return null;
    }
}

const seenMatch = async (userID) => { // 5e807181e0739401001f589f5ef3b4718a1f1e0100aa96a9
    try {
        let seenData = await axios({
            method: 'post',
            url: `https://api.gotinder.com/v2/seen/${userID}?locale=${config["locale"]}`,
            headers: {
                'authority': 'api.gotinder.com',
                'accept': 'application/json',
                'accept-language': 'vi,vi-VN,en-US,en',
                'app-version': '1032800',
                'content-type': 'application/json',
                'origin': 'https://tinder.com',
                'platform': 'web',
                'referer': 'https://tinder.com/',
                'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="101", "Google Chrome";v="101"',
                'sec-ch-ua-mobile': '?0',
                'sec-ch-ua-platform': '"Linux"',
                'sec-fetch-dest': 'empty',
                'sec-fetch-mode': 'cors',
                'sec-fetch-site': 'cross-site',
                'tinder-version': '3.28.0',
                'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.64 Safari/537.36',
                'x-auth-token': config["x-auth-token"],
                'x-supported-image-formats': 'webp,jpeg'
            },
            data: JSON.stringify({})
        });
        seenData = seenData.data;
        return seenData;
    } catch (e) {
        console.log(e);
        return null;
    }
}

const sendMessage = async (matchId, shortID, name, message) => {
    try {
        let sendData = await axios({
            method: 'post',
            url: `https://api.gotinder.com/user/matches/${matchId}?locale=${config["locale"]}`,
            headers: {
                'authority': 'api.gotinder.com',
                'accept': 'application/json',
                'accept-language': 'vi,vi-VN,en-US,en',
                'app-version': '1032800',
                'content-type': 'application/json',
                'origin': 'https://tinder.com',
                'platform': 'web',
                'referer': 'https://tinder.com/',
                'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="101", "Google Chrome";v="101"',
                'sec-ch-ua-mobile': '?0',
                'sec-ch-ua-platform': '"Linux"',
                'sec-fetch-dest': 'empty',
                'sec-fetch-mode': 'cors',
                'sec-fetch-site': 'cross-site',
                'tinder-version': '3.28.0',
                'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.64 Safari/537.36',
                'x-auth-token': config["x-auth-token"],
                'x-supported-image-formats': 'webp,jpeg'
            },
            data: JSON.stringify({
                "userId": config["meID"],
                "otherId": shortID,
                "tempMessageId": "0.08481083604217288",
                "matchId": matchId,
                "sessionId": config["user-session-id"],
                "message": message
            })
        });
        sendData = sendData.data;
        return sendData;
    } catch (e) {
        console.log(e);
        return null;
    }
}

const getMatched = async (limit) => {
    try {
        let getData = await axios({
            method: 'get',
            url: `https://api.gotinder.com/v2/matches?locale=vi&count=${limit}&message=0&is_tinder_u=false`,
            headers: {
                'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="101", "Google Chrome";v="101"',
                'accept-language': 'vi,vi-VN,en-US,en',
                'sec-ch-ua-platform': '"Linux"',
                'x-supported-image-formats': 'webp,jpeg',
                'tinder-version': '3.28.0',
                'sec-ch-ua-mobile': '?0',
                'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.64 Safari/537.36',
                'Accept': 'application/json',
                'Referer': 'https://tinder.com/',
                'platform': 'web',
                'app-version': '1032800',
                'X-Auth-Token': config["x-auth-token"],
            }
        });
        getData = getData.data;
        return getData;
    } catch (e) {
        console.log(e);
        return null;
    }
}