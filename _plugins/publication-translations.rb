# Generate English articles from the same records edited in Decap CMS.
module Jekyll
  class PublicationTranslations < Generator
    safe true
    priority :low

    def generate(site)
      site.posts.docs.each do |post|
        post.data['lang'] ||= 'pt'
        if post.data.fetch('body_en', '').to_s.strip.empty?
          post.data.delete('english_url')
          next
        end

        url = post.data['english_url'].to_s.strip
        slug = Utils.slugify(post.data['slug'], :mode => 'latin')
        url = "/publications/#{slug}-en/" if url.empty?
        unless url.match?(%r{\A/publications/[a-z0-9]+(?:-[a-z0-9]+)*/\z})
          raise Errors::FatalException, "Invalid English publication URL in #{post.relative_path}: #{url}"
        end
        if site.pages.any? { |page| page.url == url }
          raise Errors::FatalException, "Duplicate English publication URL: #{url}"
        end

        post.data['english_url'] = url
        translation = PageWithoutAFile.new(site, site.source, url.sub(%r{\A/}, ''), 'index.md')
        translation.content = post.data['body_en']
        translation.data = post.data.reject { |key, _| %w[body_en english_url excerpt].include?(key) }.merge(
          'layout' => 'post',
          'lang' => 'en',
          'title' => post.data['title_en'].to_s.strip.empty? ? post.data['title'] : post.data['title_en'],
          'description' => post.data['excerpt_en'],
          'permalink' => url,
          'portuguese_url' => post.url
        )
        site.pages << translation
      end
    end
  end
end
