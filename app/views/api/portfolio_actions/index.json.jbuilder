asset_ids = @portfolio_actions.map { |action| action.asset_id}

asset_ids.uniq.each do |asset_id|
  json.set! asset_id do
    json.array! @portfolio_actions do |portfolio_action|
      if portfolio_action.asset_id == asset_id
        json.partial! 'portfolio_action', portfolio_action: portfolio_action
      end
    end
  end
end

