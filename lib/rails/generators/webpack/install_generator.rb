module Webpack
  class InstallGenerator < ::Rails::Generators::Base

    source_root File.expand_path('../templates', __FILE__)

    argument :name, type: :string, default: 'client'
    class_option :reactjs, type: :boolean, default: true, description: 'with react.js settings'

    def add_client
      empty_directory name
      template 'package.json', "#{name}/package.json", name: application_name, author: author
      template 'server.js', "#{name}/server.js"
    end

    def add_client_npm_modules
      inside name do
        run 'npm install --global webpack'
        run 'npm install --save webpack expose-loader'
        run 'npm install --save-dev webpack-dev-server'
        run 'npm install --save-dev babel-loader coffee-loader'
        run 'npm install --save-dev file-loader url-loader bundle-loader'
        run 'npm install --save-dev style-loader css-loader sass-loader'
        run 'npm install --save jquery'
        run 'npm install --save es5-shim es6-promise'
        if options.reactjs?
          run 'npm install --save react'
          run 'npm install --save-dev jsx-loader react-hot-loader'
          run 'npm install --save alt'
          run 'npm install --save redux react-redux redux-thunk redux-promise'
        end
      end
    end

    def add_client_fonts
      return unless File.exists? 'app/assets/fonts'
      create_link "#{name}/assets/fonts",  '../../app/assets/fonts', symbolic: true
    end

    def add_client_images
      return unless File.exists? 'app/assets/images'
      create_link "#{name}/assets/images",  '../../app/assets/images', symbolic: true
    end

    def add_client_javascripts
      empty_directory "#{name}/assets/javascripts"
      # create_file "#{name}/assets/javascripts/.gitkeep"
      template 'assets/app.js', "#{name}/assets/javascripts/app.js"
    end

    def add_client_stylesheets
      empty_directory "#{name}/assets/stylesheets"
      # create_file "#{name}/assets/stylesheets/.gitkeep"
      template 'assets/app.css', "#{name}/assets/stylesheets/app.css"
      template 'assets/app.scss', "#{name}/assets/stylesheets/app.scss"
      template 'assets/app.sass', "#{name}/assets/stylesheets/app.sass"
    end

    def add_client_config
      empty_directory "#{name}/config"
      empty_directory "#{name}/config/webpack"
      template 'config/webpack/common.js', "#{name}/config/webpack/common.js"
      template 'config/webpack/font.js', "#{name}/config/webpack/font.js"
      template 'config/webpack/image.js', "#{name}/config/webpack/image.js"
      template 'config/webpack/sass.js', "#{name}/config/webpack/sass.js"
      if options.reactjs?
        template 'config/webpack/react.js', "#{name}/config/webpack/react.js"
      end
      template 'config/webpack/hot.js', "#{name}/config/webpack/hot.js"
      template 'config/webpack/rails.js', "#{name}/config/webpack/rails.js"
      template 'config/webpack_only.js', "#{name}/config/webpack_only.js"
      template 'config/rails_only.js', "#{name}/config/rails_only.js"
    end

    def add_client_public
      empty_directory "#{name}/public"
      template 'public/index.html', "#{name}/public/index.html"
    end

    def apply_app_stylesheets
      sentinel = "  end\nend\n"
      insert_into_file 'config/application.rb', before: sentinel, verbose: false do
  <<-CODE

    # Add #{name}/assets/stylesheets to asset pipeline's search path.
    config.assets.paths << Rails.root.join('#{name}', 'assets', 'stylesheets')
  CODE
      end
    end

    def apply_app_javascripts
      gsub_file 'app/assets/javascripts/application.js', '//= require_tree .', '//# require_tree .'

      empty_directory 'app/assets/javascripts/generated'
      create_file 'app/assets/javascripts/generated/.gitkeep'
      append_to_file 'app/assets/javascripts/application.js' do
        <<-CODE.strip_heredoc

          // Important to import jquery_ujs before rails-bundle as that patches jquery xhr to use the authenticity token!
          //= require generated/common
          //= require generated/#{name}-bundle
        CODE
      end
    end

    def add_procfile
      file = 'Procfile.dev'
      create_file file unless File.exists? file
      append_to_file file do
        <<-CODE.strip_heredoc
          webpack_rails: sh -c 'cd #{name} && $(npm bin)/webpack -d --progress --colors --watch --config config/webpack/rails.js'
          webpack_hot: sh -c 'cd #{name} && $(npm bin)/webpack -d --progress --colors --watch --config config/webpack/hot.js'
          webpack_hot_server: sh -c 'cd #{name} && $(npm bin)/webpack-dev-server --config config/webpack/hot.js --hot --inline'
          # node_server: sh -c 'cd #{name} && node server.js'
          webrick: bundle exec rails server -p 3000
        CODE
      end
    end

    def add_gitignore_files
      append_to_file '.gitignore' do
        <<-CODE.strip_heredoc

          # Ignore files for npm, webpack
          /#{name}/node_modules
          /#{name}/npm-debug.log
          /#{name}/public/assets
          /app/assets/javascripts/generated/*
          !/app/assets/javascripts/generated/.gitkeep
        CODE
      end
    end

    private

    def application_name
      @application_name ||= File.basename(File.realpath('.')).underscore
    end

    def author
      @author ||= git_config 'user.name'
    end

    def git_config field
      command = "git config --global #{field}"
      config = run(command, capture: true).strip
      config.empty? ? "YOUR_#{field}".sub('.', '_').upcase : config
    end

  end
end
