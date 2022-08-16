/**
 * Name: Form to JSON
 * Description: Create JSON object from a form submission using jQuery
 * Version: 1.0.0
 * Author: Shrikumar Infotech
 * Author URI: dev@shrikumarinfotech.com
 * License: MIT
 * Lincense URI: https://opensource.org/licenses/MIT
 */

 'use strict';

 jQuery(function( $ ){
     // plugin function
     $.fn.formToJson = function( resultContainer ){
         // console.log('this is from plugin');
 
         // define form
         const form = this;
         // define display target from parameter
         // if(resultContainer != undefined){
         //     const displayResultTarget = resultContainer;
         // }
         // console.log(resultContainer);
 
         // define submitted data
         let submittedData = [];
 
         // define form data structure
         let formData = {
             id: Number,
             LastName: String,
             Relationship: String,
             FirstName: String,
             AccessPrivilege: String,
             Address: String,
             company: String,
             reportStartDate: String,
             reportEndDate: String,
             DriverLicense: String,
             Memo:String,
             OnLocation: String,
             VisitingToday: String,
             KeyHolder: String,
             BadgeTemplate: String,
             BadgeNum: Number
            //  phone: Number
         };
         // define json data for output
         let jsonOutputData = Object.create(formData);
 
         // form submission function
         $(form).submit(function( event ){
             event.preventDefault();
 
             // console.log($(form).serialize());
             // run sort data function
             sortData( $(form).serialize() );
 
             // run json data function
             jsonData();
 
             // display json data
             outputData();
 
             // reset data
             resetData();
 
         });
 
         // sort data function
         function sortData( data ){
             // sanity check
             if(data != undefined){
                 // regular expessions
                 const regxSpace = /(?:%20)/gi;
                 const regxEmail = /(?:%40)/gi;
                 const regxLineBreak = /(?:%0D%0A)/gi;
                 // save data by replacing with regx and split with '&' as parts
                 let sortedData = data.replace(regxSpace, ' ').replace(regxEmail, '@').replace(regxLineBreak, '\n').split('&');
                 // iterate through sortedData and save as array into submittedData
                 $(sortedData).each(function(index, element){
                     submittedData.push(element.split('='));
                 });
 
                 // console.log(submittedData);
             }
         };
 
         // json data function
         function jsonData(){
             // sanity check
             if(submittedData != undefined || submittedData != null){
                 // create JSON data
                 $(submittedData).promise().done(function(){
                     // save json data
                     jsonOutputData.id = Math.random();
                     jsonOutputData.LastName = submittedData[0][1];
                     jsonOutputData.Relationship = submittedData[1][1],
                     jsonOutputData.FirstName = submittedData[2][1];
                     jsonOutputData.AccessPrivilege = submittedData[3][1],
                     jsonOutputData.Address = submittedData[4][1];
                     jsonOutputData.company = submittedData[5][1];
                     jsonOutputData.reportrange = submittedData[6][1],
                     jsonOutputData.reportEndDate = submittedData[7][1],
                     jsonOutputData.DriverLicense = submittedData[8][1];
                     jsonOutputData.VisitingToday = submittedData[14][1],
                     jsonOutputData.OnLocation = submittedData[13][1],
                     jsonOutputData.Memo = submittedData[11][1],
                     jsonOutputData.KeyHolder= submittedData[12][1],
                     jsonOutputData.BadgeTemplate= submittedData[10][1],
                     jsonOutputData.BadgeNum = submittedData[9][1],
            
                     jsonOutputData.createdDate = Date.now()
                 });
             }
         };
 
         // output data
         function outputData(){
             // stingify jsonOutputData for output
             let stringifyJsonData = JSON.stringify(jsonOutputData);
 
             // check if output target is provided
             if(resultContainer !== undefined || resultContainer !== null){
                 $(jsonOutputData).promise().done(function(){
                     $(resultContainer).html( stringifyJsonData );
                     // return stringifyJsonData;
                     console.log(stringifyJsonData); // log the JSON data
                 });
             }
             else{
                 // else just return the JSON data
                 console.log('resultContainer undefined');
                 return stringifyJsonData;
             }
         }
 
         // reset data
         function resetData(){
             // reset all data
             submittedData = [];
             jsonOutputData = {};
         }
         
     }
 }(jQuery));

//  $('#reportStartDate').daterangepicker({
//     singleDatePicker: true,
//     showDropdowns: true,
//     timePicker: true,
//     timePicker24Hour: false,
//     timePickerIncrement: 1,
//     locale: {
//         format: 'MM/DD/YYYY hh:mm A'
//     }
// }, function (date) {
//     $('#reportStartDate').html(date.format('MM/DD/YYYY hh:mm A'));
// });

// $('#reportEndDate').daterangepicker({
//     singleDatePicker: true,
//     showDropdowns: true,
//     timePicker: true,
//     timePicker24Hour: false,
//     timePickerIncrement: 1,
//     locale: {
//         format: 'MM/DD/YYYY hh:mm A'
//     },
// }, function (date) {
//     $('#reportEndDate').html(date.format('MM/DD/YYYY hh:mm A'));
// });
$(function() {

    var start = moment().subtract(29, 'days');
    var end = moment();

    function cb(start, end) {
        $('#reportrange span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
    }

    $('#reportrange').daterangepicker({
        startDate: start,
        endDate: end,
        "dateLimit": {
            "days":15
        },
        ranges: {
           'Today': [moment(), moment()],
           'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
           'Last 7 Days': [moment().subtract(6, 'days'), moment()],
           'Last 30 Days': [moment().subtract(29, 'days'), moment()],
           'This Month': [moment().startOf('month'), moment().endOf('month')],
           'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
        }
    }, cb);

    cb(start, end);

});