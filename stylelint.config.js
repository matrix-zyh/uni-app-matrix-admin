module.exports = {
  root: true,
  plugins: ['stylelint-order'],
  extends: ['stylelint-config-standard', 'stylelint-config-prettier'],
  rules: {
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['global'],
      },
    ],
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: ['function', 'if', 'each', 'include', 'mixin', 'for'],
      },
    ],
    'no-duplicate-selectors': null,
    'no-empty-source': null,
    'unicode-bom': 'never',
    'no-descending-specificity': null,
    'font-family-no-missing-generic-family-keyword': null,
    'declaration-colon-space-after': 'always-single-line',
    'declaration-colon-space-before': 'never',
    'declaration-block-trailing-semicolon': 'always',
    'rule-empty-line-before': [
      'always',
      {
        ignore: ['after-comment', 'first-nested'],
      },
    ],
    'property-no-unknown': [
      true,
      {
        ignoreProperties: ['lines'],
      },
    ],
    'media-feature-name-no-unknown': [
      true,
      {
        ignoreMediaFeatureNames: 'min-device-pixel-ratio',
      },
    ],
    'unit-no-unknown': [
      true,
      {
        ignoreUnits: ['rpx', 'upx'],
      },
    ],
    'selector-pseudo-element-no-unknown': [
      true,
      {
        ignorePseudoElements: ['v-deep'],
      },
    ],
    'selector-type-no-unknown': [
      true,
      {
        ignoreTypes: [
          'swiper',
          'navigator',
          'radio',
          'checkbox',
          'scroll-view',
          'radio-group',
          'checkbox-group',
          'picker',
          'swiper-item',
          'cover-view'
        ]
      }
    ]
  },
}
