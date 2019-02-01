asset_symbols = @portfolio_actions.map { |action| action.asset_symbol}

asset_symbols.uniq.each do |asset_symbol|
  json.set! asset_symbol do
    json.array! @portfolio_actions do |portfolio_action|
      if portfolio_action.asset_symbol == asset_symbol
        json.partial! 'portfolio_action', portfolio_action: portfolio_action
      end
    end
  end
end

