/**
 * Created by williamjiang on 2015/5/6.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DataSourceSchema = new Schema({
    app_name: {type: String,required:true},
    owner_specific_key: {type: String},
    type: {type: String},
    is_inbound: {type: Boolean},
    is_internal: {type: Boolean},
    is_route: {type: Boolean},
    create_time: {type: Date},
    update_time: {type: Date},
    adapter: {
        adapter_type: {type: String},
        with_col_header: {type: Boolean},
        is_multi_sheets: {type: Boolean}
    },
    channel: {
        host: {type: String},
        user: {type: String},
        pass: {type: String},
        channel_type:{type:String},
        read_pattern: {type: String},
        write_pattern: {type: String},
        dir_path: {type: String},
        cron_expression: {type: String},
        from: {type: String},
        subject: {type: String},
        send_to: {type: String},
        subject_template: {type: String},
        email_body_template: {type: String}
    },
    transformer: {
        xslt_name: {type: String},
        need_split: {type: Boolean},
        split_num: {type: Number},
        node_path: {type: String},
        xslt: {type: Buffer}
    }
}
);

var DataSource = mongoose.model('DataSource', DataSourceSchema);

// entity method,use in entity layer
//DataSourceSchema.methods.findSimilarTypes=function(cb){
//    return DataSource.find({type:this.type},cb);
//};
////static method, use in model layer
//DataSource.methods.findDataSourceByKey=function(key,cb){
//    this.find({owner_specific_key:key},cb);
//};

//virtual attribute
DataSourceSchema.virtual('code').get(function(){
    return this.app_name+'/'+this.owner_specific_key;
});
DataSourceSchema.virtual('code').set(function(code){
    var split=code.split('/');
    this.app_name=split[0];
    this.owner_specific_key=split[1];
});


exports.DataSource = DataSource;

