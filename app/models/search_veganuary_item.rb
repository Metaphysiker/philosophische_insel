class SearchVeganuaryItem

  def initialize(category: "", canton: "")
    @category = category
    @canton = canton
    @veganuary_items = VeganuaryItem.where(published: "true", checked: "true")
  end

  def search

    special_category_items = nil

    unless @category.blank?
      @veganuary_items = @veganuary_items.where(category: @category)
    else
      #always show brand and chain_of_stores unless a category is selected
      special_category_items = VeganuaryItem.where(category: "brand").or(VeganuaryItem.where(category: "chain_of_stores"))

    end

    unless @canton.blank?
      @veganuary_items = @veganuary_items.ilike_cantons(@canton)

      if @canton == "brand" || @canton == "chain_of_stores"
        special_category_items = VeganuaryItem.where(category: "brand").or(VeganuaryItem.where(category: "chain_of_stores"))
      end
    end

    unless special_category_items.nil?
      special_category_items = special_category_items.where(published: "true", checked: "true")
      @veganuary_items = @veganuary_items.or(special_category_items)
    end

    puts "SEARCH!"
    puts @canton
    puts @category

    @veganuary_items
  end

end
