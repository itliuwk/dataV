import request from '@/utils/request'

let revenueSituation = '/revenueAnalysis/revenueSituation' // 营收情况
let revenueStructure = '/revenueAnalysis/revenueStructure' // 营收结构
let passengerFlow = '/revenueAnalysis/passengerFlow' // 客流情况 -- 各利润中心
let cumulative = '/revenueAnalysis/cumulative' // 年累计营收

const baseUrl = '/dip-financial-service'

export function getRevenueSituation (data) {
  return request({
    url: `${baseUrl}${revenueSituation}`,
    method: 'get',
    params: data
  })
}

export function getRevenueStructure (data) {
  return request({
    url: `${baseUrl}${revenueStructure}`,
    method: 'get',
    params: data
  })
}

export function getPassengerFlow (data) {
  return request({
    url: `${baseUrl}${passengerFlow}`,
    method: 'get',
    params: data
  })
}

export function getCumulative (data) {
  return request({
    url: `${baseUrl}${cumulative}`,
    method: 'get',
    params: data
  })
}
