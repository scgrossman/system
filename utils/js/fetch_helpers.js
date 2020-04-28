import axios from 'axios'
import { getNestedObjValueByString } from './shared_helpers'

/*
 * dataFetcher: Returns object that includes an async function that fetches data from specific url while also setting bound component state - also includes a cancel option
 * @param {object} args - arguments object to act like constructor
 * @param {mixed (str|arr)} url - string endpoint url to fetch data from
 * @param {function} successCallback - function to fire after success
 * @param {function} errorCallback - function to fire after error
 * @return {object}
 */
export const dataFetcher = (args = {}) => {
    if (Object.keys(args).length === 0) return null
    let hasCancelled = false
    let currentFetch = {}

    return (function () {
        return {
            cancel: () => {
                if (currentFetch[args.key]) {
                    currentFetch[args.key].cancel()
                }
                hasCancelled = true
            },
            fire: async function (endpoint, successCallback = null, errorCallback = null) {
                let fetchToken = args.key // must be unique!
                let isFetching = `isFetching_${args.name}`
                let isError = `isError_${args.name}`
                const endpointHasMany = endpoint.constructor === Array

                if (currentFetch[fetchToken]) {
                    currentFetch[fetchToken].cancel()
                }

                hasCancelled = false // reset

                try {
                    this.setState({
                        [isFetching]: true,
                        [isError]: false,
                    })

                    currentFetch[fetchToken] = axios.CancelToken.source()

                    let response = null

                    if (endpointHasMany) {
                        response = await axios.all(endpoint.map(u => axios.get(u)), {
                            cancelToken: currentFetch[fetchToken].token,
                            headers: { 'Content-Type': 'application/json' },
                        })
                    } else {
                        response = await axios.get(endpoint, {
                            cancelToken: currentFetch[fetchToken].token,
                            headers: { 'Content-Type': 'application/json' },
                        })
                    }

                    if (hasCancelled) return null

                    let finalResponse = null

                    if (endpointHasMany) {
                        finalResponse = []
                        response.forEach(resp => {
                            finalResponse.push(
                                ...getNestedObjValueByString(resp, args.responsePointer)
                            )
                        })
                    } else {
                        finalResponse = getNestedObjValueByString(response, args.responsePointer)
                    }

                    this.setState(
                        {
                            [args.name]: finalResponse,
                            [isFetching]: false,
                            [isError]: false,
                        },
                        () => {
                            if (!hasCancelled && successCallback)
                                try {
                                    successCallback()
                                } catch (e) {
                                    console.log(e)
                                }
                        }
                    )

                    currentFetch[fetchToken] = null
                } catch (e) {
                    if (!axios.isCancel(e) && !hasCancelled) {
                        this.setState(
                            {
                                [isFetching]: false,
                                [isError]: true,
                            },
                            () => {
                                if (!hasCancelled && errorCallback)
                                    try {
                                        errorCallback()
                                    } catch (e) {
                                        console.log(e)
                                    }
                            }
                        )
                    }

                    console.log(e)

                    currentFetch[fetchToken] = null
                }
            },
        }
    })()
}

/*
 * loadScriptAsync: Async load JS script
 * @param {string} src - url to script location
 */
export const loadScriptAsync = src => {
    var s, t
    s = document.createElement('script')
    s.type = 'text/javascript'
    s.src = src
    t = document.getElementsByTagName('script')[0]
    t.parentNode.insertBefore(s, t)
}

export const fetchDataWithHooks = (url, dataFunction, fetchingFunction, errorFunction) => {
    axios(
        url,
    ).then((response) => {
        dataFunction(response.data)
        fetchingFunction(false);
        errorFunction(false)
    }).catch(() => {
        errorFunction(true);
    });
}