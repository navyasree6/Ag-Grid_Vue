<template>
    <div id="data">
        <h1>Data</h1>
        <nav class="nav-bar">
           <ul>
              <li class="pure-menu-item">
                  <label class="navtitle">ATHELETE INFORMATION</label>
              </li>
   <li class="menu2">
          <router-link  to='/' class="pure-menu-link">LOGOUT</router-link>
        </li>
</ul> 
        </nav>

<div class="col-md-12" style="margin-left:10px;overflow: hidden;margin-top:40px;width:100%;">
      <div class="ag-theme-balham" style="overflow: hidden;width:100%;">
        <ag-grid-vue
          style="height:408px"
          :columnDefs="columnDefs"
          :rowData="rowData"
          :enableCellChangeFlash="true"
          @rowSelected="rowSelected"
          :pagination="true"
          :paginationPageSize="paginationPageSize"
          :gridOptions="gridOptions"
          :components="components"
          rowMultiSelectWithClick="true"
          suppressRowClickSelection="true"
          :defaultColDef="defaultColDef"
          floatingFilter="true"
          :frameworkComponents="frameworkComponents"
        ></ag-grid-vue>
        <label for="reqNumber" class="col">ROWS DISPLAYED :</label>
        <input type="number" id="reqNum" class="col" value="5" min="5" @change="changePagination()" v-model="pageSize"
        style="margin-left:10px;width:51px; margin-bottom: 25px;"
        data-bind="value:reqNumber"
            />
        
        </div>
            </div>
        </div>

 
</template>
<script>
import {AgGridVue} from "ag-grid-vue"
import "ag-grid-enterprise";
import params from "../../config.json";
import moment from 'moment'

//import MedalCellRenderer from "../medalCellRenderer";

export default{
name: 'data',
        data() {
            return {
             loading: false,
      columnDefs: null,
      components: null,
      rowData: [],
      gridApi: null,
     onGridReady: null,
      rowsEdited: [],
      defaultColDef: null,
      paginationPageSize: null,
     method: "",
    
    };
  },
components: {
         AgGridVue,


        },
methods:{
        fetchGridContents() {
        fetch('https://raw.githubusercontent.com/ag-grid/ag-grid/master/packages/ag-grid-docs/src/olympicWinnersSmall.json')
               .then(result => result.json())
               .then(rowData => this.rowData = rowData);
        
    },
     changePagination() {
      var value = this.pageSize;
      this.gridApi.paginationSetPageSize(Number(value));
      this.paginationPageSize = value;
    }
   
},    
  beforeMount() {
      this.fetchGridContents();
     this.gridOptions = { enableRangeSelection: true };
     this.columnDefs = [
      {
        field: "athlete",
        width: 150,
        editable: true
      },
    
      { field: "age",
      editable:true,
      width:90,
      valueParser: numberParser,
      cellStyle: function(params) {
          var color = numberToColor(params.value);
          return { backgroundColor: color };
        } 
       },
      {  
        headerName:"country",
        field: "country",
        width: 150,
        filter: "agSetColumnFilter",
        filterParams: { values: getCountries() }
      },
      { field: "year" },
      { headerName: "date",
        field:"date",
        valueGetter: function(params) {
            if (params.data.country == 'United States') {
           return moment(params.data.date, 'DD/MM/YYYY').format('MM/DD/YYYY');

      }else if (params.data.country == 'India'){
         return moment(params.data.date, 'DD/MM/YYYY').format('DD-MM-YYYY');
      }
      else if (params.data.country == 'Australia'){
         return moment(params.data.date, 'DD/MM/YYYY').format('YYYY/DD/MM');
      }
      else {
           return params.data.date;
      }
        }
      },
      { field: "sport" ,
      editable:true,
      cellEditor:"agRichSelectCellEditor",
      cellEditorParams: {
            values: params.datafields["sport"]
          }
      
      },
      { field: "gold",
        cellRenderer: medalCellRenderer
        },
      { field: "silver" },
      { field: "bronze" },
      { headerName: "Total",
          valueGetter: function(params) {
          return params.data.gold + params.data.silver + params.data.bronze;
        }

      
      }
    ];
    
    this.defaultColDef = {
      resizable: true
    };
    this.paginationPageSize = 5
    this.pinnedTopRowData = getPinnedTopData()
    this.pinnedBottomRowData = getPinnedBottomData()
  },
   mounted() {
    this.gridApi = this.gridOptions.api
     this.columnApi = params.columnApi
  }
};
function numberParser(params) {
  var newValue = params.newValue;
  var valueAsNumber;
  if (newValue === null || newValue === undefined || newValue === "") {
    valueAsNumber = null;
  } else {
    valueAsNumber = parseFloat(params.newValue);
  }
  return valueAsNumber;
}
function numberToColor(val) {
  if (val >= 10 && val <=15) {
    return "green";
  } else if (val >15 && val <20) {
    return "red";
  } else if(val >20 && val<25) {
    return "orange";
  }
  else{
    return "yellow";
  }
}
function medalCellRenderer(params){
  let value= params.value;
  let text=' ';
  for(let i=0;i<value;i++)
  {
    text += '#';
  }
  return text;
}
function getCountries(){
      let count=[];
      count.push("United States");
      count.push("India");
      return count;
    }


</script>
<style scoped >
  @import "../../node_modules/ag-grid-community/dist/styles/ag-grid.css";
  @import "../../node_modules/ag-grid-community/dist/styles/ag-theme-balham.css";
ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  background-color: #333;
}

li {
  float: left;
}

li a {
  display: block;
  color: white;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
}

li a:hover {
  background-color: #111;
}
.menu2{
    float:right;
}
label{
    font-family: Arial, Helvetica, sans-serif;
    color:white;
     font-size: 20px;
     margin-left: 15px;
} 
.col{
  color: black;
  float:left;
  font-size:13px;
}
#reqNum{
  color:black;
}
.rag-green {
    background-color: lightgreen;
}
.rag-red {
    background-color: lightcoral;
}
.rag-amber {
    background-color: lightsalmon;
}

</style>