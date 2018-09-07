export default {
    hashHistory: true,
    plugins: [
      'umi-plugin-dva',
      [
        'umi-plugin-routes',
        {
          exclude: [
            /model\.(j|t)sx?$/,
            /service\.(j|t)sx?$/,
            /models\//,
            /components\//,
            /assets\//,
            /services\//,
          ],
        },
      ],
      'umi-plugin-polyfill'
    ],
    disableHash: true
  };
  