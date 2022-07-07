module.exports = { 
  "LAN" : [
    {
    'host': '192.168.1.50',
    'name': 'PC1',
    'notify': {
      'in': false,
      'out': false
      }
    },
    {
    'host': '192.168.1.11',
    'name': 'CAMERA',
    'notify': {
      'in': false,
      'out': false
      }
    }
  ],
  "WAN" : [
    {
    'host': '1.1.1.1',
    'name': 'OpenNIC',
    'notify': {
      'in': false,
      'out': false
      }
    },
    {
    'host': '8.8.8.8',
    'name': 'Google P-DNS',
    'notify': {
        'in': false,
        'out': false
      }
    }
  ]
}