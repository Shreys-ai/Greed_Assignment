class Games
    
    def calculate_score(args)
        hash = Hash.new(0)
        args.each {|x| hash[x]+=1}
        score(hash)
    end
    
    def score(hash)
        puts hash
        count =0
        hash.each do
            |x,y| 
            if y>=3
                if x==1
                    count+= (1000 + (y-3)*100)
                elsif x==5
                    count+= (500 + (y-3)*50)
                else
                    count += (x*100)
                end
            else
                count += (x==1 ? (y*100) : x==5? (y*50) : 0)
            end
        end
        return count
    end 
end
