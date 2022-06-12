# frozen_string_literal: true

json.partial! 'authors/list_info/author', author: @author, counts_by_author: { @author.id => @author.books.count }
