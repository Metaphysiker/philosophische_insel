class Page < ApplicationRecord
  after_save :render_content

  def render_content
    markdown = Redcarpet::Markdown.new(Redcarpet::Render::HTML, autolink: true, tables: true)
    rendered = markdown.render(self.content)
    self.update_columns(content_rendered: rendered)
  end
end
