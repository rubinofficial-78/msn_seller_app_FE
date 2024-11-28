import * as types from "../Action/actionType";

const initialState = {
  // authActions
  loggedIn: false,
  token: null,
  userId: null,
  partners_list: [],
   
};

const DataReducers = (state = initialState, action) => {
  // console.log("action", action.type, action.payload);
  switch (action.type) {
    // case types.LOGIN:
    //   return {
    //     ...state,
    //     loggedIn: action.payload.token && action.payload.userId && true,
    //     token: action.payload.token,
    //     userId: action.payload.userId,
    //   };
     
    default:
      return state;
  }
};
export default DataReducers;

/*
Copyright (C) 2022 Eunimart Omnichannel Pvt Ltd. (www.eunimart.com)			
All rights reserved.			
This program is free software: you can redistribute it and/or modify			
it under the terms of the GNU General Public License as published by			
the Free Software Foundation, either version 3 of the License, or			
(at your option) any later version.			
This program is distributed in the hope that it will be useful,			
but WITHOUT ANY WARRANTY; without even the implied warranty of			
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the			
GNU General Public License for more details.			
You should have received a copy of the GNU General Public License			
along with this program. If not, see <http://www.gnu.org/licenses/>.			
*/
