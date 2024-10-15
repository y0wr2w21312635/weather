function myAxios(config){
    return new Promise((resolve,reject)=>{ 
        const xhr=new XMLHttpRequest()
        if (config.params){
            const paramsObj=new URLSearchParams(config.params)
            const paramsStr=paramsObj.toString()
            config.url+=`?${paramsStr}`
        }
        xhr.open(config.method||'GET',config.url)
        xhr.addEventListener('loadend',()=>{
            if (xhr.status>=200&& xhr.status<300){
                resolve(JSON.parse(xhr.response))
            }else{
                reject(new Error(xhr.response))
            }
        })
        if (config.data){
            xhr.setRequestHeader('Content-Type','application/json')
            const dataStr=JSON.stringify(config.data)
            xhr.send(dataStr)
        }else{
            xhr.send()
        }
    })
}