/**
 * @author rubyisapm
 */
import utility from 'ct-utility';
import Vue from 'vue';
Vue.filter('dateTimeFormat', function(v){
    if (!v) return;
    return utility.dateFilter(v, 'yyyy-MM-dd HH:mm:ss');
});
