exports.plugin = {
  name: 'slides',
  version: '1.1.1',
  register: (server) => {
    const slides = [
      'client-side',
      'js-var-types',
      'cdn',
      'js-events',
      'json',
      'ajax',
      'rss',
      'git',
      'api',
      'qrcode',
      'flickr',
      'twitter',
      'instagram',
      'facebook',
    ];

    server.route({
      method: 'GET',
      path: '/',
      handler: (request, reply) => reply.view('slides', { slides }),
      options: { tags: ['starter', 'slide'] },
    });

    slides.forEach((slideName) => {
      server.route({
        method: 'GET',
        path: `/${slideName}`,
        handler: (request, reply) => reply.view(`slide-${slideName}`),
        options: { tags: ['starter', 'slide'] },
      });
    });
  },
};
