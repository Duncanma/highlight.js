/*
 Language: Kusto
*/

function(hljs) {
  var COMMENT_MODE = hljs.COMMENT('//', '$');
  var CONTROL_COMMANDS_TOKENS =
    'async data into ifnotexists whatif compressed monitoring metadata folder docstring details hot records until as csv tsv json sql policy encoding retention merge policies update ingestiontime caching querythrottling sharding callout querylimit restricted_view_access ingestionbatching query_weak_consistency partitioning softdelete harddelete rowstore rowstores seal writeaheadlog streamingingestion rowstore_references follower';
  var CSL_COMMANDS_TOKENS =
    'set let restrict access alias pattern declare query_parameters';
  var CHART_RENDER_TYPES_TOKENS =
    'columnchart barchart piechart timechart anomalychart linechart ladderchart pivotchart areachart stackedareachart scatterchart timepivot timeline card table list treemap';
  var CHART_RENDER_KIND_TOKENS =
    'default stacked stacked100 unstacked map';
  var SUB_OPERATORS_TOKEN =
    'like notlike contains notcontains !contains contains_cs !contains_cs startswith !startswith has !has has_cs !has_cs hasprefix !hasprefix hassuffix !hassuffix matches regex in !in endswith !endswith between !between extent database diagnostics jitmanagers admins basicauth cache capacity cluster continuous-export continuous-exports databases extents external journal memory extentcontainers viewers unrestrictedviewers tags prettyname blockedprincipals failed operations password principal principals settings schema table tables user users ingestors monitors version roles fabric locks service services nodes unallocated subscriptions nonregistered packages configuration commands commands-and-queries queries query function functions by on of true false and or asc desc nulls last first with withsource kind flags from to step ingestion failures mapping mappings geneva eventhub source sources types application period reason title';
  var JOIN_KIND_TOKENS =
    'anti inner innerunique fullouter leftanti leftantisemi leftouter leftsemi rightanti rightantisemi rightsemi rightouter';
  var OTHER_TOKENS =
    'mining now ago datetime ingestion_time time timespan dynamic decimal todatetime between !between row_number extent_id extent_tags pi pack_all rowstore_ordinal_range iff iif range replace translate series_iir bin_at series_fill_const series_decompose series_decompose_forecast series_decompose_anomalies datetime_diff datetime_add geo_point_to_geohash geo_point_in_polygon connect filter fork facet range consume find search print partition lookup datatable externaldata count countif dcount dcountif sum min max avg avgif any makelist makeset make_dictionary stdev stdevif varianceif variance buildschema hll hll_merge tdigest tdigest_merge) percentile sumif percentilew arg_min arg_max percentilesw_array percentilesw percentiles_array percentiles count countif dcount dcountif sum min max avg any stdev stdevp variance variancep sumif autocluster diffpatterns basket extractcolumns';
  var DATA_TYPES_TOKENS =
    'date time timespan datetime int long real string bool double dynamic decimal guid';
  var SINGLE_PARAM_FUNC_NO_DATE_TIME_TOKENS =
    'strlen tostring toupper tolower typeof reverse parsejson parse_json parse_xml parse_csv tobool toboolean todynamic toobject toint tolong toguid todouble toreal totimespan tohex todecimal isempty isnotempty isnull isnotnull isnan isinf isfinite dayofweek dayofmonth dayofyear week_of_year monthofyear sqrt rand log log10 log2 exp exp2 exp10 abs degrees radians sign sin cos tan asin acos atan cot getmonth getyear array_length gettype bag_keys cursor_after gamma loggamma dcount_hll parse_ipv4 parse_url parse_path parse_version parse_urlquery url_encode url_decode binary_not not toscalar materialize series_stats series_fit_line series_fit_2lines series_stats_dynamic series_fit_line_dynamic series_fit_2lines_dynamic base64_encodestring base64_decodestring hash_sha256 ceiling string_size isascii isutf8 geo_geohash_to_central_point bin_auto';
  var TWO_PARAM_FUNC_TOKENS =
    'bin columnifexists floor countof hash round pow binary_and binary_or binary_xor binary_shift_left binary_shift_right datepart datetime_part repeat series_seasonal series_outliers array_split series_add series_subtract series_multiply series_divide series_pearson_correlation series_greater series_greater_equals series_less series_less_equals series_equals series_not_equals rank_tdigest percentrank_tdigest trim trim_start trim_end startofday startofweek startofmonth startofyear endofday endofweek endofmonth endofyear series_fill_backward series_fill_forward atan2 format_datetime format_timespan strrep strcat_array parse_user_agent strcmp row_cumsum';
  var MANY_PARAM_FUNC_TOKENS =
    'extract extractjson extractall strcat strcat_delim substring indexof split case coalesce max_of min_of percentile_tdigest zip pack pack_dictionary pack_array array_concat array_slice welch_test row_window_session series_fir series_periods_detect prev next tdigest_merge hll_merge series_fill_linear series_periods_validate datatable make_datetime make_timespan make_string geo_distance_2points geo_point_in_circle';
  var OTHER_FUNC_TOKENS = 
    'abs acos any around array_concat array_index_of array_length array_reverse array_rotate_left array_rotate_right array_shift_left array_shift_right array_slice array_sort_asc array_sort_desc array_split array_sum asin assert atan atan2 bag_keys bag_merge bag_remove_keys base64_decode_toarray base64_decode_tostring base64_encode_fromarray base64_encode_tostring bin_at bin_auto ceiling cos cot count countif current_cluster_endpoint current_database current_principal current_principal_details cursor_after cursor_before_or_at datetime_add datetime_diff degrees dynamic_to_json endofday endofmonth endofyear exp exp10 exp2 externaldata fork gamma geo_distance_2points geo_distance_point_to_line geo_line_densify geo_point_in_circle geo_point_in_polygon geo_polygon_densify hash hash_combine hash_many hash_md5 hash_sha256 isfinite isinf isnan isnotnull log log10 log2 loggamma make_string materialize next pack_array parse_url parse_urlquery parse_user_agent parse_xml percentile_tdigest percentrank_tdigest pi pow prev radians range regex_quote repeat reverse round row_cumsum row_rank row_window_session search series_add series_divide series_equals series_greater series_greater_equals series_less series_less_equals series_multiply series_not_equals series_seasonal series_subtract set_difference set_has_element set_intersect set_union sign sin sqrt startofday startofmonth startofyear strcat_array string_size strlen tan to_utf8 translate trim trim_end trim_start unixtime_microseconds_todatetime unixtime_milliseconds_todatetime unixtime_nanoseconds_todatetime unixtime_seconds_todatetime';
  var KUSTO_KEYWORDS = [CONTROL_COMMANDS_TOKENS, CSL_COMMANDS_TOKENS, CHART_RENDER_TYPES_TOKENS, CHART_RENDER_KIND_TOKENS, SUB_OPERATORS_TOKEN, JOIN_KIND_TOKENS, OTHER_TOKENS, DATA_TYPES_TOKENS, SINGLE_PARAM_FUNC_NO_DATE_TIME_TOKENS, TWO_PARAM_FUNC_TOKENS, MANY_PARAM_FUNC_TOKENS, OTHER_FUNC_TOKENS].join(' ');
  return {
    endsWithParent: true,
    illegal: /\\/,
    lexemes: /[\w\.]+/,
    keywords: {
      keyword: KUSTO_KEYWORDS
    },
    contains: [
      {
        className: 'keyword',
        begin: /\.(add|alter|alter-merge|attach|append|create|create-merge|create-set|create-or-alter|define|detach|delete|drop|drop-pretend|dup-next-ingest|dup-next-failed-ingest|ingest|export|load|move|purge|purge-cleanup|remove|replace|save|set|set-or-append|set-or-replace|show|rename|run)\b/
      },
      {
        className: 'title',
        begin: /\b(where|count|extend|join|limit|order|project|project-away|project-rename|project-reorder|render|sort|summarize|distinct|take|top|top-nested|top-hitters|union|mvexpand|mv-expand|mv-apply|reduce|evaluate|parse|parse-where|sample|sample-distinct|make-series|getschema|serialize|invoke|as)\b/
      },
      {
        className: 'number',
        begin: /\bdatetime\(\d{4}-\d{2}-\d{2}(\s+\d{2}:\d{2}(:\d{2}(\.\d{0,3})?)?)?\)/,
      },
      {
        className: 'number',
        begin: /\btime\((\d+(s(ec(onds?)?)?|m(in(utes?)?)?|h(ours?)?|d(ays?)?)|(\s*(('[^']+')|("[^"]+"))\s*))\)/,
      },
      {
        className: 'number',
        begin: /\bguid\([\da-fA-F]{8}-[\da-fA-F]{4}-[\da-fA-F]{4}-[\da-fA-F]{4}-[\da-fA-F]{12}\)/,
      },
      {
        className: 'number',
        begin: /\btypeof\((int|string|date|datetime|time|long|real|boolean|bool)\)/,
      },
      {
        className: 'number',
        begin: /((^[$]+)|\s([$]+))([+-]*\d*(\.\d*)?)/,
        relevance: 0
      },
      {
        className: 'number',
        begin: /\b0[xX][0-9a-fA-F]*/,
        relevance: 0
      },
      {
        className: 'number',
        begin: /(((\s\.\d+)|^\.\d+)|\b(\d+(\.\d*)?)([eE][\-+]?\d+)?)/,
        relevance: 0
      },
      {
        className: 'string',
        begin: '(H|h)\'', end: '\'',
      },
      {
        className: 'string',
        begin: '\'', end: '\'',
        contains: [hljs.BACKSLASH_ESCAPE, { begin: '\'\'' }]
      },
      {
        className: 'string',
        begin: '(H|h)"', end: '"',
      },
      {
        className: 'string',
        begin: '"', end: '"',
        contains: [hljs.BACKSLASH_ESCAPE, { begin: '""' }]
      },
      {
        className: 'string',
        begin: '`', end: '`',
        contains: [hljs.BACKSLASH_ESCAPE]
      },
      COMMENT_MODE,
    ]
  };
}