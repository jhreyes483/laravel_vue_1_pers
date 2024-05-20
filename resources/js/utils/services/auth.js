
export const user_auth = {
    getIdentity : function(){
        let identity = null; 
        if (typeof localStorage !== 'undefined') {
            let json = localStorage.getItem('identity');
            if (json && json != "undefined" && json != null && json != undefined) {
                identity = JSON.parse(json)
            } else {
                identity  ={};
              console.log('storage not 2')
            }
          }
          //console.log(this.identity,'storage_identity')
          return identity ;
    },
    getToken : function(){
        let token = null;
        if (typeof localStorage !== 'undefined') {
            token = localStorage.getItem('access_token');
            if (token && token != "undefined") {
              token = token;
            } else {
              token = null;
            }
          } else {
            console.log('storage not 1')
            token = null;
          }
      
          return token;
    }
    
    
}




