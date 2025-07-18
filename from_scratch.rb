require_relative 'Games'

def get_Array(size)
    return Array.new(size) { rand(1..6) }
end

def calc_NonScoring(rolls)
    non_scoring_values_array = rolls.select { |x| ![1,5 ].include?(x)}
    return non_scoring_values_array.size
end

def plays()

    print "Enter number of players: "
    num_players = Integer(gets.chomp)
    turn = 1
    final_round = false
    final_round_players = []

    scores = Hash.new(0)
    in_game = Hash.new(false)


    loop do
        puts "\nTurn #{turn}:"
        puts "--------"
        (0...num_players).each do |player_idx|
            player_num = player_idx + 1
            puts "Player #{player_num} rolls:"
            
            turn_score = 0
            dice_to_roll = 5
            rolls = []
            busted = false
            first_roll = true
            valid_score = false
            approach_occurance = 1
            count_of_non_scoring = true
            final_round = false

            while true
                rolls = get_Array(dice_to_roll)
                puts "Player #{player_num} rolls: #{rolls.join(', ')}"
                game = Games.new
                score = game.calculate_score(rolls)
                if score == 0 && approach_occurance != 1
                    puts "Score in this round: 0"
                    puts "Total score: #{scores[player_idx]}"
                    busted = true
                    break
                end
                
                turn_score += score
                non_scoring = calc_NonScoring(rolls)
                puts "Score in this round: #{turn_score}"
                
                puts "Total score: #{scores[player_idx]}"
                
                unless in_game[player_idx]
                    if turn_score >= 300
                        in_game[player_idx] = true
                        puts "Player #{player_num} is now in the game!"
                        valid_score = true
                    else
                        puts "Player #{player_num} needs at least 300 points in a single turn to get in the game."
                    end
                end
                # puts "Total score: #{scores[player_idx]}" if valid_score
                
                
                if non_scoring == 0 && approach_occurance == 1
                    puts "All dice scored! You may roll all 5 dice again."
                    dice_to_roll = 5
                    next_decision = true
                elsif non_scoring <=5 && count_of_non_scoring
                    print "Do you want to roll the non-scoring #{non_scoring} dices? (y/n): "
                    val = gets.chomp.downcase
                    next_decision = (val == "y")
                    dice_to_roll = non_scoring
                    if (non_scoring==1)
                        count_of_non_scoring = false
                        break
                    end
                end
                
                break unless next_decision
            end
            
            if !busted && in_game[player_idx]
                scores[player_idx] += turn_score
                puts "Total score: #{scores[player_idx]}"
            elsif !in_game[player_idx]
                puts "Player #{player_num} did not get in the game this turn."
            end
            
            puts "final_round -> #{final_round} && scores[player_idx] >= 3000 -> #{scores[player_idx]}"
            if !final_round && scores[player_idx] >= 3000
                final_round = true
                final_round_players = (0...num_players).to_a - [player_idx]
                puts "\nPlayer #{player_num} has reached 3000 points! Final round for other players."
            end
            
            if final_round
                if final_round_players.empty?
                    break
                else
                    final_round_players.shift
                end
            end
            
        end
        turn +=1
    end
        # Announce winner
        winner_id, winner_score = scores.max_by { |_, v| v }
        puts "Winner: Player #{winner_id + 1} with #{winner_score} points!"
        
end

plays()