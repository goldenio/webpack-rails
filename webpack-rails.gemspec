# coding: utf-8
lib = File.expand_path('../lib', __FILE__)
$LOAD_PATH.unshift(lib) unless $LOAD_PATH.include?(lib)
require 'webpack/rails/version'

Gem::Specification.new do |spec|
  spec.name          = 'golden-webpack-rails'
  spec.version       = Webpack::Rails::VERSION
  spec.authors       = ['Tse-Ching Ho']
  spec.email         = ['tsechingho@gmail.com']

  spec.summary       = %q{Webpack for Rails in hybridization or replacement way.}
  spec.description   = %q{Webpack for Rails in hybridization or replacement way.}
  spec.homepage      = 'https://github.com/goldenio/webpack-rails'
  spec.license       = 'MIT'

  spec.files         = `git ls-files -z`.split("\x0").reject { |f| f.match(%r{^(test|spec|features)/}) }
  spec.bindir        = 'exe'
  spec.executables   = spec.files.grep(%r{^exe/}) { |f| File.basename(f) }
  spec.require_paths = ['lib']

  spec.add_dependency 'railties', '>= 4.2', '< 5'

  spec.add_development_dependency 'bundler', '~> 1.10'
  spec.add_development_dependency 'rake', '~> 10.0'
  spec.add_development_dependency 'rspec'
end
