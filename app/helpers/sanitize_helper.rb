module SanitizeHelper

  def sanitizing(content)

    youtube_transformer = lambda do |env|
      node      = env[:node]
      node_name = env[:node_name]

      # Don't continue if this node is already whitelisted or is not an element.
      return if env[:is_whitelisted] || !node.element?

      # Don't continue unless the node is an iframe.
      return unless node_name == 'iframe'

      # Verify that the video URL is actually a valid YouTube video URL.
      return unless node['src'] =~ %r|\A(?:https?:)?//(?:www\.)?youtube(?:-nocookie)?\.com/|

      # We're now certain that this is a YouTube embed, but we still need to run
      # it through a special Sanitize step to ensure that no unwanted elements or
      # attributes that don't belong in a YouTube embed can sneak in.
      Sanitize.node!(node, {
        :elements => %w[iframe],

        :attributes => {
          'iframe'  => %w[allowfullscreen frameborder height src width]
        }
      })

      # Now that we're sure that this is a valid YouTube embed and that there are
      # no unwanted elements or attributes hidden inside it, we can tell Sanitize
      # to whitelist the current node.
      {:node_whitelist => [node]}
    end

    vimeo_transformer = lambda do |env|
      node      = env[:node]
      node_name = env[:node_name]

      # Don't continue if this node is already whitelisted or is not an element.
      return if env[:is_whitelisted] || !node.element?

      # Don't continue unless the node is an iframe.
      return unless node_name == 'iframe'

      # Verify that the video URL is actually a valid YouTube video URL.
      return unless node['src'] =~ %r|\A(?:https?:)?//(?:www\.)?player.vimeo(?:-nocookie)?\.com/|
      #return unless node['src'] =~ %r|\A(?:https?:)?//(?:www\.)?youtube(?:-nocookie)?\.com/|

      #https://vimeo.com/334631596

      #<div style="padding: 56.25% 0 0 0; position: relative;"><iframe style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" src="https://player.vimeo.com/video/334631596?muted=1&amp;autoplay=1&amp;loop=1&amp;title=0&amp;byline=0&amp;portrait=0" frameborder="0" allowfullscreen=""></iframe></div>

      # We're now certain that this is a YouTube embed, but we still need to run
      # it through a special Sanitize step to ensure that no unwanted elements or
      # attributes that don't belong in a YouTube embed can sneak in.
      Sanitize.node!(node, {
        :elements => %w[iframe],

        :attributes => {
          'iframe'  => %w[style allowfullscreen frameborder height src width]
        }
      })

      # Now that we're sure that this is a valid YouTube embed and that there are
      # no unwanted elements or attributes hidden inside it, we can tell Sanitize
      # to whitelist the current node.
      {:node_whitelist => [node]}
    end


    #Sanitize.fragment(content, :transformers => youtube_transformer)
    #Sanitize.fragment(content, :transformers => vimeo_transformer)

    #Sanitize.fragment(content,
    #  :elements => {
    #    'a'          => ['href', 'title'],
    #    'blockquote' => ['cite'],
    #    'img'        => ['alt', 'src', 'title']
    #  },
    #  :attributes => {
    #    'a'          => ['href', 'title'],
    #    'blockquote' => ['cite'],
    #    'img'        => ['alt', 'src', 'title']
    #  }
    #)

    Sanitize.fragment(content, Sanitize::Config.merge(
      Sanitize::Config::RELAXED,
      :transformers => [
        youtube_transformer,
        vimeo_transformer
      ]
    ))


  end

end
