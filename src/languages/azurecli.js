/*
Language: AzureCLI
Author: Duncan Mackenzie <duncanma@duncanmackenzie.net>
*/
  function azureCLI(hljs) {
    var VAR = {
        className: 'variable',
        variants: [
        {begin: /\$[\w\d#@][\w\d_]*/},
        {begin: /\$\{(.*?)}/}
        ]
    };
    var PARAMETER = 
    {
      // Match command line parameters (-p, -u)
      className: 'parameter',
      variants: [ //single dash, double dash, double dash in square brackets
        {begin: ' -{1,2}[a-zA-Z\-]*'},
        {begin: '--[a-zA-Z\-]*'},
        {begin: '\[--[a-zA-Z\-]*\]'},
      ],
      relevance: 0
    };

    var QUOTE_STRING = {
        className: 'string',
        begin: /"/, end: /"/,
        contains: [
        hljs.BACKSLASH_ESCAPE,
        VAR,
        {
            className: 'variable',
            begin: /\$\(/, end: /\)/,
            contains: [hljs.BACKSLASH_ESCAPE]
        }
        ]
    };
    var APOS_STRING = {
        className: 'string',
        begin: /'/, end: /'/
    };
    var AngleBracket_STRING = {
        className: 'string',
        begin: /</, end: />/
    };

  return {
    aliases: ['azurecli', 'azure', 'azurespcli'],
    lexemes: /\b[a-zA-Z][a-zA-Z0-9_-]*\b/,
    keywords: {
        keyword:
        'azure az azsphere ' + 
        'help login logout admin-username ssh-key-value public-ip-address-dns-name resource-group location name portal telemetry account list show set clear env add delete ' +
'batch create sync-autostorage-keys keys renew application list-summary ' +
'show-summary package activate certificate task-file download node-file job enable ' +
'disable stop prep-release-status job-schedule node reboot reimage ' +
'remote-login-settings remote-desktop scheduling node-user pool resize autoscale ' +
'evaluate all-stats usage-metrics node-agent-skus subscription list-quotas task ' +
'config mode storage check sas usage connectionstring container lease acquire ' +
'change release break policy blob upload snapshot copy start share file directory ' +
'queue logging metrics cors table acs scale patch container-service ' +
'orchestrator-profile master-profile agent-pool-profiles windows-profile ' +
'linux-profile public-keys diagnostics-profile vm-diagnostics ad app group ' +
'member sp user memberGroups availset list-available-sizes cdn profile ssouri ' +
'endpoint purge load origin customDomain validate vmssvm deallocate ' +
'get-instance-view power-off restart vmss delete-instances list-skus ' +
'update-instances quick-create virtual-machine-scale-set sku upgrade-policy ' +
'virtual-machine-profile os-profile windows-configuration ' +
'additional-unattend-content win-rm listeners linux-configuration secrets ' +
'source-vault vault-certificates storage-profile image-reference os-disk image ' +
'vhd-containers network-profile network-interface-configurations ip-configurations ' +
'subnet application-gateway-backend-address-pools ' +
'load-balancer-backend-address-pools load-balancer-inbound-nat-pools ' +
'extension-profile extensions vm redeploy list-ip-address sizes capture generalize ' +
'get-serial-output reset-access enable-aem list-usage enable-diag ' +
'enable-disk-encryption delete-backup show-disk-encryption-status ' +
'disable-disk-encryption disk attach-new detach attach extension set-chef get ' +
'get-chef extension-image list-publishers list-types list-versions docker ' +
'list-offers datalake analytics cancel catalog secret datasource store filesystem ' +
'import concat move addcontent export read permissions entry lab ' +
'vms-per-lab-policy vms-per-user-policy vm-size-policy auto-shutdown-policy ' +
'auto-start-policy feature register deployment template operation log hdinsight ' +
'cluster enable-http-access disable-http-access enable-rdp-access ' +
'disable-rdp-access script-action persisted history add-config-values ' +
'add-script-action insights alerts actions email webhook rule metric webtest ' +
'notifications setting diagnostic logs logprofile definition keyvault ' +
'set-attributes set-policy delete-policy key backup restore location network vnet ' +
'lb frontend-ip probe address-pool inbound-nat-rule inbound-nat-pool public-ip nic ' +
'ip-config nsg dns zone record-set add-record delete-record traffic-manager ' +
'is-dns-available route-table route local-gateway vpn-gateway root-cert ' +
'revoked-cert vpn-connection shared-key reset application-gateway ssl-cert ' +
'frontend-port http-settings http-listener url-path-map express-route provider ' +
'circuit peering authorization assignment powerbi workspaces unregister operations ' +
'quotas rediscache renew-key list-keys set-diagnostics delete-diagnostics resource ' +
'role changelog servermanagement gateway session powershell invoke tag webapp ' +
'affinity-group cert abort-migration commit-migration prepare-migration service ' +
'get-deployment-event internal-load-balancer load-balanced-set hive_create ' +
'mr_create mr_streaming_create mobile locations recover migrate regenerate domain ' +
'ssl push nh gcm apns mpns wns auth microsoftaccount facebook twitter google aad ' +
'tenant update data truncate script preview api appsetting local-network remove ' +
'static-ip dns-server reserved-ip default-site connection device get-script ' +
'diagnostics lb-rule sb namespace site deploymentscript browse swap ' +
'defaultdocument github handler tail repository branch sync instances sql server ' +
'firewallrule db create-from shutdown create-multiple acl-rule ',
      literal:
        'true false',
      built_in:
        'ls cd' 
    },
    contains: [
      {
        // Match typed numeric constants (1000, 12.34!, 1.2e5, 1.5#, 1.2D2)
        className: 'number',
        begin: '\\b([0-9]+[0-9edED\.]*[#\!]?)',
        relevance: 0
      }, 
      PARAMETER,
      AngleBracket_STRING,
      hljs.HASH_COMMENT_MODE,
      QUOTE_STRING,
      APOS_STRING,
      VAR
    ]
  };
}